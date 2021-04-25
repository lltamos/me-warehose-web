<template>
    <div>
        <page-header :title="$route.name == 'routerName' ? '新增试题' : '编辑试题'">
            <el-button icon="el-icon-arrow-left" size="mini" round @click="$router.go(-1)">返 回</el-button>
        </page-header>
        <page-main>
            <el-row>
                <el-col :md="24" :lg="16">
                    <DetailForm :id="$route.params.id" ref="form" />
                </el-col>
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button type="primary" @click="onSubmit">提 交</el-button>
            <el-button @click="onCancel">取 消</el-button>
        </fixed-action-bar>
    </div>
</template>

<script>
import tool from '@/util/tool'
import DetailForm from './components/DetailForm/index'

export default {
    name: 'TikuQuestionTestDetail',
    components: {
        DetailForm
    },
    data() {
        return {
            test: {}
        }
    },
    mounted() {
    },
    methods: {
        onSubmit() {
            this.$refs['form'].submit(() => {
                this.$eventBus.$emit('get-data-list')
                this.$router.back()
            })
        },
        onCancel() {
            this.$router.back()
        },
        getDetail(id) {
            if (tool.assetIsNull(id)) {
                return false
            }
            let params = this.getParams()
            this.api.get('/tms/test/detail', {
                params
            }).then(res => {
                this.test = res.data

            })
        }
    }
}
</script>

<style lang="scss" scoped>
// scss
</style>
