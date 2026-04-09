/* ═══════════════════════════════════════════════════════════════
   SITE SNAPSHOT — app.js
   Home grid view + full-page job detail with back button
═══════════════════════════════════════════════════════════════ */

// ─── Data ─────────────────────────────────────────────────────
const jobs = Array.isArray(APP_DATA.jobs) ? APP_DATA.jobs : [];

// ─── DOM refs ──────────────────────────────────────────────────
const $clientName  = document.getElementById("clientName");
const $weekEnding  = document.getElementById("headerWeekEnding");
const $lastUpdated = document.getElementById("headerUpdated");
const $kpi         = document.getElementById("kpi");
const $searchInput = document.getElementById("searchInput");
const $searchClear = document.getElementById("searchClear");
const $filterTabs  = document.getElementById("filterTabs");
const $jobGrid     = document.getElementById("jobGrid");
const $homeView    = document.getElementById("homeView");
const $detailView  = document.getElementById("detailView");
const $detailContent = document.getElementById("detailContent");
const $backBtn     = document.getElementById("backBtn");
const $footer      = document.getElementById("appFooter");

// ─── State ────────────────────────────────────────────────────
let activeFilter = "all";
let searchQuery  = "";

// ─── Formatters ───────────────────────────────────────────────
function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Status delta ─────────────────────────────────────────────
const STATUS_RANK = { "on-track": 0, "monitor": 1, "unknown": 2, "at-risk": 3 };

function getDelta(current, previous) {
  if (!previous) return "stable";
  const c = STATUS_RANK[current] ?? 2;
  const p = STATUS_RANK[previous] ?? 2;
  if (c < p) return "improved";
  if (c > p) return "deteriorated";
  return "stable";
}

function renderDelta(current, previous) {
  const delta = getDelta(current, previous);
  const map = { improved: "↑ Improved", deteriorated: "↓ Deteriorated", stable: "→ Holding" };
  return `<span class="delta ${delta}">${map[delta]}</span>`;
}

// ─── Helpers ──────────────────────────────────────────────────
function countStatus(status) {
  return jobs.filter(j => j.status === status).length;
}

function labourClass(labour) {
  if (labour === "adequate")     return "labour-adequate";
  if (labour === "insufficient") return "labour-insufficient";
  return "labour-unknown";
}

// ─── Filter logic ─────────────────────────────────────────────
function isVisible(job) {
  const matchFilter = activeFilter === "all" || job.status === activeFilter;
  const matchSearch = !searchQuery ||
    job.name.toLowerCase().includes(searchQuery.toLowerCase());
  return matchFilter && matchSearch;
}

function applyFilters() {
  let visibleCount = 0;
  document.querySelectorAll(".job-card[data-id]").forEach(card => {
    const job = jobs.find(j => j.id === card.dataset.id);
    const show = job && isVisible(job);
    card.style.display = show ? "" : "none";
    if (show) visibleCount++;
  });

  let $noResults = document.getElementById("noResults");
  if (!visibleCount) {
    if (!$noResults) {
      $noResults = document.createElement("div");
      $noResults.id = "noResults";
      $noResults.className = "no-results";
      $noResults.textContent = "No jobs match your search.";
      $jobGrid.appendChild($noResults);
    }
    $noResults.style.display = "";
  } else if ($noResults) {
    $noResults.style.display = "none";
  }

  updateTabCounts();
}

function updateTabCounts() {
  document.querySelectorAll(".filter-tab[data-filter]").forEach(tab => {
    const filter = tab.dataset.filter;
    const count = filter === "all" ? jobs.length : countStatus(filter);
    const countEl = tab.querySelector(".tab-count");
    if (countEl) countEl.textContent = `(${count})`;
  });
}

// ─── Render: header ───────────────────────────────────────────
function renderHeader() {
  $clientName.textContent = APP_DATA.company;
  $weekEnding.textContent  = formatDate(APP_DATA.reportDate);
  $lastUpdated.textContent = formatDate(APP_DATA.updatedDate);
}

// ─── Render: KPIs ─────────────────────────────────────────────
function renderKpis() {
  $kpi.innerHTML = `
    <div class="kpi-card">
      <div class="kpi-label">Total Jobs</div>
      <div class="kpi-value">${jobs.length}</div>
    </div>
    <div class="kpi-card kpi-risk">
      <div class="kpi-label">At Risk</div>
      <div class="kpi-value">${countStatus("at-risk")}</div>
    </div>
    <div class="kpi-card kpi-monitor">
      <div class="kpi-label">Monitor</div>
      <div class="kpi-value">${countStatus("monitor")}</div>
    </div>
    <div class="kpi-card kpi-ok">
      <div class="kpi-label">On Track</div>
      <div class="kpi-value">${countStatus("on-track")}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Data Gaps</div>
      <div class="kpi-value">${countStatus("unknown")}</div>
    </div>
  `;
}

// ─── Render: filter tabs ──────────────────────────────────────
function renderFilterTabs() {
  const tabs = [
    { filter: "all",      label: "All" },
    { filter: "at-risk",  label: "At Risk" },
    { filter: "monitor",  label: "Monitor" },
    { filter: "on-track", label: "On Track" },
    { filter: "unknown",  label: "Data Gaps" }
  ];

  $filterTabs.innerHTML = tabs.map(t => `
    <button class="filter-tab${t.filter === activeFilter ? " active" : ""}" data-filter="${t.filter}">
      ${t.label} <span class="tab-count">(${t.filter === "all" ? jobs.length : countStatus(t.filter)})</span>
    </button>
  `).join("");

  $filterTabs.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      activeFilter = tab.dataset.filter;
      $filterTabs.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      applyFilters();
    });
  });
}

// ─── Render: job grid (home view) ─────────────────────────────
function renderJobGrid() {
  $jobGrid.innerHTML = "";

  jobs.forEach(job => {
    const card = document.createElement("div");
    card.className = `job-card ${job.status}`;
    card.dataset.id = job.id;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View details for ${job.name}`);

    const escBadge = (job.escalations && job.escalations.length)
      ? `<div class="card-field" style="margin-top:6px">
           <div class="card-field-label">Decisions Required</div>
           <div class="card-field-value" style="color:${job.status === "at-risk" ? "var(--risk)" : "var(--monitor)"}; font-weight:600">
             ${job.escalations.length} item${job.escalations.length > 1 ? "s" : ""}
           </div>
         </div>`
      : "";

    card.innerHTML = `
      <div class="job-card-summary">
        <div class="card-header">
          <div class="card-header-left">
            <div class="job-name">${job.name}</div>
            <div class="job-dates">Week ending ${formatDate(job.weekEnding)}</div>
          </div>
          <div class="card-header-right">
            <div class="status-pill ${job.status}">${job.statusLabel}</div>
            ${renderDelta(job.status, job.lastWeekStatus)}
          </div>
        </div>
        <div class="card-field">
          <div class="card-field-label">Holding Up</div>
          <div class="card-field-value">${job.holdingUp}</div>
        </div>
        <div class="card-field">
          <div class="card-field-label">Labour</div>
          <div class="card-field-value ${labourClass(job.labour)}">${job.labourLabel}</div>
        </div>
        <div class="card-field">
          <div class="card-field-label">Site Reality</div>
          <div class="card-field-value">${job.reality}</div>
        </div>
        ${escBadge}
        <div class="card-next-action">
          <div class="card-field-label">Next Action</div>
          <div class="card-field-value">${job.nextAction}</div>
        </div>
      </div>
      <div class="card-view-hint">Full Details →</div>
    `;

    const openDetail = () => showDetailView(job.id);
    card.addEventListener("click", openDetail);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetail(); }
    });

    $jobGrid.appendChild(card);
  });

  applyFilters();
}

// ─── Detail view: build content ───────────────────────────────
function buildDetailHtml(job) {
  // Escalations
  let escHtml = "";
  if (job.escalations && job.escalations.length) {
    const isRisk = job.status === "at-risk";
    const items = job.escalations.map(e =>
      `<div class="det-esc-item${isRisk ? " risk" : ""}">${e}</div>`
    ).join("");
    escHtml = `
      <div class="det-escalations${isRisk ? " at-risk" : ""}">
        <div class="det-esc-heading${isRisk ? " risk" : ""}">! Decisions Required This Week</div>
        ${items}
      </div>`;
  }

  // Manager note
  const managerHtml = job.managerNote ? `
    <div class="det-manager-note">
      <div class="det-manager-note-label">Manager Assessment</div>
      ${job.managerNote}
    </div>` : "";

  // Site position grid
  const siteHtml = `
    <div class="det-section-title">Site Position</div>
    <div class="det-grid" style="margin-bottom:10px">
      <div class="det-block">
        <div class="det-label">Holding Up</div>
        <div class="det-value">${job.holdingUp}</div>
      </div>
      <div class="det-block">
        <div class="det-label">Critical Path</div>
        <div class="det-value">${job.criticalPath}</div>
      </div>
      <div class="det-block">
        <div class="det-label">Labour</div>
        <div class="det-value">${job.labourLabel}</div>
      </div>
      <div class="det-block">
        <div class="det-label">Data Confidence</div>
        <div class="det-value">${job.confidenceLabel}</div>
      </div>
    </div>
    <div class="det-block" style="margin-bottom:10px">
      <div class="det-label">Site Reality</div>
      <div class="det-value">${job.reality}</div>
    </div>`;

  // Next action (prominent dark block)
  const nextActionHtml = `
    <div class="det-next-action">
      <div class="det-label">Next Action</div>
      <div class="det-value">${job.nextAction}</div>
    </div>`;

  // Data quality
  const dataQualityHtml = job.dataGaps ? `
    <div class="det-section-title">Data Quality</div>
    <div class="det-grid" style="margin-bottom:10px">
      <div class="det-block">
        <div class="det-label">Data Gaps</div>
        <div class="det-value">${job.dataGaps}</div>
      </div>
      <div class="det-block">
        <div class="det-label">Gap Detail</div>
        <div class="det-value">${job.dataGapDetail || "—"}</div>
      </div>
    </div>` : "";

  // Latest log date
  const latestLogHtml = `
    <div class="det-block" style="margin-bottom:0">
      <div class="det-label">Latest Daily Log</div>
      <div class="det-value">${job.latestDailyLog ? formatDate(job.latestDailyLog) : "No log received"}</div>
    </div>`;

  // Weekly log
  const logRows = (job.weeklyLog && job.weeklyLog.length)
    ? job.weeklyLog.map(item => `
        <div class="log-row">
          <div class="log-day">${item.day}</div>
          <div class="log-activity">${item.activity}</div>
        </div>`).join("")
    : `<div class="log-row"><div class="log-activity">No daily logs available.</div></div>`;

  const weeklyLogHtml = `
    <div class="det-section-title" style="margin-top:20px">Weekly Activity Log</div>
    <div class="weekly-log">${logRows}</div>`;

  return `
    <div class="detail-page-header">
      <div>
        <div class="detail-page-title">${job.name}</div>
        <div class="detail-page-meta">Week ending ${formatDate(job.weekEnding)} · Updated ${formatDate(job.reportDate)}</div>
      </div>
      <div class="detail-page-header-right">
        <div class="status-pill ${job.status}">${job.statusLabel}</div>
        ${renderDelta(job.status, job.lastWeekStatus)}
      </div>
    </div>
    ${escHtml}
    ${managerHtml}
    ${siteHtml}
    ${nextActionHtml}
    ${dataQualityHtml}
    ${latestLogHtml}
    ${weeklyLogHtml}
  `;
}

// ─── View switching ───────────────────────────────────────────
function showDetailView(jobId) {
  const job = jobs.find(j => j.id === jobId);
  if (!job) return;

  $detailContent.innerHTML = buildDetailHtml(job);
  $homeView.style.display = "none";
  $detailView.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHomeView() {
  $detailView.style.display = "none";
  $homeView.style.display = "block";
  window.scrollTo({ top: 0, behavior: "instant" });
}

// ─── Search setup ─────────────────────────────────────────────
function setupSearch() {
  $searchInput.addEventListener("input", () => {
    searchQuery = $searchInput.value.trim();
    $searchClear.style.display = searchQuery ? "block" : "none";
    applyFilters();
  });

  $searchClear.addEventListener("click", () => {
    $searchInput.value = "";
    searchQuery = "";
    $searchClear.style.display = "none";
    $searchInput.focus();
    applyFilters();
  });
}

// ─── Footer ───────────────────────────────────────────────────
function renderFooter() {
  $footer.innerHTML = `
    <span>Produced by Thirty Petals Pty Ltd</span>
    <span class="footer-sep">·</span>
    <span>Confidential</span>
  `;
}

// ─── Init ──────────────────────────────────────────────────────
function init() {
  renderHeader();
  renderKpis();
  renderFilterTabs();
  renderJobGrid();
  setupSearch();
  renderFooter();

  $backBtn.addEventListener("click", showHomeView);
}

init();
