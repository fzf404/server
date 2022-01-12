<script setup>
import { reactive } from 'vue'
import request from "@/utils/request"

// 从 localStorage 中读取信息 
const data = localStorage.getItem('info')
const info = reactive(data ? JSON.parse(data) : {})

// 提交事件
const onSubmit = () => {
  request('/auto-temp/remove', {
    method: 'post',
    data: info
  })
}
</script>

<template lang="pug">
h1 欢迎呀 🙌
h2 停止体温自动填报 🌡
div
  label 学号
  input(v-model.lazy='info.student_id' placeholder='你的学号' autofocus)
  br
  label 密码
  input(v-model.lazy='info.password' placeholder='身份证后六位')
  br
p.center
  a.purple(@click="onSubmit") 提交 
  a
  a(@click="$router.back()") 返回 
</template>