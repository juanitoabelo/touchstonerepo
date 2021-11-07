import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
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
import { isLoggedIn, isLoggedInUserID } from "../../components/services/auth"
import Alert from '@paljs/ui/Alert';
import { Accordion, AccordionItem } from '@paljs/ui/Accordion';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import User from '@paljs/ui/User';

import { getURLParams, stringFirstCharCapitalized } from '../../components/utils/common';

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const ErrorStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  small {
    margin-bottom: 3rem;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  a {
    max-width: 20rem;
  }
`;


const selectCompaignOption = [
  { value: '2', label: 'Apex Clients' },
  { value: '1', label: 'Apex Leads' },
  { value: '37', label: 'ATC Leads' },
  { value: '4', label: 'Cedar Ridge Leads' },
  { value: '39', label: 'Clearview Girls Academy Leads' },
  { value: '7', label: 'Elevations Leads'},
];

const selectAssignedRepresentativeOptions = [
  { value: '0', label: 'None' },
  { value: '189', label: 'Debbie Celani' },
  { value: '317', label: 'Jason Thielbahr' },
  { value: '321', label: 'Jason Thielbahr' },
  { value: '26', label: 'Kevin  Johnson' },
  { value: '322', label: 'Mary Louise Thielbahr' },
  { value: '323', label: 'Mike Linderman MA LCPC' },
  { value: '276', label: 'Paula Riggs' },
  { value: '272', label: 'Tara Heaton' },
];

const selectCardTypeOptions = [
  { value: 'Visa', label: 'Visa' },
  { value: 'MASTERCARD', label: 'Master Card' },
  { value: 'Discover', label: 'Discover' },
  { value: 'AMEX', label: 'American Express' },
];
const selectExpMonthOptions = [
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
];
const selectExpYearOptions= [
  { value: '2011', label: '2011' },
  { value: '2012', label: '2012' },
  { value: '2013', label: '2013' },
  { value: '2014', label: '2014' },
  { value: '2015', label: '2015' },
  { value: '2016', label: '2016' },
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
];


let CampaignIDTemp = '';  
let ClientCampaignName = '';
let ClientAssignedRepresentative = '';                        
let CancelCampaignBool = false;      
let AddTrackingNumberBool = false;
const isBrowser = typeof window !== "undefined"

export default class AddClient extends Component {

  state = {
      CampaignID: '',
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      HomePhone: '',
      WorkPhone: '',
      CellPhone: '',
      CSUserID: '',
      CSUserIDRepData: [],
      CampaignIDData: [],
      CardType: '',
      ExpMonth: '',
      ExpYear: '',
      BillAddress: '',
      BillCity: '',
      BillState: '',
      BillZip: '',
      BillCountry: '',
      CardNum: '',
      CardCode: '',
      isSaved : false,
      ClientData: [],
      UpdateClientInformationFormSuccessState: false,
      ClientCampaignsDataById: [],
      IPAddress: '',
      UserPermissionData: [],
      TrackingNumber: '',
      NoteText: '',
      ClientNotesData: [],
      ClientnoteIsSavedBool: false,
      ClientNoteStatus: '',
      ClientNoteEnteredDate: '',
      ClientCampaignIsSavedBool: false,
      ClientTodoList: [],
      UserAdminList: [],
      ToDoText: '', 
      ToDoReminderDate: '',
      ToDoUser: '',
      ClientTodoListAddedStatus: false
  }

  componentWillUnmount(){
    this.setState({
      CampaignID: '',
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      HomePhone: '',
      WorkPhone: '',
      CellPhone: '',
      CSUserID: '',
      CSUserIDRepData: [],
      CampaignIDData: [],
      CardType: '',
      ExpMonth: '',
      ExpYear: '',
      BillAddress: '',
      BillCity: '',
      BillState: '',
      BillZip: '',
      BillCountry: '',
      CardNum: '',
      CardCode: '',
      isSaved : false,
      ClientData: [],
      UpdateClientInformationFormSuccessState: false,
      ClientCampaignsDataById: [],
      IPAddress: '',
      UserPermissionData: [],
      TrackingNumber: '',
      NoteText: '',
      ClientNotesData: [],
      ClientnoteIsSavedBool: false,
      ClientNoteStatus: '',
      ClientNoteEnteredDate: '',
      ClientCampaignIsSavedBool: false,
      ClientTodoList: [],
      UserAdminList: [],
      ToDoText: '', 
      ToDoReminderDate: '',
      ToDoUser: '',
      ClientTodoListAddedStatus: false
    })
  }

  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/";
    }

    const { saveState, state } = this;
    const singleClientID = getURLParams('ClientID');
    const UserID = getURLParams('UserID');

    /** Get All User Representatives  Details **/
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblUsers',
        queryType: 'searchRepresentativeUsers'
      }
    })
    .then(function (response) {
      //  console.log('Representative User Data: '+ JSON.stringify(response.data));
      saveState({
        CSUserIDRepData: response.data
      });
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });

     /** Get All Campaigns Details **/
     axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblCampaigns',
        queryType: 'getAllCampaigns'
      }
    })
    .then(function (response) {
      //  console.log('Compaigns Type Data: '+ JSON.stringify(response.data));
      saveState({
        CampaignIDData: response.data,
      });
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });


     /** Get Clients Details By Id **/
     axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblClients',
        queryType: 'getClientById',
        ClientID: singleClientID
      }
    })
    .then(function (response) {
      //  console.log('Single Client Datails: '+ JSON.stringify(response.data));
      saveState({
        FirstName: response.data.FirstName,
        LastName: response.data.LastName,
        ClientID: response.data.ClientID,
        EmailAddress: response.data.EmailAddress,
        HomePhone: response.data.HomePhone,
        WorkPhone: response.data.WorkPhone,
        CellPhone: response.data.CellPhone,
        BillAddress: response.data.ShippingAddress1,
        ShippingAddress2: response.data.ShippingAddress2,
        BillCity: response.data.ShippingCity,
        BillState: response.data.ShippingState,
        BillZip: response.data.ShippingZip,
        BillCountry: response.data.BillCountry,
        IPAddress: response.data.IPAddress,
        MaskedCard: response.data.MaskedCard,
        CreatedDate: response.data.CreatedDate,
        First4: response.data.First4,
        Last4: response.data.Last4,
        IsPartial: response.data.IsPartial,
        PartialDate: response.data.PartialDate,
        PublisherID: response.data.PublisherID,
        SubID: response.data.SubID,
        CompanyID: response.data.CompanyID,
        ClickID: response.data.ClickID,
        LandingPageID: response.data.LandingPageID,
        ProductID: response.data.ProductID,
        CampaignID: response.data.CampaignID,
        LeadID: response.data.LeadID,
        ReferCompanyID: response.data.ReferCompanyID,
        ShippingCountry: response.data.ShippingCountry,
        CSUserID: response.data.CSUserID
      });
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });

    
    /** Get All Client Campaigns Details By Id **/
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblClientCampaigns',
        queryType: 'getClientCampaignById',
        ClientID: singleClientID
      }
    })
    .then(function (response) {
      //  console.log('Compaigns Type Data: '+ JSON.stringify(response.data));
      saveState({
        ClientCampaignsDataById: response.data,
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
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblUserPermissions',
        queryType: 'getUserPermissionByUserID',
        UserID: isLoggedInUserID(),
      }
    })
    .then(function (response) {
      // console.log('User Permission List: '+ JSON.stringify(response.data));
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

    

    /** Get Current Client Notes By Client Id **/
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblClientNotes',
        queryType: 'getClientNotesByID',
        ClientID: singleClientID
      }
    })
    .then(function (response) {
       //console.log('Client Notes List: '+ JSON.stringify(response.data)+ singleClientID);
      saveState({
        ClientNotesData: response.data
      });
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });


    /** Get All Leads To Do List By Lead id **/
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblToDo',
        queryType: 'getToDoListFromSingleClientEditPageById',
        ClientID: singleClientID
      }
    })
    .then(function (response) {
      //console.log('getToDoListFromSingleClientEditPageById Data: '+ JSON.stringify(response.data));
      saveState({
        ClientTodoList: response.data
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
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblUsers',
        queryType: 'getUserAdminList'
      }
    })
    .then(function (response) {
      //console.log('List Of Admin users: '+ JSON.stringify(response.data));
      saveState({
        UserAdminList: response.data
      });
       
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });
    

    /** Get users IP Address **/
    // axios.get('https://geolocation-db.com/json/')
    // .then(function (response) {
    //    console.log('Users Geolocation Data: '+ JSON.stringify(response.data));
    //   saveState({
    //     IPAddress: response.data.IPv4
    //   });
      
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })
    // .then(function (response) {
    //   // always executed
    //   console.log(response,`successfull`);
    // });



  }

  saveState = (data) => {
    this.setState(data);
  }
  
  onUpdateClient = () => {
    const { saveState, state } = this;
    const singleClientID = getURLParams('ClientID');
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblClients',
        queryType: 'UpdateClient',
        
        ClientID: singleClientID,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        EmailAddress: this.state.EmailAddress,
        HomePhone: this.state.HomePhone,
        WorkPhone: this.state.WorkPhone,
        CellPhone: this.state.CellPhone,
        BillAddress: this.state.BillAddress,
        BillCity: this.state.BillCity,
        BillState: this.state.BillState,
        BillZip: this.state.BillZip,
        BillCountry: this.state.BillCountry
      }
    })
    .then(function (response) {
      saveState({
        UpdateClientInformationFormSuccessState: true
      });
      console.log(response,`Updated Client Information successfull`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

  }

  /** Add Client Campaign **/
  onAddClientCampaign = () => {
    
    const { saveState, state } = this;
    const singleClientID = getURLParams('ClientID');
    
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblClientCampaigns',
        queryType: 'addClientCampaign',
        CampaignID: this.state.CampaignID,
        ClientID: singleClientID
      }
    })
    .then(function (response) {
      saveState({
        ClientCampaignIsSavedBool: true
      });
      console.log(response,`Added New Client successfull`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

  }

  /** Cancel Client Campaign **/
  cancelClientCampaign = () => {
    const { saveState, state } = this;
    const singleClientID = getURLParams('ClientID');

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblClientCampaigns',
        queryType: 'cancelClientCampaign',
        CampaignID: this.state.CampaignID,
        ClientID: singleClientID

      }
    })
    .then(function (response) {
      saveState({
        isSaved: true
      });
      console.log(response,`Added New Client successfull`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  onAddClientCampaignTrackingNumber = () => {
    const { saveState, state } = this;
    const singleClientID = getURLParams('ClientID');

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblClientCampaigns',
        queryType: 'addClientCampaignTrackingNumber',
        CampaignID: this.state.CampaignID,
        ClientID: singleClientID

      }
    })
    .then(function (response) {
      saveState({
        isSaved: true
      });
      console.log(response,`Added New Client successfull`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  onAddClientNote = () => { 
    const { saveState, state } = this;
    const singleClientID = getURLParams('ClientID');
    console.log('Client ID: '+singleClientID);
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblClientNotes',
        queryType: 'addNewClientNotes',
        EnteredBy: isLoggedInUserID(),
        ClientID: singleClientID,
        NoteText: this.state.NoteText,
        NoteType: 1,
        ClientNoteStatus: 'Active',
        ClientNoteEnteredDate: new Date().toLocaleString()
      }
    })
    .then(function (response) {
      saveState({
        ClientnoteIsSavedBool: true,
        ClientNotesData: [
          ...state.ClientNotesData,
          {
            EnteredBy: isLoggedInUserID(),
            ClientID: singleClientID,
            NoteText: state.NoteText,
            NoteType: 1,
            ClientNoteStatus: 'Active',
            ClientNoteEnteredDate: new Date().toLocaleString()
          }
        ]
      });
      console.log(response,`Added New Client Note successfull`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }
  





  onChangeStatus = (e) => {
     // v will be true or false
     console.log('Change Status: '+e.target.value);
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
         case 'HomePhone':
           this.saveState({
             HomePhone: e.target.value
           });
           break;

           case 'EditWorkPhone':
           this.saveState({
             WorkPhone: e.target.value
           });
           break;
           case 'EditCellPhone':
           this.saveState({
             CellPhone: e.target.value
           });
           break;
          case 'CardType':
          this.saveState({
            CardType: e.target.value
          });
          break;
        case 'ExpMonth':
          this.saveState({
            ExpMonth: e.target.value
          });
          break;
        case 'ExpYear':
          this.saveState({
            ExpYear: e.target.value
          });
          break;
        case 'EditShippingAddress1':
          this.saveState({
            BillAddress: e.target.value
          });
          break;
        case 'BillCity':
          this.saveState({
            BillCity: e.target.value
          });
          break;         
        case 'BillState':
          this.saveState({
            BillState: e.target.value
          });
          break;
        case 'BillZip':
          this.saveState({
            BillZip: e.target.value
          });
          break;  
        case 'BillCountry':
          this.saveState({
            BillCountry: e.target.value
          });
          break;
        case 'CardNum':
          this.saveState({
            CardNum: e.target.value
          });
          break;
        case 'CardCode':
          this.saveState({
            CardCode: e.target.value
          });
        break;

        case 'TrackingNumber':
          this.saveState({
            TrackingNumber: e.target.value
          });
        break;
         
        case 'NoteText':
          this.saveState({
            NoteText: e.target.value
          });
        break;

     }
  }

  onChangeCampaignOption = (e) => {
    console.log(e.value);
    this.saveState({
      CampaignID: e.value
    });
  }

  onChangeRepOption = (e) => {
    console.log(e.value);
    this.saveState({
      CSUserID: e.value
    });
  }

  onChangeCardTypeOption = (e) => {
    this.saveState({
      CardType: e.value
    });
  }

  onChangeMonthOption = (e) => {
    this.saveState({
      ExpMonth: e.value
    });
  }

  onChangeYearOption= (e) => {
    this.saveState({
      ExpYear: e.value
    });
  }
  

  onChangeTodoItemOption = (type, e) => {
    console.log('Type: '+type);
    switch(type){
      case 'ToDoText':
        console.log('Type: '+e.target.value);
          this.saveState({
            ToDoText: e.target.value
          });
      break; 
      case 'ToDoReminderDate':
        console.log('Value: '+e);
          this.saveState({
            ToDoReminderDate: e
          });
      break; 
      case 'ToDoUser':
        console.log('Value: '+e.value);
          this.saveState({
            ToDoUser: e.value
          });
      break; 
    }
  }


/** Adding a To Do Item for Client **/
  onAddToDo = (e) => {
    const { saveState, state } = this;
    const ClientID = getURLParams('ClientID');
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblToDo',
        queryType: 'addNewTodoSingleClientEditPage',
        ToDoReminderDate: state.ToDoReminderDate,
        ToDoText: state.ToDoText,
        ToDoUser: state.ToDoUser,
        ClientID: ClientID
      }
    })
    .then(function (response) {
     // console.log(`New To Do Item successfully Added: `+JSON.stringify(response.data));
      saveState({
        ClientTodoListAddedStatus: true,
        // ClientTodoList: state.ClientTodoList.filter(({ ClientID })=> ClientID != response.data),

        ClientTodoList: [
          ...state.ClientTodoList,
          {
            ToDoReminderDate: state.ToDoReminderDate,
            ToDoText: state.ToDoText,
            ToDoUser: state.ToDoUser,
            ClientID: ClientID
          }
        ]


      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
};

  // Set the To Do Item to Done
  onSetToDoneToDoList = (todoListId) => {
    console.log("updateToDoListToDone value: "+todoListId);
    const { saveState, state } = this;
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblToDo',
        queryType: 'updateToDoListToDone',
        ToDoID: todoListId
      }
    })
    .then(function (response) {
      //console.log(response,`Deleted To Do list successfull`);
      saveState({
        ClientTodoList: state.ClientTodoList.filter(({ ToDoID })=> ToDoID != todoListId)
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  };


  onSetToDoneClientNoteList = (clientNoteListId) => {
    //console.log("updateClientnoteListToDone value: "+clientNoteListId);
    const { saveState, state } = this;
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblClientNotes',
        queryType: 'updateClientNoteListToDone',
        ClientNoteListId: clientNoteListId
      }
    })
    .then(function (response) {
      console.log(response,`Deleted Client note successfull`);
      saveState({
        ClientNotesData: state.ClientNotesData.filter(({ ClientNoteID })=> ClientNoteID != clientNoteListId)
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  };

  render() {
    const { state, onChangeStatus, onUpdateClient, onChangeCampaignOption, onChangeRepOption, onChangeCardTypeOption, onChangeMonthOption, onChangeYearOption, onAddClientCampaign, cancelClientCampaign, onAddClientCampaignTrackingNumber, onAddClientNote, onSetToDoneToDoList, onAddToDo, onChangeTodoItemOption, onSetToDoneClientNoteList } = this;
    return (
      <>
        <SEO title="ADD USER" />
        <div className="content-wrapper px-4 py-4 edit-client-page">
  
        <Card>
            <CardBody>

              <Container>
                
                <Card className="Header-Form">
                    <CardBody className="header-body">
                    <div className="row justify-content-center">
                        <div class="col-md-12 head_wrap text-center">
                            <h3 className="">View/Edit: {this.state.FirstName} {this.state.LastName}</h3>
                        </div>
                    </div>
                        <div className="row status justify-content-center">
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-group">
                                    <label for="CSUserID" className="">Assigned Representative</label>
                                    <SelectStyled options={state.CSUserIDRepData.map(({ UserId, FullName }) => { 
                                      if( this.state.CSUserID == UserId ){
                                         ClientAssignedRepresentative = FullName;
                                      }
                                    return { value: UserId, label: FullName };
                                    })}  placeholder={ClientAssignedRepresentative} id="CSUserID" name="CSUserID" onChange ={onChangeRepOption.bind(this)} />
                                </div>
                                <div className="form-group text-center">
                                    <label class="text-center">
                                      <span className="d-block">Signup Date: <i>{this.state.CreatedDate}</i></span>
                                      <span className="d-block">IP Address: <i>{this.state.IPAddress}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                  </Card>



                   {/* CLIENT INFORMATION  */}
                   <Accordion className="mb-5">
                    <AccordionItem uniqueKey={16} title="CLIENT INFORMATION">
                        { this.state.UpdateClientInformationFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated</div> : null }
                    <Row className="mb-2">
                         <Col breakPoint={{ xs: 12, md: 6 }}>
                              <label htmlFor="FirstName">First Name</label>
                              <Input fullWidth size="Medium" className="FirstName">
                              <input type="text" placeholder="" value={this.state.FirstName} id="FirstName" name="FirstName" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
  
                          <Col breakPoint={{ xs: 12, md: 6 }}>
                          <label htmlFor="LastName">Last Name</label>
                            <Input fullWidth size="Medium" className="LastName">
                              <input type="text" placeholder="" value={this.state.LastName} id="LastName" name="LastName" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
  
                          <Col breakPoint={{ xs: 12, md: 6 }}>
                          <label htmlFor="EmailAddress">Email</label>
                            <Input fullWidth size="Medium" className="EmailAddress">
                              <input type="email" placeholder="" value={this.state.EmailAddress} id="EmailAddress" name="EmailAddress" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
  
                          <Col breakPoint={{ xs: 12, md: 6 }}>
                          <label htmlFor="HomePhone">Home Phone</label>
                            <Input fullWidth size="Medium" className="HomePhone">
                              <input type="text" placeholder="" id="HomePhone" value={this.state.HomePhone} name="HomePhone" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12, md: 6 }}>
                          <label htmlFor="EditWorkPhone">Work Phone</label>
                            <Input fullWidth size="Medium" className="EditWorkPhone">
                              <input type="email" placeholder="" value={this.state.WorkPhone} id="EditWorkPhone" name="EditWorkPhone" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
  
                          <Col breakPoint={{ xs: 12, md: 6 }}>
                          <label htmlFor="EditCellPhone">Cell Phone</label>
                            <Input fullWidth size="Medium" className="EditCellPhone">
                              <input type="text" placeholder="" value={this.state.CellPhone} id="EditCellPhone" name="EditCellPhone" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="EditShippingAddress1">Shipping Address</label>
                            <Input fullWidth size="Medium" className="EditShippingAddress1">
                              <input type="text" placeholder="" value={this.state.BillAddress} id="EditShippingAddress1" name="EditShippingAddress1" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }}>
                              <Row className="mb-0">
                                <Col breakPoint={{ xs: 12, md: 4 }}>
                                <label htmlFor="BillCity">Shipping City</label>
                                  <Input fullWidth size="Medium" className="BillCity">
                                    <input type="text" placeholder="" value={this.state.BillCity} id="BillCity" name="BillCity" onChange ={onChangeStatus.bind(this)}/>
                                  </Input>
                                </Col>
                                <Col breakPoint={{ xs: 12, md: 4 }}>
                                <label htmlFor="BillState">Shipping State</label>
                                    <Input fullWidth size="Medium" className="BillState">
                                      <input type="text" placeholder="" value={this.state.BillState} id="BillState" name="BillState" onChange ={onChangeStatus.bind(this)}/> 
                                    </Input>
                                </Col>
                                <Col breakPoint={{ xs: 12, md: 4 }}>
                                <label htmlFor="BillZip">Shipping Zip</label>
                                  <Input fullWidth size="Medium" className="BillZip">
                                    <input type="text" placeholder="" value={this.state.BillZip} id="BillZip" name="BillZip" onChange ={onChangeStatus.bind(this)}/>
                                  </Input>
                                </Col>
                              </Row>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }}>
                          <label htmlFor="BillCountry">Shipping Country</label>
                            <Input fullWidth size="Medium" className="BillCountry">
                              <input type="text" placeholder="" value={this.state.BillCountry} id="BillCountry" name="BillCountry" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateClient} fullWidth> UPDATE/SAVE  {this.state.FirstName} {this.state.LastName}'S CLIENT INFORMATION</Button>
                        </Col>
			                  
                      </Row>
                    </AccordionItem>
                    </Accordion>
                    {/* CLIENT INFORMATION  */}



                   <div className="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <h3 className="">CAMPAIGN/SERVICE LIST</h3>
                        </div>
                    </div>                   

                    <Row className="justify-content-center align-items-center mb-5">
                      <Col className="col-lg-12">
                      { this.state.ClientCampaignIsSavedBool ? <div className="text-center text-success mb-4">Successfully added a new Client Campaign</div> : null }
                        <form>
                            <Row>
                              <Col breakPoint={{ xs: 12 }}>
                                <label htmlFor="CampaignID">Add a new campaign for {this.state.FirstName} {this.state.LastName}</label>
                                <SelectStyled options={state.CampaignIDData.map(({ CampaignID, CampaignName }) => { 
                                      return { value: CampaignID, label: CampaignName };
                                    })}  placeholder={state.CampaignName}  placeholder="Select" id="CampaignID" name="CampaignID" onChange ={onChangeCampaignOption.bind(this)} />
                              </Col>                  
                              <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 3 }} >
                                  <Button status="Success" type="button" shape="SemiRound" onClick={onAddClientCampaign} fullWidth>Add Campaign</Button>
                              </Col>
                          </Row>
                        </form> 
                      </Col>
                    </Row>

                    <Row className="justify-content-center align-items-center mb-5">
                    
                      <Col className="col-lg-12"><h3 className="">Campaign/Service List</h3></Col>

                      <Col className="col-lg-12">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">NAME</th>
                              <th scope="col">TYPE</th>
                              <th scope="col">FULFILLMENT ID</th>
                              <th scope="col">TRACKING #</th>
                              <th scope="col">DATE</th>
                              <th scope="col">STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                          
                          {this.state.ClientCampaignsDataById.map(({ ClientID, CampaignType, ClientCampaignID, FulfillmentID, TrackingNumber, Status, StatusDate }) => { 

                              state.CampaignIDData.map(({ CampaignID, CampaignName }) => { 
                                if(CampaignID == ClientCampaignID){  
                                  ClientCampaignName = CampaignName;
                                }
                              });

                              // {console.log("User Permission Data: "+this.state.UserPermissionData)}
                              {this.state.UserPermissionData.map(({ UserPermissionID, UserID, PermissionIDResult }) => { 
                                // console.log('Permission Id: '+PermissionIDResult+ Status);
                                if(Status == 'Active' && PermissionIDResult == 1){
                                  CancelCampaignBool = true;
                                }
                                if(PermissionIDResult == 1){
                                  AddTrackingNumberBool = true;
                                }
                              })}

                              return (
                                <tr  key={ClientCampaignID}>
                                  <td scope="col">{ClientCampaignName}</td>
                                  <td>{CampaignType}</td>
                                  <td>{FulfillmentID}</td>
                                  <td>{ AddTrackingNumberBool == true ? <Input fullWidth size="Medium"><input type="text" placeholder="" value={this.state.TrackingNumber} id="TrackingNumber" name="TrackingNumber" onChange ={onChangeStatus.bind(this)} className="mr-2"/> <Button status="Success" type="button" shape="SemiRound" onClick={onAddClientCampaignTrackingNumber} fullWidth>Save</Button></Input>  : TrackingNumber }</td>
                                  <td>{StatusDate}</td>
                                  <td>{Status} {CancelCampaignBool == true ? <a href="/#" class="page-links color-red text-decoration-none" value={ClientCampaignID} onClick={cancelClientCampaign.bind(this)}>Cancel</a> : ''}</td>
                                </tr>
                                );
                              
                            })}
                          </tbody>
                        </table>
                        </Col>
                    </Row>






                    <div className="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <h3 className="">CLIENT NOTES</h3>
                        </div>
                    </div>                   

                    <Row className="justify-content-center align-items-center mb-5">
                      <Col className="col-lg-12">
                      { this.state.ClientnoteIsSavedBool ? <div className="text-center text-success mb-4">Successfully added a new Client Note!</div> : null }

                        <form>
                            <Row>
                              <Col breakPoint={{ xs: 12, md: 10 }}>
                                <label htmlFor="AddNote">Add a new client note for {this.state.FirstName} {this.state.LastName}</label> 
                                <Input fullWidth size="Medium"><input type="text" placeholder="" value={this.state.NoteText} id="NoteText" name="NoteText" onChange ={onChangeStatus.bind(this)}/></Input>
                              </Col>                  
                              <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 2 }} >
                                <label>&nbsp;</label>
                                  <Button status="Success" type="button" shape="SemiRound" onClick={onAddClientNote} fullWidth>+ Add Note</Button>
                              </Col>
                          </Row>
                        </form> 
                      </Col>
                    </Row>

                    <Row className="justify-content-center align-items-center mb-5">
                    
                      <Col className="col-lg-12"><h3 className="">Client Notes List</h3></Col>

                      <Col className="col-lg-12">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Entered By</th>
                              <th>Date</th>
                              <th>Note</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                          
                          {this.state.ClientNotesData.map(({ EnteredBy, EnteredDate, NoteText, ClientNoteID }) => { 

                              return (
                                <tr  key={EnteredBy}>
                                  <td scope="col">{EnteredBy}</td>
                                  <td>{EnteredDate}</td>
                                  <td>{NoteText}</td>
                                  <td className="text-center"><Checkbox status="Dangerd" name="setToDoneClientNote" onChange={onSetToDoneClientNoteList.bind(this,ClientNoteID)}></Checkbox></td>
                                </tr>
                                );
                              
                            })}
                          </tbody>
                        </table>
                        </Col>
                    </Row>

                </Container>
                            

                <Container>
                  <Row className="justify-content-center align-items-left mb-5">
                    <Col breakPoint={{ xs: 12 }}>
                      <h2 className="text-left mb-5">TO DO ITEMS</h2>
                    </Col>
                    <Col breakPoint={{ xs: 12 }}>
                    { this.state.ClientTodoListAddedStatus ? <div className="text-center text-success mb-4">Successfully Added To Do List</div> : null }
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="ToDoText">Add a new to-do item for {stringFirstCharCapitalized(this.state.FirstName.toLowerCase())} {stringFirstCharCapitalized(this.state.LastName.toLowerCase())}</label>
                        </Col>
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <Input fullWidth size="Medium" className="Name">
                            <input type="text" placeholder={'Follow up with'+ this.state.FirstName+' by phone; then by email if unavailable.'} id="ToDoText" name="ToDoText" onChange ={onChangeTodoItemOption.bind(this, 'ToDoText')}/>
                          </Input>
                        </Col>
                        <Col className="col-lg-3">
                          <label htmlFor="ToDoReminderDate">Reminder Date:</label> 
                          <Input fullWidth size="Medium" className="notes">
                            <DatePicker id="ToDoReminderDate" name="ToDoReminderDate" selected={this.state.ToDoReminderDate}  onChange={onChangeTodoItemOption.bind(this, 'ToDoReminderDate')} />
                          </Input>
                        </Col>
                        <Col className="col-lg-3">
                          <label htmlFor="ToDoUser">User:</label>
                          <Select options={this.state.UserAdminList.map(({ UserID, FullName }) => { 
                                          return { value: UserID, label: FullName };
                                        })} placeholder={this.state.ToDoUser} value={this.state.ToDoUser.value} id="ToDoUser" name="ToDoUser" onChange ={onChangeTodoItemOption.bind(this, 'ToDoUser')} />
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 3 }}>
                        <label htmlFor="ToDoReminderDates">&nbsp;</label>
                          <Button status="Warning" type="button" shape="SemiRound" onClick={onAddToDo} fullWidth className="text-uppercase">+ ADD To DO</Button>
                        </Col>
                      </Row>
                      <Row className="justify-content-left align-items-left mb-5">
                        <Col className="col-lg-12">
                          <h4>To Do Items List</h4>
                        </Col>
                        <Col className="col-lg-12">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                              <th scope="col">TO DO ITEM</th>
                                <th scope="col">DATE CREATED</th>
                                <th scope="col">DUE DATE</th>
                                <th scope="col" className="text-center">STATUS</th>
                              </tr>
                            </thead>
                            <tbody>
                              
                            {this.state.ClientTodoList.map(({ ToDoID, UserID, ToDoText, CreatedDate,FinishedDate, ReminderDate, Status, ClientID, LeadID, IsRead }) => { 

                              return (
                                  <tr> 
                                    <td scope="col">{ToDoText}</td>
                                    <td>{CreatedDate}</td>
                                    <td>{ReminderDate}</td>
                                    <td className="text-center"><Checkbox status="Dangerd" name="setToDone" onChange={onSetToDoneToDoList.bind(this,ToDoID)}></Checkbox></td>
                                  </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </Col>
                        <Col className="col-lg-3 d-none">
                          <label htmlFor="submitButtons">&nbsp;</label>
                          <Button id="submitButtons" status="Warning" type="button" shape="SemiRound" fullWidth className="submitButtons text-uppercase">UPDATE/SAVE TO DO'S</Button>
                        </Col>
                      </Row>
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