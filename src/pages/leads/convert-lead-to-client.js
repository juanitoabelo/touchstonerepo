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
import { render } from 'react-dom';

import { getURLParams } from '../../components/utils/common';

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

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
  }
  a {
    max-width: 20rem;
  }
`;


const selectCompaignOption = [
  { value: '2', label: 'Apex Clients' },
  { value: '1', label: 'Apex Leads' },
  { value: '37', label: 'ATC Leads' },
  { value: '4', label: 'Cedar Ridge Leads' },
  { value: '39', label: 'Clearview Girls Academy Leads' },
  { value: '7', label: 'Elevations Leads'},
];

const selectAssignedRepresentativeOptions = [
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

const selectCardTypeOptions = [
  { value: 'Visa', label: 'Visa' },
  { value: 'MASTERCARD', label: 'Master Card' },
  { value: 'Discover', label: 'Discover' },
  { value: 'AMEX', label: 'American Express' },
];
const selectExpMonthOptions = [
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
];
const selectExpYearOptions= [
  { value: '2011', label: '2022' },
  { value: '2012', label: '2023' },
  { value: '2013', label: '2024' },
  { value: '2014', label: '2025' },
  { value: '2015', label: '2026' },
  { value: '2016', label: '2027' },
  { value: '2017', label: '2028' },
  { value: '2018', label: '2029' },
  { value: '2019', label: '2030' },
  { value: '2020', label: '2031' },
  { value: '2021', label: '2032' },
  { value: '2022', label: '2033' },
  { value: '2022', label: '2034' },
  { value: '2022', label: '2035' },
  { value: '2022', label: '2036' },
  { value: '2022', label: '2037' },
  { value: '2022', label: '2038' },
  { value: '2022', label: '2039' },
  { value: '2022', label: '2040' },
];

const isBrowser = typeof window !== "undefined"

export default class AddClient extends Component {

  state = {
      CampaignID: '',
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      HomePhone: '',
      CSUserID: '',
      CSUserIDRepData: [],
      CampaignIDData: [],
      CardType: '',
      ExpMonth: '',
      ExpYear: '',
      BillAddress: '',
      BillCity: '',
      BillState: '',
      BillZip: '',
      BillCountry: '',
      CardNum: '',
      CardCode: '',
      isSaved : false,
      IPAddress: '',
      ReferCompanyID: 0
  }

  componentWillUnmount(){
    this.setState({
      CampaignID: '',
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      HomePhone: '',
      CSUserID: '',
      CSUserIDRepData: [],
      CampaignIDData: [],
      CardType: '',
      ExpMonth: '',
      ExpYear: '',
      BillAddress: '',
      BillCity: '',
      BillState: '',
      BillZip: '',
      BillCountry: '',
      CardNum: '',
      CardCode: '',
      isSaved : false,
      IPAddress: '',
      ReferCompanyID: 0
    })
  }

  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/";
    }

    const { saveState, state } = this;

    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    /** Get All Company Type Details **/
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblUsers',
        queryType: 'searchRepresentativeUsers'
      }
    })
    .then(function (response) {
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
     axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblCampaigns',
        queryType: 'getAllCampaigns'
      }
    })
    .then(function (response) {
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


     /** Get users IP Address **/
     axios.get('https://geolocation-db.com/json/')
     .then(function (response) {
        // console.log('Users Geolocation Data: '+ JSON.stringify(response.data.IPv4));
       saveState({
         IPAddress: response.data.IPv4
       });
       
     })
     .catch(function (error) {
       console.log(error);
     })
     .then(function (response) {
       // always executed
       console.log(response,`successfull`);
     });


      /** Get All Main Leads Details **/
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {
        params: {
          tblName: 'tblLeads',
          queryType: 'getLeadById',
          LeadID: LeadID,
        }
      })
      .then(function (response) {
        saveState({
            CampaignID: response.data.CampaignID,
            FirstName: response.data.FirstName,
            LastName: response.data.LastName,
            EmailAddress: response.data.Email,
            HomePhone: response.data.HomePhone,
            CSUserID: response.data.CSUserID,
            CardType: response.data.CardType,
            ExpMonth: response.data.ExpMonth,
            ExpYear: response.data.ExpYear,
            BillAddress: response.data.BillAddress,
            BillCity: response.data.BillCity,
            BillState: response.data.BillState,
            BillZip: response.data.BillZip,
            BillCountry: response.data.BillCountry,
            CardNum: response.data.CardNum,
            CardCode: response.data.CardCode,
            // IPAddress: response.data.IPAddress,
            PublisherID: 0,
            OrderURL: window.location.href,
            ClickID: 0,
            LandingPageID: 0,
            ReferCompanyID: response.data.ReferCompanyID,
            LeadID: LeadID,
  
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
  
  onAddClient = () => {
    const { saveState, state } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblClients',
        queryType: 'addNewClient',
        CampaignID: this.state.CampaignID,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        EmailAddress: this.state.EmailAddress,
        HomePhone: this.state.HomePhone,
        CSUserID: this.state.CSUserID,
        CardType: this.state.CardType,
        ExpMonth: this.state.ExpMonth,
        ExpYear: this.state.ExpYear,
        BillAddress: this.state.BillAddress,
        BillCity: this.state.BillCity,
        BillState: this.state.BillState,
        BillZip: this.state.BillZip,
        BillCountry: this.state.BillCountry,
        CardNum: this.state.CardNum,
        CardCode: this.state.CardCode,
        IPAddress: this.state.IPAddress,
        PublisherID: 0,
        OrderURL: window.location.href,
        ClickID: 0,
        ReferCompanyID: this.state.ReferCompanyID,
        LandingPageID: 0,
        LeadID: LeadID,

      }
    })
    .then(function (response) {
      saveState({
        isSaved: true
      });
      // console.log(response,`Added New Client successfull`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

  }
  onChangeStatus = (e) => {
     // v will be true or false
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
          case 'CardType':
          this.saveState({
            CardType: e.target.value
          });
          break;
        case 'ExpMonth':
          this.saveState({
            ExpMonth: e.target.value
          });
          break;
        case 'ExpYear':
          this.saveState({
            ExpYear: e.target.value
          });
          break;
        case 'BillAddress':
          this.saveState({
            BillAddress: e.target.value
          });
          break;
        case 'BillCity':
          this.saveState({
            BillCity: e.target.value
          });
          break;         
        case 'BillState':
          this.saveState({
            BillState: e.target.value
          });
          break;
        case 'BillZip':
          this.saveState({
            BillZip: e.target.value
          });
          break;  
        case 'BillCountry':
          this.saveState({
            BillCountry: e.target.value
          });
          break;
        case 'CardNum':
          this.saveState({
            CardNum: e.target.value
          });
          break;
        case 'CardCode':
          this.saveState({
            CardCode: e.target.value
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

  onChangeCardTypeOption = (e) => {
    this.saveState({
      CardType: e.value
    });
  }

  onChangeMonthOption = (e) => {
    this.saveState({
      ExpMonth: e.value
    });
  }

  onChangeYearOption= (e) => {
    this.saveState({
      ExpYear: e.value
    });
  }
  
  render() {
    const { state, onChangeStatus, onAddClient, onChangeCampaignOption, onChangeRepOption, onChangeCardTypeOption, onChangeMonthOption, onChangeYearOption } = this;
    return (
      <>
        <SEO title="ADD USER" />
        <div className="content-wrapper px-4 py-4">
  
        <Card>
            <CardBody>

              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5 text-uppercase">Convert Lead to Client</h1>
                    </Col>
                    { state.isSaved ? <Col breakPoint={{ xs: 12 }} className="success text-center"><Alert className="success-message bg-success">Successfully Added New Client</Alert></Col> : false }
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <form>
                        <Row>
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="CampaignID">Campaign</label>
                            <SelectStyled options={state.CampaignIDData.map(({ CampaignID, CampaignName }) => { 
                                  return { value: CampaignID, label: CampaignName };
                                })}  placeholder={state.CampaignName}  placeholder="Select" id="CampaignID" name="CampaignID" onChange ={onChangeCampaignOption.bind(this)} />
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="FirstName">First Name</label>
                              <Input fullWidth size="Medium" className="FirstName">
                              <input type="text" placeholder={this.state.FirstName} value={this.state.FirstName} id="FirstName" name="FirstName" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="LastName">Last Name</label>
                            <Input fullWidth size="Medium" className="LastName">
                              <input type="text" placeholder={this.state.LastName} value={this.state.LastName} id="LastName" name="LastName" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="EmailAddress">Email</label>
                            <Input fullWidth size="Medium" className="EmailAddress">
                              <input type="email" placeholder={this.state.EmailAddress} value={this.state.EmailAddress} id="EmailAddress" name="EmailAddress" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="HomePhone">Home Phone</label>
                            <Input fullWidth size="Medium" className="HomePhone">
                              <input type="text" placeholder={this.state.HomePhone} value={this.state.HomePhone} id="HomePhone" name="HomePhone" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
  
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="BillAddress">Billing Address</label>
                            <Input fullWidth size="Medium" className="BillAddress">
                              <input type="text" placeholder={this.state.BillAddress} id="BillAddress" name="BillAddress" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="BillCity">Billing City</label>
                            <Input fullWidth size="Medium" className="BillCity">
                              <input type="text" placeholder={this.state.BillCity} id="BillCity" name="BillCity" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="BillState">Billing State</label>
                            <Input fullWidth size="Medium" className="BillState">
                              <input type="text" placeholder={this.state.BillState} id="BillState" name="BillState" onChange ={onChangeStatus.bind(this)}/> 
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="BillZip">Billing Zip</label>
                            <Input fullWidth size="Medium" className="BillZip">
                              <input type="text" placeholder={this.state.BillZip} id="BillZip" name="BillZip" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="BillCountry">Billing Country</label>
                            <Input fullWidth size="Medium" className="BillCountry">
                              <input type="text" placeholder={this.state.BillCountry} id="BillCountry" name="BillCountry" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="CardType">Card Type</label>
                            <SelectStyled options={selectCardTypeOptions}  placeholder="Select" id="CardType" name="CardType" onChange ={onChangeCardTypeOption.bind(this)} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="CardNum">Card Number</label>
                            <Input fullWidth size="Medium" className="CardNum">
                              <input type="text" placeholder={this.state.CardNum} id="CardNum" name="CardNum" onChange ={onChangeStatus.bind(this)}/> 
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="CardCode">CVV</label>
                            <Input fullWidth size="Medium" className="CardCode">
                              <input type="text" placeholder={this.state.CardCode} id="CardCode" name="CardCode" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ xs: 3 }}> 
                            <label htmlFor="ExpMonth">Expiration Date</label>
                            <SelectStyled options={selectExpMonthOptions}  placeholder="Select Month" id="ExpMonth" name="ExpMonth" onChange ={onChangeMonthOption.bind(this)} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ xs: 3 }}>
                            <label htmlFor="ExpYear">&nbsp;</label>
                            <SelectStyled options={selectExpYearOptions}  placeholder="Select Year" id="ExpYear" name="ExpYear" onChange ={onChangeYearOption.bind(this)} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="CSUserID">Assigned Representative</label>
                            <SelectStyled options={state.CSUserIDRepData.map(({ UserId, FullName }) => { 
                                  return { value: UserId, label: FullName };
                                })}  placeholder={state.FullName}  placeholder="Select" id="CSUserID" name="CSUserID" onChange ={onChangeRepOption.bind(this)} />
                          </Col>

                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 3 }} >
                              <Button status="Success" type="button" shape="SemiRound" onClick={onAddClient} fullWidth>Save</Button>
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