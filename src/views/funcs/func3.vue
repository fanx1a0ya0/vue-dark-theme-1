<template>
  <div>
    <blockquote>
      <p style="font-size: 17px"><i class="fas fa-fw fa-list mx-r4" /> 密码生成对比</p>
    </blockquote>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="header">
          <el-button type="primary"><i class="fas fa-fw fa-plus mx-r4" @click="newTask"/>新建任务</el-button>&nbsp;
          <el-button type="primary"><i class="fas fa-fw fa-stop-circle mx-r4" />停止</el-button>&nbsp;
          <el-button type="primary"><i class="fas fa-fw fa-redo mx-r4" />重置</el-button>&nbsp;
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
          <el-progress :percentage="line":format="format"></el-progress>
          <span class="hited">耗时{{runTime}},已命中{{hit}}-{{beginTime}}条数据。</span>
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
  export default {
    data() {
      return {
        line: 0,
        count: 0,
        log: 'Hashcat开始运行\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest',
        isLoading: true,
        msg: 10,
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
        runTime: '0:0:0:0',
        timer: '',
        hit: '19823',
        beginTime:''
      }
    },
    mounted(){
      this.getLineData()
    },
    beforeUPdate(){
      this.updateTime()
    },
    
    beforeDestroy() {
    clearInterval(this.timer)
    //clearInterval(this.polling)
    },
    methods: {
      format(percentage) {
        return percentage >= 100 ? '完成' : `${percentage}%`;
      },

      getLineData() {
        setInterval(() => {
          this.line += 2
        }, 2000);
      },

      newTask() {
        const time = new Date()
        console.log(time)
        this.beginTime=time.toISOString()
      },

      updateTime() {
      this.timer = setInterval(() => { 
        const time = new Date() - new Date(this.beginTime)
        this.runTime = this.msToTime(time)
      }, 1000)
      },

      msToTime(s) {
      const use_days = parseInt(s /1000 / 60 / 60 / 24)
      const use_hours = parseInt(s /1000 / 60 / 60 % 24)
      const user_min = parseInt(s /1000 / 60 % 60)
      const user_second = parseInt(s /1000 % 60)
      return `${use_days}:${use_hours}:${user_min}:${user_second}`
      }
    }
     
  };
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