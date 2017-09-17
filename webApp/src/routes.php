<?php
// Routes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$app->get('/', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.html', $args);
});

$app->get('/infantHealth', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'infanthealth.html', $args);
});

$app->get('/getData', function ($request, $response, $args) {
    // Sample log message
    $arr = array ('a'=>"eseghrrnehreh",'b'=>2,'c'=>3,'d'=>4,'e'=>5);

    return json_encode($arr);
});

$app->post('/signin',function($request,$response){

		$input = $request->getBody();
		$input = json_decode($input, true); 
		$get_salt = $this->db->prepare("CALL GetSalt(:Username)");
		$get_salt->bindValue(":Username", $input["Username"], PDO::PARAM_STR);
		try{
			$get_salt->execute();
		}
		catch(PDOException $e){
			return $this->response->withStatus(401);
		}
		$salt = $get_salt->fetchAll()[0]["Salt"];
		unset($get_salt);
		$pass = hash('sha256', $input["Password"].$salt);

		$stmt = $this->db->prepare("CALL ValidateUser(:Username,:Password)");
		$stmt->bindValue(':Username',$input["Username"],PDO::PARAM_STR);
		$stmt->bindValue(':Password',$pass,PDO::PARAM_STR);
		try {
			$stmt->execute();
		}
		catch(PDOException $e){
			return $this->response->withStatus(401);
		}
		if($stmt->rowCount()==1){
			$userInfo = $stmt->fetchAll()[0];
		}
		else{
			return $this->response->withStatus(401);
		}
		return $this->response->withJson($userInfo);
	
});

$app->post('/signup',function($request,$response){

			$input = $request->getBody();
						//$input = $request->getParsedBody();
			$input = json_decode($input, true); 
		    $stmt = $this->db->prepare("CALL CreateUser(:Username, :Password,:FirstName, :LastName,:Email,:Salt)");
			$pass = $input["Password"];
			$salt = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 10);
			$pass = hash('sha256',$pass.$salt);
			$stmt->bindValue(':Username', $input["Username"],PDO::PARAM_STR);
			$stmt->bindValue(':Password', $pass, PDO::PARAM_STR);
			$stmt->bindValue(':Email', $input["Email"], PDO::PARAM_STR);
			$stmt->bindValue(':Salt', $salt, PDO::PARAM_STR);
			$stmt->bindValue(':FirstName',$input["FirstName"],PDO::PARAM_STR);
			$stmt->bindValue(':LastName',$input["LastName"],PDO::PARAM_STR);
			try{
				$stmt->execute();
			}
			catch(PDOException $e){
					return $this->response->withStatus(400);
			}
			return $this->response->withStatus(200);      
});

$app->post('/postform',function($request,$response){
	
	$input = $request->getBody();
	$input = json_decode($input,true);
	$parsed_array = [];
	foreach ($input as  $value){
		$stmt = $this->db->prepare("SELECT SymptomID FROM Symptoms WHERE Description = :Description");
		$stmt->bindValue(':Description', $value, PDO::PARAM_STR);
		try{
				$stmt->execute();
			}
			catch(PDOException $e){
					$this->response=$this->response->withJson($e);
					return $this->response->withStatus(400);
			}
		$idinfo = $stmt->fetchAll();
		array_push($parsed_array, $idinfo[0]["SymptomID"]);
	}

	//Add history if user is logged in
 	if($request->getAttribute('UserID')!='None'){
		 //add history record
		 $stmt = $this->db->prepare('CALL AddHistory(:UserID)');// AND Name= :Name ');
		 $stmt->bindValue(':UserID', $request->getAttribute('UserID'), PDO::PARAM_INT);
		 //need to figure out how to bind baby name 
		 try{
			 $stmt->execute();
		 }
		 catch(PDOException $e){
			return $this->response->withStatus(401);
		 }
		 $HistoryID = $stmt->fetchAll()[0]["HistoryID"];
		 unset($stmt);
		 foreach($parsed_array as $symptomID){
			$createHistoryQuery = $this->db->prepare('INSERT INTO SymptomHistory(HistoryID, SymptomID) VALUES (:HistoryID, :SymptomID)');
			$createHistoryQuery->bindValue(':HistoryID', $HistoryID, PDO::PARAM_INT);
			$createHistoryQuery->bindValue(':SymptomID', $symptomID, PDO::PARAM_INT);
			$createHistoryQuery->execute();
		 }


	}

	$str = "";
	foreach ($parsed_array as $i){
      $str = $str.(string)$i;
      $str = $str.',';
	}
	$stmt = $this->db->prepare("SELECT Name, COUNT(s1.SymptomID) AS counted FROM  SymptomIllness as s1 INNER JOIN Symptoms as s2 ON s1.SymptomID=s2.SymptomID INNER JOIN Illnesses as i1 ON s1.IllnessID = i1.IllnessID WHERE s1.SymptomID IN (".$str." 0) GROUP BY s1.IllnessID ORDER BY counted DESC");
	try{

				$stmt->execute();
			}
			catch(PDOException $e){
				//print($e.message);
					return $this->response->withStatus(400);
	}
	$Info = $stmt->fetchAll();
	return $this->response->withJson($Info);
})->add($validateSession);

$app->get('/illness/{name}', function($request, $response, $args){
	$name = $args["name"];
	$stmt = $this->db->prepare("SELECT About FROM Illnesses WHERE Name = :name ");
	$stmt->bindValue(':name', $name, PDO::PARAM_INT);
	try{
				$stmt->execute();
			}
			catch(PDOException $e){
					return $this->response->withStatus(400);
			}
	$Info = $stmt->fetchAll();
	return $this->response->withJson($Info);
	
});
$app->get('/reference', function($request,$response){
	
	return $this->response->WithStatus(200);
});
$app->post('/remedies', function($request, $response){
    
    $input = $request->getBody();
    $input = json_decode($input, true);
    $illname = $input['Illness']; 
    $stmt = $this->db->prepare("SELECT About FROM Illnesses WHERE Name = :illnessname");
    $stmt->bindValue(':illnessname', $illname, PDO::PARAM_STR);
    try{
                $stmt->execute();
            }
            catch(PDOException $e){
                    return $this->response->withStatus(400);
            }
    $reme = $stmt->fetchAll()[0];
    $reme['About'] = utf8_encode($reme['About']);
    return $this->response->withJson($reme);        
});



$app->get('/userInfo', function($request,$response){
	$userID = $request->getAttribute('UserID');
	$stmt = $this->db->prepare("SELECT Username, FirstName, LastName, Email FROM Users WHERE UserID=:UserID");
	$stmt->bindValue(':UserID', $userID, PDO::PARAM_INT);
	try{
		$stmt->execute();
	}
	catch(PDOException $e){
		return $this->response->withStatus(401);
	}
	$userInfo= $stmt->fetchAll()[0];
	return $this->response->withJson($userInfo);
})->add($validateSession);

$app->put('/userInfo', function($request,$response){
	$userID = $request->getAttribute('UserID');
	$getSaltFromUserID = $this->db->prepare("SELECT Username,Salt FROM Users WHERE UserID=:UserID");
	$getSaltFromUserID->bindValue(':UserID', $userID, PDO::PARAM_INT);
	try{
		$getSaltFromUserID->execute();
	}
	catch(PDOException $e){
		return $this->response->withStatus(401);
	}
	$info =  $getSaltFromUserID->fetchAll()[0];
	$salt = $info['Salt'];
	$username = $info['Username'];
	unset($getSaltFromUserID);
	//verify password
	$input = $request->getBody();
	$input = json_decode($input,true);
	$oldPass = $input['OldPass'];
	$newPass = $input['NewPass'];
	$email = $input['Email'];

	$verifyPass = $this->db->prepare("CALL ValidateUser(:Username, :Password)");
	$verifyPass->bindValue(':Username', $username, PDO::PARAM_STR);
	$verifyPass->bindValue(':Password', hash('sha256',$oldPass.$salt), PDO::PARAM_STR);

	try {
		$verifyPass->execute();
	}
	catch(PDOException $e){
		return $this->response->withStatus(401);
	}
	if($verifyPass->rowCount()==1){
		unset($verifyPass);
		$updatePassAndEmail = $this->db->prepare("UPDATE Users SET Password=:Password, Email=:Email WHERE UserID=:UserID");
		$updatePassAndEmail->bindValue(':Password', hash('sha256',$newPass.$salt));
		$updatePassAndEmail->bindValue(':Email', $email);
		$updatePassAndEmail->bindValue(':UserID',$userID);
		try {
			$updatePassAndEmail->execute();
			return $this->response->withStatus(200);
		}
		catch(PDOException $e){
			return $this->response->withStatus(401);
		}

	}
	else{
		return $this->response->withStatus(401);
	}
})->add($validateSession);


$app->put('/forgotPass', function($request,$response){

	$input = $request->getBody();
	$input = json_decode($input,true);
	$username = $input['Username'];

	$newPass = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 10);
	$newSalt = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 10);
	
	$getEmail = $this->db->prepare("SELECT Email FROM Users WHERE Username =:Username");
	$getEmail->bindValue(':Username', $username, PDO::PARAM_STR);
	try{
		$getEmail->execute();
	}
	catch(PDOException $e){
		return $response->withStatus(401);
	}
	$email = $getEmail->fetchAll()[0]['Email'];
	unset($getEmail);
	try{
		
		$mail= new PHPMailer;
		$mail->isSMTP();
		$mail->Host = 'ssl://smtp.gmail.com:465';
		$mail->SMTPAuth = true;
		$mail->Username = 'husshbehbes@gmail.com';
		$mail->Password = 'behbes_mail';

		$mail->setFrom('husshbehbes@gmail.com');
		$mail->addAddress($email);
		$mail->addReplyTo('noreply@hussh.site', 'No-REPLY');
		$mail->isHTML(true);
		$mail->Subject= "Your new Hussh password";
		$mail->Body = "You're receiving this e-mail because you requested a password reset for your user account at Hussh. <br/></br/> Your new password is : <br/><br/>    <b>".$newPass."</b><br/><br/> Use it to log in to your account. <br/><br/><br/><br/> The Hussh development team";
		
		$mail->send();

	}
	catch (Exception $e){
		$response = $response->withStatus(401);
		echo($e);
		echo($mail);
		return $response->withJson($e);
	}

	$updatePassQuery= $this->db->prepare("UPDATE Users SET Password = :Password, Salt= :Salt WHERE Username=:Username");
	$updatePassQuery->bindValue(':Password', hash('sha256', $newPass.$newSalt), PDO::PARAM_STR);
	$updatePassQuery->bindValue(':Salt', $newSalt, PDO::PARAM_STR);
	$updatePassQuery->bindValue(':Username', $username, PDO::PARAM_STR);
	try{
		$updatePassQuery->execute();
	}
	catch (PDOException $e){
		return $response->withStatus(401);
	}
	unset($updatePassQuery);
	return $response->withStatus(200);
});
$app->post('/naturalremedies', function($request, $response){
	$illname = $request->getBody();
	$stmt = $this->db->prepare("SELECT description, Hyperlink FROM Illnesses as i1 INNER JOIN Remedies as r1 ON i1.IllnessID = r1.IllnessID WHERE i1.Name = :illnessname and r1.type = \"natural\"");
	$stmt->bindValue(':illnessname', $illname, PDO::PARAM_STR);
	try{
				$stmt->execute();
			}
			catch(PDOException $e){
					return $this->response->withStatus(400);
			}
	$reme = $stmt->fetchAll();
	return $this->response->withJson($reme);	
	
});
$app->post('/conventionalremedies', function($request, $response){
	$illname = $request->getBody();
	$stmt = $this->db->prepare("SELECT description, Hyperlink FROM Illnesses as i1 INNER JOIN Remedies as r1 ON i1.IllnessID = r1.IllnessID WHERE i1.Name = :illnessname and r1.type = \"conventional\"");
	$stmt->bindValue(':illnessname', $illname, PDO::PARAM_STR);
	try{
				$stmt->execute();
			}
			catch(PDOException $e){
					return $this->response->withStatus(400);
			}
	$reme = $stmt->fetchAll();
	return $this->response->withJson($reme);	
	
});
$app->post('/resources', function($request, $response){
	$illname = $request->getBody();
	$stmt = $this->db->prepare("SELECT description, Hyperlink FROM Illnesses as i1 INNER JOIN Remedies as r1 ON i1.IllnessID = r1.IllnessID WHERE i1.Name = :illnessname");
	$stmt->bindValue(':illnessname', $illname, PDO::PARAM_STR);
	try{
				$stmt->execute();
			}
			catch(PDOException $e){
					return $this->response->withStatus(400);
			}
	$reme = $stmt->fetchAll();
	return $this->response->withJson($reme);	
	
});

$app->get('/history', function($request, $response){
	$userID = $request->getAttribute('UserID');

	$getHistoryDate = $this->db->prepare("SELECT Date FROM Users natural join History where UserID= :UserID");
	$getHistoryDate->bindValue(':UserID', $userID,PDO::PARAM_INT);
	try {
		$getHistoryDate->execute();
	}
	catch(PDOException $e){
			return $this->response->withStatus(401);
	}
	$data = $getHistoryDate->fetchAll();
	$formattedData =[];
	unset($getHistoryDate);
	foreach($data as $date){
		$getHistoryForDate = $this->db->prepare("SELECT Description FROM History NATURAL JOIN SymptomHistory NATURAL JOIN Symptoms NATURAL JOIN Users WHERE UserID=:UserID AND Date=:Date");
		$getHistoryForDate->bindValue(':UserID', $userID, PDO::PARAM_INT);
		$getHistoryForDate->bindValue(':Date', $date['Date'], PDO::PARAM_STR);	
		try{
			$getHistoryForDate->execute();
		}
		catch(PDOException $e){
			return $this->response->withStatus(401);
		}
		$symptoms = $getHistoryForDate->fetchAll();
		$date['Symptoms'] =[];
		foreach($symptoms as $symptom){
			array_push($date['Symptoms'], $symptom['Description']);
			//echo($date['Symptoms'][0]);
		}
		unset($getHistoryForDate);
		array_push($formattedData, $date);
	}
	array_multisort($formattedData);
	return $response->withJson($formattedData);

})->add($validateSession);