<?php
/**
 * Enquiry handler for one.com hosting.
 *
 * Set $from to a real mailbox on your own domain (create it in the one.com
 * control panel under Mail). Sending from an address outside the domain is
 * what usually lands these messages in spam.
 */

$to   = 'post@elbilnorden.no';
$from = 'no-reply@elbilnorden.no';

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

$clean = static function ($key, $multiline = false) {
    $value = isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';
    if (!$multiline) {
        $value = str_replace(["\r", "\n"], ' ', $value);
    }
    return mb_substr($value, 0, $multiline ? 5000 : 300);
};

$form     = $clean('form');
$language = $clean('language');
$name     = $clean('name');
$company  = $clean('company');
$email    = $clean('email');
$phone    = $clean('phone');
$van      = $clean('van');
$region   = $clean('region');
$message  = $clean('message', true);

// A submission with no name and no way to reply is spam.
if ($name === '' && $email === '' && $phone === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'empty']);
    exit;
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'email']);
    exit;
}

$label = 'eBOLD';
if ($form === 'ebold-camper') {
    $label = 'Nordic Camper';
} elseif ($form === 'ebold-dealer') {
    $label = 'Dealer enquiry';
}
$subject = $label . ' - ' . ($name !== '' ? $name : ($email !== '' ? $email : $phone));

$lines = [
    'Form: ' . $label,
    'Language: ' . ($language !== '' ? $language : '-'),
    '',
    'Name: ' . $name,
    'Company: ' . $company,
    'E-mail: ' . $email,
    'Phone: ' . $phone,
];
if ($van !== '') {
    $lines[] = 'Van: ' . $van;
}
if ($region !== '') {
    $lines[] = 'Region: ' . $region;
}
$lines[] = '';
$lines[] = 'Message:';
$lines[] = $message !== '' ? $message : '-';
$lines[] = '';
$lines[] = 'Sent from ' . ($_SERVER['HTTP_REFERER'] ?? 'the website');

$headers = [
    'From: ' . $from,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$sent = @mail(
    $to,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    implode("\n", $lines),
    implode("\r\n", $headers),
    '-f' . $from
);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'mail']);
    exit;
}

echo json_encode(['ok' => true]);
