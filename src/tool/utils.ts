/* eslint-disable */
// @ts-nocheck
// 正则图片
export const isImage = (url) => {
  const imageRegExp = /\.(BMP|JPG|PNG|TIF|GIF|PCX|TGA|EXIF|FPX|SVG|PSD|CDR|PCD|DXF|UFO|EPS|AI|RAW|WMF|WEBP)$/i
  return imageRegExp.test(url)
}
// 正则office文件
export const isOffice = (url) => {
  const officeRegExp =
    /\.(PDF|PPTX|PPTM|PPT|POTX|POTM|POT|PPSX|PPSM|PPS|PPAM|PPA|PPTX|ODP|XLSX|XLSM|XLSB|XLS|XLTX|XLTM|XLT|XML|XLS|CSV|PRN|DIF|SLK|XLAM|XLA|XLSX|ODS|DOCX|DOCM|DOC|DOTX|DOTM|DOT|XPS|RTF)$/i
  return officeRegExp.test(url)
}

export const getCnWeek = (date = new Date()) => {
  const WEEK = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  }
  return WEEK[date.getDay()]
}

// 格式化无效数据
export const formatNull = (val) => {
  const error = ['undefined', 'null', '[]', '{}', undefined, null]
  return error.includes(val) ? '' : val
}

// 格式化无效数据
export const isNull = (val) => {
  const error = ['undefined', 'null', '[]', '{}', undefined, null]
  return error.includes(val) ? true : false
}

/**
 * 生成跳转路径
 */
export const generateJumpPath = ({ url = '', params = null }) => {
  if (params && params instanceof Object && !Array.isArray(params)) {
    const keys = Object.keys(params)
    let str = ''
    keys.forEach((key, index) => {
      if (index === 0) {
        str = '?' + key + '=' + formatNull(params[key])
      } else {
        str += '&' + key + '=' + formatNull(params[str])
      }
    })
    return url + str
  } else {
    return url
  }
}

/**
 * 删除空字段
 * @param emptyKey 空字段key
 * @param childrenKey 遍历子集key
 * @param list 原数组
 */
export const deleteEmptyField = ({ emptyKey = '', childrenKey = '', list = [] }) => {
  for (const item of list) {
    const emptyArray = Array.isArray(item[emptyKey]) && item[emptyKey].length === 0
    const emptyStatus = ['null', 'undefined', null, undefined]
    const emptyVal = emptyStatus.includes(item[emptyKey])
    if (emptyArray || emptyVal) {
      Reflect.deleteProperty(item, emptyKey)
    }
    if (item[childrenKey] && item[childrenKey].length !== 0) {
      deleteEmptyField({
        emptyKey,
        childrenKey,
        list: item[childrenKey],
      })
    }
  }
}

//  图片匹配正则
export const imageRegEx = /<img src.*?(?:\>|\/>)/ig
export const srcRegEx = /src=[\'\"]?([^\'\"]*)[\'\"]?/i

/**
 * html标签替换
 * @param html
 * @param replace
 * @returns {string}
 */
export const htmlReplace = (html = '', replace = '') => {
  if (!html) return html
  const htmlRegEx = /<\/?.+?\/?>/ig
  const spaceRegEx = /&nbsp;?/ig
  return html.replaceAll(htmlRegEx, replace).replaceAll(spaceRegEx, ' ')
}

/**
 * 图片标签替换
 * @param html
 * @param replace
 * @returns {string}
 */
export const imageReplace = (html = '', replace = '') => {
  if (!html) return html
  const htmlRegEx = /<img src.*?(?:\>|\/>)/ig
  return html.replaceAll(htmlRegEx, replace)
}

/**
 * 格式化数字
 */
export const formatNumber = (n) => {
  if (isNull(n) || !n || !Number(n)) {
    return '-'
  }
  var b = parseInt(n).toString()
  var len = b.length
  if (len <= 3) {
    return b
  }
  var r = len % 3
  return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
}
