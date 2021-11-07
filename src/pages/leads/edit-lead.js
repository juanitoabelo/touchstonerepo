import React, { Component, useRef } from 'react';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import Select from '@paljs/ui/Select';
import styled from 'styled-components';
import { Button } from '@paljs/ui/Button';
import { ButtonLink } from '@paljs/ui/Button';
import { navigate, Link } from 'gatsby';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import { Container } from '@material-ui/core';
import { Card, CardBody } from '@paljs/ui/Card';
import { Accordion, AccordionItem, AccordionRefObject } from '@paljs/ui/Accordion';
import Alert from '@paljs/ui/Alert';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import SEO from '../../components/SEO';
import axios from 'axios';
import { isLoggedIn, getUser } from '../../components/services/auth';
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

// console.log('User Id: '+getUser().userid);

// const LeadInformationAwareOfTreatmentCostsStatus = '';

 let LeadInformationAwareOfTreatmentCostsStatus = 'Select Option';
 let PatientIsAdoptedStatus = '';
 let PatientIsRunawayStatus = '';
 let InsuranceProviderStatus = '';
 let InsuranceTypeStatus = '';
 let IsViolentStatus = '';
 let IsCourtOrderedStatus = '';
 let AlcoholOrMarijuanaStatus = '';
 let SexuallyActiveStatus = '';

 let GuardPGStatus = '';
 let GuardPhysCustStatus = '';
 let GuardLegalCustStatus = '';
 let GuardSponsorStatus = '';
 let GuardECStatus = '';
 let IsEmergencyStatus = '';
 let InitialDispositionStatus = '';

 let SubstanceAbuseStatus = '';
 let MentalHealthStatus = '';
 let DualDiagnosisStatus = '';

 let CurrentInitialRep = '';
 let CurrentAssignedAdvocate = '';
 let CurrentDisposition = '';

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

    // Update Success States
    UpdateMainLeadFormSuccessState: false,
    UpdateLeadNotesFormSuccessState: false,
    UpdateLeadInformationFormSuccessState: false,
    UpdateParentChildProfileFormSuccessState: false,
    UpdateInsuranceFormSuccessState: false,
    UpdateSelfHarmHistoryFormSuccessState: false,
    UpdateViolenceHistoryFormSuccessState: false,
    UpdateLegalHistoryFormSuccessState: false,
    UpdateTheraphyHistoryFormSuccessState: false,
    UpdateSchoolHistoryFormSuccessState: false,
    UpdateDrugHistoryFormSuccessState: false,
    UpdateSexualHistoryFormSuccessState: false,
    UpdateEmergencyContactFormSuccessState: false,
    UpdateparentGuardianSponsorInfoFormSuccessState: false,
    UpdateReferralFormSuccessState: false,
    UpdateVerificationOfBenifitsFormSuccessState: false,  
    isSaved : false,


    // User List
    UserAdminList: [],
    
    UserTodoList: [],
    ToDoText: '', 
    ToDoReminderDate: '',
    ToDoUser: '',


    IPAddress: '',
    CampaignID:'',
    CreatedDate:'',
    TermsApprovedDate: '',
    CampaignName: '',

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
    // PatientDOB: new Date(),
    PatientDOB: '',
    PatientAge: '',
    PatientGender: '',
    PatientIsAdopted: '',
    // PatientExpectToEnrollDate: new Date(),
    PatientExpectToEnrollDate: '',
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
    //LegalHistoryNextCourtDate: new Date(),
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
    // GuardDOB: new Date(),
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

    // New Lead Notes
    NewLeadNoteText : '',
    LeadNoteData: [],

    LeadID: 0,
    

    LeadName: 'Sample: RACHEAL MILLER',
    
    
  };

  // saveState = (data) => {
  //   this.setState(data);
  // }
  
  componentWillUnmount(){
    const { saveState, state } = this;

    this.setState({

      // Update Success States
    UpdateMainLeadFormSuccessState: false,
    UpdateLeadNotesFormSuccessState: false,
    UpdateLeadInformationFormSuccessState: false,
    UpdateParentChildProfileFormSuccessState: false,
    UpdateInsuranceFormSuccessState: false,
    UpdateSelfHarmHistoryFormSuccessState: false,
    UpdateViolenceHistoryFormSuccessState: false,
    UpdateLegalHistoryFormSuccessState: false,
    UpdateTheraphyHistoryFormSuccessState: false,
    UpdateSchoolHistoryFormSuccessState: false,
    UpdateDrugHistoryFormSuccessState: false,
    UpdateSexualHistoryFormSuccessState: false,
    UpdateEmergencyContactFormSuccessState: false,
    UpdateparentGuardianSponsorInfoFormSuccessState: false,
    UpdateReferralFormSuccessState: false,
    UpdateVerificationOfBenifitsFormSuccessState: false,  
    isSaved : false,

      // User List
      UserAdminList: [],
      
      UserTodoList: [],
      ToDoText: '', 
      ToDoReminderDate: '',
      ToDoUser: '',

      IPAddress: '',
      IPAddress: '',
      CampaignID:'',
      CreatedDate:'',
      TermsApprovedDate: '',
      CampaignName: '',

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
      // PatientDOB: new Date(),
      PatientDOB: '',
      PatientAge: '',
      PatientGender: '',
      PatientIsAdopted: '',
      //PatientExpectToEnrollDate: new Date(),
      PatientExpectToEnrollDate: '',
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
      // LegalHistoryNextCourtDate: new Date(),
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
      // GuardDOB: new Date(),
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

      // New Lead Notes
      NewLeadNoteText : '',
      LeadNoteData: [],

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

    
    /** Update DashBoard User To Do Item As Read**/
    const ToDoID = getURLParams('ToDoID');
    if(ToDoID != ""){
      axios({
        method: 'get',
        url: process.env.REACT_APP_API_DATABASE_URL,
        params: {
          tblName: 'tblToDo',
          queryType: 'updateNewTodoItemDashBoardAsRead',
          ToDoID: ToDoID
        }
      })
      .then(function (response) {
        // console.log(response,`successfully Updated To Do Item List as Read`);
      })
      .catch(function (error) {
        console.log(error,`error`);
      });
    }


    /** Get All Company Details **/
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblUsers',
        queryType: 'getUserAdminList'
      }
    })
    .then(function (response) {
      saveState({
        UserAdminList: response.data
      });
       
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });


    /** Get All Main Leads Details **/
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {  
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadById',
        LeadID: LeadID,
      }
    })
    .then(function (response) {
      //  console.log('Single Lead Data: '+ JSON.stringify(response.data));
      saveState({
        AlcoholOrMarijuana: response.data.AlcoholOrMarijuana,
        IsSexuallyActive: response.data.IsSexuallyActive,
        IsViolent: response.data.IsViolent,
        // IsCourtOrdered: response.data.IsCourtOrdered,
        IPAddress: response.data.IPAddress,

        CreatedDate: response.data.CreatedDate,
        CampaignName: response.data.CampaignName,
        TermsApprovedDate: response.data.TermsApprovedDate,
        
        // Main Lead Form data
        Status: response.data.Status,
        Disposition: response.data.Disposition, 
        // CrisisScale: response.data.CrisisScale,
        InitialRep: response.data.InitialRep,
        AssignedAdvocate: response.data.AssignedAdvocate,
        FirstName: response.data.FirstName,
        LastName: response.data.LastName,
        Email: response.data.Email,
        HomePhone: response.data.HomePhone,
        SubstanceAbuse: response.data.SubstanceAbuse,
        MentalHealth: response.data.MentalHealth,
        DualDiagnosis: response.data.DualDiagnosis,
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
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadInfoData',
        LeadID: LeadID
      }
    })
    .then(function (response) {
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
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadParentChildProfile',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      saveState({
          PatientName: response.data.PatientName,
          PatientDOB: response.data.PatientDOB != '' ? new Date(response.data.PatientDOB) : '',
          PatientAge: response.data.PatientAge,
          PatientGender: response.data.PatientGender,
          PatientIsAdopted: response.data.IsAdopted,
          PatientExpectToEnrollDate: response.data.ExpectToEnrollDate != '0000-00-00 00:00:00' ? new Date(response.data.ExpectToEnrollDate) : '',
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
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadInsuranceFormData',
        LeadID: LeadID
      }
    })
    .then(function (response) {
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
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadSelfHarmHistoryFormData',
        LeadID: LeadID
      }
    })
    .then(function (response) {
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
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadViolenceHistoryFormData',
        LeadID: LeadID
      }
    })
    .then(function (response) {
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
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadLegalHistoryFormData',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      saveState({
        LegalHistoryLegalDesc: response.data.LegalDesc,
        LegalHistoryArrestedDesc: response.data.ArrestedDesc,
        LegalHistoryProbationDesc: response.data.ProbationDesc,
        LegalHistoryIsCourtOrdered: response.data.IsCourtOrdered,
        // LegalHistoryNextCourtDate: new Date(response.data.NextCourtDate),
        LegalHistoryNextCourtDate: response.data.NextCourtDate !='' ? new Date(response.data.NextCourtDate) : '',
        LegalHistoryCourtOrderDesc: response.data.CourtOrderDesc,
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /* Get Lead therapy History Form data for default Field display */
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadTherapyHistory',
        LeadID: LeadID
      }
    })
    .then(function (response) {
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
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadSchoolHistory',
        LeadID: LeadID
      }
    })
    .then(function (response) {
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
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadDrugHistory',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      saveState({
        DrugHistoryAlcoholOrMarijuana: response.data.AlcoholOrMarijuana,
        DrugHistoryExperimentOrAbuse: response.data.ExperimentOrAbuse,
        DrugHistoryDrugHistory: response.data.DrugHistory
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

    /* Get Lead Sexual History Form data for default Field display */
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadSexualHistory',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      //console.log('Single Lead Sexual History Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        SexualHistoryIsSexuallyActive: response.data.IsSexuallyActive,
        SexualHistoryRelHistory: response.data.RelHistory,
        SexualHistoryDevianceHistory: response.data.DevianceHistory,
        SexualHistoryInternetHistory: response.data.InternetHistory
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /* Get Lead Sexual History Form data for default Field display */
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadEmergencyContact',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      //console.log('Single Lead Emergency Contact Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        EmergencyContactECName: response.data.ECName,
        EmergencyContactECRelationship: response.data.ECRelationship,
        EmergencyContactECPhone: response.data.ECPhone,
        EmergencyContactECAddress: response.data.ECAddress,
        EmergencyContactECCity: response.data.ECCity,
        EmergencyContactECState: response.data.ECState,
        EmergencyContactECZip: response.data.ECZip
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /* Get Lead Parent Guardian Sponsor Info Form data for default Field display */
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadParentGuardianSponsorInfo',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      //console.log('Single Lead Parent Guardian Sponsor Info Data: '+  JSON.stringify(response.data.GuardDOB));
      // if(JSON.stringify(response.data.GuardDOB) != new Date('0000-00-00 00:00:00')) {
      //   console.log('Empty Date');
      // } else {
      //   console.log('Not Empty Date');
      // }
      saveState({
        GuardRelationship: response.data.GuardRelationship,
        GuardName: response.data.GuardName,
        GuardAddress: response.data.GuardAddress,
        GuardCity: response.data.GuardCity,
        GuardState: response.data.GuardState,
        GuardZip: response.data.GuardZip,
        GuardHomePhone: response.data.GuardHomePhone,
        GuardMobilePhone: response.data.GuardMobilePhone,
        GuardEmail: response.data.GuardEmail,
        GuardFax: response.data.GuardFax,
        GuardMethod: response.data.GuardMethod,
        GuardSponsor: response.data.GuardSponsor,
        GuardLegalCust: response.data.GuardLegalCust,
        GuardPhysCust: response.data.GuardPhysCust,
        GuardEC: response.data.GuardEC,
        GuardPG: response.data.GuardPG,
        GuardDOB: response.data.GuardDOB != '0000-00-00 00:00:00' ? new Date(response.data.GuardDOB) : '',
        GuardSSN: response.data.GuardSSN,
        GuardJobTitle: response.data.GuardJobTitle,
        GuardEmployer: response.data.GuardEmployer,
        GuardWorkPhone: response.data.GuardWorkPhone,
        GuardWorkEmail: response.data.GuardWorkEmail,
        GuardWorkFax: response.data.GuardWorkFax,
        GuardReligion: response.data.GuardReligion,
        GuardRelDesc: response.data.GuardRelDesc
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    /* Get Lead Referral Info Form data for default Field display */
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadReferralInfo',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      //console.log('Single Referral Info Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        RefererralInfoInitialDisposition: response.data.InitialDisposition,
        RefererralInfoHowHear: response.data.HowHear,
        RefererralInfoRefSource: response.data.RefSource,
        RefererralInfoRefReason: response.data.RefReason,
        RefererralInfoIsEmergency: response.data.IsEmergency,
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });

    /* Get Lead Verification Of Benefits Form data for default Field display */
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'getLeadVerificationOfBenefits',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      //console.log('Single Verification Of Benefits Form Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        PreAppFilePath: response.data.PreAppFilePath
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
    
    /* Get Lead Notes */
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeadNotes',
        queryType: 'getLeadNotes',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      //console.log('Single Lead Notes table Data: '+ LeadID + JSON.stringify(response.data));
      saveState({
        LeadNoteData: response.data
      });
        
    })
    .catch(function (error) {
      console.log(error,`error`);
    });


    // /** Get All Company Details **/
    // axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
    //   params: {
    //     tblName: 'tblToDo',
    //     queryType: 'getToDoListFromDashBoarByUserId',
    //     UserID: this.state.UserID !='' ? this.state.UserID : getUser().userid
    //   }
    // })
    // .then(function (response) {
    //   console.log('getToDoListFromDashBoarByUserId Data: '+ JSON.stringify(response.data));
    //   saveState({
    //    UserTodoList: response.data
    //   });
       
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })
    // .then(function (response) {
    //   // always executed
    //   console.log(response,`successfull`);
    // });


    /** Get All Leads To Do List By Lead id **/
    axios.get(process.env.REACT_APP_API_DATABASE_URL, {
      params: {
        tblName: 'tblToDo',
        queryType: 'getToDoListFromSingleLeadEditPageById',
        LeadID: LeadID
      }
    })
    .then(function (response) {
      // console.log('getToDoListFromSingleLeadEditPageById Data: '+ JSON.stringify(response.data));
      saveState({
       UserTodoList: response.data
      });
       
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });

    /* Get Lead Verification Of Benefits Form data for default Field display */
    // axios({
    //   method: 'get',
    //   url: 'https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php',
    //   params: {
    //     tblName: 'tblLeads',
    //     queryType: 'getLeadMainInformation',
    //     LeadID: LeadID
    //   }
    // })
    // .then(function (response) {
    //   console.log('Single Verification Of Benefits Form Data: '+ LeadID + JSON.stringify(response.data));
    //   saveState({
    //     Status: response.data.Status,
    //     Disposition: response.data.Disposition,
    //     CrisisScale: response.data.CrisisScale,
    //     InitialRep: response.data.InitialRep,
    //     AssignedAdvocate: response.data.AssignedAdvocate,
    //     FirstName: response.data.FirstName,
    //     LastName: response.data.LastName,
    //     Email: response.data.Email,
    //     HomePhone: response.data.HomePhone,
    //     SubstanceAbuse: response.data.SubstanceAbuse,
    //     MentalHealth: response.data.MentalHealth,
    //     DualDiagnosis: response.data.DualDiagnosis,
    //     Diagnosis: response.data.Diagnosis
    //   });
        
    // })
    // .catch(function (error) {
    //   console.log(error,`error`);
    // });

  } /** End of Component Didmount **/

  
  /** Add New Lead Note **/
  onAddLeadNote = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    /** Update Lead Information **/ 
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeadNotes',
        queryType: 'addNewLeadNotes',
          EnteredBy: getUser().userid,
          EnteredDate: new Date(),
          NoteText: this.state.NewLeadNoteText,
          // NoteType: this.state.FirstName,
          // NoteStatus: this.state.LastName,
          // StatusDate: this.state.Email,
          LeadID: LeadID
      }
    })
    .then(function (response) {
      saveState({
        UpdateLeadNotesFormSuccessState: true
      });


        /* Get Lead Notes */
        axios({
          method: 'get',
          url: process.env.REACT_APP_API_DATABASE_URL,
          params: {
            tblName: 'tblLeadNotes',
            queryType: 'getLeadNotes',
            LeadID: LeadID
          }
        })
        .then(function (response) {
          saveState({
            LeadNoteData: response.data
          });
            
        })
        .catch(function (error) {
          console.log(error,`error`);
        }); // End

    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  /** Update Lead Main Information **/
  onUpdateLeadMainInformation = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    /** Update Lead Information **/ 
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadMainInfo',
          Status: this.state.Status,
          Disposition: this.state.Disposition,
          // CrisisScale: this.state.CrisisScale,
          InitialRep: this.state.InitialRep,
          AssignedAdvocate: this.state.AssignedAdvocate,
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          Email: this.state.Email,
          HomePhone: this.state.HomePhone,
          SubstanceAbuse: this.state.SubstanceAbuse,
          MentalHealth: this.state.MentalHealth,
          DualDiagnosis: this.state.DualDiagnosis,
          Diagnosis: this.state.Diagnosis,
          LeadID: LeadID
      }
    })
    .then(function (response) {
      saveState({
        UpdateMainLeadFormSuccessState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }


  /** Update Lead Information **/
  onUpdateLeadInformation = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    /** Update Lead Information **/ 
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
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
      saveState({
        UpdateLeadInformationFormSuccessState: true
      });

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
      url: process.env.REACT_APP_API_DATABASE_URL,
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
      saveState({
        UpdateParentChildProfileFormSuccessState: true
      });
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
      url: process.env.REACT_APP_API_DATABASE_URL,
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
      saveState({
        UpdateInsuranceFormSuccessState: true
      });
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
      url: process.env.REACT_APP_API_DATABASE_URL,
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
      saveState({
        UpdateSelfHarmHistoryFormSuccessState: true
      });

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
      url: process.env.REACT_APP_API_DATABASE_URL,
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
      saveState({
        UpdateViolenceHistoryFormSuccessState: true
      });
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
      url: process.env.REACT_APP_API_DATABASE_URL,
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
      saveState({
        UpdateLegalHistoryFormSuccessState: true
      });
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
      url: process.env.REACT_APP_API_DATABASE_URL,
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
      saveState({
        UpdateTheraphyHistoryFormSuccessState: true
      });
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
      url: process.env.REACT_APP_API_DATABASE_URL,
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
      saveState({
        UpdateSchoolHistoryFormSuccessState: true
      });
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
      url: process.env.REACT_APP_API_DATABASE_URL,
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
      saveState({
        UpdateDrugHistoryFormSuccessState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  /** Update Sexual History **/
  onUpdateSexualHistory = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadSexualHistory',
        SexualHistoryIsSexuallyActive: this.state.SexualHistoryIsSexuallyActive,
        SexualHistoryRelHistory: this.state.SexualHistoryRelHistory,
        SexualHistoryDevianceHistory: this.state.SexualHistoryDevianceHistory,
        SexualHistoryInternetHistory: this.state.SexualHistoryInternetHistory,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      saveState({
        UpdateSexualHistoryFormSuccessState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }
  
  /** Update Emergency Contact  **/
  onUpdateEmergencyContact = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadEmergencyContact',
        EmergencyContactECName: this.state.EmergencyContactECName,
        EmergencyContactECRelationship: this.state.EmergencyContactECRelationship,
        EmergencyContactECPhone: this.state.EmergencyContactECPhone,
        EmergencyContactECAddress: this.state.EmergencyContactECAddress,
        EmergencyContactECCity: this.state.EmergencyContactECCity,
        EmergencyContactECState: this.state.EmergencyContactECState,
        EmergencyContactECZip: this.state.EmergencyContactECZip,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      saveState({
        UpdateEmergencyContactFormSuccessState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }
  
  /** Update Verification Benefits **/
  onUpdateVerificationBenefits = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadVerificationOfBenefits',
        PreAppFilePath: this.state.PreAppFilePath,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      // console.log(response,`successfully Updating Verification Benefits`);
      saveState({
        UpdateVerificationOfBenifitsFormSuccessState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }

  /** Update Referral Info **/
  onUpdateReferralInfo = (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadReferralInfo',
        RefererralInfoInitialDisposition: this.state.RefererralInfoInitialDisposition,
        RefererralInfoHowHear: this.state.RefererralInfoHowHear,
        RefererralInfoRefSource: this.state.RefererralInfoRefSource,
        RefererralInfoRefReason: this.state.RefererralInfoRefReason,
        RefererralInfoIsEmergency: this.state.RefererralInfoIsEmergency,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      // console.log(response,`successfully Updating Referral Info`);
      saveState({
        UpdateReferralFormSuccessState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }
  
  /** Update Parent Guardian Sponsor Info **/
  onUpdateParentGuardianSponsorInfo= (e) => {
    const { saveState } = this;
    const LeadID = getURLParams('leadID');
    saveState({ LeadID });

    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblLeads',
        queryType: 'updateLeadParentGuardianSponsorInfo',
        GuardRelationship: this.state.GuardRelationship,
        GuardName: this.state.GuardName,
        GuardAddress: this.state.GuardAddress,
        GuardCity: this.state.GuardCity,
        GuardState: this.state.GuardState,
        GuardZip: this.state.GuardZip,
        GuardHomePhone: this.state.GuardHomePhone,
        GuardMobilePhone: this.state.GuardMobilePhone,
        GuardEmail: this.state.GuardEmail,
        GuardFax: this.state.GuardFax,
        GuardMethod: this.state.GuardMethod,
        GuardSponsor: this.state.GuardSponsor,
        GuardLegalCust: this.state.GuardLegalCust,
        GuardPhysCust: this.state.GuardPhysCust,
        GuardEC: this.state.GuardEC,
        GuardPG: this.state.GuardPG,
        GuardDOB: this.state.GuardDOB,
        GuardSSN: this.state.GuardSSN,
        GuardJobTitle: this.state.GuardJobTitle,
        GuardEmployer: this.state.GuardEmployer,
        GuardWorkPhone: this.state.GuardWorkPhone,
        GuardWorkEmail: this.state.GuardWorkEmail,
        GuardWorkFax: this.state.GuardWorkFax,
        GuardReligion: this.state.GuardReligion,
        GuardRelDesc: this.state.GuardRelDesc,
        LeadID: LeadID
      }
    })
    .then(function (response) {
      saveState({
        UpdateparentGuardianSponsorInfoFormSuccessState: true
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  }



  onAddToDo = (e) => {
    const { saveState, state } = this;
    const LeadID = getURLParams('leadID');
    const LeadIDFilter = getURLParams('leadID');
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
        tblName: 'tblToDo',
        queryType: 'addNewTodoSingleLeadEditPage',
        ToDoReminderDate: state.ToDoReminderDate,
        ToDoText: state.ToDoText,
        ToDoUser: state.ToDoUser,
        LeadID: LeadID
      }
    })
    .then(function (response) {
     // console.log(`New To Do Item successfully Added: `+JSON.stringify(response.data));
     // this.afterAddToDoListUpdateData(LeadID);
      saveState({
        isSaved: true,
       //  UserTodoList: state.UserTodoList.filter(({ ToDoID })=> ToDoID != response.data)
      });

              /** Get All Leads To Do List By Lead id **/
              axios.get(process.env.REACT_APP_API_DATABASE_URL, {
                params: {
                  tblName: 'tblToDo',
                  queryType: 'getToDoListFromSingleLeadEditPageById',
                  LeadID: LeadID
                }
              })
              .then(function (response) {
                saveState({
                UserTodoList: response.data
                });
                
              })
              .catch(function (error) {
                console.log(error);
              })
              .then(function (response) {
                // always executed
                console.log(response,`successfull`);
              });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
};

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
       // console.log('Date of birth: '+e);
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
        //console.log('is adopted: '+e.value);
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
    switch(type){
      case 'EditInsuranceProvider':
          this.saveState({
            InsuranceProvider: e.value
          });
        break;
      case 'EditInsuranceType':
        this.saveState({
          InsuranceType: e.value
        });
      break;
      case 'EditInsurancePhone':
        //console.log('EditInsurancePhone; '+e.target.value);
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

  onChangeSexualHistoryInput = (type, e) => {
    switch(type){
      case 'EditIsSexuallyActive':
          this.saveState({
            SexualHistoryIsSexuallyActive: e.value
          });
      break;
      case 'EditRelHistory':
        this.saveState({
          SexualHistoryRelHistory: e.target.value
        });
      break;
      case 'EditDevianceHistory':
        this.saveState({
          SexualHistoryDevianceHistory: e.target.value
        });
      break;    
      case 'EditInternetHistory':
        this.saveState({
          SexualHistoryInternetHistory: e.target.value
        });
      break;    
      }
  }

  onChangeEmergencyContactInput = (type, e) => {
    switch(type){
      case 'EditECName':
          this.saveState({
            EmergencyContactECName: e.target.value
          });
      break;
      case 'EditECRelationship':
        this.saveState({
          EmergencyContactECRelationship: e.target.value
        });
      break;
      case 'EditECPhone':
        this.saveState({
          EmergencyContactECPhone: e.target.value
        });
      break;    
      case 'EditECAddress':
        this.saveState({
          EmergencyContactECAddress: e.target.value
        });
      break;   
      case 'EditECCity':
        this.saveState({
          EmergencyContactECCity: e.target.value
        });
      break;
      case 'EditECState':
        this.saveState({
          EmergencyContactECState: e.target.value
        });
      break;
      case 'EditECZip':
        this.saveState({
          EmergencyContactECZip: e.target.value
        });
      break;    
      }
  }

  onChangeParentGuardianSponsorInfoInput = (type, e) => {
    switch(type){
      case 'EditGuardRelationship':
          this.saveState({
            GuardRelationship: e.target.value
          });
      break;
      case 'EditGuardName':
        this.saveState({
          GuardName: e.target.value
        });
      break;
      case 'EditGuardAddress':
        this.saveState({
          GuardAddress: e.target.value
        });
      break;    
      case 'EditGuardCity':
        this.saveState({
          GuardCity: e.target.value
        });
      break;   
      case 'EditGuardState':
        this.saveState({
          GuardState: e.target.value
        });
      break;
      case 'EditGuardZip':
        this.saveState({
          GuardZip: e.target.value
        });
      break;
      case 'EditGuardHomePhone':
        this.saveState({
          GuardHomePhone: e.target.value
        });
      break;    
      case 'EditGuardMobilePhone':
        this.saveState({
          GuardMobilePhone: e.target.value
        });
      break;    
      case 'EditGuardEmail':
        this.saveState({
          GuardEmail: e.target.value
        });
      break;    
      case 'EditGuardFax':
        this.saveState({
          GuardFax: e.target.value
        });
      break;    
      case 'EditGuardMethod':
        this.saveState({
          GuardMethod: e.target.value
        });
      break;    
      case 'EditGuardSponsor':
        this.saveState({
          GuardSponsor: e.value
        });
      break;    
      case 'EditGuardLegalCust':
        this.saveState({
          GuardLegalCust: e.value
        });
      break;    
      case 'EditGuardPhysCust':
        this.saveState({
          GuardPhysCust: e.value
        });
      break;    
      case 'EditGuardEC':
        this.saveState({
          GuardEC: e.value
        });
      break;    
      case 'EditGuardPG':
        this.saveState({
          GuardPG: e.value
        });
      break;    
      case 'EditGuardDOB':
        this.saveState({
          GuardDOB: e
        });
      break;    
      case 'EditGuardSSN':
        this.saveState({
          GuardSSN: e.target.value
        });
      break;    
      case 'EditGuardJobTitle':
        this.saveState({
          GuardJobTitle: e.target.value
        });
      break;    
      case 'EditGuardEmployer':
        this.saveState({
          GuardEmployer: e.target.value
        });
      break;    
      case 'EditGuardWorkPhone':
        this.saveState({
          GuardWorkPhone: e.target.value
        });
      break;    
      case 'EditGuardWorkEmail':
        this.saveState({
          GuardWorkEmail: e.target.value
        });
      break;    
      case 'EditGuardWorkFax':
        this.saveState({
          GuardWorkFax: e.target.value
        });
      break;    
      case 'EditGuardReligion':
        this.saveState({
          GuardReligion: e.target.value
        });
      break;    
      case 'EditGuardRelDesc':
        this.saveState({
          GuardRelDesc: e.target.value
        });
      break;    
      }
  }

  onChangeReferralInfoInput = (type, e) => {
    switch(type){
      case 'EditInitialDisposition':
          this.saveState({
            RefererralInfoInitialDisposition: e.value
          });
      break; 
      case 'EditHowHear':
          this.saveState({
            RefererralInfoHowHear: e.target.value
          });
      break; 
      case 'EditRefSource':
          this.saveState({
            RefererralInfoRefSource: e.target.value
          });
      break; 
      case 'EditRefReason':
          this.saveState({
            RefererralInfoRefReason: e.target.value
          });
      break; 
      case 'EditIsEmergency':
          this.saveState({
            RefererralInfoIsEmergency: e.value
          });
      break; 
    } 
  }

  onChangeVerificationBenefitsInput = (type, e) => {
    switch(type){
      case 'EditPreAppFilePath':
          this.saveState({
            PreAppFilePath: e.target.value
          });
      break; 
    }
  }

  onChangeMainLeadOption  = (type, e) => {
    switch(type){
      case 'Status':
          this.saveState({
            Status: e.value
          });
      break; 
      case 'Disposition':
        //console.log('type EditDisposition:'+type);
          this.saveState({
            Disposition: e.value
          });
      break; 
      // case 'CrisisScale':
      //     this.saveState({
      //       CrisisScale: e.value
      //     });
      // break; 
      case 'InitialRep':
          this.saveState({
            InitialRep: e.value
          });
      break; 
      case 'AssignedAdvocate':
          this.saveState({
            AssignedAdvocate: e.value
          });
      break; 
      case 'FirstName':
          this.saveState({
            FirstName: e.target.value
          });
      break; 
      case 'LastName':
          this.saveState({
            LastName: e.target.value
          });
      break; 
      case 'Email':
          this.saveState({
            Email: e.target.value
          });
      break; 
      case 'HomePhone':
          this.saveState({
            HomePhone: e.target.value
          });
      break; 
      case 'SubstanceAbuse':
          this.saveState({
            SubstanceAbuse: e.value
          });
      break; 
      case 'MentalHealth':
          this.saveState({
            MentalHealth: e.value
          });
      break; 
      case 'DualDiagnosis':
          this.saveState({
            DualDiagnosis: e.value
          });
      break; 
      case 'Diagnosis':
          this.saveState({
            Diagnosis: e.target.value
          });
      break; 
    }
  }

   
   onChangeLeadNotesInput  = (type, e) => {
    switch(type){
      case 'NewLeadNoteText':
          this.saveState({
            NewLeadNoteText: e.target.value
          });
      break; 
    }
  }

  onChangeTodoItemOption = (type, e) => {
    // console.log('Type: '+type);
    switch(type){
      case 'NewLeadNotes':
        // console.log('Type: '+e.target.value);
          this.saveState({
            ToDoText: e.target.value
          });
      break; 
      case 'ToDoReminderDate':
        // console.log('Value: '+e);
          this.saveState({
            ToDoReminderDate: e
          });
      break; 
      case 'ToDoUser':
        // console.log('Value: '+e.value);
          this.saveState({
            ToDoUser: e.value
          });
      break; 
    }
  }


  // Set the To Do Item to Done
  onSetToDoneToDoList = (todoListId) => {
    //console.log("updateToDoListToDone value: "+todoListId);
    const { saveState, state } = this;
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_DATABASE_URL,
      params: {
          tblName: 'tblToDo',
          queryType: 'updateToDoListToDone',
          ToDoID: todoListId
      }
    })
    .then(function (response) {
      //console.log(response,`Deleted Company Insurance successfull`);
      saveState({
        UserTodoList: state.UserTodoList.filter(({ ToDoID })=> ToDoID != todoListId)
      });
    })
    .catch(function (error) {
      console.log(error,`error`);
    });
  };



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

  
  onBack = () => {
    
  }

  onPrintView = () => {
    
  }


  render() {

    const accordionRef = useRef<AccordionRefObject>(null);

    const { state, onBack, onChangeInput, onChangeMainLeadOption, onLeadInformationChangeInput, onChangeParentChildProfileInput, onChangeLeadInsuranceInput, onChangeSelfharmHistoryInput, onChangeViolenceHistoryOption, onChangeLegalHistoryOption, onChangeTherapyHistoryOption, onPrintView, onChangeDate, onChangeOption, onUpdateLeadMainInformation, onUpdateChildProfile, onUpdateLeadInformation, onUpdateLeadInsurance, onUpdateSelfHarmHistory, 
      onChangeSchoolHistoryOption, onChangeDrugHistoryOption, onChangeSexualHistoryInput, onChangeEmergencyContactInput, onChangeParentGuardianSponsorInfoInput, onChangeReferralInfoInput, onChangeVerificationBenefitsInput, onChangeLeadNotesInput,
      onUpdateViolenceHistory, onUpdateLegalHistory, onUpdateSchoolHistory, onUpdateTherapyHistory, onUpdateSexualHistory, onUpdateDrugHistory, onUpdateEmergencyContact, 
      onUpdateVerificationBenefits, onUpdateReferralInfo, onUpdateParentGuardianSponsorInfo, onAddLeadNote, onSetToDoneToDoList, onAddToDo, onChangeTodoItemOption, state: { LeadName, LeadID, LeadInfo } } = this;
            
    return (<>
      <SEO title="View/Edit Lead" />
      <div className="content-wrapper lead-view-edit-wrapper px-4 py-4">
        <Container style={{ height: 'auto', marginBottom: '1rem' }}>
          <Row>
            <Col breakPoint={{ xs: 2 }}>
              <Button className="mx-1" status="Info" type="button" shape="square" onClick={()=>{navigate("/leads")}} fullWidth>BACK</Button>
              {/* <Button className="mx-1" status="Info" type="button" shape="square" onClick={onBack.bind(this)} fullWidth>BACK</Button> */}
            </Col>
            <Col breakPoint={{ xs: 2 }}>
            
              {/* <Button className="mx-1" status="Success" type="button" shape="square" onClick={onPrintView.bind(this)} fullWidth>PRINT VIEW</Button> */}
              <Button className="mx-1" status="Success" type="button" shape="square" onClick={() => accordionRef.current?.openAll(1)} fullWidth>PRINT VIEW</Button>
            </Col>
          </Row>
        </Container>
        <Card>
          <CardBody>
            <Container>
              <Row className="justify-content-center align-items-center mb-5">
                <Col breakPoint={{ xs: 12 }}>
                  <h2 className="text-center mb-5">View/Edit: {this.state.FirstName} {this.state.LastName} ({LeadID})</h2>
                  <p className="text-center">
                    
                   <span className="d-block">Child: <i>{this.state.PatientName}</i></span>
                   <i><span className="d-block">{this.state.PatientGender? this.state.PatientGender+ ', age ':'Age '} 
                    {this.state.PatientAge>= 1 ? this.state.PatientAge+', ' : 'n/a, '} 
                    {this.state.IsAdopted == 1 ? 'adopted' : 'not adopted'} </span>

                    <span className="d-block text-danger">{this.state.IsDrugUse == 1 ? 'Drugs/alcohol, ' : 'No drugs/alcohol, '} 
                    {this.state.IsSexuallyActive == 1 ? 'sexually active' : 'not sexually active'}</span>

                    <span className="d-block text-danger">{this.state.IsViolent == 1 ? 'Displayed violence, ' : 'Not displayed violence, '} 
                    {this.state.LegalHistoryIsCourtOrdered == 1 ? 'court ordered': 'not court ordered'}</span></i>
                  </p>
                  
                </Col> 
                <Col breakPoint={{ xs: 12 }}>  
                { this.state.UpdateMainLeadFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated</div> : null }
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Status">Status:</label>
                      <SelectStyled options={leadStatus} placeholder={this.state.Status} value={this.state.Status} id="Status" name="Status" onChange ={onChangeMainLeadOption.bind(this, 'Status')} />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Disposition">Disposition:</label>
                      <SelectStyled options={leadDisposition.map(({ value, label }) => { 
                                if(value == this.state.Disposition){
                                  CurrentDisposition = label;
                                }
                                return { value: value, label: label };
                                })}  
                                placeholder={CurrentDisposition} value={this.state.Disposition} id="Disposition" name="Disposition" onChange ={onChangeMainLeadOption.bind(this,'Disposition')} />
                    </Col>
                  </Row>
                  {/* <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="CrisisScale">Crisis Scale:</label>
                      <SelectStyled options={leadCrisisScale} placeholder={this.state.CrisisScale} value={this.state.CrisisScale} id="CrisisScale" name="CrisisScale" onChange ={onChangeMainLeadOption.bind(this, 'CrisisScale')} />
                    </Col>
                  </Row> */}
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="InitialRep">Initial Rep:</label>
                      <SelectStyled options={this.state.UserAdminList.map(({ UserID, FirstName, LastName }) => { 
                                if(UserID == this.state.InitialRep){
                                  CurrentInitialRep = FirstName +' '+LastName;
                                }
                                return { value: UserID, label: FirstName+ ' '+LastName };

                                })}  
                                placeholder={CurrentInitialRep} value={this.state.InitialRep} id="InitialRep" name="InitialRep" onChange={onChangeMainLeadOption.bind(this, 'InitialRep')} />
                      
                    </Col> 
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="AssignedAdvocate">Assigned Advocate:</label>
                      <SelectStyled options={this.state.UserAdminList.map(({ UserID, FirstName, LastName }) => { 
                                if(UserID == this.state.AssignedAdvocate){
                                  CurrentAssignedAdvocate = FirstName +' '+LastName;
                                }
                                return { value: UserID, label: FirstName+ ' '+LastName };

                                })}  
                                placeholder={CurrentAssignedAdvocate} value={this.state.AssignedAdvocate} id="AssignedAdvocate" name="AssignedAdvocate" onChange ={onChangeMainLeadOption.bind(this, 'AssignedAdvocate')} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="FirstName">First Name:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={this.state.FirstName} id="FirstName" name="FirstName" onChange ={onChangeMainLeadOption.bind(this, 'FirstName')}/>
                      </Input>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="LastName">Last Name:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={this.state.LastName} id="LastName" name="LastName" onChange ={onChangeMainLeadOption.bind(this, 'LastName')}/>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mb-2"> 
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Email">Email:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={this.state.Email} id="Email" name="Email" onChange ={onChangeMainLeadOption.bind(this, 'Email')}/>
                      </Input>
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="HomePhone">Home Phone:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={this.state.HomePhone} id="HomePhone" name="HomePhone" onChange ={onChangeMainLeadOption.bind(this, 'HomePhone')}/>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="SubstanceAbuse">Substance Abuse?:</label>
                      <SelectStyled options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.SubstanceAbuse){
                                    case '0':
                                      SubstanceAbuseStatus = 'No'
                                        break;
                                    case '1':
                                      SubstanceAbuseStatus = 'Yes'
                                        break;    
                                  }
                                  return { value: value, label: label };
                                })} placeholder={SubstanceAbuseStatus} value={this.state.SubstanceAbuse} id="SubstanceAbuse" name="SubstanceAbuse" onChange ={onChangeMainLeadOption.bind(this, 'SubstanceAbuse')} />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="MentalHealth">Mental Health:</label>
                      <SelectStyled options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.MentalHealth){
                                    case '0':
                                      MentalHealthStatus = 'No'
                                        break;
                                    case '1':
                                      MentalHealthStatus = 'Yes'
                                        break;    
                                  }
                                  return { value: value, label: label };
                                })} placeholder={MentalHealthStatus} value={this.state.MentalHealth} id="MentalHealth" name="MentalHealth" onChange ={onChangeMainLeadOption.bind(this, 'MentalHealth')} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="DualDiagnosis">Dual Diagnosis:</label>
                      <SelectStyled options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.DualDiagnosis){
                                    case '0':
                                      DualDiagnosisStatus = 'No'
                                        break;
                                    case '1':
                                      DualDiagnosisStatus = 'Yes'
                                        break;    
                                  }
                                  return { value: value, label: label };
                                })} placeholder={DualDiagnosisStatus} value={this.state.DualDiagnosis} id="DualDiagnosis" name="DualDiagnosis" onChange ={onChangeMainLeadOption.bind(this, 'DualDiagnosis')} />
                    </Col>
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                      <label htmlFor="Diagnosis">Diagnosis:</label>
                      <Input fullWidth size="Medium" className="Name">
                        <input type="text" placeholder={this.state.Diagnosis} id="Diagnosis" name="Diagnosis" onChange={onChangeMainLeadOption.bind(this, 'Diagnosis')}/>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col breakPoint={{ xs: 12, md: 6 }} className="mb-5">
                        <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateLeadMainInformation} fullWidth className="text-uppercase">SAVE {this.state.FirstName.toUpperCase()}'s LEAD PROFILE</Button>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col breakPoint={{ xs: 12, md: 4 }}>
                        {/* <Button status="Info" type="button" shape="SemiRound" fullWidth className="text-uppercase">REFER {this.state.FirstName.toUpperCase()}</Button> */}
                        <ButtonLink status="Success" type="button" shape="SemiRound" onClick={() => navigate('/leads/refer-lead?leadID='+LeadID)} fullWidth>REFER {this.state.FirstName.toUpperCase()}</ButtonLink>
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
                    <Col breakPoint={{ xs: 12, md: 1 }}></Col>
                    <Col breakPoint={{ xs: 12, md: 3 }}>
                        <ButtonLink status="Success" type="button" shape="SemiRound" onClick={() => navigate('/leads/convert-lead-to-client?leadID='+LeadID)} fullWidth>CONVERT {this.state.FirstName.toUpperCase()}</ButtonLink>
                    </Col>
                  </Row>
                </Col>
                <Col breakPoint={{ xs: 12 }}>
                  <p className="text-center">
                  <span className="d-block">Campaign: {this.state.CampaignName}</span> 
                    <span className="d-block">Signup Date: {this.state.CreatedDate}</span>
                    <span className="d-block">IP Address: {this.state.IPAddress}</span>
                    {/* <span className="d-block">Terms Accepted: { this.state.TermsApprovedDate != null ? this.state.TermsApprovedDate : "<span className='text-danger'>Not Accepted</span> <span classname='text-danger' onClick={onUpdateDrugHistory}><i class='fa fa-paper-plane-o'></i> Mark Terms Accepted</span>"}</span> */}
                    <span className="d-block">Terms Accepted: { this.state.TermsApprovedDate != null ? this.state.TermsApprovedDate : ""}</span>
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
              
              { this.state.UpdateLeadNotesFormSuccessState ? <div className="text-center text-success mb-4">Successfully Added New Note</div> : null }

                <Row className="mb-2">
                  <Col breakPoint={{ xs: 12 }}>
                    <label htmlFor="NewLeadNotes">Add a new lead note for {stringFirstCharCapitalized(this.state.FirstName.toLowerCase())} {stringFirstCharCapitalized(this.state.LastName.toLowerCase())}</label>
                  </Col>
                  <Col breakPoint={{ xs: 12, md: 10 }} className="mb-2">
                    <Input fullWidth size="Medium" className="Name"> 
                      <input type="text" placeholder='' id="NewLeadNoteText" name="NewLeadNoteText" onChange ={onChangeLeadNotesInput.bind(this, 'NewLeadNoteText')}/>
                    </Input>
                  </Col>
                  <Col breakPoint={{ xs: 12, md: 2 }}>
                    <Button status="Warning" type="button" shape="SemiRound" onClick={onAddLeadNote} fullWidth className="text-uppercase">+ ADD NOTE</Button>
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
                      {this.state.LeadNoteData.map(({ EnteredBy, EnteredDate, NoteText }) => { 
                        return (
                        <tr> 
                          <td scope="col">{EnteredBy}</td>
                          <td>{EnteredDate}</td>
                          <td>{NoteText}</td>
                        </tr>
                        );
                        })}
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
                    <AccordionItem uniqueKey={1} title="LEAD INFORMATION">
                        { this.state.UpdateLeadInformationFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Lead information</div> : null }
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
                    </AccordionItem>
                    {/* End Lead information */}


                    {/* PATIENT/CHILD PROFILE */}
                     <AccordionItem uniqueKey={2} title="PATIENT/CHILD PROFILE">
                     { this.state.UpdateParentChildProfileFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Patien/Child Profile </div> : null }
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
                              <DatePicker id="EditPatientDOB" name="EditPatientDOB" selected={this.state.PatientDOB} onChange={onChangeParentChildProfileInput.bind(this, 'EditPatientDOB')} />
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
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditExpectToEnrollDate">Expect To Enroll Date</label>
                          <Input fullWidth size="Medium" className="EditExpectToEnrollDate">
                              <DatePicker id="EditExpectToEnrollDate" name="EditExpectToEnrollDate"  selected={this.state.PatientExpectToEnrollDate} onChange={onChangeParentChildProfileInput.bind(this, 'EditExpectToEnrollDate')} />
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
                    </AccordionItem> 
                    {/* END PATIENT/CHILD PROFILE */}

                    {/* INSURANCE */}
                    <AccordionItem uniqueKey={3} title="INSURANCE">
                    { this.state.UpdateInsuranceFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Insurance</div> : null }
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
                    { this.state.UpdateSelfHarmHistoryFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Self Harm History</div> : null }
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
                    <AccordionItem uniqueKey={5} title="VIOLENCE HISTORY">
                    { this.state.UpdateViolenceHistoryFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Violence Harm History</div> : null }
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
                    </AccordionItem>
                    {/* End Violence HISTORY */}

                    {/* Legal History  */}
                    <AccordionItem uniqueKey={6} title="LEGAL HISTORY">
                    { this.state.UpdateLegalHistoryFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Legal History</div> : null }
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
                                <DatePicker id="EditNextCourtDate" name="EditNextCourtDate" selected={this.state.LegalHistoryNextCourtDate} onChange={onChangeLegalHistoryOption.bind(this, 'EditNextCourtDate')} />
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
                    </AccordionItem>

                    {/* THERAPY HISTORY  */}
                    <AccordionItem uniqueKey={7} title="THERAPY HISTORY">
                    { this.state.UpdateTheraphyHistoryFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Therapy History</div> : null }
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
                    { this.state.UpdateSchoolHistoryFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated School History</div> : null }
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
                    { this.state.UpdateDrugHistoryFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated</div> : null }
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
                    
                    {/* SEXUAL HISTORY  */}
                    <AccordionItem uniqueKey={10} title="SEXUAL HISTORY">
                    { this.state.UpdateSexualHistoryFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Sexual History</div> : null }
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditIsSexuallyActive">Sexually Active?</label>
                          <Input fullWidth size="Medium" className="EditIsSexuallyActive">
                            <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.SexualHistoryIsSexuallyActive){
                                    case '0':
                                      SexuallyActiveStatus = 'No'
                                        break;
                                    case '1':
                                      SexuallyActiveStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })} placeholder={SexuallyActiveStatus} value={this.state.SexualHistoryIsSexuallyActive} id="EditIsSexuallyActive" name="EditIsSexuallyActive" onChange ={onChangeSexualHistoryInput.bind(this, 'EditIsSexuallyActive')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditRelHistory">Sexual Relationship History</label>
                          <Input fullWidth size="Medium" className="EditRelHistory">
                            <textarea type="text" placeholder={this.state.SexualHistoryRelHistory} id="EditRelHistory" name="EditRelHistory" onChange ={onChangeSexualHistoryInput.bind(this, 'EditRelHistory')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditDevianceHistory">Sexual Deviance History</label>
                          <Input fullWidth size="Medium" className="EditDevianceHistory">
                            <textarea type="text" placeholder={this.state.SexualHistoryDevianceHistory} id="EditDevianceHistory" name="EditDevianceHistory" onChange ={onChangeSexualHistoryInput.bind(this, 'EditDevianceHistory')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditInternetHistory">Sexual Internet History</label>
                          <Input fullWidth size="Medium" className="EditInternetHistory">
                            <textarea type="text" placeholder={this.state.SexualHistoryInternetHistory} id="EditInternetHistory" name="EditInternetHistory" onChange ={onChangeSexualHistoryInput.bind(this, 'EditInternetHistory')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateSexualHistory} fullWidth> UPDATE/SAVE {this.state.FirstName} SEXUAL HISTORY</Button>
                        </Col>
                      </Row>
                    </AccordionItem>
                    {/* END SEXUAL HISTORY  */}


                    {/* EMERGENCY CONTACT  */}            
                    <AccordionItem uniqueKey={13} title="EMERGENCY CONTACT">
                    { this.state.UpdateEmergencyContactFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Emergency Contact</div> : null }

                    <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditECName">Name</label>
                          <Input fullWidth size="Medium" className="EditECName">
                            <input type="text" placeholder={this.state.EmergencyContactECName} id="EditECName" name="EditECName" onChange ={onChangeEmergencyContactInput.bind(this, 'EditECName')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditECRelationship">Relationship</label>
                          <Input fullWidth size="Medium" className="EditECRelationship">
                            <input type="text" placeholder={this.state.EmergencyContactECRelationship} id="EditECRelationship" name="EditECRelationship" onChange ={onChangeEmergencyContactInput.bind(this, 'EditECRelationship')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                          <label htmlFor="EditECPhone">Phone</label>
                          <Input fullWidth size="Medium" className="EditECPhone">
                            <input type="text" placeholder={this.state.EmergencyContactECPhone} id="EditECPhone" name="EditECPhone" onChange ={onChangeEmergencyContactInput.bind(this, 'EditECPhone')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2"></Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditECAddress">Address</label>
                          <Input fullWidth size="Medium" className="EditECAddress">
                            <input type="text" placeholder={this.state.EmergencyContactECAddress} id="EditECAddress" name="EditECAddress" onChange ={onChangeEmergencyContactInput.bind(this, 'EditECAddress')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                          <label htmlFor="EditECCity">City</label>
                          <Input fullWidth size="Medium" className="EditECCity">
                            <input type="text" placeholder={this.state.EmergencyContactECCity} id="EditECCity" name="EditECCity" onChange ={onChangeEmergencyContactInput.bind(this, 'EditECCity')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                          <label htmlFor="EditECState">State</label>
                          <Input fullWidth size="Medium" className="EditECState">
                            <input type="text" className="mx-2" placeholder={this.state.EmergencyContactECState} id="EditECState" name="EditECState" onChange ={onChangeEmergencyContactInput.bind(this, 'EditECState')}/>
                          </Input>
                        </Col>
                        <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                          <label htmlFor="EditECZip">Zip</label>
                          <Input fullWidth size="Medium" className="EditECZip">
                            <input type="text" placeholder={this.state.EmergencyContactECZip} id="EditECZip" name="EditECZip" onChange ={onChangeEmergencyContactInput.bind(this, 'EditECZip')}/>
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateEmergencyContact} fullWidth>UPDATE/SAVE {this.state.FirstName} EMERGENCY CONTACT</Button>
                        </Col>
                      </Row>
                    </AccordionItem>
                    {/* END EMERGENCY CONTACT  */}            

                    {/* PARENT/GUARDIAN/SPONSOR INFO  */}
                    <AccordionItem uniqueKey={14} title="PARENT/GUARDIAN/SPONSOR INFO">
                    { this.state.UpdateparentGuardianSponsorInfoFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Parent Guardian Info</div> : null }
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardRelationship">Relationship</label>
                            <Input fullWidth size="Medium" className="EditGuardRelationship">
                              <input type="text" placeholder={this.state.GuardRelationship} id="EditGuardRelationship" name="EditGuardRelationship" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardRelationship')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardName">Name</label>
                            <Input fullWidth size="Medium" className="EditGuardName">
                              <input type="text" placeholder={this.state.GuardName} id="EditGuardName" name="EditGuardName" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardName')}/>
                            </Input>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <label htmlFor="EditGuardAddress">Address</label>
                            <Input fullWidth size="Medium" className="EditGuardAddress">
                              <input type="text" placeholder={this.state.GuardAddress} id="EditGuardAddress" name="EditGuardAddress" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardAddress')}/>
                            </Input>
                          </Col>
                        </Row>
                      
                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                            <label htmlFor="EditGuardCity">City</label>
                            <Input fullWidth size="Medium" className="EditGuardCity">
                              <input type="text" placeholder={this.state.GuardCity} id="EditGuardCity" name="EditGuardCity" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardCity')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                            <label htmlFor="EditGuardState">State</label>
                            <Input fullWidth size="Medium" className="EditGuardState">
                              <input type="text" className="mx-2" placeholder={this.state.GuardState} id="EditGuardState" name="EditGuardState" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardState')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 4 }} className="mb-2">
                            <label htmlFor="EditGuardZip">Zip</label>
                            <Input fullWidth size="Medium" className="EditGuardZip">
                              <input type="text" placeholder={this.state.GuardZip} id="EditGuardZip" name="EditGuardZip" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardZip')}/>
                            </Input>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardHomePhone">Home Phone</label>
                            <Input fullWidth size="Medium" className="EditGuardHomePhone">
                              <input type="text" placeholder={this.state.GuardHomePhone} id="EditGuardHomePhone" name="EditGuardHomePhone" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardHomePhone')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardMobilePhone">Mobile Phone</label>
                            <Input fullWidth size="Medium" className="EditGuardMobilePhone">
                              <input type="text" placeholder={this.state.GuardMobilePhone} id="EditGuardMobilePhone" name="EditGuardMobilePhone" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardMobilePhone')}/>
                            </Input>
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardEmail">Email</label>
                            <Input fullWidth size="Medium" className="EditGuardEmail">
                              <input type="text" placeholder={this.state.GuardEmail} id="EditGuardEmail" name="EditGuardEmail" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardEmail')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardFax">Fax</label>
                            <Input fullWidth size="Medium" className="EditGuardFax">
                              <input type="text" placeholder={this.state.GuardFax} id="EditGuardFax" name="EditGuardFax" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardFax')}/>
                            </Input>
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardMethod">Preferred Contact Method</label>
                            <Input fullWidth size="Medium" className="EditGuardMethod">
                              <input type="text" placeholder={this.state.GuardMethod} id="EditGuardMethod" name="EditGuardMethod" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardMethod')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardSponsor">Sponsor</label>
                            <Input fullWidth size="Medium" className="EditGuardSponsor">
                            <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.GuardSponsor){
                                    case '0':
                                      GuardSponsorStatus = 'No'
                                        break;
                                    case '1':
                                      GuardSponsorStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })} placeholder={GuardSponsorStatus} value={this.state.GuardSponsor} id="EditGuardSponsor" name="EditGuardSponsor" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardSponsor')} />
                          </Input> 
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardLegalCust">Legal Cust.</label>
                            <Input fullWidth size="Medium" className="EditGuardLegalCust">
                            <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.GuardLegalCust){
                                    case '0':
                                      GuardLegalCustStatus = 'No'
                                        break;
                                    case '1':
                                      GuardLegalCustStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })} placeholder={GuardLegalCustStatus} value={this.state.GuardLegalCust} id="EditGuardLegalCust" name="EditGuardLegalCust" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardLegalCust')} />
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardPhysCust">Physical Cust.</label>
                            <Input fullWidth size="Medium" className="EditGuardPhysCust">
                            <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.GuardPhysCust){
                                    case '0':
                                      GuardPhysCustStatus = 'No'
                                        break;
                                    case '1':
                                      GuardPhysCustStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })} placeholder={GuardPhysCustStatus} value={this.state.GuardPhysCust} id="EditGuardPhysCust" name="EditGuardPhysCust" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardPhysCust')} />
                          </Input> 
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardEC">Emergency Contact</label>
                            <Input fullWidth size="Medium" className="EditGuardEC">
                            <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.GuardEC){
                                    case '0':
                                      GuardECStatus = 'No'
                                        break;
                                    case '1':
                                      GuardECStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })} placeholder={GuardECStatus} value={this.state.GuardEC} id="EditGuardEC" name="EditGuardEC" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardEC')} />
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardPG">Parent Guardian</label>
                            <Input fullWidth size="Medium" className="EditGuardPG">
                            <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.GuardPG){
                                    case '0':
                                      GuardPGStatus = 'No'
                                        break;
                                    case '1':
                                      GuardPGStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })} placeholder={GuardPGStatus} value={this.state.GuardPG} id="EditGuardPG" name="EditGuardPG" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardPG')} />
                          </Input> 
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardDOB">DOB</label>
                            <Input fullWidth size="Medium" className="EditGuardDOB">
                            <DatePicker id="EditGuardDOB" name="EditGuardDOB" selected={this.state.GuardDOB}  onChange={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardDOB')} />
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardSSN">SSN</label>
                            <Input fullWidth size="Medium" className="EditGuardSSN">
                            <input type="text" placeholder={this.state.GuardSSN} id="EditGuardSSN" name="EditGuardSSN" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardSSN')}/>
                          </Input> 
                          </Col>
                      </Row>
                      
                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardJobTitle">Job Title</label>
                            <Input fullWidth size="Medium" className="EditGuardJobTitle">
                              <input type="text" placeholder={this.state.GuardJobTitle} id="EditGuardJobTitle" name="EditGuardJobTitle" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardJobTitle')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardEmployer">Employer</label>
                            <Input fullWidth size="Medium" className="EditGuardEmployer">
                              <input type="text" placeholder={this.state.GuardEmployer} id="EditGuardEmployer" name="EditGuardEmployer" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardEmployer')}/>
                            </Input>
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardWorkPhone">Work Phone</label>
                            <Input fullWidth size="Medium" className="EditGuardWorkPhone">
                              <input type="text" placeholder={this.state.GuardWorkPhone} id="EditGuardWorkPhone" name="EditGuardWorkPhone" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardWorkPhone')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardWorkEmail">Work Email</label>
                            <Input fullWidth size="Medium" className="EditGuardWorkEmail">
                              <input type="text" placeholder={this.state.GuardWorkEmail} id="EditGuardWorkEmail" name="EditGuardWorkEmail" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardWorkEmail')}/>
                            </Input>
                          </Col>
                      </Row>

                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2">
                            <label htmlFor="EditGuardWorkFax">Work Fax</label>
                            <Input fullWidth size="Medium" className="EditGuardWorkFax">
                              <input type="text" placeholder={this.state.GuardWorkFax} id="EditGuardWorkFax" name="EditGuardWorkFax" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardWorkFax')}/>
                            </Input>
                          </Col>
                          <Col breakPoint={{ xs: 12, md: 6 }} className="mb-2"></Col>
                      </Row>
                      <Row className="mb-2">
                          <Col breakPoint={{ xs: 12}} className="mb-2">
                            <label htmlFor="EditGuardReligion">Religious Pref</label>
                            <Input fullWidth size="Medium" className="EditGuardReligion">
                              <input type="text" placeholder={this.state.GuardReligion} id="EditGuardReligion" name="EditGuardReligion" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardReligion')}/>
                            </Input>
                          </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditGuardRelDesc">Relationship Description</label>
                          <Input fullWidth size="Medium" className="EditGuardRelDesc">
                            <textarea type="text" placeholder={this.state.GuardRelDesc} id="EditGuardRelDesc" name="EditGuardRelDesc" onChange ={onChangeParentGuardianSponsorInfoInput.bind(this, 'EditGuardRelDesc')}/>
                          </Input>
                        </Col>
                      </Row>

                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateParentGuardianSponsorInfo} fullWidth>UPDATE/SAVE {this.state.FirstName} PARENT/GUARDIAN/SPONSOR INFO</Button>
                        </Col>
                      </Row>
                    </AccordionItem>
                    {/* END PARENT/GUARDIAN/SPONSOR INFO  */}

                    {/* REFERRAL INFO  */}
                    <AccordionItem uniqueKey={15} title="REFERRAL INFO">
                    { this.state.UpdateReferralFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated Referral Info</div> : null }
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditInitialDisposition">Source</label>
                          <Input fullWidth size="Medium" className="EditInitialDisposition">
                            <SelectStyled className="selectoption" options={InitialDispositionList.map(({ value, label }) => { 
                                  switch(this.state.RefererralInfoInitialDisposition){
                                    case '0':
                                      InitialDispositionStatus = 'None'
                                        break;
                                    case '4':
                                      InitialDispositionStatus = 'Missed Call'
                                        break;    
                                    case '5':
                                      InitialDispositionStatus = 'Form Fill'
                                        break;    
                                    case '6':
                                      InitialDispositionStatus = 'Phone Call'
                                        break;    
                                    case '7':
                                      InitialDispositionStatus = 'Accepted Call'
                                        break;    
                                    case '8':
                                      InitialDispositionStatus = 'Voicemail'
                                        break;        
                                  }

                                  return { value: value, label: label };
                                })} placeholder={InitialDispositionStatus}  value={this.state.RefererralInfoInitialDisposition} id="EditInitialDisposition" name="EditInitialDisposition" onChange ={onChangeReferralInfoInput.bind(this, 'EditInitialDisposition')} />
                          </Input> 
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditHowHear">How did they hear about us?</label>
                          <Input fullWidth size="Medium" className="EditHowHear">
                            <textarea type="text" placeholder={this.state.RefererralInfoHowHear} id="EditHowHear" name="EditHowHear" onChange ={onChangeReferralInfoInput.bind(this, 'EditHowHear')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditRefSource">Referral Source</label>
                          <Input fullWidth size="Medium" className="EditRefSource">
                            <textarea type="text" placeholder={this.state.RefererralInfoRefSource} id="EditRefSource" name="EditRefSource" onChange ={onChangeReferralInfoInput.bind(this, 'EditRefSource')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditRefReason">Reason for Referral</label>
                          <Input fullWidth size="Medium" className="EditRefReason">
                            <textarea type="text" placeholder={this.state.RefererralInfoRefReason} id="EditRefReason" name="EditRefReason" onChange ={onChangeReferralInfoInput.bind(this, 'EditRefReason')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditIsEmergency">Emergency?</label>
                          <Input fullWidth size="Medium" className="EditIsEmergency">
                            <SelectStyled className="selectoption" options={leadYesNo.map(({ value, label }) => { 
                                  switch(this.state.RefererralInfoIsEmergency){
                                    case '0':
                                      IsEmergencyStatus = 'No'
                                        break;
                                    case '1':
                                      IsEmergencyStatus = 'Yes'
                                        break;    
                                  }

                                  return { value: value, label: label };
                                })} placeholder={IsEmergencyStatus} value={this.state.RefererralInfoIsEmergency} value="" id="EditIsEmergency" name="EditIsEmergency" onChange ={onChangeReferralInfoInput.bind(this, 'EditIsEmergency')} />
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateReferralInfo} fullWidth>  UPDATE/SAVE {this.state.FirstName} REFERRAL INFO</Button>
                        </Col>
                      </Row>
                    </AccordionItem>
                    {/* REFERRAL INFO  */}

                    {/* VERIFICATION OF BENEFITS UPLOAD  */}
                    <AccordionItem uniqueKey={16} title="VERIFICATION OF BENEFITS UPLOAD">
                    { this.state.UpdateVerificationOfBenifitsFormSuccessState ? <div className="text-center text-success mb-4">Successfully Updated</div> : null }
                    <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                          <label htmlFor="EditPreAppFilePath">Verification of Benefits File</label>
                          <Input fullWidth size="Medium" className="EditPreAppFilePath">
                            <input type="text" placeholder={this.state.PreAppFilePath} id="EditPreAppFilePath" name="EditPreAppFilePath" onChange ={onChangeVerificationBenefitsInput.bind(this, 'EditPreAppFilePath')}/>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col breakPoint={{ xs: 12 }} className="mb-2">
                            <Button status="Success" type="button" shape="SemiRound" onClick={onUpdateVerificationBenefits} fullWidth> SAVE {this.state.FirstName}'S LEAD PROFILE</Button>
                        </Col>
                      </Row>
                    </AccordionItem>
                    {/* VERIFICATION OF BENEFITS UPLOAD  */}

                  </Accordion>
                </Col>
                {/* <Col className="mb-3" breakPoint={{ xs: 12, md: 6 }}>
                  <Button status="Warning" type="button" shape="SemiRound" fullWidth className="text-uppercase">SAVE {this.state.FirstName.toUpperCase()} {this.state.LastName.toUpperCase()}'S LEAD PROFILE</Button>
                </Col> */}
              </Row>
            </Container>
          </CardBody>
        </Card>


        <Container>
          <Row className="justify-content-center align-items-left mb-5">
            <Col breakPoint={{ xs: 12 }}>
              <h2 className="text-left mb-5">TO DO ITEMS</h2>
              { state.isSaved ? <Col breakPoint={{ xs: 12 }} className="success text-center"><Alert className="success-message bg-success">Successfully Added New To Do Item</Alert></Col> : false }
            </Col>
            <Col breakPoint={{ xs: 12 }}>
              <Row className="mb-2">
                <Col breakPoint={{ xs: 12 }}>
                  <label htmlFor="NewLeadNotes">Add a new to-do item for {stringFirstCharCapitalized(this.state.FirstName.toLowerCase())} {stringFirstCharCapitalized(this.state.LastName.toLowerCase())}</label>
                </Col>
                <Col breakPoint={{ xs: 12 }} className="mb-2">
                  <Input fullWidth size="Medium" className="Name">
                    <input type="text" placeholder='' id="NewLeadNotes" name="NewLeadNotes" onChange ={onChangeTodoItemOption.bind(this, 'NewLeadNotes')}/>
                  </Input>
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="ToDoReminderDate">Reminder Date:</label>
                  <Input fullWidth size="Medium" className="notes">
                    <DatePicker id="ToDoReminderDate" name="ToDoReminderDate" selected={this.state.ToDoReminderDate}  onChange={onChangeTodoItemOption.bind(this, 'ToDoReminderDate')} />
                  </Input>
                </Col>
                <Col className="col-lg-3">
                  <label htmlFor="ToDoUser">User:</label>
                  {/* <SelectStyled options={leadAdmins} placeholder={this.state.ToDoUser} value={this.state.ToDoUser} id="ToDoUser" name="ToDoUser" onChange ={onChangeTodoItemOption.bind(this, 'ToDoUser')} /> */}
                  <Select options={this.state.UserAdminList.map(({ UserID, FullName }) => { 
                                  return { value: UserID, label: FullName };
                                })} placeholder={this.state.ToDoUser} value={this.state.ToDoUser.value} id="ToDoUser" name="ToDoUser" onChange ={onChangeTodoItemOption.bind(this, 'ToDoUser')} />
                </Col>
                <Col breakPoint={{ xs: 12, md: 3 }}>
                <label htmlFor="ToDoReminderDates">&nbsp;</label>
                  <Button status="Warning" type="button" shape="SemiRound" onClick={onAddToDo} fullWidth className="text-uppercase">+ ADD TO DO</Button>
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
                      <th scope="col">TO DO ITEM</th>
                        <th scope="col">DATE CREATED</th>
                        <th scope="col">DUE DATE</th>
                        <th scope="col">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                    {this.state.UserTodoList.map(({ ToDoID, UserID, ToDoText, CreatedDate,FinishedDate, ReminderDate, Status, ClientID, LeadID, IsRead, FirstName, LastName, HomePhone, Disposition, LastModifiedDate }) => { 

                      return (
                          <tr> 
                            <td scope="col">{ToDoText}</td>
                            <td>{CreatedDate}</td>
                            <td>{ReminderDate}</td>
                            <td><Checkbox status="Dangerd" name="setToDone" onChange={onSetToDoneToDoList.bind(this,ToDoID)}></Checkbox></td>
                          </tr>
                          );
                        })}
                    </tbody>
                  </table>
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
