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
import { isLoggedIn } from '../../components/services/auth';
import { 
  getURLParams, leadStatus, leadDisposition, 
  leadCrisisScale, leadYesNo, leadUsers, objLeadInfo,
  objLeadInfoText, stringFirstCharCapitalized, leadAdmins
} from '../../components/utils/common';


const isBrowser = typeof window !== "undefined";

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const SelectStyled = styled(Select)`
  margin-bottom: 0.25rem;
`;


export default class EditLead extends Component {
  state = {
    LeadID: 0,
    LeadName: 'Sample: RACHEAL MILLER',
    LeadInfo: {
      Status: {
        value: 'Active',
        label: 'Active'
      },
      Disposition: {
        value: '0',
        label: 'None'
      },
      CrisisScale: {
        value: 'Urgent',
        label: 'Urgent'
      },
      InitialRep: {
        value: '317',
        label: 'Jason Thielbahr'
      },
      AssignedAdvocate: {
        value: '276',
        label: 'Paula Riggs'
      },
      SubstanceAbuse: {
        value: '1',
        label: 'Yes'
      },
      MentalHealth: {
        value: '1',
        label: 'Yes'
      },
      DualDiagnosis: {
        value: '1',
        label: 'Yes'
      },
      ToDoUser: {
        value: '324', 
        label: 'Juanito Abelo'
      },
      ToDoReminderDate: '',
      ParentName: 'Asiah Joy Harmon',
      PatientGender: 'Female, ',
      PatientAge: 'age 14, ',
      IsAdopted: 'not adopted',
      IsDrugUse: 'Drugs/alcohol, ',
      IsSexuallyActive: 'sexually active,',
      IsViolent: 'Displayed violence, ',
      IsCourtOrdered: 'court ordered',
      Diagnosis: 'Anxiety depression ',
      HomePhone: '308-660-0251',
      Email: 'm9ssm9ller@gmail.com',
      FirstName: 'RACHEAL',
      LastName: 'MILLER',
      Campaign: 'Clearview Girls Academy Leads',
      SignUpDate: '2021-05-23 15:59:55',
      IPAddress: '',
      TermsAccepted: '2021-05-29 08:59:46',
      NewLeadNotes: ''
    }
  };
  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/"
    }
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });
  }
  saveState = (obj) => {
    this.setState(obj);
  }
  onChangeOption = (type, e) => {
    const { LeadInfo } = this.state;
    const obj = objLeadInfo({ type, obj: LeadInfo, item: e });
    this.saveState(obj);
  }
  onChangeInput = (type, e) => {
    const { LeadInfo } = this.state;
    const obj = objLeadInfoText({ type, obj: LeadInfo, item: e });
    this.saveState(obj);
  }
  onChangeDate = (type, date) => {
    const { LeadInfo } = this.state;
    let stateLess;
    switch(type) {
      case 'ToDoReminderDate':
        stateLess = { 
          LeadInfo: {
            ...LeadInfo,
            ToDoReminderDate: date 
          }
        };
        break;
      default:
        stateLess = { LeadInfo: {
          ...LeadInfo
        } };
        break;
    }
    this.saveState(stateLess);
  }
  onBack = () => {}
  onPrintView = () => {}
  render() {
    const { onBack, onChangeInput, onPrintView, onChangeDate,
      onChangeOption, state: { LeadName, LeadID, LeadInfo } } = this;
    return (<>
      <SEO title="View/Edit Lead" />
      <div className="content-wrapper px-4 py-4">
        <Container style={{ height: 'auto', marginBottom: '1rem' }}>
          <Row>
            <Col breakPoint={{ xs: 2 }}>
              <Button className="mx-1" status="Info" type="button" shape="square" onClick={onBack.bind(this)} fullWidth>BACK</Button>
            </Col>
            <Col breakPoint={{ xs: 2 }}>
              <Button className="mx-1" status="Success" type="button" shape="square" onClick={onPrintView.bind(this)} fullWidth>PRINT VIEW</Button>
            </Col>
          </Row>
        </Container>
        <Card>
          <CardBody>
            <Container>
              <Row className="justify-content-center align-items-center mb-5">
                <Col breakPoint={{ xs: 12 }}>
                  <h2 className="text-center mb-5">View/Edit {LeadName} ({LeadID})</h2>
                  <p className="text-center">
                    Child: <i>{LeadInfo.ParentName}</i><br/>
                    {LeadInfo.PatientGender}{LeadInfo.PatientAge}{LeadInfo.IsAdopted}
                    <span className="d-block text-danger">{LeadInfo.IsDrugUse}{LeadInfo.IsSexuallyActive}</span>
                    <span className="d-block text-danger">{LeadInfo.IsViolent}{LeadInfo.IsCourtOrdered}</span>
                  </p>
                </Col>
                <Col breakPoint={{ xs: 12 }}>  
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Status">Status:</label>
                      <SelectStyled options={leadStatus} placeholder={LeadInfo.Status.label} value={LeadInfo.Status.value} id="Status" name="Status" onChange ={onChangeOption.bind(this, 'Status')} />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Disposition">Disposition:</label>
                      <SelectStyled options={leadDisposition} placeholder={LeadInfo.Disposition.label} value={LeadInfo.Disposition.value} id="Disposition" name="Disposition" onChange ={onChangeOption.bind(this,'Disposition')} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="CrisisScale">CrisisScale:</label>
                      <SelectStyled options={leadCrisisScale} placeholder={LeadInfo.CrisisScale.label} value={LeadInfo.CrisisScale.value} id="CrisisScale" name="CrisisScale" onChange ={onChangeOption.bind(this, 'CrisisScale')} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="InitialRep">Initial Rep:</label>
                      <SelectStyled options={leadUsers} placeholder={LeadInfo.InitialRep.label} value={LeadInfo.InitialRep.value} id="InitialRep" name="InitialRep" onChange ={onChangeOption.bind(this, 'InitialRep')} />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="AssignedAdvocate">Assigned Advocate:</label>
                      <SelectStyled options={leadUsers} placeholder={LeadInfo.AssignedAdvocate.label} value={LeadInfo.AssignedAdvocate.value} id="AssignedAdvocate" name="AssignedAdvocate" onChange ={onChangeOption.bind(this, 'AssignedAdvocate')} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="FirstName">First Name:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={LeadInfo.FirstName} id="FirstName" name="FirstName" onChange ={onChangeInput.bind(this, 'FirstName')}/>
                      </Input>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="LastName">Last Name:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={LeadInfo.LastName} id="LastName" name="LastName" onChange ={onChangeInput.bind(this, 'LastName')}/>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Email">Email:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={LeadInfo.Email} id="Email" name="Email" onChange ={onChangeInput.bind(this, 'Email')}/>
                      </Input>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="HomePhone">Home Phone:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={LeadInfo.HomePhone} id="HomePhone" name="HomePhone" onChange ={onChangeInput.bind(this, 'HomePhone')}/>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="SubstanceAbuse">Substance Abuse?:</label>
                      <SelectStyled options={leadYesNo} placeholder={LeadInfo.SubstanceAbuse.label} value={LeadInfo.SubstanceAbuse.value} id="SubstanceAbuse" name="SubstanceAbuse" onChange ={onChangeOption.bind(this, 'SubstanceAbuse')} />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="MentalHealth">Mental Health:</label>
                      <SelectStyled options={leadYesNo} placeholder={LeadInfo.MentalHealth.label} value={LeadInfo.MentalHealth.value} id="MentalHealth" name="MentalHealth" onChange ={onChangeOption.bind(this, 'MentalHealth')} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="DualDiagnosis">Dual Diagnosis:</label>
                      <SelectStyled options={leadYesNo} placeholder={LeadInfo.DualDiagnosis.label} value={LeadInfo.DualDiagnosis.value} id="DualDiagnosis" name="DualDiagnosis" onChange ={onChangeOption.bind(this, 'DualDiagnosis')} />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Diagnosis">Diagnosis:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={LeadInfo.Diagnosis} id="Diagnosis" name="Diagnosis" onChange ={onChangeInput.bind(this, 'Diagnosis')}/>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col breakPoint={{ xs: 12, md: 6 }}>
                        <Button status="Success" type="button" shape="SemiRound" fullWidth className="text-uppercase">SAVE {LeadName}'s LEAD PROFILE</Button>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col breakPoint={{ xs: 12, md: 4 }}>
                        <Button status="Info" type="button" shape="SemiRound" fullWidth className="text-uppercase">REFER {LeadInfo.FirstName.toUpperCase()}</Button>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 4 }}>
                      <div className="d-flex flex-wrap">
                        <Button status="Info" type="button" shape="SemiRound" className="text-uppercase">MERGE FROM</Button>
                        <input type="text" id="mergFrom" name="mergFrom"/>
                      </div>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 4 }}>
                        <Button status="Info" type="button" shape="SemiRound" fullWidth className="text-uppercase">REFER {LeadInfo.FirstName.toUpperCase()}</Button>
                    </Col>
                  </Row>
                </Col>
                <Col breakPoint={{ xs: 12 }}>
                  <p className="text-center">
                    Campaign: {LeadInfo.Campaign}<br/>
                    Signup Date: {LeadInfo.SignUpDate}<br/>
                    IP Address: {LeadInfo.IPAddress}<br/>
                    Terms Accepted: {LeadInfo.TermsAccepted}<br/>
                  </p>
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Card>
        <Container>
          <Row className="justify-content-center align-items-left mb-5">
            <Col breakPoint={{ xs: 12 }}>
              <h2 className="text-left mb-5">LEAD NOTES</h2>
            </Col>
            <Col breakPoint={{ xs: 12 }}>
              <Row className="mb-2">
                <Col breakPoint={{ xs: 12 }}>
                  <label htmlFor="NewLeadNotes">Add a new lead note for {stringFirstCharCapitalized(LeadInfo.FirstName.toLowerCase())} {stringFirstCharCapitalized(LeadInfo.LastName.toLowerCase())}</label>
                </Col>
                <Col breakPoint={{ xs: 12, md: 10 }} className="mb-2">
                  <Input fullWidth size="Medium" className="Name">
                    <input type="text" placeholder='' id="NewLeadNotes" name="NewLeadNotes" onChange ={onChangeInput.bind(this, 'NewLeadNotes')}/>
                  </Input>
                </Col>
                <Col breakPoint={{ xs: 12, md: 2 }}>
                  <Button status="Warning" type="button" shape="SemiRound" fullWidth className="text-uppercase">+ ADD NOTE</Button>
                </Col>
              </Row>
              <Row className="justify-content-left align-items-left mb-5">
                <Col className="col-lg-12">
                  <h4>Lead Notes List</h4>
                </Col>
                <Col className="col-lg-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ENTERED BY</th>
                        <th scope="col">DATE</th>
                        <th scope="col">NOTE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr> 
                        <td scope="col"></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col className="col-lg-3">
                  <Button status="Warning" type="button" shape="SemiRound" fullWidth className="text-uppercase">UPDATE/SAVE LEAD NOTES</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Card>
          <CardBody>
            <Container>
              <Row className="mb-3">
                <Col className="mb-3" breakPoint={{ xs: 12 }}>
                  <Accordion>
                    <AccordionItem uniqueKey={1} title="LEAD INFORMATION">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={2} title="PATIENT/CHILD PROFILE">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={3} title="INSURANCE">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={4} title="SELF HARM HISTORY">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={5} title="VIOLENCE HISTORY">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={6} title="LEGAL HISTORY">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={7} title="THERAPHY HISTORY">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={8} title="SCHOOL HISTORY">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={9} title="DRUG HISTORY">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={10} title="SEXUAL HISTORY">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={11} title="EMERGENCY CONTACT">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={12} title="PARENT/GUARDIAN/SPONSOR INFO">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={13} title="REFERRAL INFO">
                      Content
                    </AccordionItem>
                    <AccordionItem uniqueKey={14} title="VERIFICATION OF BENEFITS UPLOAD">
                      Content
                    </AccordionItem>
                  </Accordion>
                </Col>
                <Col className="mb-3" breakPoint={{ xs: 12, md: 6 }}>
                  <Button status="Warning" type="button" shape="SemiRound" fullWidth className="text-uppercase">SAVE {LeadInfo.FirstName.toUpperCase()} {LeadInfo.LastName.toUpperCase()}'S LEAD PROFILE</Button>
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Card>
        <Container>
          <Row className="justify-content-center align-items-left mb-5">
            <Col breakPoint={{ xs: 12 }}>
              <h2 className="text-left mb-5">TO DO ITEMS</h2>
            </Col>
            <Col breakPoint={{ xs: 12 }}>
              <Row className="mb-2">
                <Col breakPoint={{ xs: 12 }}>
                  <label htmlFor="NewLeadNotes">Add a new to-do item for {stringFirstCharCapitalized(LeadInfo.FirstName.toLowerCase())} {stringFirstCharCapitalized(LeadInfo.LastName.toLowerCase())}</label>
                </Col>
                <Col breakPoint={{ xs: 12 }} className="mb-2">
                  <Input fullWidth size="Medium" className="Name">
                    <input type="text" placeholder='' id="NewLeadNotes" name="NewLeadNotes" onChange ={onChangeInput.bind(this, 'NewLeadNotes')}/>
                  </Input>
                </Col>
                <Col breakPoint={{ xs: 12, md: 3 }}>
                  <Button status="Warning" type="button" shape="SemiRound" fullWidth className="text-uppercase">+ ADD NOTE</Button>
                </Col>
              </Row>
              <Row className="justify-content-left align-items-left mb-5">
                <Col className="col-lg-12">
                  <h4>Lead Notes List</h4>
                </Col>
                <Col className="col-lg-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ENTERED BY</th>
                        <th scope="col">DATE</th>
                        <th scope="col">NOTE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr> 
                        <td scope="col"></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="ToDoReminderDate">Reminder Date:</label>
                  <Input fullWidth size="Medium" className="notes">
                    <DatePicker id="ToDoReminderDate" name="ToDoReminderDate" selected={LeadInfo.ToDoReminderDate} value={LeadInfo.ToDoReminderDate} onChange={onChangeDate.bind(this, 'ToDoReminderDate')} />
                  </Input>
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="ToDoUser">User:</label>
                  <SelectStyled options={leadAdmins} placeholder={LeadInfo.ToDoUser.label} value={LeadInfo.ToDoUser.value} id="ToDoUser" name="ToDoUser" onChange ={onChangeOption.bind(this, 'ToDoUser')} />
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="submitButtons">&nbsp;</label>
                  <Button id="submitButtons" status="Warning" type="button" shape="SemiRound" fullWidth className="submitButtons text-uppercase">UPDATE/SAVE TO DO'S</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>);
  }
}
