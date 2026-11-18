/**
 * "Book an Appointment" clinic picker on the Book page.
 * Mirrors the design's component logic: choose a clinic, pick a date, and
 * check whether Dr. Vira has clinic on that weekday at that location.
 */
type BookClinic = {
  id: string;
  name: string;
  sched: string;
  phone: string;
  tel: string;
  hours: Record<string, string>;
  days: string;
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const root = document.querySelector<HTMLElement>('[data-dv-booker]');
const dataEl = document.getElementById('dv-book-data');

if (root && dataEl) {
  const clinics: BookClinic[] = JSON.parse(dataEl.textContent || '[]');
  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;

  const choose = $('[data-dv-choose]');
  const picking = $('[data-dv-picking]');
  const curName = $('[data-dv-cur-name]');
  const curSched = $('[data-dv-cur-sched]');
  const dateInput = $<HTMLInputElement>('[data-dv-date]');
  const result = $('[data-dv-result]');
  const resultTitle = $('[data-dv-result-title]');
  const resultText = $('[data-dv-result-text]');
  const curTel = $<HTMLAnchorElement>('[data-dv-cur-tel]');
  const curCall = $('[data-dv-cur-call]');

  let picked: BookClinic | null = null;

  const hideResult = () => {
    result.hidden = true;
  };

  root.querySelectorAll<HTMLButtonElement>('[data-dv-pick]').forEach((btn) => {
    btn.addEventListener('click', () => {
      picked = clinics.find((c) => c.id === btn.dataset.dvPick) ?? null;
      if (!picked) return;
      curName.textContent = picked.name;
      curSched.textContent = picked.sched;
      curTel.href = picked.tel;
      curCall.textContent = 'Call ' + picked.phone;
      hideResult();
      choose.hidden = true;
      picking.hidden = false;
      dateInput.focus();
    });
  });

  dateInput.addEventListener('change', hideResult);

  $('[data-dv-check]').addEventListener('click', () => {
    if (!picked) return;
    let ok = false;
    let title: string;
    let text: string;
    const date = dateInput.value;
    if (!date) {
      title = 'Please choose a date';
      text = 'Pick your preferred date, then tap Check Availability.';
    } else {
      const [y, m, d] = date.split('-').map(Number);
      const wd = new Date(y, m - 1, d).getDay();
      const hrs = picked.hours[String(wd)];
      if (hrs) {
        ok = true;
        title = 'Dr. Vira has clinic on ' + dayNames[wd] + ', ' + hrs + '.';
        text = 'Call the clinic secretary to confirm your slot for this date.';
      } else {
        title = 'No clinic on ' + dayNames[wd] + 's at this location.';
        text = 'Clinic days here are ' + picked.days + '. Choose another date, or call the secretary for help.';
      }
    }
    resultTitle.textContent = title;
    resultText.textContent = text;
    result.classList.toggle('dv-result-ok', ok);
    result.classList.toggle('dv-result-no', !ok);
    result.hidden = false;
  });

  $('[data-dv-back]').addEventListener('click', () => {
    picked = null;
    hideResult();
    picking.hidden = true;
    choose.hidden = false;
    root.querySelector<HTMLButtonElement>('[data-dv-pick]')?.focus();
  });
}
