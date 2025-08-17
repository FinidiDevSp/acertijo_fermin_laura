function norm(s) {
    return s
        .toString()
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, " ");
}
let RIDDLES = [];

async function fetchRiddles() {
    const res = await fetch("scripts/riddles.json");
    RIDDLES = (await res.json()).map((r) => ({ ...r, usedHints: [] }));
}
const FINAL_CODE = "OPERACION-ANDALUCIA";
const TOTAL_HINTS = 3;
const STATE_KEY = "acertijo-boda-ferminlaura";
let state = { idx: 0, hints: 0, attempts: [] };
function save() {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
}
function load() {
    try {
        const raw = localStorage.getItem(STATE_KEY);
        if (raw) {
            const s = JSON.parse(raw);
            if (Number.isInteger(s.idx)) state.idx = s.idx;
            if (Number.isInteger(s.hints)) state.hints = s.hints;
            if (Array.isArray(s.attempts)) state.attempts = s.attempts;
        }
    } catch (e) {}
}
function setProgress(i) {
    const pct = Math.min(100, Math.round((i / RIDDLES.length) * 100));
    document.getElementById("bar").style.width = pct + "%";
    document.getElementById(
        "progressText"
    ).textContent = `${i}/${RIDDLES.length}`;
}
function updateHintButton() {
    const btn = document.getElementById("btnHint");
    const rem = TOTAL_HINTS - state.hints;
    btn.textContent = rem > 0 ? `Pista (${rem})` : "Sin pistas";
    btn.disabled = rem <= 0;
}
function showRiddle() {
    const p = document.getElementById("prompt");
    const h = document.getElementById("hint");
    const s = document.getElementById("status");
    const ans = document.getElementById("answer");
    if (state.idx >= RIDDLES.length) {
        setProgress(RIDDLES.length);
        p.textContent = "¡Has completado todos los acertijos!";
        h.style.display = "none";
        document.getElementById("final").style.display = "block";
        document.getElementById("giftCode").textContent = FINAL_CODE;
        const m = document.getElementById("copyMsg");
        m.textContent = "";
        m.className = "status";
        ans.disabled = true;
        const btnHint = document.getElementById("btnHint");
        btnHint.disabled = true;
        btnHint.textContent = "Sin pistas";
        return;
    }
    const r = RIDDLES[state.idx];
    p.textContent = r.prompt;
    h.textContent = "";
    h.style.display = "none";
    s.textContent = "";
    ans.value = "";
    ans.disabled = false;
    setProgress(state.idx);
    ans.focus();
    updateHintButton();
}
function confetti() {
    const container = document.createElement("div");
    container.className = "confetti-container";
    for (let i = 0; i < 40; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "%";
        c.style.backgroundColor = `hsl(${Math.random() * 360},100%,50%)`;
        c.style.animationDelay = Math.random() * 0.5 + "s";
        container.appendChild(c);
    }
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 1000);
}
function failAnim() {
    const ans = document.getElementById("answer");
    ans.classList.add("shake");
    setTimeout(() => ans.classList.remove("shake"), 500);
}
function check() {
    const ansEl = document.getElementById("answer");
    const input = norm(ansEl.value);
    if (!input) return;
    const r = RIDDLES[state.idx];
    const ok = r.answers.some((a) => norm(a) === input);
    const s = document.getElementById("status");
    state.attempts.push({
        idx: state.idx,
        answer: input,
        ok,
        ts: Date.now(),
    });
    if (ok) {
        s.className = "status ok";
        s.textContent = "¡Correcto!";
        confetti();
        state.idx++;
        save();
        setTimeout(showRiddle, 700);
    } else {
        s.className = "status bad";
        s.textContent = "No es correcto.";
        failAnim();
        save();
    }
}
function hint() {
    if (state.hints >= TOTAL_HINTS) {
        const s = document.getElementById("status");
        s.className = "status bad";
        s.textContent = "No quedan más pistas.";
        return;
    }
    const r = RIDDLES[state.idx];
    if (!r.hints || r.hints.length === 0) {
        const s = document.getElementById("status");
        s.className = "status bad";
        s.textContent = "Sin pista disponible.";
        return;
    }
    const options = r.hints
        .map((_, i) => i)
        .filter((i) => !r.usedHints.includes(i));
    if (options.length === 0) {
        const s = document.getElementById("status");
        s.className = "status bad";
        s.textContent = "Sin pista disponible.";
        return;
    }
    const idx = options[Math.floor(Math.random() * options.length)];
    r.usedHints.push(idx);
    const hintText = r.hints[idx];
    const h = document.getElementById("hint");
    h.textContent = "💡 " + hintText;
    h.style.display = "block";
    state.hints++;
    updateHintButton();
    save();
}
function resetAll() {
    state = { idx: 0, hints: 0, attempts: [] };
    save();
    showRiddle();
}
function copyCode() {
    navigator.clipboard.writeText(FINAL_CODE).then(() => {
        const m = document.getElementById("copyMsg");
        m.className = "status ok";
        m.textContent = "Copiado al portapapeles";
    });
}
document.getElementById("btnCheck").addEventListener("click", check);
document.getElementById("btnHint").addEventListener("click", hint);
document.getElementById("btnReset").addEventListener("click", resetAll);
document.getElementById("btnCopy").addEventListener("click", copyCode);
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") check();
});
async function startGame() {
    if (!RIDDLES.length) await fetchRiddles();
    document.getElementById("introCard").style.display = "none";
    document.getElementById("riddleCard").style.display = "block";
    showRiddle();
}
document.getElementById("btnStart").addEventListener("click", startGame);
load();
updateHintButton();
fetchRiddles();
