<script setup>
import { reactive, ref } from 'vue'
import request from '@/utils/request'

// 从 localStorage 中读取信息
const tmp = localStorage.getItem('info')
// 提交中
const submiting = ref(false)
// 用户信息
const info = reactive(tmp ? JSON.parse(tmp) : {})

// 提交事件
const onSubmit = () => {
  if(submiting.value){
    alert("提交中...请耐心等待...")
    return 
  }
  submiting.value = true
  // 保存信息
  localStorage.setItem('info', JSON.stringify(info))
  // 等待
  request('/auto-report/new', {
    method: 'post',
    data: info,
  }).then(() => {
    submiting.value = false
  })
}
</script>

<template lang="pug">
h1 欢迎呀 🙌
h2
  span 『{{submiting?"提交中...":"沈阳理工大学"}}』
  span 健康情况自动填报 🌡
p 🍭 已针对验证码进行更新，并修复了一些bug 🍭
div
  label 学号
  input(v-model.lazy='info.student_id' placeholder='你的学号' autofocus)
  br
  label 密码
  input(v-model.lazy='info.password' placeholder='身份证后六位')
  br
  label 姓名
  input(v-model.lazy='info.user_name' placeholder='如何称呼')
  br
  label 邮箱
  input(v-model.lazy='info.email' placeholder='接受消息的邮箱')

p.center
  a.purple(@click="onSubmit") 提交 
  a
  router-link.fr(to="/") 返回

</template>
