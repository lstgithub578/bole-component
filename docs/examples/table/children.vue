<template>
  <div>
    <bo-table :data="data" :options="options"> </bo-table>
  </div>
</template>

<script setup lang="ts">
import { type TableArrayColumns } from 'bole-component'

defineOptions({
  name: 'TableChildren'
})

const options: TableArrayColumns = [
  {
    props: {
      type: 'selection',
      width: '40'
    }
  },
  {
    label: '个人信息',
    children: [
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
        prop: 'hobby',
        label: '爱好'
      },
      {
        label: '通讯方式',
        children: [
          {
            label: '通讯地址',
            prop: 'postalAddress'
          },
          {
            label: '通讯电话',
            prop: 'communicationTelephone'
          }
        ]
      }
    ]
  }
]

const data = [
  {
    name: '张三',
    age: 18,
    hobby: '唱',
    postalAddress: 'xxx市xxx路1号',
    communicationTelephone: 13888888887
  },
  {
    name: '李四',
    age: 22,
    hobby: '跳',
    postalAddress: 'xxx市xxx路2号',
    communicationTelephone: 13888888888
  },
  {
    name: '小明',
    age: 22,
    hobby: 'rap',
    postalAddress: 'xxx市xxx路3号',
    communicationTelephone: 13888888889
  }
]
</script>
