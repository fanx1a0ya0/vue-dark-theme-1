<template>
  <div>
    <blockquote>
      <p style="font-size: 17px"><i class="fas fa-fw fa-list mx-r4" /> 密码生成对比</p>
    </blockquote>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="header">
          <el-button type="primary" @click="newTask"><i class="fas fa-fw fa-plus mx-r4" />新建任务</el-button>&nbsp;
          <el-button type="primary" @click="stopTask"><i class="fas fa-fw fa-stop-circle mx-r4" />停止</el-button>&nbsp;
          <el-button type="primary" @click="reTask"><i class="fas fa-fw fa-redo mx-r4" />重置</el-button>&nbsp;
        </el-card>
        <el-card class="logs">
          <div slot="header" style="font-size: 15px">任务日志</div>
          <log-viewer :log="log" :loading="isLoading" style="height:100px; z-index:999; background-color:#121319;"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="7">
      <el-col :span="12">
        <el-card class="progress">
          <div slot="header" style="font-size: 15px">生成进度</div>
          <span class="generated">已生成{{ msg }}条</span>
          <br>
          <br>
          <el-table :data="tableData1" stripe style="width: 100%" max-height="230px">
          <el-table-column prop="plaintext" label="明文" width="550px"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="percent">
          <div slot="header" style="font-size: 15px">命中比例</div>
          <el-progress :percentage="line" :format="format"></el-progress>
          <span class="hited">耗时{{runTime}},已命中{{hit}}条数据。</span>
          <br>
          <el-table :data="tableData2" stripe style="width: 100%" max-height="230px">
          <el-table-column prop="plaintext" label="明文" width="225px"></el-table-column>
          <el-table-column prop="hash" label="哈希值" width="225px"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchLog, stopLog, submit } from '@/api/compare'

export default {
  data() {
    return {
      line: 0,
      count: 0,
      log: '',
      isLoading: true,
      msg: 0,
      tableData1: [],
      tableData2: [],
      runTime: '0:0:0:0',
      timer: '',
      lineTimer: '',
      hit: 0,
      beginTime:'',
      id: 0
    }
  },
  //mounted(){
    //this.getLineData()
  //},
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.lineTimer)
  },
  methods: {
    format(percentage) {
      return percentage >= 100 ? '完成' : `${percentage}%`;
    },
    getLineData() {
      this.lineTimer = setInterval(() => {
        this.line += 1
      }, 1000);
    },
    newTask() {
      const time = new Date()
      console.log(time)
      this.beginTime=time.toISOString()
      this.updateTime()
      this.line=0
      this.getLineData()
      this.fetchLog()
    },
    stopTask(){
      clearInterval(this.lineTimer)
      clearInterval(this.timer)
      this.stopLog()
    },
    reTask(){
      clearInterval(this.lineTimer)
      clearInterval(this.timer)
      this.line=0
      this.runTime='0:0:0:0'
      this.hit=0
      this.msg=0
      this.tableData1=[]
      this.tableData2=[]
    },
    updateTime() {
      this.timer = setInterval(() => { 
        const time = new Date() - new Date(this.beginTime)
        this.runTime = this.msToTime(time)
      }, 1000)
    },
    submit(){
      submit().then((response) => {
        return this.id = response.data.id
      })
    },
    fetchLog() {
      fetchLog(this.submit()).then((response) => {
        console.log(this.id)
        this.log += '\n' + response.data.log
        this.tableData1 = response.data.tableData1
        this.tableData2 = response.data.tableData2
        this.msg = response.data.msg
        this.hit = response.data.hit
        //this.line=0
        //this.getLineData()
      }).catch(() => {})
    },
    stopLog() {
      stopLog(this.submit()).then((response) => {
        console.log(this.id)
        this.log += '\n' + response.data.log
      }).catch(() => {})
    },
    msToTime(s) {
      const use_days = parseInt(s /1000 / 60 / 60 / 24)
      const use_hours = parseInt(s /1000 / 60 / 60 % 24)
      const user_min = parseInt(s /1000 / 60 % 60)
      const user_second = parseInt(s /1000 % 60)
      return `${use_days}:${use_hours}:${user_min}:${user_second}`
    }
  }  
}
</script>


<style land="scss" scoped>
.logs{
  margin-bottom: 7px;
}
.header{
  margin-bottom: 7px;
}
.progress{
  height: 340px;
}
.percent{
  height:  340px;
}
.generated{
  color: aqua;
  font-size: 15px;
}
.hited{
  color: aqua;
}
</style>