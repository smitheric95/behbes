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
		$pass = md5($input["Password"]);
		$stmt = $this->db->prepare("SELECT * FROM Users WHERE Username = :Username AND pass = :Password");
		$stmt->bindValue(':Username',$input["Username"],PDO::PARAM_STR);
		$stmt->bindValue(':Password',$pass,PDO::PARAM_STR);
		$stmt->execute();
		$userInfo = $stmt->fetchAll();
		return $this->response->withJson($userInfo);
	
});

$app->post('/signup',function($request,$response){

			$input = $request->getBody();
						//$input = $request->getParsedBody();
			$input = json_decode($input, true); 
		    $stmt = $this->db->prepare("INSERT into Users(Username,Password,Email, Salt, FirstName, LastName,) VALUES (:Username, :Password,:Email,:Salt, :FirstName, :LastName)");
			$pass = $input["Password"];
			$pass = md5($pass);
			$stmt->bindValue(':Username', $input["Username"],PDO::PARAM_STR);
			$stmt->bindValue(':Password', $pass, PDO::PARAM_STR);
			$stmt->bindValue(':Email', $input["Email"], PDO::PARAM_STR);
			$stmt->bindValue(':Salt', $input["Salt"], PDO::PARAM_STR);
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
		print($value);
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
	$str = "";
	foreach ($parsed_array as $i){
      $str = $str.(string)$i;
      $str = $str.',';
	}
    print($str);
	$stmt = $this->db->prepare("SELECT s1.IllnessID, COUNT(s1.SymptomID) AS counted FROM  SymptomIllness as s1 INNER JOIN Symptoms as s2 ON s1.SymptomID=s2.SymptomID INNER JOIN Illnesses as i1 ON s1.IllnessID = i1.IllnessID WHERE s1.SymptomID IN (".$str." 0) GROUP BY s1.IllnessID ORDER BY counted DESC");
	try{
				$stmt->execute();
			}
			catch(PDOException $e){
					return $this->response->withStatus(400);
	}
	$Info = $stmt->fetchAll();
	return $this->response->withJson($Info);
});

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

