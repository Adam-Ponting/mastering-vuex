import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js' // * imports all public items
import * as event from '@/store/modules/event.js' // * imports all public items
import * as notification from '@/store/modules/notification.js' // * imports all public items

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, // use this module
    event,
    notification
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    todos: [{ abc: true }, { abc: false }]
  },
  getters: {
    // access state
    catLength: state => {
      // get state array length, state is the only argument
      return state.categories.length
    },
    /* 
    // ES5
    doneTodos(state) {
      return state.todos.filter(todo => todo.done)
    },
    */
    doneTodos: state => {
      // return todo.done only
      return state.todos.filter(todo => todo.done)
    },
    activeTodos: (state, getters) => {
      // access getters within a getter
      return state.todos.length - getters.doneTodos.length
    }
  }
})
