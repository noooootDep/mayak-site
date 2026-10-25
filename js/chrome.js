(function () {
  const PHONE_CITY = "+7 (3412) 95-88-11";
  const PHONE_CITY_TEL = "+73412958811";
  const PHONE_MOBILE = "+7 (912) 466-92-77";
  const PHONE_MOBILE_TEL = "+79124669277";
  const EMAIL = "mayak.izh@yandex.ru";
  // Адрес веб-приложения из tools/form-mail.gs; если пустой, форма уходит через formsubmit.
  const FORM_URL = "https://script.google.com/macros/s/AKfycbxqSXB6JlHIFyoesfsiQSLCgiEoxUZ9gumQcbf-LS9DP73s6XKTNPWQCVq_5OS9Cm5u/exec";
  const MAX_URL = "https://max.ru/u/f9LHodD0cOIQkxE0fzW2yE5lhqCztsEGjdQbT1GbRTjuusT78kCeIXJbZh8";
  const LICENSE = "Л043-00109-18/02671242";
  const LICENSE_DATE = "15.07.2025";
  const LNK = "ЛНК-056А0801";
  const LNK_DATE = "23.01.2026";
  const LICENSE_FILE = encodeURI("Выписка из реестра лицензий РТН 18.06.2026г.pdf");
  const LNK_FILE = encodeURI("Свидетельство об аттестации ЛНК ООО Маяк А0801 НК-КА-17 2026.pdf");

  const SERVICES = [
    { href: "./services-epb.html", title: "Экспертиза промышленной безопасности" },
    { href: "./services-lab.html", title: "Лабораторные исследования и контроль" },
    { href: "./services-buildings.html", title: "Техническое обследование зданий и сооружений" },
    { href: "./services-diagnostics.html", title: "Техническое диагностирование оборудования" },
    { href: "./services-vessels.html", title: "Техническое освидетельствование" },
    { href: "./services-passports.html", title: "Разработка и восстановление паспортов" }
  ];

  function pageName() {
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    return file === "" ? "index.html" : file;
  }

  function activeClass(href) {
    const current = pageName();
    const target = href.replace("./", "").toLowerCase();
    if (current === target) return " is-active text-[#141414]";
    if (target.startsWith("services-") && current.startsWith("services-") && href.includes("services-epb") === false) {
      return current === target ? " is-active text-[#141414]" : "";
    }
    return "";
  }

  function logoBlock() {
    return `
      <a class="flex items-center gap-3 group shrink-0" href="./index.html" aria-label="ООО МАЯК — на главную">
        <img src="./assets/images/logo-shield.png" alt="" class="logo-brand"/>
        <span class="brand-name">МАЯК</span>
      </a>`;
  }

  function topBar() {
    return `
      <div class="topbar fixed top-0 left-0 w-full z-50 bg-[#0e1a15] text-[#c5d5cc] text-[13px] font-mono-tech py-2 px-4 sm:px-8 lg:px-14 border-b border-white/10">
        <div class="topbar-row max-w-[1440px] mx-auto">
          <div class="topbar-left">
            <span class="text-white font-medium shrink-0">ООО «Маяк»</span>
            <span class="topbar-extra text-[#5a534c]">|</span>
            <a href="./${LICENSE_FILE}" target="_blank" class="topbar-extra hover:text-white underline-offset-2 hover:underline" title="Выписка из реестра лицензий">Лицензия № ${LICENSE} от ${LICENSE_DATE}</a>
            <span class="topbar-wide text-[#5a534c]">|</span>
            <a href="./${LNK_FILE}" target="_blank" class="topbar-wide hover:text-white underline-offset-2 hover:underline" title="Свидетельство об аттестации ЛНК">Свидетельство ЛНК № ${LNK} от ${LNK_DATE}</a>
            <span class="topbar-wide text-[#5a534c]">|</span>
            <a href="https://www.gosnadzor.ru/" target="_blank" rel="noopener" class="topbar-wide hover:text-white underline-offset-2 hover:underline">Ростехнадзор</a>
          </div>
          <div class="topbar-right">
            <span class="topbar-hours">Пн–Пт 7:00–16:00 (МСК)</span>
            <a href="mailto:${EMAIL}" class="topbar-mail hover:text-white">${EMAIL}</a>
            <a href="${MAX_URL}" target="_blank" rel="noopener" class="inline-flex items-center shrink-0" title="Написать в MAX, ${PHONE_MOBILE}"><img src="./assets/images/max-icon.png" alt="MAX" class="max-icon"/></a>
          </div>
        </div>
      </div>`;
  }

  function header() {
    const current = pageName();
    const serviceOpen = current.startsWith("services-");
    return `
      <header id="site-header" class="fixed top-[38px] left-0 w-full z-50 border-b">
        <div class="h-[92px] max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 flex items-center justify-between gap-4">
          ${logoBlock()}
          <nav class="hidden min-[1100px]:flex items-center gap-1" aria-label="Навигация">
            <a class="nav-link whitespace-nowrap px-3 py-2 text-sm hover:text-[#1f6b45]${current === "about.html" ? " is-active" : ""}" href="./about.html">О нас</a>
            <div class="relative group py-2">
              <a class="nav-link whitespace-nowrap px-3 py-2 text-sm hover:text-[#1f6b45] flex items-center gap-1${serviceOpen ? " is-active" : ""}" href="./services-epb.html">
                Услуги
                <span class="material-symbols-outlined text-xs">expand_more</span>
              </a>
              <div class="dropdown absolute top-full left-0 w-[360px] bg-white border border-[#ddd4c6] shadow-2xl p-2 z-50 flex flex-col">
                ${SERVICES.map((s) => `
                  <a href="${s.href}" class="px-3 py-2.5 text-[12px] font-body text-[#141414] hover:bg-[#1f6b45]/10 border-b border-[#e4eee6] last:border-0">
                    <span>${s.title}</span>
                  </a>`).join("")}
              </div>
            </div>
            <a class="nav-link whitespace-nowrap px-3 py-2 text-sm hover:text-[#1f6b45]${current === "powers.html" ? " is-active" : ""}" href="./powers.html">Полномочия</a>
            <a class="nav-link whitespace-nowrap px-3 py-2 text-sm hover:text-[#1f6b45]${current === "question.html" ? " is-active" : ""}" href="./question.html">Технический вопрос</a>
            <a class="nav-link whitespace-nowrap px-3 py-2 text-sm hover:text-[#1f6b45]${current === "facts.html" ? " is-active" : ""}" href="./facts.html">Интересные факты</a>
            <a class="nav-link whitespace-nowrap px-3 py-2 text-sm hover:text-[#1f6b45]${current === "contacts.html" ? " is-active" : ""}" href="./contacts.html">Контакты</a>
          </nav>
          <div class="flex items-center gap-3 sm:gap-5 shrink-0">
            <div class="hidden md:flex flex-col items-end text-right">
              <a class="font-mono-tech text-sm tracking-wide font-bold hover:text-[#1f6b45]" href="tel:${PHONE_CITY_TEL}">${PHONE_CITY}</a>
              <a class="font-mono-tech text-sm text-[#5c6b63] hover:text-[#1f6b45]" href="tel:${PHONE_MOBILE_TEL}">${PHONE_MOBILE}</a>
            </div>
            <a class="header-ask hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all" href="./question.html">
              Задать вопрос
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </a>
            <button id="mobile-menu-btn" class="min-[1100px]:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-[#12201a]/20 rounded-full" aria-label="Открыть меню" aria-expanded="false">
              <span class="bar-1 w-5 h-0.5 bg-[#12201a] transition-transform"></span>
              <span class="bar-2 w-5 h-0.5 bg-[#12201a] transition-opacity"></span>
              <span class="bar-3 w-5 h-0.5 bg-[#12201a] transition-transform"></span>
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-drawer" class="fixed inset-0 top-[130px] w-full overflow-y-auto border-t border-white/10 hidden flex-col min-[1100px]:hidden z-50 bg-[#0e1a15] text-[#f4f1ea]">
        <nav class="px-5 py-6 flex flex-col gap-2 max-w-lg mx-auto text-sm">
          <a class="py-3 px-4 border border-white/10 rounded-2xl" href="./about.html">О нас</a>
          ${SERVICES.map((s) => `<a class="py-3 px-4 border border-white/10 rounded-2xl" href="${s.href}">${s.title}</a>`).join("")}
          <a class="py-3 px-4 border border-white/10 rounded-2xl" href="./powers.html">Полномочия</a>
          <a class="py-3 px-4 border border-white/10 rounded-2xl" href="./question.html">Технический вопрос</a>
          <a class="py-3 px-4 border border-white/10 rounded-2xl" href="./facts.html">Интересные факты</a>
          <a class="py-3 px-4 border border-white/10 rounded-2xl" href="./contacts.html">Контакты</a>
          <a class="py-3 px-4 bg-[#f4f1ea] text-[#0e1a15] text-center rounded-full font-semibold inline-flex items-center justify-center" href="${MAX_URL}" target="_blank" rel="noopener" title="Написать в MAX, ${PHONE_MOBILE}"><img src="./assets/images/max-icon.png" alt="MAX" class="max-icon"/></a>
        </nav>
      </div>`;
  }

  function footer() {
    return `
      <footer class="w-full bg-[#0e1a15] text-[#c9d7cf] border-t border-white/10">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14 py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div class="flex flex-col gap-4">
              <a class="flex items-center gap-3" href="./index.html">
                <img src="./assets/images/logo-shield.png" alt="" class="h-14 w-auto bg-[#f7f4ee] rounded-lg p-1"/>
                <span class="text-white font-extrabold text-2xl tracking-tight">МАЯК</span>
              </a>
              <p class="text-sm leading-relaxed text-[#c9d7cf]">Испытания, экспертиза, технический контроль.</p>
              <p class="font-mono-tech text-[13px] text-[#8fceb0]">Лицензия ${LICENSE} · ЛНК 056А0801</p>
            </div>
            <div class="flex flex-col gap-2.5 text-sm">
              <span class="font-mono-tech text-[13px] uppercase tracking-[0.16em] text-white mb-1">Услуги</span>
              ${SERVICES.map((s) => `<a class="hover:text-white" href="${s.href}">${s.title}</a>`).join("")}
            </div>
            <div class="flex flex-col gap-2.5 text-sm">
              <span class="font-mono-tech text-[13px] uppercase tracking-[0.16em] text-white mb-1">Компания</span>
              <a class="hover:text-white" href="./about.html">О нас</a>
              <a class="hover:text-white" href="./powers.html">Полномочия и подробная схема взаимодействия</a>
              <a class="hover:text-white" href="./question.html">Технический вопрос</a>
              <a class="hover:text-white" href="./facts.html">Интересные факты</a>
              <a class="hover:text-white" href="./contacts.html">Контакты и реквизиты</a>
              <a class="hover:text-white" href="https://www.gosnadzor.ru/" target="_blank" rel="noopener">Ростехнадзор</a>
            </div>
            <div class="flex flex-col gap-2.5 text-sm">
              <span class="font-mono-tech text-[13px] uppercase tracking-[0.16em] text-white mb-1">Связь</span>
              <p>426063, г. Ижевск, ул. Ключевой посёлок, 83а, оф. 1001</p>
              <p>Пн–Пт 7:00–16:00 (МСК)</p>
              <a class="text-white font-mono-tech font-bold" href="tel:${PHONE_CITY_TEL}">${PHONE_CITY}</a>
              <a class="text-white font-mono-tech" href="tel:${PHONE_MOBILE_TEL}">${PHONE_MOBILE}</a>
              <a class="hover:text-white" href="mailto:${EMAIL}">${EMAIL}</a>
              <a class="inline-flex w-fit" href="${MAX_URL}" target="_blank" rel="noopener" title="Написать в MAX, ${PHONE_MOBILE}"><img src="./assets/images/max-icon.png" alt="MAX" class="max-icon"/></a>
            </div>
          </div>
          <div class="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 font-mono-tech text-[13px] uppercase tracking-[0.14em] text-[#9c9488]">
            <span>© ООО «Маяк»</span>
            <a class="hover:text-white normal-case tracking-normal" href="./privacy.html">Политика обработки персональных данных</a>
          </div>
        </div>
      </footer>
      <aside id="quick-dock" class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <button id="back-to-top" class="w-10 h-10 rounded-full bg-white border border-[#ddd4c6] opacity-0 pointer-events-none" aria-label="Наверх">↑</button>
        <div class="bg-white border border-[#ddd4c6] shadow-xl p-1.5 flex items-center gap-1.5 rounded-full">
          <a href="tel:${PHONE_CITY_TEL}" class="flex items-center gap-2 pl-3 pr-3 py-2 rounded-full bg-[#141414] text-white font-mono-tech text-xs font-bold">
            <span class="w-2 h-2 rounded-full bg-[#1f6b45] animate-pulse"></span>
            <span class="hidden sm:inline">${PHONE_CITY}</span>
          </a>
          <a href="${MAX_URL}" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-[#f7f4ee] border border-[#ddd4c6] flex items-center justify-center" title="Написать в MAX, ${PHONE_MOBILE}"><img src="./assets/images/max-icon.png" alt="MAX" class="max-icon"/></a>
        </div>
      </aside>
      <div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#141414] text-white px-5 py-3 font-mono-tech text-xs opacity-0 pointer-events-none translate-y-4 transition-all">Заявка принята</div>
      <div id="success-modal" class="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 opacity-0 pointer-events-none transition-opacity">
        <div class="bg-white max-w-md w-full p-8 text-center border border-[#ddd4c6]">
          <div class="w-14 h-14 mx-auto mb-4 rounded-full border border-[#1f6b45] text-[#1f6b45] flex items-center justify-center text-2xl">✓</div>
          <h3 id="modal-title" class="font-display text-2xl mb-2">Вопрос принят</h3>
          <p id="modal-text" class="text-sm text-[#6b6560] mb-6">Вопрос отправлен на почту компании. Ответим в рабочее время, Пн–Пт 7:00–16:00 (МСК).</p>
          <a id="modal-mail" style="display:none" class="w-full py-3 mb-2 bg-[#1f6b45] text-white font-mono-tech text-xs uppercase tracking-widest hover:bg-[#134830]" href="mailto:${EMAIL}">Отправить письмом</a>
          <button id="modal-close-btn" class="w-full py-3 bg-[#141414] text-white font-mono-tech text-xs uppercase tracking-widest">Закрыть</button>
        </div>
      </div>`;
  }

  function curtain() {
    return `
      <div id="page-curtain" class="fixed inset-0 z-[9999] pointer-events-none opacity-0 bg-[#f7f4ee] flex flex-col items-center justify-center">
        <img src="./assets/images/logo-shield.png" alt="" class="h-24 w-auto bg-[#f7f4ee] rounded-2xl p-2 object-contain mb-3"/>
        <span class="text-3xl font-extrabold tracking-tight text-white">МАЯК</span>
        <div class="w-40 h-[2px] bg-[#d5e0d6] overflow-hidden mt-3"><div class="w-16 h-full bg-[#1f6b45] animate-[shimmer_1.2s_infinite]"></div></div>
      </div>
      <div id="scroll-progress" class="fixed top-0 left-0 h-[3px] z-[70]" style="width:0%"></div>`;
  }

  window.Mayak = {
    showToast(msg) {
      const toast = document.getElementById("toast");
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add("is-on");
      setTimeout(() => toast.classList.remove("is-on"), 2800);
    },
    openModal() {
      const m = document.getElementById("success-modal");
      if (m) m.classList.add("is-open");
    },
    closeModal() {
      const m = document.getElementById("success-modal");
      if (m) m.classList.remove("is-open");
    }
  };

  function mount() {
    const top = document.getElementById("site-top");
    const bottom = document.getElementById("site-bottom");
    if (top) top.innerHTML = curtain() + topBar() + header();
    if (bottom) bottom.innerHTML = footer();
  }

  function bind() {
    const btn = document.getElementById("mobile-menu-btn");
    const drawer = document.getElementById("mobile-drawer");
    if (btn && drawer) {
      btn.addEventListener("click", () => {
        const open = !drawer.classList.contains("hidden");
        drawer.classList.toggle("hidden", open);
        btn.setAttribute("aria-expanded", String(!open));
      });
    }

    const progress = document.getElementById("scroll-progress");
    const back = document.getElementById("back-to-top");
    const dock = document.getElementById("quick-dock");
    function placeDock() {
      if (!dock) return;
      const img = document.querySelector(".stage-hero-img img");
      if (!img) {
        dock.classList.remove("is-parked");
        return;
      }
      const r = img.getBoundingClientRect();
      const parked = r.bottom > window.innerHeight - 120 && r.right > window.innerWidth - 320;
      dock.classList.toggle("is-parked", parked);
    }
    placeDock();
    window.addEventListener("resize", placeDock);
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (progress) progress.style.width = (h ? (y / h) * 100 : 0) + "%";
      if (back) {
        back.classList.toggle("opacity-0", y < 380);
        back.classList.toggle("pointer-events-none", y < 380);
      }
      placeDock();
    });
    if (back) back.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    const close = document.getElementById("modal-close-btn");
    const modal = document.getElementById("success-modal");
    if (close) close.addEventListener("click", Mayak.closeModal);
    if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) Mayak.closeModal(); });

    document.querySelectorAll("form.js-question-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const button = form.querySelector("button[type='submit']");
        const title = document.getElementById("modal-title");
        const text = document.getElementById("modal-text");
        const payload = {
          _subject: "Технический вопрос с сайта ООО «Маяк»",
          _template: "table",
          _captcha: "false"
        };
        new FormData(form).forEach((value, key) => {
          const line = String(value).trim();
          if (line) payload[key === "q" ? "message" : key] = line;
        });
        const mail = document.getElementById("modal-mail");
        const labels = { name: "Имя", company: "Организация", phone: "Телефон", email: "Почта", type: "Тип работ", message: "Вопрос" };
        const letter = Object.keys(labels).filter((key) => payload[key]).map((key) => labels[key] + ": " + payload[key]).join("\n");
        if (mail) {
          mail.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(payload._subject) + "&body=" + encodeURIComponent(letter);
          mail.style.display = "none";
        }
        function failed() {
          if (title) title.textContent = "Не отправилось";
          if (text) text.textContent = "Форма сейчас не смогла доставить вопрос. Нажмите «Отправить письмом» — откроется почта с уже заполненным текстом, — или позвоните " + PHONE_CITY + ".";
          if (mail) mail.style.display = "block";
        }
        const label = button ? button.textContent : "";
        if (button) {
          button.disabled = true;
          button.textContent = "Отправляем…";
        }
        const controller = window.AbortController ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), 30000) : 0;
        const request = FORM_URL
          ? fetch(FORM_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload),
            signal: controller ? controller.signal : undefined
          })
          : fetch("https://formsubmit.co/ajax/" + EMAIL, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
            signal: controller ? controller.signal : undefined
          });
        request.then((res) => res.json().then((body) => ({ ok: res.ok && !(body && body.ok === false), body }))).then(({ ok, body }) => {
          const message = (body && (body.message || body.success)) || "";
          if (String(message).toLowerCase().indexOf("activation") !== -1 || String(message).toLowerCase().indexOf("activate") !== -1) {
            if (title) title.textContent = "Нужно одно подтверждение";
            if (text) text.textContent = "На " + EMAIL + " ушло письмо со ссылкой. Его нужно открыть один раз, после этого вопросы с сайта начнут приходить сами.";
          } else if (!ok || String(body && body.success) === "false") {
            failed();
          } else {
            if (title) title.textContent = "Вопрос принят";
            if (text) text.textContent = "Вопрос отправлен на почту компании. Ответим в рабочее время, Пн–Пт 7:00–16:00 (МСК).";
            form.reset();
          }
          Mayak.openModal();
        }).catch(() => {
          failed();
          Mayak.openModal();
        }).finally(() => {
          clearTimeout(timer);
          if (button) {
            button.disabled = false;
            button.textContent = label;
          }
        });
      });
    });

    document.querySelectorAll("[data-copy]").forEach((el) => {
      el.addEventListener("click", () => {
        const val = el.getAttribute("data-copy");
        const name = el.getAttribute("data-name") || "Значение";
        if (navigator.clipboard && val) {
          navigator.clipboard.writeText(val).then(() => Mayak.showToast(`${name} скопирован`));
        }
      });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-in");
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => io.observe(el));

    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http") || link.target === "_blank") return;
      link.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        document.documentElement.classList.add("is-leaving");
        setTimeout(() => { location.href = href; }, 220);
        setTimeout(() => { document.documentElement.classList.remove("is-leaving"); }, 2000);
      });
    });
  }

  window.addEventListener("pageshow", () => {
    document.documentElement.classList.remove("is-leaving");
    if (window.Mayak) Mayak.closeModal();
  });

  document.addEventListener("DOMContentLoaded", () => {
    mount();
    bind();
  });
})();
