import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
import { ButtonLink } from '@paljs/ui/Button';
import { Button } from '@paljs/ui/Button';
import { navigate } from 'gatsby';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React from 'react';
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

const onSearchProduct = () => {

}
const onChangeStatus = (e) => {
  // v will be true or false
  console.log('Change Status: '+e.target);
  // alert('Change Status'+ e);
}

const isBrowser = typeof window !== "undefined"

export default function Index() {

  if (!isLoggedIn() && isBrowser) {
    window.location.href="/"
  }
  
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
                            <Button status="Success" type="button" shape="SemiRound" onClick={onSearchProduct} fullWidth>Search</Button>
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
                    <table>
                      
                      <td>asdf</td>
                      asdf
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