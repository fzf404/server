<script setup>
import { ref } from 'vue'
import router from '@/router/router'
import { socket, user_name, number, messages } from '@/utils/chat'

// 加入时发送消息
socket.send({ user_name: user_name, message: '「已加入」' })

// 消息缓存
const msg = ref('')

// 发送信息
const onSend = () => {
  socket.send({
    user_name: user_name,
    message: msg.value,
  })
  msg.value = ''
}

// 登出
const onLogout = () => {
  socket.send({ user_name: user_name, message: '「已登出」' })
  router.push('/')
}

</script>

<template lang="pug">
h1 网络聊天室 🍻
h2 在线人数: {{ number }}
div(v-for="mess in messages")
  span.notice {{ mess.user_name }}
  span.second :&ensp;{{ mess.message }}
  br
div
  input(v-model='msg' @keypress.enter="onSend" placeholder='在此输入消息' autofocus )
  label &ensp;
    a.purple(@click="onSend") 发送
p
  a.fr(@click="onLogout") 登出
</template>
