import React, { Component } from 'react';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import Select from '@paljs/ui/Select';
import styled from 'styled-components';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Container } from '@material-ui/core';
import { Card, CardBody } from '@paljs/ui/Card';
import { Accordion, AccordionItem } from '@paljs/ui/Accordion';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import SEO from '../../components/SEO';
import axios from 'axios';
import { isLoggedIn } from '../../components/services/auth';
import { 
  getURLParams, leadStatus, leadDisposition, 
  leadCrisisScale, leadYesNo, leadUsers, objLeadInfo,
  objLeadInfoText, stringFirstCharCapitalized, leadAdmins
} from '../../components/utils/common';

//  import { LeadInformationForm } from '../../components/LeadForms/lead-information-form';
// import { PatientChildprofileForm } from '../../components/LeadForms/patien-child-profile-form';


const isBrowser = typeof window !== "undefined";

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const SelectStyled = styled(Select)`
  margin-bottom: 0.25rem;
`;

// const LeadInformationAwareOfTreatmentCostsStatus = '';

 let LeadInformationAwareOfTreatmentCostsStatus = 'Select Option';
 let PatientIsAdoptedStatus = '';
 let PatientIsRunawayStatus = '';
 let InsuranceProviderStatus = '';
 let InsuranceTypeStatus = '';
 let IsViolentStatus = '';
 let IsCourtOrderedStatus = '';
 let AlcoholOrMarijuanaStatus = '';

// const AwareOfTreatmentCost = [
//   { value: '0', label: 'No' },
//   { value: '1', label: 'Yes' }
// ];

// const RunawayList = [
//   { value: '0', label: 'No' },
//   { value: '1', label: 'Yes' }
// ];

// const AdoptedList = [
//   { value: '0', label: 'No' },
//   { value: '1', label: 'Yes' }
// ];

// const IsCourtOrderedList = [
//   { value: '0', label: 'No' },
//   { value: '1', label: 'Yes' }
// ];

// const IsEmergencyList = [
//   { value: '0', label: 'No' },
//   { value: '1', label: 'Yes' }
// ];

const InitialDispositionList = [
  { value: '0', label: 'None' },
  { value: '4', label: 'Missed Call' },
  { value: '5', label: 'Form Fill' },
  { value: '6', label: 'Phone Call' },
  { value: '7', label: 'Accepted Call' },
  { value: '8', label: 'Voicemail' }
];

const AgeList = [
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
  { value: '25', label: '25' },
];
const GenderList = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Transgender', label: 'Transgender' }
];
  
const ReadingLevelList = [
  { value: 'On Target', label: 'On Target' },
  { value: 'Below', label: 'Below' },
  { value: 'Above', label: 'Above' }
];

export default class EditLead extends Component {
  state = {
    // main lead form state variables 
    Status: '',
    Disposition: '', 
    CrisisScale: '',
    InitialRep: '',
    AssignedAdvocate: '',
    FirstName: '',
    LastName: '',
    Email: '', 
    HomePhone: '',
    SubstanceAbuse: '', 
    MentalHealth: '', 
    DualDiagnosis: '', 
    Diagnosis: '',

    // Lead Information form state variables
    LeadInformationCompanyName: '',
    LeadInformationWorkPhone: '',
    LeadInformationCellPhone: '',
    LeadInformationShippingAddress1: '',
    LeadInformationShippingCity: '',
    LeadInformationShippingState: '',
    LeadInformationShippingZip: '',
    LeadInformationShippingCountry: '',
    LeadInformationMonthlyBudget: '',
    LeadInformationServicesPrefered: '',
    LeadInformationBestContact: '',
    LeadInformationAwareOfTreatmentCosts: '',
    LeadInformationResourcePlan: '',

    // Patient Child Profile form state variables
    PatientName: '',
    PatientDOB: new Date(),
    PatientAge: '',
    PatientGender: '',
    PatientIsAdopted: '',
    PatientExpectToEnrollDate: new Date(),
    PatientBehaviors: '',
    PatientEthinicity: '',
    PatientHeight: '',
    PatientWeight: '',
    PatientEyeColor: '',
    PatientHairColor: '',
    PatientShoeSize: '',
    PatientShirtSize: '',
    PatientWaistSize: '',
    PatientReligion: '',
    PatientRiskTimeline: '',
    PatientIsRunaway: '',
    PatientRunawayOutcome: '',
    PatientHealthIssues: '',
    PatientAllergyHistory: '',
    PatientIQ: '',
    PatientPhysicalLimits: '',

  // Insurance form state variables
    InsuranceProvider: '',
    InsuranceType: '',
    InsurancePhone: '',
    InsuranceMemberID: '',
    InsuranceGroupID: '',
    InsurancePolicyID: '',

    // Self Harm History form state variables
    SelfHarmHistorySuicidal: '',
    SelfHarmHistoryPastSuicidalDesc: '',
    SelfHarmHistorySelfHarmDesc: '',
    SelfHarmHistorySuicideAttemptDesc: '',
    SelfHarmHistorySuicideDocNotes: '',
    
    // Violence History form state variables
    ViolenceHistoryIsViolent: '',
    HistoryViolence: '',
    ViolenceHistoryArsonHistory: '',

    // Legal History form state variables
    LegalHistoryLegalDesc: '',
    LegalHistoryArrestedDesc: '',
    LegalHistoryProbationDesc: '',
    LegalHistoryIsCourtOrdered: '',
    LegalHistoryNextCourtDate: '',
    LegalHistoryCourtOrderDesc: '',

    // Therapy History form state variables
    TherapyHistoryTherapyDesc: '',
    TherapyHistoryMedDesc: '',
    TherapyHistoryMentalIllnessDesc: '',

    // School History form state variables
    SchoolHistorySchoolGrade: '',
    SchoolHistoryChildReadingLevel: '',
    SchoolHistorySchoolHelp: '',
    SchoolHistoryIEPOr504: '',
    SchoolHistoryAreasRequiringHelp: '',
    SchoolHistorySchoolOnTrack: '',
    SchoolHistoryExpelHistory: '',

    // Drug History form state variables
    DrugHistoryAlcoholOrMarijuana: '',
    DrugHistoryExperimentOrAbuse: '',
    DrugHistoryDrugHistory: '',

    // Sexual History form state variables
    SexualHistoryIsSexuallyActive: '',
    SexualHistoryRelHistory: '',
    SexualHistoryDevianceHistory: '',
    SexualHistoryInternetHistory: '',

    // Emergency Contact form state variables
    EmergencyContactECName: '',
    EmergencyContactECRelationship: '',
    EmergencyContactECPhone: '',
    EmergencyContactECAddress: '',
    EmergencyContactECCity: '',
    EmergencyContactECState: '',
    EmergencyContactECZip: '',

  // Parent Guardian Sponsor form state variables
    GuardRelationship: '',
    GuardName: '',
    GuardAddress: '',
    GuardCity: '',
    GuardState: '',
    GuardZip: '',
    GuardHomePhone: '',
    GuardMobilePhone: '',
    GuardEmail: '',
    GuardFax: '',
    GuardMethod: '',
    GuardSponsor: '',
    GuardLegalCust: '',
    GuardPhysCust: '',
    GuardEC: '',
    GuardPG: '',
    GuardDOB: '',
    GuardSSN: '',
    GuardJobTitle: '',
    GuardEmployer: '',
    GuardWorkPhone: '',
    GuardWorkEmail: '',
    GuardWorkFax: '',
    GuardReligion: '',
    GuardRelDesc: '',

  
    // Refererral Info form state variables
    RefererralInfoInitialDisposition: '',
    RefererralInfoHowHear: '',
    RefererralInfoRefSource: '',
    RefererralInfoRefReason: '',
    RefererralInfoIsEmergency: '',

    // Verification Upload form state variables
    PreAppFilePath: '',

    LeadID: 0,



    LeadName: 'Sample: RACHEAL MILLER',
    ToDoReminderDate: new Date(),
    
  };

  // saveState = (data) => {
  //   this.setState(data);
  // }
  
  componentWillUnmount(){
    const { saveState, state } = this;

    this.setState({
      // main lead form state variables 
      Status: '',
      Disposition: '', 
      CrisisScale: '',
      InitialRep: '',
      AssignedAdvocate: '',
      FirstName: '',
      LastName: '',
      Email: '', 
      HomePhone: '',
      SubstanceAbuse: '', 
      MentalHealth: '', 
      DualDiagnosis: '', 
      Diagnosis: '',

      /* Lead Information form state variables */
      LeadInformationCompanyName: '',
      LeadInformationWorkPhone: '',
      LeadInformationCellPhone: '',
      LeadInformationShippingAddress1: '',
      LeadInformationShippingCity: '',
      LeadInformationShippingState: '',
      LeadInformationShippingZip: '',
      LeadInformationShippingCountry: '',
      LeadInformationMonthlyBudget: '',
      LeadInformationServicesPrefered: '',
      LeadInformationBestContact: '',
      LeadInformationAwareOfTreatmentCosts: '',
      LeadInformationResourcePlan: '',

      /* Patient Child Profile form state variables */
      PatientName: '',
      PatientDOB: new Date(),
      PatientAge: '',
      PatientGender: '',
      PatientIsAdopted: '',
      PatientExpectToEnrollDate: new Date(),
      PatientBehaviors: '',
      PatientEthinicity: '',
      PatientHeight: '',
      PatientWeight: '',
      PatientEyeColor: '',
      PatientHairColor: '',
      PatientShoeSize: '',
      PatientShirtSize: '',
      PatientWaistSize: '',
      PatientReligion: '',
      PatientRiskTimeline: '',
      PatientIsRunaway: '',
      PatientRunawayOutcome: '',
      PatientHealthIssues: '',
      PatientAllergyHistory: '',
      PatientIQ: '',
      PatientPhysicalLimits: '',

    // Insurance form state variables
      InsuranceProvider: '',
      InsuranceType: '',
      InsurancePhone: '',
      InsuranceMemberID: '',
      InsuranceGroupID: '',
      InsurancePolicyID: '',

      // Self Harm History form state variables
      SelfHarmHistorySuicidal: '',
      SelfHarmHistoryPastSuicidalDesc: '',
      SelfHarmHistorySelfHarmDesc: '',
      SelfHarmHistorySuicideAttemptDesc: '',
      SelfHarmHistorySuicideDocNotes: '',
      
      // Violence History form state variables
      ViolenceHistoryIsViolent: '',
      HistoryViolence: '',
      ViolenceHistoryArsonHistory: '',

      // Legal History form state variables
      LegalHistoryLegalDesc: '',
      LegalHistoryArrestedDesc: '',
      LegalHistoryProbationDesc: '',
      LegalHistoryIsCourtOrdered: '',
      LegalHistoryNextCourtDate: '',
      LegalHistoryCourtOrderDesc: '',

      // Therapy History form state variables
      TherapyHistoryTherapyDesc: '',
      TherapyHistoryMedDesc: '',
      TherapyHistoryMentalIllnessDesc: '',

      // School History form state variables
      SchoolHistorySchoolGrade: '',
      SchoolHistoryChildReadingLevel: '',
      SchoolHistorySchoolHelp: '',
      SchoolHistoryIEPOr504: '',
      SchoolHistoryAreasRequiringHelp: '',
      SchoolHistorySchoolOnTrack: '',
      SchoolHistoryExpelHistory: '',

      // Drug History form state variables
      DrugHistoryAlcoholOrMarijuana: '',
      DrugHistoryExperimentOrAbuse: '',
      DrugHistoryDrugHistory: '',

      // Sexual History form state variables
      SexualHistoryIsSexuallyActive: '',
      SexualHistoryRelHistory: '',
      SexualHistoryDevianceHistory: '',
      SexualHistoryInternetHistory: '',

      // Emergency Contact form state variables
      EmergencyContactECName: '',
      EmergencyContactECRelationship: '',
      EmergencyContactECPhone: '',
      EmergencyContactECAddress: '',
      EmergencyContactECCity: '',
      EmergencyContactECState: '',
      EmergencyContactECZip: '',

    // Parent Guardian Sponsor form state variables
      GuardRelationship: '',
      GuardName: '',
      GuardAddress: '',
      GuardCity: '',
      GuardState: '',
      GuardZip: '',
      GuardHomePhone: '',
      GuardMobilePhone: '',
      GuardEmail: '',
      GuardFax: '',
      GuardMethod: '',
      GuardSponsor: '',
      GuardLegalCust: '',
      GuardPhysCust: '',
      GuardEC: '',
      GuardPG: '',
      GuardDOB: '',
      GuardSSN: '',
      GuardJobTitle: '',
      GuardEmployer: '',
      GuardWorkPhone: '',
      GuardWorkEmail: '',
      GuardWorkFax: '',
      GuardReligion: '',
      GuardRelDesc: '',

    
      // Refererral Info form state variables
      RefererralInfoInitialDisposition: '',
      RefererralInfoHowHear: '',
      RefererralInfoRefSource: '',
      RefererralInfoRefReason: '',
      RefererralInfoIsEmergency: '',

      // Verification Upload form state variables
      PreAppFilePath: '',

      LeadID: 0,

    })  
  }

  saveState = (data) => {
    this.setState(data);
  }

  componentDidMount() {
    if (!isLoggedIn() && isBrowser ) {
      window.location.href="/"
    }
    const { saveState, state } = this;

    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    /** Get All Company Details **/
    axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadById',
        LeadID: LeadID,
      }
    })
    .then(function (response) {
      // console.log('product id 2:'+prodId);
      console.log('Single Lead Data: '+ JSON.stringify(response.data));
      saveState({

        AlcoholOrMarijuana: response.data.AlcoholOrMarijuana,
        IsSexuallyActive: response.data.IsSexuallyActive,
        IsViolent: response.data.IsViolent,
        IsCourtOrdered: response.data.IsCourtOrdered,
        
        
        Status: response.data.Status,
        Disposition: response.data.Disposition, 
        CrisisScale: response.data.CrisisScale,
        InitialRep: response.data.InitialRep,
        AssignedAdvocate: response.data.AssignedAdvocate,
        FirstName: response.data.FirstName,
        LastName: response.data.LastName,
        EmailAddress: response.data.EmailAddress,
        HomePhone: response.data.HomePhone,
        SubstanceAbuse: response.data.SubstanceAbuse,
        IsMentalHealth: response.data.IsMentalHealth,
        DualDiagnosis: response.data.IsDD,
        Diagnosis: response.data.Diagnosis
      });
       
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });


    /* Get Lead Information Form data for default Field display */
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadInfoData',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      // console.log(response,`successfully Updating Lead information`);
      console.log('Single Lead Information Data s: '+ LeadID + JSON.stringify(response.data));
      saveState({
        LeadInformationCompanyName: response.data.CompanyName,
        LeadInformationWorkPhone: response.data.WorkPhone,
        LeadInformationCellPhone: response.data.CellPhone,
        LeadInformationShippingAddress1: response.data.ShippingAddress1,
        LeadInformationShippingCity: response.data.ShippingCity,
        LeadInformationShippingState: response.data.ShippingState,
        LeadInformationShippingZip: response.data.ShippingZip,
        LeadInformationShippingCountry: response.data.ShippingCountry,
        LeadInformationMonthlyBudget: response.data.MonthlyBudget,
        LeadInformationServicesPrefered: response.data.ServicesPrefered,
        LeadInformationBestContact: response.data.BestContact,
        LeadInformationAwareOfTreatmentCosts: response.data.AwareOfTreatmentCosts,
        LeadInformationResourcePlan: response.data.ResourcePlan
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /* Get Patien Child Profile Form data for default Field display */
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadParentChildProfile',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      // console.log(response,`successfully Updating Lead information`);
      console.log('Single Lead Information Data s: '+ LeadID + JSON.stringify(response.data));
      saveState({
          PatientName: response.data.PatientName,
          PatientDOB: response.data.PatientDOB,
          PatientAge: response.data.PatientAge,
          PatientGender: response.data.PatientGender,
          PatientIsAdopted: response.data.IsAdopted,
          PatientExpectToEnrollDate: response.data.ExpectToEnrollDate,
          PatientBehaviors: response.data.Behaviors,
          PatientEthinicity: response.data.Ethinicity,
          PatientHeight: response.data.Height,
          PatientWeight: response.data.Weight,
          PatientEyeColor: response.data.EyeColor,
          PatientHairColor: response.data.HairColor,
          PatientShoeSize: response.data.ShoeSize,
          PatientShirtSize: response.data.ShirtSize,
          PatientWaistSize: response.data.WaistSize,
          PatientReligion: response.data.Religion,
          PatientRiskTimeline: response.data.RiskTimeline,
          PatientIsRunaway: response.data.IsRunaway,
          PatientRunawayOutcome: response.data.RunawayOutcome,
          PatientHealthIssues: response.data.HealthIssues,
          PatientAllergyHistory: response.data.AllergyHistory,
          PatientIQ: response.data.Iq,
          PatientPhysicalLimits: response.data.PhysicalLimits
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
    

    /* Get Lead Insurance Form data for default Field display */
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadInsuranceFormData',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      // console.log(response,`successfully Updating Lead information`);
      console.log('Single Lead Insurance Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        InsuranceProvider: response.data.InsuranceProvider,
        InsuranceType: response.data.InsuranceType,
        InsurancePhone: response.data.InsurancePhone,
        InsuranceMemberID: response.data.InsuranceMemberID,
        InsuranceGroupID: response.data.InsuranceGroupID,
        InsurancePolicyID: response.data.InsurancePolicyID
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /* Get Lead Self Harm History Form data for default Field display */
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadSelfHarmHistoryFormData',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      // console.log(response,`successfully Updating Lead information`);
      console.log('Single Lead Insurance Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        SelfHarmHistorySuicidal: response.data.Suicidal,
        SelfHarmHistoryPastSuicidalDesc: response.data.PastSuicidalDesc,
        SelfHarmHistorySelfHarmDesc: response.data.SelfHarmDesc,
        SelfHarmHistorySuicideAttemptDesc: response.data.SuicideAttemptDesc,
        SelfHarmHistorySuicideDocNotes: response.data.SuicideDocNotes,
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /* Get Lead Violence History Form data for default Field display */
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadViolenceHistoryFormData',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      // console.log(response,`successfully Updating Lead information`);
      console.log('Single Lead Violence Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        ViolenceHistoryIsViolent: response.data.IsViolent,
        HistoryViolence: response.data.HistoryViolence,
        ViolenceHistoryArsonHistory: response.data.ArsonHistory,
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

    /* Get Lead Violence History Form data for default Field display */
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadLegalHistoryFormData',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log('Single Lead Legal History Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        LegalHistoryLegalDesc: response.data.LegalDesc,
        LegalHistoryArrestedDesc: response.data.ArrestedDesc,
        LegalHistoryProbationDesc: response.data.ProbationDesc,
        LegalHistoryIsCourtOrdered: response.data.IsCourtOrdered,
        LegalHistoryNextCourtDate: response.data.NextCourtDate,
        LegalHistoryCourtOrderDesc: response.data.CourtOrderDesc,
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /* Get Lead therapy History Form data for default Field display */
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadTherapyHistory',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log('Single Lead Therapy History Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        TherapyHistoryTherapyDesc: response.data.TherapyDesc,
        TherapyHistoryMedDesc: response.data.MedDesc,
        TherapyHistoryMentalIllnessDesc: response.data.MentalIllnessDesc,
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

    /* Get Lead School History Form data for default Field display */
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadSchoolHistory',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log('Single Lead School History Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        SchoolHistorySchoolGrade: response.data.SchoolGrade,
        SchoolHistoryChildReadingLevel: response.data.ChildReadingLevel,
        SchoolHistorySchoolHelp: response.data.SchoolHelp,
        SchoolHistoryIEPOr504: response.data.IEPOr504,
        SchoolHistoryAreasRequiringHelp: response.data.AreasRequiringHelp,
        SchoolHistorySchoolOnTrack: response.data.SchoolOnTrack,
        SchoolHistoryExpelHistory: response.data.ExpelHistory,

      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /* Get Lead Drug History Form data for default Field display */
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadDrugHistory',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log('Single Lead Drug History Data test: '+ LeadID + JSON.stringify(response.data));
      saveState({
        DrugHistoryAlcoholOrMarijuana: response.data.AlcoholOrMarijuana,
        DrugHistoryExperimentOrAbuse: response.data.ExperimentOrAbuse,
        DrugHistoryDrugHistory: response.data.DrugHistory,

      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

    
  } /** End of Component Didmount **/

  
  /** Update Lead Information **/
  onUpdateLeadInformation = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    /** Update Lead Information **/ 
    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadInfo',
          LeadInformationCompanyName: this.state.LeadInformationCompanyName,
          LeadInformationWorkPhone: this.state.LeadInformationWorkPhone,
          LeadInformationCellPhone: this.state.LeadInformationCellPhone,
          LeadInformationShippingAddress1: this.state.LeadInformationShippingAddress1,
          LeadInformationShippingCity: this.state.LeadInformationShippingCity,
          LeadInformationShippingState: this.state.LeadInformationShippingState,
          LeadInformationShippingZip: this.state.LeadInformationShippingZip,
          LeadInformationShippingCountry: this.state.LeadInformationShippingCountry,
          LeadInformationMonthlyBudget: this.state.LeadInformationMonthlyBudget,
          LeadInformationServicesPrefered: this.state.LeadInformationServicesPrefered,
          LeadInformationBestContact: this.state.LeadInformationBestContact,
          LeadInformationAwareOfTreatmentCosts: this.state.LeadInformationAwareOfTreatmentCosts,
          LeadInformationResourcePlan: this.state.LeadInformationResourcePlan,
          LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log(response,`successfully Updating Lead information`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
    
  }

  /** Update Patient Child Profile Info **/
  onUpdateChildProfile = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadParentChildProfile',
          PatientName: this.state.PatientName,
          PatientDOB: this.state.PatientDOB,
          PatientAge: this.state.PatientAge,
          PatientGender: this.state.PatientGender,
          PatientIsAdopted: this.state.PatientIsAdopted,
          PatientExpectToEnrollDate: this.state.PatientExpectToEnrollDate,
          PatientBehaviors: this.state.PatientBehaviors,
          PatientEthinicity: this.state.PatientEthinicity,
          PatientHeight: this.state.PatientHeight,
          PatientWeight: this.state.PatientWeight,
          PatientEyeColor: this.state.PatientEyeColor,
          PatientHairColor: this.state.PatientHairColor,
          PatientShoeSize: this.state.PatientShoeSize,
          PatientShirtSize: this.state.PatientShirtSize,
          PatientWaistSize: this.state.PatientWaistSize,
          PatientReligion: this.state.PatientReligion,
          PatientRiskTimeline: this.state.PatientRiskTimeline,
          PatientIsRunaway: this.state.PatientIsRunaway,
          PatientRunawayOutcome: this.state.PatientRunawayOutcome,
          PatientHealthIssues: this.state.PatientHealthIssues,
          PatientAllergyHistory: this.state.PatientAllergyHistory,
          PatientIQ: this.state.PatientIQ,
          PatientPhysicalLimits: this.state.PatientPhysicalLimits,
          LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log(response,`successfully Updating Parent/Child Profile`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

  }

  /** Update Lead Insurance **/
  onUpdateLeadInsurance = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadInsurance',
        InsuranceProvider: this.state.InsuranceProvider,
        InsuranceType: this.state.InsuranceType,
        InsurancePhone: this.state.InsurancePhone,
        InsuranceMemberID: this.state.InsuranceMemberID,
        InsuranceGroupID: this.state.InsuranceGroupID,
        InsurancePolicyID: this.state.InsurancePolicyID,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log(response,`successfully Updating Lead Insurance`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  /** Update Self Harm History **/
  onUpdateSelfHarmHistory = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadSelfHarmHistory',
        SelfHarmHistorySuicidal: this.state.SelfHarmHistorySuicidal,
        SelfHarmHistoryPastSuicidalDesc: this.state.SelfHarmHistoryPastSuicidalDesc,
        SelfHarmHistorySelfHarmDesc: this.state.SelfHarmHistorySelfHarmDesc,
        SelfHarmHistorySuicideAttemptDesc: this.state.SelfHarmHistorySuicideAttemptDesc,
        SelfHarmHistorySuicideDocNotes: this.state.SelfHarmHistorySuicideDocNotes,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log(response,`successfully Updating Lead Self Harm History`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  /** Update Violence History **/
  onUpdateViolenceHistory = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadViolenceHistory',
        ViolenceHistoryIsViolent: this.state.ViolenceHistoryIsViolent,
        HistoryViolence: this.state.HistoryViolence,
        ViolenceHistoryArsonHistory: this.state.ViolenceHistoryArsonHistory,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log(response,`successfully Updating Lead Violence History`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  /** Update Legal History **/
  onUpdateLegalHistory = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadLegalHistory',
        LegalHistoryLegalDesc: this.state.LegalHistoryLegalDesc,
        LegalHistoryArrestedDesc: this.state.LegalHistoryArrestedDesc,
        LegalHistoryProbationDesc: this.state.LegalHistoryProbationDesc,
        LegalHistoryIsCourtOrdered: this.state.LegalHistoryIsCourtOrdered,
        LegalHistoryNextCourtDate: this.state.LegalHistoryNextCourtDate,
        LegalHistoryCourtOrderDesc: this.state.LegalHistoryCourtOrderDesc,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log(response,`successfully Updating Lead Violence History`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  /** Update Therapy History **/
  onUpdateTherapyHistory = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadTherapyHistory',
        TherapyHistoryTherapyDesc: this.state.TherapyHistoryTherapyDesc,
        TherapyHistoryMedDesc: this.state.TherapyHistoryMedDesc,
        TherapyHistoryMentalIllnessDesc: this.state.TherapyHistoryMentalIllnessDesc,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log(response,`successfully Updating Lead Violence History`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }


  /** Update School History **/
  onUpdateSchoolHistory = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadSchoolHistory',
        SchoolHistorySchoolGrade: this.state.SchoolHistorySchoolGrade,
        SchoolHistoryChildReadingLevel: this.state.SchoolHistoryChildReadingLevel,
        SchoolHistorySchoolHelp: this.state.SchoolHistorySchoolHelp,
        SchoolHistoryIEPOr504: this.state.SchoolHistoryIEPOr504,
        SchoolHistoryAreasRequiringHelp: this.state.SchoolHistoryAreasRequiringHelp,
        SchoolHistorySchoolOnTrack: this.state.SchoolHistorySchoolOnTrack,
        SchoolHistoryExpelHistory: this.state.SchoolHistoryExpelHistory,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log(response,`successfully Updating School History`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  /** Update Drug History **/
  onUpdateDrugHistory = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadDrugHistory',
        DrugHistoryAlcoholOrMarijuana: this.state.DrugHistoryAlcoholOrMarijuana,
        DrugHistoryExperimentOrAbuse: this.state.DrugHistoryExperimentOrAbuse,
        DrugHistoryDrugHistory: this.state.DrugHistoryDrugHistory,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      console.log(response,`successfully Updating Drug History`);
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  /** Update Sexual History **/
  onUpdateSexualHistory = (e) => {

  }
  
  /** Update Emergency Contact  **/
  onUpdateEmergencyContact = (e) => {
    
  }
  
  /** Update Verification Benefits **/
  onUpdateVerificationBenefits = (e) => {

  }

  /** Update Referral Info **/
  onUpdateReferralInfo = (e) => {

  }
  
  /** Update Parent Guardian Sponsor Info **/
  onUpdateParentGuardianSponsorInfo= (e) => {

  }

  onChangeOption = (type, e) => {
    // const { LeadInfo } = this.state;
    // const obj = objLeadInfo({ type, obj: LeadInfo, item: e });
    // this.saveState(obj);
    switch(type){
      case 'EditCompanyName':
          this.saveState({
            LeadInformationCompanyName: e.target.value
          });
        break;
      }

  }

  onLeadInformationChangeInput = (type, e) => {

    switch(type){
      case 'EditCompanyName':
          this.saveState({
            LeadInformationCompanyName: e.target.value
          });
        break;
      case 'EditWorkPhone':
        this.saveState({
          LeadInformationWorkPhone: e.target.value
        }); 
        break;  
      case 'EditCellPhone':
        this.saveState({
          LeadInformationCellPhone: e.target.value
        });
        break;
      case 'EditShippingAddress1':
        this.saveState({
          LeadInformationShippingAddress1: e.target.value
        });
        break;  
        case 'EditShippingCity':
          this.saveState({
            LeadInformationShippingCity: e.target.value
          });
          break;    
        case 'EditShippingState':
          this.saveState({
            LeadInformationShippingState: e.target.value
          });
          break;        
        case 'EditShippingZip':
          this.saveState({
            LeadInformationShippingZip: e.target.value
          });
          break;        
        case 'EditShippingCountry':
          this.saveState({
            LeadInformationShippingCountry: e.target.value
          });
          break;  
        case 'EditMonthlyBudget':
          this.saveState({
            LeadInformationMonthlyBudget: e.target.value
          });
          break;   
        case 'EditServicesPrefered':
          this.saveState({
            LeadInformationServicesPrefered: e.target.value
          });
          break;   
        case 'EditBestContact':
          this.saveState({
            LeadInformationBestContact: e.target.value
          });
          break;         
        case 'EditAwareOfTreatmentCosts':
          console.log('Aware Of Treatment Costs Status:'+ e.value);
          this.saveState({
            LeadInformationAwareOfTreatmentCosts: e.value
          });
          break;           
        case 'EditResourcePlan':
          this.saveState({
            LeadInformationResourcePlan: e.target.value
          });
          break;
    } 

  }

  onChangeParentChildProfileInput = (type, e) => {
    switch(type){
      case 'EditPatientName':
          this.saveState({
            PatientName: e.target.value
          });
        break;
      case 'EditPatientDOB':
        console.log('Date of birth: '+e);
        this.saveState({
          PatientDOB: e
        });

      break;
      case 'EditPatientAge':
        this.saveState({
          PatientAge: e.value
        });
      break;
      case 'EditPatientGender':
        this.saveState({
          PatientGender: e.value
        });
      break;
      case 'EditIsAdopted':
        console.log('is adopted: '+e.value);
        this.saveState({
          PatientIsAdopted: e.value
        });
      break;
      case 'EditExpectToEnrollDate':
        this.saveState({
          PatientExpectToEnrollDate: e
        });
      break;      
      case 'EditBehaviors':
        this.saveState({
          PatientBehaviors: e.target.value
        });
      break;          
      case 'EditEthinicity':
        this.saveState({
          PatientEthinicity: e.target.value
        });
      break;        
      case 'EditHeight':
        this.saveState({
          PatientHeight: e.target.value
        });
      break;  
      case 'EditWeight':
        this.saveState({
          PatientWeight: e.target.value
        });
      break;        
      case 'EditEyeColor':
        this.saveState({
          PatientEyeColor: e.target.value
        });
      break; 
      case 'EditHairColor':
        this.saveState({
          PatientHairColor: e.target.value
        });
      break;    
      case 'EditShoeSize':
        this.saveState({
          PatientShoeSize: e.target.value
        });
      break;        
      case 'EditShirtSize':
        this.saveState({
          PatientShirtSize: e.target.value
        });
      break;       
      case 'EditWaistSize':
        this.saveState({
          PatientWaistSize: e.target.value
        });
      break;       
      case 'EditReligion':
        this.saveState({
          PatientReligion: e.target.value
        });
      break;    
      case 'EditRiskTimeline':
        this.saveState({
          PatientRiskTimeline: e.target.value
        });
      break;  
      case 'EditIsRunaway':
        this.saveState({
          PatientIsRunaway: e.value
        });
      break;  
      case 'EditRunawayOutcome':
        this.saveState({
          PatientRunawayOutcome: e.target.value
        });
      break;    
      case 'EditHealthIssues':
        this.saveState({
          PatientHealthIssues: e.target.value
        });
      break;       
      case 'EditAllergyHistory':
        this.saveState({
          PatientAllergyHistory: e.target.value
        });
      break;       
      case 'EditIQ':
        this.saveState({
          PatientIQ: e.target.value
        });
      break;    
      case 'EditPhysicalLimits':
        this.saveState({
          PatientPhysicalLimits: e.target.value
        });
      break;       
    }
  }

  onChangeLeadInsuranceInput = (type, e) => {
    // console.log('Field Type: '+type);
    switch(type){
      case 'EditInsuranceProvider':
        // console.log('InsuranceProvider: '+e.value);
          this.saveState({
            InsuranceProvider: e.value
          });
        break;
      case 'EditInsuranceType':
        // console.log('InsuranceType: '+e.value);
        this.saveState({
          InsuranceType: e.value
        });
      break;
      case 'EditInsurancePhone':
        console.log('EditInsurancePhone; '+e.target.value);
          this.saveState({
            InsurancePhone: e.target.value
          });
        break;
        case 'EditInsuranceMemberID':
          this.saveState({
            InsuranceMemberID: e.target.value
          });
        break;
        case 'EditInsuranceGroupID':
          this.saveState({
            InsuranceGroupID: e.target.value
          });
        break;
        case 'EditInsurancePolicyID':
          this.saveState({
            InsurancePolicyID: e.target.value
          });
        break;
      }
  }

  onChangeSelfharmHistoryInput = (type, e) => {
    switch(type){
      case 'EditSuicidal':
          this.saveState({
            SelfHarmHistorySuicidal: e.target.value
          });
        break;
      case 'EditPastSuicidalDesc':
        this.saveState({
          SelfHarmHistoryPastSuicidalDesc: e.target.value
        });
      break;
      case 'EditSelfHarmDesc':
        this.saveState({
          SelfHarmHistorySelfHarmDesc: e.target.value
        });
      break;    
      case 'EditSuicideAttemptDesc':
        this.saveState({
          SelfHarmHistorySuicideAttemptDesc: e.target.value
        });
      break;    
      case 'EditSuicideDocNotes':
        this.saveState({
          SelfHarmHistorySuicideDocNotes: e.target.value
        });
      break;
    }
  }

  onChangeViolenceHistoryOption = (type, e) => {
    switch(type){
      case 'EditIsViolent':
          this.saveState({
            ViolenceHistoryIsViolent: e.value
          });
        break;
      case 'EditHistoryViolence':
        this.saveState({
          HistoryViolence: e.target.value
        });
      break;
      case 'EditArsonHistory':
        this.saveState({
          ViolenceHistoryArsonHistory: e.target.value
        });
      break;
    }
  }

  onChangeLegalHistoryOption = (type, e) => {
    switch(type){
      case 'EditLegalDesc':
          this.saveState({
            LegalHistoryLegalDesc: e.target.value
          });
        break;
      case 'EditArrestedDesc':
        this.saveState({
          LegalHistoryArrestedDesc: e.target.value
        });
      break;
      case 'EditProbationDesc':
        this.saveState({
          LegalHistoryProbationDesc: e.target.value
        });
      break;
      case 'EditIsCourtOrdered':
        this.saveState({
          LegalHistoryIsCourtOrdered: e.value
        });
      break;
      case 'EditNextCourtDate':
        this.saveState({
          LegalHistoryNextCourtDate: e
        });
      break;
      case 'EditCourtOrderDesc':
        this.saveState({
          LegalHistoryCourtOrderDesc: e.target.value
        });
      break;
    }
  }

  onChangeTherapyHistoryOption = (type, e) => {
    switch(type){
      case 'EditTherapyDesc':
          this.saveState({
            TherapyHistoryTherapyDesc: e.target.value
          });
        break;
        case 'EditMedDesc':
          this.saveState({
            TherapyHistoryMedDesc: e.target.value
          });
        break;
        case 'EditMentalIllnessDesc':
          this.saveState({
            TherapyHistoryMentalIllnessDesc: e.target.value
          });
        break;   
      }
  }

  onChangeSchoolHistoryOption = (type, e) => {
    switch(type){
      case 'EditSchoolGrade':
          this.saveState({
            SchoolHistorySchoolGrade: e.target.value
          });
        break;
        case 'EditChildReadingLevel':
          this.saveState({
            SchoolHistoryChildReadingLevel: e.value
          });
        break;
        case 'EditSchoolHelp':
          this.saveState({
            SchoolHistorySchoolHelp: e.target.value
          });
        break;   

        case 'EditIEPOr504':
          this.saveState({
            SchoolHistoryIEPOr504: e.target.value
          });
        break;   

        case 'EditAreasRequiringHelp':
          this.saveState({
            SchoolHistoryAreasRequiringHelp: e.target.value
          });
        break;   
        case 'EditSchoolOnTrack':
          this.saveState({
            SchoolHistorySchoolOnTrack: e.target.value
          });
        break;   
        case 'EditExpelHistory':
          this.saveState({
            SchoolHistoryExpelHistory: e.target.value
          });
        break;   
        
      }
  }

  onChangeDrugHistoryOption = (type, e) => {
    switch(type){
      case 'EditAlcoholOrMarijuana':
          this.saveState({
            DrugHistoryAlcoholOrMarijuana: e.value
          });
      break;
      case 'EditExperimentOrAbuse':
        this.saveState({
          DrugHistoryExperimentOrAbuse: e.target.value
        });
      break;
      case 'EditDrugHistory':
        this.saveState({
          DrugHistoryDrugHistory: e.target.value
        });
      break;    
      }
  }

  onChangeInput = (type, e) => {

  }

  onChangeDate = (type, date) => {
    const { LeadInfo } = this.state;
    let stateLess;
    switch(type) {
      case 'ToDoReminderDate':
        stateLess = { 
          LeadInfo: {
            ...LeadInfo,
            ToDoReminderDate: date 
          }
        };
        break;
      default:
        stateLess = { LeadInfo: {
          ...LeadInfo
        } };
        break;
    }
    this.saveState(stateLess);
  }

  onBack = () => {}

  onPrintView = () => {}

  render() {

    const { onBack, onChangeInput,onLeadInformationChangeInput, onChangeParentChildProfileInput, onChangeLeadInsuranceInput, onChangeSelfharmHistoryInput, onChangeViolenceHistoryOption, onChangeLegalHistoryOption, onChangeTherapyHistoryOption, onPrintView, onChangeDate, onChangeOption, onUpdateChildProfile, onUpdateLeadInformation, onUpdateLeadInsurance, onUpdateSelfHarmHistory, 
      onChangeSchoolHistoryOption, onChangeDrugHistoryOption, onUpdateViolenceHistory, onUpdateLegalHistory, onUpdateSchoolHistory, onUpdateTherapyHistory, onUpdateSexualHistory, onUpdateDrugHistory, onUpdateEmergencyContact, 
            onUpdateVerificationBenefits, onUpdateReferralInfo, onUpdateParentGuardianSponsorInfo, state: { LeadName, LeadID, LeadInfo } } = this;
            
    return (<>
      <SEO title="View/Edit Lead" />
      <div className="content-wrapper lead-view-edit-wrapper px-4 py-4">
        <Container style={{ height: 'auto', marginBottom: '1rem' }}>
          <Row>
            <Col breakPoint={{ xs: 2 }}>
              <Button className="mx-1" status="Info" type="button" shape="square" onClick={onBack.bind(this)} fullWidth>BACK</Button>
            </Col>
            <Col breakPoint={{ xs: 2 }}>
              <Button className="mx-1" status="Success" type="button" shape="square" onClick={onPrintView.bind(this)} fullWidth>PRINT VIEW</Button>
            </Col>
          </Row>
        </Container>
        <Card>
          <CardBody>
            <Container>
              <Row className="justify-content-center align-items-center mb-5">
                <Col breakPoint={{ xs: 12 }}>
                  {/* <h2 className="text-center mb-5">View/Edit {this.state.FirstName} {this.state.LastName} {LeadName} ({LeadID})</h2> */}
                  <h2 className="text-center mb-5">View/Edit {this.state.FirstName} {this.state.LastName} ({LeadID})</h2>
                  <p className="text-center">
                    Child: <i>{this.state.PatientName}</i><br/>
                    {this.state.PatientGender}{this.state.PatientAge}{this.state.IsAdopted}
                    <span className="d-block text-danger">{this.state.IsDrugUse}{this.state.IsSexuallyActive}</span>
                    <span className="d-block text-danger">{this.state.IsViolent}{this.state.IsCourtOrdered}</span>

                    {/* Child: <i>{LeadInfo.ParentName}</i><br/>
                    {LeadInfo.PatientGender}{LeadInfo.PatientAge}{LeadInfo.IsAdopted}
                    <span className="d-block text-danger">{LeadInfo.IsDrugUse}{LeadInfo.IsSexuallyActive}</span>
                    <span className="d-block text-danger">{LeadInfo.IsViolent}{LeadInfo.IsCourtOrdered}</span> */}
                  </p>
                </Col> 
                <Col breakPoint={{ xs: 12 }}>  
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Status">Status:</label>
                      <SelectStyled options={leadStatus} placeholder={this.state.Status} value={this.state.Status} id="Status" name="Status" onChange ={onChangeOption.bind(this, 'Status')} />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Disposition">Disposition:</label>
                      <SelectStyled options={leadDisposition} placeholder={this.state.Disposition} value={this.state.Disposition} id="Disposition" name="Disposition" onChange ={onChangeOption.bind(this,'Disposition')} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="CrisisScale">CrisisScale:</label>
                      <SelectStyled options={leadCrisisScale} placeholder={this.state.CrisisScale} value={this.state.CrisisScale} id="CrisisScale" name="CrisisScale" onChange ={onChangeOption.bind(this, 'CrisisScale')} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="InitialRep">Initial Rep:</label>
                      <SelectStyled options={leadUsers} placeholder={this.state.InitialRep} value={this.state.InitialRep} id="InitialRep" name="InitialRep" onChange ={onChangeOption.bind(this, 'InitialRep')} />
                    </Col> 
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="AssignedAdvocate">Assigned Advocate:</label>
                      <SelectStyled options={leadUsers} placeholder={this.state.AssignedAdvocate} value={this.state.AssignedAdvocate} id="AssignedAdvocate" name="AssignedAdvocate" onChange ={onChangeOption.bind(this, 'AssignedAdvocate')} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="FirstName">First Name:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={this.state.FirstName} id="FirstName" name="FirstName" onChange ={onChangeInput.bind(this, 'FirstName')}/>
                      </Input>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="LastName">Last Name:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={this.state.LastName} id="LastName" name="LastName" onChange ={onChangeInput.bind(this, 'LastName')}/>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mb-2"> 
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Email">Email:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={this.state.Email} id="Email" name="Email" onChange ={onChangeInput.bind(this, 'Email')}/>
                      </Input>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="HomePhone">Home Phone:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={this.state.HomePhone} id="HomePhone" name="HomePhone" onChange ={onChangeInput.bind(this, 'HomePhone')}/>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="SubstanceAbuse">Substance Abuse?:</label>
                      <SelectStyled options={leadYesNo} placeholder={this.state.SubstanceAbuse} value={this.state.SubstanceAbuse} id="SubstanceAbuse" name="SubstanceAbuse" onChange ={onChangeOption.bind(this, 'SubstanceAbuse')} />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="MentalHealth">Mental Health:</label>
                      <SelectStyled options={leadYesNo} placeholder={this.state.MentalHealth} value={this.state.MentalHealth} id="MentalHealth" name="MentalHealth" onChange ={onChangeOption.bind(this, 'MentalHealth')} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="DualDiagnosis">Dual Diagnosis:</label>
                      <SelectStyled options={leadYesNo} placeholder={this.state.DualDiagnosis} value={this.state.DualDiagnosis} id="DualDiagnosis" name="DualDiagnosis" onChange ={onChangeOption.bind(this, 'DualDiagnosis')} />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Diagnosis">Diagnosis:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={this.state.Diagnosis} id="Diagnosis" name="Diagnosis" onChange ={onChangeInput.bind(this, 'Diagnosis')}/>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-5">
                        <Button status="Success" type="button" shape="SemiRound" fullWidth className="text-uppercase">SAVE {LeadName}'s LEAD PROFILE</Button>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col breakPoint={{ xs: 12, md: 4 }}>
                        <Button status="Info" type="button" shape="SemiRound" fullWidth className="text-uppercase">REFER {this.state.FirstName.toUpperCase()}</Button>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 4 }}>

                      <Row>
                        <Col breakPoint={{ xs: 6, md: 6 }}><Button status="Info" type="button" shape="SemiRound" fullWidth className="text-uppercase">MERGE FROM</Button></Col>
                        <Col breakPoint={{ xs: 6, md: 6 }}>
                          <Input fullWidth size="Medium" className="mergFrom">
                            <input type="text" placeholder="" id="mergFrom" name="mergFrom" onChange ={onChangeInput.bind(this, 'mergFrom')}/>
                          </Input>
                        </Col>
                      </Row>
                      
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 2 }}></Col>
                    <Col breakPoint={{ xs: 12, md: 2 }}>
                        <Button status="Info" type="button" shape="SemiRound" fullWidth className="text-uppercase">CONVERT {this.state.FirstName.toUpperCase()}</Button>
                    </Col>
                  </Row>
                </Col>
                <Col breakPoint={{ xs: 12 }}>
                  <p className="text-center">
                    Campaign: {this.state.Campaign}<br/>
                    Signup Date: {this.state.SignUpDate}<br/>
                    IP Address: {this.state.IPAddress}<br/>
                    Terms Accepted: {this.state.TermsAccepted}<br/>
                  </p>
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Card>

        <Card>
          <CardBody>

          
          <Container>
            <Row className="justify-content-center align-items-left mb-5">
              <Col breakPoint={{ xs: 12 }}>
                <h2 className="text-left mb-5">LEAD NOTES</h2>
              </Col>
              <Col breakPoint={{ xs: 12 }}>
                <Row className="mb-2">
                  <Col breakPoint={{ xs: 12 }}>
                    <label htmlFor="NewLeadNotes">Add a new lead note for {stringFirstCharCapitalized(this.state.FirstName.toLowerCase())} {stringFirstCharCapitalized(this.state.LastName.toLowerCase())}</label>
                  </Col>
                  <Col breakPoint={{ xs: 12, md: 10 }} className="mb-2">
                    <Input fullWidth size="Medium" className="Name">
                      <input type="text" placeholder='' id="NewLeadNotes" name="NewLeadNotes" onChange ={onChangeInput.bind(this, 'NewLeadNotes')}/>
                    </Input>
                  </Col>
                  <Col breakPoint={{ xs: 12, md: 2 }}>
                    <Button status="Warning" type="button" shape="SemiRound" fullWidth className="text-uppercase">+ ADD NOTE</Button>
                  </Col>
                </Row>
                <Row className="justify-content-left align-items-left mb-5">
                  <Col className="col-lg-12">
                    <h4>Lead Notes List</h4>
                  </Col>
                  <Col className="col-lg-12">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">ENTERED BY</th>
                          <th scope="col">DATE</th>
                          <th scope="col">NOTE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr> 
                          <td scope="col"></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                  <Col className="col-lg-3">
                    <Button status="Warning" type="button" shape="SemiRound" fullWidth className="text-uppercase">UPDATE/SAVE LEAD NOTES</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </CardBody>
        </Card>

        <Card className="p-5">
          <CardBody>
            <Container className="container-fluid">
              <Row className="mb-3">
                <Col className="mb-3" breakPoint={{ xs: 12 }}>

                  <Accordion>
                    {/* Lead information */}
                    {/* <AccordionItem uniqueKey={1} title="LEAD INFORMATION">
                        <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditCompanyName">Company Name</label>
                          <Input fullWidth size="Medium" className="EditWorkPhone">
                            <input type="text" placeholder={this.state.LeadInformationCompanyName} id="EditCompanyName" name="EditCompanyName" onChange ={onLeadInformationChangeInput.bind(this, 'EditCompanyName')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditWorkPhone">Work Phone</label>
                          <Input fullWidth size="Medium" className="EditWorkPhone">
                            <input type="text" placeholder={this.state.LeadInformationWorkPhone} id="EditWorkPhone" name="EditWorkPhone" onChange ={onLeadInformationChangeInput.bind(this, 'EditWorkPhone')}/>
                          </Input> 
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditCellPhone">Cell Phone</label>
                          <Input fullWidth size="Medium" className="EditCellPhone"> 
                            <input type="text" placeholder={this.state.LeadInformationCellPhone} id="EditCellPhone" name="EditCellPhone" onChange ={onLeadInformationChangeInput.bind(this, 'EditCellPhone')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditShippingAddress1">Address</label>
                          <Input fullWidth size="Medium" className="EditShippingAddress1">
                            <input type="text" placeholder={this.state.LeadInformationShippingAddress1} id="EditShippingAddress1" name="EditShippingAddress1" onChange ={onLeadInformationChangeInput.bind(this, 'EditShippingAddress1')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditShippingCity">City/State/Zip</label>
                          <Input fullWidth size="Medium" className="EditShippingCity">
                            <input type="text" placeholder={this.state.LeadInformationShippingCity} id="EditShippingCity" name="EditShippingCity" onChange ={onLeadInformationChangeInput.bind(this, 'EditShippingCity')}/>
                            <input type="text" className="mx-2" placeholder={this.state.LeadInformationShippingState} id="EditShippingState" name="EditShippingState" onChange ={onLeadInformationChangeInput.bind(this, 'EditShippingState')}/>
                            <input type="text" placeholder={this.state.LeadInformationShippingZip} id="EditShippingZip" name="EditShippingZip" onChange ={onLeadInformationChangeInput.bind(this, 'EditShippingZip')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditShippingCountry">Country</label>
                          <Input fullWidth size="Medium" className="EditShippingCountry">
                            <input type="text" placeholder={this.state.LeadInformationShippingCountry} id="EditShippingCountry" name="EditShippingCountry" onChange ={onLeadInformationChangeInput.bind(this, 'EditShippingCountry')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditMonthlyBudget">Monthly Budget</label>
                          <Input fullWidth size="Medium" className="EditMonthlyBudget">
                            <input type="text" placeholder={this.state.LeadInformationMonthlyBudget} id="EditMonthlyBudget" name="EditMonthlyBudget" onChange ={onLeadInformationChangeInput.bind(this, 'EditMonthlyBudget')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditServicesPrefered">Services Preferred</label>
                          <Input fullWidth size="Medium" className="EditServicesPrefered">
                            <input type="text" placeholder={this.state.LeadInformationServicesPrefered} id="EditServicesPrefered" name="EditServicesPrefered" onChange ={onLeadInformationChangeInput.bind(this, 'EditServicesPrefered')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditBestContact">Best Contact Method</label>
                          <Input fullWidth size="Medium" className="EditBestContact">
                            <input type="text" placeholder={this.state.LeadInformationBestContact} id="EditBestContact" name="EditBestContact" onChange ={onLeadInformationChangeInput.bind(this, 'EditBestContact')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditAwareOfTreatmentCosts">Aware of Treatment Cost?</label>
                          <Input fullWidth size="Medium" className="EditAwareOfTreatmentCosts">
                            <SelectStyled className="selectoption" fullWidth options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.LeadInformationAwareOfTreatmentCosts){
                                    case '0':
                                      LeadInformationAwareOfTreatmentCostsStatus = 'No'
                                        break;
                                    case '1':
                                      LeadInformationAwareOfTreatmentCostsStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={LeadInformationAwareOfTreatmentCostsStatus} value={this.state.LeadInformationAwareOfTreatmentCosts} id="EditAwareOfTreatmentCosts" name="EditAwareOfTreatmentCosts" onChange ={onLeadInformationChangeInput.bind(this, 'EditAwareOfTreatmentCosts')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditResourcePlan">Resource to Use for Treatment</label>
                          <Input fullWidth size="Medium" className="EditResourcePlan">
                            <input type="text" placeholder={this.state.LeadInformationResourcePlan} id="EditResourcePlan" name="EditResourcePlan" onChange ={onLeadInformationChangeInput.bind(this, 'EditResourcePlan')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateLeadInformation} fullWidth> UPDATE/SAVE {this.state.FirstName} LEAD INFORMATION</Button>
                        </Col>
                      </Row>
                    </AccordionItem> */}
                    {/* End Lead information */}


                    {/* PATIENT/CHILD PROFILE */}
                    {/* <AccordionItem uniqueKey={2} title="PATIENT/CHILD PROFILE">
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditPatientName">Full Name</label>
                          <Input fullWidth size="Medium" className="EditPatientName">
                            <input type="text" placeholder={this.state.PatientName} id="EditPatientName" name="EditPatientName" onChange ={onChangeParentChildProfileInput.bind(this, 'EditPatientName')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditPatientDOB">Date of Birth</label>
                          <Input fullWidth size="Medium" className="EditPatientDOB">
                              <DatePicker id="EditPatientDOB" name="EditPatientDOB" placeholder={this.state.PatientDOB} selected={this.state.PatientDOB} value={this.state.PatientDOB}  onChange={onChangeParentChildProfileInput.bind(this, 'EditPatientDOB')} />
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                        <label htmlFor="EditPatientAge">Age</label>
                          <Input fullWidth fullWidth className="EditPatientAge">
                            <SelectStyled className="selectoption" fullWidth options={AgeList} placeholder={this.state.PatientAge} value="" id="EditPatientAge" name="EditPatientAge" onChange ={onChangeParentChildProfileInput.bind(this, 'EditPatientAge')} />
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                        <label htmlFor="EditPatientGender">Gender</label>
                          <Input fullWidth size="Medium" className="EditPatientGender">
                            <SelectStyled className="selectoption" options={GenderList} placeholder={this.state.PatientGender} value="" id="EditPatientGender" name="EditPatientGender" onChange ={onChangeParentChildProfileInput.bind(this, 'EditPatientGender')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                        <label htmlFor="EditIsAdopted">Adopted</label>
                          <Input fullWidth size="Medium" className="EditIsAdopted">
                            <SelectStyled className="selectoption" fullWidth options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.PatientIsAdopted){
                                    case '0':
                                      PatientIsAdoptedStatus = 'No'
                                        break;
                                    case '1':
                                      PatientIsAdoptedStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={PatientIsAdoptedStatus}  value={this.state.PatientIsAdopted} id="EditIsAdopted" name="EditIsAdopted" onChange ={onChangeParentChildProfileInput.bind(this, 'EditIsAdopted')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditExpectToEnrollDate">Expect To Enroll Date</label>
                          <Input fullWidth size="Medium" className="EditExpectToEnrollDate">
                              <DatePicker id="EditExpectToEnrollDate" name="EditExpectToEnrollDate" placeholder={this.state.PatientExpectToEnrollDate} selected={this.state.PatientExpectToEnrollDate} value={this.state.PatientExpectToEnrollDate} onChange={onChangeParentChildProfileInput.bind(this, 'EditExpectToEnrollDate')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditBehaviors">Behaviors</label>
                          <Input fullWidth size="Medium" className="EditBehaviors">
                            <input type="text" placeholder={this.state.PatientBehaviors} id="EditBehaviors" name="EditBehaviors" onChange ={onChangeParentChildProfileInput.bind(this, 'EditBehaviors')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditEthinicity">Ethinicity</label>
                          <Input fullWidth size="Medium" className="EditEthinicity">
                            <input type="text" placeholder={this.state.PatientEthinicity} id="EditEthinicity" name="EditEthinicity" onChange ={onChangeParentChildProfileInput.bind(this, 'EditEthinicity')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditHeight">Height</label>
                          <Input fullWidth size="Medium" className="EditHeight">
                            <input type="text" placeholder={this.state.PatientHeight} id="EditHeight" name="EditHeight" onChange ={onChangeParentChildProfileInput.bind(this, 'EditHeight')}/>
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditWeight">Weight</label>
                          <Input fullWidth size="Medium" className="EditWeight">
                            <input type="text" placeholder={this.state.PatientWeight} id="EditWeight" name="EditWeight" onChange ={onChangeParentChildProfileInput.bind(this, 'EditWeight')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditEyeColor">Eye Color</label>
                          <Input fullWidth size="Medium" className="EditEyeColor">
                            <input type="text" placeholder={this.state.PatientEyeColor} id="EditEyeColor" name="EditEyeColor" onChange ={onChangeParentChildProfileInput.bind(this, 'EditEyeColor')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditHairColor">Hair Color</label>
                          <Input fullWidth size="Medium" className="EditHairColor">
                            <input type="text" placeholder={this.state.PatientHairColor} id="EditHairColor" name="EditHairColor" onChange ={onChangeParentChildProfileInput.bind(this, 'EditHairColor')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditShoeSize">Shoe Size</label>
                          <Input fullWidth size="Medium" className="EditShoeSize">
                            <input type="text" placeholder={this.state.PatientShoeSize} id="EditShoeSize" name="EditShoeSize" onChange ={onChangeParentChildProfileInput.bind(this, 'EditShoeSize')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditShirtSize">Shirt Size</label>
                          <Input fullWidth size="Medium" className="EditShirtSize">
                            <input type="text" placeholder={this.state.PatientShirtSize} id="EditShirtSize" name="EditShirtSize" onChange ={onChangeParentChildProfileInput.bind(this, 'EditShirtSize')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditWaistSize">Waist Size</label>
                          <Input fullWidth size="Medium" className="EditWaistSize">
                            <input type="text" placeholder={this.state.PatientWaistSize} id="EditWaistSize" name="EditWaistSize" onChange ={onChangeParentChildProfileInput.bind(this, 'EditWaistSize')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditReligion">Religious Pref</label>
                          <Input fullWidth size="Medium" className="EditReligion">
                            <input type="text" placeholder={this.state.PatientReligion} id="EditReligion" name="EditReligion" onChange ={onChangeParentChildProfileInput.bind(this, 'EditReligion')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditRiskTimeline">Timeline of at Risk Behaviors</label>
                          <Input fullWidth size="Medium" className="EditRiskTimeline">
                            <textarea type="text" placeholder={this.state.PatientRiskTimeline} id="EditRiskTimeline" name="EditRiskTimeline" onChange ={onChangeParentChildProfileInput.bind(this, 'EditRiskTimeline')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                        <label htmlFor="EditIsRunaway">Runaway?</label>
                          <Input fullWidth size="Medium" className="EditIsRunaway">
                            <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.PatientIsRunaway){
                                    case '0':
                                      PatientIsRunawayStatus = 'No'
                                        break;
                                    case '1':
                                      PatientIsRunawayStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={PatientIsRunawayStatus} value={this.state.PatientIsRunaway} id="EditIsRunaway" name="EditIsRunaway" onChange ={onChangeParentChildProfileInput.bind(this, 'EditIsRunaway')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditRunawayOutcome">Runaway Outcome</label>
                          <Input fullWidth size="Medium" className="EditRunawayOutcome">
                            <textarea type="text" placeholder={this.state.PatientRunawayOutcome} id="EditRunawayOutcome" name="EditRunawayOutcome" onChange ={onChangeParentChildProfileInput.bind(this, 'EditRunawayOutcome')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditHealthIssues">Health Issues</label>
                          <Input fullWidth size="Medium" className="EditHealthIssues">
                            <textarea type="text" placeholder={this.state.PatientHealthIssues} id="EditHealthIssues" name="EditHealthIssues" onChange ={onChangeParentChildProfileInput.bind(this, 'EditHealthIssues')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditAllergyHistory">Allergy History</label>
                          <Input fullWidth size="Medium" className="EditAllergyHistory">
                            <textarea type="text" placeholder={this.state.PatientAllergyHistory} id="EditAllergyHistory" name="EditAllergyHistory" onChange ={onChangeParentChildProfileInput.bind(this, 'EditAllergyHistory')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditIQ">IQ if under 85</label>
                          <Input fullWidth size="Medium" className="EditIQ">
                            <input type="text" placeholder={this.state.PatientIQ} id="EditIQ" name="EditIQ" onChange ={onChangeParentChildProfileInput.bind(this, 'EditIQ')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditPhysicalLimits">Physical Limitations</label>
                          <Input fullWidth size="Medium" className="EditPhysicalLimits">
                            <textarea type="text" placeholder={this.state.PatientPhysicalLimits} id="EditPhysicalLimits" name="EditPhysicalLimits" onChange ={onChangeParentChildProfileInput.bind(this, 'EditPhysicalLimits')}/>
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateChildProfile} fullWidth> <i className="fa fa-floppy-o" aria-hidden="true"></i>UPDATE/SAVE {this.state.FirstName} PATIENT/CHILD PROFILE</Button>
                        </Col>
                      </Row>
                    </AccordionItem> */}
                    {/* END PATIENT/CHILD PROFILE */}

                    {/* INSURANCE */}
                    <AccordionItem uniqueKey={3} title="INSURANCE">
                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditInsuranceProvider">Insurance Provider</label>
                            <Input fullWidth size="Medium" className="EditInsuranceProvider">
                              <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.InsuranceProvider){
                                    case '0':
                                      InsuranceProviderStatus = 'No'
                                        break;
                                    case '1':
                                      InsuranceProviderStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={InsuranceProviderStatus} value={this.state.InsuranceProvider} id="EditInsuranceProvider" name="EditInsuranceProvider" onChange ={onChangeLeadInsuranceInput.bind(this, 'EditInsuranceProvider')} />
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditInsuranceType">Insurance Type</label>
                            <Input fullWidth size="Medium" className="EditInsuranceType">
                              <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.InsuranceType){
                                    case '0':
                                      InsuranceTypeStatus = 'No'
                                        break;
                                    case '1':
                                      InsuranceTypeStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={InsuranceTypeStatus} value={this.state.InsuranceType} id="EditInsuranceType" name="EditInsuranceType" onChange ={onChangeLeadInsuranceInput.bind(this, 'EditInsuranceType')} />
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditInsurancePhone">Insurance Phone</label>
                            <Input fullWidth size="Medium" className="EditInsurancePhone">
                              <input type="text" placeholder={this.state.InsurancePhone} id="EditInsurancePhone" name="EditInsurancePhone" onChange ={onChangeLeadInsuranceInput.bind(this, 'EditInsurancePhone')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditInsuranceMemberID">Insurance Member ID</label>
                            <Input fullWidth size="Medium" className="EditInsuranceMemberID">
                              <input type="text" placeholder={this.state.InsuranceMemberID} id="EditInsuranceMemberID" name="EditInsuranceMemberID" onChange ={onChangeLeadInsuranceInput.bind(this, 'EditInsuranceMemberID')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditInsuranceGroupID">Insurance Group ID</label>
                            <Input fullWidth size="Medium" className="EditInsuranceGroupID">
                              <input type="text" placeholder={this.state.InsuranceGroupID} id="EditInsuranceGroupID" name="EditInsuranceGroupID" onChange ={onChangeLeadInsuranceInput.bind(this, 'EditInsuranceGroupID')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditInsurancePolicyID">Insurance Policy ID</label>
                            <Input fullWidth size="Medium" className="EditInsurancePolicyID">
                              <input type="text" placeholder={this.state.InsurancePolicyID} id="EditInsurancePolicyID" name="EditInsurancePolicyID" onChange ={onChangeLeadInsuranceInput.bind(this, 'EditInsurancePolicyID')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                              <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateLeadInsurance} fullWidth>  UPDATE/SAVE {this.state.FirstName} INSURANCE PROFILE</Button>
                          </Col>
                        </Row>
                    </AccordionItem>
                    {/* END INSURANCE */}

                    {/* SELF HARM HISTORY */}
                    <AccordionItem uniqueKey={4} title="SELF HARM HISTORY">
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditSuicidal">Currently Suicidal?</label>
                          <Input fullWidth size="Medium" className="EditSuicidal">
                            <input type="text" placeholder={this.state.SelfHarmHistorySuicidal} id="EditSuicidal" name="EditSuicidal" onChange ={onChangeSelfharmHistoryInput.bind(this, 'EditSuicidal')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditPastSuicidalDesc">Past Verbal Expressions of Suicide?</label>
                          <Input fullWidth size="Medium" className="EditPastSuicidalDesc">
                            <textarea type="text" placeholder={this.state.SelfHarmHistoryPastSuicidalDesc} id="EditPastSuicidalDesc" name="EditPastSuicidalDesc" onChange ={onChangeSelfharmHistoryInput.bind(this, 'EditPastSuicidalDesc')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditSelfHarmDesc">Physical Harm to Self, Such as Cutting, Eating disorder, etc.,?</label>
                          <Input fullWidth size="Medium" className="EditSelfHarmDesc">
                            <textarea type="text" placeholder={this.state.SelfHarmHistorySelfHarmDesc} id="EditSelfHarmDesc" name="EditSelfHarmDesc" onChange ={onChangeSelfharmHistoryInput.bind(this, 'EditSelfHarmDesc')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditSuicideAttemptDesc">Suicide Attempt(s)?</label>
                          <Input fullWidth size="Medium" className="EditSuicideAttemptDesc">
                            <textarea type="text" placeholder={this.state.SelfHarmHistorySuicideAttemptDesc} id="EditSuicideAttemptDesc" name="EditSuicideAttemptDesc" onChange ={onChangeSelfharmHistoryInput.bind(this, 'EditSuicideAttemptDesc')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditSuicideDocNotes">If Admitted to Hospital What did the Doctor(s) Report?</label>
                          <Input fullWidth size="Medium" className="EditSuicideDocNotes">
                            <textarea type="text" placeholder={this.state.SelfHarmHistorySuicideDocNotes} id="EditSuicideDocNotes" name="EditSuicideDocNotes" onChange ={onChangeSelfharmHistoryInput.bind(this, 'EditSuicideDocNotes')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateSelfHarmHistory} fullWidth>   UPDATE/SAVE {this.state.FirstName} SELF HARM HISTORY</Button>
                        </Col>
                      </Row>
                    </AccordionItem>
                    {/* END SELF HARM HISTORY */}

                    {/* Start Violence HISTORY */}
                    {/* <AccordionItem uniqueKey={5} title="VIOLENCE HISTORY">
                    <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditIsViolent">Violent?</label>
                          <Input fullWidth size="Medium" className="EditIsViolent">
                            <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.ViolenceHistoryIsViolent){
                                    case '0':
                                      IsViolentStatus = 'No'
                                        break;
                                    case '1':
                                      IsViolentStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={IsViolentStatus} value={this.state.ViolenceHistoryIsViolent} id="EditIsViolent" name="EditIsViolent" onChange ={onChangeViolenceHistoryOption.bind(this, 'EditIsViolent')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditHistoryViolence">History of Violence</label>
                          <Input fullWidth size="Medium" className="EditHistoryViolence">
                            <textarea type="text" placeholder={this.state.HistoryViolence} id="EditHistoryViolence" name="EditHistoryViolence" onChange ={onChangeViolenceHistoryOption.bind(this, 'EditHistoryViolence')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditArsonHistory">Arson History</label>
                          <Input fullWidth size="Medium" className="EditArsonHistory">
                            <textarea type="text" placeholder={this.state.ViolenceHistoryArsonHistory} id="EditArsonHistory" name="EditArsonHistory" onChange ={onChangeViolenceHistoryOption.bind(this, 'EditArsonHistory')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateViolenceHistory} fullWidth>   UPDATE/SAVE {this.state.FirstName} VIOLENCE HISTORY</Button>
                        </Col>
                      </Row>
                    </AccordionItem> */}
                    {/* End Violence HISTORY */}

                    {/* Legal History  */}
                    {/* <AccordionItem uniqueKey={6} title="LEGAL HISTORY">
                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditLegalDesc">Legal Issue History</label>
                            <Input fullWidth size="Medium" className="EditLegalDesc">
                              <textarea type="text" placeholder={this.state.LegalHistoryLegalDesc} id="EditLegalDesc" name="EditLegalDesc" onChange ={onChangeLegalHistoryOption.bind(this, 'EditLegalDesc')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditArrestedDesc">Arrest History</label>
                            <Input fullWidth size="Medium" className="EditArrestedDesc">
                              <textarea type="text" placeholder={this.state.LegalHistoryArrestedDesc} id="EditArrestedDesc" name="EditArrestedDesc" onChange ={onChangeLegalHistoryOption.bind(this, 'EditArrestedDesc')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditProbationDesc">Probation History</label>
                            <Input fullWidth size="Medium" className="EditProbationDesc">
                              <textarea type="text" placeholder={this.state.LegalHistoryProbationDesc} id="EditProbationDesc" name="EditProbationDesc" onChange ={onChangeLegalHistoryOption.bind(this, 'EditProbationDesc')} />
                            </Input>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditIsCourtOrdered">Court Order?</label>
                            <Input fullWidth size="Medium" className="EditIsCourtOrdered">
                              <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.LegalHistoryIsCourtOrdered){
                                    case '0':
                                      IsCourtOrderedStatus = 'No'
                                        break;
                                    case '1':
                                      IsCourtOrderedStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })}  placeholder={IsCourtOrderedStatus} value={this.state.LegalHistoryIsCourtOrdered} id="EditIsCourtOrdered" name="EditIsCourtOrdered" onChange ={onChangeLegalHistoryOption.bind(this, 'EditIsCourtOrdered')} />
                            </Input>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditNextCourtDate">Next Court Date</label>
                            <Input fullWidth size="Medium" className="EditNextCourtDate">
                                <DatePicker id="EditNextCourtDate" name="EditNextCourtDate" selected={this.state.LegalHistoryNextCourtDate} value={this.state.LegalHistoryNextCourtDate} onChange={onChangeLegalHistoryOption.bind(this, 'EditNextCourtDate')} />
                            </Input>
                          </Col>
                      </Row>

                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditCourtOrderDesc">Court Order History</label>
                            <Input fullWidth size="Medium" className="EditCourtOrderDesc">
                              <textarea type="text" placeholder={this.state.LegalHistoryCourtOrderDesc} id="EditCourtOrderDesc" name="EditCourtOrderDesc" onChange ={onChangeLegalHistoryOption.bind(this, 'EditCourtOrderDesc')} />
                            </Input>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                              <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateLegalHistory} fullWidth> UPDATE/SAVE {this.state.FirstName} LEGAL HISTORY</Button>
                          </Col>
                        </Row>
                    </AccordionItem> */}

                    {/* THERAPY HISTORY  */}
                    <AccordionItem uniqueKey={7} title="THERAPY HISTORY">
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditTherapyDesc">Therapy History</label>
                            <Input fullWidth size="Medium" className="EditTherapyDesc">
                              <textarea type="text" placeholder={this.state.TherapyHistoryTherapyDesc} id="EditTherapyDesc" name="EditTherapyDesc" onChange ={onChangeTherapyHistoryOption.bind(this, 'EditTherapyDesc')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditMedDesc">Medications</label>
                            <Input fullWidth size="Medium" className="EditMedDesc">
                              <textarea type="text" placeholder={this.state.TherapyHistoryMedDesc} id="EditMedDesc" name="EditMedDesc" onChange ={onChangeTherapyHistoryOption.bind(this, 'EditMedDesc')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditMentalIllnessDesc">Mental Illness History</label>
                            <Input fullWidth size="Medium" className="EditMentalIllnessDesc">
                              <textarea type="text" placeholder={this.state.TherapyHistoryMentalIllnessDesc} id="EditMentalIllnessDesc" name="EditMentalIllnessDesc" onChange ={onChangeTherapyHistoryOption.bind(this, 'EditMentalIllnessDesc')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                              <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateTherapyHistory} fullWidth> UPDATE/SAVE {this.state.FirstName} LEGAL HISTORY</Button>
                          </Col>
                        </Row>
                    </AccordionItem>
                    {/* End THERAPY HISTORY  */}

                    {/* School HISTORY  */}
                    <AccordionItem uniqueKey={8} title="SCHOOL HISTORY">
                      
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditSchoolGrade">School Grade</label>
                          <Input fullWidth size="Medium" className="EditSchoolGrade">
                            <textarea type="text" placeholder={this.state.SchoolHistorySchoolGrade} id="EditSchoolGrade" name="EditSchoolGrade" onChange ={onChangeSchoolHistoryOption.bind(this, 'EditSchoolGrade')} />
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditChildReadingLevel">Reading Level</label>
                          <Input fullWidth size="Medium" className="EditChildReadingLevel">
                            <SelectStyled className="selectoption" options={ReadingLevelList} placeholder={this.state.SchoolHistoryChildReadingLevel} value="" id="EditChildReadingLevel" name="EditChildReadingLevel" onChange ={onChangeSchoolHistoryOption.bind(this, 'EditChildReadingLevel')} />
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditSchoolHelp">Additional Help Required in School</label>
                            <Input fullWidth size="Medium" className="EditSchoolHelp">
                              <textarea type="text" placeholder={this.state.SchoolHistorySchoolHelp} id="EditSchoolHelp" name="EditSchoolHelp" onChange ={onChangeSchoolHistoryOption.bind(this, 'EditSchoolHelp')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditIEPOr504">IEP or 504?</label>
                            <Input fullWidth size="Medium" className="EditIEPOr504">
                              <textarea type="text" placeholder={this.state.SchoolHistoryIEPOr504} id="EditIEPOr504" name="EditIEPOr504" onChange ={onChangeSchoolHistoryOption.bind(this, 'EditIEPOr504')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditAreasRequiringHelp">Areas Requiring Help</label>
                            <Input fullWidth size="Medium" className="EditAreasRequiringHelp">
                              <textarea type="text" placeholder={this.state.SchoolHistoryAreasRequiringHelp} id="EditAreasRequiringHelp" name="EditAreasRequiringHelp" onChange ={onChangeSchoolHistoryOption.bind(this, 'EditAreasRequiringHelp')} />
                            </Input>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditSchoolOnTrack">On Track or Behind in School</label>
                            <Input fullWidth size="Medium" className="EditSchoolOnTrack">
                              <textarea type="text" placeholder={this.state.SchoolHistorySchoolOnTrack} id="EditSchoolOnTrack" name="EditSchoolOnTrack" onChange ={onChangeSchoolHistoryOption.bind(this, 'EditSchoolOnTrack')} />
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditExpelHistory">Expelled from Schools or Facilities?</label>
                            <Input fullWidth size="Medium" className="EditExpelHistory">
                              <textarea type="text" placeholder={this.state.SchoolHistoryExpelHistory} id="EditExpelHistory" name="EditExpelHistory" onChange ={onChangeSchoolHistoryOption.bind(this, 'EditExpelHistory')} />
                            </Input>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                              <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateSchoolHistory} fullWidth>UPDATE/SAVE {this.state.FirstName} SCHOOL HISTORY</Button>
                          </Col>
                        </Row>
                    </AccordionItem>
                  {/* End School HISTORY  */}

                    {/* DRUG HISTORY  */}
                    <AccordionItem uniqueKey={9} title="DRUG HISTORY">
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditAlcoholOrMarijuana">Alcohol or Marijuana Use?</label>
                            <Input fullWidth size="Medium" className="EditAlcoholOrMarijuana">
                              <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.DrugHistoryAlcoholOrMarijuana){
                                    case '0':
                                      AlcoholOrMarijuanaStatus = 'No'
                                        break;
                                    case '1':
                                      AlcoholOrMarijuanaStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })} placeholder={AlcoholOrMarijuanaStatus} value={this.state.DrugHistoryAlcoholOrMarijuana} id="EditAlcoholOrMarijuana" name="EditAlcoholOrMarijuana" onChange ={onChangeDrugHistoryOption.bind(this, 'EditAlcoholOrMarijuana')} />
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditExperimentOrAbuse">Experimentation or Abuse?</label>
                            <Input fullWidth size="Medium" className="EditExperimentOrAbuse">
                              <textarea type="text" placeholder={this.state.DrugHistoryExperimentOrAbuse}  id="EditExperimentOrAbuse" name="EditExperimentOrAbuse" onChange ={onChangeDrugHistoryOption.bind(this, 'EditExperimentOrAbuse')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditDrugHistory">Drug History</label>
                            <Input fullWidth size="Medium" className="EditDrugHistory">
                              <textarea type="text" placeholder={this.state.DrugHistoryDrugHistory} id="EditDrugHistory" name="EditDrugHistory" onChange ={onChangeDrugHistoryOption.bind(this, 'EditDrugHistory')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                              <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateDrugHistory} fullWidth>UPDATE/SAVE {this.state.FirstName} DRUG HISTORY</Button>
                          </Col>
                        </Row>
                    </AccordionItem>
                    {/* END DRUG HISTORY  */}
                    
                    <AccordionItem uniqueKey={10} title="SEXUAL HISTORY">
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditIsSexuallyActive">Sexually Active?</label>
                          <Input fullWidth size="Medium" className="EditIsSexuallyActive">
                            <SelectStyled className="selectoption" options={leadYesNo} placeholder="" value="" id="EditIsSexuallyActive" name="EditIsSexuallyActive" onChange ={onChangeOption.bind(this, 'EditIsSexuallyActive')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditRelHistory">Sexual Relationship History</label>
                          <Input fullWidth size="Medium" className="EditRelHistory">
                            <textarea type="text" placeholder="" id="EditRelHistory" name="EditRelHistory" onChange ={onChangeInput.bind(this, 'EditRelHistory')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditDevianceHistory">Sexual Deviance History</label>
                          <Input fullWidth size="Medium" className="EditDevianceHistory">
                            <textarea type="text" placeholder="" id="EditDevianceHistory" name="EditDevianceHistory" onChange ={onChangeInput.bind(this, 'EditDevianceHistory')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditInternetHistory">Sexual Internet History</label>
                          <Input fullWidth size="Medium" className="EditInternetHistory">
                            <textarea type="text" placeholder="" id="EditInternetHistory" name="EditInternetHistory" onChange ={onChangeInput.bind(this, 'EditInternetHistory')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateSexualHistory} fullWidth> UPDATE/SAVE {this.state.FirstName} SEXUAL HISTORY</Button>
                        </Col>
                      </Row>
                    </AccordionItem>


                    <AccordionItem uniqueKey={13} title="EMERGENCY CONTACT">
                    <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditECName">Name</label>
                          <Input fullWidth size="Medium" className="EditECName">
                            <input type="text" placeholder="" id="EditECName" name="EditECName" onChange ={onChangeInput.bind(this, 'EditECName')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditECRelationship">Relationship</label>
                          <Input fullWidth size="Medium" className="EditECRelationship">
                            <input type="text" placeholder="" id="EditECRelationship" name="EditECRelationship" onChange ={onChangeInput.bind(this, 'EditECRelationship')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditECPhone">Phone</label>
                          <Input fullWidth size="Medium" className="EditECPhone">
                            <input type="text" placeholder="" id="EditECPhone" name="EditECPhone" onChange ={onChangeInput.bind(this, 'EditECPhone')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2"></Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditECAddress">Address</label>
                          <Input fullWidth size="Medium" className="EditECAddress">
                            <input type="text" placeholder="" id="EditECAddress" name="EditECAddress" onChange ={onChangeInput.bind(this, 'EditECAddress')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                          <label htmlFor="EditShippingCity">City</label>
                          <Input fullWidth size="Medium" className="EditShippingCity">
                            <input type="text" placeholder="" id="EditShippingCity" name="EditShippingCity" onChange ={onChangeInput.bind(this, 'EditShippingCity')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                          <label htmlFor="EditShippingCity">State</label>
                          <Input fullWidth size="Medium" className="EditShippingCity">
                            <input type="text" className="mx-2" placeholder="" id="EditShippingState" name="EditShippingState" onChange ={onChangeInput.bind(this, 'EditShippingState')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                          <label htmlFor="EditShippingCity">Zip</label>
                          <Input fullWidth size="Medium" className="EditShippingCity">
                            <input type="text" placeholder="" id="EditShippingZip" name="EditShippingZip" onChange ={onChangeInput.bind(this, 'EditShippingZip')}/>
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateEmergencyContact} fullWidth>UPDATE/SAVE {this.state.FirstName} EMERGENCY CONTACT</Button>
                        </Col>
                      </Row>
                    </AccordionItem>


                    <AccordionItem uniqueKey={14} title="PARENT/GUARDIAN/SPONSOR INFO">
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardRelationship">Relationship</label>
                            <Input fullWidth size="Medium" className="EditGuardRelationship">
                              <input type="text" placeholder="" id="EditGuardRelationship" name="EditGuardRelationship" onChange ={onChangeInput.bind(this, 'EditGuardRelationship')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardName">Name</label>
                            <Input fullWidth size="Medium" className="EditGuardName">
                              <input type="text" placeholder="" id="EditGuardName" name="EditGuardName" onChange ={onChangeInput.bind(this, 'EditGuardName')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditGuardAddress">Address</label>
                            <Input fullWidth size="Medium" className="EditGuardAddress">
                              <input type="text" placeholder="" id="EditGuardAddress" name="EditGuardAddress" onChange ={onChangeInput.bind(this, 'EditGuardAddress')}/>
                            </Input>
                          </Col>
                        </Row>
                      
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                            <label htmlFor="EditGuardCity">City</label>
                            <Input fullWidth size="Medium" className="EditGuardCity">
                              <input type="text" placeholder="" id="EditGuardCity" name="EditGuardCity" onChange ={onChangeInput.bind(this, 'EditGuardCity')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                            <label htmlFor="EditGuardState">State</label>
                            <Input fullWidth size="Medium" className="EditGuardState">
                              <input type="text" className="mx-2" placeholder="" id="EditGuardState" name="EditGuardState" onChange ={onChangeInput.bind(this, 'EditGuardState')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                            <label htmlFor="EditGuardZip">Zip</label>
                            <Input fullWidth size="Medium" className="EditGuardZip">
                              <input type="text" placeholder="" id="EditGuardZip" name="EditGuardZip" onChange ={onChangeInput.bind(this, 'EditGuardZip')}/>
                            </Input>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardHomePhone">Home Phone</label>
                            <Input fullWidth size="Medium" className="EditGuardHomePhone">
                              <input type="text" placeholder="" id="EditGuardHomePhone" name="EditGuardHomePhone" onChange ={onChangeInput.bind(this, 'EditGuardHomePhone')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardMobilePhone">Mobile Phone</label>
                            <Input fullWidth size="Medium" className="EditGuardMobilePhone">
                              <input type="text" placeholder="" id="EditGuardMobilePhone" name="EditGuardMobilePhone" onChange ={onChangeInput.bind(this, 'EditGuardMobilePhone')}/>
                            </Input>
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardEmail">Email</label>
                            <Input fullWidth size="Medium" className="EditGuardEmail">
                              <input type="text" placeholder="" id="EditGuardEmail" name="EditGuardEmail" onChange ={onChangeInput.bind(this, 'EditGuardEmail')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardFax">Fax</label>
                            <Input fullWidth size="Medium" className="EditGuardFax">
                              <input type="text" placeholder="" id="EditGuardFax" name="EditGuardFax" onChange ={onChangeInput.bind(this, 'EditGuardFax')}/>
                            </Input>
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardMethod">Preferred Contact Method</label>
                            <Input fullWidth size="Medium" className="EditGuardMethod">
                              <input type="text" placeholder="" id="EditGuardMethod" name="EditGuardMethod" onChange ={onChangeInput.bind(this, 'EditGuardMethod')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardSponsor">Sponsor</label>
                            <Input fullWidth size="Medium" className="EditGuardSponsor">
                            <SelectStyled className="selectoption" options={InitialDispositionList} placeholder="" value="" id="EditGuardSponsor" name="EditGuardSponsor" onChange ={onChangeOption.bind(this, 'EditGuardSponsor')} />
                          </Input> 
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardLegalCust">Legal Cust.</label>
                            <Input fullWidth size="Medium" className="EditGuardLegalCust">
                            <SelectStyled className="selectoption" options={InitialDispositionList} placeholder="" value="" id="EditGuardLegalCust" name="EditGuardLegalCust" onChange ={onChangeOption.bind(this, 'EditGuardLegalCust')} />
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardPhysCust">Physical Cust.</label>
                            <Input fullWidth size="Medium" className="EditGuardPhysCust">
                            <SelectStyled className="selectoption" options={InitialDispositionList} placeholder="" value="" id="EditGuardPhysCust" name="EditGuardPhysCust" onChange ={onChangeOption.bind(this, 'EditGuardPhysCust')} />
                          </Input> 
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardEC">Emergency Contact</label>
                            <Input fullWidth size="Medium" className="EditGuardEC">
                            <SelectStyled className="selectoption" options={InitialDispositionList} placeholder="" value="" id="EditGuardEC" name="EditGuardEC" onChange ={onChangeOption.bind(this, 'EditGuardEC')} />
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardPG">Parent Guardian</label>
                            <Input fullWidth size="Medium" className="EditGuardPG">
                            <SelectStyled className="selectoption" options={InitialDispositionList} placeholder="" value="" id="EditGuardPG" name="EditGuardPG" onChange ={onChangeOption.bind(this, 'EditGuardPG')} />
                          </Input> 
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardDOB">DOB</label>
                            <Input fullWidth size="Medium" className="EditGuardDOB">
                            <DatePicker id="EditGuardDOB" name="EditGuardDOB" selected="" value="" onChange={onChangeDate.bind(this, 'EditGuardDOB')} />
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardSSN">SSN</label>
                            <Input fullWidth size="Medium" className="EditGuardSSN">
                            <SelectStyled className="selectoption" options={InitialDispositionList} placeholder="" value="" id="EditGuardSSN" name="EditGuardSSN" onChange ={onChangeOption.bind(this, 'EditGuardSSN')} />
                          </Input> 
                          </Col>
                      </Row>
                      
                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardJobTitle">Job Title</label>
                            <Input fullWidth size="Medium" className="EditGuardJobTitle">
                              <input type="text" placeholder="" id="EditGuardJobTitle" name="EditGuardJobTitle" onChange ={onChangeInput.bind(this, 'EditGuardJobTitle')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardEmployer">Employer</label>
                            <Input fullWidth size="Medium" className="EditGuardEmployer">
                              <input type="text" placeholder="" id="EditGuardEmployer" name="EditGuardEmployer" onChange ={onChangeInput.bind(this, 'EditGuardEmployer')}/>
                            </Input>
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardWorkPhone">Work Phone</label>
                            <Input fullWidth size="Medium" className="EditGuardWorkPhone">
                              <input type="text" placeholder="" id="EditGuardWorkPhone" name="EditGuardWorkPhone" onChange ={onChangeInput.bind(this, 'EditGuardWorkPhone')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardWorkEmail">Work Email</label>
                            <Input fullWidth size="Medium" className="EditGuardWorkEmail">
                              <input type="text" placeholder="" id="EditGuardWorkEmail" name="EditGuardWorkEmail" onChange ={onChangeInput.bind(this, 'EditGuardWorkEmail')}/>
                            </Input>
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardWorkFax">Work Fax</label>
                            <Input fullWidth size="Medium" className="EditGuardWorkFax">
                              <input type="text" placeholder="" id="EditGuardWorkFax" name="EditGuardWorkFax" onChange ={onChangeInput.bind(this, 'EditGuardWorkFax')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2"></Col>
                      </Row>
                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12}} className="mb-2">
                            <label htmlFor="EditGuardReligion">Religious Pref</label>
                            <Input fullWidth size="Medium" className="EditGuardReligion">
                              <input type="text" placeholder="" id="EditGuardReligion" name="EditGuardReligion" onChange ={onChangeInput.bind(this, 'EditGuardReligion')}/>
                            </Input>
                          </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditGuardRelDesc">Relationship Description</label>
                          <Input fullWidth size="Medium" className="EditGuardRelDesc">
                            <textarea type="text" placeholder="" id="EditGuardRelDesc" name="EditGuardRelDesc" onChange ={onChangeInput.bind(this, 'EditGuardRelDesc')}/>
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateParentGuardianSponsorInfo} fullWidth>UPDATE/SAVE {this.state.FirstName} PARENT/GUARDIAN/SPONSOR INFO</Button>
                        </Col>
                      </Row>
                    </AccordionItem>

                    <AccordionItem uniqueKey={15} title="REFERRAL INFO">
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditInitialDisposition">Source</label>
                          <Input fullWidth size="Medium" className="EditInitialDisposition">
                            <SelectStyled className="selectoption" options={InitialDispositionList} placeholder="" value="" id="EditInitialDisposition" name="EditInitialDisposition" onChange ={onChangeOption.bind(this, 'EditInitialDisposition')} />
                          </Input> 
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditHowHear">How did they hear about us?</label>
                          <Input fullWidth size="Medium" className="EditHowHear">
                            <textarea type="text" placeholder="" id="EditHowHear" name="EditHowHear" onChange ={onChangeInput.bind(this, 'EditHowHear')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditRefSource">Referral Source</label>
                          <Input fullWidth size="Medium" className="EditRefSource">
                            <textarea type="text" placeholder="" id="EditRefSource" name="EditRefSource" onChange ={onChangeInput.bind(this, 'EditRefSource')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditRefReason">Reason for Referral</label>
                          <Input fullWidth size="Medium" className="EditRefReason">
                            <textarea type="text" placeholder="" id="EditRefReason" name="EditRefReason" onChange ={onChangeInput.bind(this, 'EditRefReason')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditIsEmergency">Emergency?</label>
                          <Input fullWidth size="Medium" className="EditIsEmergency">
                            <SelectStyled className="selectoption" options={leadYesNo} placeholder="" value="" id="EditIsEmergency" name="EditIsEmergency" onChange ={onChangeOption.bind(this, 'EditIsEmergency')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateReferralInfo} fullWidth>  UPDATE/SAVE {this.state.FirstName} REFERRAL INFO</Button>
                        </Col>
                      </Row>
                    </AccordionItem>

                    <AccordionItem uniqueKey={16} title="VERIFICATION OF BENEFITS UPLOAD">
                    <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditPreAppFilePath">Verification of Benefits File</label>
                          <Input fullWidth size="Medium" className="EditPreAppFilePath">
                            <input type="text" placeholder="" id="EditPreAppFilePath" name="EditPreAppFilePath" onChange ={onChangeInput.bind(this, 'EditPreAppFilePath')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateVerificationBenefits} fullWidth> SAVE Racheal {this.state.FirstName}'S LEAD PROFILE</Button>
                        </Col>
                      </Row>
                    </AccordionItem>



                  </Accordion>
                </Col>
                <Col className="mb-3" breakPoint={{ xs: 12, md: 6 }}>
                  <Button status="Warning" type="button" shape="SemiRound" fullWidth className="text-uppercase">SAVE {this.state.FirstName.toUpperCase()} {this.state.LastName.toUpperCase()}'S LEAD PROFILE</Button>
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Card>


        <Container>
          <Row className="justify-content-center align-items-left mb-5">
            <Col breakPoint={{ xs: 12 }}>
              <h2 className="text-left mb-5">TO DO ITEMS</h2>
            </Col>
            <Col breakPoint={{ xs: 12 }}>
              <Row className="mb-2">
                <Col breakPoint={{ xs: 12 }}>
                  <label htmlFor="NewLeadNotes">Add a new to-do item for {stringFirstCharCapitalized(this.state.FirstName.toLowerCase())} {stringFirstCharCapitalized(this.state.LastName.toLowerCase())}</label>
                </Col>
                <Col breakPoint={{ xs: 12 }} className="mb-2">
                  <Input fullWidth size="Medium" className="Name">
                    <input type="text" placeholder='' id="NewLeadNotes" name="NewLeadNotes" onChange ={onChangeInput.bind(this, 'NewLeadNotes')}/>
                  </Input>
                </Col>
                <Col breakPoint={{ xs: 12, md: 3 }}>
                  <Button status="Warning" type="button" shape="SemiRound" fullWidth className="text-uppercase">+ ADD NOTE</Button>
                </Col>
              </Row>
              <Row className="justify-content-left align-items-left mb-5">
                <Col className="col-lg-12">
                  <h4>Lead Notes List</h4>
                </Col>
                <Col className="col-lg-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ENTERED BY</th>
                        <th scope="col">DATE</th>
                        <th scope="col">NOTE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr> 
                        <td scope="col"></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="ToDoReminderDate">Reminder Date:</label>
                  <Input fullWidth size="Medium" className="notes">
                    <DatePicker id="ToDoReminderDate" name="ToDoReminderDate" selected={this.state.ToDoReminderDate} value={this.state.ToDoReminderDate} onChange={onChangeDate.bind(this, 'ToDoReminderDate')} />
                  </Input>
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="ToDoUser">User:</label>
                  <SelectStyled options={leadAdmins} placeholder={this.state.ToDoUser} value={this.state.ToDoUser} id="ToDoUser" name="ToDoUser" onChange ={onChangeOption.bind(this, 'ToDoUser')} />
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="submitButtons">&nbsp;</label>
                  <Button id="submitButtons" status="Warning" type="button" shape="SemiRound" fullWidth className="submitButtons text-uppercase">UPDATE/SAVE TO DO'S</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>);
  }
}
