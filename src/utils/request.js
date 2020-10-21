import axios from 'axios'
import VueCookies from 'vue-cookies'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})
// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)
// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    if (response.data.code === 200 && response.data.data) {
      Object.keys(response.data.data).map(val => {
        if (typeof response.data.data[val] === 'object') {
          if (response.data.data[val] && response.data.data[val].length) {
            // 数组
            response.data.data[val].map(arrValue => {
              for (var i in arrValue) {
                if (arrValue[i] === '') {
                  arrValue[i] = '暂无'
                }
              }
            })
          } else if (
            response.data.data[val] &&
            Object.keys(response.data.data[val]).length > 0
          ) {
            // 非空对象
            for (var i in response.data.data[val]) {
              if (response.data.data[val][i] === '') {
                response.data.data[val][i] = '暂无'
              }
            }
          }
          //  else {
          // }
        }
        if (response.data.data[val] === '') {
          response.data.data[val] = '暂无'
        }
      })
      return response
    } else if (response.data.code === 500) {
      
      return response
    } else {
      return response
    }
  },
  error => {
    if (error.message.includes('timeout')) {
      // 判断请求异常信息中是否含有超时timeout字符串
      // console.log('网络超时，请稍后重试！')
      return Promise.reject(error) // reject这个错误信息
    } else {
      return Promise.reject(error)
    }
  }
)

export default service
