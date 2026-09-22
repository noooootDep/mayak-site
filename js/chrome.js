(function () {
  const PHONE_CITY = "+7 (3412) 95-88-11";
  const PHONE_CITY_TEL = "+73412958811";
  const PHONE_MOBILE = "+7 (912) 466-92-77";
  const PHONE_MOBILE_TEL = "+79124669277";
  const EMAIL = "mayak.izh@yandex.ru";
  const MAX_URL = "https://max.ru/";
  const LICENSE = "Л043-00109-18/02671242";
  const LICENSE_DATE = "15.07.2025";
  const LNK = "ЛНК-056А0801";
  const LNK_DATE = "23.01.2026";
  const LICENSE_FILE = encodeURI("Выписка из реестра лицензий РТН 18.06.2026г.pdf");
  const LNK_FILE = encodeURI("Свидетельство об аттестации ЛНК ООО Маяк А0801 НК-КА-17 2026.pdf");

  const SERVICES = [
    { href: "./services-epb.html", title: "Экспертиза промышленной безопасности", tag: "ФЗ-116" },
    { href: "./services-lab.html", title: "Лабораторные исследования и контроль", tag: "ЛНК" },
    { href: "./services-buildings.html", title: "Техническое обследование зданий и сооружений", tag: "ГОСТ 31937" },
    { href: "./services-diagnostics.html", title: "Техническое диагностирование оборудования", tag: "Ресурс" },
    { href: "./services-vessels.html", title: "Освидетельствование сосудов и трубопроводов", tag: "Давление" },
    { href: "./services-passports.html", title: "Разработка и восстановление паспортов", tag: "ТР ТС" }
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
        <img src="./assets/images/logo-mark.png" alt="" class="logo-mark"/>
        <span class="flex flex-col leading-tight">
          <span class="brand-word text-[15px] sm:text-[16px] font-bold uppercase text-white">МАЯК</span>
          <span class="text-[10px] text-[#b7cfc2]">Испытания · Экспертиза · Техконтроль</span>
        </span>
      </a>`;
  }

  function topBar() {
    return `
      <div class="fixed top-0 left-0 w-full z-50 bg-[#0e1a15] text-[#c5d5cc] text-[10px] sm:text-[11px] font-mono-tech py-1.5 px-4 sm:px-8 lg:px-14 border-b border-white/10">
        <div class="max-w-[1440px] mx-auto flex items-center justify-between gap-3">
          <div class="flex items-center gap-2 sm:gap-3 overflow-hidden whitespace-nowrap">
            <span class="text-white font-medium">ООО «Маяк»</span>
            <span class="text-[#5a534c]">|</span>
            <a href="./${LICENSE_FILE}" target="_blank" class="hover:text-white underline-offset-2 hover:underline" title="Выписка из реестра лицензий">Лицензия № ${LICENSE} от ${LICENSE_DATE}</a>
            <span class="text-[#5a534c] hidden md:inline">|</span>
            <a href="./${LNK_FILE}" target="_blank" class="hidden md:inline hover:text-white underline-offset-2 hover:underline" title="Свидетельство об аттестации ЛНК">Свидетельство ЛНК № ${LNK} от ${LNK_DATE}</a>
            <span class="text-[#5a534c] hidden lg:inline">|</span>
            <a href="https://www.gosnadzor.ru/" target="_blank" rel="noopener" class="hidden lg:inline hover:text-white underline-offset-2 hover:underline">Ростехнадзор</a>
          </div>
          <div class="flex items-center gap-3 sm:gap-5 shrink-0">
            <span class="hidden sm:inline">Пн–Пт 7:00–16:00 (МСК)</span>
            <a href="mailto:${EMAIL}" class="hover:text-white">${EMAIL}</a>
            <a href="${MAX_URL}" target="_blank" rel="noopener" class="px-1.5 py-0.5 rounded-sm bg-white/10 hover:bg-[#1f6b45] hover:text-white text-[#b7e0c6] font-bold uppercase" title="Написать в MAX по номеру ${PHONE_MOBILE}">MAX</a>
          </div>
        </div>
      </div>`;
  }

  function header() {
    const current = pageName();
    const serviceOpen = current.startsWith("services-");
    return `
      <header id="site-header" class="fixed top-[30px] left-0 w-full z-50 bg-[#0e1a15]/92 backdrop-blur-md border-b border-white/10">
        <div class="h-16 sm:h-20 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 flex items-center justify-between gap-4">
          ${logoBlock()}
          <nav class="hidden xl:flex items-center gap-1" aria-label="Навигация">
            <a class="nav-link whitespace-nowrap px-3 py-2 text-[13px] text-[#d7e4dc] hover:text-white${current === "about.html" ? " is-active text-white" : ""}" href="./about.html">О нас</a>
            <div class="relative group py-2">
              <a class="nav-link whitespace-nowrap px-3 py-2 text-[13px] text-[#d7e4dc] hover:text-white flex items-center gap-1${serviceOpen ? " is-active text-white" : ""}" href="./services-epb.html">
                Услуги
                <span class="material-symbols-outlined text-xs">expand_more</span>
              </a>
              <div class="dropdown absolute top-full left-0 w-[360px] bg-white border border-[#ddd4c6] shadow-2xl p-2 z-50 flex flex-col">
                ${SERVICES.map((s) => `
                  <a href="${s.href}" class="px-3 py-2.5 text-[12px] font-body text-[#141414] hover:bg-[#1f6b45]/10 border-b border-[#e4eee6] last:border-0 flex items-center justify-between gap-3">
                    <span>${s.title}</span>
                    <span class="font-mono-tech text-[9px] uppercase tracking-wider text-[#6b6560] shrink-0">${s.tag}</span>
                  </a>`).join("")}
              </div>
            </div>
            <a class="nav-link whitespace-nowrap px-3 py-2 text-[13px] text-[#d7e4dc] hover:text-white${current === "powers.html" ? " is-active text-white" : ""}" href="./powers.html">Полномочия</a>
            <a class="nav-link whitespace-nowrap px-3 py-2 text-[13px] text-[#d7e4dc] hover:text-white${current === "question.html" ? " is-active text-white" : ""}" href="./question.html">Технический вопрос</a>
            <a class="nav-link whitespace-nowrap px-3 py-2 text-[13px] text-[#d7e4dc] hover:text-white${current === "contacts.html" ? " is-active text-white" : ""}" href="./contacts.html">Контакты</a>
          </nav>
          <div class="flex items-center gap-3 sm:gap-5 shrink-0">
            <div class="hidden md:flex flex-col items-end text-right">
              <a class="font-mono-tech text-sm tracking-wide font-bold text-white hover:text-[#9ddec0]" href="tel:${PHONE_CITY_TEL}">${PHONE_CITY}</a>
              <a class="font-mono-tech text-[11px] text-[#9db5a8] hover:text-white" href="tel:${PHONE_MOBILE_TEL}">${PHONE_MOBILE}</a>
            </div>
            <a class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f4f1ea] hover:bg-white text-[#0e1a15] text-[13px] font-semibold transition-all" href="./pricing.html">
              Стоимость услуг
              <span class="material-symbols-outlined text-xs">north_east</span>
            </a>
            <button id="mobile-menu-btn" class="xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-white/20 rounded-full" aria-label="Открыть меню" aria-expanded="false">
              <span class="bar-1 w-5 h-0.5 bg-white transition-transform"></span>
              <span class="bar-2 w-5 h-0.5 bg-white transition-opacity"></span>
              <span class="bar-3 w-5 h-0.5 bg-white transition-transform"></span>
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-drawer" class="fixed inset-0 top-[110px] w-full overflow-y-auto border-t border-white/10 hidden flex-col xl:hidden z-50 bg-[#0e1a15] text-[#f4f1ea]">
        <nav class="px-5 py-6 flex flex-col gap-2 max-w-lg mx-auto text-sm">
          <a class="py-3 px-4 border border-white/10 rounded-2xl" href="./about.html">О нас</a>
          ${SERVICES.map((s) => `<a class="py-3 px-4 border border-white/10 rounded-2xl" href="${s.href}">${s.title}</a>`).join("")}
          <a class="py-3 px-4 border border-white/10 rounded-2xl" href="./powers.html">Полномочия</a>
          <a class="py-3 px-4 border border-white/10 rounded-2xl" href="./question.html">Технический вопрос</a>
          <a class="py-3 px-4 border border-white/10 rounded-2xl" href="./pricing.html">Стоимость услуг</a>
          <a class="py-3 px-4 border border-white/10 rounded-2xl" href="./contacts.html">Контакты</a>
          <a class="py-3 px-4 bg-[#f4f1ea] text-[#0e1a15] text-center rounded-full font-semibold" href="${MAX_URL}" target="_blank" rel="noopener">Написать в MAX</a>
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
                <img src="./assets/images/logo-mark.png" alt="" class="w-9 h-12 object-contain"/>
                <span class="brand-word text-white uppercase font-bold">МАЯК</span>
              </a>
              <p class="text-xs leading-relaxed text-[#9c9488]">Испытания, экспертиза промышленной безопасности и технический контроль ОПО. Ижевск, работа по всей России.</p>
              <p class="font-mono-tech text-[10px] text-[#8fceb0]">Лицензия ${LICENSE} · ЛНК ${LNK}</p>
            </div>
            <div class="flex flex-col gap-2.5 text-xs">
              <span class="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-white mb-1">Услуги</span>
              ${SERVICES.map((s) => `<a class="hover:text-white" href="${s.href}">${s.title}</a>`).join("")}
            </div>
            <div class="flex flex-col gap-2.5 text-xs">
              <span class="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-white mb-1">Компания</span>
              <a class="hover:text-white" href="./about.html">О нас</a>
              <a class="hover:text-white" href="./powers.html">Полномочия и схема</a>
              <a class="hover:text-white" href="./question.html">Технический вопрос</a>
              <a class="hover:text-white" href="./pricing.html">Стоимость услуг</a>
              <a class="hover:text-white" href="./contacts.html">Контакты и реквизиты</a>
              <a class="hover:text-white" href="https://www.gosnadzor.ru/" target="_blank" rel="noopener">Ростехнадзор</a>
            </div>
            <div class="flex flex-col gap-2.5 text-xs">
              <span class="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-white mb-1">Связь</span>
              <p>426063, г. Ижевск, ул. Ключевой посёлок, 83а, оф. 1001</p>
              <p>Пн–Пт 7:00–16:00 (МСК)</p>
              <a class="text-white font-mono-tech font-bold" href="tel:${PHONE_CITY_TEL}">${PHONE_CITY}</a>
              <a class="text-white font-mono-tech" href="tel:${PHONE_MOBILE_TEL}">${PHONE_MOBILE}</a>
              <a class="hover:text-white" href="mailto:${EMAIL}">${EMAIL}</a>
              <a class="inline-flex w-fit px-2 py-1 border border-white/20 hover:bg-[#1f6b45] hover:border-[#1f6b45] hover:text-white" href="${MAX_URL}" target="_blank" rel="noopener">MAX</a>
            </div>
          </div>
          <div class="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#7a7368]">
            <span>© 2026 ООО «Маяк». ФЗ № 116-ФЗ</span>
            <span>Директор Федорова С.В. · Исполнитель Катников К.В.</span>
          </div>
        </div>
      </footer>
      <aside class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <button id="back-to-top" class="w-10 h-10 rounded-full bg-white border border-[#ddd4c6] opacity-0 pointer-events-none" aria-label="Наверх">↑</button>
        <div class="bg-white border border-[#ddd4c6] shadow-xl p-1.5 flex items-center gap-1.5 rounded-full">
          <a href="tel:${PHONE_CITY_TEL}" class="flex items-center gap-2 pl-3 pr-3 py-2 rounded-full bg-[#141414] text-white font-mono-tech text-xs font-bold">
            <span class="w-2 h-2 rounded-full bg-[#1f6b45] animate-pulse"></span>
            <span class="hidden sm:inline">${PHONE_CITY}</span>
          </a>
          <a href="${MAX_URL}" target="_blank" rel="noopener" class="w-8 h-8 rounded-full bg-[#f7f4ee] border border-[#ddd4c6] flex items-center justify-center font-mono-tech text-[10px] font-bold" title="MAX">MAX</a>
        </div>
      </aside>
      <div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#141414] text-white px-5 py-3 font-mono-tech text-xs opacity-0 pointer-events-none translate-y-4 transition-all">Заявка принята</div>
      <div id="success-modal" class="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 opacity-0 pointer-events-none transition-opacity">
        <div class="bg-white max-w-md w-full p-8 text-center border border-[#ddd4c6]">
          <div class="w-14 h-14 mx-auto mb-4 rounded-full border border-[#1f6b45] text-[#1f6b45] flex items-center justify-center text-2xl">✓</div>
          <h3 class="font-display text-2xl mb-2">Вопрос принят</h3>
          <p class="text-sm text-[#6b6560] mb-6">Инженер свяжется с вами в рабочее время: Пн–Пт 7:00–16:00 (МСК).</p>
          <button id="modal-close-btn" class="w-full py-3 bg-[#141414] text-white font-mono-tech text-xs uppercase tracking-widest">Закрыть</button>
        </div>
      </div>`;
  }

  function curtain() {
    return `
      <div id="page-curtain" class="fixed inset-0 z-[9999] pointer-events-none opacity-0 bg-[#f7f4ee] flex flex-col items-center justify-center">
        <img src="./assets/images/logo-mark.png" alt="" class="w-14 h-20 object-contain mb-3"/>
        <span class="brand-word text-sm font-bold uppercase text-white">МАЯК</span>
        <div class="w-40 h-[2px] bg-[#d5e0d6] overflow-hidden mt-3"><div class="w-16 h-full bg-[#1f6b45] animate-[shimmer_1.2s_infinite]"></div></div>
      </div>
      <div id="scroll-progress" class="fixed top-0 left-0 h-[3px] z-[70]" style="width:0%"></div>`;
  }

  window.Mayak = {
    showToast(msg) {
      const toast = document.getElementById("toast");
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
      setTimeout(() => toast.classList.add("opacity-0", "pointer-events-none", "translate-y-4"), 2800);
    },
    openModal() {
      const m = document.getElementById("success-modal");
      if (m) {
        m.classList.remove("opacity-0", "pointer-events-none");
      }
    },
    closeModal() {
      const m = document.getElementById("success-modal");
      if (m) m.classList.add("opacity-0", "pointer-events-none");
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
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (progress) progress.style.width = (h ? (y / h) * 100 : 0) + "%";
      if (back) {
        back.classList.toggle("opacity-0", y < 380);
        back.classList.toggle("pointer-events-none", y < 380);
      }
    });
    if (back) back.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    const close = document.getElementById("modal-close-btn");
    const modal = document.getElementById("success-modal");
    if (close) close.addEventListener("click", Mayak.closeModal);
    if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) Mayak.closeModal(); });

    document.querySelectorAll("form.js-question-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.reset();
        Mayak.openModal();
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

    const curtainEl = document.getElementById("page-curtain");
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http") || link.target === "_blank") return;
      link.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.button !== 0) return;
        e.preventDefault();
        if (curtainEl) {
          curtainEl.classList.remove("opacity-0", "pointer-events-none");
          curtainEl.classList.add("opacity-100");
        }
        setTimeout(() => { location.href = href; }, 180);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    mount();
    bind();
  });
})();
