import React, { Component } from 'react';
import OrgChart from './OrgChartStructure/orgcharttree';
import { EmployeeUserList } from '../../actions/master';
import axios from 'axios';
import * as constants from '../../actions/types'
import { getToken } from '../../utils/helper'
import CLoader from '../loader/CLoader'
import Select from 'react-select'
export default class OrganisationChart extends Component {
    constructor(props) {
        super(props);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.state = {
          error: null,
          isLoaded: true,
          isLdng:true,
          groupData:[],
          chartItems: [{ id: "1", name: "Jack Hill", title: "Chairman and CEO", email: "amber@domain.com", img: "https://cdn.balkan.app/shared/1.jpg" }],
          chartTags: [],
          dropDownName:[]
        };
    }
    async componentDidMount(){
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${getToken()}`,
      }
      try {
        /*To load All the Groups Starts*/
        const queryparams = {
            params: {
              query: '{id,name}',
              isDropdown: 1,
            },
          }
        await axios .post(constants.BASE_URL+'/res.group', queryparams, { headers: headers})
        .then((lgres) => {
          this.setState({
            groupData: lgres?.data?.result?.data?.result,
            dropDownName: this.state.groupData[0]
          });
        });
        /*To load All the Groups Ends*/

        /*To load Organisation Tree Starts*/
        if(this.state.groupData.length > 0){
          // console.log(this.state.groupData[0].value);
          const paData = {
              "params":{
                "kwargs":{
                  "group_id": this.state.groupData[0].value
                }
              }
            }
          await axios .post(constants.BASE_URL+'/hr.employee/get_organization_chart_data', paData, { headers: headers})
          .then((lgres) => {
            this.setState({
              isLoaded: false,
              chartItems: lgres?.data?.result,
              chartTags: lgres?.data?.tags,
              dropDownName: this?.state?.groupData[0]
            });
          });
        }
        /*To load Organisation Tree Ends*/
      } catch (error) {
        this.setState({
          isLoaded: false,
          error: error,
          dropDownName: this?.state?.groupData ? this?.state?.groupData[0] : ''
        });
        console.log(error);
      }
    }

    async handleGroupChange(e) {
      if(e?.value){
        this.setState({
          isLoaded: true,
          chartItems: [],
          chartTags: [],
          dropDownName: [{value:e?.value,label:e?.label}]
        });
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${getToken()}`,
          'error_code':400
        }
        const paData = {
          "params":{
            "kwargs":{
              "group_id": e?.value
            }
          }
        }
        await axios.post(constants.BASE_URL+'/hr.employee/get_organization_chart_data', paData, { headers: headers}).then((lgres) => {
          if(lgres?.data?.result?.result?.length == undefined || lgres?.data?.result?.result?.length == 0){
            this.setState({
              isLoaded: false,
              chartItems: [{ id: "1", name: "Jack Hill", title: "Chairman and CEO", email: "amber@domain.com", img: "https://cdn.balkan.app/shared/1.jpg" }],
              chartTags: [{template: "ula"}],
              // dropDownName: [{value:1,label:'Yes'}]
            });
          } else {
            this.setState({
              isLoaded: false,
              chartItems: lgres?.data?.result,
              chartTags: lgres?.data?.tags
            });
          }
        });
      }
    }
  
  //  margin: 15px 500px 2px;

    render() {
        return (
          <>
          <span className='col-md-4 mt-2 mb-2' style={{flex:'none'}}>
            <Select
              placeholder='Choose Group'
              value={this.state.dropDownName}
              name="frontend_menu"
              options={this.state.groupData}
              loading={this.state.isLdng == true ? 'loading' : ''}
              onChange={(e) => this.handleGroupChange(e)}
            />
          </span>
            <div style={{height: '100%'}}>
              {
                (!this.state.isLoaded /*&& this.state.chartItems?.result?.length > 0 && this.state.chartItems?.result?.length == undefined*/) ? <OrgChart nodes={this.state.chartItems} /> : <CLoader />
              }
            </div>
          </>
            
        );
    }
}