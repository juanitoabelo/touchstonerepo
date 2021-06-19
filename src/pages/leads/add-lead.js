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
import Alert from '@paljs/ui/Alert';

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const selectCompaignOption = [
  { value: '2', label: 'Apex Clients' },
  { value: '1', label: 'Apex Leads' },
  { value: '37', label: 'ATC Leads' },
  { value: '4', label: 'Cedar Ridge Leads' },
  { value: '39', label: 'Clearview Girls Academy Leads' },
  { value: '7', label: 'Elevations Leads'},
];

const selectSourceOption = [
  { value: '6', label: 'Phone Call' },
  { value: '4', label: 'Missed Call' },
  { value: '5', label: 'Form Fill' },
];

const selectStatusOption = [
  { value: 'Active', label: 'Active' },
  { value: 'Referred', label: 'Referred' },
  { value: 'Deactivated', label: 'Deactivated' },
  { value: 'Business Admin', label: 'Business Admin'},
];

const selectInitialRepresentativeOptions = [
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

const isBrowser = typeof window !== "undefined"

export default class AddLead extends Component {
  
  state = {
    CampaignID: '',
    InitialDisposition: 0,
    Status: '',
    FirstName: '',
    LastName: '',
    EmailAddress: '',
    HomePhone: '',
    CSUserID: '',
    CSUserIDRepData: [],
    CampaignIDData: [],
    InitialDispositionData: [],
    StatusData: [],
    isSaved : false

  }

  componentWillUnmount(){
    this.setState({
      CampaignID: '',
      InitialDisposition: 0,
      Status: '',
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      HomePhone: '',
      CSUserID: '',
      CSUserIDRepData: [],
      CampaignIDData: [],
      InitialDispositionData: [],
      StatusData: [],
      isSaved : false
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
          tblName: 'tblUsers',
          queryType: 'searchRepresentativeUsers'
        }
      })
      .then(function (response) {
         console.log('Representative User Data: '+ JSON.stringify(response.data));
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

       /** Get All Company Type Details **/
       axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
        params: {
          tblName: 'tblCampaigns',
          queryType: 'getAllCampaigns'
        }
      })
      .then(function (response) {
         console.log('Compaigns Type Data: '+ JSON.stringify(response.data));
        saveState({
          CampaignIDData: response.data
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

  onSaveLead = () => {
    
    const { saveState, state } = this;

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'addNewLead',
        CampaignID: this.state.CampaignID,
        InitialDisposition: this.state.InitialDisposition,
        Status: this.state.Status,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        EmailAddress: this.state.EmailAddress,
        HomePhone: this.state.HomePhone,
        CSUserID: this.state.CSUserID
      }
    })
    .then(function (response) {
      saveState({
        isSaved: true
      });
      // console.log(response,`Added New Company successfull`);
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

  onChangeSourceOption = (e) => {
    console.log(e.value);
    this.saveState({
      InitialDisposition: e.value
    });
  }

  onChangeStatusOption = (e) => {
    console.log(e.value);
    this.saveState({
      Status: e.value
    });
  }

  render() {

    const { state, saveState, onSaveLead, onChangeStatus, onChangeCampaignOption, onChangeRepOption, onChangeSourceOption, onChangeStatusOption } = this;

    return (
      <>
        <SEO title="ADD LEAD" />
        <div className="content-wrapper px-4 py-4">
  
        
        <Card>
            <CardBody>
  
              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">ADD LEAD</h1>
                    </Col>
                    { state.isSaved ? <Col breakPoint={{ xs: 12 }} className="success text-center"><Alert className="success-message bg-success">Successfully Added New Lead!</Alert></Col> : false }
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <form>
                        <Row>
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="CampaignID">Where is lead from?</label>

                            <SelectStyled options={state.CampaignIDData.map(({ CampaignID, CampaignName }) => { 
                                  return { value: CampaignID, label: CampaignName };
                                })}  placeholder={state.CampaignName}  placeholder="Select" id="CampaignID" name="CampaignID" onChange ={onChangeCampaignOption.bind(this)} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }} >
                            <label htmlFor="InitialDisposition">Source</label>
                            <SelectStyled options={selectSourceOption}  placeholder="Select" id="InitialDisposition" name="InitialDisposition" onChange ={onChangeSourceOption.bind(this)} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }} >
                            <label htmlFor="Status">Status</label>
                            <SelectStyled options={selectStatusOption}  placeholder="Select" id="Status" name="Status" onChange ={onChangeStatusOption.bind(this)} />
                          </Col>

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
                          <label htmlFor="HomePhone">Home Phone</label>
                            <Input fullWidth size="Medium" className="HomePhone">
                              <input type="text" placeholder="" id="HomePhone" name="HomePhone" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="CSUserID">Initial Representative</label>
                            
                            <SelectStyled options={state.CSUserIDRepData.map(({ UserId, FullName }) => { 
                                  return { value: UserId, label: FullName };
                                })}  placeholder={state.FullName}  placeholder="Select" id="CSUserID" name="CSUserID" onChange ={onChangeRepOption.bind(this)} />
                                
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 3 }} >
                              <Button status="Success" type="button" shape="SemiRound" onClick={onSaveLead} fullWidth>Save</Button>
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