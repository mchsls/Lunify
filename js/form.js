document.addEventListener('DOMContentLoaded', function() {
    // Mock API для получения данных о командах и технологиях
    const mockApi = {
        getTechStack: function(projectType) {
            const stacks = {
                'web': ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
                'mobile': ['React Native', 'Flutter', 'Firebase', 'Redux'],
                'desktop': ['Electron', 'Python', 'C#', '.NET'],
                'ai': ['Python', 'TensorFlow', 'PyTorch', 'OpenCV']
            };
            return stacks[projectType] || ['JavaScript', 'HTML/CSS', 'REST API'];
        },
        
        getTeams: function(projectType) {
            const teams = {
                'web': [
                    { id: 1, name: 'Web Team Alpha', availability: 'high', cost: 1500, speed: 'fast' },
                    { id: 2, name: 'Web Team Beta', availability: 'medium', cost: 1200, speed: 'normal' }
                ],
                'mobile': [
                    { id: 3, name: 'Mobile Team Gamma', availability: 'high', cost: 1700, speed: 'fast' },
                    { id: 4, name: 'Mobile Team Delta', availability: 'low', cost: 1400, speed: 'slow' }
                ],
                'desktop': [
                    { id: 5, name: 'Desktop Team Epsilon', availability: 'medium', cost: 2000, speed: 'normal' }
                ],
                'ai': [
                    { id: 6, name: 'AI Team Zeta', availability: 'high', cost: 2500, speed: 'fast' }
                ]
            };
            return teams[projectType] || [
                { id: 7, name: 'General Team', availability: 'medium', cost: 1000, speed: 'normal' }
            ];
        },
        
        estimateProject: function(projectData) {
            // Простая логика оценки на основе типа проекта
            const estimates = {
                'web': { time: '2-4 нед.', cost: 120000, teamSize: 3 },
                'mobile': { time: '4-6 нед.', cost: 180000, teamSize: 4 },
                'desktop': { time: '3-5 нед.', cost: 150000, teamSize: 3 },
                'ai': { time: '6-8 нед.', cost: 250000, teamSize: 5 },
                'other': { time: '3-6 нед.', cost: 200000, teamSize: 4 }
            };
            
            return estimates[projectData.type] || estimates['other'];
        }
    };

    // DOM элементы
    const form = document.getElementById('intelligentRequestForm');
    const estimateBtn = document.getElementById('estimateBtn');
    const submitBtn = document.getElementById('submitBtn');
    const estimateSection = document.getElementById('estimateSection');
    const projectType = document.getElementById('projectType');
    const techTags = document.getElementById('techTags');
    const teamCards = document.getElementById('teamCards');

    // Оценка проекта
    estimateBtn.addEventListener('click', function() {
        const projectData = {
            name: document.getElementById('projectName').value,
            type: document.getElementById('projectType').value,
            description: document.getElementById('projectDescription').value
        };

        if (!projectData.type) {
            alert('Пожалуйста, выберите тип проекта');
            return;
        }

        // Получаем оценку от "API"
        const estimate = mockApi.estimateProject(projectData);
        
        // Обновляем UI с оценкой
        document.getElementById('estimateTime').textContent = estimate.time;
        document.getElementById('estimateCost').textContent = estimate.cost.toLocaleString('ru-RU') + ' ₽';
        document.getElementById('estimateTeam').textContent = estimate.teamSize + ' чел.';
        
        // Показываем рекомендуемые технологии
        const techStack = mockApi.getTechStack(projectData.type);
        techTags.innerHTML = techStack.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        // Показываем доступные команды
        const teams = mockApi.getTeams(projectData.type);
        teamCards.innerHTML = teams.map(team => `
            <div class="team-card" data-team-id="${team.id}">
                <h4>${team.name}</h4>
                <div class="team-meta">
                    <span class="availability ${team.availability}">
                        <i class="fas fa-circle"></i> ${team.availability === 'high' ? 'Высокая' : 
                          team.availability === 'medium' ? 'Средняя' : 'Низкая'} доступность
                    </span>
                    <span class="cost">${team.cost} ₽/час</span>
                    <span class="speed">${team.speed === 'fast' ? 'Быстрая' : 
                      team.speed === 'normal' ? 'Средняя' : 'Медленная'} разработка</span>
                </div>
                <button class="btn btn-small select-team">Выбрать</button>
            </div>
        `).join('');
        
        // Показываем секцию с оценкой
        estimateSection.style.display = 'block';
        submitBtn.disabled = false;
        
        // Прокручиваем к оценке
        estimateSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь должна быть реальная отправка данных на сервер
        alert('Заявка успешно отправлена! Менеджер свяжется с вами для уточнения деталей.');
        form.reset();
        estimateSection.style.display = 'none';
        submitBtn.disabled = true;
    });
});