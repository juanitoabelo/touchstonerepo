<?php

/***** Start Company Table Queries *****/

function createMyCompany($conn, $companyName, $companyType) {
    
    $sql = "INSERT INTO tblCompany (CompanyName, CompanyType) VALUES ($companyName, $companyType)";

    if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();
}

/* Get a piece of data from a company by Field Name */
 function getCompanyInfoByFieldName($conn, $fieldName,$rowID) {  
	$sql = "SELECT * FROM tblCompany WHERE CompanyID ='".$rowID."'";
    $result = $conn->query($sql);
	
    if ($result) {
		if (array_key_exists($fieldName,$result)) {
			$tempData = $result[$fieldName];
		} else {
			$tempData = "";
		}
	} else {
		$tempData = "";
	}
	
    echo json_encode($tempData);
    
    $conn->close();
    
}


/* Get single company info */
function getSingleCompanyInfo($conn, $tableId) {

	$sql = "SELECT * FROM tblCompany WHERE CompanyID ='".$tableId."'";
    $result = $conn->query($sql);
	
	$emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray = array('companyId' => $row["CompanyID"], 'companyName' => $row["CompanyName"]);
    }
    
    echo json_encode($emparray);
	
    $conn->close();
    
}

/* Get a piece of data from a company */
function getCompanyInfoAll($conn, $rowID) {

	$sql = "SELECT * FROM tblCompany WHERE CompanyID ='".$rowID."'";
    $result = $conn->query($sql);
	
	echo json_encode($result);
	
    $conn->close();
    
}

/* Set a piece of data for a company */
 function setCompanyInfo($conn, $fieldName,$fieldValue,$rowID) {
	
	$sql = "UPDATE tblCompany SET $fieldName='".$fieldValue."' WHERE CompanyID ='".$rowID."'";
    $result = $conn->query($sql);
    
    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
      echo "Error updating record: " . $conn->error;
    }
    
    $conn->close();
}


/* set multiple values for a company */
function setCompanyInfoArray($conn, $dataArr,$rowID) {

    $sql = "UPDATE tblCompany SET ";

    foreach($dataArr as $k => $v){
       $sql .= $k."='". $v."', ";
    }
    
    $sql = rtrim($sql, ", ");
    
    $sql .= " WHERE CompanyID ='".$rowID."'";
        
        
    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
      echo "Error updating record: " . $conn->error;
    }
    
    $conn->close();

}


/* Get Company List */
function getCompanyList() {
	// run the query
	$tempList = TblcompanyQuery::create()
		->orderByCompanyName()
		->setFormatter('PropelArrayFormatter')
		->find();
		
	if (isset($_SESSION['User']['Permissions']['allcompanies']) && $_SESSION['User']['Permissions']['allcompanies'] == 1) {
		return $tempList;
	}
	
	$companyList = array();
	foreach ($tempList as $myKey => $myVal) {
		if ($myVal['CompanyID'] == $_SESSION['User']['CompanyID']) {
			$companyList[$myKey] = $myVal;
		}
	}
	
	return $companyList;
}

?>