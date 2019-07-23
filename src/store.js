import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import EventService from '@/services/EventService.js'

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
    eventsTotal: 0,
    event: {},
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
    events: []
  },
  mutations: {
    // commit and track state changes, mutations update state
    // mutations are synchronous (A > B > C > D > E)
    // common to use CAPS to spot mutations
    // called with commit('name')
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status
    },
    SET_TOTAL_EVENTS(state, total) {
      state.eventsTotal = total
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TODOS(state, todos) {
      state.todos = todos
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    // called from components, actions calling mutations to update state is best practice
    // actions are asynchronous (A > C > E > D > B)
    // called with dispatch('name')
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then(() => {
          // waits for API to respond then commits mutation
          commit('ADD_EVENT', event)
        })
        .catch(error => {
          console.log('createEvent error => ', error)
        })
    },
    fetchEvents({ commit }, { perPage, page }) {
      // passes perPage and page as an OBJECT instead of a variable
      EventService.getEvents(perPage, page) // call getEvents() in EventService
        .then(response => {
          //  console.log('response =>', response)
          console.log('Total events are => ', response.headers['x-total-count']) // show total number of items in json document
          console.log('getEvents() response.data =>', response.data) // shows data
          commit('SET_EVENTS', response.data) // commit mutation, with payload
          commit('SET_TOTAL_EVENTS', response.headers['x-total-count']) // commit total events to json response number of items
        })
        .catch(error => {
          // console.log('There was an error =>', error) // logs error (not great)
          console.log('getEvents() error.response =>', error.response) // logs error in details (good)
        })
    },
    fetchTodos(context) {
      // take in context, contains all properties of vuex store
      context.commit('SET_LOADING_STATUS', 'loading')
      Axios.get('/api/todos').then(response => {
        context.commit('SET_LOADING_STATUS', 'not loading')
        context.commit('SET_TODOS', response.data.todos)
      })
    },
    fetchEvent({ commit, getters }, id) {
      // access getters
      var event = getters.getEventByID(id) // try to find this id (saves API call)
      if (event) {
        // if found, set it
        commit('SET_EVENT', event)
      } else {
        // else go find it
        EventService.getEvent(id) // call getEvent, pass in id
          .then(response => {
            console.log('getEvent() response.data =>', response.data)
            commit('SET_EVENT', response.data) // set event to data
          })
          .catch(error => {
            console.log('getEvent() error.response =>', error.response)
          })
      }
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
