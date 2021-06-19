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
import { 
  paginate, __noProduct, 
  paginationProcess, sortTable,
  searchByOptionsClients, searchByCompanyId
} from "../../components/utils/common";

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

const isBrowser = typeof window !== "undefined"

export default class SearchClients extends Component {
  state = {
    company: {
      label: 'All',
      value: 0
    },
    searchBy: {
      label: 'Email',
      value: 'EmailAddress'
    },
    searchFor: '',
    data: [],
    loader: '',
    error: false,
    errorMsg: '',
    perpage: 10,
    current: 0,
    pagination: 1
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/";
    }  
  }
  saveState = (obj) => {
    this.setState(obj);
  }
  onChangeDropdown = (type, e) => {
    this.saveState({
      [type]: {
        label: e.label,
        value: e.value
      }
    });
  }
  onChangeInputText = (e) => {
    this.saveState({
      searchFor: e.target.value
    });
  }
  onSearchLeads = () => {
    const { state: { company, searchBy, searchFor }, saveState } = this;
    saveState({
      loader: 'Loading!!!',
      error: false,
      errorMsg: '',
      data: []
    });
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',{
      params: {
        tblName: 'tblClients',
        queryType: 'searchClientsByCompanyForBy',
        company: company.value,
        searchBy: searchBy.value,
        searchFor: searchFor
      }
    })
    .then(({ data })=>{
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
    let { data, toggleDate, toggleFName, toggleLName, toggleEmailAddress, 
      toggleHomePhone, toggleService } = this.state;
    let toggling;
    data.sort((a, b) => {
      var nameA = "";
      var nameB = "";
      var sorted;
      switch(type) {
        case 'Date':
          nameA = a.Date.toUpperCase(); 
          nameB = b.Date.toUpperCase(); 
          sorted = toggleDate;
          toggling = { toggleDate: !toggleDate };
          break;
        case 'FirstName':
          nameA = a.FirstName.toUpperCase(); 
          nameB = b.FirstName.toUpperCase(); 
          sorted = toggleFName;
          toggling = { toggleFName: !toggleFName };
          break;
        case 'LastName':
          nameA = a.LastName.toUpperCase(); 
          nameB = b.LastName.toUpperCase(); 
          sorted = toggleLName;
          toggling = { toggleLName: !toggleLName };
          break;
        case 'EmailAddress':
          nameA = a.EmailAddress.toUpperCase(); 
          nameB = b.EmailAddress.toUpperCase(); 
          sorted = toggleEmailAddress;
          toggling = { toggleEmailAddress: !toggleEmailAddress };
          break;
        case 'HomePhone':
          nameA = a.HomePhone.toUpperCase(); 
          nameB = b.HomePhone.toUpperCase(); 
          sorted = toggleHomePhone;
          toggling = { toggleHomePhone: !toggleHomePhone };
          break;
        case 'Service':
          if (a.Service != null) {
            nameA = a.Service.toUpperCase(); 
          }
          if (b.Service != null) {
            nameB = b.Service.toUpperCase(); 
          }
          sorted = toggleService;
          toggling = { toggleService: !toggleService };
          break;
        default:
          nameA = a.Date.toUpperCase(); 
          nameB = b.Date.toUpperCase(); 
          sorted = toggleDate;
          break;
      }
      return sortTable(nameA, nameB, sorted);
    });
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
                <th scope="col" onClick={sortCol.bind(this, 'Date')}>DATE</th>
                <th scope="col" onClick={sortCol.bind(this, 'FirstName')}>FIRST NAME</th>
                <th scope="col" onClick={sortCol.bind(this, 'LastName')}>LAST NAME</th>
                <th scope="col" onClick={sortCol.bind(this, 'EmailAddress')}>EMAIL</th>
                <th scope="col" onClick={sortCol.bind(this, 'HomePhone')}>HOME #</th>
                <th scope="col" onClick={sortCol.bind(this, 'Service')}>SERVICE</th>
              </tr>
          </thead>
          <tbody>
          {
            pageData.map(({ 
              ClientID, Date, FirstName, LastName, EmailAddress, HomePhone, Service
            })=>{
              return (<tr key={ClientID}>
                <td>{Date}</td>
                <td><a className="color-red text-decoration-none" href={"/product/edit-product?leadID=" + ClientID}>{FirstName}</a></td>
                <td><a className="color-red text-decoration-none" href={"/product/edit-product?leadID=" + ClientID}>{LastName}</a></td>
                <td><a className="color-red text-decoration-none" href={"/product/edit-product?leadID=" + ClientID}>{EmailAddress}</a></td>
                <td>{HomePhone}</td>
                <td>{Service}</td>
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
                <th>DATE</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>EMAIL</th>
                <th>HOME #</th>
                <th>SERVICE</th>
              </tr>
          </thead>
          </table>);
        default: 
          break;
      }
    }
    return loader;
  }
  render() {
    const { onSearchLeads, onChangeDropdown, onChangeInputText, display, state } = this;
    const { company, searchBy, searchFor } = state;
    return (
      <>
        <SEO title="CLIENT ADMIN" />
        <div className="content-wrapper px-4 py-4">
  
        
        <Card>
            <CardBody>
  
              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">CLIENT ADMIN</h1>
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <Card>
                      <CardBody className="p-5">
                        <Row>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 4 }}>
                            <label htmlFor="CompanyID">Company</label>
                            <SelectStyled options={searchByCompanyId}  placeholder={company.label} value={company.value} id="CompanyID" name="CompanyID" onChange ={onChangeDropdown.bind(this, `company`)} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 4 }}>
                          <label htmlFor="SearchVal">Search For</label>
                            <Input fullWidth size="Medium" className="notes">
                              <input type="text" placeholder={searchFor} value={searchFor} id="SearchVal" name="SearchVal" onChange ={onChangeInputText.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 4 }}>
                            <label htmlFor="SearchBy">Search By</label>
                            <SelectStyled options={searchByOptionsClients}  placeholder={searchBy.label} value={searchBy.value} id="SearchBy" name="SearchBy" onChange ={onChangeDropdown.bind(this, `searchBy`)} />
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                              <Button status="Success" type="button" shape="SemiRound" onClick={onSearchLeads}>View Clients</Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
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