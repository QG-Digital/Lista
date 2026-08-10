/* =========================================
   HUB DE APLICATIVOS - QG DIGITAL
   Script principal (main.js)
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Tocha (persistência do estado) ---------- */
  const torchCheckbox = document.querySelector(".torch-checkbox");

  const savedState = localStorage.getItem("torchState");
  if (savedState !== null) {
    torchCheckbox.checked = savedState === "on";
  }

  torchCheckbox.addEventListener("change", () => {
    localStorage.setItem("torchState", torchCheckbox.checked ? "on" : "off");
  });

  /* ---------- Contador de downloads ---------- */
  // Base de cálculo: 10/08/2026.
  // A cada dia que passa, o contador aumenta 3 downloads.
  const BASE_DATE = new Date(2026, 7, 10); // Mês é 0-indexado: 7 = agosto

  function getDownloads(base) {
    // Zera as horas para comparar apenas as datas
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const baseCopy = new Date(BASE_DATE);
    baseCopy.setHours(0, 0, 0, 0);

    // Diferença em dias completos desde a data base
    const msPerDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.max(
      0,
      Math.floor((today.getTime() - baseCopy.getTime()) / msPerDay)
    );

    return base + diffDays * 3;
  }

  // Atualiza os contadores exibidos na página
  function updateDownloadCounters() {
    const localInstaEl = document.getElementById("downloads-localinsta");
    const solarioEl = document.getElementById("downloads-solario");

    if (localInstaEl) localInstaEl.textContent = getDownloads(57); // Base: 57 em 10/08/2026
    if (solarioEl) solarioEl.textContent = getDownloads(74);      // Base: 74 em 10/08/2026
  }

  updateDownloadCounters();

  // Atualiza automaticamente se a página ficar aberta na virada do dia
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      updateDownloadCounters();
    }
  }, 60 * 1000);
});
