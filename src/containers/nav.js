import React from 'react'
import CIcon from '@coreui/icons-react'

const nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/master/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Employee',
    route: '#',
    icon: 'cil-people',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee Profile',
        to: '/employee/employee',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Organisation Chart',
        to: '/employee/organisation-chart',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Masters',
    route: '#',
    icon: 'cil-spreadsheet',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Group',
        to: '/master/group',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Company',
        to: '/master/company',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Locations',
        to: '/master/location',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Functions',
        to: '/master/function',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Sub Functions',
        to: '/master/subFunction',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Configurations',
    route: '#',
    icon: 'cil-settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Jobs',
        to: '/configuration/jobs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Job Position',
        to: '/configuration/job-position',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Organization Type',
        to: '/configuration/organizationType',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Industry Type',
        to: '/configuration/industryType',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Location Code',
      //   to: '#',
      // },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pay Grade',
        to: '/configuration/paygrade',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Caste',
        to: '/configuration/caste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Designations',
        to: '/configuration/designation',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Bank',
        to: '/configuration/bank',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Role',
      //   to: '#',
      // },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cost Center',
        to: '/configuration/CostCenter',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Blood Group',
        to: '/configuration/bloodGroup',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Religion',
        to: '/configuration/religion',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Relationship',
        to: '/configuration/relationship',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Study Level',
        to: '/configuration/studyLevel',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Study Program',
        to: '/configuration/StudyProgram',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Employment Type',
        to: '/configuration/employmentType',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leaving Reason',
        to: '/configuration/leavingReason',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Menu',
        to: '/configuration/menu',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Time zone',
        to: '/configuration/timezone',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Working Time',
        to: '/configuration/workingTime',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Country',
        to: '/configuration/country',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'State',
        to: '/configuration/state',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'District',
        to: '/configuration/district',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Administration',
    route: '#',
    icon: 'cil-gears',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'User',
        to: '/administration/user',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Onboarding',
    route: '#',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Candidates',
        to: '/onboarding/candidates',
      },
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Leave',
    route: '#',
    icon: 'cil-drop',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Types',
        to: '/leave/leaveTypes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Request ',
        to: '/leave/leaveRequest',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Allocation',
        to: '/leave/leaveAllocation',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Main Type',
        to: '/leave/maintypes',
      },
    ],
    
  },
  /*{
    _tag: 'CSidebarNavTitle',
    _children: ['Theme']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Base',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cards',
        to: '/base/cards',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Collapse',
        to: '/base/collapses',
      },
      /*
      {
        name: 'Dropdowns',
        to: '/base/dropdowns',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Jumbotron',
        to: '/base/jumbotrons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Navs',
        to: '/base/navs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Navbars',
        to: '/base/navbars',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '/base/progress-bar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Switches',
        to: '/base/switches',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Buttons',
    route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Brand buttons',
        to: '/buttons/brand-buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Dropdowns',
        to: '/buttons/button-dropdowns',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'CRUD',
    route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'CREATE',
        to: '/buttons/buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'EDIT',
        to: '/buttons/brand-buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'DELETE',
        to: '/buttons/button-groups',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie'
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Editors',
    route: '/editors',
    icon: 'cil-code',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Code Editors',
        to: '/editors/code-editors',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Rich Text Editor',
        to: '/editors/text-editors',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Forms',
    route: '/forms',
    icon: 'cil-notes',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Basic Forms',
        to: '/forms/basic-forms',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Advanced Forms',
        to: '/forms/advanced-forms',
        badge: {
          color: 'danger',
          text: 'PRO'
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Validation',
        to: '/forms/validation-forms',
        badge: {
          color: 'danger',
          text: 'PRO'
        }
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Google Maps',
    to: '/google-maps',
    icon: 'cil-map',
    badge: {
      color: 'danger',
      text: 'PRO'
    }
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Icons',
    route: '/icons',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Notifications',
    route: '/notifications',
    icon: 'cil-bell',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Toaster',
        to: '/notifications/toaster'
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Plugins',
    route: '/plugins',
    icon: 'cil-input-power',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Calendar',
        to: '/plugins/calendar',
        badge: {
          color: 'danger',
          text: 'PRO'
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Draggable',
        to: '/plugins/draggable',
        badge: {
          color: 'danger',
          text: 'PRO'
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Spinners',
        to: '/plugins/spinners',
        badge: {
          color: 'danger',
          text: 'PRO'
        }
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Tables',
    route: '/tables',
    icon: 'cil-list',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Basic Tables',
        to: '/tables/tables',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Advanced Tables',
        to: '/tables/advanced-tables'
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Widgets',
    to: '/widgets',
    icon: 'cil-calculator',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Extras'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Disabled',
    icon: 'cil-ban',
    badge: {
      color: 'secondary',
      text: 'NEW',
    },
    addLinkClass: 'c-disabled',
    'disabled': true
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Apps',
    route: '/apps',
    icon: 'cil-layers',
    _children: [
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Invoicing',
        route: '/apps/invoicing',
        icon: 'cil-spreadsheet',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Invoice',
            to: '/apps/invoicing/invoice',
            badge: {
              color: 'danger',
              text: 'PRO'
            }
          }
        ]
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Email',
        route: '/apps/email',
        icon: 'cil-envelope-open',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Inbox',
            to: '/apps/email/inbox',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Message',
            to: '/apps/email/message',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Compose',
            to: '/apps/email/compose',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
        ],
      },
    ]
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Labels']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label danger',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-danger'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label info',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-info'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label warning',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-warning'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }*/
]

export default nav
