<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// Получаем данные
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['serviceType']) || !isset($data['description'])) {
    echo json_encode(['error' => 'Недостаточно данных']);
    exit;
}

$serviceType = $data['serviceType'];
$description = $data['description'];

// Базовые параметры по типам услуг
$serviceParams = [
    'web' => [
        'baseDays' => 20,
        'baseCost' => 150000,
        'techStack' => ['React', 'Node.js', 'MongoDB'],
        'complexityFactor' => 0.2
    ],
    'mobile' => [
        'baseDays' => 35,
        'baseCost' => 220000,
        'techStack' => ['React Native', 'Firebase'],
        'complexityFactor' => 0.25
    ],
    'default' => [
        'baseDays' => 15,
        'baseCost' => 120000,
        'techStack' => ['Базовый стек'],
        'complexityFactor' => 0.15
    ]
];

$params = $serviceParams[$serviceType] ?? $serviceParams['default'];

// Анализ сложности
$descriptionLength = strlen($description);
$lengthFactor = min(1, $descriptionLength / 500);

$keywordsComplex = ['интеграция', 'апи', 'база данных', 'аутентификация'];
$keywordsSimple = ['лендинг', 'визитка', 'каталог'];

$complexityScore = 0.5; // Базовая сложность
$complexityScore += $lengthFactor * 0.5;

foreach ($keywordsComplex as $word) {
    if (stripos($description, $word) !== false) $complexityScore += 0.2;
}
foreach ($keywordsSimple as $word) {
    if (stripos($description, $word) !== false) $complexityScore -= 0.1;
}

$complexityScore = max(0.5, min(1.5, $complexityScore));
$randomFactor = 0.9 + (rand() / getrandmax()) * 0.2;

$totalDays = round($params['baseDays'] * $complexityScore * $randomFactor);
$totalCost = round($params['baseCost'] * $complexityScore * $randomFactor);
$weeks = ceil($totalDays / 7);
$timeEstimate = ($weeks <= 2)
    ? "{$weeks} нед."
    : ($weeks - 1) . "-" . ($weeks + 1) . " нед.";

echo json_encode([
    'time' => $timeEstimate,
    'cost' => number_format($totalCost, 0, '', ' ') . " ₽",
    'tech' => $params['techStack']
]);