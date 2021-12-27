<?php
$domain = parse_url($_SERVER['HTTP_REFERER']);
$allowed_host = array("castrobarros973.com.ar", "localhost", "cb.akuma.dbpages.net");

if (isset($domain['host'])) {
  // if($domain['host'] == 'castrobarros973.com.ar'){
  if(in_array($_SERVER["HTTP_HOST"], $allowed_host)) {
    $name = $_POST["name"];
    $location = $_POST["location"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];
    $mailFrom = $_POST["email"];
    $subject = $name." quiere contactarse por Castro Barros 973";
    
    $mailTo = "ventas@castrobarros973.com.ar";
    $headers ="From: ".$mailFrom;
    $txt = $name." "."<".$mailFrom."> quiere contactarse con nosotros."."\n"."Telefono: ".$phone."\n"."Ubicacion: ".$location."\n\n".$message;
    mail($mailTo, $subject, $txt, $headers);
    
    echo 'success';
  }
  else{
    echo 'failed';
  }
}
exit;