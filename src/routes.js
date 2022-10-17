import React from 'react'
import JobPosition from './pages/configuration/jobPosition/JobPosition'
import AddJob from './pages/configuration/jobs/AddJob'
import AddJobPosition from './pages/configuration/jobPosition/AddJobPosition'
import EditJob from './pages/configuration/jobs/EditJob'
import ViewJob from './pages/configuration/jobs/ViewJob'
import EditJobPosition from './pages/configuration/jobPosition/EditJobPosition'
import ViewJobPosition from './pages/configuration/jobs/ViewJobPosition'
import ListMenu from './pages/configuration/menu/ListMenu'
import EditMenu from './pages/configuration/menu/EditMenu'
import ResetPassword from './components/ResetPassword'
import OnBoardingCareer from './pages/career/OnBoardingCareer'
import OnBoardingExistingCareer from './pages/career/OnBoardingExistingCareer'
import EditProfile from './pages/profile/EditProfile'
import JobSuccess from './pages/Onboarding/candidate/JobSuccess'
import JobError from './pages/Onboarding/candidate/JobError'
import UpdateLevel2Info from './pages/career/UpdateLevel2Info'
import UpdateLevel3Info from './pages/career/UpdateLevel3Info'
import OfferAcceptance from './pages/career/OfferAcceptance'
import OfferSuccess from './pages/Onboarding/candidate/OfferSuccess'
import LeaveAccumulationList from './pages/Leave/leaveAccumulation/LeaveAccumulationList'
import AddAccumulation from './pages/company/AddAccumulation'
import EditAccumulation from './pages/Leave/leaveAccumulation/EditAccumulation'
import JobApp from './pages/JobApplication/JobApp'
// import ViewAccumulation from './pages/Leave/leaveAccumulation/EditAccumulation';


const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Group = React.lazy(() => import('./pages/Group/Group'))
const Company = React.lazy(() => import('./pages/company/Company'))
const AddCompany = React.lazy(() => import('./pages/company/AddCompany'))
const EditCompany = React.lazy(() => import('./pages/company/EditCompany'))
const ViewCompany = React.lazy(() => import('./pages/company/ViewCompany'))
const Function = React.lazy(() => import('./pages/function/Function'))
const AddFunction = React.lazy(() => import('./pages/function/AddFunction'))
const EditFunction = React.lazy(() => import('./pages/function/EditFunction'))
const ViewFunction = React.lazy(() => import('./pages/function/ViewFunction'))
const Location = React.lazy(() => import('./pages/location/Location'))
const AddLocation = React.lazy(() => import('./pages/location/AddLocation'))
const EditLocation = React.lazy(() => import('./pages/location/EditLocation'))
const ViewLocation = React.lazy(() => import('./pages/location/ViewLocation'))
const ViewCostCenter = React.lazy(() => import('./pages/configuration/costcenter/ViewCostCenter'))
const SubFunction = React.lazy(() => import('./pages/subFunction/SubFunction'))
const AddSubFunction = React.lazy(() =>
  import('./pages/subFunction/AddSubFunction'),
)
const EditSubFunction = React.lazy(() =>
  import('./pages/subFunction/EditSubFunction'),
)
const ViewSubfuncation = React.lazy(() =>
  import('./pages/subFunction/ViewSubfuncation'),
)
const BloodGroup = React.lazy(() =>
  import('./pages/configuration/bloodGroup/BloodGroup'),
)
const IndustryType = React.lazy(() =>
  import('./pages/configuration/industryType/IndustryType'),
)
const OrganizationType = React.lazy(() =>
  import('./pages/configuration/organization/OrganizationType'),
)
const Paygrade = React.lazy(() =>
  import('./pages/configuration/paygrade/Paygrade'),
)
const ViewPaygrade = React.lazy(() => import('./pages/configuration/paygrade/ViewPaygrade'))
const EditPaygrade = React.lazy(() =>
  import('./pages/configuration/paygrade/EditPaygrade'),
)
const Caste = React.lazy(() => import('./pages/configuration/caste/Caste'))

const Bank = React.lazy(() => import('./pages/configuration/bank/Bank'))
const Designation = React.lazy(() =>
  import('./pages/configuration/designations/Designation'),
)
const Costcenter = React.lazy(() =>
  import('./pages/configuration/costcenter/Costcenter'),
)
const Country = React.lazy(() =>
  import('./pages/configuration/country/Country'),
)
const District = React.lazy(() =>
  import('./pages/configuration/district/District'),
)
const EmploymentType = React.lazy(() =>
  import('./pages/configuration/employmentType/EmploymentType'),
)
const LeavingReason = React.lazy(() =>
  import('./pages/configuration/leavingReason/LeavingReason'),
)
const Relationship = React.lazy(() =>
  import('./pages/configuration/relationship/Relationship'),
)
const Religion = React.lazy(() =>
  import('./pages/configuration/religion/Religion'),
)
const State = React.lazy(() => import('./pages/configuration/state/State'))
const StudyLevel = React.lazy(() =>
  import('./pages/configuration/studyLevel/StudyLevel'),
)
const StudyProgram = React.lazy(() =>
  import('./pages/configuration/studyProgram/StudyProgram'),
)
const Timezone = React.lazy(() =>
  import('./pages/configuration/timezone/Timezone'),
)
const WorkingTime = React.lazy(() =>
  import('./pages/configuration/workingTime/WorkingTime'),
)
const OrganisationChart = React.lazy(() =>
  import('./pages/employee/OrganisationChart'),
)
const EmployeeList = React.lazy(() => import('./pages/employee/EmployeeList'))

const AddEmployee = React.lazy(() => import('./pages/employee/AddEmployee'))
const ViewEmployee = React.lazy(() => import('./pages/employee/ViewEmployee'))
const JobsList=React.lazy(()=>import('./pages/configuration/jobs/Jobs'))
const AddCostCenter = React.lazy(() => import('./pages/configuration/costcenter/AddCostCenter'))
const EditCostCenter = React.lazy(() => import('./pages/configuration/costcenter/EditCostCenter'))

const User = React.lazy(() => import('./pages/administration/user/User'))
const AddUser = React.lazy(() => import('./pages/administration/user/AddUser'))
const ViewUser = React.lazy(() => import('./pages/administration/user/ViewUser'))
const EditUser=React.lazy(()=>import('./pages/administration/user/EditUser'))

const Candidate = React.lazy(() => import('./pages/Onboarding/candidate/Candidate'))
const AddCandidate = React.lazy(() => import('./pages/Onboarding/candidate/AddCandidate'))
const ViewCandidate = React.lazy(() => import('./pages/Onboarding/candidate/ViewCandidate'))
const EditCandidate = React.lazy(() => import('./pages/Onboarding/candidate/AddCandidate'))

const LeaveTypes = React.lazy(() => import('./pages/Leave/leaveTypes/LeaveTypes'))
const AddLeaveTypes = React.lazy(() => import('./pages/Leave/leaveTypes/AddLeaveTypes'))
const EditLeaveTypes = React.lazy(() => import('./pages/Leave/leaveTypes/EditLeaveTypes'))
const ViewLeaveTypes = React.lazy(() => import('./pages/Leave/leaveTypes/ViewLeaveTypes'))


const Leave = React.lazy(() => import('./pages/Leave/leaveRequest/LeaveRequest'))
const AddLeaveRequest = React.lazy(() => import('./pages/Leave/leaveRequest/AddLeaveRequest'))
const EditLeaveRequest = React.lazy(() => import('./pages/Leave/leaveRequest/EditLeaveRequest'))
const ViewLeaveRequest = React.lazy(() => import('./pages/Leave/leaveRequest/ViewLeaveRequest'))

const LeaveAllocation = React.lazy(() => import('./pages/Leave/leaveAllocations/LeaveAllocations'))
const AddLeaveAllocation = React.lazy(() => import('./pages/Leave/leaveAllocations/AddLeaveAllocation'))
const ViewLeaveAllocation = React.lazy(() => import('./pages/Leave/leaveAllocations/ViewLeaveAllocation'))
const EditLeaveAllocation = React.lazy(() => import('./pages/Leave/leaveAllocations/EditLeaveAllocation'))
const EmpProfileUpdate = React.lazy(() => import('./pages/employee/EmpProfileUpdate'))
const EmployeeUpdateProfileList = React.lazy(() => import('./pages/employee/EmployeeUpdateProfileList'))

const MainTypes = React.lazy(() => import('./pages/Leave/mainTypes/MainTypes'))
const AddMainTypes = React.lazy(() => import('./pages/Leave/mainTypes/AddMainTypes'))
const EditMainTypes = React.lazy(() => import('./pages/Leave/mainTypes/EditMainTypes'))
const ViewAccumulation = React.lazy(() => import('./pages/Leave/leaveAccumulation/ViewAccumulation'))


const routes = [
  { path: '/', exact: true, name: 'Home',component: Dashboard },
  { path: '/master/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/master/group', name: 'Group', component: Group, exact: true },
  { path: '/master/company', name: 'Company', component: Company, exact: true },
  {
    path: '/master/location',
    name: 'Location',
    component: Location,
    exact: true,
  },
  {
    path: '/employee/add-employee',
    name: 'Add Employee',
    component: AddEmployee,
    exact: true,
  },
  {
    path: '/employee/edit-employee/:id',
    name: 'Edit Employee',
    component: AddEmployee,
    exact: true,
  },
  {
    path: '/administration/user',
    name: 'User',
    component: User,
    exact: true,
  },
  {
    path: '/administration/add-user',
    name: 'Add User',
    component: AddUser,
    exact: true,
  },
  {
    path: '/administration/view-user/:id',
    name: 'View User',
    component: ViewUser,
    exact: true,
  },
  {
    path: '/administration/edit-user/:id',
    name: 'Edit User',
    component: EditUser,
    exact: true,
  },

   {
    path: '/onboarding/candidates',
    name: 'Candidates',
    component: Candidate,
    exact: true,
  },
   {
    path: '/onboarding/add-candidate/:id?',
    name: 'Add Candidate',
    component: AddCandidate,
    exact: true,
  },
   {
    path: '/onboarding/view-candidate',
    name: 'View Candidate',
    component: ViewCandidate,
    exact: true,
  },
    {
    path: '/onboarding/edit-candidate/:id',
    name: 'Edit Candidate',
    component: EditCandidate,
    exact: true,
  },
   {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPassword,
    exact: true,
  },
   
   {
    path: '/leave/leaveTypes',
    name: 'Leave Types',
    component: LeaveTypes,
    exact: true,
  },
   {
    path: '/leave/add-leaveTypes',
    name: 'Add Leave Types',
    component: AddLeaveTypes,
    exact: true,
  },
   {
    path: '/leave/edit-leaveTypes/:id',
    name: 'Edit Leave Types',
    component: EditLeaveTypes,
    exact: true,
  },
    {
    path: '/leave/view-leaveTypes/:id',
    name: 'View Leave Types',
    component: ViewLeaveTypes,
    exact: true,
  },
   
   {
    path: '/leave/leaveRequest',
    name: 'Leave Request',
    component: Leave,
    exact: true,
  },
  {
    path: '/leave/add-leaveRequest',
    name: " Add Leave Request",
    component: AddLeaveRequest,
    exact:true,
   },
   
  {
    path: '/leave/edit-leaveRequest/:id',
    name: "Edit Leave Request",
    component: EditLeaveRequest,
    exact:true,
  },
  {
    path: '/leave/view-leaveRequest/:id',
    name: "View Leave Request",
    component: ViewLeaveRequest,
    exact:true,
   },
   {
    path: '/leave/leaveAllocation',
    name: 'Leave Allocation',
    component: LeaveAllocation,
    exact: true,
  },
   {
    path: '/leave/add-leaveAllocation',
    name: 'Add Leave Allocation',
    component: AddLeaveAllocation,
    exact: true,
  },
   {
    path: '/leave/edit-leaveAllocation/:id',
    name: 'Edit Leave Allocation',
    component: EditLeaveAllocation,
    exact: true,
  },
   {
    path: '/leave/view-leaveAllocation/:id',
    name: 'View Leave Allocation',
    component: ViewLeaveAllocation,
    exact: true,
  },
  {
path:'/configuration/add-costcenter',
name:'Add Cost Center',
component:AddCostCenter,
exact:true,
  },
  {
    path: '/employee/view-employee/:id',
    name: 'View Employee',
    component: ViewEmployee,
    exact: true,
  },
  {
    path: '/configuration/view-job/:id',
    name: 'View Job',
    component: ViewJob,
    exact: true,
  },
  {
    path: '/configuration/view-costcenter/:id',
    name: 'View Cost Center',
    component: ViewCostCenter,
    exact: true,
  },
    {
    path: '/configuration/edit-costcenter/:id',
    name: 'Edit Cost Center',
    component: EditCostCenter,
    exact: true,
  },


  {
    path: '/master/add-location',
    name: 'Add  location',
    component: AddLocation,
    exact: true,
  },
  {
    path: '/master/edit-location/:id',
    name: 'Edit Location',
    component: EditLocation,
    exact: true,
  },
  {
    path: '/master/view-location/:id',
    name: 'View Location',
    component: ViewLocation,
    exact: true,
  },
  {
    path: '/master/function',
    name: 'Function',
    component: Function,
    exact: true,
  },
  {
    path: '/master/add-function',
    name: 'Add Function',
    component: AddFunction,
    exact: true,
  },

  {
    path: '/master/edit-function/:id',
    name: 'Edit Function',
    component: EditFunction,
    exact: true,
  },
  {
    path: '/master/view-function/:id',
    name: 'View Function',
    component: ViewFunction,
    exact: true,
  },
  {
    path: '/master/add-company',
    name: 'Add Company',
    component: AddCompany,
    exact: true,
  },
  {
    path: '/master/edit-company/:id',
    name: 'Edit Company',
    component: EditCompany,
    exact: true,
  },
  {
    path: '/master/view-company/:id',
    name: 'View Company',
    component: ViewCompany,
    exact: true,
  },
  {
    path: '/master/subFunction',
    name: 'Sub Function',
    component: SubFunction,
    exact: true,
  },
  {
    path: '/master/add-subFunction',
    name: 'Add Sub Function',
    component: AddSubFunction,
    exact: true,
  },
    {
    path: '/master/edit-subFunction/:id',
    name: 'Edit Sub Function',
    component: EditSubFunction,
    exact: true,
  },
  {
    path: '/master/view-subfunction/:id',
    name: 'View Sub Function',
    component: ViewSubfuncation,
    exact: true,
  },
  {
    path: '/configuration/industryType',
    name: 'Industry Type',
    component: IndustryType,
    exact: true,
  },
  {
    path: '/configuration/organizationType',
    name: 'Organization Type',
    component: OrganizationType,
    exact: true,
  },
  {
    path: '/configuration/paygrade',
    name: 'Pay Grade',
    component: Paygrade,
    exact: true,
  },
  {
    path: '/configuration/view-paygrade/:id',
    name: 'View Pay Grade',
    component: ViewPaygrade,
    exact: true,
  },
  {
    path: '/configuration/edit-paygrade/:id',
    name: 'Edit Pay Grade',
    component: EditPaygrade,
    exact: true,
  },
  
  {
    path: '/configuration/caste',
    name: 'Caste',
    component: Caste,
    exact: true,
  },
  
  {
    path: '/configuration/bank',
    name: 'Bank',
    component: Bank,
    exact: true,
  },
  {
    path: '/configuration/designation',
    name: 'Designation',
    component: Designation,
    exact: true,
  },
  {
    path: '/configuration/costcenter',
    name: 'Cost Center',
    component: Costcenter,
    exact: true,
  },
  {
    path: '/configuration/bloodGroup',
    name: 'Blood Group',
    component: BloodGroup,
    exact: true,
  },
  {
    path: '/configuration/country',
    name: 'Country',
    component: Country,
    exact: true,
  },
  {
    path: '/configuration/district',
    name: 'District',
    component: District,
    exact: true,
  },
  {
    path: '/configuration/employmentType',
    name: 'Employment Type',
    component: EmploymentType,
    exact: true,
  },
  {
    path: '/configuration/leavingReason',
    name: 'Leaving Reason',
    component: LeavingReason,
    exact: true,
  },
  {
    path: '/configuration/relationship',
    name: 'Relationship',
    component: Relationship,
    exact: true,
  },
  {
    path: '/configuration/religion',
    name: 'Religion',
    component: Religion,
    exact: true,
  },
  {
    path: '/configuration/state',
    name: 'State',
    component: State,
    exact: true,
  },
  {
    path: '/configuration/studyLevel',
    name: 'Study Level',
    component: StudyLevel,
    exact: true,
  },
  {
    path: '/configuration/studyProgram',
    name: 'Study Program',
    component: StudyProgram,
    exact: true,
  },
  {
    path: '/configuration/timezone',
    name: 'Timezone',
    component: Timezone,
    exact: true,
  },
  {
    path: '/configuration/workingTime',
    name: 'Working Time',
    component: WorkingTime,
    exact: true,
  },
  {
    path: '/employee/employee',
    name: 'Employee',
    component: EmployeeList,
    exact: true,
  },
  {
    path: '/employee/organisation-chart',
    name: 'Organisation Chart',
    component: OrganisationChart,
    exact: true,
  },
  {
    path: '/configuration/jobs',
    name: 'Job',
    component: JobsList,
    exact: true,
  },
  {
    path: '/configuration/add-job',
    name: 'Add Job',
    component: AddJob,
    exact: true,
  },
  {
    path: '/configuration/edit-job/:id',
    name: 'Edit Job',
    component: EditJob,
    exact: true,
  },
  {
    path: '/configuration/view-job/:id',
    name: 'View Job',
    component: ViewJob,
    exact: true,
  },
  {
    path: '/configuration/job-position',
    name: 'Job Position',
    component: JobPosition,
    exact: true,
  },
  {
    path: '/configuration/add-job-position',
    name: 'Add Job Position',
    component: AddJobPosition,
    exact: true,
  },
  {
    path: '/configuration/edit-job-position/:id',
    name: 'Edit Job Position',
    component: EditJobPosition,
    exact: true,
  },
  {
    path: '/configuration/view-job-position/:id',
    name: 'View Job Position',
    component: ViewJobPosition,
    exact: true,
  },
  {
    path: '/configuration/menu',
    name: 'Menu',
    component: ListMenu,
    exact: true,
  },
  {
    path: '/configuration/edit-cus-menu/:id',
    name: 'Edit Menu',
    component: EditMenu,
    exact: true,
  },
  {
    path: '/my/edit-profile/:id',
    name: 'Edit Profile',
    component: EditProfile,
    exact: true,
  },
  {
    path: '/careers/apply-job/:id?',
    name: 'Apply Job',
    component: OnBoardingCareer,
    exact: true,
  },
  {
    path: '/careers/apply-job-level-1info/:id?',
    name: 'Apply Job For Existing User',
    component: OnBoardingExistingCareer,
    exact: true,
  },
  {
    path: '/careers/job-applied/job-success',
    name: 'Job Applied Success',
    component: JobSuccess,
    exact: true,
  },
  {
    path: '/careers/job-applied/job-error',
    name: 'Job Applied Error',
    component: JobError,
    exact: true,
  },
  {
    path: '/careers/update-level-2info/:id?',
    name: 'Update Job Details',
    component: UpdateLevel2Info,
    exact: true,
  },
  {
    path: '/careers/offer-acceptance/:id?/:status?',
    name: 'Update Offer Details',
    component: OfferAcceptance,
    exact: true,
  },
  {
    path: '/careers/offer-success',
    name: 'Offer Applied Success',
    component: OfferSuccess,
    exact: true,
  },
  {
    path: '/leave/accumulation',
    name: 'Carry Forward',
    component: LeaveAccumulationList,
    exact: true,
  },
  {
    path: '/leave/add-accumulation',
    name: 'Add Carry Forward',
    component: AddAccumulation,
    exact: true,
  },
  {
    path: '/leave/edit-accumulation/:id',
    name: 'Edit Carry Forward',
    component: EditAccumulation,
    exact: true,
  },
   {
    path: '/leave/view-accumulation/:id',
    name: 'View Carry Forward',
    component: ViewAccumulation,
    exact: true,
  },
  {
    path: '/employee/self-update/:id/:status',
    name: 'Employee Self Update',
    component: EmpProfileUpdate,
    exact: true,
  },
  {
    // path: '/employee/self-update-list',
    path: '/employee/self-update',
    // name: 'Employee Self Update List',
    name: 'Employee Self Update',
    component: EmployeeUpdateProfileList,
    exact: true,
  },
   {
    path: '/leave/maintypes',
    name: 'Main Types',
    component: MainTypes,
    exact: true,
  },
  {
    path: '/leave/add-maintypes',
    name: 'Add Main Types',
    component: AddMainTypes,
    exact: true,
  },
  {
    path:"/leave/edit-maintypes/:id",
    name: 'Edit Main Types',
    component: EditMainTypes,
    exact: true,
  },
  {
    path:"/onboarding/job-application/:id?",
    name: 'Job Application',
    component: JobApp,
    exact: true,
  },
  
]

export default routes
