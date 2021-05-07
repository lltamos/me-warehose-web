import api from '@/api'

const state = {
    isGenerate: false,
    stemTreeKindTypeDate: []
}
const getters = {
    getStemKindTypeName: function(id) {
        // todo 当为空时，登录状态改编为未登录，使其重新登陆
        for (let row of state.stemTreeKindTypeDate) {
            if (row.tid != id) {
                for (let item of row.children) {
                    if (item.tid == id) {
                        return item
                    }
                }
            }
            return row
        }
    },
    getIsGenerate: function() {
        return state.isGenerate
    }
}
const actions = {
    remoteStemTreeKindTypeDate({commit}) {
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
