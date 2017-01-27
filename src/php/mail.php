<?
$data = "имя: " . $_POST['username'] . " телефон: " . $_POST['userphone'];
$headers = "Content-Type: text/plain;charset=utf-8\r\n";
mail('ofitserov.vladimir@gmail.com', '=?utf-8?b?' . base64_encode('Заказ на сайте kuhni-cherry') . '?=', $data, $headers);
?>
