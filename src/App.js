import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch,Route } from 'react-router-dom'
import './scss/style.scss'
import classNames from 'classnames'
import CusHeader from './components/Layouts/CusHeader'
import CusSidebar from './components/Layouts/CusSidebar'
import CusFooter from './components/Layouts/CusFooter'
import PrivateRoutes from './routes/PrivateRoutes'
import AddLocation from './pages/location/AddLocation'
import EditJob from './pages/configuration/jobs/EditJob'
import ViewJob from './pages/configuration/jobs/ViewJob'
import JobPosition from './pages/configuration/jobPosition/JobPosition'
import AddJobPosition from './pages/configuration/jobPosition/AddJobPosition'
import EditJobPosition from './pages/configuration/jobPosition/EditJobPosition'
import ViewJobPosition from './pages/configuration/jobs/ViewJobPosition'
import ListMenu from './pages/configuration/menu/ListMenu'
import EditMenu from './pages/configuration/menu/EditMenu'
import EditProfile from './pages/profile/EditProfile';
import EmpProfileUpdate from './pages/employee/EmpProfileUpdate';
import LeaveAccumulationList from './pages/Leave/leaveAccumulation/LeaveAccumulationList';
import AddAccumulation from './pages/company/AddAccumulation';
import EditAccumulation from './pages/Leave/leaveAccumulation/EditAccumulation';
import JobApp from './pages/JobApplication/JobApp';



// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Pages

const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
/*const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));

// Email App
const TheEmailApp = React.lazy(() => import('./views/apps/email/TheEmailApp')); */

// Containers
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Group = React.lazy(() => import('./pages/Group/Group'))
const Company = React.lazy(() => import('./pages/company/Company'))
const EditCompany = React.lazy(() => import('./pages/company/EditCompany'))
const ViewCompany = React.lazy(() => import('./pages/company/ViewCompany'))
const AddCompany = React.lazy(() => import('./pages/company/AddCompany'))
const Function = React.lazy(() => import('./pages/function/Function'))
const AddFunction = React.lazy(() => import('./pages/function/AddFunction'))
const EditFunction = React.lazy(() => import('./pages/function/EditFunction'))
const ViewFunction = React.lazy(() => import('./pages/function/ViewFunction'))
const Loader = React.lazy(() => import('./pages/loader/CLoader'))
const Location = React.lazy(() => import('./pages/location/Location'))
const EditLocation = React.lazy(() => import('./pages/location/EditLocation'))
const ViewLocation = React.lazy(() => import('./pages/location/ViewLocation'))
const SubFunction = React.lazy(() => import('./pages/subFunction/SubFunction'))
const ViewSubfunction = React.lazy(() =>
  import('./pages/subFunction/ViewSubfuncation'),
)
const AddSubFunction = React.lazy(() =>
  import('./pages/subFunction/AddSubFunction'),
)
const EditSubFunction = React.lazy(() =>
  import('./pages/subFunction/EditSubFunction'),
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

const AddPaygrade = React.lazy(() =>
  import('./pages/configuration/paygrade/AddPaygrade'),
)
const Caste = React.lazy(() => import('./pages/configuration/caste/Caste'))
const Bank = React.lazy(() => import('./pages/configuration/bank/Bank'))
const Designation = React.lazy(() =>
  import('./pages/configuration/designations/Designation'),
)
const EditDesignation = React.lazy(() =>
  import('./pages/configuration/designations/EditDesignation'),
)
const EditPaygrade = React.lazy(() =>
  import('./pages/configuration/paygrade/EditPaygrade'),
)


const Costcenter = React.lazy(() =>
  import('./pages/configuration/costcenter/Costcenter'),
)

const AddCostCenter = React.lazy(() => import('./pages/configuration/costcenter/AddCostCenter'))
const EditCostCenter= React.lazy(()=> import('./pages/configuration/costcenter/EditCostCenter'))

const BloodGroup = React.lazy(() =>
  import('./pages/configuration/bloodGroup/BloodGroup'),
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
const ViewEmployee=React.lazy(()=>import('./pages/employee/ViewEmployee'))
const AddDesignation=React.lazy(()=> import('./pages/configuration/designations/AddDesignation'))
const JobsList=React.lazy(()=>import('./pages/configuration/jobs/Jobs'))
const AddJobs=React.lazy(()=>import('./pages/configuration/jobs/AddJob'))

const ViewPaygrade = React.lazy(() => import('./pages/configuration/paygrade/ViewPaygrade'))
const ViewCostCenter = React.lazy(() => import('./pages/configuration/costcenter/ViewCostCenter'))

const User = React.lazy(() => import('./pages/administration/user/User'))
const AddUser = React.lazy(() => import('./pages/administration/user/AddUser'))
const ViewUser = React.lazy(() => import('./pages/administration/user/ViewUser'))
const EditUser = React.lazy(() => import('./pages/administration/user/EditUser'))

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
const EmployeeUpdateProfileList = React.lazy(() => import('./pages/employee/EmployeeUpdateProfileList'))

 const MainTypes = React.lazy(() => import('./pages/Leave/mainTypes/MainTypes'))
const AddMainTypes = React.lazy(() => import('./pages/Leave/mainTypes/AddMainTypes'))
const EditMainTypes = React.lazy(() => import('./pages/Leave/mainTypes/EditMainTypes'))
const ViewAccumulation = React.lazy(() => import('./pages/Leave/leaveAccumulation/ViewAccumulation'))
// import ViewAccumulation from './pages/Leave/leaveAccumulation/EditAccumulation';



// class App extends Component {
  toast.configure()
const App = () => {
  const darkMode = useSelector((state) => state.darkMode)
  const classes = classNames(
    'c-app c-default-layout',
    darkMode && 'c-dark-theme',
  )

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <div className={classes}>
          <CusSidebar />
          <div className="c-wrapper">
            <CusHeader />
            <div className="c-body">
              <Switch>
                {/* <Route exact path="/" name="Login Page" render={props => <Login {...props}/>} /> */}
                {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
<Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
<Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
<Route path="/apps/email" name="Email App" render={props => <TheEmailApp {...props}/>} /> */}

                <PrivateRoutes
                  exact
                  path="/master/dashboard"
                  name="Dashboard"
                  component={(props) => <Dashboard {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/administration/user"
                  name="User"
                  component={(props) => <User {...props} />}
                />
                 <PrivateRoutes
                  exact
                  path="/administration/add-user"
                  name="Add User"
                  component={(props) => <AddUser {...props} />}
                />
                 <PrivateRoutes
                  exact
                  path="/administration/view-user/:id"
                  name="View User"
                  component={(props) => <ViewUser {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/administration/edit-user/:id"
                  name="Edit User"
                  component={(props) => <EditUser {...props} />}
                />

                <PrivateRoutes
                  exact
                  path="/onboarding/candidates"
                  name="Candidate"
                  component={(props) => <Candidate {...props} />}
                />

                 <PrivateRoutes
                  exact
                  path="/onboarding/add-candidate/:id?"
                  name="Add Candidate"
                  component={(props) => <AddCandidate {...props} />}
                />
               
                  <PrivateRoutes
                  exact
                  path="/onboarding/view-candidate/:id"
                  name="View Candidate"
                  component={(props) => <ViewCandidate {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/onboarding/edit-candidate/:id"
                  name="Edit Candidate"
                  component={(props) => <EditCandidate {...props} />}
                />

                <PrivateRoutes
                  exact
                  path="/leave/leaveTypes"
                  name="Leave Types"
                  component={(props) => <LeaveTypes {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/leave/add-leaveTypes"
                  name="Add Leave Types"
                  component={(props) => <AddLeaveTypes {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/leave/edit-leaveTypes/:id"
                  name="Edit  Leave Types"
                  component={(props) => <EditLeaveTypes {...props} />}
                />

                <PrivateRoutes
                  exact
                  path="/leave/view-leaveTypes/:id"
                  name="View Leave Types"
                  component={(props) => <ViewLeaveTypes {...props} />}
                />

                <PrivateRoutes
                  exact
                  path="/leave/leaveRequest"
                  name="Leave Request"
                  component={(props) => <Leave {...props} />}
                />

                <PrivateRoutes
                  exact
                  path="/leave/add-leaveRequest"
                  name="Add Leave Request"
                  component={(props) => <AddLeaveRequest {...props} />}
                />
                 <PrivateRoutes
                  exact
                  path="/leave/edit-leaveRequest/:id"
                  name="Edit Leave Request"
                  component={(props) => <EditLeaveRequest {...props} />}
                />

                 <PrivateRoutes
                  exact
                  path="/leave/view-leaveRequest/:id"
                  name="View  Leave Request"
                  component={(props) => <ViewLeaveRequest {...props} />}
                />


                <PrivateRoutes
                  exact
                  path="/leave/leaveAllocation"
                  name="Leave Allocation"
                  component={(props) => <LeaveAllocation {...props} />}
                />

                 <PrivateRoutes
                  exact
                  path="/leave/add-leaveAllocation"
                  name="Add Leave Allocation"
                  component={(props) => <AddLeaveAllocation {...props} />}
                />

                 <PrivateRoutes
                  exact
                  path="/leave/view-leaveAllocation/:id"
                  name="View  Leave Allocation"
                  component={(props) => <ViewLeaveAllocation {...props} />}
                />

                 <PrivateRoutes
                  exact
                  path="/leave/edit-leaveAllocation/:id"
                  name="Edit Leave Allocation"
                  component={(props) => <EditLeaveAllocation {...props} />}
                />
{/* 
                  <PrivateRoutes
                  exact
                  path="/resetpassword"
                  name="Dashboard"
                  component={(props) => <ResetPassword {...props} />}
                /> */}

               

                <PrivateRoutes
                  exact
                  path="/master/group"
                  name="Group"
                  component={(props) => <Group {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/company"
                  name="Company"
                  component={(props) => <Company {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/add-company"
                  name="Add Company"
                  component={(props) => <AddCompany {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/edit-company/:id?"
                  name="Edit Company"
                  component={(props) => <EditCompany {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/view-company/:id?"
                  name="View Company"
                  component={(props) => <ViewCompany {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/view-paygrade/:id"
                  name="View Pay Grade"
                  component={(props) => <ViewPaygrade {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/view-costcenter/:id"
                  name="View Cost center"
                  component={(props) => <ViewCostCenter {...props} />}
                />
                 <PrivateRoutes
                  exact
                  path="/configuration/edit-costcenter/:id"
                  name="Edit Cost center"
                  component={(props) => <EditCostCenter{...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/location"
                  name="Location"
                  component={(props) => <Location {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/function"
                  name="Function"
                  component={(props) => <Function {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/add-function"
                  name="Add Function"
                  component={(props) => <AddFunction {...props} />}
                />

               <PrivateRoutes
                  exact
                  path="/configuration/add-designation"
                  name="add  Designation"
                  component={(props) => <AddDesignation {...props} />}
                />

               <PrivateRoutes
                  exact
                  path="/configuration/edit-designation/:id"
                  name="Edit  Designation"
                  component={(props) => <EditDesignation {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/edit-paygrade/:id"
                  name="Edit Pay Grade"
                  component={(props) => <EditPaygrade {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/edit-function/:id?"
                  name="Edit Function"
                  component={(props) => <EditFunction {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/view-function/:id?"
                  name="View Function"
                  component={(props) => <ViewFunction {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/add-location"
                  name="Location"
                  component={(props) => <AddLocation {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/edit-location/:id?"
                  name=" Edit -Location"
                  component={(props) => <EditLocation {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/view-location/:id?"
                  name="View location"
                  component={(props) => <ViewLocation {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/subFunction"
                  name="Sub Function"
                  component={(props) => <SubFunction {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/add-subFunction"
                  name="Add Sub Function"
                  component={(props) => <AddSubFunction {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/edit-subfunction/:id?"
                  name=" Edit Sub Function"
                  component={(props) => <EditSubFunction {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/master/view-subfunction/:id?"
                  name="View Sub Function"
                  component={(props) => <ViewSubfunction {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/industryType"
                  name="Industry Type"
                  component={(props) => <IndustryType {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/organizationType"
                  name="Organization Type"
                  component={(props) => <OrganizationType {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/paygrade"
                  name="Pay Grade"
                  component={(props) => <Paygrade {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/add-paygrade"
                  name="Add Pay Grade"
                  component={(props) => <AddPaygrade {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/caste"
                  name="Caste"
                  component={(props) => <Caste {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/bank"
                  name="Bank"
                  component={(props) => <Bank {...props} />}
                />

                <PrivateRoutes
                  exact
                  path="/configuration/designation"
                  name="Designation"
                  component={(props) => <Designation {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/CostCenter"
                  name="Cost center"
                  component={(props) => <Costcenter {...props} />}
                />
                <PrivateRoutes
                exact
                path='/configuration/add-costcenter'
                name="Add Cost Center"
                component={(props)=><AddCostCenter{...props}/>}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/bloodGroup"
                  name="Blood Group"
                  component={(props) => <BloodGroup {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/country"
                  name="Country"
                  component={(props) => <Country {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/district"
                  name="District"
                  component={(props) => <District {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/employmentType"
                  name="Employment Type"
                  component={(props) => <EmploymentType {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/leavingReason"
                  name="Leaving Reason"
                  component={(props) => <LeavingReason {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/relationship"
                  name="Relationship"
                  component={(props) => <Relationship {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/studyLevel"
                  name="Study Level"
                  component={(props) => <StudyLevel {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/religion"
                  name="Religion"
                  component={(props) => <Religion {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/state"
                  name="State"
                  component={(props) => <State {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/StudyProgram"
                  name="Study Program"
                  component={(props) => <StudyProgram {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/timezone"
                  name="Timezone"
                  component={(props) => <Timezone {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/workingTime"
                  name="Working Time"
                  component={(props) => <WorkingTime {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/employee/employee"
                  name="Employee"
                  component={(props) => <EmployeeList {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/employee/add-employee"
                  name="Add Employee"
                  component={(props) => <AddEmployee {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/employee/edit-employee/:id?"
                  name="Edit Employee"
                  component={(props) => <AddEmployee {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/employee/view-employee/:id"
                  name=" View Employee"
                  component={(props) => <ViewEmployee {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/employee/organisation-chart"
                  name="OrganisationChart"
                  component={(props) => <OrganisationChart {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/jobs"
                  name="Job"
                  component={(props) => <JobsList {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/add-job"
                  name="Add Job"
                  component={(props) => <AddJobs {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/edit-job/:id?"
                  name="Edit Job"
                  component={(props) => <EditJob {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/view-job/:id?"
                  name="Edit Job"
                  component={(props) => <ViewJob {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/job-position"
                  name="Job Position"
                  component={(props) => <JobPosition {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/add-job-position"
                  name="Add Job Position"
                  component={(props) => <AddJobPosition {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/edit-job-position/:id?"
                  name="Edit Job"
                  component={(props) => <EditJobPosition {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/view-job-position/:id?"
                  name="View Job"
                  component={(props) => <ViewJobPosition {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/menu"
                  name="View Job"
                  component={(props) => <ListMenu {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/configuration/edit-cus-menu/:id?"
                  name="View Menu"
                  component={(props) => <EditMenu {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/my/edit-profile/:id?"
                  name="Edit Profile"
                  component={(props) => <EditProfile {...props} />}
                />

                {/* to={'/employee/self-update/' + encryptSingleData(empData.employee_id) + '/create'} */}
                {/* /employee/self-update/MTIyMzU0MTI1NDI1/create */}
                <PrivateRoutes
                  exact
                  path="/employee/self-update/:id/:status"
                  // name="Employee Self Update"
                  // name="Edit Employee Profile And Family Details"
                  component={(props) => <EmpProfileUpdate {...props} />}
                />
                <PrivateRoutes
                  exact
                  // path="/employee/self-update-list"
                  path="/employee/self-update"
                  name="Employee Self Update"
                  component={(props) => <EmployeeUpdateProfileList {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/leave/accumulation"
                  name="Leave Accumulation"
                  component={(props) => <LeaveAccumulationList {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/leave/add-accumulation"
                  name="Add Leave Accumulation"
                  component={(props) => <AddAccumulation {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/leave/edit-accumulation/:id"
                  name="Edit Leave Accumulation"
                  component={(props) => <EditAccumulation {...props} />}
                />
                <PrivateRoutes
                  exact
                  path="/leave/view-accumulation/:id"
                  name="View Leave Accumulation"
                  component={(props) => <ViewAccumulation {...props} />}
                />

                  <PrivateRoutes
                  exact
                  path="/leave/maintypes"
                  name="Main Types"
                  component={(props) => <MainTypes {...props} />}
                />

                <PrivateRoutes
                  exact
                  path="/leave/add-maintypes"
                  name=" Add Main Types"
                  component={(props) => <AddMainTypes {...props} />}
                />

                <PrivateRoutes
                  exact
                  path="/leave/edit-maintypes/:id"
                  name="Edit Main Types"
                  component={(props) => <EditMainTypes {...props} />}
                />

                <PrivateRoutes
                  exact
                  path="/onboarding/job-application/:id"
                  name="Job Application"
                  component={(props) => <JobApp {...props} />}
                />

                {/* <Route path='*' name="Page 500" render={props => <Page500 {...props}/>} /> */}
              </Switch>
            </div>
            <CusFooter />
          </div>
        </div>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
