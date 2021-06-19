import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
import { ButtonLink } from '@paljs/ui/Button';
import { Button } from '@paljs/ui/Button';
import { navigate, Link } from 'gatsby';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { Component } from 'react';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import axios from 'axios';
import { Container } from '@material-ui/core';

import AdvanceSearch from '../../components/AdvanceSearch';
import { isLoggedIn } from "../../components/services/auth";
import { paginateLimit, __noProduct, paginationProcess,
  perPageLimitList, sortTable, checkCompanyAB } from "../../components/utils/common";

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const searchByOption = [
  { label: 'By' },
  { value: 'Name', label: 'Name' },
  { value: 'Description', label: 'Description' },
];

const isBrowser = typeof window !== "undefined";

export default class Index extends Component {
  state = {
    data: [],
    tempData: [],
    loader: '',
    searchBy: 'Name',
    searchFor: '',
    error: false,
    errorMsg: '',
    perpage: 10,
    current: 0,
    pagination: 1
  }
  saveState = (obj) => {
    this.setState(obj);
  }
  searchMe = () => {
    const { saveState, state: { searchFor, searchBy } } = this;
    this.setState({
      data: [],
      tempData: [],
      searchBy: 'Name',
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
        searchBy: searchBy,
        tblName: 'tblProducts',
        queryType: 'searchType'
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
        tempData: data,
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
  // editViewProduct = (productID, e) => {
  //   // e.preventDefault();
  //   console.log(e,'eeee');
  //   console.log(productID);
  // }
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
  pageFuncLimit = (max, e) => {
    const { current, data, perpage, pagination } = this.state;
    const currentPage = e.target.value;
    if(currentPage > 0 && currentPage <= max) {
      const result = paginationProcess({ 
        lengthData: data.length, pagination, 
        current, perpage, max, number: currentPage
      });    
      this.saveState(result);
    }
  }
  sortCol = (type) => {
    let { data, togglePName, toggleCName, toggleStatus } = this.state;
    let toggling;
    data.sort((a, b) => {
      var nameA = "";
      var nameB = "";
      var sorted;
      switch(type) {
        case 'ProductName':
          nameA = checkCompanyAB(a.ProductName);
          nameB = checkCompanyAB(b.ProductName);
          sorted = togglePName;
          toggling = { togglePName: !togglePName };
          break;
        case 'CompanyName':
          nameA = checkCompanyAB(a.CompanyName);
          nameB = checkCompanyAB(b.CompanyName);
          sorted = toggleCName;
          toggling = { toggleCName: !toggleCName };
          break;
        case 'ProductStatus':
          nameA = checkCompanyAB(a.ProductStatus);
          nameB = checkCompanyAB(b.ProductStatus);
          sorted = toggleStatus;
          toggling = { toggleStatus: !toggleStatus };
          break;
        default:
          nameA = checkCompanyAB(a.ProductName);
          nameB = checkCompanyAB(b.ProductName);
          sorted = togglePName;
          toggling = { togglePName: !togglePName };
          break;
      }
      return sortTable(nameA, nameB, sorted);        
    });
    this.saveState({ data: data, ...toggling });
  }
  onChangeDropdown = (e) => {
    this.saveState({
      perpage: e.value,
      current: 0,
      pagination: 1
    });
  }
  manipulateData = ({ query, queryBy }) => {
    const filteredData = this.state.tempData.filter((item)=>{
      switch(queryBy) {
        case 'ProductName':
          return item.ProductName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'CompanyName':
          if (item.CompanyName === null) {
            return false;
          }
          return item.CompanyName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'ProductStatus':
          return item.ProductStatus == query;
        default:
          return item;
      }
    });
    let errorObj = {};
    if (filteredData.length <= 0) {
      errorObj = {
        error: true,
        errorMsg: __noProduct
      }
    }
    this.saveState({
      data: filteredData, 
      current: 0,
      pagination: 1,
      ...errorObj
    });
  }
  resetMe = () => {
    this.saveState({
      data: this.state.tempData,
      current: 0,
      pagination: 1
    });
  }
  display = ({ data, loader, error, errorMsg, current, perpage, pagination }) => {
    const { pageFunc, pageFuncLimit, sortCol, onChangeDropdown, manipulateData, resetMe } = this;
    const advanceSearchBy = [
      { value: 'ProductName', label: 'SERVICE NAME' },
      { value: 'CompanyName', label: 'Company' },
      { value: 'ProductStatus', label: 'STATUS' }
    ];
    if(data !== undefined && data.length > 0) {
      const pageData = data.slice(current, current+perpage);
      const max = (Math.floor(data.length/perpage)) + (Math.floor(data.length%perpage)>0 ? 1 : 0);
      return (<div>
        <AdvanceSearch dropdown={advanceSearchBy} searchMe={manipulateData} resetMe={resetMe} />
        <table className="table table-striped table-hover">
          <thead>
              <tr>
                <th scope="col">ACTION</th>
                <th scope="col" onClick={sortCol.bind(this, 'ProductName')}>SERVICE NAME</th>
                <th scope="col" onClick={sortCol.bind(this, 'CompanyName')}>Company</th>
                <th scope="col" onClick={sortCol.bind(this, 'ProductStatus')}>STATUS</th>
              </tr>
          </thead>
          <tbody>
          {
            pageData.map(({ ProductID, ProductName, CompanyName, ProductStatus, CompanyID })=>{
              return (<tr key={ProductID}>
                <td>
                  <Link className="color-red text-decoration-none" to={"/product/edit-product?prodId="+ProductID+"&companyId="+CompanyID}>Edit/View</Link>
                  </td>
                <td>{ProductName}</td>
                <td>{CompanyName}</td>
                <td>{ProductStatus}</td>
              </tr>);
            })
          }
          </tbody>
      </table>
        <nav aria-label="Page navigation example">
        <Container>
            <Row>
              <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 8 }}>
              <ul class="pagination">
                  <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'first', perpage, max, 0)}>«</a></li>
                  <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'prev', perpage, max, 0)}>‹</a></li>
                  {paginateLimit(max, pageFuncLimit, pagination)}
                  <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'next', perpage, max, 0)}>›</a></li>
                  <li class="page-item"><a href="/#" class="page-link" onClick={pageFunc.bind(this,'last', perpage, max, 0)}>»</a></li>
              </ul>
              </Col>
              <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 4 }}>
                  <SelectStyled options={perPageLimitList}  placeholder={perpage} value={perpage} id="perPage" name="perPage" onChange ={onChangeDropdown.bind(this)} />
              </Col>
            </Row>
         </Container>
        </nav>
    </div>);
    }
    if (error) {
      switch(errorMsg) {
        case __noProduct:
          return (
          <div>
            <AdvanceSearch dropdown={advanceSearchBy} searchMe={manipulateData} resetMe={resetMe} />
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">ACTION</th>
                  <th scope="col">SERVICE NAME</th>
                  <th scope="col">Company</th>
                  <th scope="col">STATUS</th>
                </tr>
              </thead>
            </table>
          </div>
          );
        default: 
          break;
      }
    }
    return loader;
  }
  changeSearchOption = (type, e) => {
    switch(type) {
      case 'name':
        this.saveState({ searchFor: e.target.value });
        break;
      case 'desc':
        this.saveState({ searchBy: e.value });
        break;
      default:
        break;
    }
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser) {
      window.location.href="/";
    }  
  }
  render() {
    const { searchMe, changeSearchOption, state } = this;
    const { searchBy, searchFor } = state;
    return (
      <>
        <SEO title="Product/Services Search" />
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
                              <input type="text" placeholder="Apex Notes" id="notes" className="notes2" value={searchFor} onChange={changeSearchOption.bind(this, 'name')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                            <label htmlFor="type">By</label>
                            <SelectStyled options={searchByOption}  placeholder={searchBy} id="type" value={searchBy} onChange={changeSearchOption.bind(this, 'desc')} />
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
                      {this.display(state)}      
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