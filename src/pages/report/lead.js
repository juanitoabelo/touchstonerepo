import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
import { ButtonLink } from '@paljs/ui/Button';
import { Button } from '@paljs/ui/Button';
import { navigate } from 'gatsby';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { useState } from "react";
import styled from 'styled-components';
import SEO from '../../components/SEO';
import axios from 'axios';
import { Container } from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isLoggedIn } from "../../components/services/auth"

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;


const onSearchLeads = () => {

}

const selStatus = (e) => {
      console.log('Selected button: '+ e.target.value);
}

const onChangeStatus = (e) => {
  // v will be true or false
  console.log('Change Status: '+e.target);
  // alert('Change Status'+ e);
}

const isBrowser = typeof window !== "undefined"

export default function Lead() {

  if (!isLoggedIn() && isBrowser ) {
    window.location.href="/"
  }
  
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <SEO title="Lead Report" />
      <div className="content-wrapper px-4 py-4">
      
      <Card>
          <CardBody>

            <Container>
                <Row>
                  <Col breakPoint={{ xs: 12 }}>
                    <h1 className="text-center mb-5">Lead Report</h1>
                  </Col>
                </Row>

                <Row className="justify-content-center align-items-center mb-5">
                  <Col className="col-lg-12">
                  <Card>
                    <CardBody className="p-5">
                      <form>
                          <Row>
                          <Col breakPoint={{ xs: 12 }} >
                            <label htmlFor="StartDate">Start Date</label>
                            <Input fullWidth size="Medium" className="notes">
                                <DatePicker id="StartDate" name="StartDate" selected={startDate} onChange={date => setStartDate(date)} />
                            </Input>
                          </Col>

                          <Col breakPoint={{ xs: 12 }}>
                            <label htmlFor="EndDate">End Date</label>
                            <Input fullWidth size="Medium" className="notes">
                                <DatePicker id="EndDate" name="EndDate" selected={startDate} onChange={date => setStartDate(date)} />
                            </Input>
                          </Col>
                            
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 12 }} className="text-right">
                                <Button status="Success" type="button" shape="SemiRound" onClick={onSearchLeads}>Run Report</Button>
                            </Col>
                        </Row>
                              
                      </form> 
                    </CardBody>
                  </Card>
                  </Col>
                </Row>

                <Row className="justify-content-center align-items-center mb-4">
                  <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 12 }}>
                    <h2 className="mb-0">Report</h2>
                  </Col>
                </Row>
              
                <Row className="mb-5">
                  <Col id="main_view">Report Result</Col>
                </Row>

              </Container>

          </CardBody>
        </Card>
        </div>
    </>
  );
}