export default {
    data() {
        return {
            loading: false,
            sort: null,
            order: null,
            pagination: {
                page: 1,
                size: 10,
                total: 0,
                sizes: [10, 20, 50, 100],
                pageType: 1,
                layout: 'total, sizes, ->, prev, pager, next, jumper'
            }
        }
    },
    methods: {
        getParams(params = {}) {
            const baseParams = {
                page: this.pagination.page,
                limit: this.pagination.size,
                pageType: this.pagination.pageType
            }
            if (this.sort && this.order) {
                baseParams.sort = this.sort
                baseParams.order = this.order
            }
            Object.assign(baseParams, params)
            return baseParams
        },
        onSizeChange(size) {
            this.pagination.size = size
            this.getDataList()
        },
        onCurrentChange(page) {
            this.pagination.page = page
            this.getDataList()
        },
        onSortChange(params) {
            if (params.order) {
                this.sort = params.prop
                this.order = params.order === 'ascending' ? 'asc' : 'desc'
            } else {
                this.sort = null
                this.order = null
            }
            this.getDataList()
        }
    }
}
