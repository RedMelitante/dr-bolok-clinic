/**
 * Inquiry forms (Book and Contact pages).
 *
 * The design shows a thank-you message on submit. If PUBLIC_FORM_ENDPOINT is
 * set at build time (e.g. a Formspree/Basin/Getform URL), the form data is
 * POSTed there first; otherwise only the thank-you message is shown.
 */
const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined;

document.querySelectorAll<HTMLFormElement>('form[data-dv-form]').forEach((form) => {
  const ok = form.querySelector<HTMLElement>('[data-dv-form-ok]');
  const err = form.querySelector<HTMLElement>('[data-dv-form-error]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (ok) ok.hidden = true;
    if (err) err.hidden = true;

    if (endpoint) {
      if (submit) submit.disabled = true;
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } catch {
        if (err) err.hidden = false;
        if (submit) submit.disabled = false;
        return;
      }
      if (submit) submit.disabled = false;
    }

    form.reset();
    if (ok) ok.hidden = false;
  });
});
