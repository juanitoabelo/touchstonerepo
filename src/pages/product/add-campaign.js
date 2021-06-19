import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
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

const campaignTypeOption = [
    { value: '1', label: 'One Time Billing' },
    { value: '2', label: 'Recurring Billing' },
    { value: '3', label: 'No Billing' },
  ];

const isBrowser = typeof window !== "undefined"

export default class AddCampaign extends Component  {
  state = {
    CampaignTyData: [],
    CampaignName: '',
    CampaignTypeDataId: '',
    CampaignAddedState: false,
    ProductId: '',
    CompanyId: ''
  }  

  saveState = (data) => {
    this.setState(data);
  }

  componentWillUnmount(){
    this.setState({
        CampaignTyData: [],
        CampaignName: '',
        CampaignTypeDataId: '',
        CampaignAddedState: false,
        ProductId: '',
        CompanyId: ''
    })  
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/"
    }

    const { saveState } = this;

    /* getting url parameters */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const prodId = urlParams.get('ProductID');
    const companyId = urlParams.get('CompanyID')

    this.saveState({
      ProductId: prodId,
      CompanyId: companyId
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
        queryType: 'addNewCampaign',
        CampaignTypeDataId: this.state.CampaignTypeDataId,
        CampaignName: this.state.CampaignName,
        ProductId: this.state.ProductId,
        CompanyId: this.state.CompanyId,
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

  onSelectCampaignTypeOption = (e) => { 
    this.saveState({
        CampaignTypeDataId: e.value
    });
  }

  onChangeCampaignName = (e) => {
    // v will be true or false
    this.saveState({
        CampaignName: e.target.value
    });

  }

  render() {

    const {onChangeProductName, onSelectCampaignTypeOption, onSaveCampaign, onChangeCampaignName, state} = this;

    return (
      <>
        <SEO title="ADD CAMPAIGN" />
        <div className="content-wrapper px-4 py-4">
          <Card>
              <CardBody>

                <Container>
                    <Row>
                      <Col breakPoint={{ xs: 12 }}>
                        <h1 className="text-center mb-5">ADD CAMPAIGN</h1>
                        { this.state.CampaignAddedState ? <div className="text-center text-success">Successfully Added New Campaign</div> : null }
                      </Col>
                    </Row>

                    <Row className="justify-content-center align-items-center mb-5">
                      <Col className="col-lg-12">
                      <form>
                          <Row>
                            <Col breakPoint={{ xs: 12 }} >
                            <label htmlFor="CampaignName">Campaign Name</label>
                              <Input fullWidth size="Small">
                                <input type="text" placeholder="" id="CampaignName" className="CampaignName" name="CampaignName" onChange={onChangeCampaignName.bind(this)}/>
                              </Input>
                            </Col>
                            <Col breakPoint={{ xs: 12 }}> 
                              <label htmlFor="CampaignType">Type</label>
                              <SelectStyled options={campaignTypeOption} placeholder='Select Campaign Type' id="CampaignType" name="CampaignType"  onChange={onSelectCampaignTypeOption.bind(this)}  />
                            </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                                <Button status="Success" type="button" shape="SemiRound" onClick={onSaveCampaign} fullWidth>Add New Campaign</Button>
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