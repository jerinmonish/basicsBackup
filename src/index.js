import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import store from './store'
import Login from './components/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import ResetPassword from 'src/components/ResetPassword';
import OnBoardingCareer from './pages/career/OnBoardingCareer';
import OnBoardingExistingCareer from './pages/career/OnBoardingExistingCareer';
import JobSuccess from './pages/Onboarding/candidate/JobSuccess';
import JobError from './pages/Onboarding/candidate/JobError';
import OfferSuccess from './pages/Onboarding/candidate/OfferSuccess';
import UpdateLevel2Info from './pages/career/UpdateLevel2Info';
import UpdateLevel3Info from './pages/career/UpdateLevel3Info';
import OfferAcceptance from './pages/career/OfferAcceptance';
React.icons = icons
ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/reset-password/:id?" name="Reset Password"  exact={true} component={ResetPassword}/> 
          <Route path="/careers/apply-job/:id?" name="Apply Job"  exact={true} component={OnBoardingCareer}/> 
          <Route path="/careers/apply-job-level-1info/:id?" name="Apply Job For Existing User"  exact={true} component={OnBoardingExistingCareer}/> 
          <Route path="/careers/update-level-2info/:id?" name="Update Job Details"  exact={true} component={UpdateLevel2Info}/> 
          <Route path="/careers/update-level-3info/:id?" name="Update Job Details"  exact={true} component={UpdateLevel3Info}/> 
          <Route path="/careers/offer-acceptance/:id?/:status?" name="Update Offer Details"  exact={true} component={OfferAcceptance}/> 
          <Route path="/careers/job-applied/job-success" name="Job Applied Success"  exact={true} component={JobSuccess}/> 
          <Route path="/careers/job-applied/job-error" name="Job Applied Error"  exact={true} component={JobError}/>
          <Route path="/careers/offer-success" name="Offer Applied Success"  exact={true} component={OfferSuccess}/> 
          <PrivateRoutes path="/" component={App} />
        </Switch>
        </BrowserRouter>
      </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
