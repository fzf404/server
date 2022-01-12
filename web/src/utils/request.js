import axios from 'axios'
import router from '@/router/router'

async function request(url, options) {
  // axios 实例
  const service = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, // base url
    timeout: 12000, // 超时时间
  })
  // 请求拦截
  service.interceptors.request.use((config) => {
    // 设置请求头等信息
    if (options && options.body) {
      config.data = options.body
    }
    return config
  })
  // 返回拦截
  service.interceptors.response.use(
    (res) => {
      // 返回数据的格式化
      switch (res.data.code) {
        case 200:
          router.push({ name: 'success', params: { data: JSON.stringify(res.data) } })
          break
        default:
          router.push({ name: 'error', query: res.data })
      }
    },
    (err) => {
      switch (err.message) {
        // 网络错误
        case 'Network Error':
          router.push({
            name: 'error',
            query: { code: 500, msg: '服务器请求失败, 请联系管理员:「QQ: 441535134」' },
          })
          break
        default:
          router.push({
            name: 'error',
            query: { code: 500, msg: '服务器请求错误, 请联系管理员:「QQ: 441535134」' },
          })
      }
    }
  )
  return service(url, options)
}

export default request
