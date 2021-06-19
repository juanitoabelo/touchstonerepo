import React, { Component } from 'react';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import styled from 'styled-components';
import Select from '@paljs/ui/Select';
import { InputGroup } from '@paljs/ui/Input';
import { Button } from '@paljs/ui/Button';
import { Accordion, AccordionItem } from '@paljs/ui/Accordion';
const statusList = [
  { value: 'Active', label: 'Active' },
  { value: 'InActive', label: 'InActive' }
];
const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;
const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;
const AccordionStyled = styled(Accordion)`
  margin-bottom: 2rem;
`;
export default class AdvanceSearch extends Component {
  state = {
    searchFor: '',
    searchBy: {
      value: this.props.dropdown[0].value,
      label: this.props.dropdown[0].label
    }
  }
  saveState = (obj) => {
    this.setState(obj);
  }
  changeSearchOption = (type, e) => {
    switch(type) {
      case 'name':
        this.saveState({ searchFor: e.target.value });
        break;
      case 'desc':
        let searchForObj = { searchFor: '' };
        if (e.label.toLowerCase() === 'status') {
          searchForObj = {
            searchFor: 'Active'
          }
        }
        this.saveState({ searchBy: { value: e.value, label: e.label }, ...searchForObj });
        break;
      default:
        this.saveState({ searchFor: e.value });
        break;
    }
  }
  onReset = () => {
    this.props.resetMe();
    this.saveState({
      searchFor: '',
      searchBy: {
        value: this.props.dropdown[0].value,
        label: this.props.dropdown[0].label
      }
    });
  }
  onSearchMe = () => {
    const { state: { searchFor, searchBy } } = this;
    this.props.searchMe({
      query: searchFor,
      queryBy: searchBy.value
    });
  }
  displayInput = (type) => {
    const { state: { searchFor }, changeSearchOption } = this;
    if (type.toLowerCase() === 'status') {
      return <SelectStyled options={statusList}  placeholder={searchFor} id="type" value={searchFor} onChange={changeSearchOption.bind(this, 'optionName')} />
    }
    return <Input fullWidth size="Small" className="notes">
    <input type="text" placeholder={searchFor} id="notes" className="notes2" value={searchFor} onChange={changeSearchOption.bind(this, 'name')}/>
  </Input>
  }
  render() {
    const { state: { searchBy }, props: { dropdown }, changeSearchOption, onReset, onSearchMe, displayInput } = this;
    return (
    <AccordionStyled>
      <AccordionItem uniqueKey={1} title="Advance Search">
        <Row>
          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
            <label htmlFor="notes">Search For</label>
            {displayInput(searchBy.label)}
          </Col>
          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
            <label htmlFor="type">By</label>
            <SelectStyled options={dropdown}  placeholder={searchBy} id="type" value={searchBy} onChange={changeSearchOption.bind(this, 'desc')} />
          </Col>
          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
            <Button status="Info" type="button" shape="SemiRound" onClick={onReset.bind(this)} fullWidth>Reset</Button>
          </Col>
          <Col breakPoint={{ xs: 12 }} breakPoint={{ md: 6 }}>
              <Button status="Success" type="button" shape="SemiRound" onClick={onSearchMe.bind(this)} fullWidth>Search</Button>
          </Col>
        </Row>
        <br/><br/><br/>
      </AccordionItem>
    </AccordionStyled>
    );
  }
}