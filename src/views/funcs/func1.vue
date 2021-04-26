<template>
  <div>
    <blockquote>
      <svg t="1619348754237" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1177" width="20" height="20"><path d="M927.25551408 262.13793185H96.96293925c-27.37948445 0-49.56463408-21.73610667-49.56463407-48.54518518s22.19728592-48.54518518 49.56463407-48.54518519h830.29257483c27.37948445 0 49.56463408 21.73610667 49.56463407 48.54518519 0 26.82121482-22.19728592 48.54518518-49.56463407 48.54518518zM927.25551408 837.21633185H96.96293925c-27.37948445 0-49.56463408-21.73610667-49.56463407-48.54518518s22.19728592-48.54518518 49.56463407-48.54518519h830.29257483c27.37948445 0 49.56463408 21.73610667 49.56463407 48.54518519s-22.19728592 48.54518518-49.56463407 48.54518518zM927.25551408 550.29001482H96.96293925c-27.37948445 0-49.56463408-21.73610667-49.56463407-48.54518519s22.19728592-48.54518518 49.56463407-48.54518518h830.29257483c27.37948445 0 49.56463408 21.73610667 49.56463407 48.54518518s-22.19728592 48.54518518-49.56463407 48.54518519z" fill="#666666" p-id="1178"></path></svg>
      <p class="title">漏洞挖掘与利用</p>
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
            <el-button type="primary" @click="runTask(scope.row)">运行</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<style scoped>
  .icon {
    margin-right: 10px;
  }
  .title {
    display: inline;
  }
  .task-button {
    margin: 10px;
  }
</style>
<script>
import { upload } from '@/api/task'

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: ''
      },
      fileList: [],
      fileLink: '',
      currentTask: {
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
  methods: {
    showMessage(message, type) {
      this.$message({
        message,
        type
      })
    },
    uploadChange(file, fileList) {
      this.fileList = fileList
    },
    uploadFail(message) {
      this.showMessage(message, 'error')
    },
    uploadSuccess(data) {
      // data存着url
      this.fileLink = data
    },
    uploadFile() {
      const formData = new FormData()
      formData.append('file', this.fileList[0].raw)

      upload(formData).then((response) => {
        console.log(response)
        if (response.code === 20000) {
          this.uploadSuccess(response.data)
        } else {
          this.uploadFail('文件上传失败')
        }
      }).catch(() => {
        this.uploadFail('服务器异常')
      })
    },
    submitTask() {
      const name = this.fileList[0].raw.name
      console.log(name)
      this.currentTask = {
        taskName: this.form.name,
        releaseTime: new Date().toLocaleString(),
        filename: name.substring(0, name.lastIndexOf('.')),
        // data存url
        fileLink: this.fileLink,
        fileType: name.substring(name.lastIndexOf('.')),
        taskStatus: '待完成'
      }
      this.taskList.push(this.currentTask)
      this.resetAndShow()
    },
    resetAndShow() {
      console.log(this.taskList)
      this.form = {}
      this.fileList = []
      this.currentTask = {}
      this.dialogVisible = false
      this.showMessage('任务提交成功', 'success')
    },
    runTask(task) {
      console.log(task)
    }
  }
}
</script>
