import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // data
    user: {
      id: 'abc123',
      name: 'Adam P'
    },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    loadingStatus: 'notLoading',
    todos: [
      {
        id: 1,
        text: 'abc',
        done: false
      },
      {
        id: 2,
        text: 'def',
        done: true
      },
      {
        id: 3,
        text: 'ghi',
        done: true
      },
      {
        id: 4,
        text: 'jkl',
        done: false
      }
    ],
    events: [
      { id: 1, title: 'aaa', organizer: 'mario' },
      { id: 2, title: 'bbb', organizer: 'mario' },
      { id: 3, title: 'ccc', organizer: 'mario' },
      { id: 4, title: 'ddd', organizer: 'mario' }
    ]
  },
  mutations: {
    // commit and track state changes, mutations update state
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status
    },
    SET_TODOS(state, todos) {
      state.todos = todos
    }
  },
  actions: {
    // called from components, actions calling mutations to update state is best practice
    fetchTodos(context) {
      // take in context, contains all properties of vuex store
      context.commit('SET_LOADING_STATUS', 'loading')
      Axios.get('/api/todos').then(response => {
        context.commit('SET_LOADING_STATUS', 'not loading')
        context.commit('SET_TODOS', response.data.todos)
      })
    }
  },
  getters: {
    // access state
    /* // ES5
    doneTodos(state) {
      return state.todos.filter(todo => todo.done)
    },
    */
    catLength: state => {
      // get state array length, state is the only argument
      return state.categories.length
    },
    doneTodos: state => {
      // return todo.done only
      return state.todos.filter(todo => todo.done)
    },
    activeTodos: (state, getters) => {
      // access getters within a getter
      return state.todos.length - getters.doneTodos.length
    },
    getEventByID: state => id => {
      // take in state then another function which takes in id
      return state.events.find(event => event.id === id) // find id where the event id === the id passed in
    }
  }
})
