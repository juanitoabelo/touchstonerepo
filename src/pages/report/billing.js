import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
import { ButtonLink } from '@paljs/ui/Button';
import { Button } from '@paljs/ui/Button';
import { navigate } from 'gatsby';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { Component } from "react";
import styled from 'styled-components';
import SEO from '../../components/SEO';
import axios from 'axios';
import { Container } from '@material-ui/core';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isLoggedIn } from "../../components/services/auth";
import { formatCurrency } from "../../components/utils/common";

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const searchLimitBy = [
  { value: '', label: 'All' },
  { value: 'ProductID', label: 'Product' },
  { value: 'CampaignID', label: 'Campaign' },
  { value: 'MerchantID', label: 'Merchant' },
];

const searchOnCharge = [
  { value: '0', label: 'All' },
  { value: '1', label: 'First Charge' },
  { value: '2', label: 'First Recurring' },
  { value: '3', label: 'Recurring' },
];

const isBrowser = typeof window !== "undefined"

export default class Billing extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    limitBy: 'All',
    limitByLabel: 'All',
    chargeNum: '0',
    chargeNumLabel: 'All',
    loader: '',
    error: false,
    errorMsg: '',
    reset: false,
    data: {
      attempted: {
        number: {
          label: `# Attempted:`,
          value: 0
        },
        dollar: {
          label: `$ Attempted:`,
          value: 0
        }
      },
      approved: {
        number: {
          label: `# Approved:`,
          value: 0
        },
        dollar: {
          label: `$ Approved:`,
          value: 0
        },
        percent: {
          label: `$ Approved:`,
          value: 0
        }
      },
      declined: {
        number: {
          label: `# Declined:`,
          value: 0
        },
        dollar: {
          label: `$ Declined:`,
          value: 0
        },
        percent: {
          label: `$ Declined:`,
          value: 0
        }
      },
      refunded: {
        number: {
          label: `# Refunded:`,
          value: 0
        },
        dollar: {
          label: `$ Refunded:`,
          value: 0
        }
      },
      chargeback: {
        number: {
          label: `# Chargeback:`,
          value: 0
        },
        dollar: {
          label: `$ Chargeback:`,
          value: 0
        }
      }
    }
  }
  componentDidMount(){
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/";
    }
  }
  saveState = (obj) => {
    this.setState(obj);
  }
  onSearchLeads = () => {
    //axios
    const { saveState } = this;
    saveState({
      loader: 'Loading!!!',
      error: false,
      errorMsg: '',
      reset: false
    });
    setTimeout(() => {
      saveState({ reset: true });
    }, 3000);
  }
  display = ({ reset, data, loader }) => {
    if (reset) {
      return (
        <div>
          <h2>BILLING STATISTICS</h2>
          <table className="table table-striped table-hover">
            <tbody>
              <tr>
                <td>{data.attempted.number.label}</td>
                <td>{data.attempted.number.value}</td>
              </tr>
              <tr>
                <td>{data.attempted.dollar.label}</td>
                <td>{formatCurrency(data.attempted.dollar.value)}</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>{data.approved.number.label}</td>
                <td>{data.approved.number.value}</td>
              </tr>
              <tr>
                <td>{data.approved.dollar.label}</td>
                <td>{formatCurrency(data.approved.dollar.value)}</td>
              </tr>
              <tr>
                <td>{data.approved.percent.label}</td>
                <td>{data.approved.percent.value}</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>{data.declined.number.label}</td>
                <td>{data.declined.number.value}</td>
              </tr>
              <tr>
                <td>{data.declined.dollar.label}</td>
                <td>{formatCurrency(data.declined.dollar.value)}</td>
              </tr>
              <tr>
                <td>{data.declined.percent.label}</td>
                <td>{data.declined.percent.value}</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>{data.refunded.number.label}</td>
                <td>{data.refunded.number.value}</td>
              </tr>
              <tr>
                <td>{data.refunded.dollar.label}</td>
                <td>{formatCurrency(data.refunded.dollar.value)}</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>{data.chargeback.number.label}</td>
                <td>{data.chargeback.number.value}</td>
              </tr>
              <tr>
                <td>{data.chargeback.dollar.label}</td>
                <td>{formatCurrency(data.chargeback.dollar.value)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    return loader;
  }
  onChangeStatus = (type, e) => {
    let result;
    switch(type) {
      case 'chargeNum':
        result = {
          chargeNum: e.value,
          chargeNumLabel: e.label
        }
        break;
      default:
        result = {
          limitBy: e.value,
          limitByLabel: e.label
        }
        break;
    }
    this.saveState(result);
  }
  onChangeDate = (type, date) => {
    let stateLess;
    switch(type) {
      case 'end':
        stateLess = { endDate: date };
        break;
      default:
        stateLess = { startDate: date };
        break;
    }
    this.saveState(stateLess);
  }
  render() {
    const { 
      state, state: { 
        startDate, endDate, limitBy, 
        limitByLabel, chargeNum, chargeNumLabel 
      }, 
      onSearchLeads, onChangeDate, 
      onChangeStatus, display 
    } = this;
    return (
      <>
        <SEO title="Billing Report" />
        <div className="content-wrapper px-4 py-4">
        
        <Card>
            <CardBody>
  
              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">Billing Report</h1>
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <Card>
                      <CardBody className="p-5">
                        <form>
                            <Row>
                            <Col breakPoint={{ xs: 12 }}>
                                <label htmlFor="SelLimitBy">Limit By</label>
                                <SelectStyled options={searchLimitBy}  placeholder={limitByLabel} value={limitBy} id="SelLimitBy" name="SelLimitBy" onChange ={onChangeStatus.bind(this,'limitBy')} />
                              </Col>
  
                              <Col breakPoint={{ xs: 12 }}>
                                <label htmlFor="ChargeNum">On Charge</label>
                                <SelectStyled options={searchOnCharge}  placeholder={chargeNumLabel} value={chargeNum} id="ChargeNum" name="ChargeNum" onChange ={onChangeStatus.bind(this, 'chargeNum')} />
                              </Col>
  
                            <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="StartDate">Start Date</label>
                              <Input fullWidth size="Medium" className="notes">
                              <DatePicker id="StartDate" name="StartDate" selected={startDate} value={startDate} onChange={onChangeDate.bind(this, 'start')} />
                              </Input>
                            </Col>
  
                            <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="EndDate">End Date</label>
                              <Input fullWidth size="Medium" className="notes">
                              <DatePicker id="EndDate" name="EndDate" selected={endDate} value={endDate} onChange={onChangeDate.bind(this, 'end')} />
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
                    <Col id="main_view">{display(state)}</Col>
                  </Row>
  
                </Container>
  
            </CardBody>
          </Card>
          </div>
      </>
    );
  }
}