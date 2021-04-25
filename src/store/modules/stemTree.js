import api from '@/api'

const state = {
    isGenerate: false,
    stemTreeKindTypeDate: {}
}
const getters = {
    stemTreeKindTypeDate: function({dispatch}, state) {
        if (!state.isGenerate) {
            console.log('checkInit...')
            dispatch('getStemTreeKindTypeDate')
        }
        return state.stemTreeKindTypeDate
    },
    stemKindType: function({dispatch}, id) {
        if (!state.isGenerate) {
            console.log('checkInit...')
            dispatch('getStemTreeKindTypeDate')
        }
        return state.stemTreeKindTypeDate.get(id)
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
    },
    // 清空所有标签页，登出的时候需要清空
    clean(state) {
        state.isGenerate = false
        state.stemTreeKindTypeDate = []
    }
}
export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
