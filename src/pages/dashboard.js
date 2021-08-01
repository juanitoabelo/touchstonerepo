import React, { Component } from 'react';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import Select from '@paljs/ui/Select';
import styled from 'styled-components';
import { Button } from '@paljs/ui/Button';
import { Link } from 'gatsby';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';

import { Container, Input } from '@material-ui/core';
import { Card, CardBody } from '@paljs/ui/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import SEO from '../components/SEO';
import { isLoggedIn, getUser } from "../components/services/auth"

import { 
  getURLParams, leadStatus, leadDisposition, 
  leadCrisisScale, leadYesNo, leadUsers, objLeadInfo,
  objLeadInfoText, stringFirstCharCapitalized, leadAdmins
} from '../components/utils/common';

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
    text-align: left;
  }
  a {
    max-width: 20rem;
  }
`;

const isBrowser = typeof window !== "undefined"

export default class Home extends Component  {

  state = {
    UserAdminList: [],
    ToDoText: '', 
    ToDoReminderDate: '',
    ToDoUser: '',
    UserID: '',
    UserTodoList: [],
    TodoListItem: '',
    ToDoUserListId: '',
  };

  componentWillUnmount(){
    this.setState({
      UserAdminList: [],
      ToDoText: '', 
      ToDoReminderDate: '',
      ToDoUser: '',
      UserID: '',
      UserTodoList: [],
      TodoListItem: '',
      ToDoUserListId: '',
    })  
  }

  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
        window.location.href="/";
      }

      const { saveState } = this;

      /** Get All Company Details **/
      axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
       params: {
         tblName: 'tblUsers',
         queryType: 'getUserAdminList'
       }
     })
     .then(function (response) {
       console.log('User Admin Data: '+ JSON.stringify(response.data));
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


     /** Get All Company Details **/
     axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblToDo',
        queryType: 'getToDoListFromDashBoarByUserId',
        UserID: this.state.UserID !='' ? this.state.UserID : getUser().userid
      }
    })
    .then(function (response) {
      console.log('getToDoListFromDashBoarByUserId Data: '+ JSON.stringify(response.data));
      saveState({
       UserTodoList: response.data
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


    saveState = (obj) => {
      this.setState(obj);
    }


  onAddToDo = (e) => {
    const { saveState, state } = this;
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblToDo',
        queryType: 'addNewTodoDashBoard',
        ToDoReminderDate: state.ToDoReminderDate,
        ToDoText: state.ToDoText,
        ToDoUser: state.ToDoUser,
      }
    })
    .then(function (response) {
      console.log(`New To Do Item successfully Added: `+JSON.stringify(response.data));
      saveState({
        UserTodoList: state.UserTodoList.filter(({ ToDoID })=> ToDoID != response.data)
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
};

  onSearchToDoItemListByUserId = (e) => {
    const { saveState } = this;
    /** Get All Company Details **/
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblToDo',
        queryType: 'getToDoListFromDashBoarByUserId',
        UserID: this.state.ToDoUserListId
      }
    })
    .then(function (response) {
      console.log('onSearchToDoItemListByUserId Data: '+ JSON.stringify(response.data));
      saveState({
       UserTodoList: response.data
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

  onChangeToDoUserListOption = (e) => {
    console.log('To Do Text: '+e.value);
    this.saveState({
      ToDoUserListId: e.value
    });
  }

  // Set the To Do Item to Done
   onSetToDoneToDoList = (todoListId) => {
    console.log("updateToDoListToDone value: "+todoListId);
    const { saveState, state } = this;
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
          tblName: 'tblToDo',
          queryType: 'updateToDoListToDone',
          ToDoID: todoListId
      }
    })
    .then(function (response) {
      console.log(response,`Deleted Company Insurance successfull`);
      saveState({
        UserTodoList: state.UserTodoList.filter(({ ToDoID })=> ToDoID != todoListId)
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  };


  onChangeOption = (e) => {
    console.log('To Do Text: '+e.value);
    this.saveState({
      ToDoUser: e.value
    });
  }
  onChangeInput = (e) => {
    console.log('To Do Text: '+e.target.value);
    this.saveState({
      ToDoText: e.target.value
    });
  }
  onChangeDate = (date) => {
    console.log('Date: '+date);
    this.saveState({
      ToDoReminderDate: date
    });
  }


  render() {
    const { onChangeInput, onChangeDate, onChangeOption,onAddToDo, onChangeToDoUserListOption, onSearchToDoItemListByUserId, onSetToDoneToDoList, state } = this;
  return (
    <>
    <div className="content-wrapper px-4 py-4">
      <SEO title="Home" />
      <Card>
        <CardBody>
          <ErrorStyle>
            <h1>TO DO ITEMS</h1>
          </ErrorStyle>

          <Container>
          <Row className="justify-content-center align-items-left mb-5 pb-5">
            <Col breakPoint={{ xs: 12 }}>
              <Row className="mb-2">
                <Col breakPoint={{ xs: 12 }} className="mb-2">
                <label htmlFor="ToDoText"><strong>Add a new to-do item</strong></label>
                  <InputGroup fullWidth size="Medium" className="Name">
                    <input type="text" placeholder='Follow up by phone; then by email if unavailable.' id="ToDoText" name="ToDoText" onChange={onChangeInput.bind(this)}/>
                  </InputGroup>
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="ToDoReminderDate">Reminder Date:</label>
                  <InputGroup fullWidth size="Medium" className="notes">  
                    <DatePicker id="ToDoReminderDate" name="ToDoReminderDate" selected={state.ToDoReminderDate} value={state.ToDoReminderDate} onChange={onChangeDate.bind(this)} />
                  </InputGroup>
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="ToDoUser">User:</label>
                  <Select options={state.UserAdminList.map(({ UserID, FullName }) => { 
                                  return { value: UserID, label: FullName };
                                })} placeholder={state.ToDoUser} value={state.ToDoUser.value} id="ToDoUser" name="ToDoUser" onChange ={onChangeOption.bind(this)} />
                </Col>

                <Col breakPoint={{ xs: 12, md: 3 }}>
                <label htmlFor="submitButtons">&nbsp;</label>
                  <Button status="Warning" type="button" shape="SemiRound" onClick={onAddToDo} fullWidth className="text-uppercase">+ ADD TO DO</Button>
                </Col>
              </Row>
              <Row className="justify-content-left align-items-left mt-5">
                <Col className="col-lg-12">
                  <h4>To Do Items List</h4>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col className="col-lg-3">
                  <Select options={state.UserAdminList.map(({ UserID, FullName }) => { 
                                  return { value: UserID, label: FullName };
                                })} placeholder={state.ToDoUserListId} value={state.ToDoUserListId.value} id="ToDoUserListId" name="ToDoUserListId" onChange ={onChangeToDoUserListOption.bind(this)} />
                </Col>
                <Col breakPoint={{ xs: 12, md: 3 }}>
                  <Button status="Warning" type="button" shape="SemiRound" onClick={onSearchToDoItemListByUserId} fullWidth className="text-uppercase">+ VIEW TO DO LIST</Button>
                </Col>
              </Row>

                <Row>
                <Col className="col-lg-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Lead</th>
                        <th scope="col">Text</th>
                        <th scope="col">SOURCE</th>
                        <th scope="col">CREATED</th>
                        <th scope="col">DEADLINE</th>
                        <th scope="col">LAST MOD</th>
                        <th scope="col">DONE</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {this.state.UserTodoList.map(({ ToDoID, UserID, ToDoText, CreatedDate,FinishedDate, ReminderDate, Status, ClientID, LeadID, IsRead, FirstName, LastName, HomePhone, Disposition, LastModifiedDate }) => { 
                          let LeadFullName = '';
                          let isWithLead = false;
                          let disposition = '';
                           console.log('LastModifiedDate; '+LastModifiedDate);
                          //  let lastModifiedDate = LastModifiedDate != ? new Date(LastModifiedDate) : '';
                          { if(LeadID != 0){
                              // To do: Loop the list of Lead Information with the LeadId
                              LeadFullName = FirstName +' '+LastName+' '+HomePhone;
                              isWithLead = true;
                            } else {
                              // To do: Display 'N/A'
                              LeadFullName = 'N/A';
                              isWithLead = false;
                            }
                          }

                         // Disposition Condition 
                         if(Disposition == 6){
                            disposition = 'Phone Call';
                         } else if(Disposition == 4){
                            disposition = 'Missed Call';
                         } else if(Disposition==5){
                            disposition = 'Form Fill';
                         } else {
                            disposition = 'None';
                         }

                        return (
                      <tr> 
                        <td scope="col">{LeadFullName}</td>
                        <td>
                          {/* { isWithLead ? <Link className="color-red text-decoration-none" name="todolistitem" value={ToDoID} onClick={onReadAddToDo.bind(this)} to={"/leads/edit-lead/?leadID="+LeadID+'&ToDoID='+ToDoID}>{ToDoText}</Link> :  ToDoText } */}
                          { IsRead == 0 && isWithLead == true ? <Link className="color-red text-decoration-none font-weight-bold" name="todolistitem" to={"/leads/edit-lead/?leadID="+LeadID+'&ToDoID='+ToDoID}>{ToDoText}</Link> : '' }
                          { IsRead == 1 && isWithLead == true ? <Link className="color-red  text-decoration-none" to={"/leads/edit-lead/?leadID="+LeadID+'&ToDoID='+ToDoID}>{ToDoText}</Link> : '' }
                          { isWithLead == false ? ToDoText : '' }
                        </td>
                        <td>{disposition}</td>
                        <td>{CreatedDate}</td>
                        <td>{ReminderDate}</td>
                        <td>{LastModifiedDate}</td>
                        <td>
                          <Checkbox status="Dangerd" name="setToDone" onChange={onSetToDoneToDoList.bind(this,ToDoID)}></Checkbox></td>
                      </tr>
                      );
                    })}
                    </tbody>
                  </table>
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
};