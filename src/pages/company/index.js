import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import { Link } from 'gatsby';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { Component } from 'react';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { isLoggedIn } from "../../components/services/auth";
import AdvanceSearch from '../../components/AdvanceSearch';
import { paginateLimit, perPageLimitList, __noProduct, 
  paginationProcess, checkCompanyAB, sortTable } from "../../components/utils/common";

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const searchBy = [
  { value: '1', label: 'Administrators' },
];

const isBrowser = typeof window !== "undefined"

export default class Index extends Component {
  state = {
    data: [],
    tempData: [],
    loader: '',
    searchFor: '',
    error: false,
    errorMsg: '',
    perpage: 10,
    current: 0,
    pagination: 1
  }
  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/";
    }
  }
  saveState = (data) => {
    this.setState(data);
  }
  editViewProduct = (productID, e) => {
    e.preventDefault();
    console.log(e,'eeee');
    console.log(productID);
  }
  onSearchCompany = () => {
    const { saveState, state: { searchFor } } = this;
    this.setState({
      data: [],
      error: false,
      errorMsg: '',
      perpage: 10,
      current: 0,
      pagination: 1,
      toggleName: true,
      loader: 'Loading!!!'
    });
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        searchFor: searchFor,
        tblName: 'tblCompany',
        queryType: 'searchCompanyByName'
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
  onChangeStatus = (e) => {
    this.setState({
      searchFor: e.target.value
    });
  }
  sortCol = (type) => {
    let { data, toggleName, toggleType, toggleIoA } = this.state;
    let toggling;
    data.sort((a, b) => {
      var nameA;
      var nameB;
      var toggleVar;
      switch (type) {
        case `Name`:
          toggleVar = toggleName;
          toggling = { toggleName: !toggleName };
          nameA = a.Name.toUpperCase(); 
          nameB = b.Name.toUpperCase(); 
          break;
        case `Type`:
          toggleVar = toggleType;
          toggling = { toggleType: !toggleType };
          nameA = a.Type.toUpperCase(); 
          nameB = b.Type.toUpperCase(); 
          break;
        case `IoA`:
          toggleVar = toggleIoA;
          toggling = { toggleIoA: !toggleIoA };
          nameA = a.IoA.toUpperCase(); 
          nameB = b.IoA.toUpperCase(); 
          break;
        default:
          toggleVar = toggleName;
          toggling = { toggleName: !toggleName };
          nameA = a.Name.toUpperCase(); 
          nameB = b.Name.toUpperCase(); 
          break;
      }
      return sortTable(nameA, nameB, toggleVar);
    });
    this.saveState({ data: data, ...toggling });
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
        case 'Name':
          return item.Name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'Type':
          return item.Type.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'IoA':
          return item.IoA.toLowerCase().indexOf(query.toLowerCase()) !== -1;
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
      { value: 'Name', label: 'Company Name' },
      { value: 'Type', label: 'Company Type' },
      { value: 'IoA', label: 'INSURANCE NAME' }
    ];
    if(data !== undefined && data.length > 0) {
      const pageData = data.slice(current, current+perpage);
      const max = (Math.floor(data.length/perpage)) + (Math.floor(data.length%perpage)>0 ? 1 : 0);
      return (<div>
        <AdvanceSearch dropdown={advanceSearchBy} searchMe={manipulateData} resetMe={resetMe} />
        <table className="table table-striped table-hover">
          <thead>
              <tr>
                <th scope="col" onClick={sortCol.bind(this, 'Name')}>Company Name</th>
                <th scope="col" onClick={sortCol.bind(this, 'Type')}>Company Type</th>
                <th scope="col" onClick={sortCol.bind(this, 'IoA')}>INSURANCE NAME</th>
              </tr>
          </thead>
          <tbody>
          {
            pageData.map(({ ID, Name, Type, IoA })=>{
              return (<tr key={ID}>
                <td><Link className="color-red text-decoration-none" to={"/company/edit-company?companyID="+ID}>{Name}</Link></td>
                <td>{Type}</td>
                <td>{IoA}</td>
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
                    <th scope="col">Company Name</th>
                    <th scope="col">Company Type</th>
                    <th scope="col">Influencer or Advocate</th>
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
  keyEnterKey=(e)=>{
    if(e.key === 'Enter') {
      this.onSearchCompany();
    }
  }
  render() {
    const { onSearchCompany, onChangeStatus, keyEnterKey, display, state } = this;
    const { searchFor } = state;
    return (
      <>
        <SEO title="Company Search" />
        <div className="content-wrapper px-4 py-4">
  
        
        <Card>
            <CardBody>
  
              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="mb-5">Company Search</h1>
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">

                        <Row>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="SearchVal">Search For</label>
                            <Input fullWidth size="Medium" className="SearchVal">
                              <input type="text" placeholder="" id="SearchVal" name="SearchVal" onKeyUp={keyEnterKey.bind(this)} onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}></Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                              <Button status="Success" type="button" shape="SemiRound" onClick={onSearchCompany} fullWidth>Search</Button>
                          </Col>
                      </Row>
                            

                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-4">
                    <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 12 }}>
                      <h2 className="mb-0">Search Results</h2>
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