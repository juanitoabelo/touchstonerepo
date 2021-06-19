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
import { isLoggedIn } from "../../components/services/auth"

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const selectMemberTypeOptions = [
  { value: 'Mutual Referent', label: 'Mutual Referent' },
  { value: 'Referent', label: 'Referent' },
  { value: 'Resource', label: 'Resource' },
  { value: 'Contributor', label: 'Contributor' },
  { value: 'Influencer', label: 'Influencer' },
  { value: 'Friendly', label: 'Friendly' },
  { value: 'Advocate', label: 'Advocate' },
  { value: 'Other', label: 'Other' },
];

const isBrowser = typeof window !== "undefined"

export default class MyCompany extends Component {

  state = {
    CompanyName: '',
    CompanyType: 0,
    CompanyMemberType: '',
    CompanyTypeData: []
  }

  componentWillUnmount(){
    this.setState({
      CompanyName: '',
      CompanyType: 0,
      CompanyMemberType: '',
      CompanyTypeData: []
    })  
  }

  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/"
    }
    const { saveState, state } = this;

     /** Get All Company Type Details **/
     axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblCompanyType',
        queryType: 'getAllCompanyType'
      }
    })
    .then(function (response) {
       console.log('Company Type Data: '+ JSON.stringify(response.data));
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

  onAddCompany = () => {
      axios({
        method: 'get',
        url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
        params: {
          tblName: 'tblCompany',
          queryType: 'addNewCompanyInfo',
          CompanyName: this.state.CompanyName,
          CompanyMemberType: this.state.CompanyMemberType,
          CompanyType: this.state.CompanyType
        }
      })
      .then(function (response) {
        console.log(response,`Added New Company successfull`);
      })
      .catch(function (error) {
        console.log(error,`error`);
      });
  }
  
  // Save Company Name Field value to a state after user input
  onChangeStatus = (e) => {
    this.saveState({
      CompanyName: e.target.value
    });
  }

  onChangeMemberTypeOptions = (e) => {
    // console.log(e.value);
    this.saveState({
      CompanyMemberType: e.value
    });
  }

  onChangeCompanyTypeOption = (e) => {
    // console.log(e.value);
    this.saveState({
      CompanyType: e.value
    });
  }
  
  render() {

    const { state, onChangeMemberTypeOptions, onChangeCompanyTypeOption, onChangeStatus, onAddCompany } = this;
    
    return (
      <>
        <SEO title="Add Company" />
        <div className="content-wrapper px-4 py-4">
                
        <Card>
            <CardBody>

              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">Add Company</h1>
                    </Col>
                  </Row>

                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <form>
                        <Row>
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="CompanyType">Company Type</label>
                            <SelectStyled options={state.CompanyTypeData.map(({ CompanyTypeID, CompanyTypeDesc }) => { 
                                  return { value: CompanyTypeID, label: CompanyTypeDesc };
                                })}  placeholder={state.CompanyTypeDescription} id="CompanyType" name="CompanyType" value={state.CompanyId} onChange ={onChangeCompanyTypeOption.bind(this)}  />
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="MemberType">Member Type</label>
                            <SelectStyled options={selectMemberTypeOptions}  placeholder="Select" id="MemberType" name="MemberType" onChange ={onChangeMemberTypeOptions.bind(this)} />
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="CompanyName">Company Name</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="text" placeholder="" id="CompanyName" name="CompanyName" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 9 }}></Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 3 }}>
                              <Button status="Success" type="button" shape="SemiRound" onClick={onAddCompany} fullWidth>Save</Button>
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