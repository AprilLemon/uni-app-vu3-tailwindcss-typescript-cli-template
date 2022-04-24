import {
  postForm,
  postFile,
} from './config.ts'

// 获取验证码
export const getVerifyCode = () => postForm({
  url: 'manager/appUser/getVerifyCode',
  params: {},
})


// 密码登录
export const loginByPassword = ({
                                  codeToken,
                                  mobile,
                                  password,
                                  username,
                                  verifyCode,
                                  companyId,
                                }) => postForm({
  url: 'manager/appUser/loginByPassword',
  params: {
    codeToken,
    mobile,
    password,
    username,
    verifyCode,
    companyId,
  },
})
