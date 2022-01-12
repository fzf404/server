<script setup>
import { useRoute } from 'vue-router'
import router from '@/router/router'
import _ from 'lodash'

if (_.isEmpty(useRoute().query)) {
  router.push('404')
}
</script>

<template lang="pug">
h1 出错啦 🎃
h2 错误代码：
  span {{ $route.query.code }} 🔒
p  {{ $route.query.msg }} 😭
p
  a.fr(@click="$router.back()") 返回
</template>
