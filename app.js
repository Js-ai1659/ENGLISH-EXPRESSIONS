/* ============================================================
   STATE
   ============================================================ */
const state = {
  cards: [],
  currentIndex: 0,
  mode: 'flip',
  isFlipped: false,
  quiz: { score: 0, total: 0, answered: false }
};

/* ============================================================
   DOM REFS
   ============================================================ */
const $ = id => document.getElementById(id);

const welcomeSection  = $('welcome-section');
const appMain         = $('app-main');
const completionScreen = $('completion-screen');

const fileInput    = $('file-input');
const dropZone     = $('drop-zone');
const btnDemo      = $('btn-demo');

const modeBtns     = document.querySelectorAll('.mode-btn');
const flipModeEl   = $('flip-mode');
const quizModeEl   = $('quiz-mode');

const cardInner    = $('card-inner');
const flashcard    = $('flashcard');
const cardExpression = $('card-expression');
const valTranslation = $('val-translation');
const valMeaning   = $('val-meaning');
const valExample   = $('val-example');
const valSynonyms  = $('val-synonyms');
const backMeaning  = $('back-meaning');
const backExample  = $('back-example');
const backSynonyms = $('back-synonyms');

const btnPrev      = $('btn-prev');
const btnNext      = $('btn-next');
const btnShuffle   = $('btn-shuffle');
const btnRestart   = $('btn-restart');
const btnRestartFinal = $('btn-restart-final');

const quizExpression = $('quiz-expression');
const quizOptions    = $('quiz-options');
const quizFeedback   = $('quiz-feedback');
const btnQuizNext    = $('btn-quiz-next');

const cardCounter  = $('card-counter');
const scoreLabel   = $('score-label');
const progressFill = $('progress-fill');
const completionMsg = $('completion-msg');
const toast        = $('toast');

/* ============================================================
   EXCEL COLUMN ALIASES  (lowercase, accents removed)
   ============================================================ */
const ALIASES = {
  expression:  ['expression', 'expresion', 'palabra', 'word', 'phrase', 'frase', 'term', 'termino'],
  translation: ['translation', 'traduccion', 'espanol', 'spanish', 'translate', 'traducir'],
  meaning:     ['meaning', 'significado', 'definition', 'definicion', 'descripcion', 'description', 'explanation', 'explicacion'],
  example:     ['example', 'ejemplo', 'sentence', 'oracion', 'uso', 'usage'],
  synonyms:    ['synonym', 'sinonimo', 'synonyms', 'sinonimos', 'similar', 'related']
};

function removeAccents(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function matchField(header) {
  const h = removeAccents(header);
  for (const [field, aliases] of Object.entries(ALIASES)) {
    if (aliases.some(a => h.includes(a))) return field;
  }
  return null;
}

/* ============================================================
   EXCEL PARSING
   ============================================================ */
function parseExcel(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

      if (!rows.length) { showToast('El archivo está vacío.'); return; }

      const colMap = {};
      Object.keys(rows[0]).forEach(h => {
        const field = matchField(h);
        if (field && !colMap[field]) colMap[field] = h;
      });

      if (!colMap.expression) {
        showToast('No se encontró columna "Expression". Verifica los encabezados.');
        return;
      }

      const cards = rows
        .map(r => ({
          expression:  String(r[colMap.expression]  || '').trim(),
          translation: String(r[colMap.translation] || '').trim(),
          meaning:     String(r[colMap.meaning]     || '').trim(),
          example:     String(r[colMap.example]     || '').trim(),
          synonyms:    String(r[colMap.synonyms]    || '').trim()
        }))
        .filter(c => c.expression);

      if (!cards.length) { showToast('No se encontraron filas con datos.'); return; }

      loadCards(cards);
      showToast(`✅ ${cards.length} tarjetas cargadas`);
    } catch {
      showToast('Error al leer el archivo. ¿Es un .xlsx válido?');
    }
  };
  reader.readAsArrayBuffer(file);
}

/* ============================================================
   LOAD CARDS
   ============================================================ */
function loadCards(cards) {
  state.cards = cards;
  state.currentIndex = 0;
  state.isFlipped = false;
  state.quiz = { score: 0, total: 0, answered: false };

  welcomeSection.hidden = true;
  completionScreen.hidden = true;
  appMain.hidden = false;

  renderMode();
}

/* ============================================================
   MODE SWITCHING
   ============================================================ */
function setMode(mode) {
  state.mode = mode;
  state.currentIndex = 0;
  state.isFlipped = false;
  state.quiz = { score: 0, total: 0, answered: false };

  modeBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  flipModeEl.hidden = mode !== 'flip';
  quizModeEl.hidden = mode !== 'quiz';

  renderMode();
}

function renderMode() {
  if (state.mode === 'flip') renderFlipCard();
  else renderQuiz();
}

/* ============================================================
   FLIP CARD
   ============================================================ */
function renderFlipCard() {
  const card = state.cards[state.currentIndex];
  if (!card) return;

  // Reset flip
  state.isFlipped = false;
  cardInner.classList.remove('flipped');

  cardExpression.textContent = card.expression;
  valTranslation.textContent = card.translation || '—';
  valMeaning.textContent     = card.meaning     || '—';
  valExample.textContent     = card.example     || '—';
  valSynonyms.textContent    = card.synonyms    || '—';

  backMeaning.hidden  = !card.meaning;
  backExample.hidden  = !card.example;
  backSynonyms.hidden = !card.synonyms;

  btnPrev.disabled = state.currentIndex === 0;
  btnNext.disabled = state.currentIndex === state.cards.length - 1;
  updateProgress();
}

function flipCard() {
  state.isFlipped = !state.isFlipped;
  cardInner.classList.toggle('flipped', state.isFlipped);
}

/* ============================================================
   QUIZ
   ============================================================ */
function renderQuiz() {
  const card = state.cards[state.currentIndex];
  if (!card) return;

  state.quiz.answered = false;
  quizExpression.textContent = card.expression;
  quizFeedback.hidden = true;
  btnQuizNext.hidden = true;

  const options = buildQuizOptions(card);
  quizOptions.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => answerQuiz(btn, opt, card));
    quizOptions.appendChild(btn);
  });

  updateProgress();
}

function buildQuizOptions(correct) {
  const correctAnswer = correct.translation || correct.expression;
  const pool = state.cards
    .filter(c => c !== correct && (c.translation || c.expression))
    .map(c => c.translation || c.expression);

  const wrongs = shuffle(pool).slice(0, 3);
  return shuffle([correctAnswer, ...wrongs]);
}

function answerQuiz(btn, chosen, card) {
  if (state.quiz.answered) return;
  state.quiz.answered = true;
  state.quiz.total++;

  const correctAnswer = card.translation || card.expression;
  const isCorrect = chosen === correctAnswer;

  if (isCorrect) {
    state.quiz.score++;
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    quizOptions.querySelectorAll('.quiz-option').forEach(b => {
      if (b.textContent === correctAnswer) b.classList.add('correct');
    });
  }

  quizOptions.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

  quizFeedback.hidden = false;
  quizFeedback.className = `quiz-feedback ${isCorrect ? 'correct-feedback' : 'wrong-feedback'}`;

  let feedbackText = isCorrect ? '✅ ¡Correcto!' : `❌ Incorrecto. La respuesta es: "${correctAnswer}"`;
  if (card.meaning) feedbackText += `\n${card.meaning}`;
  quizFeedback.textContent = feedbackText;

  scoreLabel.textContent = `Puntuación: ${state.quiz.score}/${state.quiz.total}`;
  updateProgress();

  const isLast = state.currentIndex === state.cards.length - 1;
  if (isLast) {
    btnQuizNext.textContent = 'Ver resultados';
  }
  btnQuizNext.hidden = false;
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function goNext() {
  if (state.currentIndex < state.cards.length - 1) {
    state.currentIndex++;
    renderMode();
  } else {
    showCompletion();
  }
}

function goPrev() {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    renderMode();
  }
}

function showCompletion() {
  appMain.hidden = true;
  completionScreen.hidden = false;
  if (state.mode === 'quiz') {
    const pct = Math.round((state.quiz.score / state.quiz.total) * 100);
    completionMsg.textContent = `Respondiste correctamente ${state.quiz.score} de ${state.quiz.total} preguntas (${pct}%).`;
  } else {
    completionMsg.textContent = `Repasaste las ${state.cards.length} tarjetas. ¡Buen trabajo!`;
  }
}

function restart() {
  state.currentIndex = 0;
  state.isFlipped = false;
  state.quiz = { score: 0, total: 0, answered: false };
  scoreLabel.textContent = '';
  completionScreen.hidden = true;
  appMain.hidden = false;
  renderMode();
}

/* ============================================================
   PROGRESS
   ============================================================ */
function updateProgress() {
  const total = state.cards.length;
  const current = state.currentIndex + 1;
  cardCounter.textContent = `${current} / ${total}`;
  progressFill.style.width = `${(current / total) * 100}%`;
}

/* ============================================================
   UTILITIES
   ============================================================ */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let toastTimer;
function showToast(msg, duration = 3000) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */

// File input
fileInput.addEventListener('change', e => {
  if (e.target.files[0]) parseExcel(e.target.files[0]);
  e.target.value = '';
});

// Drag & drop on drop zone
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) parseExcel(file);
});

// Demo data
btnDemo.addEventListener('click', () => {
  loadCards(DEMO_CARDS);
  showToast('✅ Datos de ejemplo cargados');
});

// Mode selector
modeBtns.forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));

// Flip card
flashcard.addEventListener('click', flipCard);
flashcard.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipCard(); }
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft') goPrev();
});

// Flip nav
btnPrev.addEventListener('click', goPrev);
btnNext.addEventListener('click', goNext);
btnShuffle.addEventListener('click', () => {
  state.cards = shuffle(state.cards);
  state.currentIndex = 0;
  state.isFlipped = false;
  renderMode();
  showToast('🔀 Tarjetas mezcladas');
});

// Quiz next
btnQuizNext.addEventListener('click', goNext);

// Restart
btnRestart.addEventListener('click', restart);
btnRestartFinal.addEventListener('click', restart);
