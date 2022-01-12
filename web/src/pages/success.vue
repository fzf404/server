<script setup>
import { useRoute } from 'vue-router'
// 解析 params
const params = JSON.parse(useRoute().params.data)
</script>

<template lang="pug">
h1 提交成功 😋
h2 {{ params.msg }}  💌
table 
  tr
    th(v-for="head in params.data.head") {{head}}
  tr(v-for="item,index in params.data.body")
    td(v-for="value in item" :class="{notice:params.data.notice[index]==1}") {{value}}
p
  router-link.fr(to='reward') 返回
</template>
