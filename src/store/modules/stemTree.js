import api from '@/api'

const state = {
    isGenerate: false,
    stemTreeKindTypeDate: {}
}
const getters = {
    stemTreeKindTypeDate: function({dispatch}, state) {
        this.checkInit(dispatch)
        return state.stemTreeKindTypeDate
    },
    stemKindType: function({dispatch}, id) {
        this.checkInit(dispatch)
        return state.stemTreeKindTypeDate.get(id)
    },
    checkInit: function({dispatch}) {
        if (!state.isGenerate) {
            console.log('checkInit...')
            dispatch('getStemTreeKindTypeDate')
        }
    }

}
const actions = {
    getStemTreeKindTypeDate({commit}) {
        api.get('/constant/listKindTypeTree', {}).then(res => {
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
