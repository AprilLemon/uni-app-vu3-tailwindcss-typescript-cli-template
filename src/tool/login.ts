import {
  LOGIN_INFO,
  PERSON_INFO,
  LOGOUT_TIMESTAMP,
} from '@/constants/storage'

export const setLoginInfo = (data: any) => {
  try {
    const expiresIn = data.token.expiresIn
    uni.setStorageSync(LOGOUT_TIMESTAMP, expiresIn + new Date().getTime())
  } catch (e) {
    console.error(e)
  }
  return uni.setStorageSync(LOGIN_INFO, data)
}
export const getLoginInfo = () => {
  return uni.getStorageSync(LOGIN_INFO)
}

export const setPersonInfo = (data: any) => {
  return uni.setStorageSync(PERSON_INFO, data)
}

export const getPersonInfo = (data: any) => {
  return uni.getStorageSync(PERSON_INFO)
}

// 检查是否登录
export const checkLogin = () => {
  const loginInfo = getLoginInfo()
  if (loginInfo) {
    const logoutTimestamp = uni.getStorageSync(LOGOUT_TIMESTAMP)
    if (logoutTimestamp && logoutTimestamp > new Date().getTime()) {
      return true
    } else {
      clearLoginData()
      return false
    }
  } else {
    clearLoginData()
    return false
  }
}
// 清楚登录数据
export const clearLoginData = () => {
  uni.removeStorageSync(LOGIN_INFO)
  uni.removeStorageSync(PERSON_INFO)
  uni.removeStorageSync(LOGOUT_TIMESTAMP)
}
