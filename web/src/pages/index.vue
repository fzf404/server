<script setup>
defineEmits(['change-theme'])
</script>

<template lang="pug">
h1 欢迎呀 
  span.jump(@click="$emit('change-theme')") 🙌
h2 Here's My Server Page 🏠
p
  router-link.orange(title='沈阳理工大学体温自动填报', to='auto-temp') 体温自动填报
  router-link.green-blue(title='沈阳理工大学健康情况自动填报', to='auto-report') 健康自动填报
p
  router-link.yellow-green(title='停止体温自动填报', to='stop-temp') 停止体温填报
  router-link.yellow(title='停止体温自动填报', to='stop-report') 停止健康填报
p
  router-link.green(title='沈阳理工大学考试查询', to='exam-info') 考试查询
  router-link.blue(title='匿名聊天室',to='chat') 聊天室
p
  router-link.red(title='资助我们', to='reward') 资助我们
  router-link.purple(title='反馈', to='feed') 反馈
</template>
