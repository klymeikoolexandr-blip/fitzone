// FitZone: drobné interaktivní funkce v čistém JavaScriptu
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Mobilní navigace
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.textContent = isOpen ? '✕' : '☰';
  });
}

// Kalkulačka BMI s kontrolou vstupů
const bmiForm = document.getElementById('bmi-form');
if (bmiForm) {
  bmiForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const height = Number(document.getElementById('height').value) / 100;
    const weight = Number(document.getElementById('weight').value);
    const result = document.getElementById('bmi-result');

    if (!height || !weight || height < 1 || height > 2.5 || weight < 25 || weight > 300) {
      result.textContent = 'Zkontroluj prosím zadanou výšku a hmotnost.';
      return;
    }

    const bmi = weight / (height * height);
    let category = 'běžné rozmezí';
    if (bmi < 18.5) category = 'nižší hmotnost';
    else if (bmi >= 25) category = 'vyšší hmotnost';

    result.textContent = `Tvoje BMI je ${bmi.toFixed(1)} (${category}).`;
  });
}

// Počítadlo dokončených cviků na stránce Trénink
const workoutChecks = document.querySelectorAll('.workout-item input');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');

function updateProgress() {
  if (!progressText || !progressBar) return;
  const completed = document.querySelectorAll('.workout-item input:checked').length;
  progressText.textContent = `${completed} / ${workoutChecks.length}`;
  progressBar.style.width = `${workoutChecks.length ? completed / workoutChecks.length * 100 : 0}%`;
}

workoutChecks.forEach((checkbox) => checkbox.addEventListener('change', updateProgress));

const resetButton = document.getElementById('reset-workout');
if (resetButton) {
  resetButton.addEventListener('click', () => {
    workoutChecks.forEach((checkbox) => { checkbox.checked = false; });
    updateProgress();
  });
}
