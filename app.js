// Ndanga District Hospital — site JavaScript
// Plain vanilla JS. No data collection, no local storage of personal data.

document.addEventListener("DOMContentLoaded", function () {
  setupNav();
  setYear();
  setupNoticeFilters();
  setupPlaceholderLinks();
});

// ---- Accessible mobile nav toggle ----
function setupNav() {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// ---- Footer year ----
function setYear() {
  var el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ---- Notice category filtering (notices.html) ----
function setupNoticeFilters() {
  var buttons = document.querySelectorAll(".filter-btn");
  var notices = document.querySelectorAll("#noticeList .notice");
  var emptyState = document.getElementById("emptyState");
  if (!buttons.length || !notices.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");

      var filter = btn.getAttribute("data-filter");
      var visibleCount = 0;

      notices.forEach(function (notice) {
        var match = filter === "all" || notice.getAttribute("data-category") === filter;
        notice.hidden = !match;
        if (match) visibleCount++;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });
}

// ---- Placeholder action toast ----
function setupPlaceholderLinks() {
  var links = document.querySelectorAll('[data-placeholder="true"]');
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showToast("This information will be updated after hospital verification.");
    });
  });
}

function showToast(message) {
  var toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}
