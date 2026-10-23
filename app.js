/* ============================================================
   EXAMOS • CORE APPLICATION LOGIC (ES6 JAVASCRIPT)
   Operating System Resource Management Simulation
   CO1 to CO5 Modules, Concurrency, Paging, Deadlock & Scheduling
   ============================================================ */

// ============================================================
// 1. DATA REPOSITORIES (MATCHING ORIGINAL PYTHON SPECIFICATION)
// ============================================================

const STUDENTS = [
  { pid: "P101", name: "Aarav", dept: "Computer", hall: "H1", seat: "S01", page: "H1-P1", blocks: [10, 11], state: "READY", priority: 1, burst: "3h" },
  { pid: "P102", name: "Riya", dept: "Computer", hall: "H1", seat: "S02", page: "H1-P1", blocks: [12], state: "READY", priority: 1, burst: "3h" },
  { pid: "P103", name: "Aditya", dept: "Computer", hall: "H1", seat: "S03", page: "H1-P1", blocks: [13, 14], state: "READY", priority: 1, burst: "3h" },
  { pid: "P104", name: "Sneha", dept: "IT", hall: "H2", seat: "S01", page: "H2-P1", blocks: [20, 21], state: "READY", priority: 2, burst: "3h" },
  { pid: "P105", name: "Rahul", dept: "IT", hall: "H2", seat: "S02", page: "H2-P1", blocks: [22], state: "READY", priority: 2, burst: "3h" },
  { pid: "P106", name: "Priya", dept: "IT", hall: "H2", seat: "S03", page: "H2-P1", blocks: [23], state: "READY", priority: 2, burst: "3h" },
  { pid: "P107", name: "Om", dept: "Mechanical", hall: "H3", seat: "S01", page: "H3-P1", blocks: [30, 31], state: "READY", priority: 3, burst: "3h" },
  { pid: "P108", name: "Ananya", dept: "Mechanical", hall: "H3", seat: "S02", page: "H3-P1", blocks: [32, 33], state: "READY", priority: 3, burst: "3h" },
  { pid: "P109", name: "Karan", dept: "Mechanical", hall: "H3", seat: "S03", page: "H3-P1", blocks: [34, 35], state: "READY", priority: 3, burst: "3h" },
  { pid: "P110", name: "Neha", dept: "Civil", hall: "H4", seat: "S01", page: "H4-P1", blocks: [40, 41], state: "READY", priority: 4, burst: "3h" },
  { pid: "P111", name: "Vivek", dept: "Civil", hall: "H4", seat: "S02", page: "H4-P1", blocks: [42], state: "READY", priority: 4, burst: "3h" },
  { pid: "P112", name: "Isha", dept: "Civil", hall: "H4", seat: "S03", page: "H4-P1", blocks: [43, 44], state: "READY", priority: 4, burst: "3h" }
];

const INVIGILATORS = [
  { id: "I1", name: "Mr. Patil", priority: 1, hall: "H1", status: "READY", progress: 0 },
  { id: "I2", name: "Ms. Sharma", priority: 2, hall: "H2", status: "READY", progress: 0 },
  { id: "I3", name: "Mr. Khan", priority: 3, hall: "H3", status: "READY", progress: 0 },
  { id: "I4", name: "Ms. Joshi", priority: 4, hall: "H4", status: "READY", progress: 0 }
];

const HALLS = [
  { id: "H1", name: "Hall 1", dept: "Computer Engineering", capacity: 30, occupied: 3, invigilator: "Mr. Patil (I1)", color: "blue" },
  { id: "H2", name: "Hall 2", dept: "Information Technology", capacity: 30, occupied: 3, invigilator: "Ms. Sharma (I2)", color: "cyan" },
  { id: "H3", name: "Hall 3", dept: "Mechanical Engineering", capacity: 30, occupied: 3, invigilator: "Mr. Khan (I3)", color: "purple" },
  { id: "H4", name: "Hall 4", dept: "Civil Engineering", capacity: 30, occupied: 3, invigilator: "Ms. Joshi (I4)", color: "green" }
];

const DISK_FILES = [
  { name: "Computer_H1_Seating.txt", dept: "Computer", hall: "H1", start: 10, length: 5, color: "f1", blocks: [10, 11, 12, 13, 14] },
  { name: "IT_H2_Seating.txt", dept: "IT", hall: "H2", start: 20, length: 4, color: "f2", blocks: [20, 21, 22, 23] },
  { name: "Mechanical_H3_Seating.txt", dept: "Mechanical", hall: "H3", start: 30, length: 6, color: "f3", blocks: [30, 31, 32, 33, 34, 35] },
  { name: "Civil_H4_Seating.txt", dept: "Civil", hall: "H4", start: 40, length: 5, color: "f4", blocks: [40, 41, 42, 43, 44] }
];

const DIRECTORY_TREE = {
  name: "College_Exam",
  type: "folder",
  children: [
    {
      name: "Computer",
      type: "folder",
      children: [
        {
          name: "Semester_4",
          type: "folder",
          children: [
            {
              name: "Seating_Plan.txt",
              type: "file",
              content: `========================================================\nDEPARTMENT: Computer Engineering | SEMESTER: 4\nHALL: H1 | INVIGILATOR: Mr. Patil (Priority: 1)\n========================================================\nSEAT   PID    STUDENT NAME     STATUS\n--------------------------------------------------------\nS01    P101   Aarav            ALLOCATED [READY]\nS02    P102   Riya             ALLOCATED [READY]\nS03    P103   Aditya           ALLOCATED [READY]\n\nDISK ALLOCATION: Blocks 10, 11, 12, 13, 14 (Contiguous)\nPAGE MAPPING   : H1-P1 (Frames 1-10 in RAM)`
            },
            {
              name: "Student_List.txt",
              type: "file",
              content: `STUDENT ROSTER - COMPUTER ENGINEERING (SEM 4)\nTotal Candidates: 3\n1. Aarav (P101) - Regular - Hall H1 - Desk S01\n2. Riya (P102) - Regular - Hall H1 - Desk S02\n3. Aditya (P103) - Regular - Hall H1 - Desk S03`
            }
          ]
        }
      ]
    },
    {
      name: "IT",
      type: "folder",
      children: [
        {
          name: "Semester_4",
          type: "folder",
          children: [
            {
              name: "Seating_Plan.txt",
              type: "file",
              content: `========================================================\nDEPARTMENT: Information Technology | SEMESTER: 4\nHALL: H2 | INVIGILATOR: Ms. Sharma (Priority: 2)\n========================================================\nSEAT   PID    STUDENT NAME     STATUS\n--------------------------------------------------------\nS01    P104   Sneha            ALLOCATED [READY]\nS02    P105   Rahul            ALLOCATED [READY]\nS03    P106   Priya            ALLOCATED [READY]\n\nDISK ALLOCATION: Blocks 20, 21, 22, 23 (Contiguous)\nPAGE MAPPING   : H2-P1 (Frames 1-10 in RAM)`
            },
            {
              name: "Student_List.txt",
              type: "file",
              content: `STUDENT ROSTER - INFORMATION TECHNOLOGY (SEM 4)\nTotal Candidates: 3\n1. Sneha (P104) - Regular - Hall H2 - Desk S01\n2. Rahul (P105) - Regular - Hall H2 - Desk S02\n3. Priya (P106) - Regular - Hall H2 - Desk S03`
            }
          ]
        }
      ]
    },
    {
      name: "Mechanical",
      type: "folder",
      children: [
        {
          name: "Semester_4",
          type: "folder",
          children: [
            {
              name: "Seating_Plan.txt",
              type: "file",
              content: `========================================================\nDEPARTMENT: Mechanical Engineering | SEMESTER: 4\nHALL: H3 | INVIGILATOR: Mr. Khan (Priority: 3)\n========================================================\nSEAT   PID    STUDENT NAME     STATUS\n--------------------------------------------------------\nS01    P107   Om               ALLOCATED [READY]\nS02    P108   Ananya           ALLOCATED [READY]\nS03    P109   Karan            ALLOCATED [READY]\n\nDISK ALLOCATION: Blocks 30, 31, 32, 33, 34, 35 (Contiguous)\nPAGE MAPPING   : H3-P1 (Frames 1-10 in RAM)`
            },
            {
              name: "Student_List.txt",
              type: "file",
              content: `STUDENT ROSTER - MECHANICAL ENGINEERING (SEM 4)\nTotal Candidates: 3\n1. Om (P107) - Regular - Hall H3 - Desk S01\n2. Ananya (P108) - Regular - Hall H3 - Desk S02\n3. Karan (P109) - Regular - Hall H3 - Desk S03`
            }
          ]
        }
      ]
    },
    {
      name: "Civil",
      type: "folder",
      children: [
        {
          name: "Semester_4",
          type: "folder",
          children: [
            {
              name: "Seating_Plan.txt",
              type: "file",
              content: `========================================================\nDEPARTMENT: Civil Engineering | SEMESTER: 4\nHALL: H4 | INVIGILATOR: Ms. Joshi (Priority: 4)\n========================================================\nSEAT   PID    STUDENT NAME     STATUS\n--------------------------------------------------------\nS01    P110   Neha             ALLOCATED [READY]\nS02    P111   Vivek            ALLOCATED [READY]\nS03    P112   Isha             ALLOCATED [READY]\n\nDISK ALLOCATION: Blocks 40, 41, 42, 43, 44 (Contiguous)\nPAGE MAPPING   : H4-P1 (Frames 1-10 in RAM)`
            },
            {
              name: "Student_List.txt",
              type: "file",
              content: `STUDENT ROSTER - CIVIL ENGINEERING (SEM 4)\nTotal Candidates: 3\n1. Neha (P110) - Regular - Hall H4 - Desk S01\n2. Vivek (P111) - Regular - Hall H4 - Desk S02\n3. Isha (P112) - Regular - Hall H4 - Desk S03`
            }
          ]
        }
      ]
    }
  ]
};

// ============================================================
// 2. STATE MANAGEMENT & APPLICATION INIT
// ============================================================

let currentBatchStage = 0;
let threadsRunning = false;
let threadInterval = null;
let deadlockDetected = false;
let deadlockResolved = false;

// LRU State
let lruReferenceQueue = [];
let lruFrames = [null, null, null];
let lruStepIndex = 0;
let lruStats = { total: 0, hits: 0, faults: 0 };

document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initTheme();
  initNavigation();
  initGlobalSearch();

  // Render initial views
  renderDashboardHalls();
  renderClassrooms("all");
  renderSeatingTable();
  renderProcessPcbTable();
  renderThreadCards();
  renderCo1Pipeline();
  renderCo2Tables();
  renderCo3Fcfs();
  renderCo3Priority();
  renderDiskBlocks();
  renderTreeDirectory();
  renderLabReport();

  // Event listeners for simulations
  setupSimulationListeners();

  // Initial kernel log entry
  logKernel("SYSTEM", "ExamOS Kernel booted successfully. All 12 student PCBs and 4 TCBs mapped to memory.");
  logKernel("SCHEDULER", "FCFS queue initialized. Hall allocations R1→H1, R2→H2, R3→H3, R4→H4 ready.");
});

// ============================================================
// 3. NAVIGATION & UI CONTROLS
// ============================================================

function initGlobalSearch() {
  const globalSearch = document.getElementById("global-search");
  if (globalSearch) {
    globalSearch.addEventListener("input", (e) => {
      const q = e.target.value;
      renderSeatingTable(q);
      if (q.length > 1) {
        navigateTo("schedule");
      }
    });
  }
}

function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const pageId = item.dataset.page;
      navigateTo(pageId);
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const sidebar = document.getElementById("sidebar");
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
    });
  }

  // Segmented control in schedule view
  const segButtons = document.querySelectorAll("#hall-filter-group .seg-btn");
  segButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      segButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      renderClassrooms(filter);
    });
  });

  // Tab controls in sub-pages (CO2, CO3, CO4, CO5)
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const container = btn.closest(".tabs-container");
      const tabTarget = btn.dataset.tab;

      container.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      container.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(`tab-${tabTarget}`);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // URL Hash routing support (supports #page or #page:tab)
  function handleHash() {
    const raw = window.location.hash.replace("#", "");
    if (!raw) return;
    if (raw.includes(":")) {
      const [page, tab] = raw.split(":");
      navigateTo(page);
      setTimeout(() => {
        const tabBtn = document.querySelector(`[data-tab="${tab}"]`);
        if (tabBtn) tabBtn.click();
      }, 50);
    } else {
      navigateTo(raw);
    }
  }

  window.addEventListener("hashchange", handleHash);
  handleHash();
}

function navigateTo(pageId) {
  if (window.location.hash !== `#${pageId}`) {
    history.replaceState(null, "", `#${pageId}`);
  }
  // Update nav buttons
  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.dataset.page === pageId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Update views
  document.querySelectorAll(".page-view").forEach(view => {
    view.classList.remove("active");
  });

  const targetView = document.getElementById(`view-${pageId}`);
  if (targetView) {
    targetView.classList.add("active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update header breadcrumb & title
  const pageTitles = {
    dashboard: { title: "Executive Dashboard", crumb: "Dashboard" },
    schedule: { title: "Examination Seating Matrix & Halls", crumb: "Seating Matrix" },
    processes: { title: "Student Process Management (PCB)", crumb: "Processes" },
    threads: { title: "Invigilator Multithreading Engine", crumb: "Threads" },
    co1: { title: "CO1 • Batch Processing Pipeline", crumb: "Batch Processing" },
    co2: { title: "CO2 • Process & Thread Concurrency", crumb: "Processes & Threads" },
    co3: { title: "CO3 • Scheduling Algorithms & Deadlock", crumb: "Scheduling & Deadlock" },
    co4: { title: "CO4 • Virtual Memory & LRU Simulation", crumb: "Memory & LRU" },
    co5: { title: "CO5 • Storage Allocation & Tree Directory", crumb: "Files & Directory" },
    report: { title: "Comprehensive OS Lab Report", crumb: "Lab Report" }
  };

  const meta = pageTitles[pageId] || { title: "ExamOS Control Center", crumb: "Overview" };
  document.getElementById("page-title").textContent = meta.title;
  document.getElementById("current-crumb").textContent = meta.crumb;

  // Close mobile sidebar if open
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.remove("mobile-open");
}

function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const urlParamTheme = new URLSearchParams(window.location.search).get("theme");
  const savedTheme = urlParamTheme || localStorage.getItem("examos_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("examos_theme", next);
      showToast(`Switched to ${next.toUpperCase()} mode`, "info");
    });
  }
}

function initClock() {
  const clockEl = document.getElementById("clock-display");
  function tick() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${hrs}:${mins}:${secs}`;
  }
  tick();
  setInterval(tick, 1000);
}

// ============================================================
// 4. RENDERING MODULES
// ============================================================

// --- DASHBOARD HALLS ---
function renderDashboardHalls() {
  const container = document.getElementById("dash-halls-grid");
  if (!container) return;

  container.innerHTML = HALLS.map(hall => `
    <div class="hall-mini-card">
      <div class="hall-mini-head">
        <div>
          <span class="hall-mini-name">${hall.name}</span>
          <span class="hall-mini-dept">${hall.dept}</span>
        </div>
        <span class="badge badge-${hall.color}">Active</span>
      </div>
      <div class="capacity-bar-wrap">
        <div class="capacity-labels">
          <span>Capacity Usage: <strong>${hall.occupied} / ${hall.capacity} desks</strong></span>
          <span>${Math.round((hall.occupied / hall.capacity) * 100)}%</span>
        </div>
        <div class="capacity-progress-bg">
          <div class="capacity-progress-fill" style="width: ${(hall.occupied / hall.capacity) * 100}%"></div>
        </div>
      </div>
      <div style="font-size: 0.74rem; color: var(--text-dim); display:flex; justify-content:space-between;">
        <span>Invigilator: <strong>${hall.invigilator}</strong></span>
        <span>FCFS Ready</span>
      </div>
    </div>
  `).join("");
}

// --- SCHEDULE & CLASSROOM FLOOR PLANS ---
function renderClassrooms(filter) {
  const container = document.getElementById("classroom-grid");
  if (!container) return;

  const filteredHalls = filter === "all" ? HALLS : HALLS.filter(h => h.id === filter);

  container.innerHTML = filteredHalls.map(hall => {
    const studentsInHall = STUDENTS.filter(s => s.hall === hall.id);
    const assignedInvigilator = INVIGILATORS.find(i => i.hall === hall.id) || { name: "Assigned Supervisor", priority: 1 };

    return `
      <div class="hall-plan-card">
        <div class="hall-header-row">
          <div class="hall-title-box">
            <span class="hall-name">${hall.name} • ${hall.dept}</span>
            <span class="hall-dept-pill">Room Capacity: ${hall.capacity} Desks • FCFS Batch Slot</span>
          </div>
          <span class="badge badge-${hall.color}">Hall ${hall.id}</span>
        </div>

        <!-- Supervisor Podium -->
        <div class="invigilator-podium">
          <div class="podium-left">
            <span class="podium-icon">👨‍🏫</span>
            <div>
              <div class="podium-label">Invigilator (Thread)</div>
              <div class="podium-name">${assignedInvigilator.name} (${assignedInvigilator.id})</div>
            </div>
          </div>
          <span class="badge badge-purple">Priority ${assignedInvigilator.priority}</span>
        </div>

        <!-- Student Desks Grid -->
        <div class="desks-grid">
          ${studentsInHall.map(s => `
            <div class="desk-item" onclick="openStudentModal('${s.pid}')" title="Click to view Process Control Block">
              <span class="desk-seat-code">${s.seat}</span>
              <span class="desk-student-name">${s.name}</span>
              <span class="desk-pid-code">PID: ${s.pid}</span>
              <span class="desk-status-badge">${s.state}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

// --- MASTER SEATING REGISTER TABLE ---
function renderSeatingTable(searchQuery = "") {
  const tbody = document.getElementById("seating-table-body");
  if (!tbody) return;

  const query = searchQuery.toLowerCase().trim();
  const filtered = STUDENTS.filter(s =>
    !query ||
    s.name.toLowerCase().includes(query) ||
    s.pid.toLowerCase().includes(query) ||
    s.dept.toLowerCase().includes(query) ||
    s.hall.toLowerCase().includes(query) ||
    s.seat.toLowerCase().includes(query)
  );

  tbody.innerHTML = filtered.map(s => `
    <tr>
      <td><code>${s.pid}</code></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.dept}</td>
      <td><span class="badge badge-blue">${s.hall}</span></td>
      <td><code>${s.seat}</code></td>
      <td><code>${s.page}</code></td>
      <td><code>${s.blocks.join(", ")}</code></td>
      <td><span class="badge badge-green">${s.state}</span></td>
      <td>
        <button class="btn btn-xs btn-outline" onclick="openStudentModal('${s.pid}')">Inspect PCB</button>
      </td>
    </tr>
  `).join("");
}

// --- STUDENT PROCESSES PCB TABLE ---
function renderProcessPcbTable() {
  const tbody = document.getElementById("process-pcb-table-body");
  if (!tbody) return;

  tbody.innerHTML = STUDENTS.map(s => `
    <tr>
      <td><code>${s.pid}</code></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.dept}</td>
      <td>${s.hall}</td>
      <td>${s.seat}</td>
      <td>${s.burst}</td>
      <td>Priority ${s.priority}</td>
      <td><span class="badge ${s.state === 'READY' ? 'badge-green' : s.state === 'RUNNING' ? 'badge-orange' : 'badge-purple'}">${s.state}</span></td>
      <td>
        <button class="btn btn-xs btn-outline" onclick="toggleProcessState('${s.pid}')">Toggle State</button>
      </td>
    </tr>
  `).join("");

  updateProcessStateCounters();
}

function updateProcessStateCounters() {
  const ready = STUDENTS.filter(s => s.state === "READY").length;
  const running = STUDENTS.filter(s => s.state === "RUNNING").length;
  const completed = STUDENTS.filter(s => s.state === "COMPLETED").length;

  const rEl = document.getElementById("count-ready");
  const runEl = document.getElementById("count-running");
  const cEl = document.getElementById("count-completed");

  if (rEl) rEl.textContent = ready;
  if (runEl) runEl.textContent = running;
  if (cEl) cEl.textContent = completed;
}

function toggleProcessState(pid) {
  const student = STUDENTS.find(s => s.pid === pid);
  if (!student) return;

  if (student.state === "READY") {
    student.state = "RUNNING";
  } else if (student.state === "RUNNING") {
    student.state = "COMPLETED";
  } else {
    student.state = "READY";
  }

  renderProcessPcbTable();
  renderClassrooms("all");
  renderSeatingTable();
  renderCo2Tables();
  logKernel("PROCESS", `Student Process ${student.pid} (${student.name}) transitioned to state: ${student.state}`);
  showToast(`${student.name} (${student.pid}) is now ${student.state}`, "info");
}

// --- INVIGILATOR THREAD MONITOR ---
function renderThreadCards() {
  const container = document.getElementById("threads-grid");
  if (!container) return;

  container.innerHTML = INVIGILATORS.map(inv => `
    <div class="thread-worker-card ${inv.status === 'RUNNING' ? 'running' : ''}" id="thread-card-${inv.id}">
      <div class="thread-top">
        <div class="thread-name-box">
          <span class="thread-id">TCB: ${inv.id}</span>
          <span class="thread-name">${inv.name}</span>
        </div>
        <span class="badge badge-purple">Priority ${inv.priority}</span>
      </div>

      <div class="thread-bar-bg">
        <div class="thread-bar-fill" id="thread-fill-${inv.id}" style="width: ${inv.progress}%"></div>
      </div>

      <div class="thread-meta-row">
        <span>Assigned: <strong>${inv.hall}</strong></span>
        <span id="thread-status-${inv.id}">${inv.status}</span>
      </div>
    </div>
  `).join("");
}

// --- CO1 PIPELINE RENDERING ---
function renderCo1Pipeline() {
  const container = document.getElementById("co1-pipeline-steps");
  if (!container) return;

  const steps = [
    { num: 1, title: "Load Student Records", desc: "12 PCB entities imported" },
    { num: 2, title: "FCFS Hall Scheduling", desc: "Arrival queue R1→R4 mapped" },
    { num: 3, title: "Priority Dispatch", desc: "Invigilator priority assigned" },
    { num: 4, title: "Virtual Seating Paging", desc: "LRU page mapping allocated" },
    { num: 5, title: "Disk Block Commit", desc: "Contiguous file allocation" }
  ];

  container.innerHTML = steps.map(s => `
    <div class="p-step-box ${s.num <= currentBatchStage ? 'completed' : s.num === currentBatchStage + 1 ? 'active' : ''}" id="co1-step-${s.num}">
      <div class="p-step-badge">${s.num <= currentBatchStage ? '✓' : s.num}</div>
      <div class="p-step-title">${s.title}</div>
      <div class="p-step-desc">${s.desc}</div>
    </div>
  `).join("");
}

// --- CO2 SUB-TABLES ---
function renderCo2Tables() {
  const sTbody = document.getElementById("co2-student-table-body");
  if (sTbody) {
    sTbody.innerHTML = STUDENTS.map(s => `
      <tr>
        <td><code>${s.pid}</code></td>
        <td><strong>${s.name}</strong></td>
        <td>${s.dept}</td>
        <td>${s.hall}</td>
        <td>${s.seat}</td>
        <td><span class="badge badge-green">${s.state}</span></td>
      </tr>
    `).join("");
  }

  const tTbody = document.getElementById("co2-threads-table-body");
  if (tTbody) {
    tTbody.innerHTML = INVIGILATORS.map(inv => `
      <tr>
        <td><code>${inv.id}</code></td>
        <td><strong>${inv.name}</strong></td>
        <td>Priority ${inv.priority}</td>
        <td>${inv.hall}</td>
        <td><span class="badge ${inv.status === 'RUNNING' ? 'badge-orange' : 'badge-purple'}">${inv.status}</span></td>
      </tr>
    `).join("");
  }
}

// --- CO3 FCFS & PRIORITY RENDERING ---
function renderCo3Fcfs() {
  const tbody = document.getElementById("fcfs-table-body");
  if (!tbody) return;

  const requests = [
    { req: "R1", dept: "Computer Engineering", hall: "H1", students: 3, arrival: "09:00 AM", status: "ALLOCATED" },
    { req: "R2", dept: "Information Technology", hall: "H2", students: 3, arrival: "09:05 AM", status: "ALLOCATED" },
    { req: "R3", dept: "Mechanical Engineering", hall: "H3", students: 3, arrival: "09:10 AM", status: "ALLOCATED" },
    { req: "R4", dept: "Civil Engineering", hall: "H4", students: 3, arrival: "09:15 AM", status: "ALLOCATED" }
  ];

  tbody.innerHTML = requests.map(r => `
    <tr>
      <td><code>${r.req}</code></td>
      <td><strong>${r.dept}</strong></td>
      <td><span class="badge badge-blue">${r.hall}</span></td>
      <td>${r.students} Students</td>
      <td>${r.arrival}</td>
      <td><span class="badge badge-green">${r.status}</span></td>
    </tr>
  `).join("");
}

function renderCo3Priority() {
  const tbody = document.getElementById("priority-table-body");
  const visual = document.getElementById("priority-queue-visual");

  const sorted = [...INVIGILATORS].sort((a, b) => a.priority - b.priority);

  if (visual) {
    visual.innerHTML = sorted.map((inv, idx) => `
      <div class="priority-card">
        <div class="pq-rank">#${idx + 1}</div>
        <div>
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-color);">${inv.name}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted);">Priority: ${inv.priority} → Hall: ${inv.hall}</div>
        </div>
      </div>
    `).join("");
  }

  if (tbody) {
    tbody.innerHTML = sorted.map(inv => `
      <tr>
        <td><strong>${inv.name}</strong></td>
        <td><code>${inv.id}</code></td>
        <td><span class="badge badge-purple">Rank ${inv.priority}</span></td>
        <td><span class="badge badge-blue">${inv.hall}</span></td>
        <td>Highest Availability (Rank ${inv.priority} assigned to Hall ${inv.hall})</td>
      </tr>
    `).join("");
  }
}

// --- CO5 DISK BLOCKS VISUALIZER ---
function renderDiskBlocks() {
  const grid = document.getElementById("disk-grid");
  if (!grid) return;

  const totalBlocks = 60;
  const blocksMap = {};

  // Mark files on disk
  DISK_FILES.forEach(file => {
    file.blocks.forEach(b => {
      blocksMap[b] = file;
    });
  });

  let html = "";
  for (let i = 0; i < totalBlocks; i++) {
    const file = blocksMap[i];
    if (file) {
      html += `<div class="disk-block ${file.color}" onmouseenter="inspectDiskBlock(${i})" onclick="inspectDiskBlock(${i})" title="Block ${i}: ${file.name}">${i}</div>`;
    } else {
      html += `<div class="disk-block free" onmouseenter="inspectDiskBlock(${i})" onclick="inspectDiskBlock(${i})" title="Block ${i}: Free Space">${i}</div>`;
    }
  }
  grid.innerHTML = html;
}

function inspectDiskBlock(blockNum) {
  const inspector = document.getElementById("block-inspector");
  if (!inspector) return;

  const file = DISK_FILES.find(f => f.blocks.includes(blockNum));
  if (file) {
    const offset = blockNum - file.start;
    inspector.innerHTML = `<strong>Disk Block [${blockNum}]</strong>: Allocated to <code>${file.name}</code> (${file.dept} Dept) | Relative Block Offset: <strong>+${offset}</strong> | Contiguous Range: <strong>[${file.start} .. ${file.start + file.length - 1}]</strong>`;
  } else {
    inspector.innerHTML = `<strong>Disk Block [${blockNum}]</strong>: <span style="color: var(--accent-green)">Available Free Block</span> | Secondary Storage Fragmentation: Minimal.`;
  }
}

// --- CO5 TREE DIRECTORY EXPLORER ---
function renderTreeDirectory() {
  const nav = document.getElementById("tree-nav");
  if (!nav) return;

  function buildTreeHtml(node) {
    if (node.type === "folder") {
      return `
        <div class="tree-node">
          <div class="tree-label folder-label" onclick="toggleTreeFolder(this)">
            <span>📁</span>
            <strong>${node.name}</strong>
          </div>
          <div class="tree-children">
            ${node.children.map(child => buildTreeHtml(child)).join("")}
          </div>
        </div>
      `;
    } else {
      return `
        <div class="tree-node">
          <div class="tree-label file-label" onclick="previewFile('${node.name}', this)">
            <span>📄</span>
            <span>${node.name}</span>
          </div>
        </div>
      `;
    }
  }

  nav.innerHTML = buildTreeHtml(DIRECTORY_TREE);
}

function toggleTreeFolder(el) {
  const children = el.nextElementSibling;
  if (children) {
    children.classList.toggle("collapsed");
  }
}

function previewFile(fileName, el) {
  document.querySelectorAll(".tree-label").forEach(l => l.classList.remove("active"));
  if (el) el.classList.add("active");

  const titleEl = document.getElementById("preview-filename");
  const bodyEl = document.getElementById("preview-content");

  // Search recursively for file content
  function findFile(node) {
    if (node.type === "file" && node.name === fileName) return node;
    if (node.children) {
      for (const child of node.children) {
        const res = findFile(child);
        if (res) return res;
      }
    }
    return null;
  }

  const fileObj = findFile(DIRECTORY_TREE);
  if (fileObj && bodyEl && titleEl) {
    titleEl.textContent = `File: ${fileObj.name} (Simulated File System)`;
    bodyEl.textContent = fileObj.content;
    showToast(`Loaded ${fileName}`, "info");
  }
}

// --- FULL ACADEMIC OS LAB REPORT ---
function renderLabReport() {
  const reportEl = document.getElementById("report-view-body");
  if (!reportEl) return;

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  reportEl.innerHTML = `
    <div style="text-align: center; border-bottom: 2px solid var(--border-color); padding-bottom: 20px; margin-bottom: 28px;">
      <h1 style="font-size: 1.8rem; margin: 0 0 6px;">COLLEGE EXAMINATION HALL MANAGEMENT SYSTEM</h1>
      <h3 style="font-size: 1.1rem; color: var(--accent-blue); margin: 0 0 6px;">OPERATING SYSTEMS RESOURCE MANAGEMENT LAB REPORT</h3>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0;">Date: ${today} • Academic Evaluation: Course Outcomes CO1 to CO5</p>
    </div>

    <h2>1. Executive Summary & Problem Formulation</h2>
    <p>
      Managing a multi-departmental college examination event requires solving identical resource scheduling and contention problems as modern operating systems.
      This project establishes an exact mapping between physical exam entities and operating system abstractions:
    </p>
    <pre>
+-----------------------------------+-------------------------------------+
| EXAMINATION DOMAIN COMPONENT      | OPERATING SYSTEM ABSTRACTION        |
+-----------------------------------+-------------------------------------+
| Student Taking Examination        | Process (PCB: PID, State, Registers)|
| Invigilator Supervising Hall      | Lightweight Thread (TCB Concurrency)|
| Examination Hall (H1-H4)          | Hardware Resource (CPU/Memory Hall) |
| Hall Allocation Requests          | FCFS CPU Scheduling Queue           |
| Invigilator Assignment            | Preemptive Priority Scheduling      |
| Shared Multimedia (Projector/Hall)| Resource Allocation Graph / Deadlock|
| Seating Plan Pages                | Virtual Memory Pages (LRU Cache)    |
| Seating Files on Disk             | Contiguous Secondary File System    |
+-----------------------------------+-------------------------------------+
    </pre>

    <h2>2. CO1: System Architecture & Batch Processing Workflow</h2>
    <p>
      The complete examination administration is modeled as a non-interactive batch process. A batch job executes five atomic phases sequentially:
    </p>
    <ol style="margin-left: 20px; line-height: 1.8; color: var(--text-color);">
      <li><strong>Data Ingestion:</strong> Bulk importing of 12 candidate student profiles across 4 academic departments into process control blocks.</li>
      <li><strong>Hall Scheduling (FCFS):</strong> First Come First Served allocation ensures equitable distribution to the first requesting departments.</li>
      <li><strong>Invigilator Scheduling (Priority):</strong> Invigilators are dispatched based on priority rankings (1=Highest).</li>
      <li><strong>Memory Paging:</strong> 3 physical memory frames manage seating lookup pages with Least Recently Used (LRU) swapping.</li>
      <li><strong>File Storage:</strong> Output manifests are committed contiguously onto persistent disk blocks.</li>
    </ol>

    <h2>3. CO2: Process Control Blocks & Multithreading</h2>
    <p>
      Each student is allocated a Process Control Block (<code>PCB</code>) containing process identifier <code>PID</code>, current status (<code>READY / RUNNING / COMPLETED</code>), assigned exam hall, and seat number.
      Simultaneously, four invigilator threads run concurrently:
    </p>
    <pre>
Thread I1: Supervising Hall 1 (Computer) - Priority 1 [ACTIVE]
Thread I2: Supervising Hall 2 (IT)       - Priority 2 [ACTIVE]
Thread I3: Supervising Hall 3 (Mech)     - Priority 3 [ACTIVE]
Thread I4: Supervising Hall 4 (Civil)    - Priority 4 [ACTIVE]
    </pre>

    <h2>4. CO3: Resource Scheduling & Deadlock Analysis</h2>
    <p>
      <strong>FCFS Allocation:</strong> Arrival sequence R1 (Computer) &rarr; R2 (IT) &rarr; R3 (Mech) &rarr; R4 (Civil) maps strictly to Halls H1 &rarr; H2 &rarr; H3 &rarr; H4.
    </p>
    <p>
      <strong>Deadlock Detection:</strong> In the examination hall, Invigilator I1 holds Hall H1 and requests the shared Projector. Invigilator I2 holds the Projector and requests Hall H1.
      This forms a cycle in the Resource Allocation Graph:
    </p>
    <pre>
   +------+          Requests          +-----------+
   |  I1  | -------------------------> | Projector |
   +------+                            +-----------+
      ^                                      |
      | Held by                              | Held by
      |                                      v
   +------+          Requests          +-----------+
   |  H1  | <------------------------- |    I2     |
   +------+                            +-----------+

CYCLE DETECTED: I1 -> Projector -> I2 -> H1 -> I1.
CONDITION     : Circular Wait satisfies Coffman's 4th Condition for Deadlock.
RECOVERY      : Resource Preemption or Dual-Resource Provisioning resolves the lock.
    </pre>

    <h2>5. CO4: Virtual Memory Management & LRU Simulation</h2>
    <p>
      Seating charts for 30 desks per hall are divided into 3 pages of 10 desks each. When only 3 frames of RAM exist, the Least Recently Used (LRU) algorithm optimizes hit ratio:
    </p>
    <pre>
Reference Stream: H1-P1 &rarr; H2-P1 &rarr; H3-P1 &rarr; H1-P2 &rarr; H4-P1 &rarr; H2-P1
Physical Frames : 3 Frames
Page Faults     : 5 Faults
Page Hits       : 1 Hit
    </pre>

    <h2>6. CO5: Storage Allocation & Directory Structure</h2>
    <p>
      <strong>Contiguous Allocation:</strong> Seating data files occupy contiguous blocks on secondary storage (Blocks 10-14, 20-23, 30-35, 40-44).
      This allows <code>O(1)</code> direct block address calculation via starting block + offset, minimizing seek operations.
    </p>
  `;
}

// ============================================================
// 5. INTERACTIVE SIMULATION RUNNERS
// ============================================================

function setupSimulationListeners() {
  // Global quick batch runner
  const btnQuickBatch = document.getElementById("btn-run-batch-quick");
  if (btnQuickBatch) {
    btnQuickBatch.addEventListener("click", () => {
      runFullBatchSimulation();
    });
  }

  // Quick reset
  const btnReset = document.getElementById("btn-quick-reset");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      resetSystem();
    });
  }

  // Table search
  const tableSearch = document.getElementById("seating-table-search");
  if (tableSearch) {
    tableSearch.addEventListener("input", (e) => {
      renderSeatingTable(e.target.value);
    });
  }

  // Terminal actions
  const clearLogBtn = document.getElementById("btn-clear-log");
  if (clearLogBtn) {
    clearLogBtn.addEventListener("click", () => {
      const term = document.getElementById("system-log-terminal");
      if (term) term.innerHTML = "";
    });
  }

  const copyLogBtn = document.getElementById("btn-copy-log");
  if (copyLogBtn) {
    copyLogBtn.addEventListener("click", () => {
      const term = document.getElementById("system-log-terminal");
      if (term) {
        navigator.clipboard.writeText(term.innerText);
        showToast("Log copied to clipboard", "success");
      }
    });
  }

  // CO1 Batch Step button
  const co1BatchBtn = document.getElementById("btn-co1-run-batch");
  if (co1BatchBtn) {
    co1BatchBtn.addEventListener("click", stepCo1Batch);
  }

  const co1ResetBtn = document.getElementById("btn-co1-reset");
  if (co1ResetBtn) {
    co1ResetBtn.addEventListener("click", () => {
      currentBatchStage = 0;
      renderCo1Pipeline();
      const det = document.getElementById("co1-stage-details");
      const ind = document.getElementById("batch-step-indicator");
      if (det) det.textContent = "Pipeline reset. Click Step Through Batch to restart.";
      if (ind) ind.textContent = "Stage 0 / 5";
    });
  }

  // CO2 Process batch transition
  const btnAdvProc = document.getElementById("btn-advance-processes");
  if (btnAdvProc) {
    btnAdvProc.addEventListener("click", () => {
      STUDENTS.forEach(s => {
        if (s.state === "READY") s.state = "RUNNING";
        else if (s.state === "RUNNING") s.state = "COMPLETED";
      });
      renderProcessPcbTable();
      renderClassrooms("all");
      renderSeatingTable();
      renderCo2Tables();
      logKernel("SCHEDULER", "Student processes advanced to the next scheduling state.");
      showToast("Advanced student process states", "info");
    });
  }

  // CO2 Threads Start / Reset
  const btnStartThreads = document.getElementById("btn-start-threads");
  if (btnStartThreads) {
    btnStartThreads.addEventListener("click", startInvigilatorThreads);
  }

  const btnResetThreads = document.getElementById("btn-reset-threads");
  if (btnResetThreads) {
    btnResetThreads.addEventListener("click", resetInvigilatorThreads);
  }

  // CO3 Deadlock Cycle Detection
  const btnDetectDeadlock = document.getElementById("btn-detect-deadlock");
  if (btnDetectDeadlock) {
    btnDetectDeadlock.addEventListener("click", runDeadlockDetection);
  }

  const btnToggleFix = document.getElementById("btn-toggle-deadlock-fix");
  if (btnToggleFix) {
    btnToggleFix.addEventListener("click", toggleDeadlockResolution);
  }

  // CO4 LRU Simulator buttons
  const btnStepLru = document.getElementById("btn-step-lru");
  if (btnStepLru) {
    btnStepLru.addEventListener("click", stepLruSimulation);
  }

  const btnRunAllLru = document.getElementById("btn-run-all-lru");
  if (btnRunAllLru) {
    btnRunAllLru.addEventListener("click", runAllLruSimulation);
  }

  const btnResetLru = document.getElementById("btn-reset-lru");
  if (btnResetLru) {
    btnResetLru.addEventListener("click", resetLruSimulation);
  }

  // Report Copy / Print
  const btnCopyReport = document.getElementById("btn-copy-report");
  if (btnCopyReport) {
    btnCopyReport.addEventListener("click", () => {
      const rep = document.getElementById("report-view-body");
      if (rep) {
        navigator.clipboard.writeText(rep.innerText);
        showToast("Report copied to clipboard", "success");
      }
    });
  }

  const btnPrintReport = document.getElementById("btn-print-report");
  if (btnPrintReport) {
    btnPrintReport.addEventListener("click", () => {
      window.print();
    });
  }

  // Export seating to CSV
  const btnExportSeating = document.getElementById("btn-export-seating");
  if (btnExportSeating) {
    btnExportSeating.addEventListener("click", exportSeatingCsv);
  }

  // Copy Preview Text in CO5
  const btnCopyPreview = document.getElementById("btn-copy-preview");
  if (btnCopyPreview) {
    btnCopyPreview.addEventListener("click", () => {
      const content = document.getElementById("preview-content");
      if (content) {
        navigator.clipboard.writeText(content.textContent);
        showToast("File content copied", "success");
      }
    });
  }
}

// --- CO1 STEPPING PIPELINE ---
function stepCo1Batch() {
  currentBatchStage++;
  if (currentBatchStage > 5) {
    currentBatchStage = 1;
  }

  renderCo1Pipeline();

  const detailsEl = document.getElementById("co1-stage-details");
  const indicator = document.getElementById("batch-step-indicator");
  if (indicator) indicator.textContent = `Stage ${currentBatchStage} / 5`;

  const stageDescriptions = {
    1: "[STAGE 1: LOAD STUDENT DATA]\nIngested 12 Student Records across Computer, IT, Mechanical, Civil.\n12 Process Control Blocks (PCBs) generated in RAM with State: READY.",
    2: "[STAGE 2: FCFS HALL ALLOCATION]\nProcessing requests in arrival queue:\n  R1 (Computer) -> Allocated Hall H1 (Capacity 30)\n  R2 (IT)       -> Allocated Hall H2 (Capacity 30)\n  R3 (Mech)     -> Allocated Hall H3 (Capacity 30)\n  R4 (Civil)    -> Allocated Hall H4 (Capacity 30)",
    3: "[STAGE 3: ASSIGN INVIGILATORS]\nApplying Preemptive Priority Dispatcher:\n  Rank 1: Mr. Patil (I1) -> Hall H1\n  Rank 2: Ms. Sharma (I2) -> Hall H2\n  Rank 3: Mr. Khan (I3)   -> Hall H3\n  Rank 4: Ms. Joshi (I4)  -> Hall H4",
    4: "[STAGE 4: SEATING VIRTUAL PAGING]\nVirtual Memory Paging Table initialized:\n  Pages H1-P1 through H4-P3 loaded into 3 RAM frames.\n  LRU Cache ready to manage active exam seating references.",
    5: "[STAGE 5: FILE SYSTEM PERSISTENCE]\nContiguous block allocation committed to virtual disk:\n  Blocks 10-14, 20-23, 30-35, 40-44 occupied.\n  Tree directory hierarchy /College_Exam committed."
  };

  if (detailsEl) detailsEl.textContent = stageDescriptions[currentBatchStage];
  logKernel("BATCH", `Batch Processing Pipeline advanced to Stage ${currentBatchStage}.`);
  showToast(`Batch Stage ${currentBatchStage} Executed`, "success");
}

// --- CO2 MULTITHREADING SIMULATOR ---
function startInvigilatorThreads() {
  if (threadsRunning) return;
  threadsRunning = true;

  const overallStatus = document.getElementById("thread-overall-status");
  const logStream = document.getElementById("thread-log-stream");
  if (overallStatus) overallStatus.textContent = "Status: Threads Running in Parallel";

  INVIGILATORS.forEach(inv => {
    inv.status = "RUNNING";
    inv.progress = 0;
  });
  renderThreadCards();
  renderCo2Tables();

  logKernel("THREAD", "Forking 4 concurrent invigilator threads: I1, I2, I3, I4.");
  showToast("Started 4 Invigilator Threads", "info");

  let step = 0;
  clearInterval(threadInterval);
  threadInterval = setInterval(() => {
    step += 5;
    let allFinished = true;

    INVIGILATORS.forEach((inv, index) => {
      // simulate slightly varied speeds based on priority/load
      const threadSpeed = 5 + (inv.priority * 1.5);
      inv.progress = Math.min(100, Math.round(inv.progress + threadSpeed));

      const fill = document.getElementById(`thread-fill-${inv.id}`);
      const statusEl = document.getElementById(`thread-status-${inv.id}`);
      if (fill) fill.style.width = `${inv.progress}%`;

      if (inv.progress < 100) {
        allFinished = false;
        if (statusEl) statusEl.textContent = `RUNNING (${inv.progress}%)`;
      } else {
        inv.status = "COMPLETED";
        if (statusEl) statusEl.textContent = "COMPLETED (Joined)";
        const card = document.getElementById(`thread-card-${inv.id}`);
        if (card) card.classList.remove("running");
      }
    });

    if (allFinished) {
      clearInterval(threadInterval);
      threadsRunning = false;
      if (overallStatus) overallStatus.textContent = "Status: All Threads Joined (Finished)";
      logKernel("THREAD", "All 4 invigilator monitoring threads joined successfully with exit code 0.");
      showToast("All invigilator threads finished!", "success");
      renderCo2Tables();
    }
  }, 180);
}

function resetInvigilatorThreads() {
  clearInterval(threadInterval);
  threadsRunning = false;
  INVIGILATORS.forEach(inv => {
    inv.status = "READY";
    inv.progress = 0;
  });
  renderThreadCards();
  renderCo2Tables();
  const overallStatus = document.getElementById("thread-overall-status");
  if (overallStatus) overallStatus.textContent = "Status: Waiting to launch";
  showToast("Threads reset", "info");
}

// --- CO3 DEADLOCK DETECTION & RESOLUTION ---
function runDeadlockDetection() {
  const alertBox = document.getElementById("deadlock-alert-box");
  const title = document.getElementById("deadlock-title");
  const desc = document.getElementById("deadlock-desc");

  const edges = [
    document.getElementById("edge-1"),
    document.getElementById("edge-2"),
    document.getElementById("edge-3"),
    document.getElementById("edge-4")
  ];

  if (deadlockResolved) {
    // If resolved
    alertBox.className = "deadlock-alert resolved mt-16";
    title.textContent = "✓ NO DEADLOCK DETECTED (System Safe)";
    desc.textContent = "Resource Allocation Graph is acyclic. Both Invigilator I1 and I2 have dedicated resources.";
    edges.forEach(e => {
      if (e) {
        e.classList.remove("danger-cycle");
        e.setAttribute("marker-end", "url(#arrow)");
      }
    });
    logKernel("DEADLOCK", "Deadlock Check: Graph contains NO cycles. System state is safe.");
    showToast("No deadlock detected! System is safe.", "success");
    return;
  }

  // If deadlock present
  deadlockDetected = true;
  alertBox.className = "deadlock-alert danger mt-16";
  title.textContent = "⚠️ DEADLOCK DETECTED: Circular Wait Cycle Found!";
  desc.textContent = "Cycle detected: Invigilator I1 holds Hall H1 & waits for Projector. Invigilator I2 holds Projector & waits for Hall H1. Coffman condition satisfied!";

  edges.forEach(e => {
    if (e) {
      e.classList.add("danger-cycle");
      e.setAttribute("marker-end", "url(#arrow-danger)");
    }
  });

  logKernel("DEADLOCK", "CRITICAL WARNING: Cycle detected in Resource Allocation Graph: I1 -> Projector -> I2 -> H1 -> I1.");
  showToast("Deadlock Detected! Circular wait cycle found.", "error");
}

function toggleDeadlockResolution() {
  deadlockResolved = !deadlockResolved;
  const label = document.getElementById("fix-btn-label");
  const alertBox = document.getElementById("deadlock-alert-box");
  const edges = [
    document.getElementById("edge-1"),
    document.getElementById("edge-2"),
    document.getElementById("edge-3"),
    document.getElementById("edge-4")
  ];

  if (deadlockResolved) {
    if (label) label.textContent = "Restore Deadlock Condition (Revert)";
    alertBox.className = "deadlock-alert resolved mt-16";
    document.getElementById("deadlock-title").textContent = "Deadlock Resolved: Secondary Projector Added";
    document.getElementById("deadlock-desc").textContent = "Projector #2 provisioned for Invigilator I1. Mutual hold-and-wait condition broken.";

    // Remove cycle styling
    edges.forEach(e => {
      if (e) {
        e.classList.remove("danger-cycle");
        e.setAttribute("marker-end", "url(#arrow)");
      }
    });

    logKernel("DEADLOCK", "Deadlock Prevention: Second Projector added. Circular wait broken.");
    showToast("Deadlock successfully resolved!", "success");
  } else {
    if (label) label.textContent = "Resolve Deadlock (Add Projector #2)";
    alertBox.className = "deadlock-alert mt-16";
    document.getElementById("deadlock-title").textContent = "Deadlock Cycle Restored";
    document.getElementById("deadlock-desc").textContent = "Click Run Cycle Detection to re-evaluate Resource Allocation Graph.";
    edges.forEach(e => {
      if (e) {
        e.classList.remove("danger-cycle");
        e.setAttribute("marker-end", "url(#arrow)");
      }
    });
    showToast("Restored original deadlock state", "info");
  }
}

// --- CO4 LRU PAGE REPLACEMENT SIMULATOR ---
function initLruQueue() {
  const input = document.getElementById("lru-ref-input");
  const val = input ? input.value : "H1-P1, H2-P1, H3-P1, H1-P2, H4-P1, H2-P1";
  lruReferenceQueue = val.split(",").map(s => s.trim()).filter(s => s.length > 0);
  lruFrames = [null, null, null];
  lruStepIndex = 0;
  lruStats = { total: 0, hits: 0, faults: 0 };
}

function stepLruSimulation() {
  if (lruStepIndex === 0 && lruStats.total === 0) {
    initLruQueue();
  }

  if (lruStepIndex >= lruReferenceQueue.length) {
    showToast("All page references processed!", "info");
    return;
  }

  const requestedPage = lruReferenceQueue[lruStepIndex];
  lruStats.total++;

  let eventType = "";
  let isHit = false;

  const existingIndex = lruFrames.indexOf(requestedPage);
  if (existingIndex !== -1) {
    // Page Hit: Move page to most recently used position
    isHit = true;
    lruStats.hits++;
    eventType = "PAGE HIT (Referenced in RAM)";

    // In our 3-frame LRU array, move referenced page to end
    lruFrames.splice(existingIndex, 1);
    lruFrames.push(requestedPage);
  } else {
    // Page Fault
    lruStats.faults++;
    if (lruFrames.includes(null)) {
      // Empty frame available
      const emptyIdx = lruFrames.indexOf(null);
      lruFrames[emptyIdx] = requestedPage;
      eventType = `PAGE FAULT (Loaded into empty Frame ${emptyIdx})`;
    } else {
      // Evict least recently used (first element)
      const evicted = lruFrames.shift();
      lruFrames.push(requestedPage);
      eventType = `PAGE FAULT (Evicted LRU page ${evicted})`;
    }
  }

  // Update physical RAM frame visuals
  updateRamFrameVisuals(isHit);

  // Update Stats
  const hitRatio = Math.round((lruStats.hits / lruStats.total) * 100);
  document.getElementById("lru-stat-total").textContent = lruStats.total;
  document.getElementById("lru-stat-faults").textContent = lruStats.faults;
  document.getElementById("lru-stat-hits").textContent = lruStats.hits;
  document.getElementById("lru-stat-ratio").textContent = `${hitRatio}%`;

  // Append row to results table
  const tbody = document.getElementById("lru-results-body");
  if (tbody) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>Step ${lruStats.total}</td>
      <td><code>${requestedPage}</code></td>
      <td>${eventType}</td>
      <td><code>[${lruFrames.map(f => f || 'Empty').join(" | ")}]</code></td>
      <td><span class="badge ${isHit ? 'badge-green' : 'badge-orange'}">${isHit ? 'HIT' : 'FAULT'}</span></td>
    `;
    tbody.appendChild(row);
  }

  logKernel("MEMORY", `LRU Step ${lruStats.total}: Page "${requestedPage}" &rarr; ${isHit ? 'HIT' : 'FAULT'}. Active Frames: [${lruFrames.filter(Boolean).join(", ")}]`);

  lruStepIndex++;
}

function updateRamFrameVisuals(isHit) {
  for (let i = 0; i < 3; i++) {
    const box = document.getElementById(`frame-${i}`);
    if (box) {
      box.className = `frame-box ${isHit ? 'hit-glow' : 'fault-glow'}`;
      const val = box.querySelector(".frame-val");
      if (val) {
        if (lruFrames[i]) {
          val.textContent = lruFrames[i];
          val.classList.remove("empty");
        } else {
          val.textContent = "[Empty]";
          val.classList.add("empty");
        }
      }
      setTimeout(() => {
        box.classList.remove("hit-glow", "fault-glow");
      }, 500);
    }
  }
}

function runAllLruSimulation() {
  initLruQueue();
  const tbody = document.getElementById("lru-results-body");
  if (tbody) tbody.innerHTML = "";

  while (lruStepIndex < lruReferenceQueue.length) {
    stepLruSimulation();
  }
  showToast("Full LRU Simulation Completed", "success");
}

function resetLruSimulation() {
  initLruQueue();
  for (let i = 0; i < 3; i++) {
    const box = document.getElementById(`frame-${i}`);
    if (box) {
      const val = box.querySelector(".frame-val");
      if (val) {
        val.textContent = "[Empty]";
        val.classList.add("empty");
      }
    }
  }
  document.getElementById("lru-stat-total").textContent = "0";
  document.getElementById("lru-stat-faults").textContent = "0";
  document.getElementById("lru-stat-hits").textContent = "0";
  document.getElementById("lru-stat-ratio").textContent = "0%";
  const tbody = document.getElementById("lru-results-body");
  if (tbody) tbody.innerHTML = "";
  showToast("LRU Simulator Reset", "info");
}

// --- GLOBAL RUN ALL MODULES (BATCH RUNNER) ---
function runFullBatchSimulation() {
  logKernel("SYSTEM", "Executing Full OS Simulation Batch (CO1 -> CO5)...");
  showToast("Running Full OS Batch...", "info");

  // Step 1: Batch Pipeline
  currentBatchStage = 5;
  renderCo1Pipeline();

  // Step 2: Concurrency threads
  startInvigilatorThreads();

  // Step 3: Advance student states
  STUDENTS.forEach(s => s.state = "RUNNING");
  renderProcessPcbTable();
  renderClassrooms("all");
  renderSeatingTable();

  // Step 4: Run LRU
  runAllLruSimulation();

  logKernel("SYSTEM", "Complete OS Simulation Batch finished successfully.");
  showToast("All OS Modules Executed!", "success");
}

function resetSystem() {
  currentBatchStage = 0;
  renderCo1Pipeline();
  resetInvigilatorThreads();
  resetLruSimulation();

  STUDENTS.forEach(s => s.state = "READY");
  renderProcessPcbTable();
  renderClassrooms("all");
  renderSeatingTable();

  logKernel("SYSTEM", "System state reset to baseline.");
  showToast("ExamOS state reset to baseline", "info");
}

// ============================================================
// 6. MODALS & UTILITIES
// ============================================================

function openStudentModal(pid) {
  const student = STUDENTS.find(s => s.pid === pid);
  if (!student) return;

  const modal = document.getElementById("student-modal");
  const title = document.getElementById("modal-student-title");
  const body = document.getElementById("modal-student-body");

  if (title) title.textContent = `Process Control Block: ${student.pid} (${student.name})`;

  if (body) {
    body.innerHTML = `
      <div style="display:flex; align-items:center; gap:16px; margin-bottom: 8px;">
        <div style="width:52px; height:52px; border-radius:12px; background:linear-gradient(135deg, var(--accent-blue), var(--accent-purple)); display:flex; align-items:center; justify-content:center; color:#fff; font-size:1.4rem; font-weight:700;">
          ${student.name[0]}
        </div>
        <div>
          <h4 style="font-size:1.15rem; margin:0; color:var(--text-color);">${student.name}</h4>
          <span style="font-size:0.8rem; color:var(--text-muted);">${student.dept} Engineering</span>
        </div>
        <span class="badge badge-green" style="margin-left:auto;">${student.state}</span>
      </div>

      <div class="info-grid" style="grid-template-columns: repeat(2, 1fr);">
        <div class="info-cell">
          <span class="info-label">Assigned Hall</span>
          <span class="info-val">${student.hall}</span>
        </div>
        <div class="info-cell">
          <span class="info-label">Allocated Seat</span>
          <span class="info-val">${student.seat}</span>
        </div>
        <div class="info-cell">
          <span class="info-label">Memory Page</span>
          <span class="info-val font-mono">${student.page}</span>
        </div>
        <div class="info-cell">
          <span class="info-label">Secondary Disk Blocks</span>
          <span class="info-val font-mono">[${student.blocks.join(", ")}]</span>
        </div>
        <div class="info-cell">
          <span class="info-label">Burst Duration</span>
          <span class="info-val">3 Hours</span>
        </div>
        <div class="info-cell">
          <span class="info-label">Scheduling Priority</span>
          <span class="info-val">Priority ${student.priority}</span>
        </div>
      </div>
    `;
  }

  if (modal) modal.classList.add("active");
}

function closeStudentModal() {
  const modal = document.getElementById("student-modal");
  if (modal) modal.classList.remove("active");
}

// Close modal on Escape key or backdrop click
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeStudentModal();
});
window.addEventListener("click", (e) => {
  const modal = document.getElementById("student-modal");
  if (e.target === modal) closeStudentModal();
});

// CSV Export
function exportSeatingCsv() {
  let csv = "PID,Student Name,Department,Hall,Seat,Memory Page,Disk Blocks,State\n";
  STUDENTS.forEach(s => {
    csv += `"${s.pid}","${s.name}","${s.dept}","${s.hall}","${s.seat}","${s.page}","${s.blocks.join(';')}",${s.state}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ExamOS_Seating_Plan_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("Seating register exported as CSV", "success");
}

// Toast notification helper
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 3200);
}

// Live Kernel Log Logger
function logKernel(tag, message) {
  const term = document.getElementById("system-log-terminal");
  if (!term) return;

  const time = new Date().toTimeString().split(" ")[0];
  const tagClassMap = {
    SYSTEM: "tag-info",
    SCHEDULER: "tag-info",
    BATCH: "tag-success",
    PROCESS: "tag-info",
    THREAD: "tag-thread",
    DEADLOCK: "tag-error",
    MEMORY: "tag-memory"
  };

  const tagClass = tagClassMap[tag] || "tag-info";

  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.innerHTML = `
    <span class="log-time">[${time}]</span>
    <span class="log-tag ${tagClass}">[${tag}]</span>
    <span class="log-msg">${message}</span>
  `;

  term.appendChild(entry);
  term.scrollTop = term.scrollHeight;
}
