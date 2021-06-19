<?php
    //tblCompanyType
    function getAllCompanyType($conn) {

	$sql = "SELECT * FROM tblCompanyType";
    $result = $conn->query($sql);
	
	echo json_encode($result);
	
    $conn->close();  
}
?>