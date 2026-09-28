// APPLICATION CONTROLLER FOR OOO MAYAK

const FINDER_OBJECTS = {
  vessels: {
    title: "Сосуды под давлением, автоклавы и котлы",
    norm: "ФНП ОРПД (Приказ Ростехнадзора № 536)",
    desc: "Комплексное техническое освидетельствование, гидравлические испытания, ультразвуковая толщинометрия и расчет остаточного ресурса обечаек и днищ.",
    methods: ["УЗК / УЗТ", "ВИК", "Цветная дефектоскопия", "Расчет на прочность"],
    days: "от 4 рабочих дней"
  },
  pipes: {
    title: "Технологические и промысловые трубопроводы",
    norm: "ФНП (Приказ Ростехнадзора № 500)",
    desc: "Контроль кольцевых сварных швов, выявление зон эрозионного и коррозионного износа, ревизия арматуры и узлов сопряжения.",
    methods: ["Радиография (РК)", "Ультразвуковой контроль", "ВИК", "Стилоскопирование"],
    days: "от 3 рабочих дней"
  },
  tanks: {
    title: "Вертикальные и горизонтальные резервуары (РВС)",
    norm: "ГОСТ 31385 / ФНП ОПО",
    desc: "Полное и частичное обследование резервуаров нефти и нефтепродуктов: контроль геометрии стенки, дефектоскопия швов днища и кровли, нивелировка окрайки.",
    methods: ["Акустическая эмиссия", "УЗТ днища", "Магнитопорошковый метод", "Геодезический замер"],
    days: "от 5 рабочих дней"
  },
  cranes: {
    title: "Мостовые, козловые краны и подъемные сооружения",
    norm: "ФНП ПС (Приказ Ростехнадзора № 461)",
    desc: "Экспертиза металлических конструкций, контроль сварных швов балок, нивелировка подкрановых путей, статико-динамические испытания.",
    methods: ["ВИК металлоконструкций", "УЗК стыковых швов", "Нивелировка путей", "Грузовые испытания"],
    days: "от 2 рабочих дней"
  },
  buildings: {
    title: "Производственные здания, цеха и эстакады ОПО",
    norm: "СП 13-102-2003 / ГОСТ 31937",
    desc: "Инструментальное обследование несущих железобетонных и стальных конструкций, фундаментов, ферм, узлов сопряжения на опасных производствах.",
    methods: ["Ультразвук бетона", "Определение прочности", "Тепловизионная съемка", "Поверочный расчет"],
    days: "от 7 рабочих дней"
  },
  gas: {
    title: "Сети газораспределения, газопроводы и ГРП / ГРУ",
    norm: "ФНП СГД (Приказ Ростехнадзора № 531)",
    desc: "Диагностирование стальных и полиэтиленовых газопроводов высокого, среднего и низкого давления, проверка герметичности и запорной арматуры.",
    methods: ["Приборный поиск утечек", "УЗК сварных стыков", "Контроль изоляции", "ВИК регуляторов"],
    days: "от 3 рабочих дней"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initQuickFinder();
  renderServices('all');
  initServiceTabs();
  renderIndustries('all');
  initIndustryFilters();
  initCalculator();
  initModalAndForms();
});

/* NAVBAR SCROLL & MOBILE MENU */
function initNavbar() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '84px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = '#ffffff';
        navMenu.style.padding = '24px';
        navMenu.style.borderBottom = '1px solid var(--border-card)';
        navMenu.style.boxShadow = 'var(--shadow-md)';
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.style.display = 'none';
        }
      });
    });
  }
}

/* QUICK HERO FINDER */
function initQuickFinder() {
  const tabs = document.querySelectorAll('.finder-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const objKey = tab.getAttribute('data-finder');
      updateFinderContent(objKey);
    });
  });

  updateFinderContent('vessels');
}

function updateFinderContent(key) {
  const data = FINDER_OBJECTS[key] || FINDER_OBJECTS.vessels;
  const container = document.getElementById('finderContent');
  if (!container) return;

  container.innerHTML = `
    <div class="finder-info-col">
      <div class="finder-norm-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Нормативная база: ${data.norm}
      </div>
      <h3 class="finder-obj-title">${data.title}</h3>
      <p class="finder-desc">${data.desc}</p>
      <div class="finder-methods-wrap">
        <div class="finder-methods-label">Методы контроля лаборатории ЛНК:</div>
        <ul class="finder-list">
          ${data.methods.map(m => `<li><span class="dot"></span>${m}</li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="finder-action-col">
      <div class="finder-time-label">Срок проведения:</div>
      <div class="finder-time-val">${data.days}</div>
      <a href="#calculator" class="btn btn-sm btn-primary" onclick="setCalculatorObject('${key}')">
        Рассчитать в калькуляторе &rarr;
      </a>
    </div>
  `;
}

function setCalculatorObject(objKey) {
  const cards = document.querySelectorAll('.calc-opt-card');
  cards.forEach(c => {
    if (c.getAttribute('data-obj') === objKey) {
      c.click();
    }
  });
}

/* SERVICES RENDERING & FILTERING */
function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-cat');
      renderServices(category);
    });
  });
}

function renderServices(category) {
  const container = document.getElementById('servicesContainer');
  if (!container) return;

  const filtered = category === 'all' 
    ? MAYAK_DATA.services 
    : MAYAK_DATA.services.filter(s => s.category === category);

  container.innerHTML = filtered.map(srv => `
    <div class="service-card">
      <span class="service-num">${srv.num}</span>
      <div class="service-badge">
        ${srv.badge}
      </div>
      <h3 class="service-title">${srv.title}</h3>
      <p class="service-text">${srv.shortDesc}</p>

      <div class="service-spec-table">
        <div class="spec-row">
          <span class="spec-key">Объекты:</span>
          <span class="spec-val">${srv.specs.obj}</span>
        </div>
        <div class="spec-row">
          <span class="spec-key">Норматив:</span>
          <span class="spec-val">${srv.specs.norm}</span>
        </div>
        <div class="spec-row">
          <span class="spec-key">Документ:</span>
          <span class="spec-val">${srv.specs.doc}</span>
        </div>
      </div>

      <ul class="service-bullets">
        ${srv.points.map(p => `<li>${p}</li>`).join('')}
      </ul>

      <div class="service-card-footer">
        <div class="service-timing">Срок: <span>${srv.timing}</span></div>
        <button class="btn btn-sm btn-outline" onclick="openOrderModalForService('${srv.title}')">
          Заказать услугу
        </button>
      </div>
    </div>
  `).join('');
}

/* INDUSTRIES RENDERING & FILTERING */
function initIndustryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.getAttribute('data-tag');
      renderIndustries(tag);
    });
  });
}

function renderIndustries(tag) {
  const container = document.getElementById('industriesContainer');
  if (!container) return;

  const filtered = tag === 'all' 
    ? MAYAK_DATA.industries 
    : MAYAK_DATA.industries.filter(ind => ind.tag === tag);

  container.innerHTML = filtered.map(ind => `
    <div class="industry-card">
      <div class="industry-icon">${ind.icon}</div>
      <h3 class="industry-title">${ind.title}</h3>
      <p class="industry-desc">${ind.desc}</p>
    </div>
  `).join('');
}

/* INTERACTIVE CALCULATOR LOGIC */
let calcState = {
  objectType: 'vessels',
  objectTitle: 'Сосуды под давлением и котлы',
  serviceType: 'epb',
  serviceTitle: 'Экспертиза промбезопасности (ЭПБ)',
  units: 3,
  isUrgent: false
};

const OBJECT_BASE_COST = {
  vessels: { name: 'Сосуды под давлением и котлы', cost: 45000, daysPerUnit: 1.5 },
  pipes: { name: 'Технологические трубопроводы', cost: 35000, daysPerUnit: 1.2 },
  tanks: { name: 'Резервуары РВС / емкости', cost: 65000, daysPerUnit: 2.0 },
  cranes: { name: 'Краны и подъемные сооружения', cost: 38000, daysPerUnit: 1.0 },
  buildings: { name: 'Здания и строительные сооружения', cost: 75000, daysPerUnit: 2.5 },
  gas: { name: 'Газопроводы и ГРП / ГРУ', cost: 42000, daysPerUnit: 1.4 }
};

const SERVICE_MULTIPLIERS = {
  epb: { name: 'Экспертиза промбезопасности (ЭПБ с реестром РТН)', mult: 1.25, baseDays: 4 },
  ndt: { name: 'Лаборатория неразрушающего контроля (НК)', mult: 0.85, baseDays: 2 },
  diag: { name: 'Техническое диагностирование и освидетельствование', mult: 1.0, baseDays: 3 },
  passports: { name: 'Восстановление / разработка паспортов', mult: 0.7, baseDays: 3 }
};

function initCalculator() {
  const optCards = document.querySelectorAll('.calc-opt-card');
  optCards.forEach(card => {
    card.addEventListener('click', () => {
      optCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      calcState.objectType = card.getAttribute('data-obj');
      calcState.objectTitle = OBJECT_BASE_COST[calcState.objectType].name;
      recalculateEstimate();
    });
  });

  const srvSelect = document.getElementById('calcServiceSelect');
  if (srvSelect) {
    srvSelect.addEventListener('change', (e) => {
      calcState.serviceType = e.target.value;
      calcState.serviceTitle = SERVICE_MULTIPLIERS[calcState.serviceType].name;
      recalculateEstimate();
    });
  }

  const rangeInput = document.getElementById('calcUnitsRange');
  const rangeDisplay = document.getElementById('calcUnitsDisplay');
  if (rangeInput && rangeDisplay) {
    rangeInput.addEventListener('input', (e) => {
      calcState.units = parseInt(e.target.value);
      rangeDisplay.textContent = calcState.units + ' ед.';
      recalculateEstimate();
    });
  }

  const urgentCheckbox = document.getElementById('calcUrgentCheckbox');
  if (urgentCheckbox) {
    urgentCheckbox.addEventListener('change', (e) => {
      calcState.isUrgent = e.target.checked;
      recalculateEstimate();
    });
  }

  recalculateEstimate();
}

function recalculateEstimate() {
  const objInfo = OBJECT_BASE_COST[calcState.objectType] || OBJECT_BASE_COST.vessels;
  const srvInfo = SERVICE_MULTIPLIERS[calcState.serviceType] || SERVICE_MULTIPLIERS.epb;

  let volumeDiscount = 1.0;
  if (calcState.units >= 15) volumeDiscount = 0.80;
  else if (calcState.units >= 8) volumeDiscount = 0.88;
  else if (calcState.units >= 4) volumeDiscount = 0.94;

  const rawCost = objInfo.cost * calcState.units * srvInfo.mult * volumeDiscount;
  const finalCost = calcState.isUrgent ? rawCost * 1.2 : rawCost;

  let totalDays = Math.ceil(srvInfo.baseDays + (calcState.units * objInfo.daysPerUnit * 0.45));
  if (calcState.isUrgent) {
    totalDays = Math.max(2, Math.ceil(totalDays * 0.5));
  }

  const costDisplay = document.getElementById('calcEstimatedCost');
  const daysDisplay = document.getElementById('calcEstimatedDays');
  const summaryObjDisplay = document.getElementById('calcSummaryObject');
  const summarySrvDisplay = document.getElementById('calcSummaryService');

  if (costDisplay) {
    costDisplay.textContent = 'от ' + formatCurrency(Math.round(finalCost / 1000) * 1000) + ' ₽';
  }
  if (daysDisplay) {
    daysDisplay.textContent = calcState.isUrgent ? `Срочно (${totalDays} дн.)` : `от ${totalDays} раб. дней`;
  }
  if (summaryObjDisplay) {
    summaryObjDisplay.textContent = `${objInfo.name} (${calcState.units} ед.)`;
  }
  if (summarySrvDisplay) {
    summarySrvDisplay.textContent = srvInfo.name;
  }
}

function formatCurrency(val) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/* REQUISITES COPY & TOAST */
function copyRequisites() {
  const reqText = `
ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «МАЯК» (ООО «МАЯК»)
ИНН: 1800035269, КПП: 180001001, ОГРН: 1251800006248
Адрес: 426063, г. Ижевск, ул. Ключевой посёлок, дом 83а, офис 1001
Тел.: +7 (912) 466-92-77, E-mail: mayak.izh@yandex.ru
Р/с: 40702810729850006795 в Филиал «Нижегородский» АО «Альфа-Банк»
БИК: 042202824, К/с: 30101810200000000824
  `.trim();

  navigator.clipboard.writeText(reqText).then(() => {
    showToast('Реквизиты ООО «Маяк» скопированы в буфер обмена');
  }).catch(() => {
    showToast('Реквизиты скопированы');
  });
}

function showToast(message) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* MODALS & FORMS */
function initModalAndForms() {
  const modalOverlay = document.getElementById('orderModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  
  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });
  }

  const contactForm = document.getElementById('contactLeadForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Отправка заявки...';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = 'Заявка принята!';
        showToast('Спасибо! Ваша заявка зарегистрирована. Эксперт ООО «Маяк» свяжется с вами в течение 15 минут.');
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 5000);
      }, 800);
    });
  }

  const modalForm = document.getElementById('modalOrderForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modalBtn = modalForm.querySelector('button[type="submit"]');
      modalBtn.disabled = true;
      modalBtn.textContent = 'Регистрация...';

      setTimeout(() => {
        if (modalOverlay) modalOverlay.classList.remove('open');
        showToast('Расчет зафиксирован! Эксперт свяжется с вами.');
        modalForm.reset();
        modalBtn.disabled = false;
        modalBtn.textContent = 'Отправить на согласование';
      }, 700);
    });
  }
}

function openOrderModalForService(serviceTitle) {
  const modalOverlay = document.getElementById('orderModal');
  const serviceField = document.getElementById('modalServiceInput');
  if (serviceField) {
    serviceField.value = serviceTitle || 'Комплексная экспертиза ОПО';
  }
  if (modalOverlay) {
    modalOverlay.classList.add('open');
  }
}

function openModalFromCalculator() {
  const modalOverlay = document.getElementById('orderModal');
  const serviceField = document.getElementById('modalServiceInput');
  const notesField = document.getElementById('modalNotesInput');
  
  if (serviceField) {
    serviceField.value = `${calcState.serviceTitle} (${calcState.objectTitle})`;
  }
  if (notesField) {
    const costText = document.getElementById('calcEstimatedCost').textContent;
    const daysText = document.getElementById('calcEstimatedDays').textContent;
    notesField.value = `Параметры: ${calcState.units} ед., нормативный срок: ${daysText}, ориентир бюджета: ${costText}. Срочность: ${calcState.isUrgent ? 'Да' : 'Стандарт'}.`;
  }
  if (modalOverlay) {
    modalOverlay.classList.add('open');
  }
}
