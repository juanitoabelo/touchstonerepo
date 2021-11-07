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
import Alert from '@paljs/ui/Alert';

import { isLoggedIn } from "../../components/services/auth"

import { getURLParams } from '../../components/utils/common';

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const selectOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];
const selectGradesOptions = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

let JCHOStatus = ''; 
let CARFStatus = '';

const isBrowser = typeof window !== "undefined"

export default class EditInsurance extends Component {
  state = {
    Name: '',
    GradeRes: '',
    GradePHP: '',
    GradeIOP: '',
    GradeOP: '',
    GradeDET: '',
    JCHO: '',
    CARF: '',
    isSaved : false,
  }

  
  componentWillUnmount(){
    const { saveState, state } = this;

    this.setState({ 
        Name: '',
        GradeRes: '',
        GradePHP: '',
        GradeIOP: '',
        GradeOP: '',
        GradeDET: '',
        JCHO: '',
        CARF: '',
        isSaved : false,
    })  
   }

  saveState = (data) => {
    this.setState(data);
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/"
    }

    const { saveState, state } = this;
    const InsuranceID = getURLParams('InsuranceID');
    saveState({ InsuranceID });
    // console.log('Insurance ID: '+InsuranceID);
        // Getting Insurance Info
        axios({
          method: 'get',
          url: process.env.REACT_APP_API_DATABASE_URL,
          params: {
            tblName: 'tblInsurance',
            queryType: 'getSingleInsuranceData',
            InsuranceID: InsuranceID
          }
        })
        .then(function (response) {
          saveState({    
            Name: response.data.Name,
            GradeRes: response.data.GradeRes,
            GradePHP: response.data.GradePHP,
            GradeIOP: response.data.GradeIOP,
            GradeOP: response.data.GradeOP,
            GradeDET: response.data.GradeDET,
            JCHO: response.data.JCHO,
            CARF: response.data.CARF,
          });

        })
        .catch(function (error) {
          console.log(error,`error`);
        });
      
  }

  
  // Update Insurance Info
  onUpdateInsurance = () => {
    const { saveState, state } = this;
    const InsuranceID = getURLParams('InsuranceID');

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblInsurance',
        queryType: 'updateInsuranceData',
        Name: this.state.Name,
        GradeRes: this.state.GradeRes,
        GradePHP: this.state.GradePHP,
        GradeIOP: this.state.GradeIOP,
        GradeOP: this.state.GradeOP,
        GradeDET: this.state.GradeDET,
        JCHO: this.state.JCHO,
        CARF: this.state.CARF,
        InsuranceID: InsuranceID
      }
    })
    .then(function (response) {
       console.log(response,`Updated Insurance data successfully`);
       saveState({
        isSaved: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  onChangeStatus = (e) => {
    this.saveState({
      Name: e.target.value
    });

  }

  onSelectGradeResOption = (e) => {
    this.saveState({
      GradeRes: e.value
    });
  }
  
  onSelectGradePHPOption = (e) => {
    this.saveState({
      GradePHP: e.value
    });
  }
  onSelectGradeIOPOption = (e) => {
    this.saveState({
      GradeIOP: e.value
    });
  }
  onSelectGradeOPOption  = (e) => {
    this.saveState({
      GradeOP: e.value
    });
  }
  
  onSelectGradeDETOption = (e) => {
    this.saveState({
      GradeDET: e.value
    });
  }
  
  onSelectJCHOOption = (e) => {
    console.log(e.value);
    this.saveState({
      JCHO: e.value
    });
  }
  
  onSelectCARFOption = (e) => {
    console.log(e.value);
    this.saveState({
      CARF: e.value
    });
  }

  render() {
    const { state, onChangeStatus, onUpdateInsurance, onSelectCARFOption, onSelectJCHOOption, onSelectGradeDETOption, onSelectGradeOPOption, onSelectGradeIOPOption, onSelectGradeResOption, onSelectGradePHPOption } = this;
    return (
      <>
        <SEO title="Add Insurance" />
        <div className="content-wrapper px-4 py-4">
  
        
        <Card>
            <CardBody>
  
              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">Edit Insurance</h1>
                    </Col>
                    { state.isSaved ? <Col breakPoint={{ xs: 12 }} className="success text-center"><Alert className="success-message bg-success">Successfully Updating Insurance</Alert></Col> : false }
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <form>
                        <Row>
                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="Name">Name</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="text" placeholder={this.state.Name} id="Name" name="Name" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="GradeRes">GradeRes</label>
                            <SelectStyled options={selectGradesOptions}  placeholder={this.state.GradeRes} id="GradeRes" name="GradeRes" onChange ={onSelectGradeResOption.bind(this)} />
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="GradePHP">GradePHP</label>
                            <SelectStyled options={selectGradesOptions}  placeholder={this.state.GradePHP} id="GradePHP" name="GradePHP" onChange ={onSelectGradePHPOption.bind(this)} />
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="GradeIOP">GradeIOP</label>
                            <SelectStyled options={selectGradesOptions}  placeholder={this.state.GradeIOP} id="GradeIOP" name="GradeIOP" onChange ={onSelectGradeIOPOption.bind(this)} />
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="GradeOP">GradeOP</label>
                            <SelectStyled options={selectGradesOptions}  placeholder={this.state.GradeOP} id="GradeOP" name="GradeOP" onChange ={onSelectGradeOPOption.bind(this)} />
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="GradeDET">GradeDET</label> 
                            <SelectStyled options={selectGradesOptions}  placeholder={this.state.GradeDET} id="GradeDET" name="GradeDET" onChange ={onSelectGradeDETOption.bind(this)} />
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="JCHO">JCHO</label>
                            <SelectStyled options={selectOptions.map(({ value, label }) => { 
                                  switch(this.state.JCHO){
                                    case 'No':
                                        JCHOStatus = 'No'
                                        break;
                                    case 'Yes':
                                        JCHOStatus = 'Yes'
                                        break;    
                                  }
                                  return { value: value, label: label };
                                })} placeholder={JCHOStatus} id="JCHO" name="JCHO" onChange ={onSelectJCHOOption.bind(this)} />
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="CARF">CARF</label>
                            <SelectStyled options={selectOptions.map(({ value, label }) => { 
                                  switch(this.state.CARF){
                                    case 'No':
                                      console.log();
                                        CARFStatus = 'No' 
                                        break;
                                    case 'Yes':
                                        CARFStatus = 'Yes'
                                        break;    
                                  }
                                  return { value: value, label: label };
                                })} placeholder={CARFStatus} id="CARF" name="CARF" onChange ={onSelectCARFOption.bind(this)} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 9 }}></Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 3 }}>
                              <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateInsurance} fullWidth>Save</Button>
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