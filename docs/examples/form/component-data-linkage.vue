<template>
  <bo-form ref="form" :formProps="{ labelWidth: '70px' }" :options="options"> </bo-form>

  <div>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormObjectOptions, type FormInstance } from 'bole-component'

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
    // 树形数据
    dataMap: map,
    // 第一级数据
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
  title: {
    label: '三级联动',
    type: 'slot',
    colProps: {
      span: 2
    }
  },
  level1: {
    label: '',
    type: 'select',
    data: firstLevelData,
    colProps: {
      span: 6
    },
    valueGetter,
    labelGetter,
    event({ getAsyncData, clearComponentData }) {
      return {
        change(val: number) {
          clearComponentData(['level2', 'level3'])
          if (val) {
            getAsyncData('level2')
          }
        }
      }
    }
  },
  level2: {
    label: '',
    type: 'select',
    colProps: {
      span: 6
    },
    valueGetter,
    labelGetter,
    asyncData({ formData }) {
      return formData.level1 ? getData(formData.level1) : Promise.resolve([])
    },
    event({ getAsyncData, clearComponentData }) {
      return {
        change(val: number) {
          clearComponentData('level3')
          if (val) {
            getAsyncData('level3')
          }
        }
      }
    }
  },
  level3: {
    label: '',
    type: 'select',
    valueGetter,
    labelGetter,
    colProps: {
      span: 6
    },
    asyncData({ formData }) {
      return formData.level2 ? getData(formData.level2) : Promise.resolve([])
    }
  }
}

const form = ref<FormInstance>()

function submit() {
  form.value?.getData<any>().then((data) => {
    console.log('data', data)
  })
}

function reset() {
  form.value?.resetData()
}
</script>

<style scoped></style>
