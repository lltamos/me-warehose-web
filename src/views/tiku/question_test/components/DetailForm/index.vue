<template>
    <div v-loading="loading">
        <el-form ref="form" label-position="left" :model="form" :rules="rules" label-width="120px" label-suffix="：">
            <el-form-item label="所属项目">
                <el-link type="primary" disabled>{{ getKindTypeName() }}</el-link>
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="所属课程">
                        <el-select v-model="form.tmsCourseTypeId" placeholder="选择课程" filterable
                                   @change="getHttpChapterType"
                        >
                            <el-option v-for="(courseType,index) in courseList"
                                       :key="index"
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
            <el-form-item label="题干">
                <Editor :value="form.tigan" />
            </el-form-item>
            <el-form-item label="选项">
                <Editor :value="form.options" />
            </el-form-item>
            <el-form-item label="答案">
                <el-input :value="form.answer" />
            </el-form-item>
            <el-form-item label="备选项长度">
                <el-input :value="form.optSize" />
            </el-form-item>
            <el-form-item label="解析">
                <Editor :value="form.analyse" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import result from '@/util/result'
import Editor from '@/components/Editor'
import store from '@/store/modules/stemTree'
import storage from '@/util/storage'

export default {
    components: {Editor},
    data() {
        return {
            loading: false,
            form: {
                tmsKindTypeId: storage.session.get('tmsKindTypeId'),
                tmsCourseTypeId: null,
                tmsChapterTypeId: null,
                tmsTestId: this.$route.params.tmsTestId,
                tigan: '',
                txId: '',
                analyse: '',
                answer: '',
                tiXing: 0,
                options: '',
                optSize: ''
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
        this.getKindTypeName()
        if (!this.$lodash.isNil(this.form.tmsTestId)) {
            this.getInfo()
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

        getKindTypeName() {
            let kindType = store.getters.getStemKindTypeName(this.form.tmsKindTypeId)
            return this.$lodash.isNull(kindType) ? '-' : kindType.name
        },

        getInfo() {
            this.loading = true
            this.$api.get('/tms/test/detail', {
                params: {
                    tmsTestId: this.form.tmsTestId
                }
            }).then(res => {
                this.form.tigan = res.data.tigan
                this.form.tiXing = res.data.txId
                this.form.analyse = res.data.analyse
                this.form.answer = res.data.answer
                this.form.options = res.data.options
                this.form.optSize = res.data.optSize
                this.form.tmsCourseTypeId = Number(res.data.tmsCourseTypeId)
                this.form.tmsChapterTypeId = res.data.tmsChapterTypeId
                this.form.tmsKindTypeId = res.data.tmsKindTypeId
                this.loading = false
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
