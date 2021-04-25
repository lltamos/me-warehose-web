const http = {}
http.constants = {
    getHttpCourseType: id => {
        this.api.get('/constant/listCourseTypes', {
            params: {id: id}
        }).then(reps => {
            return Promise.resolve(reps)
        })
    }
}
export default http
