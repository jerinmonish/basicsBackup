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
 
const DashboardChart3 = () => {
  const options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Contents of Highsoft\'s weekly fruit delivery'
    },
    subtitle: {
      text: '3D donut in Highcharts'
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["printChart",
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
      name: 'Delivered amount',
      data: [
        ['Bananas', 8],
        ['Kiwi', 3],
        ['Mixed nuts', 1],
        ['Oranges', 6],
        ['Apples', 8],
        ['Pears', 4],
        ['Clementines', 4],
        ['Reddish (bag)', 1],
        ['Grapes (bunch)', 1]
      ]
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

export default React.memo(DashboardChart3)
