<script setup lang="ts">
import { ref } from 'vue'
import { type FormInstance, type FormOptions } from 'bole-component'
import { type FormRules } from 'element-plus'
import { isRef } from 'vue'
defineOptions({
  name: 'FormValidation'
})

const formOptions: FormOptions = [
  {
    key: 'status',
    label: '当前类型：',
    type: 'slot'
  },
  {
    key: 'idSlot',
    label: '数据id：',
    type: 'slot'
  },
  {
    key: 'username',
    label: '用户名',
    type: 'input'
  },
  {
    key: 'password',
    label: '密码',
    type: 'input'
  },
  {
    key: 'confirmPassword',
    label: '密码',
    type: 'input'
  }
]

const form = ref<FormInstance>()

function setFormData(data: any) {
  form.value?.setData(data)
  if (!isRef(form.value?.elForm)) {
    form.value?.elForm.clearValidate()
  }
}

async function getData() {
  console.log(await form.value?.getData())
}

function formRules(formInstance: FormInstance): FormRules {
  function passwordValidator(key: string) {
    return (rules: any, value: any, callback: Function) => {
      if (value && formInstance.formData[key] !== value) {
        callback('两次输入的密码不一样！')
      } else {
        if (isRef(formInstance?.elForm)) formInstance?.elForm?.value.clearValidate(key)
        callback()
      }
    }
  }

  const formRules: FormRules = {
    username: { required: true, message: '请输入用户名' }
  }

  // 修改（密码非必填）
  if (formInstance.formData.id) {
    formRules.password = [
      {
        validator: passwordValidator('confirmPassword')
      }
    ]
    formRules.confirmPassword = [
      {
        validator: passwordValidator('password')
      }
    ]
  } else {
    // 新增（密码必填）
    formRules.password = [
      {
        required: true,
        message: '请输入密码'
      },
      {
        validator: passwordValidator('confirmPassword')
      }
    ]
    formRules.confirmPassword = [
      {
        required: true,
        message: '请输入确认密码'
      },
      {
        validator: passwordValidator('password')
      }
    ]
  }
  return formRules
}
</script>

<template>
  <div>
    <BoForm
      ref="form"
      :options="formOptions"
      :rules="formRules"
      :formProps="{
        labelWidth: '100px',
        validateOnRuleChange: false
      }"
    >
      <template #status="{ formData }">
        <span> {{ formData.id ? '修改' : '新增' }} </span>
      </template>
      <template #idSlot="{ formData }">
        <span> {{ formData.id }} </span>
      </template>
    </BoForm>

    <div>
      <el-button
        @click="
          setFormData({
            id: '01',
            username: '张三'
          })
        "
        >填充数据(模拟修改)</el-button
      >
      <el-button
        @click="
          setFormData({
            id: null,
            username: null
          })
        "
        >清空id(模拟新增)</el-button
      >
      <el-button @click="form?.resetData()">重置</el-button>
      <el-button type="primary" @click="getData()">提交</el-button>
    </div>
  </div>
</template>
