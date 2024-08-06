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

const frontendSkills = ['vue', 'react', 'angular']
const backendSkills = ['java', 'mysql', 'golang']

const data = [...frontendSkills, ...backendSkills]

const options: FormObjectOptions = {
  career: {
    label: '职业',
    type: 'radio',
    dataItemProps: {
      border: true
    },
    data: ['前端', '后端'],
    valueGetter: (item, index) => index,
    event({ formData }) {
      return {
        change(val: number) {
          formData.skillsByCheckbox = []
          formData.skillsBySelect = []

          if (val === 0) {
            formData.backend = []
          } else {
            formData.frontend = []
          }
        }
      }
    }
  },
  skillsByCheckbox: {
    label: '技能（多选框）',
    type: 'checkbox',
    data,
    props({ formData }) {
      return {
        // 要选了职业才能选该选项
        disabled: !(typeof formData.career === 'number')
      }
    },
    dataItemProps({ formData }, data, item, index) {
      let skills = formData.career === 0 ? frontendSkills : backendSkills
      return { disabled: !skills.includes(item) }
    }
  },
  skillsBySelect: {
    label: '技能（多选框）',
    type: 'select',
    data,
    props({ formData }) {
      return {
        multiple: true,
        clearable: true,
        // 要选了职业才能选该选项
        disabled: !(typeof formData.career === 'number')
      }
    },
    dataItemProps({ formData }, data, item, index) {
      let skills = formData.career === 0 ? frontendSkills : backendSkills
      return { disabled: !skills.includes(item) }
    }
  },
  frontend: {
    label: '前端技能',
    type: 'select',
    data: frontendSkills,
    props({ formData }) {
      return {
        multiple: true,
        disabled: !(formData.career === 0)
      }
    }
  },
  backend: {
    label: '后端技能',
    type: 'select',
    data: backendSkills,
    props({ formData }) {
      return {
        multiple: true,
        disabled: !(formData.career === 1)
      }
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
