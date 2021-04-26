<template>
  <div>
    <blockquote>
      <i class="fas fa-list"></i><p class="title">漏洞挖掘与利用</p>
      <el-button class="task-button" type="primary" @click="goBack">返回</el-button>
    </blockquote>
    <el-container class="cards">
      <el-card class="box-card card">
        <el-tag class="tag">任务名称：{{currentTask.taskName}}</el-tag>
        <el-tag class="tag">文件类型：{{currentTask.fileType}}</el-tag>
        <el-tag class="tag">路径检测树：</el-tag>
      </el-card>
      <el-card class="box-card card">
        <el-tag class="tag">任务下发时间：{{currentTask.releaseTime}}</el-tag>
        <el-tag class="tag">作业状态：{{currentTask.taskStatus}}</el-tag>
        <el-tag class="tag">已发现crash：{{currentTask.crashFound}}</el-tag>
      </el-card>
      <el-card class="box-card card">
        <el-tag class="tag">待发掘文件：{{currentTask.filename}}</el-tag>
        <el-tag class="tag">运行时间：{{runTime}}</el-tag>
        <el-tag class="tag">可利用crash：{{currentTask.crashUsed}}</el-tag>
      </el-card>
    </el-container>
    <el-main class="log">
      <h2 style="display: block">任务日志</h2>
      <log-viewer class="viewer" :height="ViewerHeight" :log="log" :loading="loading"/>
    </el-main>
  </div>
</template>

<style scoped>
  .title {
    margin-left: 10px;
    display: inline;
  }
  .task-button {
    float: right;
  }
  .cards{
    height: 150px;
  }
  .card {
    width: 35%;
    height: 150px;
    margin: 1%;
  }
  .tag {
    display: block;
    margin-bottom: 3%;
  }
  .log {
    margin: 0px;
    padding: 0px;
  }
</style>

<script>
import { getTaskInfo, fetchLog } from '@/api/task'

export default {
  data() {
    return {
      log: 'Test...',
      loading: true,
      height: `${document.documentElement.clientHeight}`,
      currentTask: {
        id: '',
        taskName: '',
        releaseTime: '',
        filename: '',
        fileLink: '',
        fileType: '',
        taskStatus: '',
        crashFound: '',
        crashUsed: ''
      },
      runTime: '',
      // 定时器 实时更新
      timer: '',
      polling: ''
    }
  },
  computed: {
    ViewerHeight: function() {
      // TODO 任务日志框的大小，暂时Hack code
      if (this.height < 700) {
        return 280
      } else {
        return 450
      }
    }
  },
  mounted: function() {
    const data = {
      id: this.$route.query
    }
    getTaskInfo(data).then((response) => {
      this.currentTask = response.data
      this.updateTime()
      this.fetchLog()
    }).catch(() => {
      this.showMessage('获取任务详情失败', 'error')
    })
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.polling)
  },
  methods: {
    showMessage(message, type) {
      this.$message({
        message,
        type
      })
    },
    goBack() {
      this.$router.push({ name: 'funcs.func1' })
    },
    updateTime() {
      this.timer = setInterval(() => {
        const time = new Date() - new Date(this.currentTask.releaseTime)
        this.runTime = this.msToTime(time)
      }, 1000)
    },
    fetchLog() {
      this.polling = setInterval(() => {
        const data = {
          id: this.$route.query
        }
        fetchLog(data).then((response) => {
          console.log(response)
          if (response.message === 'success') {
            this.log += '\n' + response.data.log
          } else if (response.message === 'completed') {
            this.loading = false
            this.currentTask.taskStatus = '已完成'
          }
        }).catch(() => {
          this.showMessage('获取任务日志失败', 'error')
        })
      }, 1000)
    },
    msToTime(ms) {
      const use_days = parseInt(ms / 1000 / 60 / 60 / 24)
      const use_hours = parseInt(ms / 1000 / 60 / 60 % 24)
      const user_min = parseInt(ms / 1000 / 60 % 60)
      const user_second = parseInt(ms / 1000 % 60)

      return `${use_days}:${use_hours}:${user_min}:${user_second}`
    }
  }
}
</script>
