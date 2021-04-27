<template>
  <el-aside width="235px">
    <div class="symbol">
      <img src="@/assets/symbol.svg">
      <b>自动化攻击平台</b>
    </div>
    <el-menu :default-active="$route.name" router unique-opened>
      <el-menu-item-group>
        <el-submenu index="-1">
          <template slot="title">
            <i class="fas fa-fw fa-house-damage" />
            <span>控制面板</span>
          </template>
          <el-menu-item index="welcome" :route="{name: 'welcome'}">控制台</el-menu-item>
        </el-submenu>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-submenu index="0">
          <template slot="title">
            <i class="fas fa-fw fa-house-damage" />
            <span>功能区</span>
          </template>
          <el-menu-item index="funcs.func1" :route="{name: 'funcs.func1'}">漏洞挖掘与利用</el-menu-item>
          <el-menu-item index="funcs.func2" :route="{name: 'funcs.func2'}">功能二</el-menu-item>
          <el-menu-item index="funcs.func3" :route="{name: 'funcs.func3'}">密码生成对比</el-menu-item>
          <el-menu-item index="funcs.func4" :route="{name: 'funcs.func4'}">功能四</el-menu-item>
        </el-submenu>
      </el-menu-item-group>
      <el-menu-item-group>
        <span slot="title">Pages</span>
        <el-submenu index="1">
          <template slot="title">
            <i class="fas fa-fw fa-keyboard" />
            <span>表单页面</span>
          </template>
          <el-menu-item index="forms.standard" :route="{name: 'forms.standard'}">标准表单</el-menu-item>
          <el-menu-item index="forms.steps" :route="{name: 'forms.steps'}">分步表单</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="fas fa-fw fa-server" />
            <span>列表页面</span>
          </template>
          <el-menu-item index="listing.standard" :route="{name: 'listing.standard'}">标准表格</el-menu-item>
          <el-menu-item index="listing.cards" :route="{name: 'listing.cards'}">卡片列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="fas fa-fw fa-bomb" />
            <span>异常页面</span>
          </template>
          <el-menu-item index="401" :route="{name: '401'}">401 页面</el-menu-item>
          <el-menu-item index="403" :route="{name: '403'}">403 页面</el-menu-item>
          <el-menu-item index="404" :route="{name: '404'}">404 页面</el-menu-item>
          <el-menu-item index="500" :route="{name: '500'}">500 页面</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="fas fa-fw fa-chess-queen" />
            <span>业务页面</span>
          </template>
          <el-menu-item index="business.invoice" :route="{name: 'business.invoice'}">清单页面</el-menu-item>
          <el-menu-item index="business.chatrooms" :route="{name: 'business.chatrooms'}">聊天页面</el-menu-item>
        </el-submenu>
      </el-menu-item-group>
      <el-menu-item-group>
        <span slot="title">COMPONENTS</span>
        <el-submenu index="5">
          <template slot="title">
            <i class="fas fa-fw fa-play-circle" />
            <span>媒体组件</span>
          </template>
          <el-menu-item index="medias.video" :route="{name: 'medias.video'}">视频组件</el-menu-item>
          <el-menu-item index="1-5-1">音频组件</el-menu-item>
          <el-menu-item index="1-5-2">图片组件</el-menu-item>
          <el-menu-item index="1-5-3">文件组件</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="fas fa-fw fa-chart-pie" />
            <span>图表组件</span>
          </template>
          <el-menu-item index="charts.bar" :route="{name: 'charts.bar'}">条形图</el-menu-item>
          <el-menu-item index="charts.line" :route="{name: 'charts.line'}">折线图</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="fas fa-fw fa-plug" />
            <span>图标组件</span>
          </template>
          <el-menu-item index="icons.fontawesome" :route="{name: 'icons.fontawesome'}">Font Awesome</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <i class="fas fa-fw fa-quidditch" />
            <span>编辑组件</span>
          </template>
          <el-menu-item index="1-8-1">代码编辑器</el-menu-item>
          <el-menu-item index="1-8-2">富文本编辑器</el-menu-item>
          <el-menu-item index="1-8-3">JSON 编辑器</el-menu-item>
          <el-menu-item index="editors.ueditor" :route="{name: 'editors.ueditor'}">UEditor 编辑器</el-menu-item>
        </el-submenu>
        <el-submenu index="9">
          <template slot="title">
            <i class="fas fa-fw fa-box-open" />
            <span>数据导出</span>
          </template>
          <el-menu-item index="1-9-1">ZIP 导出</el-menu-item>
          <el-menu-item index="1-9-2">PDF 导出</el-menu-item>
          <el-menu-item index="1-9-3">Excel 导出</el-menu-item>
        </el-submenu>
      </el-menu-item-group>
    </el-menu>
  </el-aside>
</template>

<script>
export default {

  data: () => ({}),

  methods: {}
}
</script>

<style lang="scss" scoped>

  @import "@/styles/vars";
  @import url('https://fonts.googleapis.com/css?family=Nunito:600,700&display=swap');

  ::v-deep {
    &.el-aside {
      overflow-y: scroll;
      position: relative;
      background: $--color-dark-ligher;

      .symbol {
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        display: flex;
        position: sticky;
        padding: 16px 24px;
        align-items: center;
        margin-bottom: 16px;
        justify-content: center;
        background: $--color-dark-heavy;
        border-bottom: 1px solid #0f1015;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .01);

        img {
          width: 32px;
          height: 32px;
          margin-left: -12px;
          margin-right: 12px;
        }

        b {
          font-size: 20px;
          font-family: Nunito;
          text-transform: capitalize;
        }
      }
    }
  }

</style>
