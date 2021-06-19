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

const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const selectCompanyOption = [
  { value: '1', label: 'Apex Notes' },
  { value: '2', label: 'Clearview Horizon' },
  { value: '3', label: 'Cedar Ridge' },
  { value: '4', label: 'MiBoSpi Recovery' },
  { value: '5', label: 'Therapy Insider' },
  { value: '6', label: 'Family Positive Impact'},

  { value: '7', label: 'Elevations'},
  { value: '8', label: 'Red Frog'},
  { value: '9', label: 'Makana'},
  { value: '10', label: 'Family First'},
  { value: '11', label: 'Voyage Recovery'},
  { value: '12', label: 'Advanced Recovery Systems'},
  { value: '13', label: 'Journey Pure'},
  { value: '14', label: 'Palm Shores Behavioral Health Center'},
  { value: '15', label: 'Voyage Recovery Center'},
  { value: '16', label: 'Gulf Coast Treatment Center'},
  { value: '17', label: 'Newport Academy '},
  { value: '18', label: 'Visions Teen Center'},
  { value: '19', label: 'Second Chances of Southern Utah'},
  { value: '20', label: 'At The Crossroads'},
  { value: '21', label: 'Elk Mountain'},
  { value: '22', label: 'Clearview Girls Academy'},
  { value: '23', label: 'Soulegria'},
];

const onContents = () => {

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

export default function LeadSourceExport() {

  if (!isLoggedIn() && isBrowser ) {
    window.location.href="/"
  }

  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <SEO title="Lead Source Export Report" />
      <div className="content-wrapper px-4 py-4">
      
      <Card>
          <CardBody>

            <Container>
                <Row>
                  <Col breakPoint={{ xs: 12 }}>
                    <h1 className="text-center mb-5">Lead Source Export Report</h1>
                  </Col>
                </Row>

                <Row className="justify-content-center align-items-center mb-5">
                  <Col className="col-lg-12">
                  <Card>
                    <CardBody className="p-5">
                      <form>
                          <Row>
                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="SelCompanyID">Company</label>
                              <SelectStyled options={selectCompanyOption}  placeholder="--Select Company--" id="SelCompanyID" name="CompanyID" onChange ={onChangeStatus.bind(this)} />
                            </Col>

                          <Col breakPoint={{ xs: 12 }}>
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
                                <Button status="Success" type="button" shape="SemiRound" onClick={onContents}>Run Report</Button>
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