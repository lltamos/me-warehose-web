<template>
    <div>
        <page-header title="试题管理" />
        <page-main>
            <el-button type="primary" icon="el-icon-plus" @click="onCreate">新增试题</el-button>
            <search-bar>
                <el-form :model="search" size="small" label-suffix="：">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="标题">
                                <el-input v-model="search.title" placeholder="请输入标题" clearable
                                          @keydown.enter.native="getDataList" @clear="getDataList"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="getDataList">筛 选</el-button>
                    </el-form-item>
                </el-form>
            </search-bar>
            <batch-action-bar v-if="batch.enable" :data="dataList" :selection-data="batch.selectionDataList"
                              @check-all="$refs.table.toggleAllSelection()" @check-null="$refs.table.clearSelection()"
            >
                <el-button size="small">单个批量操作按钮</el-button>
                <el-button-group>
                    <el-button size="small">批量操作按钮组1</el-button>
                    <el-button size="small">批量操作按钮组2</el-button>
                </el-button-group>
            </batch-action-bar>
            <el-table ref="table" v-loading="loading" class="list-table" :data="dataList" border stripe
                      highlight-current-row @sort-change="onSortChange"
                      @selection-change="batch.selectionDataList = $event"
            >
                <el-table-column v-if="batch.enable" type="selection" width="40" />
                <el-table-column prop="id" width="75" label="ID" />
                <el-table-column prop="tigan" label="题干">
                    <template slot-scope="scope">
                        <div v-html="scope.row.tigan" />
                    </template>
                </el-table-column>
                <el-table-column prop="txStr" width="75" label="题型" />

                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" plain @click="onEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" plain @click="onDel(scope.row)">删除</el-button>
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
    name: 'TikuQuestionTestList',

    mixins: [paginationMixin],
    beforeRouteEnter(to, from, next) {
        // 进入页面时，先将当前页面的 name 信息存入 keep-alive 全局状态
        next(vm => {
            if (!vm.$store.state.settings.enableTabbar) {
                vm.$store.commit('keepAlive/add', 'TikuQuestionTestList')
            }
        })
    },
    beforeRouteLeave(to, from, next) {
        if (!this.$store.state.settings.enableTabbar) {
            // 因为并不是所有的路由跳转都需要将当前页面进行缓存，例如最常见的情况，从列表页进入详情页，则需要将列表页缓存，而从列表页跳转到其它页面，则不需要将列表页缓存
            // 所以下面的代码意思就是，如果目标路由的 name 不在指定的数组内，则将当前页面的 name 从 keep-alive 中删除
            if (!['TikuQuestionTestDetail'].includes(to.name)) {
                // 注意：上面校验的是路由的 name ，下面记录的是当前页面的 name
                this.$store.commit('keepAlive/remove', 'TikuQuestionTestList')
            }
        }
        next()
    },
    data() {
        return {
            // 搜索
            search: {
                title: ''
            },
            // 批量操作
            batch: {
                enable: false,
                selectionDataList: []
            },
            // 列表数据
            dataList: []
        }
    },
    mounted() {
        this.getDataList()
    },
    beforeDestroy() {
    },
    methods: {
        getDataList() {
            this.loading = true
            let params = this.getParams()
            this.search.title && (params.title = this.search.title)
            let testRepsParam = JSON.parse(storage.session.get('testRepsParam'))
            testRepsParam.testRepsId && (params.testRepsId = testRepsParam.testRepsId)
            this.$api.get('/tms/test/list', {
                params
            }).then(res => {
                this.loading = false
                this.dataList = res.data.list
                this.pagination.total = res.data.totalRow
            })
        },
        onCreate() {
            this.$router.push({name: 'TikuQuestionTestDetail'})
        },
        onEdit(row) {
            this.$router.push({
                name: 'TikuQuestionTestDetail',
                params: {
                    tmsTestId: row.id,
                    tmsCourseTypeId: row.tmsCourseTypeId,
                    tmsChapterTypeId: row.tmsChapterTypeId
                }
            })
        },
        onDel(row) {
            this.$confirm(`确认删除「${row.title}」吗？`, '确认信息').then(() => {
                this.$api.post('mock/tiku/question_test/delete', {
                    id: row.id
                }).then(() => {
                    this.getDataList()
                    this.$message.success({
                        message: '模拟删除成功',
                        center: true
                    })
                })
            }).catch(() => {
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.el-pagination {
    margin-top: 20px;
}
</style>
