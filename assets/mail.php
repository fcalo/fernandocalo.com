<?
$mandatory_keys = array("email", "msg");

$error = false;
$msg = "";
foreach($mandatory_keys as $k){
	if (!isset($_POST[$k]) || trim($_POST[$k])==""){
		$error = true;
		$msg.="Falta ".$k."\n";
	}
	
}
if (!$error){
	$name = $_POST['name'];
	$email = $_POST['email'];
	$query = $_POST['msg'];
	$email_from = $name.'<'.$email.'>';

	$to="hola@fernandocalo.com";
	$subject="Contact [fernandocalo.com]" ;
	
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	$headers .= "From: ".$email_from."\r\n";
	$message="	  
	   
		 Name:
		 $name 	   
		 <br>
		 Email-Id:
		 $email 	   
		 <br>
		 Message:
		 $query 	   
	  
	";
	if(mail($to,$subject,$message,$headers)){
		$msg = "Gracias por pensar en mi. Recibiras una respuesta en breve.";
	}else{
		$error = true;
		$msg = "Error enviando email. Intentelo desde <a href='mailto:".$to."'>aquí</a>. Gracias.";
	}
}
echo json_encode(array("ok"=>!$error, "info"=>$msg));
die;
?>
