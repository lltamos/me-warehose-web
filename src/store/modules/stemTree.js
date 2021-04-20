import api from '@/api'

const state = {
    stemTreeKindTypeDate: {}
}
const getters = {}
const actions = {
    getStemTreeKindTypeDate({commit}) {
        api.get('/constant/list', {}).then(res => {
            console.log(JSON.stringify(res))
            commit('setStemTreeKindTypeDate', res.data)
        })
    }
}
const mutations = {
    setStemTreeKindTypeDate(state, stemTreeKindTypeDate) {
        state.stemTreeKindTypeDate = stemTreeKindTypeDate
    }
}
export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
