<?

class Mail
{
  public function getValue($field)
  {
      if (isset($_POST[$field])) {
          return strip_tags($_POST[$field]);
      }
      return false;
  }

  public function fileIsValid()
  {
      $whitelist = array(".jpg", ".jpeg", ".xls", ".xlsx", ".doc", ".pdf", ".png", ".txt", ".docx", ".csv");
      foreach ($whitelist as $item) {
          if (preg_match("/$item\$/i", $_FILES['file']['name'])) {
              return 1;
          }
      }
      return false;
  }
  public function getUploadedPath()
  {
      $tmp_name = $_FILES['file']['tmp_name'];
      $name = $_FILES['file']['name'];
      $dir = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
      $fdata = pathinfo($dir.$name);
      $newname = date('YmdHis').'.'.$fdata['extension'];
          move_uploaded_file($tmp_name, $dir . $newname);
          return $uploadedPath = 'http://kuhni-cherry.by/uploads/'.$newname;
  }
  public function sendEmail()
  {
      $data = "имя: " . $this->getValue('username') . " телефон: " . $this->getValue('userphone');
      $headers = "Content-Type: text/plain;charset=utf-8\r\n";
      if(isset($_FILES['file']['tmp_name'])) {
        if($this->fileIsValid())
        {
          $uploadedPath = $this->getUploadedPath();
          $data = "Имя: ".$this->getValue('username')." Телефон: ".$this->getValue('userphone')." Скачать проект кухни: ".$uploadedPath;
        } else
        {
          $data = "Имя: ".$this->getValue('username')." Телефон: ".$this->getValue('userphone')." Скачать проект кухни: файл был плох, сервак не принял";
        }

      }
      mail('ofitserov.vladimir@gmail.com', '=?utf-8?b?' . base64_encode('Заказ на сайте Kitchen-cherry') . '?=', $data, $headers);

  }
}
$mail = new Mail();
$mail->sendEmail();
?>
