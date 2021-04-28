import api from '@/api/index'

const http = {}
http.constants = {
    getHttpCourseType: function(tmsKindId) {

        return new Promise(function(resolve, reject) {
            api.get('constant/listCourseTypes', {
                params: {tmsKindId: tmsKindId}
            }).then(res => {
                resolve(res.data)
            }, err => {
                reject(err)
            })
        })
    },
    getHttpChapterType: function(tmsCourseId) {
        return new Promise(function(resolve, reject) {
            api.get('constant/listChapterTypes', {
                params: {tmsCourseId: tmsCourseId}
            }).then(res => {
                resolve(res.data)
            }, err => {
                reject(err)
            })
        })
    }
}
export default http
