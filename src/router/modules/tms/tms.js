import Layout from '@/layout'

export default {
    path: '/tms',
    component: Layout,
    redirect: '/tms/test/reps',
    meta: {
        title: '试题库管理',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'test/reps',
            name: 'TikuQuestionRepsList',
            component: () => import(/* webpackChunkName: 'breadcrumb_example' */ '@/views/tiku/question_reps/list'),
            meta: {
                title: '题库管理'
            }
        },
        {
            path: 'test/question',
            name: 'TikuQuestionTestList',
            component: () => import(/* webpackChunkName: 'breadcrumb_example' */ '@/views/tiku/question_test/list'),
            meta: {
                title: '试题管理',
                sidebar: false,
                breadcrumb: true,
                activeMenu: '/tms/test/reps'
            }
        },
        {
            path: 'test/detail',
            name: 'TikuQuestionTestDetail',
            component: () => import(/* webpackChunkName: 'breadcrumb_example' */ '@/views/tiku/question_test/detail'),
            meta: {
                title: '试题详情',
                sidebar: false,
                breadcrumb: true
            }
        }
    ]
}
