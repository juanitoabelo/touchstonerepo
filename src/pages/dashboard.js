import React, { Component } from 'react';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import Select from '@paljs/ui/Select';
import styled from 'styled-components';
import { Button } from '@paljs/ui/Button';

import { InputGroup } from '@paljs/ui/Input';

import { Container, Input } from '@material-ui/core';
import { Card, CardBody } from '@paljs/ui/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import SEO from '../components/SEO';
import { isLoggedIn } from "../components/services/auth"

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

  };

  componentWillUnmount(){
    this.setState({
      UserAdminList: [],
      ToDoText: '', 
      ToDoReminderDate: '',
      ToDoUser: '',

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

  }


    saveState = (obj) => {
      this.setState(obj);
    }

/*
    searchMe = () => {
      const { saveState, state: { searchFor, searchBy } } = this;
      this.setState({
        data: [],
        tempData: [],
        searchBy: 'Name',
        searchFor: '',
        error: false,
        errorMsg: '',
        perpage: 10,
        current: 0,
        pagination: 1,
        togglePName: true,
        loader: 'Loading!!!'
      });
      axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
        params: {
          searchFor: searchFor,
          searchBy: searchBy,
          tblName: 'tblProducts',
          queryType: 'searchType'
        }
      })
      .then(function ({ data }) {
        let error = false;
        let errorMsg = '';
        if(data.length <= 0) {
          error = true;
          errorMsg = __noProduct;
        }
        saveState({
          data,
          tempData: data,
          error,
          errorMsg
        });
      })
      .catch(function (error) {
        console.log(error);
        saveState({
          error: 'error'
        });
      });
    }
    display = ({ data, loader, error, errorMsg, current, perpage, pagination }) => {
      const { pageFunc, pageFuncLimit, sortCol, onChangeDropdown, manipulateData, resetMe } = this;
      const advanceSearchBy = [
        { value: 'ProductName', label: 'SERVICE NAME' },
        { value: 'CompanyName', label: 'Company' },
        { value: 'ProductStatus', label: 'STATUS' }
      ];
      if(data !== undefined && data.length > 0) {
        const pageData = data.slice(current, current+perpage);
        const max = (Math.floor(data.length/perpage)) + (Math.floor(data.length%perpage)>0 ? 1 : 0);
        return (<div>
          <AdvanceSearch dropdown={advanceSearchBy} searchMe={manipulateData} resetMe={resetMe} />
          <table className="table table-striped table-hover">
            <thead>
                <tr>
                  <th scope="col">ACTION</th>
                  <th scope="col" onClick={sortCol.bind(this, 'ProductName')}>SERVICE NAME</th>
                  <th scope="col" onClick={sortCol.bind(this, 'CompanyName')}>Company</th>
                  <th scope="col" onClick={sortCol.bind(this, 'ProductStatus')}>STATUS</th>
                </tr>
            </thead>
            <tbody>
            {
              pageData.map(({ ProductID, ProductName, CompanyName, ProductStatus, CompanyID })=>{
                return (<tr key={ProductID}>
                  <td>
                    <Link className="color-red text-decoration-none" to={"/product/edit-product?prodId="+ProductID+"&companyId="+CompanyID}>Edit/View</Link>
                    </td>
                  <td>{ProductName}</td>
                  <td>{CompanyName}</td>
                  <td>{ProductStatus}</td>
                </tr>);
              })
            }
            </tbody>
        </table>
          <nav aria-label="Page navigation example">
          <Container>
              <Row>
                <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 8 }}>
                <ul class="pagination">
                    <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'first', perpage, max, 0)}>«</a></li>
                    <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'prev', perpage, max, 0)}>‹</a></li>
                    {paginateLimit(max, pageFuncLimit, pagination)}
                    <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'next', perpage, max, 0)}>›</a></li>
                    <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'last', perpage, max, 0)}>»</a></li>
                </ul>
                </Col>
                <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 4 }}>
                    <SelectStyled options={perPageLimitList}  placeholder={perpage} value={perpage} id="perPage" name="perPage" onChange ={onChangeDropdown.bind(this)} />
                </Col>
              </Row>
           </Container>
          </nav>
      </div>);
      }
      if (error) {
        switch(errorMsg) {
          case __noProduct:
            return (
            <div>
              <AdvanceSearch dropdown={advanceSearchBy} searchMe={manipulateData} resetMe={resetMe} />
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">ACTION</th>
                    <th scope="col">SERVICE NAME</th>
                    <th scope="col">Company</th>
                    <th scope="col">STATUS</th>
                  </tr>
                </thead>
              </table>
            </div>
            );
          default: 
            break;
        }
      }
      return loader;
    }

*/


  onAddToDo = (e) => {
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblToDo',
        queryType: 'addNewTodo',
        ToDoReminderDate: this.state.ToDoReminderDate,
        ToDoText: this.state.ToDoText,
        ToDoUser: this.state.ToDoUser,
      }
    })
    .then(function (response) {
      console.log(response,`New Product Info successfully Added`);
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
    const { onChangeInput, onChangeDate, onChangeOption,onAddToDo,  state } = this;
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
                                })} placeholder={state.ToDoUser} value={state.ToDoUser.value} id="ToDoUser" name="ToDoUser" onChange ={onChangeOption.bind(this)} />
                </Col>
                <Col breakPoint={{ xs: 12, md: 3 }}>
                  <Button status="Warning" type="button" shape="SemiRound" fullWidth className="text-uppercase">+ VIEW TO DO LIST</Button>
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
                      <tr> 
                        <td scope="col"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                {/* <Col className="col-lg-3">
                  <label htmlFor="ToDoReminderDate">Reminder Date:</label>
                  <InputGroup fullWidth size="Medium" className="notes">
                    <DatePicker id="ToDoReminderDate" name="ToDoReminderDate" selected={LeadInfo.ToDoReminderDate} value={LeadInfo.ToDoReminderDate} onChange={onChangeDate.bind(this, 'ToDoReminderDate')} />
                  </InputGroup>
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="ToDoUser">User:</label>
                  <Select options={leadAdmins} placeholder={LeadInfo.ToDoUser.label} value={LeadInfo.ToDoUser.value} id="ToDoUser" name="ToDoUser" onChange ={onChangeOption.bind(this, 'ToDoUser')} />
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="submitButtons">&nbsp;</label>
                  <Button id="submitButtons" status="Warning" type="button" shape="SemiRound" fullWidth className="submitButtons text-uppercase">UPDATE/SAVE TO DO'S</Button>
                </Col> */}
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