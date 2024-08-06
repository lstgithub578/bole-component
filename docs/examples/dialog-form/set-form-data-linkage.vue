<template>
  <div>
    <bo-dialog ref="dialog">
      <bo-form :formProps="{ labelWidth: 'auto' }" :options="options" :rules="rules"></bo-form>
    </bo-dialog>
    <el-button type="primary" @click="open(12)">打开并设置表单数据</el-button>
    <el-button type="primary" @click="open()">打开表单</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormObjectOptions, type DialogInstance } from 'bole-component'
import { FormRules } from 'element-plus'

// 构建联动数据
const data = [
  {
    id: 1,
    name: '市场部',
    parentId: 0
  },
  {
    id: 2,
    name: '技术部',
    parentId: 0
  },
  {
    id: 3,
    name: '销售部',
    parentId: 1
  },
  {
    id: 4,
    name: '宣传部',
    parentId: 1
  },
  {
    id: 5,
    name: '销售部1',
    parentId: 3
  },
  {
    id: 6,
    name: '销售部2',
    parentId: 3
  },
  {
    id: 7,
    name: '宣传部1',
    parentId: 4
  },
  {
    id: 8,
    name: '宣传部2',
    parentId: 4
  },
  {
    id: 9,
    name: '宣传部3',
    parentId: 4
  },
  {
    id: 10,
    name: '前端开发部',
    parentId: 2
  },
  {
    id: 11,
    name: '后端开发部',
    parentId: 2
  },
  {
    id: 12,
    name: '前端A组',
    parentId: 10
  },
  {
    id: 13,
    name: '后端A组',
    parentId: 11
  }
]

const buildTree = (): any => {
  const map = data.reduce((p: any, c: any) => {
    p[c.id] = c
    return p
  }, {})

  data.forEach((val) => {
    if (map[val.parentId]) {
      if (!map[val.parentId].children) map[val.parentId].children = []

      map[val.parentId].children.push(val)
    }
  })

  return {
    dataMap: map,
    firstLevelData: data.filter((val) => val.parentId === 0)
  }
}

const { dataMap, firstLevelData } = buildTree()

// 模拟获取数据
function getData(parentId: number) {
  let data = dataMap[parentId]?.children || []
  return Promise.resolve(data)
}

const valueGetter = (item: any) => item.id
const labelGetter = (item: any) => item.name

const options: FormObjectOptions = {
  name: '名称',
  career: {
    label: '职位',
    type: 'select',
    data: ['前端开发', '后端开发']
  },
  department1: {
    label: '一级部门',
    type: 'select',
    valueGetter,
    labelGetter,
    asyncData: () => Promise.resolve(firstLevelData),
    event({ clearComponentData, getAsyncData }) {
      return {
        change(val: number) {
          clearComponentData(['department2', 'department3'])

          if (val) getAsyncData('department2')
        }
      }
    }
  },
  department2: {
    label: '二级部门',
    type: 'select',
    valueGetter,
    labelGetter,
    event({ clearComponentData, getAsyncData }) {
      return {
        change(val: number) {
          clearComponentData('department3')

          if (val) getAsyncData('department3')
        }
      }
    },
    asyncData: ({ formData }) =>
      formData.department1 ? getData(formData.department1) : Promise.resolve([])
  },
  department3: {
    label: '三级部门',
    type: 'select',
    valueGetter,
    labelGetter,
    asyncData: ({ formData }) =>
      formData.department2 ? getData(formData.department2) : Promise.resolve([])
  }
}

const rules: FormRules = {
  name: { required: true, message: '请输入名称' },
  age: {
    required: true,
    type: 'number',
    trigger: 'blue',
    message: '请输入年龄'
  },
  career: { required: true, message: '请选择年龄' }
}

const dialog = ref<DialogInstance>()

// 模拟回显表单数据
function getById(): any {
  return Promise.resolve({
    name: '鄙人张三',
    career: '前端开发',
    department1: 2,
    department2: 10,
    department3: 12
  })
}

function open(id?: number) {
  dialog.value?.open({
    title: '表单',
    validateForm: false,
    setFormData: (callBack) => {
      // 在这里获取有依赖性的联动数据
      callBack(({ getAsyncData }) => {
        getAsyncData(['department2', 'department3'])
      })

      return id ? getById() : null
    },
    confirm({ data, close }) {
      console.log('data', data)
      close()
    }
  })
}
</script>

<style scoped></style>
