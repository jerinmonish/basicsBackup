import React, { Suspense } from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CCard, CCardBody, CCardHeader, CCol, CFade, CRow, CButton } from '@coreui/react'
import 'spinkit/spinkit.min.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CLoader from '../loader/CLoader'
import highcharts3d from 'highcharts/highcharts-3d';
require('highcharts/modules/data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
highcharts3d(Highcharts);
 
const DashboardChart2 = () => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 0
      },
    },
    title: {
      text: 'Browser market shares in January, 2018'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
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
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true
      }, {
        name: 'Internet Explorer',
        y: 11.84
      }, {
        name: 'Firefox',
        y: 10.85
      }, {
        name: 'Edge',
        y: 4.67
      }, {
        name: 'Safari',
        y: 4.18
      }, {
        name: 'Sogou Explorer',
        y: 1.64
      }, {
        name: 'Opera',
        y: 1.6
      }, {
        name: 'QQ',
        y: 1.2
      }, {
        name: 'Other',
        y: 2.61
      }]
    }]
  }
  return (
    <Suspense fallback={CLoader}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </Suspense>
  )
}

export default React.memo(DashboardChart2)
