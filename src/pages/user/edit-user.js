import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
import { ButtonLink } from '@paljs/ui/Button';
import { Button } from '@paljs/ui/Button';
import { navigate } from 'gatsby';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { Component } from 'react';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { useForm } from "react-hook-form"
import User from '@paljs/ui/User';
import { isLoggedIn } from "../../components/services/auth"
import { getURLParams } from '../../components/utils/common';

import ProgressBar from 'react-bootstrap/ProgressBar'


const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const selectDepartmentOptions = [
  { value: '1', label: 'Administrators' },
];

const StatusDataOptions = [
  { value: 'InActive', label: 'InActive' },
  { value: 'Active', label: 'Active' },
];

const selectBoleanOptions = [
  { value: '0', label: 'No' },
  { value: '1', label: 'Yes' },
];

let PermissionNameString = '';
let CompanyNameString = '';

let IsCloserStatusString = ''; 
let IsRepStatusString = '';  
let UserStatusString = '';
let DepartmentNameString = '';

const isBrowser = typeof window !== "undefined"

export default class EditUser extends Component {
  state = {
    FirstName: '',
    LastName: '',
    EmailAddress: '',
    Password: '',
    Password2: '',
    CompanyID: '',
    DepartmentID: '',
    CompanyData: [],
    DepartmentData: [],
    UserAddedState: false,
    UserUpdatedState: false,
    UserPasswordUpdatedState: false,
    AuthorURL: '',
    TwitterURL: '',
    FacebookURL: '',
    GPlusURL: '',
    UserStatus: '',
    IsRepStatus: '', 
    IsCloserStatus: '',
    PermissionData: [],
    UserPermissionData: [],
    FullName: '',
    ImageURL: '',
    AuthorBio: '',
    CRMID: '',
    loaded: 0,
    selectedFile: null
  }
  
  componentWillUnmount(){
    this.setState({
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      Password: '',
      Password2: '',
      CompanyID: '',
      DepartmentID: '',
      CompanyData: [],
      DepartmentData: [],
      UserAddedState: false,
      UserUpdatedState: false,
      UserPasswordUpdatedState: false,
      AuthorURL: '',
      TwitterURL: '',
      FacebookURL: '',
      GPlusURL: '',
      UserStatus: '',
      IsRepStatus: '', 
      IsCloserStatus: '',
      PermissionData: [],
      UserPermissionData: [],
      FullName: '',
      ImageURL: '',
      AuthorBio: '',
      CRMID: '',
      loaded: 0,
      selectedFile: null
    })
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/"
    }
    const { saveState, state } = this;
    const UserID = getURLParams('UserID');

    /** Get All Company Details **/
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblUsers',
        queryType: 'getUserById',
        UserID: UserID,
      }
    })
    .then(function (response) {
       console.log('User Type Data: '+ JSON.stringify(response.data));
      saveState({
        UserData: response.data,
        FirstName: response.data.FirstName,
        LastName: response.data.LastName,
        EmailAddress: response.data.EmailAddress,
        CompanyID: response.data.CompanyID,
        FullName: response.data.FullName,
        DepartmentID: response.data.Department,
        AuthorURL: response.data.AuthorURL,
        TwitterURL: response.data.TwitterURL,
        FacebookURL: response.data.FacebookURL,
        GPlusURL: response.data.GPlusURL,
        UserStatus: response.data.UserStatus,
        IsRepStatus: response.data.IsRep,
        IsCloserStatus: response.data.IsCloser,
        ImageURL: response.data.ImageURL,
        AuthorBio: response.data.AuthorBio,
        CRMID: response.data.CRMID,
      });
       
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });


    /** Get All Company Details **/
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblCompany',
        queryType: 'getAllCompanyInfo'
      }
    })
    .then(function (response) {
       console.log('Company Type Data: '+ JSON.stringify(response.data));
      saveState({
        CompanyData: response.data
      });
       
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });

    /** Get All Company Details **/
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblDepartments',
        queryType: 'getAllDepartments'
      }
    })
    .then(function (response) {
       console.log('Departments Type Data: '+ JSON.stringify(response.data));
      saveState({
        DepartmentData: response.data
      });
       
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });

    
    /** Get All Company Details **/
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblPermissions',
        queryType: 'getAllPermission'
      }
    })
    .then(function (response) {
      //console.log('Departments Type Data: '+ JSON.stringify(response.data));
      saveState({
        PermissionData: response.data
      });
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });

    
      /** Get All User Permissions Details **/
      axios({
        method: 'get',
        url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
        params: {
          tblName: 'tblUserPermissions',
          queryType: 'getUserPermissionByUserID',
          UserID: UserID,
        }
      })
      .then(function (response) {
        //console.log('Departments Type Data: '+ JSON.stringify(response.data));
        saveState({
          UserPermissionData: response.data
        });
        
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (response) {
        // always executed
        console.log(response,`successfull`);
      });

  }

  saveState = (data) => {
    this.setState(data);
  }

  onAdddUser = () => {
    const { saveState, state } = this;
    const UserID = getURLParams('UserID');
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblUsers',
        queryType: 'addNewUserList',
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        EmailAddress: this.state.EmailAddress,
        Password: this.state.Password,
        CompanyID: this.state.CompanyID,
        DepartmentID: this.state.DepartmentID
      }
    })
    .then(function (response) {
      console.log(response,`Added New User successfull`);
      saveState({
        UserAddedState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  
  // On Update Admin Profile
  onUpdateAdminProfile = () => {
    const { saveState, state } = this;
    const UserID = getURLParams('UserID');
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblUsers',
        queryType: 'updateAdminProfile',
        DepartmentID: this.state.DepartmentID,
        UserStatus: this.state.UserStatus,
        IsRep: this.state.IsRepStatus,
        IsCloser: this.state.IsCloserStatus,
        CompanyID: this.state.CompanyID,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        EmailAddress: this.state.EmailAddress,
        AuthorURL: this.state.AuthorURL,
        AuthorBio: this.state.AuthorBio,
        TwitterURL: this.state.TwitterURL,
        FacebookURL: this.state.FacebookURL,
        GPlusURL: this.state.GPlusURL,
        ImageURL: this.state.ImageURL,
        UserID: UserID,
      }
    })
    .then(function (response) {
      console.log(response,`Updated Admin Profile Fields Section successfull`);
      saveState({
        UserUpdatedState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  onUpdateUserPassword = () => {
    const { saveState, state } = this;
    const UserID = getURLParams('UserID');

    if(this.state.Password != this.state.Password2){
      return false;
    }
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblUsers',
        queryType: 'updateUserPassword',
        MyPassword: this.state.Password,
        UserID: UserID,
      }
    })
    .then(function (response) {
      console.log(response,`Updated User Profile Password successfully`);
      saveState({
        UserPasswordUpdatedState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  // PermissionIDStatus 
  onUpdateUserPermission = () => {
    const { saveState, state } = this;
    const UserID = getURLParams('UserID');

    if(this.state.Password != this.state.Password2){
      return false;
    }
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblUsers',
        queryType: 'updateUserPermission',
        PermissionIDStatus: this.state.PermissionIDStatus,
        UserID: UserID,
      }
    })
    .then(function (response) {
      console.log(response,`Updated User Permission successfully`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  deleteUserPermission = (PermissionIDResult) => {
    const { saveState, state } = this;
    const UserID = getURLParams('UserID');

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblUserPermissions',
        queryType: 'deleteUserPermission',
        PermissionID: PermissionIDResult,
        UserID: UserID,
      }
    })
    .then(function (response) {
      console.log(response,`Updated User Permission successfully`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  /** Below are Form Field Event Functions **/
  onChangeStatus = (type, e) => {
     console.log(e.target.name);

    // CompanyID FirstName LastName EmailAddress EditTwitterURL EditFacebookURL EditGPlusURL  EditAuthorBio
    switch(e.target.name){
      case 'FirstName':
        this.saveState({
          FirstName: e.target.value
        });
        break;
      case 'LastName':
        this.saveState({
          LastName: e.target.value
        });
        break;
      case 'EmailAddress':
        this.saveState({
          EmailAddress: e.target.value
        });
        break;
      case 'Password':
        this.saveState({
          Password: e.target.value
        });
        break;
      case 'EditTwitterURL':
        this.saveState({
          TwitterURL: e.target.value
        });
        break;  
      case 'EditFacebookURL':
        this.saveState({
          FacebookURL: e.target.value
        });
        break;    
      case 'EditGPlusURL':
        this.saveState({
          GPlusURL: e.target.value
        });
        break;      
      case 'EditAuthorBio':
        this.saveState({
          AuthorBio: e.target.value
        });
        break;      

    }
    
  }

  onChangeDepartmentOptions = (e) => {
     //console.log(e.label);
    this.saveState({
      DepartmentID: e.value
    });
  }
  onChangeCompanyOption = (e) => {
    // console.log(e.label);
    this.saveState({
      CompanyID: e.value
    });
  }

  
  
  onChangeDropdown = (type, e) => {
     console.log(type);
    switch(type){
      case 'UserStatus':
        this.saveState({
          UserStatus: e.value
        });
        break; 
       
      case 'EditIsRep': 
        this.saveState({
          IsRepStatus: e.value
        });
        break;

      case 'EditIsCloser': 
        this.saveState({
          IsCloserStatus: e.value
        });
        break; 

        case 'PermissionID':
        this.saveState({
          PermissionIDStatus: e.value
        });
        break;
        
    }
    
  }
   
  onChangePassword = (type, e) => {
    console.log(type);
   switch(type){
     case 'MyPassword':
       this.saveState({
        Password: e.target.value
       });
       break; 
      
     case 'MyPassword2': 
       this.saveState({
        Password2: e.target.value
       });
       break;

   }
   
 }

 onChangeFileHandler = (e) => {
  const UserID = getURLParams('UserID');
  console.log(e.target.files[0]);
  console.log("File Name: "+e.target.files[0].name);
  const data = new FormData();
  data.append('file', this.state.selectedFile);

      var files = e.target.files
      if(this.maxSelectFile(e) && this.checkMimeType(e) && this.checkMimeType(e)){ 
      // if return true allow to setState
         this.setState({
        //  selectedFile: files,
         selectedFile: e.target.files[0],
        loaded: 0,
      })
   }

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblUsers',
        queryType: 'uploadProfileImage',
        UserID: UserID,
      },
      data,
      onUploadProgress: ProgressEvent => {
        console.log("File Uploaded: "+e.target.files[0]);
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
      }

    })
    .then(function (response) {
      console.log(response,`Updated User Permission successfully`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });



}
 

/** Below are for File Uploading Functions **/
maxSelectFile=(e)=>{
  let files = e.target.files // create file object
      if (files.length > 3) { 
         const msg = 'Only 3 images can be uploaded at a time'
         encodeURI.target.value = null // discard selected file
         console.log(msg)
        return false;

    }
  return true;

}

/** Checking Mime Type **/
checkMimeType=(e)=>{
  //getting file object
  let files = e.target.files 
  //define message container
  let err = ''
  // list allow mime type
 const types = ['image/png', 'image/jpeg', 'image/gif']
  // loop access array
  for(var x = 0; x<files.length; x++) {
   // compare file type find doesn't matach
       if (types.every(type => files[x].type !== type)) {
       // create error message and assign to container   
       err += files[x].type+' is not a supported format\n';
     }
   };

 if (err !== '') { // if message not same old that mean has error 
      e.target.value = null // discard selected file
      console.log(err)
       return false; 
  }
 return true;

}

/** Check File Size **/
checkFileSize=(e)=>{
  let files = e.target.files
  let size = 15000 
  let err = ""; 
  for(var x = 0; x<files.length; x++) {
  if (files[x].size > size) {
   err += files[x].type+'is too large, please pick a smaller file\n';
 }
};
if (err !== '') {
  e.target.value = null
  console.log(err)
  return false
}

return true;

}


  render(){
    const { state, onAdddUser, onChangeStatus, onChangeDepartmentOptions, onChangeCompanyOption, onChangeDropdown, onUpdateAdminProfile, onUpdateUserPassword, onChangePassword, onUpdateUserPermission, deleteUserPermission, onChangeFileHandler } = this;
    return (
      <>
        <SEO title="View/Edit User" />
        <div className="content-wrapper px-4 py-4">

        
        <Card>
            <CardBody>

              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">View/Edit User</h1>
                    </Col>
                  </Row>

                  <Row className="mb-5">
                    <Col breakPoint={{ xs: 12 }}>
                        <User name={this.state.FullName} />
                    </Col>
                  </Row>
                  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    { this.state.UserUpdatedState ? <div className="text-center text-success">Successfully Updating user Profile!</div> : null }
                      
                    <form>
                        <Row>

                        <Col breakPoint={{ xs: 12 }}>
                            <div class='form-group '>
                              <label htmlFor=""><strong>{this.state.FirstName} {this.state.LastName}'s Author/Profile URL</strong></label>
                              <label form='EditUser' for='ProfileURL' className='d-block d-md-none'>View Your Profile</label>
                              <span className='fntsz14 pdb25 form-control d-none d-md-block'>{this.state.AuthorURL }<span className='pdl6 pdr6'>&ndash;</span> <i className='fntsz13 pdr1'>Preview Your Profile Page</i><a href={this.state.AuthorURL} target='_blank' className='faHlp fa-eye'></a></span>
                            </div>
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                          <label form='EditUser' for='ArticlesURL' className=''><strong>{this.state.FirstName} {this.state.LastName}'s Articles</strong></label>
                          <span className='fntsz14 pdb25 form-control d-none d-md-block'> {this.state.AuthorURL+'Articles/'} <span className='pdl6 pdr6'>&ndash;</span> <i className='fntsz13 pdr1'>Preview Your Articles</i><a href={this.state.AuthorURL+'Articles/'} target='_blank' className='faHlp fa-eye'></a></span>
                          <span className='fntsz14 pdb25 form-control d-block d-md-none'>Preview Your Articles <a href={this.state.AuthorURL+'Articles/'} target='_blank' className='faHlp fa-eye'></a></span>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}><hr className="my-4"></hr></Col>
                          
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="CompanyID">Company</label> 
                            <SelectStyled options={state.CompanyData.map(({ companyId, companyName }) => { 
                              if(this.state.CompanyID == companyId){
                                CompanyNameString = companyName;
                              }
                                  return { value: companyId, label: companyName };
                                })}  placeholder={CompanyNameString} id="CompanyID" name="CompanyID" onChange ={onChangeCompanyOption.bind(this)} />
                          </Col> 
                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="FirstName">First Name</label>
                              <Input fullWidth size="Medium" className="FirstName">
                              <input type="text" placeholder="" value={this.state.FirstName} id="FirstName" name="FirstName" onChange ={onChangeStatus.bind(this,'FirstName')}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="LastName">Last Name</label>
                            <Input fullWidth size="Medium" className="LastName"> 
                              <input type="text" placeholder="" value={this.state.LastName} id="LastName" name="LastName" onChange ={onChangeStatus.bind(this, 'LastName')}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }} className="mb-5">
                          <label htmlFor="EmailAddress">Email</label>
                            <Input fullWidth size="Medium" className="EmailAddress">  
                              <input type="email" placeholder="" value={this.state.EmailAddress} id="EmailAddress" name="EmailAddress" onChange ={onChangeStatus.bind(this, 'EmailAddress')}/>
                            </Input>
                          </Col>

                        </Row>

                          <Row>        
                            <Col breakPoint={{ xs: 12 }}>
                                  <h2 className="text-center mb-5">SOCIAL MEDIA PROFILES</h2> 
                            </Col>
                            <Col breakPoint={{ xs: 12 }}>
                              <div className="form-group">
                                <label form='EditTwitterURL' for="EditTwitterURL" className="">{this.state.FirstName}'s Twitter Profile</label> 
                                <Input fullWidth size="Medium" className="EditTwitterURL">
                                  <input form='EditUser' type='url' className='text-input form-control' id="EditTwitterURL" name='EditTwitterURL' value={this.state.TwitterURL} placeholder='https://twitter.com/myUsername' onChange ={onChangeStatus.bind(this, 'EditTwitterURL')} />
                                </Input>
                              </div>
                            </Col>
                            <Col breakPoint={{ xs: 12 }}>
                              <div class="form-group">
                                <label form='EditFacebookURL' for="EditFacebookURL" className="">{this.state.FirstName}'s Facebook Profile</label>  
                                <Input fullWidth size="Medium" className="EditFacebookURL">
                                  <input form='EditUser' type='url' className='text-input form-control' id="EditFacebookURL" name='EditFacebookURL' value={this.state.FacebookURL} placeholder='https://www.facebook.com/myUsername' onChange ={onChangeStatus.bind(this, 'FacebookURL')} />
                                </Input>
                              </div> 
                            </Col>
                            <Col breakPoint={{ xs: 12 }}>
                              <div class="form-group">
                                <label form='EditGPlusURL' for="EditGPlusURL" className="">{this.state.FirstName}'s Google+ Profile</label>
                                <Input fullWidth size="Medium" className="EditGPlusURL">
                                  <input form='EditUser' type='url' className='text-input form-control' id="EditGPlusURL" name='EditGPlusURL' value={this.state.GPlusURL} placeholder='https://plus.google.com/+myUsername' onChange ={onChangeStatus.bind(this, 'GPlusURL')}/>
                                </Input>
                              </div>
                            </Col>
                            <Col breakPoint={{ xs: 12 }}><hr className="my-4"></hr></Col>     

                            <Col breakPoint={{ xs: 12 }}>
                              <div class="form-group">
                                <label form='EditImageURL' for="EditImageURL" className="">{this.state.FirstName}'s Profile Image</label>
                                <input type="file" name="EditImageURL" onChange={this.onChangeFileHandler} className='text-input form-control imageurl-form-control' id="EditImageURL" name='EditImageURL' value={this.state.ImageURL} />
                              </div>
                            </Col>
                            <Col breakPoint={{ xs: 12 }}>
                                <div class="form-group">
                                  <ProgressBar striped variant="success" color="success" now={50} value={this.state.loaded} className="py-3">{Math.round(this.state.loaded,2) }%</ProgressBar>
                                </div>
                            </Col>

                            <Col breakPoint={{ xs: 12 }}>
                              <div class="form-group">
                                <label form='EditAuthorBio' for="EditAuthorBio" className="">{this.state.FirstName}'s Bio</label>
                                <Input fullWidth shape="Round">
                                  <textarea rows={5} className='text-input form-control' id="EditAuthorBio" name='EditAuthorBio' value={this.state.AuthorBio} onChange ={onChangeStatus.bind(this, 'EditAuthorBio')} />
                                </Input>
                              </div>
                            </Col>


                          </Row>

                          
                          <Row>
                          <Col breakPoint={{ xs: 12 }}>
                                <h2 className="text-center">ADMIN SECTION</h2> 
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="DepartmentID">Department</label>
                            <SelectStyled options={this.state.DepartmentData.map(({ DepartmentID, DepartmentName }) => {
                                if(this.state.DepartmentID == DepartmentID ){
                                    DepartmentNameString = DepartmentName;
                                }
                                  return { value: DepartmentID, label: DepartmentName };
                                })}  placeholder={DepartmentNameString} id="DepartmentID" name="DepartmentID" onChange ={onChangeDepartmentOptions.bind(this)} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="Status">Status</label> 
                            <SelectStyled options={StatusDataOptions.map(({ value, label }) => { 
                                if( this.state.UserStatus == label){
                                  UserStatusString = label;
                                }
                                  return { value: value, label: label };
                                })}  placeholder={UserStatusString}   id="UserStatus" name="UserStatus" onChange ={onChangeDropdown.bind(this,'UserStatus')} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="EditIsRep">Representative?</label>
                            <SelectStyled options={selectBoleanOptions.map(({ value, label }) => { 
                                if(this.state.IsRepStatus == value ){
                                  IsRepStatusString = label;
                                }
                                  return { value: value, label: label };
                                })}  placeholder={IsRepStatusString}  id="EditIsRep" name="EditIsRep" onChange ={onChangeDropdown.bind(this,'EditIsRep')} />
                          </Col>
                          
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="EditIsCloser">Advocate?</label>
                            <SelectStyled options={selectBoleanOptions.map(({ value, label }) => {   
                                if(this.state.IsCloserStatus == value){
                                  IsCloserStatusString = label;
                                }
                                  return { value: value, label: label };
                                })}  placeholder={IsCloserStatusString}  id="EditIsCloser" name="EditIsCloser" onChange ={onChangeDropdown.bind(this,'EditIsCloser')} />
                          </Col>
                          
                          <Col breakPoint={{ xs: 6 }}>
                          <Button className="mb-3" status="Success" type="button" shape="SemiRound" onClick={onUpdateAdminProfile} fullWidth>UPDATE/SAVE {this.state.FirstName}'S PROFILE</Button>
                          { this.state.UserUpdatedState ? <div className="text-center text-success">Successfully Updated User Profile!</div> : null }
                          </Col>

                          <Col breakPoint={{ xs: 12 }}><hr className="my-4"></hr></Col>      

                        </Row>

                        <Row>
                          <Col breakPoint={{ xs: 12 }}>
                                <h2 className="text-center mb-5">RESET PASSWORD</h2> 
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="Password">Password</label>
                            <Input fullWidth size="Medium" className="Password">
                              <input type="password" placeholder="" id="Password" name="MyPassword" onChange ={onChangePassword.bind(this,'MyPassword')}/>
                            </Input>
                          </Col>      

                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="MyPassword2">Re-enter Password</label>
                            <Input fullWidth size="Medium" className="Password">
                              <input type="password" placeholder="" id="MyPassword2" name="MyPassword2" onChange ={onChangePassword.bind(this,'MyPassword2')}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 6 }}> 
                            <Button className="mb-3" status="Success" type="button" shape="SemiRound" onClick={onUpdateUserPassword} fullWidth>UPDATE/SAVE PASSWORD</Button>
                            { this.state.UserPasswordUpdatedState ? <div className="text-center text-success">Successfully Updated User Password!</div> : null }
                          </Col>

                          <Col breakPoint={{ xs: 12 }}><hr className="my-4"></hr></Col> 

                          <Col breakPoint={{ xs: 12 }}>
                                <h2 className="text-center mb-5">PERMISSION LIST</h2> 
                          </Col>

                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                            <label htmlFor="PermissionID">Select Permissions</label>  
                            <SelectStyled options={this.state.PermissionData.map(({ PermissionID, PermissionName }) => {   
                                  return { value: PermissionID, label: PermissionName };
                                })}   placeholder="Select" id="PermissionID" name="PermissionID" onChange ={onChangeDropdown.bind(this,'PermissionID')} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 3 }}>
                          <label htmlFor="PermissionID">&nbsp;</label>  
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateUserPermission} fullWidth>ADD</Button>
                            </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 12 }}> 
                            <table className="table table-striped">
                                <thead>
                                  <tr>
                                  <th scope="col">PERMISSION NAME</th>
                                    <th scope="col"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                
                                {this.state.UserPermissionData.map(({ UserPermissionID, UserID, PermissionIDResult }) => { 
                                    {this.state.PermissionData.map(({ PermissionID, PermissionName }) => { 
                                      if(PermissionID == PermissionIDResult) {
                                        PermissionNameString = PermissionName;
                                      }
                                    })}
                                  return (
                                      <tr> 
                                        <td scope="col">
                                        {PermissionNameString}
                                          </td>
                                        <td><Button onClick={deleteUserPermission.bind(this,PermissionIDResult)} id="submitButtons" status="Warning" type="button" shape="SemiRound" fullWidth className="submitButtons text-uppercase">Delete</Button></td>
                                      </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
                          </Col>
                      </Row>
                      
                    </form> 
                    </Col>
                  </Row>

                </Container>

            </CardBody>
          </Card>
          </div>
      </>
    );
  }
}