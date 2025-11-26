<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <p>Welcome to the qiankun-vite-sub application.</p>
    
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="color: #409EFF">
              <i class="el-icon-user"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">128</div>
              <div class="stat-label">用户数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="color: #67C23A">
              <i class="el-icon-shopping-cart"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">56</div>
              <div class="stat-label">订单数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="color: #E6A23C">
              <i class="el-icon-document"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">24</div>
              <div class="stat-label">文章数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="color: #F56C6C">
              <i class="el-icon-message"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">8</div>
              <div class="stat-label">消息数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>最近30天用户增长</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <p>图表区域 - 显示用户增长趋势图</p>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card class="activity-card">
          <template #header>
            <div class="card-header">
              <span>最新活动</span>
            </div>
          </template>
          <div class="activity-list">
            <div class="activity-item" v-for="i in 5" :key="i">
              <div class="activity-content">
                <div class="activity-title">用户 {{ i }} 完成了注册</div>
                <div class="activity-time">{{ i }} 小时前</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-card class="feature-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>功能特性</span>
        </div>
      </template>
      <div class="feature-item">
        <el-tag type="success">Vue 3</el-tag>
        <el-tag type="primary">Vite</el-tag>
        <el-tag type="warning">TypeScript</el-tag>
        <el-tag type="danger">Qiankun</el-tag>
        <el-tag type="info">Element Plus</el-tag>
        <el-tag>Pinia</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 子应用仪表盘页面
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Dashboard page mounted')
})
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.stats-row {
  margin-top: 20px;
}

.stat-card {
  height: 120px;
}

.stat-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.stat-icon {
  font-size: 36px;
  margin-right: 20px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
}

.stat-label {
  color: #909399;
  margin-top: 5px;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C0C4CC;
}

.activity-list {
  height: 300px;
  overflow-y: auto;
}

.activity-item {
  padding: 10px 0;
  border-bottom: 1px solid #EBEEF5;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-title {
  font-size: 14px;
}

.activity-time {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.feature-card {
  max-width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feature-item {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>