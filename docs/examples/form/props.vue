<template>
  <bo-form ref="form" :formProps="{ labelWidth: 'auto' }" :options="options"> </bo-form>
  <div>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormObjectOptions, type FormInstance } from 'bole-component'

defineOptions({
  name: 'FormProps'
})

const options: FormObjectOptions = {
  hobby: {
    label: '爱好',
    type: 'select',
    data: ['唱', '跳', 'rap'],
    // 设置组件的props
    props: {
      // 多选
      multiple: true,
      // 可以清空
      clearable: true
    },
    /**
     *
     * @param formExpose 表单实例
     * @param data 选项的数据
     * @param item 当前选项的数据
     * @param index 选项的索引
     */
    dataItemProps(formExpose, data, item, index) {
      return {
        disabled: index === 0
      }
    }
  },
  career: {
    label: '职业',
    type: 'radio',
    dataItemProps: {
      border: true
    },
    data: ['前端', '后端']
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
