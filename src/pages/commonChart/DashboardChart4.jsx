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
 
const DashboardChart4 = () => {
  const options = {
    chart: {
      zoomType: 'xy',
      options3d: {
        enabled: true,
        alpha: 10
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Average Monthly Temperature and Rainfall in Tokyo'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: [{
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}°C',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: 'Temperature',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      }
    }, { // Secondary yAxis
      title: {
        text: 'Rainfall',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      labels: {
        format: '{value} mm',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 100,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        'rgba(255,255,255,0.25)'
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
      name: 'Rainfall',
      type: 'column',
      yAxis: 1,
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      tooltip: {
        valueSuffix: ' mm'
      }

    }, {
      name: 'Temperature',
      type: 'spline',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
      tooltip: {
        valueSuffix: '°C'
      }
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

export default React.memo(DashboardChart4)
