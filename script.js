const directives = {
  deep: [
    "Ship one meaningful output block",
    "Finish the hardest pending task",
    "Build uninterrupted progress for 12 minutes"
  ],
  admin: [
    "Clear high-value admin tasks",
    "Process urgent messages with intent",
    "Resolve one operational bottleneck"
  ],
  recovery: [
    "Run a 7-minute reset and declutter",
    "Take a slow reset walk then return",
    "Hydrate, breathe, and relaunch with one easy win"
  ]
};

const durations = {
  deep: 12,
  admin: 7,
  recovery: 5
};

const nodes = {
  appShell: document.getElementById("appShell"),
  focus: document.getElementById("focus"),
  energy: document.getElementById("energy"),
  mood: document.getElementById("mood"),
  pulseBtn: document.getElementById("pulseBtn"),
  recalibrateBtn: document.getElementById("recalibrateBtn"),
  directiveTitle: document.getElementById("directiveTitle"),
  directiveMode: document.getElementById("directiveMode"),
  directiveDuration: document.getElementById("directiveDuration"),
  executeBtn: document.getElementById("executeBtn"),
  timerText: document.getElementById("timerText"),
  controlScore: document.getElementById("controlScore"),
  statusLine: document.getElementById("statusLine"),
  decisionInput: document.getElementById("decisionInput"),
  decisionBtn: document.getElementById("decisionBtn"),
  decisionResult: document.getElementById("decisionResult"),
  stateBtn: document.getElementById("stateBtn"),
  stateMessage: document.getElementById("stateMessage"),
  executedCount: document.getElementById("executedCount"),
  recoveryCount: document.getElementById("recoveryCount"),
  lastCompletion: document.getElementById("lastCompletion"),
  clearLedger: document.getElementById("clearLedger"),
  coreOrb: document.getElementById("coreOrb")
};

let currentDirective = null;
let activeTimer = null;
let timerRemaining = 0;
let resetTimer = null;

const todayKey = new Date().toISOString().slice(0, 10);
const storageKey = `aegis-ledger-${todayKey}`;

const ledger = loadLedger();
renderLedger();
updateScore();

nodes.pulseBtn.addEventListener("click", generateDirective);
nodes.recalibrateBtn.addEventListener("click", generateDirective);
nodes.executeBtn.addEventListener("click", handleExecute);
nodes.decisionBtn.addEventListener("click", resolveDecision);
nodes.stateBtn.addEventListener("click", startStateShift);
nodes.clearLedger.addEventListener("click", resetLedger);

window.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty("--x", `${x}%`);
  document.documentElement.style.setProperty("--y", `${y}%`);

  const rotateY = ((x - 50) / 50) * 5;
  const rotateX = ((50 - y) / 50) * 5;
  nodes.coreOrb.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

function loadLedger() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return { executed: 0, recoveries: 0, lastCompletion: null };
    }
    return JSON.parse(raw);
  } catch {
    return { executed: 0, recoveries: 0, lastCompletion: null };
  }
}

function saveLedger() {
  localStorage.setItem(storageKey, JSON.stringify(ledger));
}

function renderLedger() {
  nodes.executedCount.textContent = String(ledger.executed);
  nodes.recoveryCount.textContent = String(ledger.recoveries);
  nodes.lastCompletion.textContent = ledger.lastCompletion || "--";
}

function updateScore() {
  const score = Math.min(100, 35 + ledger.executed * 9 + ledger.recoveries * 6);
  nodes.controlScore.textContent = String(score);
}

function determineMode({ focus, energy, mood }) {
  if (mood === "anxious" || (energy === "low" && focus === "low")) {
    return "recovery";
  }
  if (focus === "high" && energy !== "low") {
    return "deep";
  }
  return "admin";
}

function pickDirective(mode) {
  const bucket = directives[mode];
  const index = Math.floor(Math.random() * bucket.length);
  return bucket[index];
}

function generateDirective() {
  const pulse = {
    focus: nodes.focus.value,
    energy: nodes.energy.value,
    mood: nodes.mood.value
  };

  const mode = determineMode(pulse);
  const title = pickDirective(mode);
  const duration = durations[mode];

  currentDirective = { mode, title, duration };

  nodes.directiveTitle.textContent = title;
  nodes.directiveMode.textContent = `Mode: ${capitalize(mode)}`;
  nodes.directiveDuration.textContent = `${duration} min`;
  nodes.statusLine.textContent = `Pulse locked: ${pulse.focus} focus · ${pulse.energy} energy · ${pulse.mood} mood`;
}

function handleExecute() {
  if (!currentDirective) {
    generateDirective();
  }

  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
    nodes.timerText.textContent = "Timer paused. Press Execute to restart block.";
    return;
  }

  if (!timerRemaining) {
    timerRemaining = currentDirective.duration * 60;
  }

  tickTimer();
  activeTimer = setInterval(tickTimer, 1000);
}

function tickTimer() {
  if (timerRemaining <= 0) {
    clearInterval(activeTimer);
    activeTimer = null;
    finishDirective();
    return;
  }

  timerRemaining -= 1;
  const minutes = Math.floor(timerRemaining / 60);
  const seconds = timerRemaining % 60;
  nodes.timerText.textContent = `Executing: ${minutes}:${String(seconds).padStart(2, "0")}`;
}

function finishDirective() {
  ledger.executed += 1;
  ledger.lastCompletion = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  saveLedger();
  renderLedger();
  updateScore();

  nodes.timerText.textContent = "Directive complete. Tap Execute for next block.";
  nodes.appShell.classList.remove("complete-flash");
  void nodes.appShell.offsetWidth;
  nodes.appShell.classList.add("complete-flash");

  timerRemaining = 0;
  generateDirective();
}

function resolveDecision() {
  const text = nodes.decisionInput.value.trim();
  if (!text || !text.includes(" vs ")) {
    nodes.decisionResult.classList.remove("hidden");
    nodes.decisionResult.textContent = "Use: option A vs option B";
    return;
  }

  const [left, right] = text.split(" vs ").map((item) => item.trim());
  const chooseLeft = left.length <= right.length;
  const winner = chooseLeft ? left : right;
  const confidence = chooseLeft ? 78 : 71;
  const reason = chooseLeft
    ? "Lower resistance wins momentum now."
    : "Higher leverage outcome deserves priority.";

  nodes.decisionResult.classList.remove("hidden");
  nodes.decisionResult.innerHTML = `<strong>Choose:</strong> ${winner}<br><strong>Confidence:</strong> ${confidence}%<br><strong>Reason:</strong> ${reason}<br><strong>First step:</strong> Start the first 3-minute action now.`;
}

function startStateShift() {
  if (resetTimer) {
    return;
  }

  let seconds = 90;
  nodes.stateBtn.textContent = "Reset running...";
  nodes.stateMessage.textContent = "Inhale 4s · hold 4s · exhale 4s. Relax shoulders and unclench jaw.";

  resetTimer = setInterval(() => {
    seconds -= 1;
    nodes.stateMessage.textContent = `Reset in progress: ${seconds}s remaining`;

    if (seconds <= 0) {
      clearInterval(resetTimer);
      resetTimer = null;
      ledger.recoveries += 1;
      saveLedger();
      renderLedger();
      updateScore();

      nodes.stateMessage.textContent = "Reset complete. Execute one 5-minute action immediately.";
      nodes.stateBtn.textContent = "Start reset";
      generateDirective();
    }
  }, 1000);
}

function resetLedger() {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }
  if (resetTimer) {
    clearInterval(resetTimer);
    resetTimer = null;
  }

  ledger.executed = 0;
  ledger.recoveries = 0;
  ledger.lastCompletion = null;
  saveLedger();
  renderLedger();
  updateScore();

  timerRemaining = 0;
  nodes.timerText.textContent = "No active block";
  nodes.stateMessage.textContent = "When stuck, run a reset to force momentum.";
  nodes.stateBtn.textContent = "Start reset";
  nodes.directiveTitle.textContent = "Awaiting calibration";
  nodes.directiveMode.textContent = "Mode: --";
  nodes.directiveDuration.textContent = "-- min";
  nodes.statusLine.textContent = "Set your pulse to receive your next move.";
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
