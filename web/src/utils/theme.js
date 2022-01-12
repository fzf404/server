import { ref, watchEffect } from 'vue'
// 主题
const tmp = localStorage.getItem('theme')
const theme = ref(tmp ? tmp : 'dark')

// 监听 theme 修改
watchEffect(() => {
  // 设置主题
  document.documentElement.setAttribute('class', theme.value)
  localStorage.setItem('theme', theme.value)
})

// 修改主题
const onChangeTheme = () => {
  switch (theme.value) {
    case 'dark':
      theme.value = 'light'
      break
    case 'light':
      theme.value = 'dark'
      break
  }
}

export default onChangeTheme
