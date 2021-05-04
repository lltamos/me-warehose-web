<template>
    <div v-loading="loading">
        <el-form ref="form1" :model="form" :rules="rules" label-width="120px" label-suffix="：">
            <el-form-item label="所属项目">
                <el-link type="primary" disabled>自学考试</el-link>
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="所属课程">
                        <el-select v-model="form.courseTypeId" placeholder="选择课程" filterable
                                   @change="getHttpChapterType"
                        >
                            <el-option v-for="courseType in courseList"
                                       :key="courseType.id"
                                       :label="courseType.kcName"
                                       :value="courseType.id"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="所属章节">
                        <el-select v-model="form.chapterTypeId" placeholder="选择章节" filterable>
                            <el-option v-for="chapterType in chapterList"
                                       :key="chapterType.id"
                                       :label="chapterType.name"
                                       :value="chapterType.id"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-form ref="form2" label-position="top" label-width="80px">
            <el-tabs v-model="form.tiXing" v-skeleton="loading" class="tabsClass" tab-position="top">
                <el-tab-pane name="0" label="单选题" lazy>
                    <el-form-item label="题干">
                        <Editor value="form.tiGan" />
                    </el-form-item>
                    <el-form-item label="选项">
                        <Editor />
                    </el-form-item>
                    <el-form-item label="答案">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线上品牌商赞助" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备选项长度">
                        <el-input-number />
                    </el-form-item>
                    <el-form-item label="解析">
                        <Editor />
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="1" label="多选题" lazy>
                    <el-form-item label="题干">
                        <Editor value="form.tiGan" />
                    </el-form-item>
                    <el-form-item label="选项">
                        <Editor />
                    </el-form-item>
                    <el-form-item label="答案">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线上品牌商赞助" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备选项长度">
                        <el-input-number />
                    </el-form-item>
                    <el-form-item label="解析">
                        <Editor />
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="2" label="判断题" lazy>
                    <el-form-item label="题干">
                        <Editor value="form.tiGan" />
                    </el-form-item>
                    <el-form-item label="答案">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="正确" />
                            <el-radio label="错误" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="解析">
                        <Editor />
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="3" label="填空题" lazy>
                    <el-form-item label="题干">
                        <Editor value="form.tiGan" />
                    </el-form-item>
                    <el-form-item label="答案">
                        <Editor />
                    </el-form-item>
                    <el-form-item label="解析">
                        <Editor />
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="4" label="主观题" lazy>
                    <el-form-item label="题干">
                        <Editor />
                    </el-form-item>
                    <el-form-item label="答案">
                        <Editor />
                    </el-form-item>
                    <el-form-item label="解析">
                        <Editor />
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="5" label="组合题" lazy>
                    <el-form-item label="题干">
                        <Editor value="form.tiGan" />
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </div>
</template>

<script>
// import storage from '@/util/storage'
// import http from '@/api/http'
import result from '@/util/result'
import Editor from '@/components/Editor'

export default {
    components: {Editor},
    props: {
        tmsTestId: {
            type: [Number, String],
            require: false
        },
        tmsCourseTypeId: {
            type: [Number, String],
            require: false
        },
        tmsChapterTypeId: {
            type: [Number, String],
            require: false
        }
    },
    data() {
        return {
            loading: true,
            form: {
                courseTypeId: this.courseTypeId,
                chapterTypeId: this.chapterTypeId,
                tmsTestId: this.tmsTestId,
                title: '',
                tigan: '',
                txId: '',
                analyse: '',
                answer: '',
                tiXing: '1'
            },
            rules: {
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'}
                ]
            },
            courseList: [],
            chapterList: []

        }
    },
    mounted() {
        this.getHttpCourseType()
        if (this.form.tmsTestId != '') {
            this.getInfo()
        } else {
            // this.loading = false
        }
    },
    methods: {

        getHttpChapterType(courseTypeId) {
            result.api.getHttpChapterType(courseTypeId).then(res => {
                this.chapterList = res
            })
        },
        getHttpCourseType() {
            result.api.getHttpCourseType().then(res => {
                this.courseList = res
            })

        },

        getInfo() {
            this.loading = false
            this.$api.get('/tms/test/detail', {
                params: {
                    tmsTestId: this.form.tmsTestId
                }
            }).then(res => {
                this.loading = false
                this.form.title = res.data.title
            })
        },
        submit(callback) {
            if (this.form.id == '') {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        this.$api.post('mock/tiku/question_test/create', this.form).then(() => {
                            this.$message.success({
                                message: '模拟新增成功',
                                center: true
                            })
                            callback && callback()
                        })
                    }
                })
            } else {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        this.$api.post('mock/tiku/question_test/edit', this.form).then(() => {
                            this.$message.success({
                                message: '模拟编辑成功',
                                center: true
                            })
                            callback && callback()
                        })
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// scss
.tabsClass {
    padding-left: 38px;
}
</style>
