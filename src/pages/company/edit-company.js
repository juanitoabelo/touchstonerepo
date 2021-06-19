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
import { isLoggedIn } from "../../components/services/auth";

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

const selectOONAcceptOptions = [
    { value: '0', label: 'No' },
    { value: '1', label: 'Yes' },
];

const selectPopulationServedOptions = [
    { value: '_Adult', label: 'Adult' },
    { value: '_Adolescent', label: 'Adolescent' },
    { value: '_Young Adult', label: 'Young Adult' },
    { value: 'Older Adult', label: 'Older Adult' },
    { value: '_Adult Male', label: 'Adult Male' },
    { value: '_Adult Female', label: 'Adult Female' },
    { value: 'Young Adult Male', label: 'Young Adult Male' },
    { value: 'Young Adult Female', label: 'Young Adult Female' },
    { value: 'Adolescent Female', label: 'Adolescent Female' },
    { value: 'Adolescent Male', label: 'Adolescent Male' },
    { value: 'Gender Not Known', label: 'Gender Not Known' },
    { value: 'Gender Not Identified', label: 'Gender Not Identified' },
    { value: '_LGBTQ+', label: 'LGBTQ+' },
    { value: 'LGBTQ+ Adult', label: 'LGBTQ+ Adult' },
    { value: 'LGBTQ+ Adolescent', label: 'LGBTQ+ Adolescent' },
];

const selectLevelsOfCareOptions = [
    { value: 'RES', label: 'RES' },
    { value: 'PHP', label: 'PHP' },
    { value: 'IOP', label: 'IOP' },
    { value: 'OP', label: 'OP' },
    { value: 'In Patient', label: 'In Patient' },
    { value: 'Stabalization Only', label: 'Stabalization Only' },
    { value: 'Detox', label: 'Detox' },
    { value: 'Other', label: 'Other' },
];

 

const selectJCHOOptions = [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' },
    { value: 'TBD', label: 'TBD' },
];

const selectCARFOptions = [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' },
    { value: 'TBD', label: 'TBD' },
];


const selectNetworkOptions = [
    { value: '0', label: 'Out of Network' },
    { value: '1', label: 'In Network' },
];

/** Glabal variable to get the default selected options **/
let defaultCopanyTyleSelectedOption = 'Select Company Type';
let defaultOONAcceptSelectOption = 'Select OON Option';

const isBrowser = typeof window !== "undefined";

export default class EditCompany extends Component {

  state = {
    UpdateCompanyInsuranceSuccessState: false,
    UpdateCompanySuccessState: false,  
    CompanyName: '',
    CompanyType: 0,
    CompanyMemberType: '',
    CompanyTypeData: [],
    tblCompanyInsuranceData: [],
    selectInsuranceOptions: [],

    companyID: '',
    OONAccept: '',
    City: '',
    State: '',
    Zip: '',
    JCHO: '',
    CARF: '',
    ContactName: '',
    ContactEmail: '',
    ContactPhone: '',
    PopulationServed: '',
    PopulationServedDisplay: [],
    LevelsOfCare: '',
    LevelsOfCareDisplay: [],

    Network: '',
    NetworkValue: '',
    Insurance: '',
    InsuranceValue: ''
  }
  
  componentWillUnmount(){
    this.setState({
        UpdateCompanyInsuranceSuccessState: false,
        UpdateCompanySuccessState: false,
        CompanyName: '',
        CompanyType: 0,
        CompanyMemberType: '',
        CompanyTypeData: [],
        tblCompanyInsuranceData: [],
        selectInsuranceOptions: [],

        companyID: '',
        OONAccept: '',
        City: '',
        State: '',
        Zip: '',
        JCHO: '',
        CARF: '',
        ContactName: '',
        ContactEmail: '',
        ContactPhone: '',
        PopulationServed: '',
        PopulationServedDisplay: [],
        LevelsOfCare: '',
        LevelsOfCareDisplay: [],

        Network: '',
        NetworkValue: '',
        Insurance: '',
        InsuranceValue: ''
    })  
  }

  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/"
    }
    const { saveState, state } = this;

    /* getting url parameters */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const companyID = urlParams.get('companyID');

    this.saveState({
        companyID: companyID
    });

     /** Get All Company Type Details **/
     axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblCompanyType',
        queryType: 'getAllCompanyType'
      }
    })
    .then(function (response) {
        //console.log('Company Type Data: '+ JSON.stringify(response.data));
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



    /** Get All CompaignField Detail **/
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
        params: {
        tblName: 'tblCompany',
        queryType: 'getSingleCompanyInfoById',
        CompanyID: companyID
        }
    })
    .then(function (response) {
         //console.log('tblCompany Data: '+ JSON.stringify(response.data));
        saveState({
            companyID: response.data['CompanyID'],
            CompanyName: response.data['CompanyName'],
            CompanyType: response.data['CompanyType'],
            CompanyMemberType: response.data['MemberType'],
            OONAccept: response.data['OONAccept'],
            City: response.data['City'],
            State: response.data['State'],
            Zip: response.data['Zip'],
            JCHO: response.data['JCHO'],
            CARF: response.data['CARF'],
            ContactName: response.data['ContactName'],
            ContactEmail: response.data['ContactEmail'],
            ContactPhone: response.data['ContactPhone'],
            PopulationServed: response.data['PopulationServed'],
            LevelsOfCare: response.data['LevelsOfCare'],
            PopulationServedDisplay: response.data['PopulationServed'].split(',').map((item)=>({ value: item, label: item })),
            LevelsOfCareDisplay: response.data['LevelsOfCare'].split(',').map((item)=>({ value: item, label: item }))
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
        tblName: 'tblCompanyInsurance',
        queryType: 'getCompanyInsuranceListByCompanyId',
        CompanyID: companyID
      }
    })
    .then(function (response) {
        console.log('Company Type Data: '+ JSON.stringify(response.data));
        let getCompanyInsuranceID = 0;
        response.data.map((item)=>{
          if (parseInt(getCompanyInsuranceID) < parseInt(item.CompanyInsuranceID)) {
            getCompanyInsuranceID = parseInt(item.CompanyInsuranceID);
          }
        });
      saveState({
        tblCompanyInsuranceData: response.data
      });
       
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });


     /** Get All Insurance **/
     axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblInsurance',
        queryType: 'getAllInsurance'
      }
    })
    .then(function (response) {
        //console.log('Company Type Data: '+ JSON.stringify(response.data));
      saveState({
        selectInsuranceOptions: response.data
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

  

  onUpdateCompany = (e) => {
    
     const { saveState, state } = this;

      axios({
        method: 'get',
        url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
        params: {
            tblName: 'tblCompany',
            queryType: 'updateSingleCompanyInfoById',
            companyID: this.state.companyID,
            CompanyName: this.state.CompanyName,
            CompanyType: this.state.CompanyType,
            CompanyMemberType: this.state.CompanyMemberType,
            OONAccept: this.state.OONAccept,
            City: this.state.City,
            State: this.state.State,
            Zip: this.state.Zip,
            JCHO: this.state.JCHO,
            CARF: this.state.CARF,
            ContactName: this.state.ContactName,
            ContactEmail: this.state.ContactEmail,
            ContactPhone: this.state.ContactPhone,
            PopulationServed: this.state.PopulationServed,
            LevelsOfCare: this.state.LevelsOfCare,
        }
      })
      .then(function (response) {
        // console.log(response,`Updated New Company successfull`);
        saveState({
            UpdateCompanySuccessState: true
          });
      })
      .catch(function (error) {
        console.log(error,`error`);
      });
  }
  

  onAddInsuranceCo= (e) => {
    const { saveState, state } = this;

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
          tblName: 'tblCompanyInsurance',
          queryType: 'addCompanyInsuranceData',
          companyID: this.state.companyID,
          InsuranceID: this.state.Insurance,
          InNetwork: this.state.Network,
      }
    })
    .then(function (response) {
      saveState({
        tblCompanyInsuranceData: [
          ...state.tblCompanyInsuranceData,
          {
            CompanyID: state.companyID,
            CompanyInsuranceID: response.data.ID,
            InNetwork: state.Network,
            InsuranceID: state.Insurance
          }
        ],
        Network: '',
        NetworkValue: '',
        Insurance: '',
        InsuranceValue: '',
        UpdateCompanyInsuranceSuccessState: true,
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }


  onDeleteInsuranceCo = (CompanyInsuranceIDValue) => {
    //    console.log("test: "+CompanyInsuranceID);
    const { saveState, state } = this;
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
          tblName: 'tblCompanyInsurance',
          queryType: 'deleteSingleCompanyInsuranceList',
          CompanyInsuranceID: CompanyInsuranceIDValue
      }
    })
    .then(function (response) {
      console.log(response,`Deleted Company Insurance successfull`);
      saveState({
        tblCompanyInsuranceData: state.tblCompanyInsuranceData.filter(({ CompanyInsuranceID })=> CompanyInsuranceID != CompanyInsuranceIDValue)
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


  }


  // Save Company Name Field value to a state after user input
  onChangeStatus = (e) => {
    console.log(e);
    switch(e.target.name){
        case 'CompanyName':
          this.saveState({
            CompanyName: e.target.value
          });
        break;
        case 'City':
          this.saveState({
            City: e.target.value
          });
        break;
        case 'State':
            this.saveState({
                State: e.target.value
            });
        break;
        case 'Zip':
          this.saveState({
            Zip: e.target.value
          });
        break;
        
        case 'ContactName':
            this.saveState({
             ContactName: e.target.value
            });
        break;  
        case 'ContactEmail':
          this.saveState({
            ContactEmail: e.target.value
          });
        break;
        case 'ContactPhone':
            this.saveState({
                ContactPhone: e.target.value
            });
        break;  
    }
    
  }

  onChangeMemberTypeOptions = (e) => {
    //  console.log(e.value);
    this.saveState({
      CompanyMemberType: e.value
    });
  }

  onChangeCompanyTypeOption = (e) => {
    //  console.log('Company value: '+e.value);
    this.saveState({
      CompanyType: e.value
    });
  }

  onChangeAcceptOONOption = (e) => {
    // console.log(e.value);
    this.saveState({
        OONAccept: e.value
    });
  }

  onChangePopulationServedOption = (e) => {
    //  const PopulationServedData = [];
    let PopulationServedData = '';
     e.map(({ value, label }, index) => { 
        if(index==0){
            PopulationServedData = value;
        } else {
            PopulationServedData += ','+value;
        }   
    
      })
    //   console.log("PS Data:"+ PopulationServedData);
      this.saveState({
        PopulationServed: PopulationServedData,
        PopulationServedDisplay: e
       });
  }
  onChangeLevelsOfCareOption = (e) => {
    let LevelsOfCareData = '';
     e.map(({ value }, index) => {
        if(index==0){
            LevelsOfCareData = value;
        } else {
            LevelsOfCareData += ','+value;
        }   
      })
    //  console.log("LevelsOfCareData Data:"+ LevelsOfCareData);
    this.saveState({
        LevelsOfCare: LevelsOfCareData,
        LevelsOfCareDisplay: e
    });
  }

  onChangeJCHOOption = (e) => {
    // console.log(e.value);
    this.saveState({
        JCHO: e.value
    });
  }
  
  onChangeCARFOption = (e) => {
    // console.log(e.value);
    this.saveState({
        CARF: e.value
    });
  }

  onChangeNetworkOption = (e) => {
    this.saveState({
        Network: e.value,
        NetworkValue: { ...e }
    });
  }

  onChangeInsuranceOption = (e) => {
    this.saveState({
        Insurance: e.value,
        InsuranceValue: { ...e }
    });
  }

  


  render() {

    const { state, saveState, onChangeMemberTypeOptions, onChangeCompanyTypeOption, onChangeStatus, onUpdateCompany, onChangeAcceptOONOption, onChangePopulationServedOption, onChangeLevelsOfCareOption, onChangeJCHOOption, onChangeCARFOption, onChangeNetworkOption, onChangeInsuranceOption, onAddInsuranceCo, onDeleteInsuranceCo } = this;
    
    return (
      <>
        <SEO title="View/Edit Company" />
        <div className="content-wrapper px-4 py-4">
                
        <Card>
            <CardBody>

              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">View/Edit Company ({this.state.companyID})</h1>
                    </Col>
                  </Row>
                  { this.state.UpdateCompanySuccessState ? <div className="text-center text-success">Successfully Updated Company</div> : null }
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <form>
                        <Row>
                            <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="CompanyName">Company Name</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="text" placeholder={this.state.CompanyName} value={this.state.CompanyName} id="CompanyType" name="CompanyType" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="CompanyType">Company Type</label>
                             
                            <SelectStyled options={state.CompanyTypeData.map(({ CompanyTypeID, CompanyTypeDesc }) => { 
                                  if(CompanyTypeID == state.CompanyType) {
                                    defaultCopanyTyleSelectedOption = CompanyTypeDesc;
                                  }
                                  return { value: CompanyTypeID, label: CompanyTypeDesc };
                                })}  placeholder={defaultCopanyTyleSelectedOption} id="CompanyType" name="CompanyType" onChange ={onChangeCompanyTypeOption.bind(this)}  />
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="MemberType">Member Type</label>
                            <SelectStyled options={selectMemberTypeOptions.map(({ value, label }) => { 
                                  return { value: value, label: label };
                                })}  placeholder={this.state.CompanyMemberType} id="MemberType" name="MemberType" onChange ={onChangeMemberTypeOptions.bind(this)} />
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="OONAccept">Accept OON</label>
                            <SelectStyled options={selectOONAcceptOptions.map(({ value, label }) => { 
                                  switch(value){
                                    case '0':
                                        defaultOONAcceptSelectOption = 'No'
                                        break;
                                    case '1':
                                        defaultOONAcceptSelectOption = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={defaultOONAcceptSelectOption} id="OONAccept" name="OONAccept" onChange ={onChangeAcceptOONOption.bind(this)} />
                          </Col>
                          

                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="PopulationServed">Population Served</label>
                            <SelectStyled options={selectPopulationServedOptions} isMulti multiple value={this.state.PopulationServedDisplay} id="PopulationServed" name="PopulationServed" onChange ={onChangePopulationServedOption.bind(this)} />
                          </Col>
                          
                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="LevelsOfCare">Levels of Care</label>
                            <SelectStyled options={selectLevelsOfCareOptions}  isMulti multiple value={this.state.LevelsOfCareDisplay} id="LevelsOfCare" name="LevelsOfCare" onChange ={onChangeLevelsOfCareOption.bind(this)} />
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="City">City</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="text" placeholder={this.state.City} value={this.state.City} id="City" name="City" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="State">State</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="text" placeholder={this.state.State} value={this.state.State} id="State" name="State" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="Zip">Zip</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="number" placeholder={this.state.Zip} value={this.state.Zip} id="Zip" name="Zip" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="ContactName">Contact Name</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="text" placeholder={this.state.ContactName} value={this.state.ContactName} id="ContactName" name="ContactName" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="ContactEmail">Contact Email</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="email" placeholder={this.state.ContactEmail} value={this.state.ContactEmail} id="ContactEmail" name="ContactEmail" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="ContactPhone">Contact Phone</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="text" placeholder={this.state.ContactPhone} value={this.state.ContactPhone} id="ContactPhone" name="ContactPhone" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="JCHO">JCHO</label> 
                            <SelectStyled options={selectJCHOOptions}  placeholder={this.state.JCHO} id="JCHO" name="JCHO" onChange ={onChangeJCHOOption.bind(this)} />
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="CARF">CARF</label>
                            <SelectStyled options={selectCARFOptions}  placeholder={this.state.CARF} id="CARF" name="CARF" onChange ={onChangeCARFOption.bind(this)} />
                          </Col>

                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 9 }}></Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 3 }}>
                              <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateCompany} fullWidth>Save</Button>
                          </Col>
                      </Row>
                      
                    </form> 
                    </Col>
                  </Row>


                  <Row className="justify-content-center align-items-center mb-5">
                          <Col breakPoint={{ xs: 12 }} ><h2 className="text-center">Insurance</h2></Col>
                          <Col breakPoint={{ xs: 12 }} >
                             <h3>Insurance Co List</h3> 
                        <table class="table table-striped mb-5">
                        <thead>
                            <tr>
                              <th scope="col">CompanyInsurance ID</th>
                              <th scope="col">Insurance Company</th>
                              <th scope="col">	In Network?</th>
                              <th scope="col">&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                                {state.tblCompanyInsuranceData.map(({ CompanyInsuranceID, CompanyID, InsuranceID, InNetwork}) => { 
                                    switch(InNetwork){
                                        case '0':
                                            InNetwork = 'Out of Network'
                                            break;
                                        case '1':
                                            InNetwork = 'In Network'
                                            break;    
                                    }

                                    /** Convert Insurance Id to insurance name **/
                                    let insuranceId = InsuranceID;
                                    let InsuanranceName = '';
                                    {state.selectInsuranceOptions.map(({ InsuranceID, Name }) => { 
                                            if(InsuranceID == insuranceId){
                                                InsuanranceName = Name;
                                            }
                                        })}
                                        
                                  return (
                                    <tr> 
                                      <td>{CompanyInsuranceID}</td>
                                      <td>{InsuanranceName}</td>
                                      <td>{InNetwork}</td>
                                      <td>
                                        <Button status="Success" type="button" shape="SemiRound" value={CompanyInsuranceID} onClick={onDeleteInsuranceCo.bind(this,CompanyInsuranceID)} fullWidth className="text-uppercase">DELETE</Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                          </tbody>
                        </table>
                          </Col>
                          <Col breakPoint={{ xs: 12 }} >
                                <form>
                                { this.state.UpdateCompanyInsuranceSuccessState ? <div className="text-center text-success mb-5">Successfully Added Company Insurance Co</div> : null }
                                <Row className="mb-5">
                                <Col breakPoint={{ xs: 12 }} className="mb-4">
                                    <h4>Add a new insurance company</h4>
                                </Col>
                                  <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }} className="mb-4">
                                    <label htmlFor="InsuranceID">Insurance co:</label>
                                     <SelectStyled options={state.selectInsuranceOptions.map(({ InsuranceID, Name }) => { 
                                    return { value: InsuranceID, label: Name };
                                    })} placeholder='--Select--' value={this.state.InsuranceValue} id="InsuranceID" name="InsuranceID" onChange ={onChangeInsuranceOption.bind(this)} />
                                  </Col>
                                  <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }} >
                                    <label htmlFor="Network">Network:</label>
                                     <SelectStyled options={selectNetworkOptions} value={this.state.NetworkValue} id="Network" name="Network" onChange ={onChangeNetworkOption.bind(this)} />
                                  </Col>
                                  <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                                    <Button status="Success" type="button" shape="SemiRound" onClick={onAddInsuranceCo} fullWidth className="text-uppercase">Add Insurance CO</Button>
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