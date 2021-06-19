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

const searchBy = [
  { label: 'By' },
  { value: 'Name', label: 'Name' },
  { value: 'Description', label: 'Description' },
];

const isBrowser = typeof window !== "undefined"

export default class Index extends Component {
  state = {
    searchFor: '',
    searchBy: 'Name',
    data: [],
    loader: ''
  }
  saveState = ({ data }) => {
    this.setState({
      data
     });
  }
  onChangeStatus = (e) => {
    
  }
  searchMe = () => {
    const { saveState } = this;
    this.setState({
      data: [],
      display: 'Loading!!!'
    });
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        searchFor: '',
        searchBy: 'Name',
        tblName: 'tblProducts',
        queryType: 'searchType'
      }
    })
    .then(function (data) {
      saveState(data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  editViewProduct = (e, productID) => {
    // e.preventDefault();
    e.preventDefault();
    console.log(productID);
  }
  displayTable = ({ data, loader }) => {
    if(data !== undefined && data.length > 0) {
      const { editViewProduct } = this;
      return (<table className="table table-striped table-hover">
        <thead>
            <tr>
              <th scope="col">ACTION</th>
              <th scope="col">SERVICE NAME</th>
              <th scope="col">Company</th>
              <th scope="col">STATUS</th>
            </tr>
        </thead>
        <tbody>
        {
          data.map(({ ProductID, ProductName, CompanyName, ProductStatus })=>{
            return (<tr key={ProductID}>
              <td><a className="color-red text-decoration-none" href="#" onClick={editViewProduct.bind(this, ProductID)}>Edit/View</a></td>
              <td>{ProductName}</td>
              <td>{CompanyName}</td>
              <td>{ProductStatus}</td>
            </tr>);
          })
        }
         </tbody>
      </table>);
    }
    return loader;
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/";
    }  
  }
  render() {
    const { displayTable, searchMe, onChangeStatus, state } = this;
    return (
      <>
        <SEO title="404 Page Not Found" />
        <div className="px-4 py-4">
  
        
        <Card>
            <CardBody>
  
              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">PRODUCT/SERVICE SEARCH</h1>
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <form>
                        <Row>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                          <label htmlFor="notes">Search For</label>
                            <Input fullWidth size="Small" className="notes">
                              <input type="text" placeholder="Apex Notes" id="notes" className="notes2" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                            <label htmlFor="type">By</label>
                            <SelectStyled options={searchBy}  placeholder="Select" id="type" onChange ={onChangeStatus.bind(this)} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}></Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                              <Button status="Success" type="button" shape="SemiRound" onClick={searchMe.bind(this)} fullWidth>Search</Button>
                          </Col>
                      </Row>
                            
                    </form> 
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-4">
                    <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 12 }}>
                      <h2 className="mb-0">Results</h2>
                    </Col>
                  </Row>
                
                  <Row className="mb-5">
                    <Col id="main_view">
                      {displayTable(state)}        
                    </Col>
                  </Row>
  
                </Container>
  
            </CardBody>
          </Card>
          </div>
      </>
    )
  }
}