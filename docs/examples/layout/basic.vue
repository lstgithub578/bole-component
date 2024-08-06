<template>
  <BoLayout>
    <template #header>
      <BoFilter :options="filterOptions" :formProps="{ labelWidth: '60px' }">
        <template #btn-append></template>
      </BoFilter>
    </template>
    <template #default="{ hiddenColums }">
      <BoTable :options="tableOptions" :data="data" :hiddenColsByLabel="hiddenColums">
        <template #action>
          <el-button type="warning">修改</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </BoTable>
    </template>
  </BoLayout>
</template>

<script setup lang="ts">
import { FormOptions, TableArrayColumns } from 'bole-component'
defineOptions({
  name: 'LayoutBasic'
})

const filterOptions: FormOptions = [
  {
    key: 'name',
    label: '姓名',
    type: 'input',
    formItemProps: {
      labelWidth: '45px'
    }
  },
  {
    key: 'department',
    label: '部门',
    type: 'select',
    data: ['市场部', '技术部']
  }
]

const tableOptions: TableArrayColumns = [
  {
    label: '选项',
    prop: 'checkbox',
    props: {
      type: 'selection',
      width: '40'
    }
  },
  {
    prop: 'name',
    label: '名称',
    props: {
      align: 'center',
      width: 100
    }
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'department',
    label: '部门'
  },
  {
    label: '联系方式',
    prop: 'correspondence',
    children: [
      {
        label: '联系地址',
        prop: 'postalAddress'
      },
      {
        label: '联系电话',
        prop: 'communicationTelephone',
        children: [
          {
            label: '联系电话1',
            prop: 'telephone1'
          },
          {
            label: '联系电话2',
            prop: 'telephone2'
          }
        ]
      }
    ]
  },
  {
    label: '操作',
    slot: 'action',
    props: {
      minWidth: 180
    }
  }
]

const data = [
  {
    name: '张三',
    age: 18,
    department: '市场部',
    postalAddress: 'xxx市xxx路1号',
    telephone1: 13888888887,
    telephone2: 13888888888
  },
  {
    name: '李四',
    age: 22,
    department: '技术部',
    postalAddress: 'xxx市xxx路2号',
    telephone1: 13888888889,
    telephone2: 13888888890
  },
  {
    name: '小明',
    age: 22,
    department: '技术部',
    postalAddress: 'xxx市xxx路3号',
    telephone1: 13888888891,
    telephone2: 13888888892
  }
]
</script>
