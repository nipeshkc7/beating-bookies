import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '../views/login.vue';
import secure from '../views/secure.vue';
import register from '../views/register.vue';
import redirectLogin from '../views/redirectLogin.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'login',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      guest: true,
    },
  },
  {
    path: '/googleredirect',
    name: 'redirectLogin',
    component: redirectLogin,
    meta: {
      guest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {
      guest: true,
    },
  },
  {
    path: '/secure',
    name: 'secure',
    component: secure,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: secure,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === 1) {
          next();
        } else {
          next({ name: 'secure' });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next();
    } else {
      next({ name: 'secure' });
    }
  } else {
    next();
  }
});


export default router;
