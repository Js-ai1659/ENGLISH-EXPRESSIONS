/* ============================================================
   EMOJI AUTO-LOOKUP
   Checks each word of the expression against this dictionary.
   The first match wins. Used when no EMOJI column is provided.
   ============================================================ */
const EMOJI_MAP = {
  // Animals
  cat:'🐱', dog:'🐶', bird:'🐦', fish:'🐟', horse:'🐴', cow:'🐄', pig:'🐷', sheep:'🐑',
  rabbit:'🐰', bear:'🐻', lion:'🦁', tiger:'🐯', elephant:'🐘', monkey:'🐒', snake:'🐍',
  frog:'🐸', turtle:'🐢', butterfly:'🦋', bee:'🐝', ant:'🐜', spider:'🕷️', wolf:'🐺',
  fox:'🦊', deer:'🦌', penguin:'🐧', duck:'🦆', chicken:'🐔', owl:'🦉', eagle:'🦅',
  whale:'🐳', dolphin:'🐬', shark:'🦈', octopus:'🐙', crab:'🦀', lobster:'🦞',

  // Nature
  sun:'☀️', moon:'🌙', star:'⭐', rain:'🌧️', snow:'❄️', cloud:'☁️', wind:'💨',
  fire:'🔥', water:'💧', earth:'🌍', mountain:'⛰️', tree:'🌳', flower:'🌸', leaf:'🍃',
  grass:'🌿', rainbow:'🌈', storm:'⛈️', lightning:'⚡', ice:'🧊', desert:'🏜️', forest:'🌲',

  // Food & Drink
  apple:'🍎', banana:'🍌', orange:'🍊', grape:'🍇', strawberry:'🍓', pizza:'🍕',
  burger:'🍔', bread:'🍞', rice:'🍚', egg:'🥚', cheese:'🧀', cake:'🎂', cookie:'🍪',
  coffee:'☕', tea:'🍵', beer:'🍺', wine:'🍷', milk:'🥛', juice:'🧃', water:'💧',
  soup:'🍜', salad:'🥗', meat:'🥩', chicken:'🍗', fish:'🐟', fruit:'🍎', vegetable:'🥦',

  // Body & Health
  heart:'❤️', brain:'🧠', eye:'👁️', hand:'✋', foot:'🦶', tooth:'🦷', bone:'🦴',
  muscle:'💪', blood:'🩸', medicine:'💊', hospital:'🏥', doctor:'👨‍⚕️', sick:'🤒',
  sleep:'😴', run:'🏃', walk:'🚶', exercise:'🏋️', yoga:'🧘',

  // Emotions
  happy:'😊', sad:'😢', angry:'😠', fear:'😨', love:'❤️', laugh:'😂', cry:'😭',
  surprise:'😲', worry:'😰', calm:'😌', excited:'🤩', tired:'😴', confused:'😕',
  proud:'😤', shame:'😳', jealous:'😒', bored:'🥱', nervous:'😬',

  // People & Family
  baby:'👶', child:'👦', boy:'👦', girl:'👧', man:'👨', woman:'👩', father:'👨',
  mother:'👩', family:'👨‍👩‍👧‍👦', friend:'🤝', teacher:'👩‍🏫', student:'🎓', doctor:'👨‍⚕️',
  police:'👮', soldier:'💂', king:'🤴', queen:'👸',

  // Objects & Things
  book:'📚', pencil:'✏️', pen:'🖊️', paper:'📄', phone:'📱', computer:'💻',
  camera:'📷', clock:'⏰', key:'🔑', lock:'🔒', money:'💰', bag:'👜', hat:'🎩',
  glasses:'👓', umbrella:'☂️', chair:'🪑', table:'🪑', bed:'🛏️', door:'🚪',
  window:'🪟', lamp:'💡', knife:'🔪', fork:'🍴', cup:'☕', bottle:'🍶', box:'📦',
  gift:'🎁', balloon:'🎈', candle:'🕯️', mirror:'🪞', rope:'🧵', needle:'🪡',

  // Places & Buildings
  house:'🏠', home:'🏠', school:'🏫', church:'⛪', castle:'🏰', hospital:'🏥',
  hotel:'🏨', shop:'🏪', market:'🏪', bank:'🏦', library:'📚', museum:'🏛️',
  park:'🌳', beach:'🏖️', city:'🌆', village:'🏘️', farm:'🌾', garden:'🌷',

  // Transport
  car:'🚗', bus:'🚌', train:'🚂', plane:'✈️', boat:'⛵', ship:'🚢', bicycle:'🚲',
  motorcycle:'🏍️', truck:'🚚', taxi:'🚕', ambulance:'🚑', rocket:'🚀', helicopter:'🚁',

  // Sports & Activities
  football:'⚽', soccer:'⚽', basketball:'🏀', tennis:'🎾', baseball:'⚾', golf:'⛳',
  swimming:'🏊', running:'🏃', cycling:'🚴', boxing:'🥊', chess:'♟️', game:'🎮',
  music:'🎵', dance:'💃', art:'🎨', paint:'🎨', draw:'✏️', sing:'🎤', play:'🎮',
  read:'📖', write:'✍️', cook:'👨‍🍳', travel:'✈️', sleep:'😴', dream:'💭',

  // Time & Calendar
  morning:'🌅', night:'🌙', day:'☀️', week:'📅', month:'📆', year:'🗓️',
  today:'📅', tomorrow:'🌅', yesterday:'⏪', time:'⏰', hour:'⏰', minute:'⏱️',

  // Numbers & Shapes
  circle:'⭕', square:'🟥', triangle:'🔺', star:'⭐', diamond:'💎', heart:'❤️',

  // Weather
  hot:'🌡️', cold:'🥶', warm:'🌡️', sunny:'☀️', windy:'💨', foggy:'🌫️', humid:'💧',

  // Colors
  red:'🔴', blue:'🔵', green:'🟢', yellow:'🟡', black:'⚫', white:'⚪', purple:'🟣',
  orange:'🟠', pink:'🩷', brown:'🟫', grey:'🔘', gray:'🔘',

  // Work & Money
  work:'💼', job:'💼', office:'🏢', meeting:'🤝', money:'💰', pay:'💳', tax:'🧾',
  business:'💼', boss:'👔', employee:'👷', company:'🏢', market:'📈', price:'💲',

  // Technology
  internet:'🌐', email:'📧', wifi:'📶', battery:'🔋', power:'⚡', robot:'🤖',
  code:'💻', data:'💾', server:'🖥️', software:'💿', app:'📱',

  // Miscellaneous
  idea:'💡', question:'❓', answer:'✅', problem:'⚠️', solution:'🔧', change:'🔄',
  new:'🆕', old:'🕰️', big:'🐘', small:'🐜', fast:'⚡', slow:'🐢', easy:'😊',
  hard:'💪', good:'👍', bad:'👎', right:'✅', wrong:'❌', yes:'✅', no:'❌',
  up:'⬆️', down:'⬇️', left:'⬅️', right:'➡️', open:'🔓', close:'🔒'
};

function autoEmoji(expression) {
  const words = expression.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/);
  for (const word of words) {
    if (EMOJI_MAP[word]) return EMOJI_MAP[word];
  }
  return '';
}

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
const pasteInput   = $('paste-input');
const btnPaste     = $('btn-paste');
const btnClear     = $('btn-clear');

const modeBtns     = document.querySelectorAll('.mode-btn');
const flipModeEl   = $('flip-mode');
const quizModeEl   = $('quiz-mode');

const cardInner      = $('card-inner');
const btnSearch      = $('btn-search');
const btnSaved       = $('btn-saved');
const btnStar        = $('btn-star');
const searchBar      = $('search-bar');
const searchInput    = $('search-input');
const searchResults  = $('search-results');
const flashcard      = $('flashcard');
const cardEmoji      = $('card-emoji');
const cardExpression = $('card-expression');
const cardIpaFront   = $('card-ipa-front');
const frontLinkBtn   = $('front-link-btn');
const valMeaning     = $('val-meaning');
const valExplanation = $('val-explanation');
const valSynonyms    = $('val-synonyms');
const valExample     = $('val-example');
const valIpa         = $('val-ipa');
const backMeaning    = $('back-meaning');
const backExplanation = $('back-explanation');
const backSynonyms   = $('back-synonyms');
const backExample    = $('back-example');
const backIpa        = $('back-ipa');

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
  expression:  ['expression', 'expresion', 'word', 'palabra', 'phrase', 'frase', 'term', 'termino'],
  emoji:       ['emoji', 'emoticono', 'icon', 'icono', 'imagen', 'image'],
  meaning:     ['meaning', 'significado', 'definition', 'definicion'],
  explanation: ['explanation', 'explicacion', 'description', 'descripcion', 'detail', 'detalle', 'information', 'informacion', 'info'],
  synonyms:    ['synonym', 'sinonimo', 'synonyms', 'sinonimos', 'similar', 'related'],
  example:     ['example', 'ejemplo', 'sentence', 'oracion', 'uso', 'usage'],
  ipa:         ['ipa', 'pronunciation', 'pronunciacion', 'phonetic', 'fonetica'],
  link:        ['link', 'enlace', 'url', 'imagen', 'google', 'image_link', 'imagelink'],
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

      // Use raw arrays so column indices align perfectly with worksheet cells
      const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      if (!raw.length) { showToast('El archivo está vacío.'); return; }

      const headers = raw[0].map(h => String(h));

      // Map field names → column index
      const colIdx = {};
      headers.forEach((h, i) => {
        const field = matchField(h);
        if (field && !(field in colIdx)) colIdx[field] = i;
      });

      if (colIdx.expression === undefined) {
        showToast('No se encontró columna "Expression". Verifica los encabezados.');
        return;
      }

      const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
      const startRow = range.s.r; // header row (0-based in worksheet)

      const cards = raw.slice(1)
        .map((row, i) => {
          const wsRow = startRow + 1 + i; // absolute worksheet row

          // For link: prefer the hyperlink URL (cell.l.Target) over cell text
          let link = '';
          if (colIdx.link !== undefined) {
            const wsCol = range.s.c + colIdx.link;
            const addr  = XLSX.utils.encode_cell({ r: wsRow, c: wsCol });
            const cell  = ws[addr];
            const raw   = (cell && cell.l && cell.l.Target)
              ? cell.l.Target
              : String(row[colIdx.link] || '').trim();
            // XLSX.js encodes URLs with HTML entities (&amp; → &)
            link = raw.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          }

          return {
            expression:  String(row[colIdx.expression]  || '').trim(),
            emoji:       String(row[colIdx.emoji]        || '').trim(),
            meaning:     String(row[colIdx.meaning]      || '').trim(),
            explanation: String(row[colIdx.explanation]  || '').trim(),
            synonyms:    String(row[colIdx.synonyms]     || '').trim(),
            example:     String(row[colIdx.example]      || '').trim(),
            ipa:         String(row[colIdx.ipa]          || '').trim(),
            link
          };
        })
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
  btnSearch.hidden = false;
  btnClear.hidden = false;
  updateSavedBtn();

  // Persist last loaded deck
  try { localStorage.setItem('flashcards_last_deck', JSON.stringify(cards)); } catch {}

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

  const emoji = card.emoji || autoEmoji(card.expression);
  cardEmoji.textContent = emoji;
  cardEmoji.hidden      = !emoji;
  cardExpression.textContent = card.expression;
  cardIpaFront.textContent   = card.ipa || '';
  cardIpaFront.hidden        = !card.ipa;

  if (card.link) {
    frontLinkBtn.href   = card.link;
    frontLinkBtn.hidden = false;
  } else {
    frontLinkBtn.hidden = true;
  }

  valMeaning.textContent     = card.meaning     || '—';
  valExplanation.textContent = card.explanation || '—';
  valSynonyms.textContent    = card.synonyms    || '—';
  valExample.textContent     = card.example     || '—';
  valIpa.textContent         = card.ipa         || '—';

  backMeaning.hidden     = !card.meaning;
  backExplanation.hidden = !card.explanation;
  backSynonyms.hidden    = !card.synonyms;
  backExample.hidden     = !card.example;
  backIpa.hidden         = !card.ipa;

  btnPrev.disabled = state.currentIndex === 0;
  btnNext.disabled = state.currentIndex === state.cards.length - 1;
  updateProgress();
  updateStarBtn();
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
  const correctAnswer = correct.meaning || correct.expression;
  const pool = state.cards
    .filter(c => c !== correct && (c.meaning || c.expression))
    .map(c => c.meaning || c.expression);

  const wrongs = shuffle(pool).slice(0, 3);
  return shuffle([correctAnswer, ...wrongs]);
}

function answerQuiz(btn, chosen, card) {
  if (state.quiz.answered) return;
  state.quiz.answered = true;
  state.quiz.total++;

  const correctAnswer = card.meaning || card.expression;
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
  if (card.explanation) feedbackText += `\n${card.explanation}`;
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

// Paste input — one card per line
// Supports: CSV (comma), pipe |, or tab separators
// Handles quoted fields (CSV standard: "value with, comma")
// First line, if recognized as a header (matches known column names,
// in any order — e.g. WORD-EXPRESSION, MEANING, INFORMATION, SYNONYMS,
// EXAMPLE_SENTENCE, LINK, IPA, TYPE, THEME), defines the column mapping.
// Without a header row, falls back to the legacy fixed order:
// Term, Synonym, Meaning, More Info, Sentence in Context, Image Link.
// IPA embedded in the expression itself (e.g. "word /ipa/") is auto-extracted
// when no dedicated IPA column is present.
function parseCsvLine(line) {
  const fields = [];
  let cur = '', inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuote && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuote = !inQuote;
    } else if (!inQuote && (ch === ',' || ch === '\t' || ch === '|')) {
      fields.push(cur.trim()); cur = '';
    } else {
      cur += ch;
    }
  }
  fields.push(cur.trim());
  return fields;
}

const LEGACY_COL_ORDER = ['expression', 'synonyms', 'meaning', 'explanation', 'example', 'link'];

function parsePasteText(text) {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (!lines.length) return [];

  const firstParts = parseCsvLine(lines[0]);
  const headerMap = {};
  firstParts.forEach((h, i) => {
    const field = matchField(h);
    if (field && !(field in headerMap)) headerMap[field] = i;
  });
  const hasHeader = headerMap.expression !== undefined && Object.keys(headerMap).length >= 2;

  const colIdx = hasHeader
    ? headerMap
    : LEGACY_COL_ORDER.reduce((acc, field, i) => { acc[field] = i; return acc; }, {});
  const dataLines = hasHeader ? lines.slice(1) : lines;

  const field = (parts, name) => (colIdx[name] !== undefined ? (parts[colIdx[name]] || '').trim() : '');

  const cards = [];
  for (const line of dataLines) {
    const parts = parseCsvLine(line);
    if (parts.length < 2) continue;

    let expression = field(parts, 'expression');
    if (!expression) continue;

    let ipa = field(parts, 'ipa');
    if (!ipa) {
      // Extract IPA embedded in the expression itself, e.g. "stunned /stʌnd/"
      const ipaMatch = expression.match(/\/[^/]+\//);
      if (ipaMatch) {
        ipa = ipaMatch[0].trim();
        expression = expression.replace(ipaMatch[0], '').trim();
      }
    }

    let link = field(parts, 'link');

    // Strip URLs embedded in any text field and collect the first one as link
    function stripUrls(text) {
      const urls = text.match(/https?:\/\/[^\s,|]+/g);
      if (!urls) return { clean: text, url: null };
      let clean = text
        .replace(/\s*—\s*img:/g, '')
        .replace(/\s*—\s*https?:\/\/[^\s,|]+/g, '')
        .replace(/https?:\/\/[^\s,|]+/g, '')
        .trim()
        .replace(/\s*[—|]\s*$/, '')
        .trim();
      return { clean, url: urls[0] };
    }

    const exprStripped = stripUrls(expression);
    if (!link && exprStripped.url) link = exprStripped.url;
    expression = exprStripped.clean;

    let explanation = field(parts, 'explanation');
    const explStripped = stripUrls(explanation);
    if (!link && explStripped.url) link = explStripped.url;
    explanation = explStripped.clean;

    cards.push({
      expression,
      synonyms:    field(parts, 'synonyms'),
      meaning:     field(parts, 'meaning'),
      explanation,
      example:     field(parts, 'example'),
      link,
      emoji: '',
      ipa
    });
  }
  return cards;
}

btnPaste.addEventListener('click', () => {
  const cards = parsePasteText(pasteInput.value);
  if (!cards.length) { showToast('No se encontraron tarjetas. Revisa el formato.'); return; }
  loadCards(cards);
  showToast(`✅ ${cards.length} tarjetas cargadas`);
});

// Clear cards → back to welcome screen
btnClear.addEventListener('click', () => {
  state.cards = [];
  state.currentIndex = 0;
  state.isFlipped = false;
  appMain.hidden = true;
  completionScreen.hidden = true;
  welcomeSection.hidden = false;
  btnSearch.hidden = true;
  btnClear.hidden = true;
  searchBar.hidden = true;
  pasteInput.value = '';
  try { localStorage.removeItem('flashcards_last_deck'); } catch {}
});

// Restore last deck on page load
try {
  const last = JSON.parse(localStorage.getItem('flashcards_last_deck'));
  if (last && last.length) loadCards(last);
} catch {}

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

/* ============================================================
   SEARCH
   ============================================================ */
/* ============================================================
   SAVED (PENDING) CARDS  — persisted in localStorage
   ============================================================ */
const STORAGE_KEY = 'flashcards_saved';

function getSaved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveCard(card) {
  const saved = getSaved();
  if (!saved.find(c => c.expression === card.expression)) {
    saved.push(card);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }
  updateSavedBtn();
}

function unsaveCard(expression) {
  const saved = getSaved().filter(c => c.expression !== expression);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  updateSavedBtn();
}

function isCardSaved(expression) {
  return getSaved().some(c => c.expression === expression);
}

function updateSavedBtn() {
  const n = getSaved().length;
  btnSaved.hidden = n === 0;
  btnSaved.textContent = `★ Pendientes (${n})`;
}

function updateStarBtn() {
  const card = state.cards[state.currentIndex];
  if (!card) return;
  btnStar.textContent = isCardSaved(card.expression) ? '★' : '☆';
  btnStar.title = isCardSaved(card.expression) ? 'Quitar de pendientes' : 'Guardar como pendiente';
}

btnStar.addEventListener('click', e => {
  e.stopPropagation();
  const card = state.cards[state.currentIndex];
  if (!card) return;
  if (isCardSaved(card.expression)) {
    unsaveCard(card.expression);
  } else {
    saveCard(card);
  }
  updateStarBtn();
});

btnSaved.addEventListener('click', () => {
  const saved = getSaved();
  if (!saved.length) return;
  loadCards(saved);
  showToast(`★ ${saved.length} tarjetas pendientes`);
});

// Init saved button on page load
updateSavedBtn();

function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}

btnSearch.addEventListener('click', () => {
  const open = searchBar.hidden;
  searchBar.hidden = !open;
  btnSearch.classList.toggle('active', open);
  if (open) {
    searchInput.value = '';
    searchResults.hidden = true;
    searchInput.focus();
  }
});

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.hidden = true; return; }

  const matches = state.cards
    .map((card, idx) => ({ card, idx }))
    .filter(({ card }) =>
      card.expression.toLowerCase().includes(q) ||
      card.synonyms.toLowerCase().includes(q)
    )
    .slice(0, 10);

  if (!matches.length) {
    searchResults.innerHTML = '<li style="color:var(--text-muted)">Sin resultados</li>';
    searchResults.hidden = false;
    return;
  }

  searchResults.innerHTML = matches.map(({ card, idx }) => {
    const expr = highlight(card.expression, q);
    const syn  = card.synonyms ? ` <span style="color:var(--text-muted);font-size:0.8rem">— ${highlight(card.synonyms, q)}</span>` : '';
    return `<li data-idx="${idx}">${expr}${syn}</li>`;
  }).join('');
  searchResults.hidden = false;
});

searchResults.addEventListener('click', e => {
  const li = e.target.closest('li[data-idx]');
  if (!li) return;
  state.currentIndex = parseInt(li.dataset.idx, 10);
  state.isFlipped = false;
  renderMode();
  searchBar.hidden = true;
  btnSearch.classList.remove('active');
  searchInput.value = '';
  searchResults.hidden = true;
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !searchBar.hidden) {
    searchBar.hidden = true;
    btnSearch.classList.remove('active');
    searchResults.hidden = true;
  }
});
