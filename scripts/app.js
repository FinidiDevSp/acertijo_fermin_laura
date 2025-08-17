function norm(s) {
    return s
        .toString()
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, " ");
}
const RIDDLES = [
    {
        prompt: "Soy un salón sin techo donde el tiempo toma café. Bajo mis portales conversan generaciones y en mi centro la ciudad se reconoce en un espejo invisible. Bancos, tertulias y pasos me pulen cada día. ¿Dónde estoy?",
        answers: [
            "plaza del castillo",
            "plaza del castillo de pamplona",
            "plaza del castillo pamplona",
        ],
        hints: [
            "Me llaman el “salón” de la ciudad.",
            "Cafés históricos custodian mis bordes.",
            "Estoy a un par de pasos de Carlos III.",
            "Aquí empiezan muchas quedadas.",
            "He visto ferias, conciertos y manifestaciones.",
            "Si eres de Pamplona, me dices por mi nombre propio.",
        ],
    },
    {
        prompt: "No soy recta y, aun así, soy carrera. Mis balcones son graderío, mis adoquines, escenario. Cada julio mi nombre suena en todo el planeta, pero el resto del año sigo siendo vecina y comercio. ¿Qué calle soy?",
        answers: ["estafeta", "calle estafeta", "la estafeta"],
        hints: [
            "Famosa curva de una carrera muy particular.",
            "Balcones estrechos, cámaras listas.",
            "Entre Mercaderes y la Plaza de Toros tengo mi tramo más célebre.",
            "Adoquín y madera conviven en mis fachadas.",
            "Mi nombre aparece en portadas cada verano.",
            "No soy avenida; soy tradición encajonada.",
        ],
    },
    {
        prompt: "Nací para la pólvora y vigilar la puerta de un reino. Hoy, en mi estrella de piedra, pasean familias, trotan perros y resuenan conciertos. Soy fortaleza que aprendió a ser parque. ¿Quién soy?",
        answers: [
            "ciudadela",
            "la ciudadela",
            "ciudadela de pamplona",
        ],
        hints: [
            "Mi planta vista desde arriba dibuja una estrella.",
            "Renacentista, de bastiones y fosos.",
            "Ahora albergo arte, ferias y paseos.",
            "Estoy muy cerca del centro, pero soy pulmón verde.",
            "De cañones a columpios: cambié de oficio.",
            "He sido cuartel y hoy soy descanso.",
        ],
    },
    {
        prompt: "Torres que miran viñedos, patios que huelen a corte. Soy un palacio que hizo de la piedra un cuento y del siglo, un recuerdo dorado. Entre almenas y pasadizos, aún susurra la realeza. ¿Dónde estoy?",
        answers: [
            "castillo de olite",
            "palacio real de olite",
            "olite",
            "castillo-palacio de olite",
        ],
        hints: [
            "Gótico y navarro me definen.",
            "Mis jardines altos sorprendían a los viajeros.",
            "A una hora aproximada de Pamplona.",
            "Fui sede de reyes, no de condes.",
            "Mis torres son miradores de viñas.",
            "Mi silueta es postal obligada.",
        ],
    },
    {
        prompt: "Soy mar sin agua y océano de arcilla. El viento me esculpe, el silencio me gobierna. Quien me recorre escucha crujir la tierra y aprende a leer sombras. ¿Qué territorio atraviesas?",
        answers: [
            "bardenas reales",
            "las bardenas reales",
            "bardenas",
            "bardena",
        ],
        hints: [
            "Paisaje semidesértico singular en Navarra.",
            "Castildetierra es mi icono fotogénico.",
            "Rutas de BTT y 4x4 me trazan cicatrices.",
            "Contrastes de blancos y ocres a cualquier hora.",
            "No hay palmeras; hay cárcavas y badlands.",
            "Me llaman también desierto de Navarra (aunque no lo soy estrictamente).",
        ],
    },
    {
        prompt: "Mis hayas hablan en susurros verdes y el otoño me escribe con tinta roja y cobre. Entre brumas y ríos, crezco silenciosa y enorme, como una catedral de árboles. ¿Qué bosque soy?",
        answers: ["selva de irati", "irati", "bosque de irati"],
        hints: [
            "Hayedo-abetal de los mayores de Europa.",
            "Entre los valles de Aezkoa y Salazar.",
            "Ríos Irati y Urtxuria me acarician.",
            "Senderos señalizados y pantanos cercanos.",
            "En otoño me vuelvo un mosaico de colores.",
            "Silencio, musgo y madera dibujan mi mapa.",
        ],
    },
    {
        prompt: "Un dibujo de concha me guía y un sello colecciono en mi cuaderno. Cruzo puentes, murallas y montes, entrando por la puerta de los Pirineos hacia el oeste infinito. ¿Qué ruta camino?",
        answers: [
            "camino de santiago",
            "camino francés",
            "camino de santiago navarra",
            "camino frances",
        ],
        hints: [
            "Roncesvalles/Orreaga es mi pórtico navarro.",
            "La credencial pide tinta en cada etapa.",
            "Puentes medievales y flechas amarillas.",
            "Cruzo Pamplona de este a oeste.",
            "Mi meta simbólica queda muy lejos, en Galicia.",
            "Peregrinos de mil idiomas comparten senda.",
        ],
    },
    {
        prompt: "No soy catedral, pero trueno; no soy teatro, pero canto. Aquí el rojo tiene casa y el rival, respeto. He cambiado de rostro, pero mi voz es la misma. ¿Qué estadio soy?",
        answers: [
            "el sadar",
            "sadar",
            "estadio el sadar",
            "estadio sadar",
            "reyno de navarra",
        ],
        hints: [
            "Aquí juega Osasuna como local.",
            "Mi reforma reciente me dejó más vertical y ruidoso.",
            "Mi césped conoce partidos de Primera y noches de copa.",
            "Estoy en el barrio de Milagrosa/Arrosadía.",
            "Mi apodo oficioso: la caldera rojilla.",
            "Fui conocido un tiempo con nombre “real”.",
        ],
    },
    {
        prompt: "No es universidad y, sin embargo, forma maestros del balón. Entre campos verdes y madrugones, nacen rugidos con DNI rojillo. ¿Dónde aprende el cachorro a rugir antes de saltar al primer escenario?",
        answers: [
            "tajonar",
            "ciudad deportiva de tajonar",
            "instalaciones de tajonar",
        ],
        hints: [
            "La cantera de Osasuna vive aquí.",
            "Entrenamientos, residencias y formación.",
            "De aquí salieron internacionales.",
            "A pocos kilómetros de Pamplona.",
            "Base de metodología y paciencia.",
            "Escuela de identidad rojilla.",
        ],
    },
    {
        prompt: "Mi apellido suena a filo, pero corté sobre todo distancias. Llevé el brazal sin alzar la voz y marqué época con pasos firmes. ¿Qué capitán navarro te viene a la mente?",
        answers: ["patxi puñal", "puñal", "francisco puñal"],
        hints: [
            "Centrocampista de trabajo y poso.",
            "Muchos años vistiendo el rojo.",
            "ADN Tajonar de principio a fin.",
            "Capitán sobrio, referente en El Sadar.",
            "Pamplonés, ejemplo de compromiso.",
            "Su apellido parece arma, su juego fue temple.",
        ],
    },
    {
        prompt: "No soy muro, pero cierro la puerta; no soy campanario, pero mando por alto. De la tierra y del aire, vigilo cada centro. Llevo brazal y apellido común. ¿Quién es el central de la casa?",
        answers: [
            "david garcia",
            "david garcía",
            "david garcía zubiria",
            "garcia",
        ],
        hints: [
            "Canterano de Tajonar y capitán reciente.",
            "Juego aéreo y colocación como bandera.",
            "Internacional en listas de la selección.",
            "Referencia defensiva de Osasuna en los últimos años.",
            "Navarro, de perfil sobrio y eficaz.",
            "Lidera sin estridencias, con ejemplo.",
        ],
    },
];
const FINAL_CODE = "OSASUNA-2025";
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
            if (Array.isArray(s.attempts))
                state.attempts = s.attempts;
        }
    } catch (e) {}
}
function setProgress(i) {
    const pct = Math.min(
        100,
        Math.round((i / RIDDLES.length) * 100)
    );
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
        document.getElementById("giftCode").textContent =
            FINAL_CODE;
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
    h.textContent = "💡 " + (r.hint || "");
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
        c.style.backgroundColor = `hsl(${
            Math.random() * 360
        },100%,50%)`;
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
    if (!r.hint) {
        const s = document.getElementById("status");
        s.className = "status bad";
        s.textContent = "Sin pista disponible.";
        return;
    }
    document.getElementById("hint").style.display = "block";
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
document
    .getElementById("btnCheck")
    .addEventListener("click", check);
document.getElementById("btnHint").addEventListener("click", hint);
document
    .getElementById("btnReset")
    .addEventListener("click", resetAll);
document
    .getElementById("btnCopy")
    .addEventListener("click", copyCode);
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") check();
});
function startGame() {
    document.getElementById("introCard").style.display = "none";
    document.getElementById("riddleCard").style.display = "block";
    showRiddle();
}
document
    .getElementById("btnStart")
    .addEventListener("click", startGame);
load();
updateHintButton();
