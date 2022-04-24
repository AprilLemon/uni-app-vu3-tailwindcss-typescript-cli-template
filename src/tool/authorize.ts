/* eslint-disable */
// @ts-nocheck
// 保存到相册	字节跳动小程序的返回值是scope.album
export const AUTHORIZE_WRITE_PHOTOS_ALBUM = 'scope.writePhotosAlbum'
// 地理位置
export const AUTHORIZE_USER_LOCATION = 'scope.userLocation'
// 录音功能
export const AUTHORIZE_RECORD = 'scope.record'

// 验证用户是否授权保存图片权限
export const authorizeVerify = ({ authorizeKey }) => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: (res) => {
        const authKeys = Object.keys(res.authSetting)
        if (authKeys.includes(authorizeKey)) {
          if (res.authSetting[authorizeKey]) {
            resolve(true)
          } else {
            resolve(false)
          }
        } else {
          uni.authorize({
            scope: authorizeKey,
            success: (res) => {
              resolve(true)
            },
            fail: (e) => {
              resolve(false)
            },
          })
        }
      },
      fail: e => {
        reject(e)
      },
    })
  })
}

// 订阅信息
export const subscribeVerify = (key) => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      withSubscriptions: true,
      success (res) {
        const {
          mainSwitch,
          itemSettings,
        } = res.subscriptionsSetting

        if (itemSettings && itemSettings[key] === 'ban') {
          reject(new Error('消息订阅不可用！'))
          return
        }

        // 被客户警用需要用户手动打开设置
        if (mainSwitch === false || (itemSettings && itemSettings[key] === 'reject')) {
          resolve(false)
        } else {
          resolve(true)
        }
      },
      fail: (e) => {
        reject(e)
      },
    })
  })
}
