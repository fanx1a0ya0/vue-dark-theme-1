<template>
  <el-card>
    <el-row class="mb">
      <el-col :span="4">
        <el-input v-model="filters.keyword" @change="getRepositories">
          <i slot="suffix" class="el-input__icon fas fa-fw fa-search" />
        </el-input>
      </el-col>
      <el-col :span="20" class="text-right">
        <el-button type="primary" icon="fas fw-fa fa-broom">新增 Repository</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" class="mb" :data="items">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="full_name" label="存储库">
        <template slot-scope="scope">
          <a :href="scope.row.html_url" target="_blank">{{ scope.row.html_url }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="owner" label="用户" width="180">
        <template slot-scope="scope">
          <div class="items-center">
            <a :href="scope.row.owner.html_url" target="_blank">
              <span>{{ scope.row.owner.login }}</span>
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="license" label="许可" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.license" effect="dark" class="mx-r4">{{ scope.row.license.spdx_id }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="watchers_count" label="WATCH" width="128">
        <template slot-scope="scope">
          <span class="fas fa-fw fa-eye mx-r4" />
          {{ scope.row.watchers_count > 1000 ? parseFloat(scope.row.watchers_count/1000).toFixed(2)+'K' : scope.row.watchers_count }}
        </template>
      </el-table-column>
      <el-table-column prop="stargazers_count" label="STAR" width="128">
        <template slot-scope="scope">
          <span class="fas fa-fw fa-star mx-r4" />
          {{ scope.row.stargazers_count > 1000 ? parseFloat(scope.row.stargazers_count/1000).toFixed(2)+'K' : scope.row.stargazers_count }}
        </template>
      </el-table-column>
      <el-table-column prop="actions" label="" width="80">
        <template slot-scope="scope">
          <el-dropdown trigger="click" placement="bottom">
            <a href="javascript:;" class="el-dropdown-link">
              <span>Actions</span>
              <i class="fas fa-fw fa-caret-down" />
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="fas fa-fw fa-keyboard">编辑</el-dropdown-item>
              <el-dropdown-item icon="fas fa-fw fa-trash">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="display: none">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="text-center">
      <el-pagination :current-page="filters.page" :page-sizes="[15, 20, 30, 50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      loading: false,
      items: [],
      filters: {
        page: 1,
        keyword: null,
        per_page: 15,
        sort: 'stars',
        q: 'language:javascript'
      }
    }
  },

  created() {
    this.getRepositories()
  },

  methods: {
    async getRepositories() {
      this.loading = true
      const { data } = await this.$axios.get('https://api.github.com/search/repositories', { params: this.filters })
      this.total = data.total_count
      this.items = data.items
      this.loading = false
    },

    handleCurrentChange(page) {
      this.filters.page = page
      this.getRepositories()
    },

    handleSizeChange(size) {
      this.filters.page = 1
      this.filters.per_page = size
      this.getRepositories()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/vars";

  ::v-deep {}
</style>
