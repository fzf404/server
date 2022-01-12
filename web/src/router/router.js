import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index.vue'),
    meta: {
      title: 'fzf404 | 服务',
    },
  },
  {
    path: '/auto-temp',
    name: 'auto-temp',
    component: () => import('@/pages/auto-temp.vue'),
    meta: {
      title: 'fzf404 | 体温自动填报',
    },
  },
  {
    path: '/stop-temp',
    name: 'stop-temp',
    component: () => import('@/pages/stop-temp.vue'),
    meta: {
      title: 'fzf404 | 停止自动填报',
    },
  },
  {
    path: '/auto-report',
    name: 'auto-report',
    component: () => import('@/pages/auto-report.vue'),
    meta: {
      title: 'fzf404 | 健康情况自动填报',
    },
  },
  {
    path: '/stop-report',
    name: 'stop-report',
    component: () => import('@/pages/stop-report.vue'),
    meta: {
      title: 'fzf404 | 停止自动填报',
    },
  },
  {
    path: '/exam-info',
    name: 'exam-info',
    component: () => import('@/pages/exam-info.vue'),
    meta: {
      title: 'fzf404 | 考试查询',
    },
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/pages/chat.vue'),
    meta: {
      title: 'fzf404 | 聊天室',
    },
  },
  {
    path: '/reward',
    name: 'reward',
    component: () => import('@/pages/reward.vue'),
    meta: {
      title: 'fzf404 | 打赏',
    },
  },
  {
    path: '/feed',
    name: 'feed',
    component: () => import('@/pages/feed.vue'),
    meta: {
      title: 'fzf404 | 反馈',
    },
  },
  {
    path: '/success:data',
    name: 'success',
    component: () => import('@/pages/success.vue'),
    meta: {
      title: 'fzf404 | 成功',
    },
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/pages/error.vue'),
    meta: {
      title: 'fzf404 | 出错了',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404.vue'),
    meta: {
      title: 'fzf404 | 404',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
  },
]

// 导出路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 修改 title
router.beforeEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
