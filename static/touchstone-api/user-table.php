<?php


/** Get Users Login Info **/
function getUserLogin($conn, $username, $password) {
    
    $sql = "SELECT EmailAddress, MyPassword, CompanyID FROM tblUsers WHERE EmailAddress='".$username."' AND MyPassword= '".sha1($password)."' ";
    $result = $conn->query($sql);
    
    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        // $emparray[] = $row;
        $emparray = array('username' => $row["EmailAddress"], 'email' => $row["EmailAddress"], 'password' => $row["MyPassword"], 'companyid' => $row["CompanyID"]);
    }
    
    echo json_encode($emparray);
    
    $conn->close();
}


/** Get Users List **/
function getUserList($conn) {
    
    $sql = "SELECT * FROM tblUsers";
    $result = $conn->query($sql);
    
    //create an array
    $emparray = array();
    
    while($row =mysqli_fetch_assoc($result))
    {
        // $emparray[] = $row;
        $emparray = array('username' => $row["EmailAddress"], 'email' => $row["EmailAddress"], 'password' => $row["MyPassword"]);
    }
    echo json_encode($emparray);
    
    $conn->close();
}


/** Get Login user account **/
// if($_GET['username'] && $_GET['password']) {
//     getUserLogin($conn, $_GET['username'], $_GET['password']);    
// }

?>