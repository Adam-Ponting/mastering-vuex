export const namespaced = true // to namespace this module

export const state = {
  notifications: []
}

let nextId = 1
export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      // use object destructuring to add an id to notification object
      ...notification,
      id: nextId++
    })
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      // create array without id to remove object
      notification => notification.id !== notificationToRemove.id
    )
  }
}

export const actions = {
  add({ commit }, notification) {
    // use commit from context object, notification as payload
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}
