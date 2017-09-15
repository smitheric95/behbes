<?php
// Application middleware

$validateSession= (function($request,$response,$next) {
    //get Authorization Header
    $token = $request->getHeader("Authorization")[0];

    $validateSessionQuery = $this->db->prepare("CALL ValidateSession(?)");
    $validateSessionQuery->execute(array($token));


    //if token exists
    if($validateSessionQuery->rowCount()==1){
        foreach($validateSessionQuery as $row){
            $returnArray[0]=$row['UserID'];
        }
        $request=$request->withAttribute('UserID', $returnArray[0]);
        $request=$request->withAttribute('Token', $token);
    }
    else{
        $request=$request->withAttribute('UserID', 'None');
        $request=$request->withAttribute('Token', 'None');
    }
    
    unset($validateSessionQuery);
    $response=$next($request,$response);
    return $response;
});

?>