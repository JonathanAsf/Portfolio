const originalTexts = {};

document.addEventListener("DOMContentLoaded", () => {
  const btnEn = document.getElementById("btn-en");
  const btnPt = document.getElementById("btn-pt");

  // Salvar textos originais em português
  saveOriginalTexts();

  btnEn.addEventListener("click", () => {
    loadLanguage("en");
  });

  btnPt.addEventListener("click", () => {
    restoreOriginalTexts();
  });
});

function saveOriginalTexts() {
  const translatableElements = document.querySelectorAll("[id]");
  translatableElements.forEach((el) => {
    originalTexts[el.id] = el.innerHTML;
  });
}

function restoreOriginalTexts() {
  for (const id in originalTexts) {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = originalTexts[id];
    }
  }
  console.log("Idioma alterado para: pt-br");
}

function loadLanguage(lang) {
  fetch(`./translations/${lang}.json`)
    .then((response) => {
      if (!response.ok) throw new Error(`Arquivo de tradução não encontrado: ${lang}.json`);
      return response.json();
    })
    .then((data) => {
      for (const key in data) {
        const el = document.getElementById(key);
        if (el) {
          el.innerHTML = data[key];
        }
      }
      console.log(`Idioma alterado para: ${lang}`);
    })
    .catch((error) => console.error("Erro ao carregar tradução:", error));
}