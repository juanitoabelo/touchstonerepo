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

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const isBrowser = typeof window !== "undefined"

export default class AddProduct extends Component  {
  state = {
    CompanyData: [],
    ProductDataName: '',
    ProductDataId: '',
    ProductDescription: ''
  }

  saveState = (data) => {
    this.setState(data);
  }

  componentWillUnmount(){
    this.setState({
      CompanyData: [],
      ProductDataName: '',
      ProductDataId: '',
      ProductDescription: ''
    })  
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/"
    }
    // ajax

    const { saveState } = this;

     /** Get All Company Details **/
     axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblCompany',
        queryType: 'getAllCompanyInfo'
      }
    })
    .then(function (response) {
      console.log('Company Data: '+ JSON.stringify(response.data));
      saveState({
        CompanyData: response.data
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
        queryType: 'addProductInfo',
        ProductCompanyID: this.state.ProductDataId,
        ProductDataName: this.state.ProductDataName,
        ProductDescription: this.state.ProductDescription,
      }
    })
    .then(function (response) {
      console.log(response,`New Product Info successfully Added`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  onSelectCompanyOption = (e) => { 
    this.saveState({
      ProductDataId: e.value
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

  render() {

    const {onChangeProductName, onSelectCompanyOption, onSaveProduct, onChangeProductDescription, state} = this;

    return (
      <>
        <SEO title="ADD PRODUCT/SERVICE" />
        <div className="content-wrapper px-4 py-4">
          <Card>
              <CardBody>

                <Container>
                    <Row>
                      <Col breakPoint={{ xs: 12 }}>
                        <h1 className="text-center mb-5">ADD PRODUCT/SERVICE</h1>
                      </Col>
                    </Row>

                    <Row className="justify-content-center align-items-center mb-5">
                      <Col className="col-lg-12">
                      <form>
                          <Row>
                            <Col breakPoint={{ xs: 12 }} >
                            <label htmlFor="ProductName">Product/Service Name</label>
                              <Input fullWidth size="Small" className="notes">
                                <input type="text" placeholder="" id="ProductName" className="ProductName" name="ProductName" onChange={onChangeProductName.bind(this)}/>
                              </Input>
                            </Col>
                            <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="CompanyID">Company</label>
                              <SelectStyled options={state.CompanyData.map(({ companyId, companyName }) => { 
                                  return { value: companyId, label: companyName };
                                })}  placeholder='Select Company' id="CompanyID" name="CompanyID"  onChange={onSelectCompanyOption.bind(this)}  />
                            </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 12 }}>
                              <label htmlFor="ProductDescription">Product/Service Description</label>
                              <Input fullWidth shape="Round">
                                <textarea rows={5} placeholder="" name="ProductDescription" id="ProductDescription" onChange={onChangeProductDescription.bind(this)}/> 
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

              </CardBody>
            </Card>
          </div>
      </>
    );
  }
}