import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['PAGES']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All Pages',
    to: '/page/allpages',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Create Page',
    to: '/page/createpage',
    icon: 'cil-pencil',
  },
    {
    _tag: 'CSidebarNavItem',
    name: 'Page Archives',
    icon: 'cil-ban',
    badge: {
      color: 'secondary',
      text: 'NEW',
    },
    addLinkClass: 'c-disabled',
    'disabled': true
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['PRODUCTS']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Product Cateogries',
    route: '/categories',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Categories',
        to: '/categories/allcategories',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Category',
        to: '/category/createcategory',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Carousel',
        to: '/base/carousels',
      },
    
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Products',
    route: '/product',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Products',
        to: '/product/allproducts',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'New Product',
        to: '/product/createproduct',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Update Products',
        to: '/product/updatelistings',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Delete Products',
        to: '/product/archivelistings',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Statistics',
    route: '/icons',
    icon: 'cil-star',
    badge: {
          color: 'success',
          text: 'NEW',
        },
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Visitors',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: ' Users',
        to: '/icons/flags',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Orders',
        to: '/icons/brands',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Boutiques',
        to: '/icons/brands',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Agents',
        to: '/icons/brands',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Reviews',
        to: '/icons/brands',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Promotions',
        to: '/icons/brands',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Boutiques',
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
    _tag: 'CSidebarNavItem',
    name: 'Promotions',
    to: '/widgets/all',
    icon: 'cil-calculator',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
    {
    _tag: 'CSidebarNavItem',
    name: 'Product Archives',
    icon: 'cil-ban',
    badge: {
      color: 'secondary',
      text: 'NEW',
    },
    addLinkClass: 'c-disabled',
    'disabled': true
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['CUSTOMERS'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Users',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Password Reset',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Refunds',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Returns',
        to: '/500',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Preferences',
        to: '/500',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Payment Info',
        to: '/500',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Addresses',
        to: '/500',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Orders',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tracking',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Refunds',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Payments',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Shipments',
        to: '/500',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customer Archives',
    icon: 'cil-ban',
    badge: {
      color: 'secondary',
      text: 'NEW',
    },
    addLinkClass: 'c-disabled',
    'disabled': true
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
  }
]

export default _nav
