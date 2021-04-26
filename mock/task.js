module.exports = [
  // task sumbit
  /**
   * 提交任务
   * 插入数据库后需要回传一个id
   * data: /func1.vue currentTask
   */
  {
    url: '/task/submit',
    type: 'post',
    response: data => {
      return {
        code: 20000,
        message: 'success',
        data: {
          id: Math.floor(Math.random() * 100)
        }
      }
    }
  },
  // task upload
  /**
   * 文件上传
   * 需要响应一个存储文件的url
   * data: formData
   */
  {
    url: '/task/upload',
    type: 'post',
    response: data => {
      // TODO 这里只传了一个文件名过来，真实的后端需要处理带文件的formData
      return {
        code: 20000,
        message: 'success',
        data: '/files/' + data.body
      }
    }
  },
  // fetch tasks
  /**
   * 拉取所有任务
   * 需要响应一个任务列表
   * data: null
   */
  {
    url: '/task/fetchTaskList',
    type: 'get',
    response: data => {
      return {
        code: 20000,
        message: 'success',
        data: [
          {
            id: 1,
            taskName: '任务1',
            releaseTime: '2021-04-26T13:40:37.358Z',
            filename: '测试文件1',
            fileLink: '/files/测试文件1.txt',
            fileType: 'txt',
            taskStatus: '待完成'
          },
          {
            id: 2,
            taskName: '任务2',
            releaseTime: '2021-04-26T13:40:37.358Z',
            filename: '测试文件2',
            fileLink: '/files/测试文件2.txt',
            fileType: 'txt',
            taskStatus: '待完成'
          }
        ]
      }
    }
  },
  // get task info
  /**
   * 任务详情
   * 需要响应一个任务详情
   * data: {
   *    id: taskId
   * }
   * TODO crashFound/crashUsed 应该也需要通过轮询来获取
   */
  {
    url: '/task/getTaskInfo',
    type: 'post',
    response: data => {
      return {
        code: 20000,
        message: 'success',
        data: {
          id: 1,
          taskName: '任务2',
          releaseTime: '2021-04-26T13:40:37.358Z',
          filename: '测试文件2',
          fileLink: '/files/测试文件2.txt',
          fileType: 'txt',
          taskStatus: '待完成',
          crashFound: '2',
          crashUsed: '12'
        }
      }
    }
  },
  // get task log
  /**
   * 获取任务日志
   * 响应日志内容即可
   * data: {
   *  id: taskId
   * }
   * message: success   任务进行
   *          completed 任务完成
   */
  {
    url: '/task/fetchLog',
    type: 'get',
    response: data => {
      return {
        code: 20000,
        message: 'success',
        data: {
          log: 'The mission is in progress...... '
        }
      }
    }
  }
]
