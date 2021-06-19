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
  paginateLimit, perPageLimitList, __noProduct, 
  paginationProcess, sortTable,
  SourceObj, DispositionObj, defaultSelected,
  searchByOptions, searchByCompanyId, checkCompanyAB
} from "../../components/utils/common";
import AdvanceSearch from '../../components/AdvanceSearch';

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const isBrowser = typeof window !== "undefined";

export default class Index extends Component {
  state = {
    status: 'Active',
    company: {
      label: 'All',
      value: 0
    },
    searchBy: {
      label: 'Email',
      value: 'EmailAddress'
    },
    searchFor: '',
    selected: {
      ...defaultSelected,
      "Active": "Info"
    },
    data: [],
    tempData: [],
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
  selStatus = (e) => {
    const target = e.target.value;
    this.saveState({
      selected: {
        ...defaultSelected,
        [target]: "Info"
      },
      status: target
    });
  }
  onSearchLeads = () => {
    const { state: { company, searchBy, searchFor, status }, saveState } = this;
    saveState({
      loader: 'Loading!!!',
      error: false,
      errorMsg: '',
      data: []
    });
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',{
      params: {
        tblName: 'tblLeads',
        queryType: 'searchLeadsByCompanyForBy',
        company: company.value,
        searchBy: searchBy.value,
        searchFor: searchFor,
        status: status
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
    let { data, toggleFName, toggleLName, toggleEmail, 
      togglePhone, toggleRep, toggleService, toggleDisposition, 
      toggleSource, toggleCreate, toggleModified } = this.state;
    let toggling;
    data.sort((a, b) => {
      var nameA = "";
      var nameB = "";
      var sorted;
      switch(type) {
        case 'FirstName':
          nameA = checkCompanyAB(a.FirstName);
          nameB = checkCompanyAB(b.FirstName);
          sorted = toggleFName;
          toggling = { toggleFName: !toggleFName };
          break;
        case 'LastName':
          nameA = checkCompanyAB(a.LastName);
          nameB = checkCompanyAB(b.LastName);
          sorted = toggleLName;
          toggling = { toggleLName: !toggleLName };
          break;
        case 'Email':
          nameA = checkCompanyAB(a.Email);
          nameB = checkCompanyAB(b.Email);
          sorted = toggleEmail;
          toggling = { toggleEmail: !toggleEmail };
          break;
        case 'Phone':
          nameA = checkCompanyAB(a.Phone);
          nameB = checkCompanyAB(b.Phone);
          sorted = togglePhone;
          toggling = { togglePhone: !togglePhone };
          break;
        case 'Rep':
          nameA = checkCompanyAB(a.Rep);
          nameB = checkCompanyAB(b.Rep);
          sorted = toggleRep;
          toggling = { toggleRep: !toggleRep };
          break;
        case 'Service':
          nameA = checkCompanyAB(a.Service);
          nameB = checkCompanyAB(b.Service);
          sorted = toggleService;
          toggling = { toggleService: !toggleService };
          break;
        case 'Disposition':
          nameA = checkCompanyAB(a.Disposition);
          nameB = checkCompanyAB(b.Disposition);
          sorted = toggleDisposition;
          toggling = { toggleDisposition: !toggleDisposition };
          break;
        case 'Source':
          nameA = checkCompanyAB(a.Source);
          nameB = checkCompanyAB(b.Source);
          sorted = toggleSource;
          toggling = { toggleSource: !toggleSource };
          break;
        case 'Created':
          nameA = checkCompanyAB(a.Created);
          nameB = checkCompanyAB(b.Created);
          sorted = toggleCreate;
          toggling = { toggleCreate: !toggleCreate };
          break;
        case 'Modified':
          nameA = checkCompanyAB(a.Modified);
          nameB = checkCompanyAB(b.Modified);
          sorted = toggleModified;
          toggling = { toggleModified: !toggleModified };
          break;
        default:
          nameA = checkCompanyAB(a.FirstName);
          nameB = checkCompanyAB(b.FirstName); 
          sorted = toggleFName;
          toggling = { toggleFName: !toggleFName };
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
        case 'FirstName':
          return item.FirstName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'LastName':
          return item.LastName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'Email':
          return item.Email.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'Phone':
          return item.Phone.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'Rep':
          return item.Rep.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'Service':
          return item.Service.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'Disposition':
          return item.Disposition.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'Source':
          return item.Source.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'Created':
          return item.Created.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        case 'Modified':
          return item.Modified.toLowerCase().indexOf(query.toLowerCase()) !== -1;                                                
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
      { value: 'FirstName', label: 'FIRST NAME' },
      { value: 'LastName', label: 'LAST NAME' },
      { value: 'Email', label: 'EMAIL' },
      { value: 'Phone', label: 'PHONE' },
      { value: 'Rep', label: 'REP' },
      { value: 'Service', label: 'SERVICE' },
      { value: 'Disposition', label: 'DISPOSITION' },
      { value: 'Source', label: 'SOURCE' },
      { value: 'Created', label: 'CREATED' },
      { value: 'Modified', label: 'MODIFIED' }
    ];
    if(data !== undefined && data.length > 0) {
      const pageData = data.slice(current, current+perpage);
      const max = (Math.floor(data.length/perpage)) + (Math.floor(data.length%perpage)>0 ? 1 : 0);
      return (<div>
        <AdvanceSearch dropdown={advanceSearchBy} searchMe={manipulateData} resetMe={resetMe} />
        <table className="table table-striped table-hover">
          <thead>
              <tr>
                <th scope="col" onClick={sortCol.bind(this, 'FirstName')}>FIRST NAME</th>
                <th scope="col" onClick={sortCol.bind(this, 'LastName')}>LAST NAME</th>
                <th scope="col" onClick={sortCol.bind(this, 'Email')}>EMAIL</th>
                <th scope="col" onClick={sortCol.bind(this, 'Phone')}>PHONE</th>
                <th scope="col" onClick={sortCol.bind(this, 'Rep')}>REP</th>
                <th scope="col" onClick={sortCol.bind(this, 'Service')}>SERVICE</th>
                <th scope="col" onClick={sortCol.bind(this, 'Disposition')}>DISPOSITION</th>
                <th scope="col" onClick={sortCol.bind(this, 'Source')}>SOURCE</th>
                <th scope="col" onClick={sortCol.bind(this, 'Created')}>CREATED</th>
                <th scope="col" onClick={sortCol.bind(this, 'Modified')}>MODIFIED</th>
              </tr>
          </thead>
          <tbody>
          {
            pageData.map(({ 
              LeadID, FirstName, LastName, Email, Phone, Rep, Service, Disposition, Source, Created, Modified
            })=>{
              return (<tr key={LeadID}>
                <td><a className="color-red text-decoration-none" href={"/leads/edit-lead?leadID=" + LeadID}>{FirstName}</a></td>
                <td><a className="color-red text-decoration-none" href={"/leads/edit-lead?leadID=" + LeadID}>{LastName}</a></td>
                <td><a className="color-red text-decoration-none" href={"/leads/edit-lead?leadID=" + LeadID}>{Email}</a></td>
                <td>{Phone}</td>
                <td>{Rep}</td>
                <td>{Service}</td>
                <td>{DispositionObj[Disposition]}</td>
                <td>{SourceObj[Source]}</td>
                <td>{Created}</td>
                <td>{Modified}</td>
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
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>REP</th>
                    <th>SERVICE</th>
                    <th>DISPOSITION</th>
                    <th>SOURCE</th>
                    <th>CREATED</th>
                    <th>MODIFIED</th>
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
  render() {
    const { onSearchLeads, selStatus, onChangeDropdown, onChangeInputText, display, state } = this;
    const { selected, company, searchBy, searchFor } = state;
    return (
      <>
        <SEO title="LEAD ADMIN" />
        <div className="content-wrapper px-4 py-4">
  
        
        <Card>
            <CardBody>
  
              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="text-center mb-5">LEAD ADMIN</h1>
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    {/* <Card>
                      <CardBody className="p-5"> */}
                          <Row className="justify-content-center mb-4">
                          <Col breakPoint={{ xs: 12 }} className="d-flex justify-content-center">
                            <Button className="mx-1" status={selected.Active} type="button" shape="square" onClick={selStatus.bind(this)} value="Active">Active</Button>
                            <Button className="mx-1" status={selected.Referred} type="button" shape="square" onClick={selStatus.bind(this)} value="Referred">Referred</Button>
                            <Button className="mx-1" status={selected.Deactivated} type="button" shape="square" onClick={selStatus.bind(this)} value="Deactivated">Deactivated</Button>
                            <Button className="mx-1" status={selected.Admin} type="button" shape="square" onClick={selStatus.bind(this)} value="Admin">Admin</Button>
                            <Button className="mx-1" status={selected.All} type="button" shape="square" onClick={selStatus.bind(this)} value="All">All</Button>
                          </Col>
                          </Row>
                          <Row>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 4 }}>
                              <label htmlFor="CompanyID">Company</label>
                              <SelectStyled options={searchByCompanyId}  placeholder={company.label} value={company.value} id="CompanyID" name="CompanyID" onChange ={onChangeDropdown.bind(this, `company`)} />
                            </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 4 }}>
                              <label htmlFor="SearchBy">Search By</label>
                              <SelectStyled options={searchByOptions}  placeholder={searchBy.label} value={searchBy.value} id="SearchBy" name="SearchBy" onChange ={onChangeDropdown.bind(this, `searchBy`)} />
                            </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 4 }}>
                            <label htmlFor="SearchVal">Search For</label>
                              <Input fullWidth size="Medium" className="notes">
                                <input type="text" placeholder={searchFor} value={searchFor} id="SearchVal" name="SearchVal" onChange={onChangeInputText.bind(this)}/>
                              </Input>
                            </Col>
                            <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                                <Button status="Success" type="button" shape="SemiRound" onClick={onSearchLeads}>View Leads</Button>
                            </Col>
                        </Row>
                      {/* </CardBody>
                    </Card> */}
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