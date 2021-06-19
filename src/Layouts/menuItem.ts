import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { to: '/dashboard' },
  },
  {
    title: 'ADMIN',
    group: true,
  },
  {
    title: 'My Company',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'My Company',
        link: { to: '/my-company' },
      },
    ],
  },
  {
    title: 'Product Services',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Search Products/Services',
        link: { to: '/product' },
      },
      {
        title: 'Add Products/Services',
        link: { to: '/product/add-product' },
      },
    ],
  },
  {
    title: 'Users',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Search Users',
        link: { to: '/user' },
      },
      {
        title: 'Add Users',
        link: { to: '/user/add-user' },
      },
    ],
  },
  {
    title: 'Insurance',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Search Insurance',
        link: { to: '/insurance' },
      },
      {
        title: 'Add Insurance',
        link: { to: '/insurance/add-insurance' },
      },
    ],
  },
  {
    title: 'Company',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Search Companies',
        link: { to: '/company' },
      },
      {
        title: 'Add Company',
        link: { to: '/company/add-company' },
      },
    ],
  },
  {
    title: 'Network',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Search Networks',
        link: { to: '/network' },
      },
      {
        title: 'Add Network',
        link: { to: '/network/add-network' },
      },
    ],
  },
  {
    title: 'TOOLS',
    group: true,
  },
  {
    title: 'Leads',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Search Leads',
        link: { to: '/leads' },
      },
      {
        title: 'Add Lead',
        link: { to: '/leads/add-lead' },
      },
      {
        title: 'No Rep List',
        link: { to: '/leads/no-rep-list' },
      },
    ],
  },
  {
    title: 'Clients',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Search Clients',
        link: { to: '/clients/search-clients' },
      },
      {
        title: 'Add Clients',
        link: { to: '/clients/add-client' },
      },
    ],
  },
  {
    title: 'Reports',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Reports',
        link: { to: '/report' },
      },
      {
        title: 'Billing',
        link: { to: '/report/billing' },
      },
      {
        title: 'Lead',
        link: { to: '/report/lead' },
      },
      {
        title: 'Lead By Employee',
        link: { to: '/report/lead-by-employee' },
      },
      {
        title: 'Lead Source',
        link: { to: '/report/lead-source' },
      },
      {
        title: 'Lead Export',
        link: { to: '/report/lead-export' },
      },
      {
        title: 'Lead Source Export',
        link: { to: '/report/lead-source-export' },
      },
      {
        title: 'Employee Stats',
        link: { to: '/report/employee-stats' },
      },
      {
        title: 'Client Export',
        link: { to: '/report/client-export' },
      },
      {
        title: 'Backlink',
        link: { to: '/report/backlink' },
      },
      {
        title: 'Content',
        link: { to: '/report/content' },
      },
    ],
  },





// Deafult Menus
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  // {
  //   title: 'Extra Components',
  //   icon: { name: 'star-outline' },
  //   children: [
  //     {
  //       title: 'Accordion',
  //       link: { to: '/extra-components/accordion' },
  //     },
  //     {
  //       title: 'Actions',
  //       link: { to: '/extra-components/actions' },
  //     },
  //     {
  //       title: 'Alert',
  //       link: { to: '/extra-components/alert' },
  //     },
  //     {
  //       title: 'List',
  //       link: { to: '/extra-components/list' },
  //     },
  //     {
  //       title: 'Spinner',
  //       link: { to: '/extra-components/spinner' },
  //     },
  //     {
  //       title: 'Progress Bar',
  //       link: { to: '/extra-components/progress' },
  //     },
  //     {
  //       title: 'Tabs',
  //       link: { to: '/extra-components/tabs' },
  //     },
  //     {
  //       title: 'Chat',
  //       link: { to: '/extra-components/chat' },
  //     },
  //     {
  //       title: 'Cards',
  //       link: { to: '/extra-components/cards' },
  //     },
  //     {
  //       title: 'Flip Card',
  //       link: { to: '/extra-components/flip-card' },
  //     },
  //     {
  //       title: 'Reveal Card',
  //       link: { to: '/extra-components/reveal-card' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Forms',
  //   icon: { name: 'edit-2-outline' },
  //   children: [
  //     {
  //       title: 'Inputs',
  //       link: { to: '/forms/inputs' },
  //     },
  //     {
  //       title: 'Layout',
  //       link: { to: '/forms/form-layout' },
  //     },
  //     {
  //       title: 'Buttons',
  //       link: { to: '/forms/buttons' },
  //     },
  //     {
  //       title: 'Select',
  //       link: { to: '/forms/select' },
  //     },
  //   ],
  // },
  // {
  //   title: 'UI Features',
  //   icon: { name: 'keypad-outline' },
  //   children: [
  //     {
  //       title: 'Grid',
  //       link: { to: '/ui-features/grid' },
  //     },
  //     {
  //       title: 'Animated Searches',
  //       link: { to: '/ui-features/search' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Modal & Overlays',
  //   icon: { name: 'browser-outline' },
  //   children: [
  //     {
  //       title: 'Popover',
  //       link: { to: '/modal-overlays/popover' },
  //     },
  //     {
  //       title: 'Tooltip',
  //       link: { to: '/modal-overlays/tooltip' },
  //     },
  //     {
  //       title: 'Toastr',
  //       link: { to: '/modal-overlays/toastr' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: { name: 'text-outline' },
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: { to: '/editors/tinymce' },
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: { to: '/editors/ckeditor' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Miscellaneous',
  //   icon: { name: 'shuffle-2-outline' },
  //   children: [
  //     {
  //       title: '404',
  //       link: { to: '/miscellaneous/404' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: { name: 'lock-outline' },
  //   children: [
  //     {
  //       title: 'Login',
  //       link: { to: '/auth/login' },
  //     },
  //     {
  //       title: 'Register',
  //       link: { to: '/auth/register' },
  //     },
  //     {
  //       title: 'Request Password',
  //       link: { to: '/auth/request-password' },
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: { to: '/auth/reset-password' },
  //     },
  //   ],
  // },
];

export default items;
