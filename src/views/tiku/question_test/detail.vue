<template>
    <div>
        <page-header :title="title">
            <el-button icon="el-icon-arrow-left" size="mini" round @click="$router.go(-1)">返 回</el-button>
        </page-header>
        <page-main>
            <el-row>
                <el-col :md="24" :lg="16">
                    <DetailForm ref="form" :tms-test-id="$route.params.tmsTestId" />
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
            test: {},
            tmsTestId: this.$route.params.tmsTestId
        }
    },
    computed: {
        title: function() {
            return this.$lodash.isEmpty(this.tmsTestId) ? '试题新增' : '试题详情'
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
