const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clear-btn");
const cardsContainer = document.getElementById("cards-container");
const resultsCount = document.getElementById("results-count");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentCategory = "all";
let currentQuery = "";

function levelLabel(level) {
  const map = { beginner: "Básico", intermediate: "Intermedio", advanced: "Avanzado" };
  return map[level] || level;
}

function levelClass(level) {
  return `level-${level}`;
}

function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
}

function renderCards(list, query) {
  if (list.length === 0) {
    cardsContainer.innerHTML = `<div class="empty-state">No se encontraron expresiones para "<strong>${query || currentCategory}</strong>"</div>`;
    resultsCount.textContent = "";
    return;
  }

  resultsCount.textContent = `${list.length} expresión${list.length !== 1 ? "es" : ""} encontrada${list.length !== 1 ? "s" : ""}`;

  cardsContainer.innerHTML = list
    .map(
      (item) => `
    <div class="card" data-id="${item.id}" tabindex="0" role="button" aria-label="Ver detalles de: ${item.expression}">
      <div class="card-header">
        <span class="expression">${highlight(item.expression, query)}</span>
        <span class="level-badge ${levelClass(item.level)}">${levelLabel(item.level)}</span>
      </div>
      <div class="translation">${highlight(item.translation, query)}</div>
      <div class="meaning">${highlight(item.meaning, query)}</div>
    </div>
  `
    )
    .join("");

  cardsContainer.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => openModal(Number(card.dataset.id)));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openModal(Number(card.dataset.id));
    });
  });
}

function filterAndRender() {
  const query = currentQuery.toLowerCase().trim();
  const filtered = expressions.filter((item) => {
    const matchesCategory = currentCategory === "all" || item.category === currentCategory;
    const matchesQuery =
      !query ||
      item.expression.toLowerCase().includes(query) ||
      item.translation.toLowerCase().includes(query) ||
      item.meaning.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
  renderCards(filtered, query);
}

function openModal(id) {
  const item = expressions.find((e) => e.id === id);
  if (!item) return;

  modalBody.innerHTML = `
    <div class="modal-expression">${item.expression}</div>
    <div class="modal-translation">${item.translation}</div>
    <span class="level-badge ${levelClass(item.level)} modal-level">${levelLabel(item.level)}</span>
    <section>
      <h3>Significado</h3>
      <p>${item.meaning}</p>
    </section>
    <section>
      <h3>Ejemplo</h3>
      <p class="example-en">"${item.example}"</p>
      <p class="example-es">${item.exampleTranslation}</p>
    </section>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

searchInput.addEventListener("input", () => {
  currentQuery = searchInput.value;
  clearBtn.style.display = currentQuery ? "flex" : "none";
  filterAndRender();
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  currentQuery = "";
  clearBtn.style.display = "none";
  searchInput.focus();
  filterAndRender();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    filterAndRender();
  });
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Initial render
clearBtn.style.display = "none";
filterAndRender();
