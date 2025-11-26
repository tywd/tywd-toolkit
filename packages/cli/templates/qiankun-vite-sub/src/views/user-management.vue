<template>
  <div class="user-management-container">
    <h1>用户管理</h1>
    <p>这是一个用户管理页面示例</p>
    
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="searchForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="toolbar">
      <el-button type="primary" @click="onAddUser">新增用户</el-button>
      <el-button type="danger" @click="onDeleteSelected" :disabled="selectedUsers.length === 0">批量删除</el-button>
    </div>

    <el-table 
      :data="userTableData" 
      style="width: 100%" 
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="onDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索表单
const searchForm = reactive({
  username: '',
  email: ''
})

// 表格数据
const userTableData = ref([
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: '管理员',
    createTime: '2023-01-01'
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    role: '普通用户',
    createTime: '2023-01-02'
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    role: '普通用户',
    createTime: '2023-01-03'
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const loading = ref(false)

// 选中的用户
const selectedUsers = ref([])

// 搜索
const onSearch = () => {
  ElMessage.info('执行搜索操作')
  console.log('搜索条件:', searchForm)
}

// 重置
const onReset = () => {
  searchForm.username = ''
  searchForm.email = ''
}

// 新增用户
const onAddUser = () => {
  ElMessage.info('打开新增用户对话框')
}

// 编辑用户
const onEdit = (row: any) => {
  ElMessage.info(`编辑用户: ${row.username}`)
}

// 删除用户
const onDelete = (row: any) => {
  ElMessageBox.confirm(
    `确定要删除用户 "${row.username}" 吗？`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 批量删除
const onDeleteSelected = () => {
  ElMessageBox.confirm(
    `确定要删除选中的 ${selectedUsers.value.length} 个用户吗？`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage.success('批量删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 处理选中变化
const handleSelectionChange = (val: any[]) => {
  selectedUsers.value = val
}

// 处理分页大小变化
const handleSizeChange = (val: number) => {
  pageSize.value = val
  console.log(`每页 ${val} 条`)
}

// 处理当前页变化
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  console.log(`当前页: ${val}`)
}
</script>

<style scoped>
.user-management-container {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.toolbar {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>