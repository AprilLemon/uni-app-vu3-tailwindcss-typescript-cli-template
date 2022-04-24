import {
  clearLoginData,
  checkLogin,
  getLoginInfo,
} from '@/tool/login'

export const proxy = (function () {
  if (process.env.NODE_ENV === 'development') {
    return 'http://192.168.44.160:9100/'
  } else {
    return process.env.PROXY
  }
})()

export const SOURCE = (function () {
  return 'xjr_help_weapp'
  if (process.env.NODE_ENV === 'development') {
    // console.log('开发环境')
    return 'xjr_help_weapp'
  } else {
    // console.log('生产环境')
    // 当前环境生产测试
    return process.env.SOURCE || 'weapp'
  }
})()

function dealParams (params: { [index: string]: any }) {
  const defaultParams: { [index: string]: any } = {}
  for (const key of Object.keys(params)) {
    const value = params[key]
    if (value !== undefined && value !== null) {
      defaultParams[key] = params[key]
    }
  }
  defaultParams['source'] = SOURCE

  return defaultParams
}

// 组合URL
function generateUrl ({ proxy = '', url = '' }) {
  return proxy + url + ``
}

export const postForm = ({ url = '', params = {} }) => fetchConfig({
  url,
  params,
  header: {
    'content-type': 'application/x-www-form-urlencoded;',
    'source': SOURCE,
  },
})

// post
export const post = async ({ url = '', params = {} }) => fetchConfig({
  url,
  params,
  header: {
    'content-type': 'application/json',
    'source': SOURCE,
  },
})

function fetchConfig ({ header = {}, url = '', params = {} }) {
  return new Promise((resolve, reject) => {
    let authorization = ''
    if (checkLogin()) {
      const { token: { accessToken } } = getLoginInfo()
      authorization = `${ accessToken }`
    }

    uni.request({
      url: generateUrl({ proxy, url }),
      data: dealParams(params),
      header: Object.assign({ 'Authorization': authorization }, header),
      method: 'POST',
      success: response => success(response, resolve, reject),
      fail: error => fail(error, resolve, reject),
    })
  })
}

/**
 * 文件上传
 */
enum E_FileType {
  image = 'image',
  video = 'video'
}

interface I_PostFileParams {
  url: string,
  filePath: string,
  fileType: E_FileType,
  name: string,
  params: { [index: string]: any },
  callbackTask?: { (name: any): void }
}

export const postFile = ({
                           url = '',
                           filePath = '',
                           fileType = E_FileType.image,
                           name = 'file',
                           params = {},
                           callbackTask,
                         }: I_PostFileParams) => new Promise((resolve, reject) => {
  let authorization = ''
  if (checkLogin()) {
    const { token: { accessToken } } = getLoginInfo()
    authorization = `${ accessToken }`
  }

  const uploadTask = uni.uploadFile({
    url: /^(https|http)/i.test(url) ? url : proxy + url,
    filePath,
    name,
    fileType,
    formData: { ...params },
    header: { 'Authorization': authorization, 'source': SOURCE },
    success: response => success(response, resolve, reject),
    fail: error => fail(error, resolve, reject),
  })
  callbackTask && typeof callbackTask === 'function' && callbackTask(uploadTask)
})

function success (response: any, resolve: any, reject: any) {
  const { statusCode } = response
  if (statusCode === 200) {
    const { code, data, msg, styleType } = response.data
    if (code === '0000' && !styleType) {
      resolve(data)
      return
    }
    if (code === '9999') {
      uni.hideLoading()
      if (styleType === 1) {
        uni.showModal({
          title: '提示',
          content: msg,
          confirmText: '知道了',
          confirmColor: '#337BE1',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              // console.log('用户点击确定');
            }
          },
        })
        reject(data)
        console.error('http请求：', response)
        return
      } else {
        uni.showToast({ title: msg, icon: 'none' })
        reject(response.data)
        console.error('http请求：', response)
        return
      }
    }
    console.error('http请求：', response)
    reject(response.data)
    return
  }

  if (statusCode === 401) {
    uni.hideLoading()
    uni.showModal({
      title: '温馨提示',
      content: '登录超时,需要重新登录',
      confirmText: '去登录',
      confirmColor: '#337BE1',
      showCancel: false,
      success (res) {
        clearLoginData()
        uni.reLaunch({ url: '/pages/login/login' })
      },
    })
    reject(new Error('登录超时'))
    console.error('http请求：', response)
    return
  }

  uni.showToast({ title: `${ statusCode }：${ url }`, icon: 'none' })
  reject(new Error(`${ statusCode }：${ url }`))
  console.error(response)
  return
}

function fail (error: any, resolve: any, reject: any) {
  console.error('http请求：', error)
  const { statusCode, data } = error

  if (statusCode === 401) {
    uni.hideLoading()
    uni.showModal({
      title: '温馨提示',
      content: '登录超时,需要重新登录',
      confirmText: '去登录',
      confirmColor: '#337BE1',
      showCancel: false,
      success (res) {
        clearLoginData()
        uni.reLaunch({ url: '/pages/login/login' })
      },
    })
    reject(new Error('登录超时'))
    return
  }

  uni.showToast({
    title: JSON.stringify(error),
    icon: 'none',
  })
  reject(error)
}
