<template>
  <el-card class="mb">
    <div slot="header"><b>👨‍💻 用户登录</b></div>
    <el-form ref="form" :model="form" label-position="top">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" icon="fas fa-fw fa-fingerprint" class="block" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { login } from '@/api/user'

export default {
  data: () => ({
    loading: false,
    form: {
      username: 'admin',
      password: 'admin'
    }
  }),

  methods: {
    onSubmit() {
      this.loading = true
      login(this.form).then(response => {
        const { data } = response
        console.log(data)
        setTimeout(() => {
          this.loading = false
          this.$store.commit('USER_LOGIN', 'test_token', true)
          this.$router.push({ name: 'default' })
        }, 1000)
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
