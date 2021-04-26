module.exports = [
  // task upload
  {
    url: '/task/upload',
    type: 'post',
    response: data => {
      // TODO 这里只传了一个文件名过来，真实的后端需要处理带文件的formData
      // 响应一个存储文件的url
      return {
        code: 20000,
        message: 'success',
        data: '/files/' + data.body
      }
    }
  }
]
