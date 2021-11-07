import React, { Component } from 'react';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import Select from '@paljs/ui/Select';
import styled from 'styled-components';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Container } from '@material-ui/core';
import { Card, CardBody } from '@paljs/ui/Card';
import { Accordion, AccordionItem } from '@paljs/ui/Accordion';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import SEO from '../../components/SEO';
import axios from 'axios';
import { isLoggedIn } from '../../components/services/auth';

import { 
    getURLParams, leadStatus, leadDisposition, 
    leadCrisisScale, leadYesNo, leadUsers, objLeadInfo,
    objLeadInfoText, stringFirstCharCapitalized, leadAdmins
  } from '../../components/utils/common';


const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const AgeList = [
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
  ];
  const GenderList = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Transgender', label: 'Transgender' }
  ];

  let PatientIsAdoptedStatus = '';
  let PatientIsRunawayStatus = '';

export default class PatientChildprofileForm extends Component {

    state = {
        // Patient Child Profile form state variables
        PatientName: '',
        PatientDOB: new Date(),
        PatientAge: '',
        PatientGender: '',
        PatientIsAdopted: '',
        PatientExpectToEnrollDate: new Date(),
        PatientBehaviors: '',
        PatientEthinicity: '',
        PatientHeight: '',
        PatientWeight: '',
        PatientEyeColor: '',
        PatientHairColor: '',
        PatientShoeSize: '',
        PatientShirtSize: '',
        PatientWaistSize: '',
        PatientReligion: '',
        PatientRiskTimeline: '',
        PatientIsRunaway: '',
        PatientRunawayOutcome: '',
        PatientHealthIssues: '',
        PatientAllergyHistory: '',
        PatientIQ: '',
        PatientPhysicalLimits: '',
    };
    saveState = (data) => {
        this.setState(data);
      }
    componentWillUnmount(){
        const { saveState, state } = this;

        this.setState({

          // Patient Child Profile form state variables
            PatientName: '',
            PatientDOB: new Date(),
            PatientAge: '',
            PatientGender: '',
            PatientIsAdopted: '',
            PatientExpectToEnrollDate: new Date(),
            PatientBehaviors: '',
            PatientEthinicity: '',
            PatientHeight: '',
            PatientWeight: '',
            PatientEyeColor: '',
            PatientHairColor: '',
            PatientShoeSize: '',
            PatientShirtSize: '',
            PatientWaistSize: '',
            PatientReligion: '',
            PatientRiskTimeline: '',
            PatientIsRunaway: '',
            PatientRunawayOutcome: '',
            PatientHealthIssues: '',
            PatientAllergyHistory: '',
            PatientIQ: '',
            PatientPhysicalLimits: '',

        });
        

    }

    componentDidMount() {
      const { saveState, state } = this;

      const LeadID = getURLParams('leadID');
      saveState({ LeadID });

      // Get Patien Child Profile Form data for default Field display
        axios({
            method: 'get',
            url: process.env.REACT_APP_API_DATABASE_URL,
            params: {
            tblName: 'tblLeads',
            queryType: 'getLeadParentChildProfile',
            LeadID: LeadID
            }
        })
        .then(function (response) {
            // console.log(response,`successfully Updating Lead information`);
            // console.log('Single Lead Information Data s: '+ LeadID + JSON.stringify(response.data));
            saveState({
                PatientName: response.data.PatientName,
                PatientDOB: response.data.PatientDOB,
                PatientAge: response.data.PatientAge,
                PatientGender: response.data.PatientGender,
                PatientIsAdopted: response.data.IsAdopted,
                PatientExpectToEnrollDate: response.data.ExpectToEnrollDate,
                PatientBehaviors: response.data.Behaviors,
                PatientEthinicity: response.data.Ethinicity,
                PatientHeight: response.data.Height,
                PatientWeight: response.data.Weight,
                PatientEyeColor: response.data.EyeColor,
                PatientHairColor: response.data.HairColor,
                PatientShoeSize: response.data.ShoeSize,
                PatientShirtSize: response.data.ShirtSize,
                PatientWaistSize: response.data.WaistSize,
                PatientReligion: response.data.Religion,
                PatientRiskTimeline: response.data.RiskTimeline,
                PatientIsRunaway: response.data.IsRunaway,
                PatientRunawayOutcome: response.data.RunawayOutcome,
                PatientHealthIssues: response.data.HealthIssues,
                PatientAllergyHistory: response.data.AllergyHistory,
                PatientIQ: response.data.Iq,
                PatientPhysicalLimits: response.data.PhysicalLimits
            });
            
        })
        .catch(function (error) {
            console.log(error,`error`);
        });

    }

    /** Update Patient Child Profile Info **/
  onUpdateChildProfile = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadParentChildProfile',
          PatientName: this.state.PatientName,
          PatientDOB: this.state.PatientDOB,
          PatientAge: this.state.PatientAge,
          PatientGender: this.state.PatientGender,
          PatientIsAdopted: this.state.PatientIsAdopted,
          PatientExpectToEnrollDate: this.state.PatientExpectToEnrollDate,
          PatientBehaviors: this.state.PatientBehaviors,
          PatientEthinicity: this.state.PatientEthinicity,
          PatientHeight: this.state.PatientHeight,
          PatientWeight: this.state.PatientWeight,
          PatientEyeColor: this.state.PatientEyeColor,
          PatientHairColor: this.state.PatientHairColor,
          PatientShoeSize: this.state.PatientShoeSize,
          PatientShirtSize: this.state.PatientShirtSize,
          PatientWaistSize: this.state.PatientWaistSize,
          PatientReligion: this.state.PatientReligion,
          PatientRiskTimeline: this.state.PatientRiskTimeline,
          PatientIsRunaway: this.state.PatientIsRunaway,
          PatientRunawayOutcome: this.state.PatientRunawayOutcome,
          PatientHealthIssues: this.state.PatientHealthIssues,
          PatientAllergyHistory: this.state.PatientAllergyHistory,
          PatientIQ: this.state.PatientIQ,
          PatientPhysicalLimits: this.state.PatientPhysicalLimits,
          LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log(response,`successfully Updating Parent/Child Profile`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

    onChangeParentChildProfileInput = (type, e) => {
        switch(type){
          case 'EditPatientName':
              this.saveState({
                PatientName: e.target.value
              });
            break;
          case 'EditPatientDOB':
            console.log('Date of birth: '+e);
            this.saveState({
              PatientDOB: e
            });
    
          break;
          case 'EditPatientAge':
            this.saveState({
              PatientAge: e.value
            });
          break;
          case 'EditPatientGender':
            this.saveState({
              PatientGender: e.value
            });
          break;
          case 'EditIsAdopted':
            console.log('is adopted: '+e.value);
            this.saveState({
              PatientIsAdopted: e.value
            });
          break;
          case 'EditExpectToEnrollDate':
            this.saveState({
              PatientExpectToEnrollDate: e
            });
          break;      
          case 'EditBehaviors':
            this.saveState({
              PatientBehaviors: e.target.value
            });
          break;          
          case 'EditEthinicity':
            this.saveState({
              PatientEthinicity: e.target.value
            });
          break;        
          case 'EditHeight':
            this.saveState({
              PatientHeight: e.target.value
            });
          break;  
          case 'EditWeight':
            this.saveState({
              PatientWeight: e.target.value
            });
          break;        
          case 'EditEyeColor':
            this.saveState({
              PatientEyeColor: e.target.value
            });
          break; 
          case 'EditHairColor':
            this.saveState({
              PatientHairColor: e.target.value
            });
          break;    
          case 'EditShoeSize':
            this.saveState({
              PatientShoeSize: e.target.value
            });
          break;        
          case 'EditShirtSize':
            this.saveState({
              PatientShirtSize: e.target.value
            });
          break;       
          case 'EditWaistSize':
            this.saveState({
              PatientWaistSize: e.target.value
            });
          break;       
          case 'EditReligion':
            this.saveState({
              PatientReligion: e.target.value
            });
          break;    
          case 'EditRiskTimeline':
            this.saveState({
              PatientRiskTimeline: e.target.value
            });
          break;  
          case 'EditIsRunaway':
            this.saveState({
              PatientIsRunaway: e.value
            });
          break;  
          case 'EditRunawayOutcome':
            this.saveState({
              PatientRunawayOutcome: e.target.value
            });
          break;    
          case 'EditHealthIssues':
            this.saveState({
              PatientHealthIssues: e.target.value
            });
          break;       
          case 'EditAllergyHistory':
            this.saveState({
              PatientAllergyHistory: e.target.value
            });
          break;       
          case 'EditIQ':
            this.saveState({
              PatientIQ: e.target.value
            });
          break;    
          case 'EditPhysicalLimits':
            this.saveState({
              PatientPhysicalLimits: e.target.value
            });
          break;       
        }
      }

    render() {

        const { onChangeParentChildProfileInput,onUpdateChildProfile, state } = this;

    return (<>
            {/* PATIENT/CHILD PROFILE */}
            <AccordionItem uniqueKey={2} title="PATIENT/CHILD PROFILE">
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditPatientName">Full Name</label>
                          <Input fullWidth size="Medium" className="EditPatientName">
                            <input type="text" placeholder={this.state.PatientName} id="EditPatientName" name="EditPatientName" onChange ={onChangeParentChildProfileInput.bind(this, 'EditPatientName')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditPatientDOB">Date of Birth</label>
                          <Input fullWidth size="Medium" className="EditPatientDOB">
                              <DatePicker id="EditPatientDOB" name="EditPatientDOB" placeholder={this.state.PatientDOB} selected={this.state.PatientDOB} value={this.state.PatientDOB}  onChange={onChangeParentChildProfileInput.bind(this, 'EditPatientDOB')} />
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                        <label htmlFor="EditPatientAge">Age</label>
                          <Input fullWidth fullWidth className="EditPatientAge">
                            <SelectStyled className="selectoption" fullWidth options={AgeList} placeholder={this.state.PatientAge} value="" id="EditPatientAge" name="EditPatientAge" onChange ={onChangeParentChildProfileInput.bind(this, 'EditPatientAge')} />
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                        <label htmlFor="EditPatientGender">Gender</label>
                          <Input fullWidth size="Medium" className="EditPatientGender">
                            <SelectStyled className="selectoption" options={GenderList} placeholder={this.state.PatientGender} value="" id="EditPatientGender" name="EditPatientGender" onChange ={onChangeParentChildProfileInput.bind(this, 'EditPatientGender')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                        <label htmlFor="EditIsAdopted">Adopted</label>
                          <Input fullWidth size="Medium" className="EditIsAdopted">
                            <SelectStyled className="selectoption" fullWidth options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.PatientIsAdopted){
                                    case '0':
                                      PatientIsAdoptedStatus = 'No'
                                        break;
                                    case '1':
                                      PatientIsAdoptedStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={PatientIsAdoptedStatus}  value={this.state.PatientIsAdopted} id="EditIsAdopted" name="EditIsAdopted" onChange ={onChangeParentChildProfileInput.bind(this, 'EditIsAdopted')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditExpectToEnrollDate">Expect To Enroll Date</label>
                          <Input fullWidth size="Medium" className="EditExpectToEnrollDate">
                              <DatePicker id="EditExpectToEnrollDate" name="EditExpectToEnrollDate" placeholder={this.state.PatientExpectToEnrollDate} selected={this.state.PatientExpectToEnrollDate} value={this.state.PatientExpectToEnrollDate} onChange={onChangeParentChildProfileInput.bind(this, 'EditExpectToEnrollDate')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditBehaviors">Behaviors</label>
                          <Input fullWidth size="Medium" className="EditBehaviors">
                            <input type="text" placeholder={this.state.PatientBehaviors} id="EditBehaviors" name="EditBehaviors" onChange ={onChangeParentChildProfileInput.bind(this, 'EditBehaviors')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditEthinicity">Ethinicity</label>
                          <Input fullWidth size="Medium" className="EditEthinicity">
                            <input type="text" placeholder={this.state.PatientEthinicity} id="EditEthinicity" name="EditEthinicity" onChange ={onChangeParentChildProfileInput.bind(this, 'EditEthinicity')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditHeight">Height</label>
                          <Input fullWidth size="Medium" className="EditHeight">
                            <input type="text" placeholder={this.state.PatientHeight} id="EditHeight" name="EditHeight" onChange ={onChangeParentChildProfileInput.bind(this, 'EditHeight')}/>
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditWeight">Weight</label>
                          <Input fullWidth size="Medium" className="EditWeight">
                            <input type="text" placeholder={this.state.PatientWeight} id="EditWeight" name="EditWeight" onChange ={onChangeParentChildProfileInput.bind(this, 'EditWeight')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditEyeColor">Eye Color</label>
                          <Input fullWidth size="Medium" className="EditEyeColor">
                            <input type="text" placeholder={this.state.PatientEyeColor} id="EditEyeColor" name="EditEyeColor" onChange ={onChangeParentChildProfileInput.bind(this, 'EditEyeColor')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditHairColor">Hair Color</label>
                          <Input fullWidth size="Medium" className="EditHairColor">
                            <input type="text" placeholder={this.state.PatientHairColor} id="EditHairColor" name="EditHairColor" onChange ={onChangeParentChildProfileInput.bind(this, 'EditHairColor')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditShoeSize">Shoe Size</label>
                          <Input fullWidth size="Medium" className="EditShoeSize">
                            <input type="text" placeholder={this.state.PatientShoeSize} id="EditShoeSize" name="EditShoeSize" onChange ={onChangeParentChildProfileInput.bind(this, 'EditShoeSize')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditShirtSize">Shirt Size</label>
                          <Input fullWidth size="Medium" className="EditShirtSize">
                            <input type="text" placeholder={this.state.PatientShirtSize} id="EditShirtSize" name="EditShirtSize" onChange ={onChangeParentChildProfileInput.bind(this, 'EditShirtSize')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditWaistSize">Waist Size</label>
                          <Input fullWidth size="Medium" className="EditWaistSize">
                            <input type="text" placeholder={this.state.PatientWaistSize} id="EditWaistSize" name="EditWaistSize" onChange ={onChangeParentChildProfileInput.bind(this, 'EditWaistSize')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditReligion">Religious Pref</label>
                          <Input fullWidth size="Medium" className="EditReligion">
                            <input type="text" placeholder={this.state.PatientReligion} id="EditReligion" name="EditReligion" onChange ={onChangeParentChildProfileInput.bind(this, 'EditReligion')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditRiskTimeline">Timeline of at Risk Behaviors</label>
                          <Input fullWidth size="Medium" className="EditRiskTimeline">
                            <textarea type="text" placeholder={this.state.PatientRiskTimeline} id="EditRiskTimeline" name="EditRiskTimeline" onChange ={onChangeParentChildProfileInput.bind(this, 'EditRiskTimeline')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                        <label htmlFor="EditIsRunaway">Runaway?</label>
                          <Input fullWidth size="Medium" className="EditIsRunaway">
                            <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.PatientIsRunaway){
                                    case '0':
                                      PatientIsRunawayStatus = 'No'
                                        break;
                                    case '1':
                                      PatientIsRunawayStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={PatientIsRunawayStatus} value={this.state.PatientIsRunaway} id="EditIsRunaway" name="EditIsRunaway" onChange ={onChangeParentChildProfileInput.bind(this, 'EditIsRunaway')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditRunawayOutcome">Runaway Outcome</label>
                          <Input fullWidth size="Medium" className="EditRunawayOutcome">
                            <textarea type="text" placeholder={this.state.PatientRunawayOutcome} id="EditRunawayOutcome" name="EditRunawayOutcome" onChange ={onChangeParentChildProfileInput.bind(this, 'EditRunawayOutcome')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditHealthIssues">Health Issues</label>
                          <Input fullWidth size="Medium" className="EditHealthIssues">
                            <textarea type="text" placeholder={this.state.PatientHealthIssues} id="EditHealthIssues" name="EditHealthIssues" onChange ={onChangeParentChildProfileInput.bind(this, 'EditHealthIssues')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditAllergyHistory">Allergy History</label>
                          <Input fullWidth size="Medium" className="EditAllergyHistory">
                            <textarea type="text" placeholder={this.state.PatientAllergyHistory} id="EditAllergyHistory" name="EditAllergyHistory" onChange ={onChangeParentChildProfileInput.bind(this, 'EditAllergyHistory')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditIQ">IQ if under 85</label>
                          <Input fullWidth size="Medium" className="EditIQ">
                            <input type="text" placeholder={this.state.PatientIQ} id="EditIQ" name="EditIQ" onChange ={onChangeParentChildProfileInput.bind(this, 'EditIQ')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditPhysicalLimits">Physical Limitations</label>
                          <Input fullWidth size="Medium" className="EditPhysicalLimits">
                            <textarea type="text" placeholder={this.state.PatientPhysicalLimits} id="EditPhysicalLimits" name="EditPhysicalLimits" onChange ={onChangeParentChildProfileInput.bind(this, 'EditPhysicalLimits')}/>
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateChildProfile} fullWidth> <i className="fa fa-floppy-o" aria-hidden="true"></i>UPDATE/SAVE Miller PATIENT/CHILD PROFILE</Button>
                        </Col>
                      </Row>
                    </AccordionItem>
                    {/* END PATIENT/CHILD PROFILE */}
        </>
        );
    }
}