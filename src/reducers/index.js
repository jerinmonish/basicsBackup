import { combineReducers } from 'redux'
import userLogin from './userLogin'
import changeState from './changeState'
import masterBackend from './masterBackend'
import commonData from './commonData'
import configurationBackend from './configurationBackend'
import administrationBackend from './administrationBackend'
import onboardingBackend from './onboardingBackend'
import leaveBackend from './leaveBackend'
export default combineReducers({
  userLogin,
  changeState,
  masterBackend,
  commonData,
  configurationBackend,
  administrationBackend,
  onboardingBackend,
  leaveBackend
})
