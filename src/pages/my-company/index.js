import { Container } from '@material-ui/core';
import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import { navigate } from 'gatsby';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { Component } from 'react';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { isLoggedIn, getUser } from "../../components/services/auth"


const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const isBrowser = typeof window !== "undefined"
  

// export default function MyCompany() {
export default class MyCompany extends Component {
  state = {
    CompanyName: '',
    CompanyId: '',
    CompanyType: 0,
    CompanyTypeDescription: '',
    CompanyTypeData: []
  }
  componentWillUnmount(){
    this.setState({
      CompanyName: '',
      CompanyId: '',
      CompanyType: 0,
      CompanyTypeDescription: '',
      CompanyTypeData: []
    })  
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/"
    }  
    const { saveState, state } = this;
    /** get Account Company Details **/
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblCompany',
        queryType: 'getSingleCompanyInfo',
        companyId: getUser().companyid
      }
    })
    .then(function (response) {
      // console.log('Handled username: data: '+formData.user);
      //  console.log('Data: '+ JSON.stringify(response.data));
      console.log('Comapany Name: '+ response.data.companyName);
      console.log('Company Id: '+ response.data.companyId);
      console.log('Company CompanyType: '+ response.data.CompanyType);
  
      saveState({
        CompanyName: response.data.companyName,
        CompanyId: response.data.companyId,
        CompanyType: response.data.CompanyType,
        CompanyTypeDescription: response.data.CompanyTypeDesc
      });
      
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });  
  
    /** Get All Company Type Details **/
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblCompanyType',
        queryType: 'getAllCompanyType'
      }
    })
    .then(function (response) {
      // console.log('Company Type Data: '+ JSON.stringify(response.data));
      saveState({
        CompanyTypeData: response.data
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
  onSaveCompany = () => {

    if(window.localStorage.getItem("gatsbyUser") && typeof window !== "undefined"){
      console.log('Company data: '+window.localStorage.getItem("gatsbyUser"));
      console.log('Company Id: '+getUser().companyid);
    }

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblCompany',
        queryType: 'editSingleCompanyInfo',
        CompanyID: this.state.CompanyId,
        EditCompanyName: this.state.CompanyName,
        CompanyType: this.state.CompanyType
      }
    })
    .then(function (response) {
      console.log(response,`Updating Company Info successfull`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

  }
  
  
  onChangeStatus = (e) => {
    this.setState({
      CompanyName: e.target.value
    });
    console.log('Change Status: '+e.target.value);
  }

  onChangeOption = (e) => {
    this.setState({
      CompanyTypeDescription: e.label,
      CompanyType: e.value,
    });
    console.log('Select Optin value: '+ e.label);
  }

  render() {
    const { state, onChangeOption, onChangeStatus, onSaveCompany } = this;
    return (
      <>
          <SEO title="My Company" />
          <div className="content-wrapper px-4 py-4">
            <Card>
                <CardBody>

                  <Container>
                      <Row>
                        <Col breakPoint={{ xs: 12 }}>
                          <h1 className="mb-5">{state.CompanyName}</h1>
                        </Col>
                      </Row>

                      <Row className="justify-content-center align-items-center mb-5">
                        <Col className="col-lg-8">
                        
                        <form>
                            <Row>
                              <Col breakPoint={{ xs: 12 }} >
                              <label htmlFor="EditCompanyName">Company Name</label>
                                <Input fullWidth size="Small">
                                  <input type="text" placeholder={state.CompanyName} id="EditCompanyName" value={state.CompanyName} className="EditCompanyName" name="EditCompanyName"  onChange ={onChangeStatus.bind(this)}/>
                                </Input>
                              </Col>
                              <Col breakPoint={{ xs: 12 }}>
                                <label htmlFor="EditCompanyType">Company Type</label>
                                <SelectStyled options={state.CompanyTypeData.map(({ CompanyTypeID, CompanyTypeDesc }) => { 
                                  return { value: CompanyTypeID, label: CompanyTypeDesc };
                                })}  placeholder={state.CompanyTypeDescription} id="EditCompanyType" name="EditCompanyType" value={state.CompanyId} onChange ={onChangeOption.bind(this)}  />
                                
                              </Col>
                              <Col breakPoint={{ xs: 12 }} >
                                  <Button status="Success" type="button" shape="SemiRound" onClick={onSaveCompany} fullWidth>Save</Button>
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

