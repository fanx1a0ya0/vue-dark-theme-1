import request from '@/utils/request'

export function submit(data) {
  return request({
    url: '/task/submit',
    method: 'post',
    data
  })
}

export function upload(data) {
  return request({
    url: '/task/upload',
    method: 'post',
    // TODO mock不能接受非json文件，先传名字过去模拟响应
    data: JSON.stringify(data.get('file').name)
  })
}
