<?php

if ( isset($_POST["submit"])) {
    $name = $_POST["name"];
    $location = $_POST["location"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];
    $mailFrom = $_POST["email"];
    $subject = $name." quiere contactarse por Castro Barros 973";
    
    $mailTo = "contact@akumasoftware.com";
    $headers ="From: ".$mailFrom;
    $txt = $name." "."<".$mailFrom."> quiere contactarse con nosotros."."\n"."Telefono: ".$phone."\n"."Ubicacion: ".$location."\n\n".$message;

    mail($mailTo, $subject, $txt, $headers);

    header("Location: index.html#info?mailsend");
}