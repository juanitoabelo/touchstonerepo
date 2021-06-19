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

const isBrowser = typeof window !== "undefined";

export default class Index extends Component {
  state = {
    data: [],
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
  editViewProduct = (insuranceID, e) => {
    e.preventDefault();
    console.log(e,'eeee');
    console.log(insuranceID);
  }
  saveState = (obj) => {
    this.setState(obj);
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
  onSearchNetwork = () => {
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
        tblName: 'tblNetwork',
        queryType: 'getNetworkByName'
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
  onChangeStatus = (e) => {
    this.saveState({ searchFor: e.target.value });
  }
  sortCol = (type) => {
    let { data, toggleName } = this.state;
    let toggling;
    data.sort((a, b) => {
      var nameA;
      var nameB;
      nameA = a.Name.toUpperCase(); 
      nameB = b.Name.toUpperCase(); 
      if (nameA < nameB) {
        if (toggleName) return 1;
        return -1;
      }
      if (nameA > nameB) {
        if (toggleName) return -1;
        return 1;
      }
      return 0;        
    });
    switch(type) {
      case 'Name':
        toggling = { toggleName: !toggleName };
        break;
      default:
        toggling = {};
        break;
    }
    this.saveState({ data: data, ...toggling });
  }
  display = ({ data, loader, error, errorMsg, current, perpage, pagination }) => {
    if(data !== undefined && data.length > 0) {
      const { pageFunc, sortCol } = this;
      const pageData = data.slice(current, current+perpage);
      const max = (Math.floor(data.length/perpage)) + (Math.floor(data.length%perpage)>0 ? 1 : 0);
      return (<div>
        <table className="table table-striped table-hover">
          <thead>
              <tr>
                <th scope="col" onClick={sortCol.bind(this, 'Name')}>Network Name</th>
              </tr>
          </thead>
          <tbody>
          {
            pageData.map(({ NetworkID, Name })=>{
              return (<tr key={NetworkID}>
                <td>{Name}</td>
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
                <th scope="col">Network Name</th>
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
    const { onSearchNetwork, onChangeStatus, display, state } = this;
    const { searchFor } = state;
    return (
      <>
        <SEO title="USERS" />
        <div className="content-wrapper px-4 py-4">
  
        
        <Card>
            <CardBody>
  
              <Container>
                  <Row>
                    <Col breakPoint={{ xs: 12 }}>
                      <h1 className="mb-5">Network Search</h1>
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-5">
                    <Col className="col-lg-12">
                    <form>
                        <Row>
                          <Col breakPoint={{ xs: 12 }}>
                          <label htmlFor="SearchVal">Search For</label>
                            <Input fullWidth size="Medium" className="SearchVal">
                              <input type="text" placeholder="" value={searchFor} id="SearchVal" name="SearchVal" onChange ={onChangeStatus.bind(this)}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}></Col>
                          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
                              <Button status="Success" type="button" shape="SemiRound" onClick={onSearchNetwork} fullWidth>Show Networks</Button>
                          </Col>
                      </Row>
                            
                    </form> 
                    </Col>
                  </Row>
  
                  <Row className="justify-content-center align-items-center mb-4">
                    <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 12 }}>
                      <h2 className="mb-0">Network List</h2>
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