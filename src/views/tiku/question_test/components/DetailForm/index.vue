<template>
    <div v-loading="loading">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-suffix="：">
            <el-form-item label="所属项目">
                <el-link type="primary" disabled>自学考试</el-link>
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="所属课程">
                        <el-select v-model="courseTypeId" placeholder="选择课程" filterable>
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
                        <el-link type="primary" disabled>默认链接</el-link>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
// import storage from '@/util/storage'
// import http from '@/api/http'
import result from '@/util/result'

export default {
    props: {
        id: {
            type: [Number, String],
            require: false
        }
    },
    data() {
        return {
            loading: false,
            form: {
                id: this.id,
                title: ''
            },
            rules: {
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'}
                ]
            },
            courseList: [],
            courseTypeId: ''
        }
    },
    mounted() {
        this.getHttpCourseType()
        // if (this.form.id != '') {
        //     this.getInfo()
        // }
    },
    methods: {
        getHttpCourseType() {
            result.api.getHttpCourseType().then(res => {
                this.courseList = res
            })

        },

        getInfo() {
            this.loading = false
            // this.$api.get('mock/tiku/question_test/detail', {
            //     params: {
            //         id: this.form.id
            //     }
            // }).then(res => {
            //     this.loading = false
            //     this.form.title = res.data.title
            // })
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
</style>
