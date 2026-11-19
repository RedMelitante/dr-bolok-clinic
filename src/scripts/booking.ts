/**
 * Appointment booking widget for the Book page.
 *
 * This is a port of the booking form on the previous WordPress site
 * (plugin "dental-booking", booking-widget.js v1.0.1). It talks to the SAME
 * Google Apps Script backend with the SAME requests, so bookings keep flowing
 * into the clinic's existing calendar exactly as before:
 *
 *   GET  {backend}?action=clinics
 *        -> { doctorName, clinics: [{ id, name, scheduleSummary, openWeekdays }] }
 *   GET  {backend}?action=availability&clinicId=&date=YYYY-MM-DD&timeOfDay=any
 *        -> { slots: ["HH:MM", ...], message? } | { error }
 *   POST {backend}  body (text/plain JSON):
 *        { action: "book", clinicId, date, time, name, phone, note }
 *        -> { message? } | { error, message? }   (error "SLOT_TAKEN" = slot gone)
 *
 * Only the look changed: the markup below uses the site design's styles.
 */

type Clinic = { id: string; name: string; scheduleSummary?: string; openWeekdays?: number[] };
type ApiResult = { error?: string; message?: string };

const root = document.querySelector<HTMLElement>('[data-dv-booking]');
const backendUrl = root?.dataset.backend || '';

/* ---------- Design styles (copied from the design's booking card) ---------- */
const S = {
  label: 'font-weight: 800; font-size: 15px',
  fieldLabel: 'display: flex; flex-direction: column; gap: 6px; font-weight: 800; font-size: 15px',
  input: 'min-height: 52px; padding: 0 14px; border-radius: 14px; border: 1.5px solid #B9CDD1; font: inherit; font-weight: 600; font-size: 17px; color: #17324D; background: #FFFFFF',
  textarea: 'padding: 14px 16px; border-radius: 14px; border: 1.5px solid #B9CDD1; font: inherit; font-weight: 600; font-size: 17px; color: #17324D; resize: vertical',
  clinicBtn: 'display: flex; flex-direction: column; align-items: flex-start; gap: 2px; width: 100%; min-height: 64px; padding: 12px 20px; border: none; border-radius: 999px; background: #0D7A80; color: #FFFFFF; font: inherit; text-align: left; cursor: pointer',
  primary: 'min-height: 54px; border: none; border-radius: 999px; background: #0D7A80; color: #FFFFFF; font: inherit; font-weight: 800; font-size: 17px; cursor: pointer',
  back: 'align-self: flex-start; min-height: 44px; padding: 0 4px; border: none; background: none; color: #0A5F64; font: inherit; font-weight: 800; cursor: pointer',
  summary: 'display: flex; flex-direction: column; gap: 2px; padding: 12px 16px; border-radius: 16px; background: #E6F4F3',
  msgBase: 'display: flex; flex-direction: column; gap: 4px; padding: 14px 16px; border-radius: 16px; font-size: 15px; font-weight: 700; ',
  msgError: 'background: #FFF1EA; color: #8C3F2B;',
  msgOk: 'background: #E6F4F3; color: #0A5F64;',
  slots: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 10px',
  slotBtn: 'min-height: 48px; padding: 0 12px; border-radius: 999px; font: inherit; font-size: 15px; font-weight: 800; cursor: pointer',
  step: 'display: flex; flex-direction: column; gap: 14px',
};

/* ---------- Small DOM helpers (backend text is always set via textContent) ---------- */
function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: (Node | string | null | undefined)[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  for (const c of children) if (c != null) node.append(c);
  return node;
}

function message(text: string, ok = false, role: 'alert' | 'status' = ok ? 'status' : 'alert') {
  return h('div', { role, style: S.msgBase + (ok ? S.msgOk : S.msgError) }, text);
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseLocalDate(s: string) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function displayDate(s: string) {
  return parseLocalDate(s).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function displayTime(hhmm: string) {
  const [hs, m] = hhmm.split(':');
  const hNum = parseInt(hs, 10);
  return `${hNum % 12 === 0 ? 12 : hNum % 12}:${m} ${hNum >= 12 ? 'PM' : 'AM'}`;
}

/* ---------- Backend calls (identical to the previous site) ---------- */
function fetchClinics(): Promise<ApiResult & { doctorName?: string; clinics?: Clinic[] }> {
  return fetch(backendUrl + '?action=clinics').then((r) => r.json());
}

function fetchAvailability(clinicId: string, date: string, timeOfDay: string): Promise<ApiResult & { slots?: string[] }> {
  const url = `${backendUrl}?action=availability&clinicId=${encodeURIComponent(clinicId)}&date=${encodeURIComponent(date)}&timeOfDay=${encodeURIComponent(timeOfDay)}`;
  return fetch(url).then((r) => r.json());
}

function submitBooking(payload: { clinicId: string; date: string; time: string; name: string; phone: string; note: string }): Promise<ApiResult> {
  return fetch(backendUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // avoids CORS preflight against Apps Script
    body: JSON.stringify({ ...payload, action: 'book' }),
  }).then((r) => r.json());
}

/* ---------- Widget ---------- */
if (root && backendUrl) {
  const stage = root.querySelector<HTMLElement>('[data-dv-booking-stage]')!;
  const fallback = root.dataset.fallback || '';

  const state = {
    doctorName: '',
    clinic: null as Clinic | null,
    date: '',
    timeOfDay: 'any',
    time: '',
    slots: [] as string[],
  };

  const show = (step: HTMLElement, focus?: HTMLElement | null) => {
    stage.replaceChildren(step);
    (focus ?? step.querySelector<HTMLElement>('button, input'))?.focus({ preventScroll: true });
  };

  const backButton = (label: string, onClick: () => void) => {
    const b = h('button', { type: 'button', style: S.back }, label);
    b.addEventListener('click', onClick);
    return b;
  };

  const summary = (strong: string, sub: string) =>
    h('div', { style: S.summary }, h('span', { style: 'font-weight: 800' }, strong), h('span', { style: 'font-size: 14px; color: #3F5368' }, sub));

  /* Step 0 — choose a clinic */
  const stepClinics = (initial = false) => {
    const list = h('div', { style: 'display: flex; flex-direction: column; gap: 12px' }, h('span', { style: 'color: #4A5D70; font-weight: 700' }, 'Loading clinics…'));
    const step = h('div', { style: S.step }, h('span', { style: S.label }, 'Choose a clinic'), list);
    if (!initial) show(step);
    else stage.replaceChildren(step);

    fetchClinics()
      .then((data) => {
        if (data.error || !data.clinics || !data.clinics.length) throw new Error('no clinics');
        state.doctorName = data.doctorName || '';
        list.replaceChildren(
          ...data.clinics.map((c) => {
            const b = h(
              'button',
              { type: 'button', style: S.clinicBtn },
              h('span', { style: 'font-weight: 800; font-size: 16px' }, c.name),
              h('span', { style: 'font-size: 13px; color: #DDF2F1' }, c.scheduleSummary || ''),
            );
            b.addEventListener('click', () => {
              state.clinic = c;
              state.date = '';
              state.time = '';
              state.slots = [];
              stepDate();
            });
            return b;
          }),
        );
      })
      .catch(() => {
        list.replaceChildren(message(`Could not load clinic list right now. Please try again in a moment${fallback ? `, or call ${fallback}` : ''}.`));
      });
  };

  /* Step 1 — date */
  const stepDate = () => {
    const c = state.clinic!;
    const input = h('input', { type: 'date', min: todayStr(), style: S.input }) as HTMLInputElement;
    const msg = h('div', { 'aria-live': 'polite' });
    const check = h('button', { type: 'button', style: S.primary }, 'Check Availability');

    check.addEventListener('click', () => {
      msg.replaceChildren();
      const date = input.value;
      if (!date) {
        msg.append(message('Please choose a date.'));
        return;
      }
      const wd = parseLocalDate(date).getDay();
      if (c.openWeekdays && c.openWeekdays.indexOf(wd) === -1) {
        msg.append(message(`${state.doctorName || 'The doctor'} doesn't have a schedule at ${c.name} on that day. Open: ${c.scheduleSummary || ''}`));
        return;
      }
      state.date = date;
      check.disabled = true;
      check.textContent = 'Checking…';
      fetchAvailability(c.id, date, state.timeOfDay)
        .then((data) => {
          check.disabled = false;
          check.textContent = 'Check Availability';
          if (data.error) {
            msg.replaceChildren(message(data.error));
            return;
          }
          state.slots = data.slots || [];
          if (!state.slots.length && data.message) {
            msg.replaceChildren(message(data.message));
            return;
          }
          stepTimes();
        })
        .catch(() => {
          check.disabled = false;
          check.textContent = 'Check Availability';
          msg.replaceChildren(message('Could not check availability right now. Please try again in a moment.'));
        });
    });

    show(
      h(
        'div',
        { style: S.step },
        summary(c.name, c.scheduleSummary || ''),
        h('label', { style: S.fieldLabel }, 'Preferred date', input),
        check,
        msg,
        backButton('← Choose a different clinic', () => stepClinics()),
      ),
      input,
    );
  };

  /* Step 2 — time slot */
  const stepTimes = () => {
    const c = state.clinic!;
    const body = state.slots.length
      ? h(
          'div',
          { style: S.slots, role: 'group', 'aria-label': 'Available times' },
          ...state.slots.map((slot) => {
            const b = h('button', { type: 'button', class: 'dv-chip', style: S.slotBtn }, displayTime(slot));
            b.addEventListener('click', () => {
              state.time = slot;
              stepDetails();
            });
            return b;
          }),
        )
      : h('p', { style: 'margin: 0; color: #4A5D70; font-weight: 700' }, 'No times available for that day. Please go back and try another date.');

    show(
      h(
        'div',
        { style: S.step },
        summary(c.name, displayDate(state.date)),
        h('span', { style: S.label }, 'Available times'),
        body,
        backButton('← Choose a different date', stepDate),
      ),
    );
  };

  /* Step 3 — contact details */
  const stepDetails = () => {
    const c = state.clinic!;
    const name = h('input', { type: 'text', autocomplete: 'name', required: '', style: S.input }) as HTMLInputElement;
    const phone = h('input', { type: 'tel', autocomplete: 'tel', required: '', placeholder: '09XX XXX XXXX', style: S.input }) as HTMLInputElement;
    const note = h('textarea', { rows: '3', placeholder: 'e.g. newborn checkup, vaccination, fever, follow-up. If you’re not sure, leave this blank.', style: S.textarea }) as HTMLTextAreaElement;
    const msg = h('div', { 'aria-live': 'polite' });
    const submit = h('button', { type: 'submit', style: S.primary }, 'Request This Time');

    const form = h(
      'form',
      { style: S.step, novalidate: '' },
      summary(c.name, `${displayDate(state.date)} at ${displayTime(state.time)}`),
      h('label', { style: S.fieldLabel }, 'Full name', name),
      h('label', { style: S.fieldLabel }, 'Phone number', phone),
      h('label', { style: S.fieldLabel }, 'What’s this visit for? (optional)', note),
      msg,
      submit,
      backButton('← Choose a different time', stepTimes),
    );

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.replaceChildren();
      const payload = {
        clinicId: c.id,
        date: state.date,
        time: state.time,
        name: name.value.trim(),
        phone: phone.value.trim(),
        note: note.value.trim(),
      };
      if (!payload.name || !payload.phone) {
        msg.append(message('Please enter your name and phone number.'));
        return;
      }
      submit.disabled = true;
      submit.textContent = 'Sending…';
      submitBooking(payload)
        .then((data) => {
          submit.disabled = false;
          submit.textContent = 'Request This Time';
          if (data.error) {
            msg.replaceChildren(message(data.message || data.error));
            if (data.error === 'SLOT_TAKEN') setTimeout(stepDate, 1800);
            return;
          }
          stepDone(data.message);
        })
        .catch(() => {
          submit.disabled = false;
          submit.textContent = 'Request This Time';
          msg.replaceChildren(message('Something went wrong sending your request. Please try again.'));
        });
    });

    show(form, name);
  };

  /* Step 4 — confirmation */
  const stepDone = (text?: string) => {
    const again = backButton('Make another request', () => {
      state.clinic = null;
      state.date = '';
      state.time = '';
      state.slots = [];
      stepClinics();
    });
    const ok = message(text || 'Request received! Our staff will call you shortly to confirm your appointment.', true);
    ok.setAttribute('tabindex', '-1');
    show(h('div', { style: S.step }, ok, again), ok);
  };

  stepClinics(true);
}
