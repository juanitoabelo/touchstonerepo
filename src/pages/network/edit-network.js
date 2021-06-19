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

export default class EditNetwork extends Component {

  state = {
    NetworkName: '',
  }

  componentWillUnmount(){
    this.setState({
      NetworkName: '',
    })
  }

  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/"
    }
  }

  saveState = (data) => {
    this.setState(data);
  }

  onUpdateNetwork = () => {
      axios({
        method: 'get',
        url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
        params: {
          tblName: 'tblNetwork',
          queryType: 'updateNewNetworkInfo',
          NetworkName: this.state.NetworkName,
        }
      })
      .then(function (response) {
        console.log(response,`Added New Company successfull`);
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
  render() {
    const { state, onChangeStatus, onUpdateNetwork } = this;
    return (
      <>
        <SEO title="Add Network" />
        <div className="content-wrapper px-4 py-4">

        
        <Card>
            <CardBody>

              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="mb-5">View/Edit Network (2)</h1>
                    </Col>
                  </Row>
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <form>
                        <Row>
                          <Col breakPoint={{ xs: 12 }}>
                              <label htmlFor="Name">Network Name</label>
                              <Input fullWidth size="Medium" className="Name">
                              <input type="text" placeholder="" id="Name" name="Name" onChange ={onChangeStatus.bind(this)}/>
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

            </CardBody>
          </Card>
          </div>
      </>
    );
  }
}