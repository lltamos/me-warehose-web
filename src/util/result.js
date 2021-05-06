import http from '@/api/http'
import storage from '@/util/storage'

const result = {}

result.api = {
    getHttpCourseType: async function() {
        let tmsKindTypeId = storage.session.get('tmsKindTypeId')
        let result = await http.constants.getHttpCourseType(tmsKindTypeId)
        return result
    },
    getHttpChapterType: async function(courseTypeId) {
        let result = await http.constants.getHttpChapterType(courseTypeId)
        return result
    }
}

export default result
