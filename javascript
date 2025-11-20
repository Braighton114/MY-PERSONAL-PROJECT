document.addEventListener('DOMContentLoaded', () => {

  /* ================= Local Storage Helpers ================= */
  function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /* ================= Mood Tracker ================= */
  const moodSelect = document.getElementById('mood-select');
  const saveMoodBtn = document.getElementById('save-mood');
  const moodList = document.getElementById('mood-list');

  function displayMoods() {
    const moods = getData('moods');
    moodList.innerHTML = '';
    moods.slice().reverse().forEach(m => {
      const li = document.createElement('li');
      li.textContent = `${m.date}: ${m.mood}`;
      if (m.date === new Date().toLocaleDateString()) li.classList.add('today');
      moodList.appendChild(li);
    });
  }

  saveMoodBtn.addEventListener('click', () => {
    const mood = moodSelect.value;
    if (!mood) return alert("Please select a mood.");
    const moods = getData('moods');
    moods.push({ mood, date: new Date().toLocaleDateString() });
    saveData('moods', moods);
    displayMoods();
    moodSelect.value = '';
  });

  /* ================= Reflection Tracker ================= */
  const reflectionInput = document.getElementById('reflection');
  const saveReflectionBtn = document.getElementById('save-reflection');
  const reflectionList = document.getElementById('reflection-list');
  const reflectionExplanation = document.getElementById('reflection-explanation');

  function displayReflections() {
    const reflections = getData('reflections');
    reflectionList.innerHTML = '';
    reflections.slice().reverse().forEach(r => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${r.date}</strong>: ${r.text}`;
      if (r.date === new Date().toLocaleDateString()) li.classList.add('today');
      reflectionList.appendChild(li);
    });
  }

  saveReflectionBtn.addEventListener('click', () => {
    const text = reflectionInput.value.trim();
    if (!text) return alert("Please write your reflection.");
    const reflections = getData('reflections');
    reflections.push({ text, date: new Date().toLocaleDateString() });
    saveData('reflections', reflections);
    reflectionInput.value = '';
    displayReflections();

    reflectionExplanation.style.display = 'block';
    reflectionExplanation.scrollIntoView({ behavior: 'smooth' });
  });

  /* ================= Habit Tracker ================= */
  const habitCheckboxes = document.querySelectorAll('.habit');
  const saveHabitsBtn = document.getElementById('save-habits');
  const habitList = document.getElementById('habit-list');

  function displayHabits() {
    const habits = getData('habits');
    habitList.innerHTML = '';
    habits.slice().reverse().forEach(h => {
      const li = document.createElement('li');
      li.textContent = `${h.date}: ${h.completed.join(', ')}`;
      if (h.date === new Date().toLocaleDateString()) li.classList.add('today');
      habitList.appendChild(li);
    });
  }

  saveHabitsBtn.addEventListener('click', () => {
    const completed = Array.from(habitCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    if (completed.length === 0) return alert("Select at least one habit.");
    const habits = getData('habits');
    habits.push({ completed, date: new Date().toLocaleDateString() });
    saveData('habits', habits);
    habitCheckboxes.forEach(cb => cb.checked = false);
    displayHabits();
  });

  /* ================= Background Color Change on Click ================= */
  const colors = [
    { body: '#18be18ff', header: '#10ca73ff', section: '#000000ff', button: '#ded2e4ff' },
    { body: '#6a1b9a', header: '#5e2a86', section: '#8e44ad', button: '#6c3483' },
    { body: '#9b59b6', header: '#7d3c98', section: '#a569bd', button: '#884ea0' },
    { body: '#5e2a86', header: '#4b0082', section: '#6a1b9a', button: '#512e5f' }
  ];

  let currentIndex = 0;

  function changeColors() {
    currentIndex = (currentIndex + 1) % colors.length;
    const c = colors[currentIndex];

    // Change body
    document.body.style.backgroundColor = c.body;

    // Change header gradient
    const header = document.querySelector('header');
    header.style.background = `linear-gradient(90deg, ${c.header}, ${c.body})`;

    // Change sections
    document.querySelectorAll('section').forEach(sec => {
      sec.style.background = `linear-gradient(145deg, ${c.section}, ${c.body})`;
    });

    // Change buttons
    document.querySelectorAll('button').forEach(btn => {
      btn.style.background = `linear-gradient(135deg, ${c.button}, ${c.section})`;
    });
  }

  // Listen for clicks on the entire body
  document.body.addEventListener('click', (e) => {
    // Optional: avoid triggering on buttons
    if (e.target.tagName !== 'BUTTON') {
      changeColors();
    }
  });

  /* ================= Initialize Display ================= */
  displayMoods();
  displayReflections();
  displayHabits();

});
