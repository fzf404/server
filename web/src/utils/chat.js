import { io } from 'socket.io-client'
import { ref, reactive } from 'vue'

// 初始化 websocket
const socket = io(import.meta.env.VITE_SERVER_URL)

// 用户名
let tmp = prompt('请设置用户名', '匿名')
const user_name = tmp ? tmp : '无名氏'

// 在线人数
const number = ref(0)

// 消息记录
const messages = reactive([])

// 读取人数
socket.on('number', (num) => {
  number.value = num
})

// 监听消息事件
socket.on('message', (data) => {
  messages.push(data)
})

export { socket, user_name, number, messages }
