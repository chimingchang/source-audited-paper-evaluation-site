(() => {
  const table = document.querySelector("#ranking-table");
  if (!table) return;
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const search = document.querySelector("#site-search");
  const maturity = document.querySelector("#maturity-filter");
  const claim = document.querySelector("#claim-filter");
  const cap = document.querySelector("#cap-filter");
  const priv = document.querySelector("#private-filter");
  const uncertainty = document.querySelector("#uncertainty-filter");
  const visible = document.querySelector("#visible-count");

  function update() {
    const query = (search.value || "").trim().toLowerCase();
    let count = 0;
    rows.forEach((row) => {
      const show = (!query || row.dataset.search.includes(query)) &&
        (!maturity.value || row.dataset.maturity === maturity.value) &&
        (!claim.checked || row.dataset.claim === "true") &&
        (!cap.checked || row.dataset.cap === "true") &&
        (!priv.checked || row.dataset.private === "true") &&
        (!uncertainty.checked || row.dataset.uncertainty === "true");
      row.hidden = !show;
      if (show) count += 1;
    });
    if (visible) visible.textContent = `${count} rows`;
  }

  [search, maturity, claim, cap, priv, uncertainty].forEach((el) => el && el.addEventListener("input", update));
  update();
})();

(() => {
  const allTable = document.querySelector(".table-section .compare-table");
  if (!allTable) return;
  const rows = Array.from(document.querySelectorAll("[data-compare-row]"));
  const allRows = Array.from(allTable.querySelectorAll("[data-compare-row]"));
  const search = document.querySelector("#compare-search");
  const band = document.querySelector("#compare-band-filter");
  const smallGap = document.querySelector("#compare-small-gap-filter");
  const claim = document.querySelector("#compare-claim-filter");
  const cap = document.querySelector("#compare-cap-filter");
  const priv = document.querySelector("#compare-private-filter");
  const maturity = document.querySelector("#compare-maturity-filter");
  const visible = document.querySelector("#compare-visible-count");
  const tableCount = document.querySelector("#compare-table-count");

  function update() {
    const query = (search.value || "").trim().toLowerCase();
    rows.forEach((row) => {
      const show = (!query || row.dataset.search.includes(query)) &&
        (!band.checked || row.dataset.bandOverlap === "true") &&
        (!smallGap.checked || row.dataset.smallGap === "true") &&
        (!claim.checked || row.dataset.claim === "true") &&
        (!cap.checked || row.dataset.cap === "true") &&
        (!priv.checked || row.dataset.private === "true") &&
        (!maturity.checked || row.dataset.maturityMixed === "true");
      row.hidden = !show;
    });
    const count = allRows.filter((row) => !row.hidden).length;
    if (visible) visible.textContent = `${count} pairs`;
    if (tableCount) tableCount.textContent = `${count} pairs visible`;
  }

  [search, band, smallGap, claim, cap, priv, maturity].forEach((el) => el && el.addEventListener("input", update));
  update();
})();
