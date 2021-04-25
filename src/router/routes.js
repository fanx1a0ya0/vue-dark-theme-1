export default [
  // Auth
  {
    path: '/auth',
    name: 'auth.default',
    redirect: { name: 'auth.login' },
    component: () => import('@/views/layouts/authable.vue'),
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('@/views/auth/login.vue')
      }
    ]
  },

  // App
  {
    path: '/',
    name: 'default',
    redirect: { name: 'welcome' },
    component: () => import('@/views/layouts/default.vue'),
    children: [
      // 控制台
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/welcome/index.vue')
      },
      // 功能一
      {
        path: '/funcs/func1',
        name: 'funcs.func1',
        component: () => import('@/views/funcs/func1.vue')
      },
      // 功能二
      {
        path: '/funcs/func2',
        name: 'funcs.func2',
        component: () => import('@/views/funcs/func2.vue')
      },
      // 功能三
      {
        path: '/funcs/func3',
        name: 'funcs.func3',
        component: () => import('@/views/funcs/func3.vue')
      },
      // 功能四
      {
        path: '/funcs/func4',
        name: 'funcs.func4',
        component: () => import('@/views/funcs/func4.vue')
      },
      // 表单
      {
        path: '/forms/standard',
        name: 'forms.standard',
        component: () => import('@/views/forms/standard.vue')
      },
      {
        path: '/forms/steps',
        name: 'forms.steps',
        component: () => import('@/views/forms/steps.vue')
      },

      // 列表
      {
        path: '/listing/standard',
        name: 'listing.standard',
        component: () => import('@/views/listing/standard.vue')
      },
      {
        path: '/listing/cards',
        name: 'listing.cards',
        component: () => import('@/views/listing/cards.vue')
      },

      // 业务页面
      {
        path: '/business/chatrooms',
        name: 'business.chatrooms',
        component: () => import('@/views/business/chatrooms.vue')
      },
      {
        path: '/business/invoice',
        name: 'business.invoice',
        component: () => import('@/views/business/invoice.vue')
      },

      // 图标组件
      {
        path: '/icons/fontawesome',
        name: 'icons.fontawesome',
        component: () => import('@/views/icons/fontawesome.vue')
      },

      // 编辑器组件
      {
        path: '/editors/ueditor',
        name: 'editors.ueditor',
        component: () => import('@/views/editors/ueditor.vue')
      },

      // 图表组件
      {
        path: '/charts/bar',
        name: 'charts.bar',
        component: () => import('@/views/charts/bar.vue')
      },
      {
        path: '/charts/line',
        name: 'charts.line',
        component: () => import('@/views/charts/line.vue')
      },

      // 媒体组件
      {
        path: '/medias/video',
        name: 'medias.video',
        component: () => import('@/views/medias/video.vue')
      },

      // 异常
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/exceptions/401.vue'),
        hidden: true
      },
      {
        path: '/403',
        name: '403',
        component: () => import('@/views/exceptions/403.vue'),
        hidden: true
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/exceptions/404.vue'),
        hidden: true
      },
      {
        path: '/500',
        name: '500',
        component: () => import('@/views/exceptions/500.vue'),
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
