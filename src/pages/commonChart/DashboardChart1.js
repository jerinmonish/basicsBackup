import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CCard, CCardBody, CCardHeader, CCol, CFade, CRow, CButton } from '@coreui/react'
import 'spinkit/spinkit.min.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CLoader from '../loader/CLoader'
import highcharts3d from 'highcharts/highcharts-3d';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, CommonCompanyIdBasedData, GetChartData} from './../../actions/commonAction'
import { convertValueLabel } from '../../utils/helper';
require('highcharts/modules/data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
highcharts3d(Highcharts);
 
const DashboardChart1 = () => {

  const dispatch = useDispatch()
  const dropdownData = useSelector((state) => state.commonData)

  const [companyOptions,setCompanyOptions] = useState([]);
  const [wiseOptions,SetWiseOptions] = useState([]);

  const [cid,SetCid] = useState();
  const [wid,SetWid] = useState({label:'Location',value:'Location'});

  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CompanyDropDownList())
    SetWiseOptions([{ value: "Location", label: "Location" },{ value: "Function", label: "Function" },{ value: "Sub-Function", label: "Sub Function" },{ value: "Reporting-Manager", label: "Reporting Manager" }]);
  }, [!wiseOptions]);

  //To load company data after api hitting
  useEffect(() => {
    setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    SetCid(dropdownData?.companyCommonData?.data?.result?.[0])
    handleGraphData(cid,wid);
  }, [dropdownData?.companyCommonData?.data?.result, !companyOptions])

  const handleCompanyChanges = (e) => {
    SetCid({label:e?.label,value:e?.value});
    handleGraphData(e,wid);
  }

  const handleWiseChanges = (e) => {
    SetWid({label:e?.label,value:e?.value});
    handleGraphData(cid,e);
  }

  const handleGraphData = (cid,wid) => {
    if(cid?.value && wid?.value){
      const formData = {
        params: {
          "kwargs":{
            "company_id": cid?.value,
            "wise": wid?.value
          }
        },
      }
      dispatch(GetChartData(formData));
    }
  }

  const options = {
   chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      options3d: {
          enabled: true,
          alpha: 50,
          beta: 0
    },
    },
    title: {
      text: (dropdownData?.dashboard1ChartData?.total?.total) ? "Total Employee Head Count "+dropdownData?.dashboard1ChartData?.total?.total : 'Employee Head Count' 
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
    },
    credits: {
      enabled: false
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)'
        },
        showInLegend: true,
      }
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
                      "viewFullscreen",
                      "printChart",
                      "separator",
                      "downloadPNG",
                      "downloadJPEG",
                      "downloadPDF",
                      "downloadSVG",
                      //"separator",
                      "downloadCSV",
                      "downloadXLS",
                      //"viewData",
                      //"openInCloud"
                    ]
        }
      }
    },
    series: [{
      name: 'Employee Head Count',
      colorByPoint: true,
      data: (dropdownData?.dashboard1ChartData?.data) ? dropdownData?.dashboard1ChartData?.data : [] 
    }]
  }

  return (
    <>
      <div className="row form-group">
        <div className="col-md-4">
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder={'Choose a Company'}
            value={cid}
            name="company_id"
            options={companyOptions}
            onChange={(e) => handleCompanyChanges(e)}
          />
        </div>
        <div className="col-md-4">
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder={'Choose Wise'}
            value={wid}
            name="wise_id"
            options={wiseOptions}
            onChange={(e) => handleWiseChanges(e)}
          />
        </div>
      </div>
    
      <Suspense fallback={CLoader}>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'chart'}
          options={options}
        />
      </Suspense>
    </>
  )
}

export default React.memo(DashboardChart1)
