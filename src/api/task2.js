import request from '@/utils/request'
const Mock = require('mockjs')
const Random = Mock.Random
const produceTableData1 = function(){
    let newList = []
    for(let i=0;i<20;i++){
        let newTableData1={
            plaintext:Random.word()
        }
        newList.push(newTableData1)
    }
    return newList
}
Mock.mock('/mock/data1',produceTableData1)
