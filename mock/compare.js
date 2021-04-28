module.exports = [
{
    url: '/compare/fetchLog',
    type: 'get',
    response: data => {
      return {
        code: 20000,
        message: 'success',
        data: {
          log: '任务开始',
          tableData1: [{
            plaintext: '123123123'
          },{
            plaintext: '123123123'
          },{
            plaintext: '123123123'
          },{
            plaintext: '123123123'
          },{
            plaintext: '123123123'
          },{
            plaintext: '123123123'
          },{
            plaintext: '123123123'
          },{
            plaintext: '123123123'
          }],
          tableData2: [{
            plaintext: '123123123',
            hash: 'abcabcabc'
          },{
            plaintext: '123123123',
            hash: 'abcabcabc'
          },{
            plaintext: '123123123',
            hash: 'abcabcabc'
          },{
            plaintext: '123123123',
            hash: 'abcabcabc'
          },{
            plaintext: '123123123',
            hash: 'abcabcabc'
          },{
            plaintext: '123123123',
            hash: 'abcabcabc'
          },{
            plaintext: '123123123',
            hash: 'abcabcabc'
          },{
            plaintext: '123123123',
            hash: 'abcabcabc'
          }],
          msg: 10,
          hit: 10
        }
      }
    }
  },
{
    url: '/compare/stopLog',
    type: 'get',
    response: data => {
        return {
          code: 20000,
          message: 'success',
          data: {
            log: '任务停止'
          }
        }
    }
},
{
    url: '/compare/submit',
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
}
]