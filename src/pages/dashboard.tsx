import React, { Component } from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import { ButtonLink } from '@paljs/ui/Button';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import axios from 'axios';
import { Container } from '@material-ui/core';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';

import SEO from '../components/SEO';
import { isLoggedIn } from "../components/services/auth"

const ErrorStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  small {
    margin-bottom: 3rem;
  }
  h1 {
    margin-bottom: 0.5rem;
    text-align: left;
  }
  a {
    max-width: 20rem;
  }
`;

const isBrowser = typeof window !== "undefined"

export default class Home extends Component  {

  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/";
    }
  }

  render() {
  return (
    <>
    <div className="content-wrapper px-4 py-4">
      <SEO title="Home" />
      <Card>
        <CardBody>
        <h1>TO DO ITEMS</h1>
          <ErrorStyle>
            <h1>TO DO ITEMS</h1>
            <small>The page you were looking for doesn&apos;t exist</small>
            
          </ErrorStyle>
        </CardBody>
      </Card>

    </div>
    </>
  );
  }
};