import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import User from './views/User.vue'
import NotFoundComponent from './views/NotFoundComponent.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', // the URL
      name: 'event-list', // Name of the route
      component: EventList // Component to render
    },
    {
      path: '/event/:id', // dynamic segment
      name: 'event-show',
      component: EventShow,
      props: true,
      /* redirect example #2 */
      alias: '/event-show' // /event-to-show shows same content as /event (not great for search engines)
      /* end redirect example #2 */
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    /* redirect example #1 */
    {
      path: '/event-to-show', // redirect /event-to-show to /event (using named route)
      redirect: { name: 'event-show' }
    },
    /* end redirect example #1 */
    /* dynamic route example */
    {
      path: '/user/:username', // anything after /user/ is to be treated as a dynamic route
      name: 'user',
      component: User,
      props: true // send $route.params into component as props
    },
    /* end dynamic route example */
    { path: '*', component: NotFoundComponent } //https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
  ]
})
