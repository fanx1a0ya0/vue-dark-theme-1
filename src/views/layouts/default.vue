<template>
  <div id="app">
    <el-container>
      <!-- Aside -->
      <layout-aside />
      <!-- Aside -->

      <el-container direction="vertical">
        <!-- Header -->
        <layout-header />
        <!-- Header -->

        <!-- View -->
        <router-view />
        <!-- View -->

      </el-container>
    </el-container>
  </div>
</template>
