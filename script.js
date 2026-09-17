// ============================================================
// 1. FIREBASE INITIALIZATION & CONFIGURATION
// ============================================================
// ⚠️ PALITAN ANG MGA VALUES SA ILALIM MULA SA FIREBASE CONSOLE:
// Project Settings (⚙️) ➔ General ➔ Your apps ➔ Web App (SDK setup/configuration)
const firebaseConfig = {
  apiKey: "AIzaSyC-pxNm30epmjySVvvJ2YEsNOXKAVE4oKY",
  authDomain: "lingguhang-grind.firebaseapp.com",
  projectId: "lingguhang-grind",
  storageBucket: "lingguhang-grind.firebasestorage.app",
  messagingSenderId: "524469237908",
  appId: "1:524469237908:web:ec8ce37d581fe00ca79c81"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

// ============================================================
// 2. DATA — Full Schedule (Market, Inventory, Workouts, Recipes)
// ============================================================
const WEEK_DATA = [
  {
    key: "mon", name: "Monday", date: "Lunes", tag: "market", isMarketDay: true,
    market: [
      "Bumili ng Tokwa (3 blocks - para sa Mon & Tue)",
      "Kangkong (2 bundles)",
      "Kamatis (1/2 kg) & Sibuyas / Bawang",
      "Coconut Oil (check supply)"
    ],
    meals: [
      "🥣 Lunch: Ginisang Monggo + Tokwa",
      "🍳 Dinner: Tokwa Scramble (Gisa bawang/sibuyas/kamatis, tokwa + 2 itlog, toyo/asin)",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Night Jog 3km (Palengke Run)",
      "🔹 Push Circuit (10-10-10-5-10-10-10):",
      "  - Normal Pushup (10 reps)",
      "  - Diamond Pushup (10 reps)",
      "  - Wide Pushup (10 reps)",
      "  - Archer Pushup (5-5 reps)",
      "  - Mike Tyson Pushup (10 reps)",
      "  - Reverse Pushup (10 reps)",
      "  - Normal Pushup (10 reps)",
      "🔹 Core & Cardio (12x3 reps):",
      "  - Side Mountain Climbers (12x3)",
      "  - Cross Mountain Climbers (12x3)",
      "  - Mountain Climbers (20x3)",
      "  - Plank Jacks (15x3)",
      "  - Shoulder Taps (15x3)",
      "  - Plank Up-Downs (12x3)",
      "🔹 Lower Body (12x3 reps):",
      "  - Jump Squat (12x3)",
      "  - Pop Squat (12x3)",
      "  - Side Step Squat (12x3)",
      "  - Squat to Calf Raise (15x3)",
      "  - Surrender + Jump (12x3)"
    ]
  },
  {
    key: "tue", name: "Tuesday", date: "Martes", tag: "regular", isMarketDay: false,
    market: [
      "📦 Sangkap Check: Tokwa (kunin sa tubig na may asin)",
      "📦 Sangkap Check: Kangkong (hugas at hiwa)",
      "📦 Sangkap Check: 2 Itlog, Bawang, Sibuyas",
      "📦 Sangkap Check: Coconut oil & Toyo/Asin"
    ],
    meals: [
      "🥗 Lunch: Ginisang Kangkong na may Tokwa at Itlog",
      "🍳 Dinner: Tortang Tokwa (I-mash ang tokwa, ihalo sa 2 itlog, iprito nang golden brown)",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Evening Jogging 4.5km",
      "🔹 Pushups Routine (12x3 reps):",
      "  - Pike Pushup (12x3)",
      "  - Sphinx Pushup (12x3)",
      "  - Diamond Pushup (12x3)",
      "  - Normal Pushup (15x3)",
      "🔹 Core & Legs (12x3 reps):",
      "  - Side Mountain Climbers (15x3)",
      "  - Shoulder Taps (20x3)",
      "  - Jump Squat (12x3)",
      "  - Squat to Calf Raise (15x3)",
      "  - Surrender + Jump (12x3)"
    ]
  },
  {
    key: "wed", name: "Wednesday", date: "Miyerkules", tag: "market", isMarketDay: true,
    market: [
      "Bumili ng Tokwa (3 blocks - para sa Wed & Thu)",
      "Sitaw (1 tali)",
      "Kamatis & Sibuyas/Bawang",
      "Check asin/toyo supply"
    ],
    meals: [
      "🥣 Lunch: Ginisang Monggo + Tokwa",
      "🍳 Dinner: Tokwa Scramble (Gisado sa kamatis, tokwa + 2 itlog)",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Night Jog 3km (Palengke Run)",
      "🔹 Push Circuit (10-10-10-5-10-10-10):",
      "  - Normal Pushup (10 reps)",
      "  - Diamond Pushup (10 reps)",
      "  - Wide Pushup (10 reps)",
      "  - Archer Pushup (5-5 reps)",
      "  - Mike Tyson Pushup (10 reps)",
      "  - Reverse Pushup (10 reps)",
      "🔹 Core & Cardio (12x3 reps):",
      "  - Cross Mountain Climbers (15x3)",
      "  - Plank Jacks (15x3)",
      "  - Plank Up-Downs (12x3)",
      "🔹 Legs Routine (12x3 reps):",
      "  - Pop Squat (12x3)",
      "  - Side Step Squat (12x3)",
      "  - Surrender + Jump (12x3)"
    ]
  },
  {
    key: "thu", name: "Thursday", date: "Huwebes", tag: "regular", isMarketDay: false,
    market: [
      "📦 Sangkap Check: Tokwa (sariwa sa tubig)",
      "📦 Sangkap Check: Sitaw (hiwain sa 1-2 inches)",
      "📦 Sangkap Check: 2-3 Itlog",
      "📦 Sangkap Check: Kamatis, Bawang, Sibuyas"
    ],
    meals: [
      "🍳 Lunch: Tortang Tokwa (Patties/Omelette style)",
      "🍲 Dinner: Ginisang Sitaw, Tokwa, Itlog (Takpan 3-5 mins, ihalo ang itlog)",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Evening Jogging 4.5km",
      "🔹 Upper Body & Core (12x3 reps):",
      "  - Pike Pushup (12x3)",
      "  - Sphinx Pushup (12x3)",
      "  - Wide Pushup (15x3)",
      "  - Shoulder Taps (20x3)",
      "  - Mountain Climbers (20x3)",
      "🔹 Lower Body Circuit (12x3 reps):",
      "  - Jump Squat (15x3)",
      "  - Side Step Squat (12x3)",
      "  - Squat to Calf Raise (15x3)"
    ]
  },
  {
    key: "fri", name: "Friday", date: "Biyernes", tag: "market", isMarketDay: true,
    market: [
      "Bumili ng Tokwa (3 blocks - para sa Fri & Sat)",
      "Kangkong / Gulay",
      "Kamatis & Bawang/Sibuyas"
    ],
    meals: [
      "🥗 Lunch: Ginisang Kangkong, Tokwa, Itlog",
      "🍳 Dinner: Tokwa Scramble na may Kamatis",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Night Jog 3km (Palengke Run)",
      "🔹 Push Circuit (10-10-10-5-10-10-10):",
      "  - Normal Pushup (10 reps)",
      "  - Diamond Pushup (10 reps)",
      "  - Wide Pushup (10 reps)",
      "  - Archer Pushup (5-5 reps)",
      "  - Mike Tyson Pushup (10 reps)",
      "  - Reverse Pushup (10 reps)",
      "🔹 Full Body Cardio (12x3 reps):",
      "  - Side Mountain Climbers (15x3)",
      "  - Cross Mountain Climbers (15x3)",
      "  - Plank Jacks (15x3)",
      "  - Surrender + Jump (12x3)"
    ]
  },
  {
    key: "sat", name: "Saturday", date: "Sabado", tag: "regular", isMarketDay: false,
    market: [
      "📦 Sangkap Check: Tokwa (hiwain nang malalapad para sa Steak)",
      "📦 Sangkap Check: Kamatis (gawing sarsa)",
      "📦 Sangkap Check: 1-2 Itlog (para sa Sunny Side Up)",
      "📦 Sangkap Check: Bawang, Sibuyas, Coconut Oil"
    ],
    meals: [
      "🥣 Lunch: Ginisang Monggo + Tokwa",
      "🥩 Dinner: Tokwa 'Steak' na may Kamatis (Pritong tokwa sa kamatis sauce + Sunny side up egg sa ibabaw)",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Evening Jogging 4.5km",
      "🔹 Full Body Calisthenics (12x3 reps):",
      "  - Normal Pushup (15x3)",
      "  - Diamond Pushup (12x3)",
      "  - Pike Pushup (12x3)",
      "  - Plank Up-Downs (12x3)",
      "  - Jump Squat (12x3)",
      "  - Pop Squat (12x3)",
      "  - Squat to Calf Raise (15x3)"
    ]
  },
  {
    key: "sun", name: "Sunday", date: "Linggo", tag: "market", isMarketDay: true,
    market: [
      "🥚 Bumili ng 1 Dozen Eggs (stock para sa buong linggo)",
      "🌱 Dried Monggo (1-2 packs)",
      "Tokwa (1-2 blocks para sa dinner)",
      "Ampalaya (1 piraso)"
    ],
    meals: [
      "🥗 Lunch: Tokwa at Ampalaya",
      "🍳 Dinner: Ginisang Ampalaya, Tokwa, Itlog (Pigaan ng asin ang ampalaya para bawas pait)",
      "💧 Hydration: Light recovery water"
    ],
    exercises: [
      "🏃 Night Jog 3km (Palengke Run)",
      "🧘 Rest Day / Light Recovery Stretching (15 mins)",
      "🚶 Mobility Routine"
    ]
  }
];

const HABITS = [
  { key: "wake", label: "Gising ng 12:00 NN" },
  { key: "water", label: "3L Tubig Araw-araw" },
  { key: "lunch", label: "Lunch on Time" },
  { key: "move", label: "Workout / Jog Completed" },
  { key: "dinner", label: "Dinner (No-Rice)" }
];

// ============================================================
// 3. STORAGE & STATE MANAGEMENT (Local + Cloud)
// ============================================================
const STORAGE_KEY = "lingguhang-grind-master-v5";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    return {
      market: parsed.market || {},
      exercises: parsed.exercises || {},
      meals: parsed.meals || {},
      habits: parsed.habits || {},
      focus: parsed.focus || { startDate: "", focus: "", reward: "", affirmation: "" },
      history: parsed.history || []
    };
  } catch (e) {
    return getDefaultState();
  }
}

function getDefaultState() {
  return {
    market: {},
    exercises: {},
    meals: {},
    habits: {},
    focus: {
      startDate: new Date().toISOString().split('T')[0],
      focus: "Palengke run + 4.5km Jog & Pushup circuits!",
      reward: "Bagong athletic gear / Cheat meal",
      affirmation: "Walang susuko, pitong laban!"
    },
    history: []
  };
}

function saveState() {
  // Save sa LocalStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  // Sync sa Cloud Firestore kung naka-login ang user
  const user = auth.currentUser;
  if (user) {
    db.collection("users").doc(user.uid).set(state)
      .catch((err) => console.error("Cloud Sync Error:", err));
  }
}

let state = loadState();

// ============================================================
// 4. HELPERS
// ============================================================
function todayKey() {
  const jsDay = new Date().getDay();
  const order = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return order[jsDay];
}

function getDayStats(day) {
  const mChecked = state.market[day.key] || [];
  const eChecked = state.exercises[day.key] || [];
  const mealChecked = state.meals[day.key] || [];

  const total = day.market.length + day.exercises.length + day.meals.length;
  if (total === 0) return { done: 0, total: 0, pct: 0 };

  const doneM = day.market.reduce((a, _, i) => a + (mChecked[i] ? 1 : 0), 0);
  const doneE = day.exercises.reduce((a, _, i) => a + (eChecked[i] ? 1 : 0), 0);
  const doneMeal = day.meals.reduce((a, _, i) => a + (mealChecked[i] ? 1 : 0), 0);

  const done = doneM + doneE + doneMeal;
  return { done, total, pct: done / total };
}

function getCategoryStats(catKey) {
  let total = 0;
  let done = 0;

  WEEK_DATA.forEach(day => {
    const list = day[catKey] || [];
    const checked = state[catKey][day.key] || [];
    total += list.length;
    done += list.reduce((a, _, i) => a + (checked[i] ? 1 : 0), 0);
  });

  return { done, total, pct: total === 0 ? 0 : done / total };
}

function getHabitCompletion(habitKey) {
  let done = 0;
  WEEK_DATA.forEach(d => {
    if (state.habits[d.key] && state.habits[d.key][habitKey]) done++;
  });
  return done / WEEK_DATA.length;
}

// ============================================================
// 5. RENDER — Controls & Focus
// ============================================================
function renderFocusControls() {
  const weekStartDate = document.getElementById('weekStartDate');
  const focusInput = document.getElementById('focusInput');
  const rewardInput = document.getElementById('rewardInput');
  const affirmationInput = document.getElementById('affirmationInput');

  if (weekStartDate) weekStartDate.value = state.focus.startDate || '';
  if (focusInput) focusInput.value = state.focus.focus || '';
  if (rewardInput) rewardInput.value = state.focus.reward || '';
  if (affirmationInput) affirmationInput.value = state.focus.affirmation || '';
}

const saveFocusBtn = document.getElementById('saveFocusBtn');
if (saveFocusBtn) {
  saveFocusBtn.addEventListener('click', () => {
    state.focus = {
      startDate: document.getElementById('weekStartDate').value,
      focus: document.getElementById('focusInput').value,
      reward: document.getElementById('rewardInput').value,
      affirmation: document.getElementById('affirmationInput').value
    };
    saveState();
    alert("Nai-save ang iyong Weekly Focus!");
  });
}

// ============================================================
// 6. RENDER — Category Analytics
// ============================================================
function renderCategoryAnalytics() {
  // Market / Inventory
  const mStats = getCategoryStats('market');
  const mPct = Math.round(mStats.pct * 100);
  const marketPctText = document.getElementById('marketPctText');
  const marketCountText = document.getElementById('marketCountText');
  if (marketPctText) marketPctText.textContent = mPct + '%';
  if (marketCountText) marketCountText.textContent = `${mStats.done} / ${mStats.total} Checkmarks`;
  updateRing('marketRingFill', mStats.pct, 36);

  // Exercise
  const eStats = getCategoryStats('exercises');
  const ePct = Math.round(eStats.pct * 100);
  const exercisePctText = document.getElementById('exercisePctText');
  const exerciseCountText = document.getElementById('exerciseCountText');
  if (exercisePctText) exercisePctText.textContent = ePct + '%';
  if (exerciseCountText) exerciseCountText.textContent = `${eStats.done} / ${eStats.total} Routines`;
  updateRing('exerciseRingFill', eStats.pct, 36);

  // Meal
  const mealStats = getCategoryStats('meals');
  const mealPct = Math.round(mealStats.pct * 100);
  const mealPctText = document.getElementById('mealPctText');
  const mealCountText = document.getElementById('mealCountText');
  if (mealPctText) mealPctText.textContent = mealPct + '%';
  if (mealCountText) mealCountText.textContent = `${mealStats.done} / ${mealStats.total} Meals`;
  updateRing('mealRingFill', mealStats.pct, 36);
}

function updateRing(elementId, pct, radius) {
  const ring = document.getElementById(elementId);
  if (!ring) return;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - pct);
  ring.style.strokeDasharray = circ;
  ring.style.opacity = pct <= 0.001 ? "0" : "1";
  requestAnimationFrame(() => { ring.style.strokeDashoffset = offset; });
}

// ============================================================
// 7. RENDER — Habit Tracker & Trend Chart
// ============================================================
let habitLineChartInstance = null;

function renderHabitsSection() {
  const headRow = document.getElementById('habitHeadRow');
  const body = document.getElementById('habitBody');
  if (!headRow || !body) return;

  headRow.innerHTML = `<th>Habit</th>` +
    WEEK_DATA.map(d => `<th>${d.name.slice(0,3)}</th>`).join('') +
    `<th>Progress</th>`;

  body.innerHTML = '';

  const dailyHabitScores = WEEK_DATA.map(d => {
    let dayDone = 0;
    HABITS.forEach(h => {
      if (state.habits[d.key] && state.habits[d.key][h.key]) dayDone++;
    });
    return Math.round((dayDone / HABITS.length) * 100);
  });

  HABITS.forEach(habit => {
    const row = document.createElement('tr');
    const pct = getHabitCompletion(habit.key);
    const pctInt = Math.round(pct * 100);

    row.innerHTML = `
      <td class="habit-title" title="${habit.label}">${habit.label}</td>
      ${WEEK_DATA.map(day => {
        const checked = (state.habits[day.key] && state.habits[day.key][habit.key]) ? "checked" : "";
        return `<td><input type="checkbox" class="habit-checkbox" data-habit="${habit.key}" data-day="${day.key}" ${checked}></td>`;
      }).join('')}
      <td>
        <span class="mini-bar-bg"><span class="mini-bar-fill" style="width:${pctInt}%"></span></span>
        <span style="font-size:10px; font-weight:700;">${pctInt}%</span>
      </td>
    `;
    body.appendChild(row);
  });

  body.querySelectorAll('.habit-checkbox').forEach(box => {
    box.addEventListener('change', (e) => {
      const hKey = e.target.dataset.habit;
      const dKey = e.target.dataset.day;
      if (!state.habits[dKey]) state.habits[dKey] = {};
      state.habits[dKey][hKey] = e.target.checked;
      saveState();
      renderHabitsSection();
    });
  });

  // Habit Chart
  const habitChartEl = document.getElementById('habitLineChart');
  if (!habitChartEl) return;
  const ctx = habitChartEl.getContext('2d');
  if (habitLineChartInstance) habitLineChartInstance.destroy();

  habitLineChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Habit %',
        data: dailyHabitScores,
        borderColor: '#e4b33d',
        backgroundColor: 'rgba(228, 179, 61, 0.15)',
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 100, ticks: { color: '#8a8a9a', font: { size: 9 } }, grid: { color: '#262632' } },
        x: { ticks: { color: '#8a8a9a', font: { size: 9 } }, grid: { color: '#262632' } }
      }
    }
  });
}

// ============================================================
// 8. RENDER — 7 Day Columns Grid
// ============================================================
const daysGrid = document.getElementById('daysGrid');

function renderDaysGrid() {
  if (!daysGrid) return;
  daysGrid.innerHTML = '';
  const currentToday = todayKey();

  WEEK_DATA.forEach(day => {
    const stats = getDayStats(day);
    const pctInt = Math.round(stats.pct * 100);
    const isToday = day.key === currentToday;

    const col = document.createElement('div');
    col.className = `day-column ${isToday ? 'is-today' : ''}`;

    const marketHeaderTitle = day.isMarketDay ? "🛒 Pagbili sa Palengke" : "📦 Inventory / Sangkap Check";

    col.innerHTML = `
      <div class="day-col-header">
        <div class="day-col-title">${day.name}</div>
        <div class="day-col-date">${day.date} ${day.isMarketDay ? "• Palengke Run" : ""}</div>
      </div>

      <div class="day-col-gauge">
        <svg class="ring-svg" viewBox="0 0 100 100">
          <circle class="ring-bg" cx="50" cy="50" r="36"></circle>
          <circle class="ring-fg" data-ring="${day.key}" cx="50" cy="50" r="36" transform="rotate(-90 50 50)"></circle>
        </svg>
        <div class="overall-ring-text">${pctInt}%</div>
      </div>

      <div class="day-col-content">
        
        <!-- MARKET OR INVENTORY CHECKLIST -->
        <div>
          <div class="section-label">${marketHeaderTitle}</div>
          <div class="col-task-list">
            ${day.market.map((item, i) => {
              const checked = (state.market[day.key] || [])[i] ? "checked" : "";
              const doneClass = (state.market[day.key] || [])[i] ? "done" : "";
              return `<label class="col-task-item">
                <input type="checkbox" data-cat="market" data-day="${day.key}" data-index="${i}" ${checked}>
                <span class="${doneClass}">${item}</span>
              </label>`;
            }).join('')}
          </div>
        </div>

        <!-- EXERCISE CHECKLIST -->
        <div>
          <div class="section-label">🏋️ Exercises Routine</div>
          <div class="col-task-list">
            ${day.exercises.map((ex, i) => {
              const checked = (state.exercises[day.key] || [])[i] ? "checked" : "";
              const doneClass = (state.exercises[day.key] || [])[i] ? "done" : "";
              return `<label class="col-task-item">
                <input type="checkbox" data-cat="exercises" data-day="${day.key}" data-index="${i}" ${checked}>
                <span class="${doneClass}">${ex}</span>
              </label>`;
            }).join('')}
          </div>
        </div>

        <!-- MEAL PLAN CHECKLIST -->
        <div>
          <div class="section-label">🥗 Meal Plan & Cooking Guide</div>
          <div class="col-task-list">
            ${day.meals.map((m, i) => {
              const checked = (state.meals[day.key] || [])[i] ? "checked" : "";
              const doneClass = (state.meals[day.key] || [])[i] ? "done" : "";
              return `<label class="col-task-item">
                <input type="checkbox" data-cat="meals" data-day="${day.key}" data-index="${i}" ${checked}>
                <span class="${doneClass}">${m}</span>
              </label>`;
            }).join('')}
          </div>
        </div>

      </div>

      <div class="day-col-footer">
        <span class="stat-done">Done: ${stats.done}</span>
        <span class="stat-left">Left: ${stats.total - stats.done}</span>
      </div>
    `;

    daysGrid.appendChild(col);

    const ringFill = col.querySelector(`[data-ring="${day.key}"]`);
    if (ringFill) {
      const circumference = 2 * Math.PI * 36;
      const offset = circumference * (1 - stats.pct);
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.opacity = stats.pct <= 0.001 ? "0" : "1";
      requestAnimationFrame(() => { ringFill.style.strokeDashoffset = offset; });
    }
  });

  daysGrid.querySelectorAll('input[type="checkbox"]').forEach(box => {
    box.addEventListener('change', onCheckToggle);
  });
}

function onCheckToggle(e) {
  const cat = e.target.dataset.cat;
  const dayKey = e.target.dataset.day;
  const index = Number(e.target.dataset.index);

  if (!state[cat][dayKey]) state[cat][dayKey] = [];
  state[cat][dayKey][index] = e.target.checked;

  saveState();
  renderDaysGrid();
  renderCategoryAnalytics();
  renderOverallWidget();
}

// ============================================================
// 9. RENDER — Overall Progress Bar & Donut Gauge
// ============================================================
let barChartInstance = null;

function renderOverallWidget() {
  let totalAll = 0;
  let doneAll = 0;

  const donePerDay = [];
  const leftPerDay = [];

  WEEK_DATA.forEach(day => {
    const stats = getDayStats(day);
    totalAll += stats.total;
    doneAll += stats.done;

    donePerDay.push(stats.done);
    leftPerDay.push(stats.total - stats.done);
  });

  const weekPct = totalAll === 0 ? 0 : doneAll / totalAll;
  const pctInt = Math.round(weekPct * 100);

  const overallPercentText = document.getElementById('overallPercentText');
  const completedCounterText = document.getElementById('completedCounterText');
  if (overallPercentText) overallPercentText.textContent = pctInt + '%';
  if (completedCounterText) completedCounterText.textContent = `${doneAll} / ${totalAll} Done`;

  const ringFill = document.getElementById('overallRingFill');
  if (ringFill) {
    const circumference = 2 * Math.PI * 40;
    const offset = circumference * (1 - weekPct);
    ringFill.style.strokeDasharray = circumference;
    ringFill.style.opacity = weekPct <= 0.001 ? "0" : "1";
    requestAnimationFrame(() => { ringFill.style.strokeDashoffset = offset; });
  }

  const overallBarChartEl = document.getElementById('overallBarChart');
  if (!overallBarChartEl) return;
  const ctx = overallBarChartEl.getContext('2d');
  if (barChartInstance) barChartInstance.destroy();

  barChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { label: 'Done', data: donePerDay, backgroundColor: '#ffffff' },
        { label: 'Left', data: leftPerDay, backgroundColor: '#262632' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: '#8a8a9a', font: { size: 9 } } },
        y: { stacked: true, grid: { color: '#1a1a22' }, ticks: { color: '#8a8a9a', font: { size: 9 } } }
      }
    }
  });
}

// ============================================================
// 10. RENDER — History Chart
// ============================================================
let historyChartInstance = null;

function renderHistoryChart() {
  const historyChartEl = document.getElementById('historyChart');
  if (!historyChartEl) return;
  const ctx = historyChartEl.getContext('2d');

  const labels = state.history.map((_, i) => `Week ${i + 1}`);
  const scores = state.history.map(item => item.score);

  if (historyChartInstance) historyChartInstance.destroy();

  historyChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.length ? labels : ['No records yet'],
      datasets: [{
        label: '% Completed',
        data: scores.length ? scores : [0],
        borderColor: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { min: 0, max: 100, ticks: { color: '#8a8a9a' }, grid: { color: '#262632' } },
        x: { ticks: { color: '#8a8a9a' }, grid: { color: '#262632' } }
      },
      plugins: { legend: { labels: { color: '#f2f2f7' } } }
    }
  });
}

// Reset button handler
const resetWeekBtn = document.getElementById('resetWeekBtn');
if (resetWeekBtn) {
  resetWeekBtn.addEventListener('click', () => {
    let totalAll = 0;
    let doneAll = 0;

    WEEK_DATA.forEach(day => {
      const stats = getDayStats(day);
      totalAll += stats.total;
      doneAll += stats.done;
    });

    const weekPct = totalAll === 0 ? 0 : Math.round((doneAll / totalAll) * 100);

    if (!confirm(`I-reset ang buong linggo at i-record ang kasalukuyang score (${weekPct}%) sa History Graph?`)) return;

    state.history.push({
      date: new Date().toLocaleDateString('tl-PH'),
      score: weekPct
    });

    state.market = {};
    state.exercises = {};
    state.meals = {};
    state.habits = {};

    saveState();
    renderAll();
  });
}

// ============================================================
// 11. AUTHENTICATION HANDLERS & CLOUD SYNC
// ============================================================

// Function para itago ang Login Popup at Ipakita ang Dashboard
function showDashboard() {
  const overlay = document.getElementById('authOverlay');
  const appContent = document.getElementById('appContent');
  
  if (overlay) overlay.style.display = 'none';
  if (appContent) appContent.style.display = 'block';
}

// Function para ipakita ang Login at Itago ang Dashboard
function showLogin() {
  const overlay = document.getElementById('authOverlay');
  const appContent = document.getElementById('appContent');
  
  if (overlay) overlay.style.display = 'flex';
  if (appContent) appContent.style.display = 'none';
}

// Form Submit Event Handler (Login / Auto-Register)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value.trim();
    const errorEl = document.getElementById('authError');

    if (errorEl) errorEl.textContent = '';

    try {
      await auth.signInWithEmailAndPassword(email, password);
      showDashboard();
    } catch (error) {
      // Kung wala pang account, awtomatikong igagawa ng account
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        try {
          await auth.createUserWithEmailAndPassword(email, password);
          showDashboard();
        } catch (regErr) {
          if (errorEl) errorEl.textContent = "Registration Error: " + regErr.message;
        }
      } else {
        if (errorEl) errorEl.textContent = "Login Error: " + error.message;
      }
    }
  });
}

// Logout Button Handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
      showLogin();
    });
  });
}

// Auth State Listener & Firestore Cloud Sync
auth.onAuthStateChanged((user) => {
  if (user) {
    // 1. Ipakita ang Dashboard UI
    showDashboard();

    // 2. I-display ang Email ng User sa Header
    const userEmailTag = document.getElementById('userEmailTag');
    if (userEmailTag) {
      userEmailTag.textContent = user.email;
    }

    // 3. I-fetch ang User Data mula sa Firestore
    db.collection("users").doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          state = doc.data();
          if (typeof STORAGE_KEY !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          }
        } else {
          if (typeof saveState === 'function') saveState();
        }
        if (typeof renderAll === 'function') renderAll();
      })
      .catch((err) => {
        console.error("Cloud fetch error:", err);
      });

  } else {
    // Kapag walang naka-login, ibalik sa Login Screen
    showLogin();
  }
});

// ============================================================
// 12. INITIALIZATION
// ============================================================
function renderAll() {
  renderFocusControls();
  renderDaysGrid();
  renderCategoryAnalytics();
  renderHabitsSection();
  renderOverallWidget();
  renderHistoryChart();
}

renderAll();
