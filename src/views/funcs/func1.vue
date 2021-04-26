<template>
  <div>
    <blockquote>
      <i class="fas fa-list"></i><p class="title">漏洞挖掘与利用</p>
    </blockquote>
    <el-row class="task-button">
      <el-button type="primary" @click="dialogVisible = true">新建任务</el-button>
      <el-button type="danger">删除</el-button>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <el-form ref="form" label-width="15%">
        <el-form-item label="作业名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上传待挖掘文件">
          <el-upload
            action=""
            multiple
            :http-request="uploadFile"
            :on-change="uploadChange"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-left: 75%">
          <el-button type="primary" @click="submitTask">确定</el-button>
          <el-button @click="dialogVisible = true">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-container>
      <el-table style="width: 100%" :data="taskList">
        <el-table-column
          prop="taskName"
          label="任务名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="releaseTime"
          label="任务下发时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="filename"
          label="待挖掘文件">
        </el-table-column>
        <el-table-column
          prop="fileType"
          label="文件类型">
        </el-table-column>
        <el-table-column
          prop="taskStatus"
          label="任务状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="goTaskDetail(scope.row)">运行</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<style scoped>
  .title {
    margin-left: 10px;
    display: inline;
  }
  .task-button {
    margin: 10px;
  }
</style>
<script>
import { upload, submit, fetchTaskList } from '@/api/task'

export default {
  data() {
    return {
      dialogVisible: false,
      // 当前要提交的task的表单信息
      form: {
        name: ''
      },
      fileList: [],
      // 上传完文件回传的文件存储链接
      fileLink: '',
      // 完整的task结构
      currentTask: {
        id: '',
        taskName: '',
        releaseTime: '',
        filename: '',
        fileLink: '',
        fileType: '',
        taskStatus: ''
      },
      taskList: []
    }
  },
  mounted: function() {
    this.fetchTaskList()
  },
  methods: {
    showMessage(message, type) {
      this.$message({
        message,
        type
      })
    },
    fetchTaskList() {
      // 获取所有的task
      fetchTaskList().then((response) => {
        this.taskList = response.data
      }).catch(() => {
        this.showMessage('任务列表获取失败', 'error')
      })
    },
    uploadChange(file, fileList) {
      // 拿到要上传的文件
      this.fileList = fileList
    },
    uploadSuccess(data) {
      // 上传文件后回传的文件存储链接
      this.fileLink = data
    },
    uploadFile() {
      const formData = new FormData()
      formData.append('file', this.fileList[0].raw)

      upload(formData).then((response) => {
        this.uploadSuccess(response.data)
      }).catch(() => {
        this.showMessage('文件上传失败', 'error')
      })
    },
    submitTask() {
      const name = this.fileList[0].raw.name

      this.currentTask = {
        id: '',
        taskName: this.form.name,
        releaseTime: new Date().toISOString(),
        filename: name.substring(0, name.lastIndexOf('.')),
        fileLink: this.fileLink,
        fileType: name.substring(name.lastIndexOf('.')),
        taskStatus: '待完成'
      }
      submit(this.currentTask).then((response) => {
        // 回填一个主键id
        this.currentTask.id = response.data.id
        this.taskList.push(this.currentTask)
        this.resetAndShow()
      }).catch(() => {
        this.showMessage('服务器异常', 'error')
      })
    },
    resetAndShow() {
      this.form = {}
      this.fileList = []
      this.currentTask = {}
      this.dialogVisible = false
      this.showMessage('任务提交成功', 'success')
    },
    goTaskDetail(task) {
      this.$router.push({ name: 'funcs.detail', query: { id: task.id }})
    }
  }
}
</script>
