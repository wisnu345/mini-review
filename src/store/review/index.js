import axios from 'axios'

const state = () => {
  return {
    review: []
  }
}

const mutations = {
  SET_DATA (state, payload) {
    state.review = payload
  }
}

const getters = {
  getReview (state) {
    return state.review
  }
}

const actions = {
  getReview (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get('https://review-backend.herokuapp.com/api/v1/review')
        .then((response) => {
          context.commit('SET_DATA', response.data.data)
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  deleteComment (context, payload) {
    alert(payload)
    return new Promise((resolve, reject) => {
      axios.delete(`https://review-backend.herokuapp.com/api/v1/review/${payload}`)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  postComment (context, payload) {
    const fd = new FormData()
    fd.append('name', payload.name)
    fd.append('review_comment', payload.review_comment)
    fd.append('review_star', payload.review_star)
    fd.append('images', payload.images)

    return new Promise((resolve, reject) => {
      axios.post('https://review-backend.herokuapp.com/api/v1/review', fd)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  editComment (context, payload) {
    const fd = new FormData()
    fd.append('name', payload.name)
    fd.append('review_comment', payload.review_comment)
    fd.append('review_star', payload.review_star)
    fd.append('images', payload.images)

    return new Promise((resolve, reject) => {
      axios.patch(`https://review-backend.herokuapp.com/api/v1/review/${payload.id_user}`, fd)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
