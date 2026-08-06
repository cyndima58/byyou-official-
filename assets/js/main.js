(function () {
  "use strict";

  var C = window.SITE || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. 把 site-config.js 的資料填進頁面 ---------- */
  function fill() {
    // 連結類：data-link="line|email|facebook|instagram|youtube|phone"
    var map = {
      line: C.lineUrl,
      email: C.email ? "mailto:" + C.email : "",
      facebook: C.facebook,
      instagram: C.instagram,
      youtube: C.youtube,
      phone: C.phone ? "tel:" + C.phone.replace(/[^0-9+]/g, "") : ""
    };
    document.querySelectorAll("[data-link]").forEach(function (el) {
      var v = map[el.getAttribute("data-link")];
      if (v) {
        el.setAttribute("href", v);
        if (/^https?:/.test(v)) {
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener");
        }
      } else {
        // 沒有設定的項目直接隱藏，避免出現壞掉的連結
        var host = el.closest("[data-link-row]");
        (host || el).style.display = "none";
      }
    });

    // 文字類：data-text="lineId|email|company|taxId|address|phone|serviceArea"
    document.querySelectorAll("[data-text]").forEach(function (el) {
      var v = C[el.getAttribute("data-text")];
      if (v) {
        el.textContent = v;
      } else {
        var host = el.closest("[data-link-row]");
        (host || el).style.display = "none";
      }
    });

    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- 2. 行動版選單 ---------- */
  function menu() {
    var btn = document.querySelector(".hd__burger");
    var box = document.querySelector(".menu");
    if (!btn || !box) return;

    function set(open) {
      box.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    }
    btn.addEventListener("click", function () {
      set(!box.classList.contains("is-open"));
    });
    box.addEventListener("click", function (e) {
      if (e.target.tagName === "A") set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") set(false);
    });
  }

  /* ---------- 3. 進場動畫 ＋ 解鎖動畫 ---------- */
  function reveal() {
    var items = document.querySelectorAll("[data-reveal], .gate");
    if (!items.length) return;

    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-in");
        if (el.classList.contains("gate")) el.classList.add("is-open");
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var delay = el.classList.contains("gate")
          ? (parseInt(el.getAttribute("data-i"), 10) || 0) * 110
          : 0;
        setTimeout(function () {
          el.classList.add("is-in");
          if (el.classList.contains("gate")) el.classList.add("is-open");
        }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 4. 花絮燈箱 ---------- */
  function lightbox() {
    var btns = Array.prototype.slice.call(document.querySelectorAll(".shots button"));
    if (!btns.length) return;

    var box = document.createElement("div");
    box.className = "lb";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "照片檢視");
    box.innerHTML =
      '<img alt="">' +
      '<p class="lb__cap"></p>' +
      '<button class="lb__x" aria-label="關閉">✕</button>' +
      '<button class="lb__p" aria-label="上一張">‹</button>' +
      '<button class="lb__n" aria-label="下一張">›</button>';
    document.body.appendChild(box);

    var img = box.querySelector("img");
    var cap = box.querySelector(".lb__cap");
    var at = 0;
    var last = null;

    function show(i) {
      at = (i + btns.length) % btns.length;
      var b = btns[at];
      img.src = b.getAttribute("data-full");
      img.alt = b.getAttribute("data-cap") || "";
      cap.textContent = (at + 1) + " / " + btns.length + "　" + (b.getAttribute("data-cap") || "");
    }
    function open(i) {
      last = document.activeElement;
      show(i);
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
      box.querySelector(".lb__x").focus();
    }
    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      if (last) last.focus();
    }

    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { open(i); });
    });
    box.querySelector(".lb__x").addEventListener("click", close);
    box.querySelector(".lb__p").addEventListener("click", function () { show(at - 1); });
    box.querySelector(".lb__n").addEventListener("click", function () { show(at + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(at - 1);
      if (e.key === "ArrowRight") show(at + 1);
    });
  }

  function init() { fill(); menu(); reveal(); lightbox(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
