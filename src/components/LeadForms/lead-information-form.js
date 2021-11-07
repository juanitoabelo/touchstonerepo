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

import axios from 'axios';

import { getURLParams, leadYesNo } from '../../components/utils/common';

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

let LeadInformationAwareOfTreatmentCostsStatus = 'Select Option';

export default class LeadInformationForm extends Component {

    state = {
        // Lead Information form state variables
        LeadInformationCompanyName: '',
        LeadInformationWorkPhone: '',
        LeadInformationCellPhone: '',
        LeadInformationShippingAddress1: '',
        LeadInformationShippingCity: '',
        LeadInformationShippingState: '',
        LeadInformationShippingZip: '',
        LeadInformationShippingCountry: '',
        LeadInformationMonthlyBudget: '',
        LeadInformationServicesPrefered: '',
        LeadInformationBestContact: '',
        LeadInformationAwareOfTreatmentCosts: '',
        LeadInformationResourcePlan: '',
    };

    componentWillUnmount(){
        const { saveState, state } = this;

        this.setState({

          // Lead Information form state variables
          LeadInformationCompanyName: '',
          LeadInformationWorkPhone: '',
          LeadInformationCellPhone: '',
          LeadInformationShippingAddress1: '',
          LeadInformationShippingCity: '',
          LeadInformationShippingState: '',
          LeadInformationShippingZip: '',
          LeadInformationShippingCountry: '',
          LeadInformationMonthlyBudget: '',
          LeadInformationServicesPrefered: '',
          LeadInformationBestContact: '',
          LeadInformationAwareOfTreatmentCosts: '',
          LeadInformationResourcePlan: '',

        });
        

    }

    componentDidMount() {
      const { saveState, state } = this;

      const LeadID = getURLParams('leadID');
      saveState({ LeadID });

      // Get Lead Information Form data for default Field display
      axios({
        method: 'get',
        url: process.env.REACT_APP_API_DATABASE_URL,
        params: {
          tblName: 'tblLeads',
          queryType: 'getLeadInfoData',
          LeadID: LeadID
        }
      })
      .then(function (response) {
        // console.log(response,`successfully Updating Lead information`);
        //console.log('Single Lead Information Data as: '+ LeadID + JSON.stringify(response.data));
        saveState({
          LeadInformationCompanyName: response.data.CompanyName,
          LeadInformationWorkPhone: response.data.WorkPhone,
          LeadInformationCellPhone: response.data.CellPhone,
          LeadInformationShippingAddress1: response.data.ShippingAddress1,
          LeadInformationShippingCity: response.data.ShippingCity,
          LeadInformationShippingState: response.data.ShippingState,
          LeadInformationShippingZip: response.data.ShippingZip,
          LeadInformationShippingCountry: response.data.ShippingCountry,
          LeadInformationMonthlyBudget: response.data.MonthlyBudget,
          LeadInformationServicesPrefered: response.data.ServicesPrefered,
          LeadInformationBestContact: response.data.BestContact,
          LeadInformationAwareOfTreatmentCosts: response.data.AwareOfTreatmentCosts,
          LeadInformationResourcePlan: response.data.ResourcePlan
        });
          
      })
      .catch(function (error) {
        console.log(error,`error`);
      });

    }

    onLeadInformationChangeInput = (type, e) => {

        switch(type){
          case 'EditCompanyName':
              this.saveState({
                LeadInformationCompanyName: e.target.value
              });
            break;
          case 'EditWorkPhone':
            this.saveState({
              LeadInformationWorkPhone: e.target.value
            }); 
            break;  
          case 'EditCellPhone':
            this.saveState({
              LeadInformationCellPhone: e.target.value
            });
            break;
          case 'EditShippingAddress1':
            this.saveState({
              LeadInformationShippingAddress1: e.target.value
            });
            break;  
            case 'EditShippingCity':
              this.saveState({
                LeadInformationShippingCity: e.target.value
              });
              break;    
            case 'EditShippingState':
              this.saveState({
                LeadInformationShippingState: e.target.value
              });
              break;        
            case 'EditShippingZip':
              this.saveState({
                LeadInformationShippingZip: e.target.value
              });
              break;        
            case 'EditShippingCountry':
              this.saveState({
                LeadInformationShippingCountry: e.target.value
              });
              break;  
            case 'EditMonthlyBudget':
              this.saveState({
                LeadInformationMonthlyBudget: e.target.value
              });
              break;   
            case 'EditServicesPrefered':
              this.saveState({
                LeadInformationServicesPrefered: e.target.value
              });
              break;   
            case 'EditBestContact':
              this.saveState({
                LeadInformationBestContact: e.target.value
              });
              break;         
            case 'EditAwareOfTreatmentCosts':
              console.log('Aware Of Treatment Costs Status:'+ e.value);
              this.saveState({
                LeadInformationAwareOfTreatmentCosts: e.value
              });
              break;           
            case 'EditResourcePlan':
              this.saveState({
                LeadInformationResourcePlan: e.target.value
              });
              break;
        } 
    
      }

    render() {

        const { onLeadInformationChangeInput,onUpdateLeadInformation, state } = this;

    return (<>
            {/* Lead information */}
            <AccordionItem uniqueKey={1} title="LEAD INFORMATION">
                        <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditCompanyName">Company Name</label>
                          <Input fullWidth size="Medium" className="EditWorkPhone">
                            <input type="text" placeholder={this.state.LeadInformationCompanyName} id="EditCompanyName" name="EditCompanyName" onChange ={onLeadInformationChangeInput.bind(this, 'EditCompanyName')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditWorkPhone">Work Phone</label>
                          <Input fullWidth size="Medium" className="EditWorkPhone">
                            <input type="text" placeholder={this.state.LeadInformationWorkPhone} id="EditWorkPhone" name="EditWorkPhone" onChange ={onLeadInformationChangeInput.bind(this, 'EditWorkPhone')}/>
                          </Input> 
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditCellPhone">Cell Phone</label>
                          <Input fullWidth size="Medium" className="EditCellPhone"> 
                            <input type="text" placeholder={this.state.LeadInformationCellPhone} id="EditCellPhone" name="EditCellPhone" onChange ={onLeadInformationChangeInput.bind(this, 'EditCellPhone')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditShippingAddress1">Address</label>
                          <Input fullWidth size="Medium" className="EditShippingAddress1">
                            <input type="text" placeholder={this.state.LeadInformationShippingAddress1} id="EditShippingAddress1" name="EditShippingAddress1" onChange ={onLeadInformationChangeInput.bind(this, 'EditShippingAddress1')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditShippingCity">City/State/Zip</label>
                          <Input fullWidth size="Medium" className="EditShippingCity">
                            <input type="text" placeholder={this.state.LeadInformationShippingCity} id="EditShippingCity" name="EditShippingCity" onChange ={onLeadInformationChangeInput.bind(this, 'EditShippingCity')}/>
                            <input type="text" className="mx-2" placeholder={this.state.LeadInformationShippingState} id="EditShippingState" name="EditShippingState" onChange ={onLeadInformationChangeInput.bind(this, 'EditShippingState')}/>
                            <input type="text" placeholder={this.state.LeadInformationShippingZip} id="EditShippingZip" name="EditShippingZip" onChange ={onLeadInformationChangeInput.bind(this, 'EditShippingZip')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditShippingCountry">Country</label>
                          <Input fullWidth size="Medium" className="EditShippingCountry">
                            <input type="text" placeholder={this.state.LeadInformationShippingCountry} id="EditShippingCountry" name="EditShippingCountry" onChange ={onLeadInformationChangeInput.bind(this, 'EditShippingCountry')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditMonthlyBudget">Monthly Budget</label>
                          <Input fullWidth size="Medium" className="EditMonthlyBudget">
                            <input type="text" placeholder={this.state.LeadInformationMonthlyBudget} id="EditMonthlyBudget" name="EditMonthlyBudget" onChange ={onLeadInformationChangeInput.bind(this, 'EditMonthlyBudget')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditServicesPrefered">Services Preferred</label>
                          <Input fullWidth size="Medium" className="EditServicesPrefered">
                            <input type="text" placeholder={this.state.LeadInformationServicesPrefered} id="EditServicesPrefered" name="EditServicesPrefered" onChange ={onLeadInformationChangeInput.bind(this, 'EditServicesPrefered')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditBestContact">Best Contact Method</label>
                          <Input fullWidth size="Medium" className="EditBestContact">
                            <input type="text" placeholder={this.state.LeadInformationBestContact} id="EditBestContact" name="EditBestContact" onChange ={onLeadInformationChangeInput.bind(this, 'EditBestContact')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditAwareOfTreatmentCosts">Aware of Treatment Cost?</label>
                          <Input fullWidth size="Medium" className="EditAwareOfTreatmentCosts">
                            <SelectStyled className="selectoption" fullWidth options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.LeadInformationAwareOfTreatmentCosts){
                                    case '0':
                                      LeadInformationAwareOfTreatmentCostsStatus = 'No'
                                        break;
                                    case '1':
                                      LeadInformationAwareOfTreatmentCostsStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={LeadInformationAwareOfTreatmentCostsStatus} value={this.state.LeadInformationAwareOfTreatmentCosts} id="EditAwareOfTreatmentCosts" name="EditAwareOfTreatmentCosts" onChange ={onLeadInformationChangeInput.bind(this, 'EditAwareOfTreatmentCosts')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditResourcePlan">Resource to Use for Treatment</label>
                          <Input fullWidth size="Medium" className="EditResourcePlan">
                            <input type="text" placeholder={this.state.LeadInformationResourcePlan} id="EditResourcePlan" name="EditResourcePlan" onChange ={onLeadInformationChangeInput.bind(this, 'EditResourcePlan')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateLeadInformation} fullWidth> UPDATE/SAVE Miller LEAD INFORMATION</Button>
                        </Col>
                      </Row>
                    </AccordionItem>
                    {/* End Lead information */}
        </>
        );
    }
}