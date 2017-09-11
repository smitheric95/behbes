<?php
// Routes

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
			return $this->response->withStatus(400);
		}
		$salt = $get_salt->fetchAll()[0]["Salt"];
		unset($get_salt);
		$pass = hash('sha256', $input["Password"].$salt);

		$stmt = $this->db->prepare("CALL ValidateUser(:Username,:Password)");
		$stmt->bindValue(':Username',$input["Username"],PDO::PARAM_STR);
		$stmt->bindValue(':Password',$pass,PDO::PARAM_STR);
		$stmt->execute();
		$userInfo = $stmt->fetchAll()[0];
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
					return $this->response->withStatus(400);
			}
		$idinfo = $stmt->fetchAll();
		array_push($parsed_array, $idinfo[0]["SymptomID"]);
	}

	//Add history if user is logged in
 	if($request->getAttribute('UserID')!='None'){
		 //getBabyID by ParentID and namespace
		 $stmt = $this->db->prepare('SELECT BabyID FROM Baby WHERE ParentID= :ParentID ');// AND Name= :Name ');
		 $stmt->bindValue(':ParentID', $request->getAttribute('UserID'), PDO::PARAM_INT);
		 //need to figure out how to bind baby name 
		 try{
			 $stmt->execute();
		 }
		 catch(PDOException $e){
			return $this->response->withStatus(400);
		 }
		 $babyID = $stmt->fetchAll()[0]["BabyID"];
		 $createHistoryQuery = $this->db->prepare('INSERT INTO History(BabyID, Date) VALUES (?, NOW())');
		 $createHistoryQuery->execute(array($babyID));

		 //get ID of that History and add all symptoms in a loop 


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
				print($e.message);
					return $this->response->withStatus(400);
	}
	$Info = $stmt->fetchAll();
	return $this->response->withJson($Info);
})->add($validateSession);

$app->get('/illness/{id}', function($requeset, $response, $args){
	$id = $args["id"];
	$stmt = $this->db->prepare("SELECT * FROM Illnesses WHERE IllnessID = :id ");
	$stmt->bindValue(':id', $id, PDO::PARAM_INT);
	try{
				$stmt->execute();
			}
			catch(PDOException $e){
					return $this->response->withStatus(400);
			}
	$Info = $stmt->fetchAll();
	return $this->response->withJson($Info);
	
});
$app->get('/reference', function($requeset,$response){
	
	return $this->response->WithStatus(200);
});

