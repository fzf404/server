<script setup>
import { ref } from 'vue'
import request from '@/utils/request'

// 从 localStorage 中读取信息
const data = localStorage.getItem('info')
const student_id = ref(data ? JSON.parse(data)['student_id'] : '')

// 提交事件
const onSubmit = () => {
  request('/exam-info/search', {
    params: { student_id: student_id.value },
  })
}
</script>

<template lang="pug">
h1 欢迎呀 🙌
h2
  span 『沈阳理工大学』
  span 考试查询🔍
p.notice 红色为重修, 仅供参考
div
  label 学号
  input(v-model='student_id' @keypress.enter="onSubmit" placeholder='你的学号' autofocus)
p.center
  a.purple(@click="onSubmit") 查询 
  a
  a.fr(@click="$router.back()") 返回
</template>
