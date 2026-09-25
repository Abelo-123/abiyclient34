<?php
require_once __DIR__ . '/api/notify.php';

echo "=== Sending Test Sample Fake Order Notification ===\n";

$uid = '5928771903'; // Sample Admin/Test UID
$uuid = 'TestUser_John';
$service = '🚀 Sample Telegram Members (Fake Order Test)';
$orderId = 'TEST-' . rand(10000, 99999);
$amount = '25.00';
$panel = 'GodOfPanel';
$pb = '150.00';

echo "Payload parameters:\n";
echo "  UID: {$uid}\n";
echo "  User: {$uuid}\n";
echo "  Service: {$service}\n";
echo "  Order ID: {$orderId}\n";
echo "  Amount: {$amount} ETB\n";

$res = notifyNewOrder($uid, $uuid, $service, $orderId, $amount, $panel, $pb);

echo "\nNotification Dispatch Result:\n";
var_dump($res);
