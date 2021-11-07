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

import { getURLParams } from '../../components/utils/common';


const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;


const MemberTypeOptions = [
  { value: 'Manager', label: 'Manager' },
  { value: 'Member', label: 'Member' },
  { value: 'Limited', label: 'Limited' },
];

const isBrowser = typeof window !== "undefined"

let CompanyIdToCompanyName = '';

export default class EditNetwork extends Component {

  state = {
    NetworkName: '',
    MemberType: '',
    CompanyID: '',
    CompanyData: [],
    AddCompanyToNetworkSuccessState: false,
    UpdateNetworkSuccessState: false,
    CompanyNetworkData: [],
  }

  componentWillUnmount(){
    this.setState({
      NetworkName: '',
      MemberType: '',
      CompanyID: '',
      CompanyData: [],
      AddCompanyToNetworkSuccessState: false,
      UpdateNetworkSuccessState: false,
      CompanyNetworkData: [],
    })
  }

  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/"
    }

    const { saveState, state } = this;
    const NetworkID = getURLParams('NetworkID');
    saveState({ NetworkID });
    console.log('Insurance ID: '+NetworkID);

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblNetwork',
        queryType: 'getSingleNetworkData',
        NetworkID: NetworkID
      }
    })
    .then(function (response) {
      // console.log('Single Network Data: '+ JSON.stringify(response.data));
      saveState({
        NetworkName: response.data.Name,
      });

    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /** get list of Companies **/
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblCompany',
        queryType: 'getAllCompanyInfo'
      }
    })
    .then(function (response) {
      // console.log('List of Companies Data: '+ JSON.stringify(response.data));
      saveState({
        CompanyData: response.data
      });

    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /** get Company List By Network Id **/
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblCompanyNetwork',
        queryType: 'getCompanyListByNetworkId',
        NetworkID: NetworkID
      }
    })
    .then(function (response) {
      // console.log('List of Companies Data in a Network: '+ JSON.stringify(response.data));
      saveState({
        CompanyNetworkData: response.data
      });

    })
    .catch(function (error) {
      console.log(error,`error`);
    });


  }

  saveState = (data) => {
    this.setState(data);
  }

  onUpdateNetwork = () => {
    const { saveState, state } = this;
    const NetworkID = getURLParams('NetworkID');
    //  console.log('NetworkID ID: '+NetworkID+' '+this.state.NetworkName);

      axios({
        method: 'get',
        url: process.env.REACT_APP_API_DATABASE_URL,
        params: {
          tblName: 'tblNetwork',
          queryType: 'updateNewNetworkInfo',
          NetworkName: this.state.NetworkName,
          NetworkID: NetworkID
        }
      })
      .then(function (response) {
        console.log(response,`Added New Network successfull`);
        saveState({
          UpdateNetworkSuccessState: true
        });
      })
      .catch(function (error) {
        console.log(error,`error`);
      });
  }

  addNetworkCompany = () => {
    const { saveState, state } = this;
    const NetworkID = getURLParams('NetworkID');
     //console.log('NetworkID ID: '+NetworkID+' '+this.state.NetworkName);

      axios({
        method: 'get',
        url: process.env.REACT_APP_API_DATABASE_URL,
        params: {
          tblName: 'tblCompanyNetwork',
          queryType: 'addNewCompanyToNetworkInfo',
          MemberType: this.state.MemberType,
          NetworkID: NetworkID,
          CompanyID: this.state.CompanyID
        }
      })
      .then(function (response) {
        //console.log(response,`Added New Network successfull: `+state.CompanyID);
        saveState({
          AddCompanyToNetworkSuccessState: true,
          
          // this is to re instate the old while adding the newly added data to the list in the tabke display
          CompanyNetworkData: [
            ...state.CompanyNetworkData,
            {
              CompanyID: state.companyID,
              NetworkID: NetworkID,
              MemberType: state.MemberType
            }
          ]

        });

      })
      .catch(function (error) {
        console.log(error,`error`);
      });
  }

  deleteCompanyListFromNetwork = (e) => {
    console.log('Company Id: '+e);
    const { saveState, state } = this;
    const NetworkID = getURLParams('NetworkID');
   // console.log('NetworkID ID: '+NetworkID+' '+this.state.NetworkName);

      axios({
        method: 'get',
        url: process.env.REACT_APP_API_DATABASE_URL,
        params: {
          tblName: 'tblCompanyNetwork',
          queryType: 'deleteCompanyListFromNetwork',
          CompanyID: e,
          NetworkID: NetworkID
        }
      })
      .then(function (response) {
        console.log(response,`Deleted Company To Network List successfull`);
        saveState({
          CompanyNetworkData: state.CompanyNetworkData.filter(({ CompanyID })=> CompanyID != e)
        });
      })
      .catch(function (error) {
        console.log(error,`error`);
      });
  }

  onChangeStatus = (e) => {
    this.saveState({
      NetworkName: e.target.value
    });
  }
  onChangeDropdown = (type, e) => {
    
    switch(type){
      case 'CompanyID':
        this.saveState({
          CompanyID: e.value
        });
        break; 
       
      case 'MemberType': 
        this.saveState({
          MemberType: e.value
        });
        break;

    }
    
  }

  render() {
    const { state, onChangeStatus, onUpdateNetwork, addNetworkCompany, onChangeDropdown, deleteCompanyListFromNetwork } = this;
    return (
      <>
        <SEO title="Add Network" />
        <div className="content-wrapper px-4 py-4">

        
        <Card>
            <CardBody>

              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="mb-5">View/Edit Network ({this.state.NetworkID})</h1>
                      { this.state.UpdateNetworkSuccessState ? <div className="text-left text-success my-3">Successfully Updated Network</div> : null }
                    </Col>
                  </Row>
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <form>
                        <Row>
                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="Name">Network Name</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="text" placeholder={this.state.NetworkName} value={this.state.NetworkName} id="Name" name="Name" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 9 }}></Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 3 }}>
                              <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateNetwork} fullWidth>Update</Button>
                          </Col>
                      </Row>
                      
                    </form> 
                    </Col>
                  </Row>

                </Container>



                <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">Companies</h1>
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    {/* <Card>
                      <CardBody className="p-5"> */}
                          
                          <Row>
                          
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 12 }}>
                            <h4>Add a new company</h4>
                            { this.state.AddCompanyToNetworkSuccessState ? <div className="text-left text-success my-3">Successfully Added a new Company to a Network</div> : null }
                          </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 3 }}>
                              <label htmlFor="CompanyID">Company</label>
                              <SelectStyled options={this.state.CompanyData.map(({ companyId, companyName }) => { 
                                  return { value: companyId, label: companyName };
                                })}  id="CompanyID" name="CompanyID" onChange ={onChangeDropdown.bind(this, `CompanyID`)} />
                            </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 2 }}>
                              <label htmlFor="MemberType">Member Type:</label>
                              <SelectStyled options={MemberTypeOptions}  id="MemberType" name="MemberType" onChange ={onChangeDropdown.bind(this, `MemberType`)} />
                            </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 7 }}>
                                <label className="d-block">&nbsp;</label>
                                <Button status="Success" type="button" shape="SemiRound" onClick={addNetworkCompany}>+ Add Company</Button>
                            </Col>
                        </Row>
                      {/* </CardBody>
                    </Card> */}
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-4">
                    <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 12 }}>
                      <h2 className="mb-0">Results</h2>
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
                          <th scope="col">Company Name</th>
                            <th scope="col">Member Type</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                         
                        {this.state.CompanyNetworkData.map(({ CompanyID, NetworkID, MemberType, CompanyNetworkID }) => { 
                            {this.state.CompanyData.map(({ companyId, companyName }) => { 
                              if(companyId == CompanyID) {
                                CompanyIdToCompanyName = companyName;
                              }
                            })}
                          return (
                              <tr> 
                                <td scope="col">
                                {CompanyIdToCompanyName}
                                  </td>
                                <td>{MemberType}</td>
                                <td><Button onClick={deleteCompanyListFromNetwork.bind(this,CompanyID)} id="submitButtons" status="Warning" type="button" shape="SemiRound" fullWidth className="submitButtons text-uppercase">Delete</Button></td>
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