// Хранилище данных приложения
const appData = {
    currentUser: null,
    requests: [
        {
            id: 1,
            clientId: 1,
            title: "Разработка корпоративного сайта",
            description: "Необходимо разработать современный корпоративный сайт для компании с каталогом продукции и системой управления контентом.",
            service: "web",
            status: "in-progress",
            clientName: "Иван Петров",
            clientEmail: "ivan@example.com",
            clientPhone: "+7 (123) 456-78-90",
            date: "15.05.2023",
            estimate: {
                time: "3-4 нед.",
                cost: "150 000 ₽",
                tech: ["React", "Node.js", "MongoDB", "Stripe API"]
            }
        },
        {
            id: 2,
            clientId: 2,
            title: "Мобильное приложение для iOS",
            description: "Разработка мобильного приложения для платформы iOS с системой бронирования услуг.",
            service: "mobile",
            status: "new",
            clientName: "Алексей Смирнов",
            clientEmail: "alex@example.com",
            clientPhone: "+7 (987) 654-32-10",
            date: "20.05.2023",
            estimate: {
                time: "6-8 нед.",
                cost: "220 000 ₽",
                tech: ["React Native", "Firebase"]
            }
        }
    ],
    clients: [
        {
            id: 1,
            name: "Иван Иванов",
            email: "ivan@example.com",
            phone: "+7 (123) 456-78-90",
            password: "password123"
        }
    ],
    managers: [
        {
            id: 1,
            email: "manager@devsolutions.ru",
            password: "manager123"
        }
    ]
};

// Данные о командах
const teams = [
    {
        id: 1,
        name: "Frontend-команда",
        members: ["Алексей", "Мария"],
        skills: ["React", "Vue", "TypeScript", "HTML/CSS"],
        experience: "5+ лет",
        currentProject: null,
        status: "Свободна"
    },
    {
        id: 2,
        name: "Backend-команда",
        members: ["Иван", "Екатерина"],
        skills: ["Node.js", "Python", "Django", "REST API"],
        experience: "6+ лет",
        currentProject: null,
        status: "Занята"
    }
];

// Назначение команды на заявку
function assignTeamToRequest(requestId) {
    const teamIndex = requestId % teams.length;
    return teams[teamIndex];
}

// API система оценки трудоемкости
const estimateAPI = {
    getEstimate: async function(serviceType, description) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const serviceParams = {
                    web: {
                        baseDays: 20,
                        baseCost: 150000,
                        techStack: ['React', 'Node.js', 'MongoDB'],
                        complexityFactor: 0.2
                    },
                    mobile: {
                        baseDays: 35,
                        baseCost: 220000,
                        techStack: ['React Native', 'Firebase'],
                        complexityFactor: 0.25
                    }
                };
                const params = serviceParams[serviceType] || {
                    baseDays: 15,
                    baseCost: 120000,
                    techStack: ['Базовый стек'],
                    complexityFactor: 0.15
                };

                let complexityScore = Math.min(1, description.length / 500) * 0.5;

                const keywords = {
                    complex: ['интеграция', 'апи', 'база данных', 'аутентификация'],
                    simple: ['лендинг', 'визитка', 'каталог']
                };

                keywords.complex.forEach(word => {
                    if (description.toLowerCase().includes(word)) complexityScore += 0.2;
                });

                keywords.simple.forEach(word => {
                    if (description.toLowerCase().includes(word)) complexityScore -= 0.1;
                });

                complexityScore = Math.max(0.5, Math.min(1.5, complexityScore));
                const randomFactor = 0.9 + Math.random() * 0.2;
                const totalDays = Math.round(params.baseDays * complexityScore * randomFactor);
                const totalCost = Math.round(params.baseCost * complexityScore * randomFactor);
                const weeks = Math.ceil(totalDays / 7);
                const timeEstimate = weeks <= 2 ? `${weeks} нед.` : `${weeks - 1}-${weeks + 1} нед.`;

                resolve({
                    time: timeEstimate,
                    cost: `${totalCost.toLocaleString('ru-RU')} ₽`,
                    tech: params.techStack
                });
            }, 800);
        });
    }
};

// Вспомогательные функции
function formatDate(date = new Date()) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
}

function generateId() {
    return Math.max(0, ...appData.requests.map(r => r.id)) + 1;
}

// DOM элементы
const elements = {
    hamburger: document.getElementById('hamburger'),
    mobileMenu: document.getElementById('mobileMenu'),
    authModal: document.getElementById('authModal'),
    requestModal: document.getElementById('requestModal'),
    requestDetailsModal: document.getElementById('requestDetailsModal'),
    successModal: document.getElementById('successModal'),
    openRequestFormBtn: document.getElementById('openRequestForm'),
    addRequestFromProfile: document.getElementById('addRequestFromProfile'),
    authBtn: document.getElementById('authBtn'),
    mobileAuthBtn: document.getElementById('mobileAuthBtn'),
    closeModalBtns: document.querySelectorAll('.close-modal'),
    closeSuccessModalBtn: document.getElementById('closeSuccessModal'),
    estimateBtn: document.getElementById('estimateBtn'),
    estimateSection: document.getElementById('estimateSection'),
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    requestForm: document.getElementById('requestForm'),
    clientInfoForm: document.getElementById('clientInfoForm'),
    clientLogoutBtn: document.getElementById('clientLogoutBtn'),
    managerLogoutBtn: document.getElementById('managerLogoutBtn'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    clientRequests: document.getElementById('clientRequests'),
    requestsGrid: document.getElementById('requestsGrid'),
    requestDetailsContent: document.getElementById('requestDetailsContent'),
    successMessage: document.getElementById('successMessage'),
    switchToRegister: document.getElementById('switchToRegister'),
    switchToLogin: document.getElementById('switchToLogin'),
    mainContent: document.getElementById('mainContent'),
    clientProfile: document.getElementById('clientProfile'),
    managerDashboard: document.getElementById('managerDashboard')
};

// Инициализация приложения
function initApp() {
    setupEventListeners();
    renderClientRequests();
    renderManagerRequests();
    updateAuthButton();
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен'); // Смотри в консоли браузера
    setupEventListeners();
    renderClientRequests();
    renderManagerRequests();
    updateAuthButton();
});
console.log('loginForm:', elements.loginForm); // Должен показать форму
console.log('registerForm:', elements.registerForm);
console.log('requestForm:', elements.requestForm);
console.log('clientInfoForm:', elements.clientInfoForm);

// Настройка обработчиков событий
function setupEventListeners() {
    // Мобильное меню
    elements.hamburger.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            elements.mobileMenu.classList.remove('active');
        });
    });

    // Модальные окна
    elements.openRequestFormBtn.addEventListener('click', () => openModal(elements.requestModal));
    elements.addRequestFromProfile.addEventListener('click', () => openModal(elements.requestModal));

    elements.authBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(elements.authModal);
    });
    elements.mobileAuthBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(elements.authModal);
    });

    elements.closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    elements.closeSuccessModalBtn.addEventListener('click', () => {
        closeModal(elements.successModal);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Переключение между формами
    elements.switchToRegister.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });

    elements.switchToLogin.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });

    // Обработчики форм
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.registerForm.addEventListener('submit', handleRegister);
    elements.requestForm.addEventListener('submit', handleRequestSubmit);
    elements.clientInfoForm.addEventListener('submit', handleClientInfoUpdate);
    elements.loginForm.addEventListener('submit', handleLogin);

    // Выход из системы
    elements.clientLogoutBtn.addEventListener('click', logout);
    elements.managerLogoutBtn.addEventListener('click', logout);

    // Оценка проекта
    elements.estimateBtn.addEventListener('click', estimateProject);

    // Фильтрация заявок
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterRequests(this.getAttribute('data-filter'));
        });
    });
}

// Логика входа
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    console.log('Попытка входа:', email, password); // Логируем для проверки

    const client = appData.clients.find(c => c.email === email && c.password === password);
    const manager = appData.managers.find(m => m.email === email && m.password === password);

    if (client) {
        appData.currentUser = {
            id: client.id,
            name: client.name,
            email: client.email,
            type: 'client'
        };
        closeModal(elements.authModal);
        showClientProfile();
        updateAuthButton();
        return;
    }

    if (manager) {
        appData.currentUser = {
            id: manager.id,
            email: manager.email,
            type: 'manager'
        };
        closeModal(elements.authModal);
        showManagerDashboard();
        updateAuthButton();
        return;
    }

    alert('Неверный email или пароль');
}
// Логика регистрации
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }

    if (appData.clients.some(c => c.email === email)) {
        alert('Пользователь с таким email уже зарегистирован');
        return;
    }

    const newClient = {
        id: Math.max(0, ...appData.clients.map(c => c.id)) + 1,
        name,
        email,
        phone,
        password
    };
    appData.clients.push(newClient);
    appData.currentUser = {
        id: newClient.id,
        name: newClient.name,
        email: newClient.email,
        type: 'client'
    };
    closeModal(elements.authModal);
    showClientProfile();
    document.getElementById('clientName').value = name;
    document.getElementById('clientEmail').value = email;
    document.getElementById('clientPhone').value = phone;
    elements.successMessage.textContent = 'Регистрация прошла успешно! Теперь вы можете пользоваться своим аккаунтом.';
    openModal(elements.successModal);
}

// Открытие/закрытие модальных окон
function toggleMobileMenu() {
    elements.mobileMenu.classList.toggle('active');
}

function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (modal === elements.requestModal) {
        elements.requestForm.reset();
        elements.estimateSection.style.display = 'none';
        elements.estimateBtn.style.display = 'inline-block';
    }
}

// Оценка проекта
async function estimateProject() {
    document.getElementById('estimateTime').textContent = '-';
    document.getElementById('estimateCost').textContent = '-';
    document.getElementById('techTags').innerHTML = '';
    elements.estimateSection.style.display = 'none';
    elements.estimateBtn.disabled = true;
    elements.estimateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Оцениваем...';

    const serviceType = document.getElementById('service').value;
    const description = document.getElementById('message').value;

    if (!serviceType) {
        alert('Выберите тип услуги');
        resetEstimateButton();
        return;
    }

    if (!description || description.length < 20) {
        alert('Введите более подробное описание проекта (минимум 20 символов)');
        resetEstimateButton();
        return;
    }

    try {
        const estimate = await estimateAPI.getEstimate(serviceType, description);

        document.getElementById('estimateTime').textContent = estimate.time;
        document.getElementById('estimateCost').textContent = estimate.cost;
        const techTags = document.getElementById('techTags');
        techTags.innerHTML = '';

        estimate.tech.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techTags.appendChild(tag);
        });

        elements.estimateSection.style.display = 'block';
        elements.estimateBtn.style.display = 'none';
    } catch (error) {
        console.error('Ошибка оценки:', error);
        alert('Произошла ошибка при оценке проекта. Пожалуйста, попробуйте позже.');
    } finally {
        resetEstimateButton();
    }
}

function resetEstimateButton() {
    elements.estimateBtn.disabled = false;
    elements.estimateBtn.innerHTML = '<i class="fas fa-calculator"></i> Оценить проект';
}

function filterRequests(filter) {
    elements.filterBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.filter-btn[data-filter="${filter}"]`).classList.add('active');
    const filteredRequests = filter === 'all' ? [...appData.requests] : appData.requests.filter(r => r.status === filter);
    renderManagerRequests(filteredRequests);
}

// Рендер заявок
function renderClientRequests() {
    if (!appData.currentUser || appData.currentUser.type !== 'client') return;
    const clientRequests = appData.requests.filter(r => r.clientId === appData.currentUser.id);
    elements.clientRequests.innerHTML = '';
    clientRequests.forEach(request => {
        const requestEl = createRequestElement(request, false);
        elements.clientRequests.appendChild(requestEl);
    });
}

function renderManagerRequests(requests = appData.requests) {
    elements.requestsGrid.innerHTML = '';
    requests.forEach(request => {
        const requestEl = createRequestElement(request, true);
        elements.requestsGrid.appendChild(requestEl);
    });
}

// Создание карточки заявки
function createRequestElement(request, isManager) {
    const requestEl = document.createElement('div');
    requestEl.className = 'request-card';
    requestEl.setAttribute('data-id', request.id);
    requestEl.setAttribute('data-status', request.status);

    const assignedTeam = assignTeamToRequest(request.id);

    const statusClass = {
        'new': 'new',
        'in-progress': 'in-progress',
        'completed': 'completed'
    }[request.status] || '';

    requestEl.innerHTML = `
        <div class="request-header">
            <div class="request-title">${request.title}</div>
            <div class="request-status ${statusClass}">${getStatusText(request.status)}</div>
        </div>
        ${isManager ? `<div class="request-client">${request.clientName}</div>` : ''}
        <div class="request-date">${request.date}</div>
        <div class="request-desc">${request.description}</div>
        <button class="btn btn-outline view-details-btn" style="margin-top: 10px; width: 100%;">Подробнее</button>
    `;

    requestEl.addEventListener('click', function(e) {
        if (!e.target.classList.contains('view-details-btn') && !e.target.closest('.view-details-btn')) {
            showRequestDetails(request.id);
        }
    });

    requestEl.querySelector('.view-details-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        showRequestDetails(request.id);
    });

    return requestEl;
}

function getStatusText(status) {
    const statusTexts = {
        'new': 'Новая',
        'in-progress': 'В работе',
        'completed': 'Завершена'
    };
    return statusTexts[status] || status;
}

function getServiceText(service) {
    const services = {
        'web': 'Веб-разработка',
        'mobile': 'Мобильные приложения',
        'backend': 'Backend разработка',
        'bi': 'BI системы',
        'ai': 'AI решения',
        'cloud': 'Облачные решения',
        'other': 'Другое'
    };
    return services[service] || service;
}

// Подробности заявки
function showRequestDetails(requestId) {
    const request = appData.requests.find(r => r.id == requestId);
    if (!request) return;

    const isManager = elements.managerDashboard.style.display !== 'none';
    const assignedTeam = assignTeamToRequest(request.id);

    // Расчёт дат
    const estimateTime = request.estimate?.time || "не определено";
    const weeksMatch = estimateTime.match(/(\d+)(?:-(\d+))? нед/i);
    let minWeeks = 1, maxWeeks = 1;

    if (weeksMatch) {
        minWeeks = parseInt(weeksMatch[1]);
        maxWeeks = weeksMatch[2] ? parseInt(weeksMatch[2]) : minWeeks;
    }

    const totalWeeks = Math.ceil(maxWeeks);
    let ganttHTML = '';
    let currentStartDate = new Date();

    for (let i = 1; i <= totalWeeks; i++) {
        const weekStart = new Date(currentStartDate);
        const weekEnd = new Date(currentStartDate);
        weekEnd.setDate(weekStart.getDate() + 6);

        const stageName = ['Планирование', 'Проектирование', 'Разработка', 'Тестирование'][Math.min(i - 1, 3)];
        const progress = i / totalWeeks;
        const blue = Math.round(255 * (1 - progress));
        const green = Math.round(255 * progress);
        const barColor = `rgb(0, ${green}, ${blue})`;

        ganttHTML += `
            <div class="gantt-row">
                <div class="gantt-label">${stageName}</div>
                <div class="gantt-bar-container">
                    <div class="gantt-bar" style="width: ${100 / totalWeeks}%; background-color: ${barColor}">
                        <span class="gantt-tooltip">${formatDate(weekStart)} – ${formatDate(weekEnd)}</span>
                    </div>
                </div>
                <div class="gantt-dates">${formatDate(weekStart)} – ${formatDate(weekEnd)}</div>
            </div>`;
        currentStartDate.setDate(currentStartDate.getDate() + 7);
    }

    elements.requestDetailsContent.innerHTML = `
        <div class="request-detail">
            <h3>${request.title}</h3>
            <div class="detail-row">
                <span class="detail-label">Статус:</span>
                <span class="detail-value status ${request.status}">${getStatusText(request.status)}</span>
            </div>
            ${isManager ? `
            <div class="detail-row">
                <span class="detail-label">Клиент:</span>
                <span class="detail-value">${request.clientName}</span>
            </div>
            ` : ''}
            <div class="detail-row">
                <span class="detail-label">Дата:</span>
                <span class="detail-value">${request.date}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${request.clientEmail}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Телефон:</span>
                <span class="detail-value">${request.clientPhone}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Услуга:</span>
                <span class="detail-value">${getServiceText(request.service)}</span>
            </div>

            <!-- Описание проекта -->
            <div class="detail-description">
                <h4>Описание проекта:</h4>
                <p>${request.description}</p>
            </div>

            <!-- Характеристики команды -->
            <div class="team-section">
                <h4><i class="fas fa-users"></i> Ответственная команда</h4>
                <div class="team-card">
                    <div class="team-name"><strong>Название:</strong> ${assignedTeam.name}</div>
                    <div class="team-members"><strong>Участники:</strong> ${assignedTeam.members.join(', ')}</div>
                    <div class="team-skills"><strong>Навыки:</strong> ${assignedTeam.skills.join(', ')}</div>
                    <div class="team-experience"><strong>Опыт:</strong> ${assignedTeam.experience}</div>
                    <div class="team-status"><strong>Статус:</strong> ${assignedTeam.status}</div>
                </div>
            </div>

            <!-- Оценка проекта -->
            ${request.estimate ? `
            <div class="detail-estimate">
                <h4>Оценка проекта:</h4>
                <div class="estimate-grid">
                    <div class="estimate-card">
                        <div class="estimate-value">${request.estimate.time}</div>
                        <div class="estimate-label">Срок реализации</div>
                    </div>
                    <div class="estimate-card">
                        <div class="estimate-value">${request.estimate.cost}</div>
                        <div class="estimate-label">Примерная стоимость</div>
                    </div>
                </div>
                <div class="tech-stack">
                    <h4>Рекомендуемый стек технологий:</h4>
                    <div class="tech-tags">
                        ${request.estimate.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
            ` : ''}

            <!-- Диаграмма Ганта -->
            <div class="gantt-chart">
                <h4><i class="fas fa-chart-gantt"></i> Проектный график (Гант)</h4>
                <div class="gantt-container">
                    ${ganttHTML}
                </div>
            </div>

            ${isManager ? `
            <div class="detail-actions" id="statusActions">
                <h4>Изменить статус:</h4>
                <div class="status-selector">
                    <div class="status-option new ${request.status === 'new' ? 'selected' : ''}" data-status="new">Новая</div>
                    <div class="status-option in-progress ${request.status === 'in-progress' ? 'selected' : ''}" data-status="in-progress">В работе</div>
                    <div class="status-option completed ${request.status === 'completed' ? 'selected' : ''}" data-status="completed">Завершена</div>
                </div>
                <button class="btn" id="saveStatusBtn">Сохранить изменения</button>
            </div>
            ` : ''}
        </div>
    `;

    if (isManager) {
        const statusOptions = document.querySelectorAll('.status-option');
        const saveStatusBtn = document.getElementById('saveStatusBtn');

        statusOptions.forEach(option => {
            option.addEventListener('click', function() {
                statusOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        saveStatusBtn.addEventListener('click', function() {
            const selectedOption = document.querySelector('.status-option.selected');
            if (selectedOption) {
                const newStatus = selectedOption.getAttribute('data-status');
                updateRequestStatus(request.id, newStatus);
            } else {
                alert('Пожалуйста, выберите новый статус');
            }
        });
    }

    openModal(elements.requestDetailsModal);
}

function updateRequestStatus(requestId, newStatus) {
    const requestIndex = appData.requests.findIndex(r => r.id == requestId);
    if (requestIndex === -1) return;
    appData.requests[requestIndex].status = newStatus;
    renderClientRequests();
    renderManagerRequests();
    closeModal(elements.requestDetailsModal);
    alert('Статус заявки успешно обновлен');
}

function handleRequestSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const newRequest = {
        id: generateId(),
        clientId: appData.currentUser?.id || 0,
        title: `Заявка на ${getServiceText(service)}` + (company ? ` (${company})` : ''),
        description: message,
        service,
        status: 'new',
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        date: formatDate(),
        estimate: elements.estimateSection.style.display !== 'none' ? {
            time: document.getElementById('estimateTime').textContent,
            cost: document.getElementById('estimateCost').textContent,
            tech: Array.from(document.querySelectorAll('.tech-tag')).map(tag => tag.textContent)
        } : null
    };

    appData.requests.push(newRequest);
    closeModal(elements.requestModal);
    if (appData.currentUser?.type === 'client') {
        renderClientRequests();
    } else {
        renderManagerRequests();
    }
    elements.successMessage.textContent = 'Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.';
    openModal(elements.successModal);
}

function handleClientInfoUpdate(e) {
    e.preventDefault();
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const clientIndex = appData.clients.findIndex(c => c.id === appData.currentUser.id);

    if (clientIndex !== -1) {
        appData.clients[clientIndex].name = name;
        appData.clients[clientIndex].email = email;
        appData.clients[clientIndex].phone = phone;
        appData.currentUser.name = name;
        appData.currentUser.email = email;
        appData.requests.forEach(request => {
            if (request.clientId === appData.currentUser.id) {
                request.clientName = name;
                request.clientEmail = email;
                request.clientPhone = phone;
            }
        });
        renderClientRequests();
        if (document.querySelector('.filter-btn.active').getAttribute('data-filter') === 'all') {
            renderManagerRequests();
        }
        alert('Данные профиля успешно обновлены');
    }
}

function showClientProfile() {
    elements.mainContent.style.display = 'none';
    elements.managerDashboard.style.display = 'none';
    elements.clientProfile.style.display = 'block';
    renderClientRequests();
}

function showManagerDashboard() {
    elements.mainContent.style.display = 'none';
    elements.clientProfile.style.display = 'none';
    elements.managerDashboard.style.display = 'block';
    renderManagerRequests();
}

function logout() {
    appData.currentUser = null;
    elements.clientProfile.style.display = 'none';
    elements.managerDashboard.style.display = 'none';
    elements.mainContent.style.display = 'block';
    updateAuthButton();
}

function updateAuthButton() {
    const authBtn = document.getElementById('authBtn');
    const mobileAuthBtn = document.getElementById('mobileAuthBtn');

    if (appData.currentUser) {
        authBtn.textContent = 'Профиль';
        mobileAuthBtn.textContent = 'Профиль';
    } else {
        authBtn.textContent = 'Вход';
        mobileAuthBtn.textContent = 'Вход';
    }
}

document.addEventListener('DOMContentLoaded', initApp);