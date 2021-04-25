<template>
    <div>
        <page-header title="题库管理" />
        <page-main>
            <search-bar show-more @toggle="searchMore = $event">
                <el-form :model="search" size="small" label-width="120px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="试题库名称">
                                <el-input v-model="search.name" placeholder="请输入试题库名称，支持模糊查询" clearable />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search">筛选</el-button>
                    </el-form-item>
                </el-form>
            </search-bar>
            <el-table ref="table" v-loading="loading" class="list-table" :data="dataList" border stripe
                      highlight-current-row
            >
                <el-table-column prop="id" width="75" label="ID" />
                <el-table-column prop="name" min-width="125" label="题库名" />
                <el-table-column prop="tmsKindTypeStr" label="所属学院" />
                <el-table-column prop="singleChoice" label="单选题" />
                <el-table-column prop="multipleChoice" label="多选题" />
                <el-table-column prop="verdict" label="判断题" />
                <el-table-column prop="interpose" label="填空题" />
                <el-table-column prop="shortAnswer" label="简答题" />
                <el-table-column prop="groupQuestion" label="组合题" />
                <el-table-column prop="totalQuestion" label="总题数" />
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" plain @click="goTestPage(scope.row)">试题管理</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
                           :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false"
                           class="pagination" background @size-change="onSizeChange" @current-change="onCurrentChange"
            />
        </page-main>
    </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination'
import storage from '@/util/storage'

export default {
    name: 'TikuQuestionRepsList',
    mixins: [paginationMixin],
    beforeRouteEnter(to, from, next) {
        // 进入页面时，先将当前页面的 name 信息存入 keep-alive 全局状态
        next(vm => {
            if (!vm.$store.state.settings.enableTabbar) {
                vm.$store.commit('keepAlive/add', 'TikuQuestionRepsList')
            }
        })
    },
    beforeRouteLeave(to, from, next) {
        if (!this.$store.state.settings.enableTabbar) {
            // 因为并不是所有的路由跳转都需要将当前页面进行缓存，例如最常见的情况，从列表页进入详情页，则需要将列表页缓存，而从列表页跳转到其它页面，则不需要将列表页缓存
            // 所以下面的代码意思就是，如果目标路由的 name 不在指定的数组内，则将当前页面的 name 从 keep-alive 中删除
            if (!['TikuQuestionTestList'].includes(to.name)) {
                // 注意：上面校验的是路由的 name ，下面记录的是当前页面的 name
                this.$store.commit('keepAlive/remove', 'TikuQuestionRepsList')
            }
        }
        next()
    },
    data() {
        return {
            // 搜索
            search: {
                key: ''
            },
            // 列表数据
            dataList: [],
            searchMore: false
        }
    },
    mounted() {
        this.getDataList()
    },
    beforeDestroy() {
        storage.session.remove('testRepsParam')
    },
    methods: {
        getDataList() {
            this.loading = true
            let params = this.getParams()
            this.search.title && (params.key = this.search.title)
            this.$api.get('/tms/reps/list', {
                params
            }).then(res => {
                this.loading = false
                this.dataList = res.data.list
                this.pagination.total = res.data.totalRow
            })
        },
        goTestPage(row) {
            storage.session.set('testRepsParam', JSON.stringify({
                'testRepsId': row.id,
                'tmsKindTypeId': row.tmsKindTypeId
            }))
            this.$router.push({path: '/tms/test/question'})

        }
    }
}
</script>

<style lang="scss" scoped>
.el-pagination {
    margin-top: 20px;
}
</style>
