document.addEventListener('DOMContentLoaded', function() {
    // Mock база данных
    const db = {
        managers: [
            { id: 1, name: "Алексей Петров", email: "manager@devsolutions.ru", employeeId: "DS-001", password: "manager123", approved: true },
            { id: 2, name: "Ирина Смирнова", email: "i.smirnova@devsolutions.ru", employeeId: "DS-002", password: "manager456", approved: true }
        ],
        managerRequests: [
            { id: 1, name: "Дмитрий Иванов", email: "new.manager@example.com", employeeId: "DS-003", password: "temp123", approved: false }
        ],
        clients: [
            { id: 1, name: "ООО ТехноПром", email: "client@techprom.ru", phone: "+79123456789", password: "client123" }
        ]
    };

    // Проверка а (имитация запроса к серверу)
    function checkManagerApproval(email, employeeId) {
        return new Promise((resolve) => {
            // Имитация задержки сети
            setTimeout(() => {
                const manager = db.managers.find(m => 
                    m.email === email && m.employeeId === employeeId && m.approved
                );
                resolve(!!manager);
            }, 1000);
        });
    }

    // Регистрация клиента
    if (document.getElementById('clientRegisterForm')) {
        document.getElementById('clientRegisterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const clientData = {
                name: document.getElementById('clientName').value,
                company: document.getElementById('clientCompany').value,
                email: document.getElementById('clientEmail').value,
                phone: document.getElementById('clientPhone').value,
                password: document.getElementById('clientPassword').value
            };
            
            // Сохраняем клиента (в реальности - отправка на сервер)
            db.clients.push({
                id: db.clients.length + 1,
                ...clientData
            });
            
            alert('Регистрация успешна! Теперь вы можете войти в систему.');
            window.location.href = 'request-form.html';
        });
    }

    // Регистрация менеджера
    if (document.getElementById('managerRegisterForm')) {
        document.getElementById('managerRegisterForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const managerData = {
                name: document.getElementById('managerName').value,
                email: document.getElementById('managerEmail').value,
                employeeId: document.getElementById('managerEmployeeId').value,
                password: document.getElementById('managerPassword').value
            };
            
            // Проверяем, есть ли менеджер в базе компании
            const isApproved = await checkManagerApproval(managerData.email, managerData.employeeId);
            
            if (isApproved) {
                // Добавляем в базу менеджеров
                db.managers.push({
                    id: db.managers.length + 1,
                    ...managerData,
                    approved: true
                });
                
                alert('Регистрация успешна! Теперь вы можете войти в систему.');
                window.location.href = 'manager-dashboard.html';
            } else {
                // Отправляем запрос на одобрение
                db.managerRequests.push({
                    id: db.managerRequests.length + 1,
                    ...managerData,
                    approved: false
                });
                
                alert('Ваш запрос отправлен администратору. Вы получите письмо на email после одобрения.');
            }
        });
    }
});