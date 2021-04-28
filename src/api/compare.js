import request from '@/utils/request'

export function fetchLog(data) {
  return request({
    url: '/compare/fetchLog',
    method: 'get',
    data
  })
}

export function stopLog(data) {
    return request({
        url: '/compare/stopLog',
        method: 'get',
        data
    }) 
}

export function submit(data) {
    return request({
      url: '/compare/submit',
      method: 'post',
      data
    })
  }