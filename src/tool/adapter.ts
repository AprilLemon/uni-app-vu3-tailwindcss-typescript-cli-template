/* eslint-disable */
// @ts-nocheck
import { isImage, isOffice } from './utils'

/**
 * 选择文件
 * count 最多可以选择的图片张数
 */
export const chooseFile = ({ count = 100 }) => {
  // #ifdef H5
  return new Promise((resolve, reject) => {
    uni.chooseFile({
      count,
      success (data) {
        resolve(data)
      },
      fail (e) {
        reject(e)
      },
    })
  })
  // #endif

  // #ifdef MP-WEIXIN
  return new Promise((resolve, reject) => {
    wx.chooseMessageFile({
      count,
      success (data) {
        resolve(data)
      },
      fail (e) {
        reject(e)
      },
    })
  })
  // #endif
}

/**
 * 选择图片
 */
// sizeType = ['original', 'compressed'] 钉钉小程序不能传入该值，不然该参数
// sourceType = ['album', 'camera']
export const chooseImage = ({
                              count = 9,
                              sourceType,
                              sizeType,
                            }) => {
  return new Promise((resolve, reject) => {
    const generateParams = {}
    sizeType ? generateParams[sizeType] = sizeType : null
    sourceType ? generateParams[sourceType] = sourceType : null
    count ? generateParams[count] = count : null
    uni.chooseImage({
      ...generateParams,
      success (data) {
        resolve(data)
      },
      fail (e) {
        reject(e)
      },
    })
  })
}

/**
 * 选择视频
 */
// sourceType = ['album', 'camera']
export const chooseVideo = ({
                              sourceType,
                            }) => {
  return new Promise((resolve, reject) => {
    const generateParams = {}
    sourceType ? generateParams[sourceType] = sourceType : null
    uni.chooseVideo({
      ...generateParams,
      success (data) {
        resolve(data)
      },
      fail (e) {
        reject(e)
      },
    })
  })
}

// 预览office或者图片，都不是返回false
export const preview = async (url, urls = []) => {
  if (isImage(url)) {
    await uni.previewImage({
      current: url,
      urls: urls.length === 0 ? [url] : urls,
    })
    return true
  }
  if (isOffice(url)) {
    // #ifdef H5
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.setAttribute('download', 'true')
    a.click()
    return true
    // #endif

    //  #ifdef MP
    const [downloadError, downloadRes] = await uni.downloadFile({
      url,
    })
    const {
      tempFilePath,
    } = downloadRes

    await uni.openDocument({
      filePath: tempFilePath,
    }).catch(e => {
      console.error(d)
    })
    return true
    // #endif
  }
  throw new Error('该类型无法预览')
}

// 持久化保存文件
export const saveFile = async ({
                                 url = '',
                                 header = {},
                                 timeout,
                               }) => {
  // #ifdef H5
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('download', 'true')
  a.click()
  return {}
  // #endif

  //  #ifdef MP
  const [error, file] = await uni.downloadFile({
    url,
    header,
    timeout,
  })
  const {
    tempFilePath,
    statusCode,
  } = file
  if (statusCode === 200) {
    const [saveError, saveRes] = await uni.saveFile({
      tempFilePath: tempFilePath,
    })
    const {
      savedFilePath,
    } = saveRes
    return {
      tempFilePath,
      savedFilePath,
    }
  } else {
    throw new Error('downloadFile-statusCode !== 200')
  }
  // #endif
}

/**
 * 复制功能
 */
export const copy = ({
                       className = '',
                       data = '',
                     }) => {
  // #ifdef H5
  let clipboard = new ClipboardJS(className, {
    text: function () {
      return data
    },
  })

  clipboard.on('success', function (e) {
    uni.showToast({
      icon: 'none',
      title: '复制成功',
    })
    clipboard.destroy()
    clipboard = null
  })

  clipboard.on('error', function (e) {
    console.error(e)
  })
  // #endif

  // #ifdef MP-WEIXIN
  uni.setClipboardData({
    data: data,
    success () {
      uni.showToast({
        icon: 'none',
        title: '复制成功',
      })
    },
  })
  // #endif
}
