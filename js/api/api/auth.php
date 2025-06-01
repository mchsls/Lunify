<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Имитация подключения к БД
$clients = [
    ['id' => 1, 'name' => 'Иван Иванов', 'email' => 'ivan@example.com', 'password' => 'password123']
];
$managers = [
    ['id' => 1, 'email' => 'manager@devsolutions.ru', 'password' => 'manager123']
];

$client = null;
foreach ($clients as $c) {
    if ($c['email'] === $email && $c['password'] === $password) {
        $client = $c;
        break;
    }
}

if ($client) {
    echo json_encode([
        'type' => 'client',
        'user' => $client
    ]);
    exit;
}

$manager = null;
foreach ($managers as $m) {
    if ($m['email'] === $email && $m['password'] === $password) {
        $manager = $m;
        break;
    }
}

if ($manager) {
    echo json_encode([
        'type' => 'manager',
        'user' => $manager
    ]);
    exit;
}

echo json_encode(['error' => 'Неверный email или пароль']);