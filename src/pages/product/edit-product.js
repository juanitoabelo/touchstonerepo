import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
import { ButtonLink } from '@paljs/ui/Button';
import { Button } from '@paljs/ui/Button';
import { navigate, Link } from 'gatsby';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { Component } from 'react';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import axios from 'axios';
import { Container } from '@material-ui/core';

import { useQueryParam, NumberParam, StringParam } from "use-query-params";

// import { useParams } from "react-dom";

import { isLoggedIn } from "../../components/services/auth"

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;


const productStatusData = [
  { value: 'Active', label: 'Active' },
  { value: 'InActive', label: 'InActive' },
];


const fulfillmentlist = [
  { value: 'POSTSIGNUP', label: 'Signup Web Service' },
  { value: 'POSTCANCEL', label: 'Cancel Web Service' },
  { value: 'POSTBILLING', label: 'Billing Web Service' },
  { value: 'CSVSIGNUP', label: 'Signup Nightly Email' },
  { value: 'CSVCANCEL', label: 'Cancel Nightly Email' },
  { value: 'CSVBILLING', label: 'Billing Nightly Email' },
];
//  const params = useParams();

const isBrowser = typeof window !== "undefined"

export default class EditProduct extends Component  {
  state = {
    ProductDataName: '',
    ProductId: '',
    CompanyId: '',
    ProductStatus: '',
    ProductDescription: '',
    CampaignListByProductID: [],
  }

  saveState = (data) => {
    this.setState(data);
  }

  componentWillUnmount(){
    this.setState({
      ProductDataName: '',
      ProductId: '',
      CompanyId: '',
      ProductStatus: '',
      ProductDescription: '',
      CampaignListByProductID: [],
    })  
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/"
    }
    // ajax

    const { saveState } = this;

    /* getting url parameters */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const prodId = urlParams.get('prodId');
    const companyId = urlParams.get('companyId')

    this.saveState({
      ProductId: prodId,
      CompanyId: companyId
    });

     /** Get All Company Details **/
     axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblCampaigns',
        queryType: 'getCampaignByProductId',
        ProductID: prodId
      }
    })
    .then(function (response) {
      console.log('Compaign Data: '+ JSON.stringify(response.data));
      saveState({
        CampaignListByProductID: response.data
      });
       
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });


      console.log('product id:'+prodId);
     /** Get All Company Details **/
     axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblProducts',
        queryType: 'getProductById',
        ProductId: prodId,
        CompanyId: companyId,
      }
    })
    .then(function (response) {
      // console.log('product id 2:'+prodId);
      console.log('Single Product Data: '+ JSON.stringify(response.data));
      saveState({
        ProductStatus: response.data.ProductStatus,
        ProductDataName : response.data.ProductName,
        ProductDescription: response.data.ProductDescription,
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
  onSaveProduct = (e) => {
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblProducts',
        queryType: 'updateProductInfo',
        ProductID: this.state.ProductId,
        ProductCompanyID: this.state.CompanyId,
        ProductDataName: this.state.ProductDataName,
        ProductDescription: this.state.ProductDescription,
        ProductStatus: this.state.ProductStatus,
      }
    })
    .then(function (response) {
      console.log(response,`New Product Info successfully Added`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  // To do:
  onSaveFulfillment = (e) => {
    // axios({
    //   method: 'get',
    //   url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
    //   params: {
    //     tblName: 'tblProducts',
    //     queryType: 'updateProductInfo',
    //     ProductID: this.state.ProductId,
    //     ProductCompanyID: this.state.CompanyId,
    //     ProductDataName: this.state.ProductDataName,
    //     ProductDescription: this.state.ProductDescription,
    //     ProductStatus: this.state.ProductStatus,
    //   }
    // })
    // .then(function (response) {
    //   console.log(response,`New Product Info successfully Added`);
    // })
    // .catch(function (error) {
    //   console.log(error,`error`);
    // });
  }
  // To do:
  onSaveMerchant = (e) => {

  } 

  onChangeProductStatusOption = (e) => { 
    this.saveState({
      ProductStatus: e.value
    });
  }

  onChangeProductName = (e) => {
    // v will be true or false
    this.saveState({
      ProductDataName: e.target.value
    });

  }

  onChangeProductDescription = (e) => {
    // v will be true or false
    this.saveState({
      ProductDescription: e.target.value
    });
    
  }
 
  // To do:
  onChangeMerchantOption = (e) => { 
    this.saveState({
      // ProductStatus: e.value
    });
  }

  // To do:
  onChangeFulfillmentOption = (e) => { 
    this.saveState({
      // ProductStatus: e.value
    });
  }

  
  render() {
    
    const {onChangeProductName, onChangeProductStatusOption, onSaveProduct, onChangeProductDescription, onSaveFulfillment,onChangeMerchantOption, onChangeFulfillmentOption,onSaveMerchant, state} = this;

    return (
      <>
        <SEO title="ADD PRODUCT/SERVICE" />
        <div className="content-wrapper px-4 py-4">
          <Card>
              <CardBody>

                <Container>
                    <Row>
                      <Col breakPoint={{ xs: 12 }}>
                        <h1 className="text-center mb-5">EDIT PRODUCT/SERVICE</h1>
                      </Col>
                    </Row>
                    
                    <Row className="justify-content-center align-items-center mb-5">
                      <Col className="col-lg-12">
                      <form>
                          <Row>
                            <Col breakPoint={{ xs: 12 }} >
                            <label htmlFor="ProductName">Product/Service Name</label>
                              <Input fullWidth size="Small" className="notes">
                                <input type="text" placeholder={this.state.ProductDataName} value={this.state.ProductDataName} id="ProductName" className="ProductName" name="ProductName" onChange={onChangeProductName.bind(this)}/>
                              </Input>
                            </Col>
                            <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="CompanyID">Status</label>
                              
                              <SelectStyled options={productStatusData.map(({ value, label }) => { 
                                  return { value: value, label: label };
                                })}  placeholder={state.ProductStatus} id="ProductStatus" name="ProductStatus" value={state.ProductStatus} onChange ={onChangeProductStatusOption.bind(this)}  />
                                
                            </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 12 }}>
                              <label htmlFor="ProductDescription">Product/Service Description</label>
                              <Input fullWidth shape="Round">
                                <textarea rows={5} value={this.state.ProductDescription} name="ProductDescription" id="ProductDescription" onChange={onChangeProductDescription.bind(this)} />
                              </Input>
                            </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}></Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                                <Button status="Success" type="button" shape="SemiRound" onClick={onSaveProduct} fullWidth>Save</Button>
                            </Col>
                        </Row>
                              
                      </form> 
                      </Col>
                    </Row>

                  </Container>

                  <Container>
                    <Row>
                      <Col breakPoint={{ xs: 12 }}>
                        <h2 className="text-center mb-5">CAMPAIGN LIST</h2>
                      </Col>
                    </Row>

                    <Row className="justify-content-center align-items-center mb-5">
                      <Col className="col-lg-12">
                      <table class="table table-striped">
                        <thead>
                            <tr>
                              <th scope="col">Action</th>
                              <th scope="col">#ID</th>
                              <th scope="col">Campaign Name</th>
                              <th scope="col">Type</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                                {state.CampaignListByProductID.map(({ CampaignID, CampaignName, CampaignType, CampaignStatus }) => { 
                                  switch(CampaignType){
                                    case '1':
                                      CampaignType = 'One Time Billing';
                                      break;
                                    case '2':
                                      CampaignType = 'Recurring Billing';
                                      break;
                                      case '3':
                                        CampaignType = 'No Billing';
                                      break;  
                                  } 
                                  return (
                                    <tr> 
                                      <td><Link to={"/product/edit-campaign?productID="+this.state.ProductId+"&campaignID="+CampaignID}>View/Edit</Link></td>
                                      <td>{CampaignID}</td>
                                      <td>{CampaignName}</td>
                                      <td>{CampaignType}</td>
                                      <td>{CampaignStatus}</td>
                                    </tr>
                                  );
                                })}
                          </tbody>
                        </table>
                      </Col>
                      <Col className="col-lg-12">
                        <ButtonLink status="SUCCESS" onClick={() => navigate('/product/add-campaign?ProductID='+this.state.ProductId+'&CompanyID='+this.state.CompanyId)} fullWidth shape="Rectangle">Add Campaign</ButtonLink>
                      </Col>
                    </Row>
                    
                  </Container>

                  <Container>
                    <Row>
                      <Col breakPoint={{ xs: 12 }}>
                        <h2 className="text-center mb-5">FULFILLMENT LIST</h2>
                      </Col>
                    </Row>

                    <Row className="justify-content-center align-items-center mb-5">
                      <Col className="col-lg-12">
                      <table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                              <th scope="col">Type</th>
                              <th scope="col">URL</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr> 
                              <td scope="col"></td>
                              <td>Type info</td>
                              <td>URL Info</td>
                            </tr>
                          </tbody>
                        </table>
                      </Col>
                      <Col className="col-lg-12 mb-3">Type:</Col>
                      <Col className="col-lg-4">
                        <ButtonLink status="SUCCESS" onClick={onSaveFulfillment} fullWidth shape="Rectangle">Add Fulfillment</ButtonLink>
                      </Col>
                      <Col className="col-lg-4">
                      <SelectStyled options={fulfillmentlist}  placeholder='Select Fulfillment List' id="Fulfillment" name="Fulfillment"  onChange={onChangeFulfillmentOption.bind(this)}  />
                      </Col>
                      <Col className="col-lg-4"></Col>
                    </Row>
                    
                  </Container>

                  <Container>
                    <Row>
                      <Col breakPoint={{ xs: 12 }}>
                        <h2 className="text-center mb-5">MERCHANT ACCOUNT LIST</h2>
                      </Col>
                    </Row>

                    <Row className="justify-content-center align-items-center mb-5">
                      <Col className="col-lg-12">
                      <table class="table table-striped">
                        <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Limit</th>
                              <th scope="col">Charged</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr> 
                              <td scope="col">Name</td>
                              <td>Limit</td>
                              <td>Charged</td>
                            </tr>
                          </tbody>
                        </table>
                      </Col>
                      <Col className="col-lg-12 mb-3">Account:</Col>
                      <Col className="col-lg-4">
                        <ButtonLink status="SUCCESS" onClick={onSaveMerchant} fullWidth shape="Rectangle">Add Merchant</ButtonLink>
                      </Col>
                      <Col className="col-lg-4">
                      <SelectStyled options={fulfillmentlist}  placeholder='Select Merchant Account List' id="Merchant" name="Merchant"  onChange={onChangeMerchantOption.bind(this)}  />
                      </Col>
                      <Col className="col-lg-4"></Col>
                    </Row>
                    
                  </Container>

              </CardBody>
            </Card>
          </div>
      </>
    );
  }
}