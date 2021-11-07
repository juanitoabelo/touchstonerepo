import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
// import { ButtonLink } from '@paljs/ui/Button';
import { Button } from '@paljs/ui/Button';
// import { navigate } from 'gatsby';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { Component } from 'react';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { isLoggedIn, getUser } from "../../components/services/auth"
import Alert from '@paljs/ui/Alert';
// import { render } from 'react-dom';

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

let ProductNameSelected = '';
let thisProductNameFinal = '';
const isBrowser = typeof window !== "undefined"

export default class ReferLead extends Component {

  state = {
      isSaved : false,
      IPAddress: '',
      ReferCompanyID: 0,
      ProductData: [],
      LeadReferedNetworkData: [],
      ProductID: ''
  }

  componentWillUnmount(){
    this.setState({
        isSaved : false,
        IPAddress: '',
        ReferCompanyID: 0,
        ProductData: [],
        LeadReferedNetworkData: [],
        ProductID: ''
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
    // axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {    
      params: {
        tblName: 'tblUsers',
        queryType: 'searchRepresentativeUsers'
      }
    })
    .then(function (response) {
       //console.log('Representative User Data: '+ JSON.stringify(response.data));
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

     /** Get users IP Address **/
    //  axios.get('https://geolocation-db.com/json/')
     axios.get(process.env.REACT_APP_GEOLOCATION_URL)
     .then(function (response) {
        //console.log('Users Geolocation Data: '+ JSON.stringify(response.data.IPv4));
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
    // axios.get('https://touchstone.touchstonemarketplace.com/touchstone-ajax/ajax.php', {
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {  
        params: {
          tblName: 'tblProducts',
          queryType: 'getAllProducts'
        }
      })
      .then(function (response) {
        // console.log('All Product Data: '+ JSON.stringify(response.data));
        saveState({
            ProductData: response.data,
            // ProductID: response.data.ProductID,
            // ProductName: response.data.ProductName,
            // CompanyID: response.data.CompanyID,
            // IsShipping: response.data.IsShipping,
            // Thumbnail: response.data.Thumbnail,
            // ProductDescription: response.data.ProductDescription,
            // ProductHealth: response.data.ProductHealth,
            // ProductStatus: response.data.ProductStatus,
            // LimitAmount: response.data.LimitAmount,
        });
         
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (response) {
        // always executed
        console.log(response,`successfull`);
      });

    
      /** Get All Refered Leads Details **/
     axios.get(process.env.REACT_APP_API_DATABASE_URL, {
        params: {
          tblName: 'tblLeads',
          queryType: 'getAllLeadReferedNetwork',
          LeadID: LeadID
        }
      })
      .then(function (response) {
        //  console.log('All Refered Lead Data: '+ JSON.stringify(response.data));
        saveState({
            LeadReferedNetworkData: response.data
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
  
  onReferLead = (e) => {
    const { saveState, state } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    // axios({
    //   method: 'get',
    //   url: 'https://touchstone.touchstonemarketplace.com/touchstone-ajax/ajax.php',

    axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblLeads',
        queryType: 'referNewLeads',
        CampaignID: this.state.CampaignID,
        ProductID: this.state.ProductID,
        LeadID: LeadID,
        CompanyID: e,
        UserId: getUser().userid,
      }
    })
    .then(function (response) {
      saveState({
        isSaved: true
      });
      //console.log(response,`Refered New Client successfull`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

  }

  onChangeStatus = (e) => {
     this.saveState({
      ProductID: e.value
     });

  }
  
  render() {
    const { state, onChangeStatus, onReferLead } = this;
    return (
      <>
        <SEO title="ADD USER" />
        <div className="content-wrapper px-4 py-4">
  
        <Card>
            <CardBody>

                <Container>
                    <Row>
                        <Col breakPoint={{ xs: 12 }}> 
                            <h1 className="text-center mb-5 text-uppercase">REFER LEAD</h1> 
                        </Col>
                        { state.isSaved ? <Col breakPoint={{ xs: 12 }} className="success text-center"><Alert className="success-message bg-success">Successfully Refered a Lead</Alert></Col> : false }
                    </Row>
  
                    <Row>
                        <Col breakPoint={{ xs: 12 }}>
                        <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">Company</th>
                                    <th scope="col">Network</th>
                                    <th scope="col">Insurance</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                
                                {this.state.LeadReferedNetworkData.map(({ CompanyID, NetworkID,CompanyName,NetworkName, InsuranceID, InsuranceName }) => { 
                                    if(CompanyName == null){
                                        CompanyName = 'NA'             
                                    }
                                    if(NetworkName == null){
                                        NetworkName = 'NA'             
                                    }
                                    if(InsuranceName == null){
                                        InsuranceName = 'NA'
                                    }
                                    
                                  return (
                                      <tr key={NetworkID}> 
                                        <td scope="col">
                                            {CompanyName}
                                        </td>
                                        <td scope="col">
                                            {NetworkName}
                                        </td>
                                        <td scope="col">
                                            {InsuranceName}
                                        </td>
                                        <td scope="col">

                                            <SelectStyled options={state.ProductData.map(({ ProductID, ProductName, ProductCompanyID }) => { 
                                                
                                                thisProductNameFinal = NetworkID
                                                  if(ProductID == state.ProductID ){
                                                    thisProductNameFinal = ProductName
                                                  } else {
                                                    thisProductNameFinal = "--Select Service--"
                                                  }

                                                if( CompanyID === ProductCompanyID){
                                                 // console.log(NetworkID+" Netowrk Id: "+CompanyID +"==="+ ProductCompanyID);
                                                  // return { value: ProductID, label: ProductName };
                                                }
                                                return { value: ProductID, label: ProductName };

                                                })} placeholder={thisProductNameFinal} id={"ProductID"+NetworkID} name={"ProductID"+NetworkID} onChange ={onChangeStatus.bind(this)} />

                                        </td>
                                        <td><Button onClick={onReferLead.bind(this,CompanyID)} id="submitButtons" status="Warning" type="button" shape="SemiRound" fullWidth className="submitButtons text-uppercase">Refer</Button></td>
                                      </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
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