// theme switcher
const switcher = document.querySelector('form.themeswitcher');

if (switcher) {

  const
    theme = localStorage.getItem('theme') || '',
    radio = switcher.querySelector(`input[value="!{ theme }"]`);

  if (radio) radio.checked = true;

  switcher.addEventListener('change', e => {

    const theme = e.target.value;
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;

  });

}
