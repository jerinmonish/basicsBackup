import React, { Component } from 'react';
import OrgChart from '@balkangraph/orgchart.js';

export default class extends Component {

    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
      // console.log(this.props.nodes.result);
      // console.log(this.props.nodes.tags);
      OrgChart.toolbarUI.layoutIcon = '<img width="32" src=https://cdn.balkan.app/shared/layout.png />'; 
        this.chart = new OrgChart (this.divRef.current , {
          tags: this?.props?.nodes?.tags ? this.props.nodes.tags : {},
          nodes: this?.props?.nodes?.result,
          //  "tags": {
          //     "Chief_Executive_Officer": {
          //       "template": "ula"
          //     },
          //     "Chief_Technical_Officer": {
          //       "template": "ula"
          //     },
          //     "Consultant": {
          //       "template": "ula"
          //     },
          //     "Experienced_Developer": {
          //       "template": "ula"
          //     },
          //     "Human_Resources_Manager": {
          //       "template": "ula"
          //     },
          //     "Managing_Product_sales": {
          //       "template": "ula"
          //     },
          //     "Managing_Product_sales_test": {
          //       "template": "ula"
          //     },
          //     "Marketing_and_Community_Manager": {
          //       "template": "ula"
          //     },
          //     "PHP_Developer": {
          //       "template": "ula"
          //     },
          //     "Trainee": {
          //       "template": "ula"
          //     }
          //   },
          template: 'ula',
          // roots: [9],
          mouseScrool: OrgChart.none,
          layout: OrgChart.mixed,
          enableSearch: false,
          editForm: {
            generateElementsFromFields: false,
            elements: [
              { type: 'textbox', label: 'Full Name', binding: 'name'},
              { type: 'textbox', label: 'Title', binding: 'title'},
              { type: 'textbox', label: 'Email', binding: 'email'},
              { type: 'textbox', label: 'Department', binding: 'department'},
            ],
            buttons: {
                edit: null,
                share: null,
                pdf: {
                  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.819 14.427c.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12h.496c.474 0 .803.173.916.644zm3.091-8.65c2.047-.479 4.805.279 6.09 1.179-1.494-1.997-5.23-5.708-7.432-6.882 1.157 1.168 1.563 4.235 1.342 5.703zm-7.457 7.955h-.546v.943h.546c.235 0 .467-.027.576-.227.067-.123.067-.366 0-.489-.109-.198-.341-.227-.576-.227zm13.547-2.732v13h-20v-24h8.409c4.858 0 3.334 8 3.334 8 3.011-.745 8.257-.42 8.257 3zm-12.108 2.761c-.16-.484-.606-.761-1.224-.761h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.094-.292.094-.597 0-.885zm3.407-.303c-.297-.299-.711-.458-1.199-.458h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.554-.659.586-2.035-.063-2.693zm3.701-.458h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784z"/></svg>',
                  text: 'Download PDF'
                },
                addmore: {
                  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
                  text: 'Go To Linked In'
                },
                addTwittermore: {
                  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>',
                  text: 'Go To Linked In'
                }
            },
          },
          // collapse: {level: 2, allChildren: false},
          // expand: {nodes: [9], allChildren: false},
          nodeBinding: {
              img_0: "img",
              field_0: "name",
              field_1: "title",
              field_2: "email",
              field_3: "department"
            }
        });
    }

    render() {
        return (
            <div id="tree" ref={this.divRef}></div>
        );
    }
}