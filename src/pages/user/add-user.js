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
import { isLoggedIn } from "../../components/services/auth"

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const selectDepartmentOptions = [
  { value: '1', label: 'Administrators' },
];

const isBrowser = typeof window !== "undefined"

export default class Index extends Component {
  state = {
    FirstName: '',
    LastName: '',
    EmailAddress: '',
    Password: '',
    CompanyID: '',
    DepartmentID: '',
    CompanyData: [],
    DepartmentData: [],
    UserAddedState: false,
  }
  
  componentWillUnmount(){
    this.setState({
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      Password: '',
      CompanyID: '',
      DepartmentID: '',
      CompanyData: [],
      DepartmentData: [],
      UserAddedState: false,
    })
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/"
    }
    const { saveState, state } = this;

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
       //console.log('Company Type Data: '+ JSON.stringify(response.data));
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
       //console.log('Departments Type Data: '+ JSON.stringify(response.data));
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

  }

  saveState = (data) => {
    this.setState(data);
  }

  onAdddUser = () => {
    const { saveState, state } = this;
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
  onChangeStatus = (e) => {
    // console.log(e.target.name);
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
  
  render(){
    const { state, onAdddUser, onChangeStatus, onChangeDepartmentOptions, onChangeCompanyOption } = this;
    return (
      <>
        <SEO title="ADD USER" />
        <div className="content-wrapper px-4 py-4">

        
        <Card>
            <CardBody>

              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">ADD USER</h1>
                    </Col>
                  </Row>

                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    { this.state.UserAddedState ? <div className="text-center text-success">Successfully added a new user!</div> : null }
                      
                    <form>
                        <Row>
                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="FirstName">First Name</label>
                              <Input fullWidth size="Medium" className="FirstName">
                              <input type="text" placeholder="" id="FirstName" name="FirstName" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="LastName">Last Name</label>
                            <Input fullWidth size="Medium" className="LastName">
                              <input type="text" placeholder="" id="LastName" name="LastName" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="EmailAddress">Email</label>
                            <Input fullWidth size="Medium" className="EmailAddress">
                              <input type="email" placeholder="" id="EmailAddress" name="EmailAddress" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="Password">Password</label>
                            <Input fullWidth size="Medium" className="Password">
                              <input type="password" placeholder="" id="Password" name="Password" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                            <label htmlFor="CompanyID">Company</label>
                            <SelectStyled options={state.CompanyData.map(({ companyId, companyName }) => { 
                                  return { value: companyId, label: companyName };
                                })}  placeholder={state.companyName}  id="CompanyID" name="CompanyID" onChange ={onChangeCompanyOption.bind(this)} />
                          </Col>
                          
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                            <label htmlFor="DepartmentID">Department</label>
                            <SelectStyled options={state.DepartmentData.map(({ DepartmentID, DepartmentName }) => { 
                                  return { value: DepartmentID, label: DepartmentName };
                                })}  placeholder={state.DepartmentName}  placeholder="Select" id="DepartmentID" name="DepartmentID" onChange ={onChangeDepartmentOptions.bind(this)} />
                          </Col>

                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                              <Button status="Success" type="button" shape="SemiRound" onClick={onAdddUser} fullWidth>Save New Users</Button>
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