import http from '@/api/http'
import storage from '@/util/storage'

const result = {}

result.api = {
    getHttpCourseType: async function() {
        let testRepsParam = JSON.parse(storage.session.get('testRepsParam'))
        let result = await http.constants.getHttpCourseType(testRepsParam.testRepsId)
        return result
    },
    getHttpChapterType: async function(courseTypeId) {
        let result = await http.constants.getHttpChapterType(courseTypeId)
        return result
    }
}

export default result
