// ============================================================
// 1. FIREBASE INITIALIZATION
// ============================================================
// ⚠️ PALITAN ANG MGA VALUES SA ILALIM MULA SA FIREBASE CONSOLE:
const firebaseConfig = {
  apiKey: "AIzaSyC-pxNm30epmjySVvvJ2YEsNOXKAVE4oKY",
  authDomain: "lingguhang-grind.firebaseapp.com",
  projectId: "lingguhang-grind",
  storageBucket: "lingguhang-grind.firebasestorage.app",
  messagingSenderId: "524469237908",
  appId: "1:524469237908:web:ec8ce37d581fe00ca79c81"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

// ============================================================
// 2. DATA — Full Schedule (Inayos para sa 5 PM Market + Preserved Tofu)
// ============================================================
const WEEK_DATA = [
  {
    key: "mon", name: "Monday", date: "Lunes", tag: "market", isMarketDay: true,
    market: [
      "🛒 [5:00 PM Jog Run] Bumili ng Tokwa (3 blocks - para sa Tue/Wed)",
      "🛒 Kangkong (2 bundles)",
      "🛒 Kamatis (1/2 kg) & Sibuyas / Bawang",
      "🛒 Coconut Oil (check supply)"
    ],
    meals: [
      "🥣 Lunch (1:00 PM): Ginisang Monggo + Tokwa (Stock mula Linggo)",
      "🍳 Dinner (8:00 PM): Tokwa Scramble (Gisa bawang/sibuyas/kamatis + 2 itlog)",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Night Jog 3km (Palengke Run sa Hapon - 5:00 PM)",
      "🔹 Push Circuit (10-10-10-5-10-10-10): Normal, Diamond, Wide, Archer, Mike Tyson, Reverse",
      "🔹 Core & Cardio (12x3 reps): Side/Cross Climbers, Plank Jacks, Shoulder Taps",
      "🔹 Lower Body (12x3 reps): Jump Squat, Pop Squat, Side Step Squat, Surrender+Jump"
    ]
  },
  {
    key: "tue", name: "Tuesday", date: "Martes", tag: "regular", isMarketDay: false,
    market: [
      "📦 Sangkap Check: Tokwa (⚠️ ILUBOG SA TUBIG NA MAY ASIN para hindi mapanis)",
      "📦 Sangkap Check: Kangkong (hugas at hiwa)",
      "📦 Sangkap Check: 2 Itlog, Bawang, Sibuyas",
      "📦 Sangkap Check: Coconut oil & Toyo/Asin"
    ],
    meals: [
      "🥗 Lunch (1:00 PM): Ginisang Kangkong na may Tokwa at Itlog",
      "🍳 Dinner (8:00 PM): Tortang Tokwa (I-mash ang tokwa, ihalo sa 2 itlog, iprito)",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Evening Jogging 4.5km (5:00 PM)",
      "🔹 Pushups Routine (12x3 reps): Pike, Sphinx, Diamond, Normal Pushup",
      "🔹 Core & Legs (12x3 reps): Side Climbers, Shoulder Taps, Jump Squat, Surrender+Jump"
    ]
  },
  {
    key: "wed", name: "Wednesday", date: "Miyerkules", tag: "market", isMarketDay: true,
    market: [
      "🛒 [5:00 PM Jog Run] Bumili ng Tokwa (3 blocks - para sa Thu/Fri)",
      "🛒 Sitaw (1 tali)",
      "🛒 Kamatis & Sibuyas/Bawang",
      "🛒 Check asin/toyo supply"
    ],
    meals: [
      "🥣 Lunch (1:00 PM): Ginisang Monggo / Leftover Tokwa",
      "🍳 Dinner (8:00 PM): Tokwa Scramble (Gisado sa kamatis + 2 itlog)",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Night Jog 3km (Palengke Run sa Hapon - 5:00 PM)",
      "🔹 Push Circuit (10-10-10-5-10-10-10): Normal, Diamond, Wide, Archer, Tyson, Reverse",
      "🔹 Core & Cardio (12x3 reps): Cross Climbers, Plank Jacks, Plank Up-Downs",
      "🔹 Legs Routine (12x3 reps): Pop Squat, Side Step Squat, Surrender + Jump"
    ]
  },
  {
    key: "thu", name: "Thursday", date: "Huwebes", tag: "regular", isMarketDay: false,
    market: [
      "📦 Sangkap Check: Tokwa (⚠️ Siguraduhing nakatabi sa malinis na tubig na may asin)",
      "📦 Sangkap Check: Sitaw (hiwain sa 1-2 inches)",
      "📦 Sangkap Check: 2-3 Itlog, Kamatis, Bawang, Sibuyas"
    ],
    meals: [
      "🍳 Lunch (1:00 PM): Tortang Tokwa (Patties/Omelette style)",
      "🍲 Dinner (8:00 PM): Ginisang Sitaw, Tokwa, Itlog",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Evening Jogging 4.5km (5:00 PM)",
      "🔹 Upper Body & Core (12x3 reps): Pike, Sphinx, Wide Pushup, Shoulder Taps",
      "🔹 Lower Body Circuit (12x3 reps): Jump Squat, Side Step Squat, Calf Raises"
    ]
  },
  {
    key: "fri", name: "Friday", date: "Biyernes", tag: "market", isMarketDay: true,
    market: [
      "🛒 [5:00 PM Jog Run] Bumili ng Tokwa (3 blocks - para sa Sat/Sun)",
      "🛒 Kangkong / Gulay",
      "🛒 Kamatis & Bawang/Sibuyas"
    ],
    meals: [
      "🥗 Lunch (1:00 PM): Ginisang Sitaw / Leftover Gulay at Tokwa",
      "🍳 Dinner (8:00 PM): Tokwa Scramble na may Kamatis",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Night Jog 3km (Palengke Run sa Hapon - 5:00 PM)",
      "🔹 Push Circuit (10-10-10-5-10-10-10)",
      "🔹 Full Body Cardio (12x3 reps): Side/Cross Climbers, Plank Jacks, Surrender+Jump"
    ]
  },
  {
    key: "sat", name: "Saturday", date: "Sabado", tag: "regular", isMarketDay: false,
    market: [
      "📦 Sangkap Check: Tokwa (hiwain nang malalapad para sa Steak - itabi sa brine)",
      "📦 Sangkap Check: Kamatis (gawing sarsa)",
      "📦 Sangkap Check: 1-2 Itlog (para sa Sunny Side Up)"
    ],
    meals: [
      "🥣 Lunch (1:00 PM): Ginisang Monggo + Tokwa",
      "🥩 Dinner (8:00 PM): Tokwa 'Steak' na may Kamatis (Pritong tokwa + Sunny side up egg)",
      "💧 Hydration: Uminom ng 3L na Tubig"
    ],
    exercises: [
      "🏃 Evening Jogging 4.5km (5:00 PM)",
      "🔹 Full Body Calisthenics (12x3 reps): Normal/Diamond/Pike Pushup, Plank Up-Downs, Jump Squat"
    ]
  },
  {
    key: "sun", name: "Sunday", date: "Linggo", tag: "market", isMarketDay: true,
    market: [
      "🛒 [5:00 PM Jog Run] Bumili ng 1 Dozen Eggs (stock para sa buong linggo)",
      "🛒 Dried Monggo (1-2 packs)",
      "🛒 Tokwa (1-2 blocks para sa dinner at Lunes Lunch)",
      "🛒 Ampalaya (1 piraso)"
    ],
    meals: [
      "🥗 Lunch (1:00 PM): Tokwa / Leftover Steak or Monggo",
      "🍳 Dinner (8:00 PM): Ginisang Ampalaya, Tokwa, Itlog (Pigaan ng asin ang ampalaya)",
      "💧 Hydration: Light recovery water"
    ],
    exercises: [
      "🏃 Night Jog 3km (Palengke Run sa Hapon - 5:00 PM)",
      "🧘 Rest Day / Light Recovery Stretching (15 mins) & Mobility Routine"
    ]
  }
];

const HABITS = [
  { key: "wake", label: "Gising ng 12:00 NN & Inom Tubig", deadlineHour: 13 }, // Locked after 1 PM
  { key: "lunch", label: "Tanghalian / Lunch (1:00 PM)", deadlineHour: 15 },   // Locked after 3 PM
  { key: "workout", label: "Calisthenics Workout (4:00 PM)", deadlineHour: 17 },// Locked after 5 PM
  { key: "move", label: "Jogging & Market Run (5:00 PM)", deadlineHour: 19 },   // Locked after 7 PM
  { key: "dinner", label: "Hapunan / Dinner (8:00 PM)", deadlineHour: 22 }     // Locked after 10 PM
];

// ============================================================
// 3. REAL-TIME CLOCK & TIME-LOCK ENGINE
// ============================================================
function startLiveClock() {
  setInterval(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: true });
    const dateStr = now.toLocaleDateString('tl-PH', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

    // Clock sa Dashboard
    const clockTimeEl = document.getElementById('clockTime');
    const clockDateEl = document.getElementById('clockDate');
    if (clockTimeEl) clockTimeEl.textContent = timeStr;
    if (clockDateEl) clockDateEl.textContent = dateStr;

    // Clock sa Login Modal (kung may element)
    const loginClockEl = document.getElementById('loginClock');
    if (loginClockEl) loginClockEl.textContent = `${dateStr} | ${timeStr}`;

    // Awtomatikong Time-Check at Alarm Reminders
    checkTimeAlarms(now);
    checkSundayNightAutoReset(now);
  }, 1000);
}

// Function para suriin kung ang isang task ay locked na (Missed Deadline)
function isTaskTimeLocked(dayKey, deadlineHour) {
  const now = new Date();
  const order = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const currentDayIndex = now.getDay();
  const taskDayIndex = order.indexOf(dayKey);

  // Kung ang araw ay nakalipas na ngayong linggo -> LOCKED
  if (taskDayIndex < currentDayIndex) return true;

  // Kung araw ngayon pero lagpas na sa deadline hour -> LOCKED
  if (taskDayIndex === currentDayIndex && now.getHours() >= deadlineHour) return true;

  return false; // Bukas pa at pwedeng sagutan
}

// ============================================================
// 4. ALARM & NOTIFICATION REMINDERS
// ============================================================
let lastTriggeredHour = -1;

function checkTimeAlarms(now) {
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (currentMinute === 0 && currentHour !== lastTriggeredHour) {
    lastTriggeredHour = currentHour;
    
    let msg = "";
    if (currentHour === 12) msg = "⏰ 12:00 NN: Oras na para gumising at uminom ng 1L na tubig!";
    if (currentHour === 13) msg = "🥣 1:00 PM: Oras na ng iyong Tanghalian / Lunch!";
    if (currentHour === 16) msg = "🏋️ 4:00 PM: Oras na para sa iyong Calisthenics Workout!";
    if (currentHour === 17) msg = "🏃 5:00 PM: Oras na para sa Jogging & Palengke Run!";
    if (currentHour === 20) msg = "🍳 8:00 PM: Oras na ng Hapunan / Dinner (No-Rice)!";

    if (msg !== "") {
      playAlarmSound();
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Lingguhang Grind Reminder", { body: msg, icon: "🌱" });
      } else {
        alert(msg);
      }
    }
  }
}

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

function playAlarmSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch(e) {}
}

// ============================================================
// 5. AUTOMATIC SUNDAY NIGHT RESET & RECORD
// ============================================================
let hasAutoRecordedThisWeek = false;

function checkSundayNightAutoReset(now) {
  // Linggo (Day 0) at 11:50 PM pataas
  if (now.getDay() === 0 && now.getHours() === 23 && now.getMinutes() >= 50) {
    if (!hasAutoRecordedThisWeek) {
      hasAutoRecordedThisWeek = true;

      let totalAll = 0;
      let doneAll = 0;

      WEEK_DATA.forEach(day => {
        const stats = getDayStats(day);
        totalAll += stats.total;
        doneAll += stats.done;
      });

      const weekPct = totalAll === 0 ? 0 : Math.round((doneAll / totalAll) * 100);

      // Save sa History
      state.history.push({
        date: now.toLocaleDateString('tl-PH'),
        score: weekPct
      });

      // Clear checkboxes para sa bagong linggo
      state.market = {};
      state.exercises = {};
      state.meals = {};
      state.habits = {};

      saveState();
      renderAll();
      console.log("Automatic Sunday Night Record & Reset Completed!");
    }
  } else {
    hasAutoRecordedThisWeek = false;
  }
}

// ============================================================
// 6. STORAGE & STATE MANAGEMENT
// ============================================================
const STORAGE_KEY = "lingguhang-grind-master-v6";

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
      focus: "5 PM Palengke Run + Calisthenics Circuits & Tokwa Meal Prep",
      reward: "Bagong Athletic Gear / Cheat Meal",
      affirmation: "Walang susuko, pitong laban!"
    },
    history: []
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const user = auth.currentUser;
  if (user) {
    db.collection("users").doc(user.uid).set(state)
      .catch((err) => console.error("Cloud Sync Error:", err));
  }
}

let state = loadState();

// ============================================================
// 7. HELPERS & ANALYTICS
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
// 8. RENDER FUNCTIONS WITH TIME-LOCK INTEGRATION
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

function renderHabitsSection() {
  const headRow = document.getElementById('habitHeadRow');
  const body = document.getElementById('habitBody');
  if (!headRow || !body) return;

  headRow.innerHTML = `<th>Habit Time Lock</th>` +
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
        const isChecked = (state.habits[day.key] && state.habits[day.key][habit.key]);
        const isLocked = isTaskTimeLocked(day.key, habit.deadlineHour) && !isChecked;
        const disabledAttr = isLocked ? "disabled" : "";
        const checkedAttr = isChecked ? "checked" : "";
        const titleAttr = isLocked ? "title='🔒 Lagpas na sa oras! Hindi na pwedeng i-check.'" : "";

        return `<td>
          <input type="checkbox" class="habit-checkbox ${isLocked ? 'locked-box' : ''}" 
            data-habit="${habit.key}" data-day="${day.key}" ${checkedAttr} ${disabledAttr}${titleAttr}>
        </td>`;
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

  // Render Habit Line Chart
  const habitChartEl = document.getElementById('habitLineChart');
  if (habitChartEl) {
    const ctx = habitChartEl.getContext('2d');
    if (window.habitLineChartInstance) window.habitLineChartInstance.destroy();

    window.habitLineChartInstance = new Chart(ctx, {
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
          borderWidth: 2
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
}

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

    const marketHeaderTitle = day.isMarketDay ? "🛒 5:00 PM Palengke Run" : "📦 Inventory / Sangkap Check";

    col.innerHTML = `
      <div class="day-col-header">
        <div class="day-col-title">${day.name}</div>
        <div class="day-col-date">${day.date} ${day.isMarketDay ? "• Market 5PM" : ""}</div>
      </div>

      <div class="day-col-gauge">
        <svg class="ring-svg" viewBox="0 0 100 100">
          <circle class="ring-bg" cx="50" cy="50" r="36"></circle>
          <circle class="ring-fg" data-ring="${day.key}" cx="50" cy="50" r="36" transform="rotate(-90 50 50)"></circle>
        </svg>
        <div class="overall-ring-text">${pctInt}%</div>
      </div>

      <div class="day-col-content">
        
        <!-- MARKET OR INVENTORY -->
        <div>
          <div class="section-label">${marketHeaderTitle}</div>
          <div class="col-task-list">
            ${day.market.map((item, i) => {
              const isChecked = (state.market[day.key] || [])[i];
              const isLocked = isTaskTimeLocked(day.key, 19) && !isChecked; // Locked after 7 PM
              return `<label class="col-task-item ${isLocked ? 'item-locked' : ''}">
                <input type="checkbox" data-cat="market" data-day="${day.key}" data-index="${i}" ${isChecked ? "checked" : ""} ${isLocked ? "disabled" : ""}>
                <span class="${isChecked ? "done" : ""}">${item}${isLocked ? "🔒" : ""}</span>
              </label>`;
            }).join('')}
          </div>
        </div>

        <!-- EXERCISES -->
        <div>
          <div class="section-label">🏋️ Exercises Routine</div>
          <div class="col-task-list">
            ${day.exercises.map((ex, i) => {
              const isChecked = (state.exercises[day.key] || [])[i];
              const isLocked = isTaskTimeLocked(day.key, 19) && !isChecked; // Locked after 7 PM
              return `<label class="col-task-item ${isLocked ? 'item-locked' : ''}">
                <input type="checkbox" data-cat="exercises" data-day="${day.key}" data-index="${i}" ${isChecked ? "checked" : ""} ${isLocked ? "disabled" : ""}>
                <span class="${isChecked ? "done" : ""}">${ex}${isLocked ? "🔒" : ""}</span>
              </label>`;
            }).join('')}
          </div>
        </div>

        <!-- MEALS -->
        <div>
          <div class="section-label">🥗 Meal Plan & Cooking Guide</div>
          <div class="col-task-list">
            ${day.meals.map((m, i) => {
              const isChecked = (state.meals[day.key] || [])[i];
              const isLocked = isTaskTimeLocked(day.key, 22) && !isChecked; // Locked after 10 PM
              return `<label class="col-task-item ${isLocked ? 'item-locked' : ''}">
                <input type="checkbox" data-cat="meals" data-day="${day.key}" data-index="${i}" ${isChecked ? "checked" : ""} ${isLocked ? "disabled" : ""}>
                <span class="${isChecked ? "done" : ""}">${m}${isLocked ? "🔒" : ""}</span>
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

function renderCategoryAnalytics() {
  const mStats = getCategoryStats('market');
  const eStats = getCategoryStats('exercises');
  const mealStats = getCategoryStats('meals');

  if (document.getElementById('marketPctText')) document.getElementById('marketPctText').textContent = Math.round(mStats.pct * 100) + '%';
  if (document.getElementById('marketCountText')) document.getElementById('marketCountText').textContent = `${mStats.done} / ${mStats.total}`;
  updateRing('marketRingFill', mStats.pct, 36);

  if (document.getElementById('exercisePctText')) document.getElementById('exercisePctText').textContent = Math.round(eStats.pct * 100) + '%';
  if (document.getElementById('exerciseCountText')) document.getElementById('exerciseCountText').textContent = `${eStats.done} / ${eStats.total}`;
  updateRing('exerciseRingFill', eStats.pct, 36);

  if (document.getElementById('mealPctText')) document.getElementById('mealPctText').textContent = Math.round(mealStats.pct * 100) + '%';
  if (document.getElementById('mealCountText')) document.getElementById('mealCountText').textContent = `${mealStats.done} / ${mealStats.total}`;
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
  if (document.getElementById('overallPercentText')) document.getElementById('overallPercentText').textContent = Math.round(weekPct * 100) + '%';
  if (document.getElementById('completedCounterText')) document.getElementById('completedCounterText').textContent = `${doneAll} / ${totalAll} Done`;

  updateRing('overallRingFill', weekPct, 40);

  const overallBarChartEl = document.getElementById('overallBarChart');
  if (overallBarChartEl) {
    const ctx = overallBarChartEl.getContext('2d');
    if (window.barChartInstance) window.barChartInstance.destroy();

    window.barChartInstance = new Chart(ctx, {
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
}

function renderHistoryChart() {
  const historyChartEl = document.getElementById('historyChart');
  if (!historyChartEl) return;
  const ctx = historyChartEl.getContext('2d');

  const labels = state.history.map((_, i) => `Week ${i + 1}`);
  const scores = state.history.map(item => item.score);

  if (window.historyChartInstance) window.historyChartInstance.destroy();

  window.historyChartInstance = new Chart(ctx, {
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
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { min: 0, max: 100, ticks: { color: '#8a8a9a' }, grid: { color: '#262632' } },
        x: { ticks: { color: '#8a8a9a' }, grid: { color: '#262632' } }
      }
    }
  });
}

// Reset Button Handler
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
// 9. AUTHENTICATION & CLOUD SYNC
// ============================================================
function showDashboard() {
  const overlay = document.getElementById('authOverlay');
  const appContent = document.getElementById('appContent');
  if (overlay) overlay.style.display = 'none';
  if (appContent) appContent.style.display = 'block';
  requestNotificationPermission();
}

function showLogin() {
  const overlay = document.getElementById('authOverlay');
  const appContent = document.getElementById('appContent');
  if (overlay) overlay.style.display = 'flex';
  if (appContent) appContent.style.display = 'none';
}

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

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => showLogin());
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    showDashboard();
    const userEmailTag = document.getElementById('userEmailTag');
    if (userEmailTag) userEmailTag.textContent = user.email;

    db.collection("users").doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          state = doc.data();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } else {
          saveState();
        }
        renderAll();
      })
      .catch((err) => console.error("Cloud fetch error:", err));
  } else {
    showLogin();
  }
});

// ============================================================
// 10. INITIALIZATION
// ============================================================
function renderAll() {
  renderFocusControls();
  renderDaysGrid();
  renderCategoryAnalytics();
  renderHabitsSection();
  renderOverallWidget();
  renderHistoryChart();
}

// Simulan ang Live Clock at Application
startLiveClock();
renderAll();
