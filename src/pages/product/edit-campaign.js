import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { Component } from 'react';
import { Link } from 'gatsby';
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

const campaignTypeOption = [
    { value: '1', label: 'One Time Billing' },
    { value: '2', label: 'Recurring Billing' },
    { value: '3', label: 'No Billing' },
  ];

const campaignStatusOption = [
  { value: 'Active', label: 'Active' },
  { value: 'InActive', label: 'InActive' },
];

const campaignBillingIntervalOption = [
  { value: 'One Time', label: 'One Time' },
  { value: '1 Month', label: '1 Month' },
  { value: '3 Months', label: '3 Months' },
  { value: '6 Months', label: '6 Months' },
  { value: '1 Year', label: '1 Year' },
  { value: '2 Years', label: '2 Years' },
];

const isBrowser = typeof window !== "undefined"

export default class EditCampaign extends Component  {
  state = {
        CampaignTyData: [],
        CampaignAddedState: false,
        CampaignFieldsAddedState: false,
        PageURLState: false,
        CampaignListByProductID: [],
        CampaignTypeDataString : '',
        CampaignFieldsData: [],
        LandingPageDataByCampaignIdData: [],

        CampaignID: '',
        ProductId: '',
        CompanyId: '',
        CampaignName: '',
        CampaignTypeDataId: '',
        CampaignStatus: '',
        BillAmount: '',
        BillAmountFirstRecur: '',
        BillAmountRecur: '',
        BillInterval: '',
        RetryIntervalDays: '',
        RetryNum: '',

        FieldName: '',
        DisplayName: '',

        PageURL: ''
  }  

  saveState = (data) => {
    this.setState(data);
  }

  componentWillUnmount(){
    this.setState({
      CampaignTyData: [],
      CampaignAddedState: false,
      CampaignFieldsAddedState: false,
      PageURLState: false,
      CampaignListByProductID: [],
      CampaignTypeDataString : '',
      CampaignFieldsData: [],
      LandingPageDataByCampaignIdData: [],

      CampaignID: '',
      ProductId: '',
      CompanyId: '',
      CampaignName: '',
      CampaignTypeDataId: '',
      CampaignStatus: '',
      BillAmount: '',
      BillAmountFirstRecur: '',
      BillAmountRecur: '',
      BillInterval: '',
      RetryIntervalDays: '',
      RetryNum: '',

      // Fulfillment List Fields
      FieldName: '',
      DisplayName: '',

      PageURL: ''

    })  
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/"
    }

    const { saveState, state } = this;

    /* getting url parameters */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const prodId = urlParams.get('productID');
    const campaignID = urlParams.get('campaignID');

    this.saveState({
      ProductId: prodId,
      CampaignID: campaignID
    });
    console.log('Product id Paremeter:'+prodId);
     /** Get All Company Details **/
     axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblCampaigns',
        queryType: 'getCampaignByProductId',
        ProductID: prodId
      }
    })
    .then(function (response) {
      console.log('Compaign Data: '+ JSON.stringify(response.data[0].CampaignName));

      /** Get the string value of the currrent Campaign type **/
        {switch(response.data[0].CampaignType){
          case '1':
            saveState({
              CampaignTypeDataString: 'One Time Billing'
            });
            break;
          case '2':
            saveState({
              CampaignTypeDataString: 'Recurring Billing'
            });
            break;
            case '3':
              saveState({
                CampaignTypeDataString: 'No Billing'
              });
            break;  
        } }

      saveState({
          CampaignListByProductID: response.data,
          
          // CampaignID: response.data[0].CampaignID,
          ProductId: response.data[0].ProductID,
          CompanyId: response.data[0].CompanyID,
          CampaignName: response.data[0].CampaignName,
          CampaignTypeDataId: response.data[0].CampaignType,
          CampaignStatus: response.data[0].CampaignStatus,
          BillAmount: response.data[0].BillAmount,
          BillAmountFirstRecur: response.data[0].BillAmountFirstRecur,
          BillAmountRecur: response.data[0].BillAmountRecur,
          BillInterval: response.data[0].BillInterval,
          RetryIntervalDays: response.data[0].RetryIntervalDays,
          RetryNum: response.data[0].RetryNum,
      });


    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });



    

    /** Get All CompaignField Detail **/
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblCampaignFields',
        queryType: 'getCampaignFieldByCampaignId',
        CampaignID: campaignID
      }
    })
    .then(function (response) {

      console.log('Campaign Field Name: '+ JSON.stringify(response.data));

      saveState({
          CampaignFieldsData: response.data,
          // CampaignID: response.data[0].CampaignID,
          // FieldName: response.data[0].FieldName,
          // DisplayName: response.data[0].FieldDisplayName,
      });

    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });


    /** Get All tblLandingPage Detail By CampaignID **/
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblLandingPage',
        queryType: 'getLandingPageByCampaignId',
        CampaignID: campaignID
      }
    })
    .then(function (response) {
      console.log('Campaign Field Name: '+ JSON.stringify(response.data));
      saveState({
        LandingPageDataByCampaignIdData: response.data
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

  
  /** Saving Product **/
  onSaveCampaign = (e) => {
    const { saveState, state } = this;
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblCampaigns',
        queryType: 'updateCampaign',
        CampaignID: this.state.CampaignID,  
        ProductId: this.state.ProductId,
        CompanyId: this.state.CompanyId,
        CampaignName: this.state.CampaignName,
        CampaignTypeDataId: this.state.CampaignTypeDataId,
        CampaignStatus: this.state.CampaignStatus,
        BillAmount: this.state.BillAmount,
        BillAmountFirstRecur: this.state.BillAmountFirstRecur,
        BillAmountRecur: this.state.BillAmountRecur,
        BillInterval: this.state.BillInterval,
        RetryIntervalDays: this.state.RetryIntervalDays,
        RetryNum: this.state.RetryNum,
      }
    })
    .then(function (response) {
      console.log(response,`New Campaign successfully Added`);
      saveState({
        CampaignAddedState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }


  // To do
  onAddPageURL = (e) => {
    const { saveState, state } = this;
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLandingPage',
        queryType: 'addNewLandingPage',
        CampaignID: this.state.CampaignID,
        PageURL: this.state.PageURL,
      }
    })
    .then(function (response) {
      console.log(response,`New PageURL successfully Added`);
      saveState({
        PageURLState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  // To do
  onSaveFieldList = (e) => {
    const { saveState, state } = this;
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblCampaignFields',
        queryType: 'addNewCampaignField',
        CampaignID: this.state.CampaignID,
        FieldName: this.state.FieldName,
        DisplayName: this.state.DisplayName,
      }
    })
    .then(function (response) {
      console.log(response,`New Campaign successfully Added`);
      saveState({
        CampaignFieldsAddedState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  onSelectCampaignTypeOption = (e) => { 
    this.saveState({
        CampaignTypeDataId: e.value
    });
  }
  onSelectCampaignStatusOption = (e) => { 
    this.saveState({
      CampaignStatus: e.value
    });
  }

  onSelectBillingIntervalOption = (e) => { 
    this.saveState({
      BillInterval: e.value
    });
  }

  

  onChangeStatus = (e) => {

    switch(e.target.name){
      case 'FieldName':
        console.log('Field Name: '+e.target.value);
        this.saveState({
          FieldName: e.target.value
        });
        break;

      case 'DisplayName':
        console.log('Display Name: '+e.target.value);
        this.saveState({
          DisplayName: e.target.value
        });
        break;  

      case 'PageURL':
        console.log('Display PageURL: '+e.target.value);
        this.saveState({
          PageURL: e.target.value
        });
      break; 
        
      case 'CampaignName':
        this.saveState({
          CampaignName: e.target.value
        });
      break;   

      case 'EditBillAmount':
        this.saveState({
          BillAmount: e.target.value
        });
      break;   

      case 'EditBillAmountFirstRecur':
        this.saveState({
          BillAmountFirstRecur: e.target.value
        });
      break;   

      case 'EditBillAmountRecur':
        this.saveState({
          BillAmountRecur: e.target.value
        });
      break;   

      case 'EditRetryIntervalDays':
        this.saveState({
          RetryIntervalDays: e.target.value
        });
      break;   

      case 'EditRetryNum':
        console.log('Display PageURL: '+e.target.value);
        this.saveState({
          RetryNum: e.target.value
        });
      break;   

    }

  }


  render() {

    const {onSelectCampaignTypeOption, onSaveCampaign, onChangeStatus, onSelectBillingIntervalOption, onSelectCampaignStatusOption, onAddPageURL, onSaveFieldList,  state, saveState} = this;

    return (
      <>
        <SEO title="VIEW/EDIT CAMPAIGN" />
        <div className="content-wrapper px-4 py-4">
          <Card>
              <CardBody>

                <Container>
                    <Row>
                      <Col breakPoint={{ xs: 12 }}>
                        <h1 className="text-center mb-5">VIEW/EDIT CAMPAIGN</h1>
                        { this.state.CampaignAddedState ? <div className="text-center text-success">Successfully Updated Campaign</div> : null }
                      </Col>
                    </Row>
                    
                    
                    <Row className="justify-content-center align-items-center mb-5">
                      <Col className="col-lg-12">
                      <form>
                          <Row className="mb-5">
                          <Col breakPoint={{ xs: 12 }} className="mb-4">
                            <label>Product/Service</label>
                            <Link className="color-red text-decoration-none" to={"/product/edit-product?prodId="+this.state.ProductId+"&companyId="+this.state.CompanyId}> {this.state.CampaignName}</Link>
                          </Col>
                            <Col breakPoint={{ xs: 12 }} >
                            <label htmlFor="CampaignName">Campaign Name</label>
                              <Input fullWidth size="Small">
                                <input type="text" value={this.state.CampaignName} id="CampaignName" className="CampaignName" name="CampaignName" onChange={onChangeStatus.bind(this)}/>
                              </Input>
                            </Col>
                            <Col breakPoint={{ xs: 12 }}> 
                              <label htmlFor="CampaignType">Type</label>
                              <SelectStyled options={campaignTypeOption.map(({ value, label }) => { 
                                  return { value: value, label: label };
                                })} placeholder={this.state.CampaignTypeDataString} id="CampaignType" name="CampaignType"  onChange={onSelectCampaignTypeOption.bind(this)}  />
                            </Col>
                            <Col breakPoint={{ xs: 12 }}> 
                              <label htmlFor="EditCampaignStatus">Status</label>
                              <SelectStyled options={campaignStatusOption.map(({ value, label }) => { 
                                  return { value: value, label: label };
                                })}  placeholder={state.CampaignStatus} id="EditCampaignStatus" name="EditCampaignStatus"  onChange={onSelectCampaignStatusOption.bind(this)}  />
                            </Col>
                            
                            <Col breakPoint={{ xs: 12 }}><h3>Billing</h3></Col>
                            
                            <Col breakPoint={{ xs: 12 }} >
                            <label htmlFor="EditBillAmount">First Charge</label>
                              <Input fullWidth size="Small">
                                <input type="text" value={this.state.BillAmount} id="EditBillAmount" className="EditBillAmount" name="EditBillAmount" onChange={onChangeStatus.bind(this)}/>
                              </Input>
                            </Col>
                            <Col breakPoint={{ xs: 12 }} className="mb-3">
                            <label htmlFor="EditBillTrialDays">Trial Length</label>
                              <Input fullWidth size="Small">
                                <input type="text" value={this.state.BillTrialDays} id="EditBillTrialDays" className="EditBillTrialDays" name="EditBillTrialDays" onChange={onChangeStatus.bind(this)}/>
                              </Input>
                              <small className="d-block">Days</small>
                            </Col>
                            <Col breakPoint={{ xs: 12 }} >
                            <label htmlFor="EditBillAmountFirstRecur">First Recur $</label>
                              <Input fullWidth size="Small">
                                <input type="text" value={this.state.BillAmountFirstRecur} id="EditBillAmountFirstRecur" className="EditBillAmountFirstRecur" name="EditBillAmountFirstRecur" onChange={onChangeStatus.bind(this)}/>
                              </Input>
                            </Col>
                            <Col breakPoint={{ xs: 12 }} >
                            <label htmlFor="EditBillAmountRecur">Continuing Recur $</label>
                              <Input fullWidth size="Small">
                                <input type="text" value={this.state.BillAmountRecur} id="EditBillAmountRecur" className="EditBillAmountRecur" name="EditBillAmountRecur" onChange={onChangeStatus.bind(this)}/>
                              </Input>
                            </Col>
                            <Col breakPoint={{ xs: 12 }}> 
                              <label htmlFor="EditBillInterval">Billing Interval:</label>
                              <SelectStyled options={campaignBillingIntervalOption} placeholder='Select Billing Interval' id="EditBillInterval" name="EditBillInterval"  onChange={onSelectBillingIntervalOption.bind(this)}  />
                            </Col>
                            <Col breakPoint={{ xs: 12 }} className="mb-3">
                            <label htmlFor="EditRetryIntervalDays">Retry Interval</label>
                              <Input fullWidth size="Small">
                                <input type="text" value={this.state.RetryIntervalDays} id="EditRetryIntervalDays" className="EditRetryIntervalDays" name="EditRetryIntervalDays" onChange={onChangeStatus.bind(this)}/>
                              </Input>
                              <small className="d-block">Days</small>
                            </Col>
                            <Col breakPoint={{ xs: 12 }} className="mb-3">
                            <label htmlFor="EditRetryNum"># of Retries</label>
                              <Input fullWidth size="Small">
                                <input type="text" value={this.state.RetryNum} id="EditRetryNum" className="EditRetryNum" name="EditRetryNum" onChange={onChangeStatus.bind(this)}/>
                              </Input>
                            </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                                <Button status="Success" type="button" shape="SemiRound" onClick={onSaveCampaign} fullWidth>Save</Button>
                            </Col>
                        </Row>
                        
                        <Row className="justify-content-center align-items-center mb-5">
                          <Col breakPoint={{ xs: 12 }} ><h2 className="text-center">FIELD LIST</h2></Col>
                          <Col breakPoint={{ xs: 12 }} >
                          <table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Field ID</th>
                              <th scope="col">Field Name</th>
                              <th scope="col">	Display Name</th>
                            </tr>
                          </thead>
                          <tbody>
                                {state.CampaignFieldsData.map(({ CampaignID, FieldName, FieldDisplayName }) => { 
                                  return (
                                    <tr> 
                                      <td>{CampaignID}</td>
                                      <td>{FieldName}</td>
                                      <td>{FieldDisplayName}</td>
                                    </tr>
                                  );
                                })}
                          </tbody>
                        </table>
                          </Col>
                          <Col breakPoint={{ xs: 12 }} >
                                <form>
                                { this.state.CampaignFieldsAddedState ? <div className="text-center text-success mb-5">Successfully Updated Campaign Field</div> : null }
                                <Row className="mb-5">
                                  <Col breakPoint={{ xs: 12 }} className="mb-4">
                                    <label htmlFor="FieldName">Field Name:</label>
                                      <Input fullWidth size="Small">
                                        <input type="text" value={this.state.FieldName} id="FieldName" className="FieldName" name="FieldName" onChange={onChangeStatus.bind(this)}/>
                                      </Input>
                                  </Col>
                                  <Col breakPoint={{ xs: 12 }} >
                                    <label htmlFor="DisplayName">Display Name</label>
                                      <Input fullWidth size="Small">
                                        <input type="text" value={this.state.DisplayName} id="DisplayName" className="DisplayName" name="DisplayName" onChange={onChangeStatus.bind(this)}/>
                                      </Input>
                                  </Col>
                                  <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                                    <Button status="Success" type="button" shape="SemiRound" onClick={onSaveFieldList} fullWidth>Add</Button>
                                </Col>
                            </Row>
                                </form>
                                
                          </Col>
                        </Row>

                        <Row className="justify-content-center align-items-center mb-5">
                          <Col breakPoint={{ xs: 12 }} ><h2 className="text-center">LANDING PAGE LIST</h2></Col>
                          <Col breakPoint={{ xs: 12 }} >
                          <table class="table table-striped">
                        <thead>
                            <tr>
                              <th scope="col">LandingPage ID</th>
                              <th scope="col">Campaign ID</th>
                              <th scope="col">Page URL</th>
                            </tr>
                          </thead>
                          <tbody>
                                {state.LandingPageDataByCampaignIdData.map(({ LandingPageID, CampaignID, PageURL }) => { 
                                  return (
                                    <tr> 
                                      <td>{LandingPageID}</td>
                                      <td>{CampaignID}</td>
                                      <td>{PageURL}</td>
                                    </tr>
                                  );
                                })}
                          </tbody>
                        </table>
                          </Col>
                          <Col breakPoint={{ xs: 12 }} >
                          <form>
                                { this.state.PageURLState ? <div className="text-center text-success mb-5">Successfully Updated PageURL Field</div> : null }
                                <Row className="mb-5">
                                  <Col breakPoint={{ xs: 12 }} className="mb-4">
                                    <label htmlFor="PageURL">Page Url:</label>
                                      <Input fullWidth size="Small">
                                        <input type="text" value={this.state.PageURL} id="PageURL" className="PageURL" name="PageURL" onChange={onChangeStatus.bind(this)}/>
                                      </Input>
                                  </Col>
                                  <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                                    <Button status="Success" type="button" shape="SemiRound" onClick={onAddPageURL} fullWidth>Add</Button>
                                </Col>
                            </Row>
                                </form>
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