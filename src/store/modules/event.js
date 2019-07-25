import EventService from '@/services/EventService.js'
import Axios from 'axios'
// exporting as const allows private variables and methods

export const namespaced = true // ensures all mutations, actions and getters are namespaced under event.

export const state = {
  // data
  eventsTotal: 0,
  event: {},
  events: []
}

export const mutations = {
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
}

export const actions = {
  // called from components, actions calling mutations to update state is best practice
  // actions are asynchronous (A > C > E > D > B)
  // called with dispatch('name')
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        // waits for API to respond then commits mutation
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        console.log('createEvent error => ', error)
        throw error // function stops and passes up error, control passed up to first catch in call block (EventCreate>createEvent>catch)
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
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
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        // dispatch the add action from notification module, root allows it to find the action from the root state
        // console.log('There was an error =>', error) // logs error (not great)
        console.log('getEvents() error.message =>', error.message) // logs error in details (good)
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
  fetchEvent({ commit, getters, dispatch }, id) {
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
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
          // dispatch the add action from notification module, root allows it to find the action from the root state
          console.log('getEvent() error.response =>', error.response)
        })
    }
  }
}

export const getters = {
  // access state
  getEventByID: state => id => {
    console.log('getters firing')
    // take in state then another function which takes in id
    return state.events.find(event => event.id === id) // find id where the event id === the id passed in
  }
}
