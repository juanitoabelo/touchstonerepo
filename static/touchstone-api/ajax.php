<?php
    header('Content-Type: application/json');
    include 'db-connection.php';
    include 'user-table.php';
    include 'company-table.php';
    include 'company-type-table.php';

    /** Main Database Function to delegate proper query to execute **/
    function queryHelper($conn) {
        
        var_dump($_GET);
        
        $dbTable = $_GET['dbTable'];
        $queryType = $_GET['queryType'];
        
        switch($_GET['dbTable']) {
            
            case 'tblCompany':
                getSingleCompanyInfo($conn, $_GET['CompanyID']);
                break;
                
            case 'tblUsers':
                    /** Get Login user account **/
                    if($_GET['username'] && $_GET['password']) {
                        getUserLogin($conn, $_GET['username'], $_GET['password']);    
                    }
                break;
                
            case 'tblCompanyType':    
                    getAllCompanyType($conn);
                break;
            
            case '':    
                    
                break;    
                
            default;    
        }
    }
    
    queryHelper($conn);
    
?>

