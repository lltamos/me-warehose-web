import api from '@/api'

const state = {
    isGenerate: false,
    stemTreeKindTypeDate: {}
}
const getters = {
    stemTreeKindTypeDate: function({dispatch}, state) {
        if (!state.isGenerate) {
            dispatch('getStemTreeKindTypeDate')
        }
        return state.stemTreeKindTypeDate
    }

}
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
        state.isGenerate = true
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
