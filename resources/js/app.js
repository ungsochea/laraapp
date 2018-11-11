
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment';
import { Form, HasError, AlertError } from 'vform';

import Gate from "./Gate";
Vue.prototype.$gate=new Gate(window.user);

window.Form=Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue') },
    { path: '/developer', component: require('./components/Developer.vue') },
    { path: '/profile', component: require('./components/Profile.vue') },
    { path: '/users', component: require('./components/Users.vue') },
    { path: '*', component: require('./components/NotFound.vue') }
  ]

  const router = new VueRouter({
    mode:'history',
    routes // short for `routes: routes`
  })

// Format Text
Vue.filter('upText',function(text){
  return text.charAt(0).toUpperCase() + text.slice(1)
});
// Format date
Vue.filter('myDate',function(created){  
  // return moment(created).locale('km').format('MMMM Do YYYY');
  return moment(created).format('MMMM Do YYYY');
});

//VueProgressBar
import VueProgressBar from 'vue-progressbar';
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

//Sweet Alert
import swal from 'sweetalert2';
window.swal=swal;

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
window.toast=toast;

//Load data when after create
window.Fire=new Vue();

// Datatable
Vue.component('pagination', require('laravel-vue-pagination'));

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue')
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue')
);

Vue.component(
  'not-found',
  require('./components/NotFound.vue')
);

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    router,
    data:{
      search:''
    },
    methods:{
      searchit:_.debounce(()=>{
        Fire.$emit('searching');
      },1000),

      printme(){
        window.print();
      }       
      
    }
});
