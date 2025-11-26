<template>
  <div class="charts-container">
    <h1>数据可视化</h1>
    <p>这是一个数据可视化页面示例</p>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>用户增长趋势</span>
            </div>
          </template>
          <div class="chart-wrapper">
            <div ref="lineChartRef" class="chart"></div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>用户分布</span>
            </div>
          </template>
          <div class="chart-wrapper">
            <div ref="pieChartRef" class="chart"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>销售数据</span>
            </div>
          </template>
          <div class="chart-wrapper">
            <div ref="barChartRef" class="chart"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 注意：在实际项目中，需要安装 echarts 并正确导入
// import * as echarts from 'echarts'

// 图表引用
const lineChartRef = ref<HTMLDivElement | null>(null)
const pieChartRef = ref<HTMLDivElement | null>(null)
const barChartRef = ref<HTMLDivElement | null>(null)

// 图表实例
let lineChart: any = null
let pieChart: any = null
let barChart: any = null

// 初始化图表
const initCharts = () => {
  // 注意：在实际项目中，需要安装 echarts 并正确初始化
  /*
  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value)
    lineChart.setOption(getLineChartOption())
  }
  
  if (pieChartRef.value) {
    pieChart = echarts.init(pieChartRef.value)
    pieChart.setOption(getPieChartOption())
  }
  
  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value)
    barChart.setOption(getBarChartOption())
  }
  */
  
  // 模拟图表渲染
  console.log('初始化图表...')
}

// 获取折线图配置
const getLineChartOption = () => {
  return {
    title: {
      text: '用户增长趋势'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110],
      type: 'line',
      smooth: true
    }]
  }
}

// 获取饼图配置
const getPieChartOption = () => {
  return {
    title: {
      text: '用户分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [{
      name: '用户分布',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '普通用户' },
        { value: 735, name: 'VIP用户' },
        { value: 580, name: '管理员' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
}

// 获取柱状图配置
const getBarChartOption = () => {
  return {
    title: {
      text: '销售数据'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }]
  }
}

// 调整图表大小
const resizeCharts = () => {
  /*
  if (lineChart) lineChart.resize()
  if (pieChart) pieChart.resize()
  if (barChart) barChart.resize()
  */
}

// 组件挂载时初始化图表
onMounted(() => {
  initCharts()
  window.addEventListener('resize', resizeCharts)
})

// 组件卸载前清理
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts)
  /*
  if (lineChart) lineChart.dispose()
  if (pieChart) pieChart.dispose()
  if (barChart) barChart.dispose()
  */
})
</script>

<style scoped>
.charts-container {
  padding: 20px;
}

.chart-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-wrapper {
  height: 300px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>