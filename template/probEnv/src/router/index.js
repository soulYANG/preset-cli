import Vue from 'vue'
import Router from 'vue-router'

//labelRter router
import labelRter from './path/label'

//portalRter router
import portalRter from './path/portal'

import police from './path/police'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'portal_index',
      meta: {
        title: "锋刃 全息情报合成作战平台"
      },
      component: (resolve) => require(['@/view/portal/index.vue'], resolve)
    },
  ].concat(
    labelRter,
    portalRter,
    police
  )
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "";
  next();
})
export default router