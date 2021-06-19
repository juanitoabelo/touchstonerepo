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

import { isLoggedIn } from "../../components/services/auth";
import { paginate, __noProduct, paginationProcess } from "../../components/utils/common";

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

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
  }
  a {
    max-width: 20rem;
  }
`;

const searchByOption = [
  { value: '1', label: 'Administrators' }
];


const isBrowser = typeof window !== "undefined"

export default class Index extends Component {
  state = {
    data: [],
    loader: '',
    searchForDeptLabel: 'Administrator',
    searchForDept: 1,
    searchFor: '',
    error: false,
    errorMsg: '',
    perpage: 75,
    current: 0,
    pagination: 1
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/"
    }
  }
  saveState = (obj) => {
    this.setState(obj);
  }
  onSearchProduct = () => {
    const { saveState, state: { searchFor, searchForDept } } = this;
    this.setState({
      data: [],
      searchForDept: 1,
      searchFor: '',
      error: false,
      errorMsg: '',
      perpage: 10,
      current: 0,
      pagination: 1,
      togglePName: true,
      loader: 'Loading!!!'
    });
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        searchFor: searchFor,
        searchForDept: searchForDept,
        tblName: 'tblUsers',
        queryType: 'searchUsersByFirstName'
      }
    })
    .then(function ({ data }) {
      let error = false;
      let errorMsg = '';
      if(data.length <= 0) {
        error = true;
        errorMsg = __noProduct;
      }
      saveState({
        data,
        error,
        errorMsg
      });
    })
    .catch(function (error) {
      console.log(error);
      saveState({
        error: 'error'
      });
    });
  }
  editViewProduct = (userID, e) => {
    e.preventDefault();
    console.log(e,'eeee');
    console.log(userID);
  }
  pageFunc = (type, perpage, max, number = 0, e) => {
    e.preventDefault();
    if (type === undefined) {
      return 'type required';
    }
    if (perpage === undefined) {
      return 'perpage required';
    }
    if (max === undefined) {
      return 'max required';
    }
    const { pagination, current, data } = this.state;
    const result = paginationProcess({ 
      lengthData: data.length, pagination, 
      current, perpage, max, number, type 
    });    
    this.saveState(result);
  }
  sortCol = (type) => {
    let { data, toggleUName, toggleUEmail, toggleCName, toggleStatus } = this.state;
    let toggling;
    data.sort((a, b) => {
      var nameA;
      var nameB;
      switch(type) {
        case 'UserName':
          nameA = a.Name.toUpperCase(); 
          nameB = b.Name.toUpperCase(); 
          if (nameA < nameB) {
            if (toggleUName) return 1;
            return -1;
          }
          if (nameA > nameB) {
            if (toggleUName) return -1;
            return 1;
          }
          break;
        case 'UserEmail':
          nameA = a.EmailAddress.toUpperCase(); 
          nameB = b.EmailAddress.toUpperCase(); 
          if (nameA < nameB) {
            if (toggleUEmail) return 1;
            return -1;
          }
          if (nameA > nameB) {
            if (toggleUEmail) return -1;
            return 1;
          }
          break;
        case 'CompanyName':
          nameA = a.CompanyName=== null ? '' : a.CompanyName.toUpperCase(); 
          nameB = b.CompanyName=== null ? '' : b.CompanyName.toUpperCase(); 
          if (nameA < nameB) {
            if (toggleCName) return 1;
            return -1;
          }
          if (nameA > nameB) {
            if (toggleCName) return -1;
            return 1;
          }
          break;
        case 'UserStatus':
          nameA = a.UserStatus.toUpperCase(); 
          nameB = b.UserStatus.toUpperCase(); 
          if (nameA < nameB) {
            if (toggleStatus) return 1;
            return -1;
          }
          if (nameA > nameB) {
            if (toggleStatus) return -1;
            return 1;
          }
          break;
        default:
          nameA = a.Name.toUpperCase(); 
          nameB = b.Name.toUpperCase(); 
          if (nameA < nameB) {
            if (toggleUName) return 1;
            return -1;
          }
          if (nameA > nameB) {
            if (toggleUName) return -1;
            return 1;
          }
          break;
      }
      return 0;        
    });
    switch(type) {
      case 'UserName':
        toggling = { toggleUName: !toggleUName };
        break;
      case 'UserEmail':
        toggling = { toggleUEmail: !toggleUEmail };
        break;
      case 'CompanyName':
        toggling = { toggleCName: !toggleCName };
        break;
      case 'UserStatus':
        toggling = { toggleStatus: !toggleStatus };
        break;
      default:
        toggling = {};
        break;
    }
    this.saveState({ data: data, ...toggling });
  }
  display = ({ data, loader, error, errorMsg, current, perpage, pagination }) => {
    if(data !== undefined && data.length > 0) {
      const { editViewProduct, pageFunc, sortCol } = this;
      const pageData = data.slice(current, current+perpage);
      const max = (Math.floor(data.length/perpage)) + (Math.floor(data.length%perpage)>0 ? 1 : 0);
      return (<div>
        <table className="table table-striped table-hover">
          <thead>
              <tr>
                <th scope="col">SELECT USER</th>
                <th scope="col" onClick={sortCol.bind(this, 'UserName')}>NAME</th>
                <th scope="col" onClick={sortCol.bind(this, 'UserEmail')}>EMAIL</th>
                <th scope="col" onClick={sortCol.bind(this, 'CompanyName')}>COMPANY</th>
                <th scope="col" onClick={sortCol.bind(this, 'UserStatus')}>STATUS</th>
              </tr>
          </thead>
          <tbody>
          {
            pageData.map(({ UserID, Name, EmailAddress, CompanyName, UserStatus })=>{
              return (<tr key={UserID}>
                <td><a className="color-red text-decoration-none" href="/#" onClick={editViewProduct.bind(this, UserID)}>Edit/View</a></td>
                <td>{Name}</td>
                <td>{EmailAddress}</td>
                <td>{CompanyName}</td>
                <td>{UserStatus}</td>
              </tr>);
            })
          }
          </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'first', perpage, max, 0)}>«</a></li>
            <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'prev', perpage, max, 0)}>‹</a></li>
            {paginate(max, pageFunc, perpage, pagination)}
            <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'next', perpage, max, 0)}>›</a></li>
            <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'last', perpage, max, 0)}>»</a></li>
        </ul>
      </nav>
    </div>);
    }
    if (error) {
      switch(errorMsg) {
        case __noProduct:
          return (<table className="table table-striped table-hover">
          <thead>
              <tr>
                <th scope="col">SELECT USER</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">COMPANY</th>
                <th scope="col">STATUS</th>
              </tr>
          </thead>
          </table>);
        default: 
          break;
      }
    }
    return loader;
  }
  onChangeStatus = (type, e) => {
    switch(type) {
      case 'name':
        this.saveState({ searchFor: e.target.value });
        break;
      case 'dept':
        this.saveState({ searchForDept: e.value, searchForDeptLabel: e.label });
        break;
      default:
        break;
    }
  }
  render(){
    const { onSearchProduct, onChangeStatus, display, state } = this;
    const { searchForDept, searchFor, searchForDeptLabel } = state;
    return (
      <>
        <SEO title="USERS" />
        <div className="content-wrapper px-4 py-4">
  
        <Card>
            <CardBody>
  
              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">USERS</h1>
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <form>
                        <Row>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                          <label htmlFor="SearchVal">Search Users</label>
                            <Input fullWidth size="Medium" className="notes">
                              <input type="text" placeholder="" value={searchFor} id="SearchVal" name="SearchVal" onChange ={onChangeStatus.bind(this, 'name')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                            <label htmlFor="DepartmentID">Department</label>
                            <SelectStyled options={searchByOption}  placeholder={searchForDeptLabel} value={searchForDept} id="DepartmentID" name="DepartmentID" onChange ={onChangeStatus.bind(this, 'dept')} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                              <Button status="Success" type="button" shape="SemiRound" onClick={onSearchProduct} fullWidth>View Users</Button>
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