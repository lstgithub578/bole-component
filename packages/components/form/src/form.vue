<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElCheckboxGroup,
  ElSwitch,
  ElCascader,
  ElDatePicker
} from 'element-plus'
import { isString, isObject, isArray, isFunction } from '@bole-component/utils'
import type { FormComponentOption } from './form'
import { formProps } from './form'
import {
  getFormConfig,
  getFormProps,
  getComponentIsShow,
  getComponentProps,
  getDataItemProps,
  getComponentEvent,
  getComponentSlots,
  getColProps
} from './config'
import { formContext } from './context'
import RadioComponent from './radio.vue'
import CheckboxComponent from './checkbox.vue'

defineOptions({
  name: 'BoForm'
})

const props = defineProps(formProps)

const { formRef, formExpose, state, componentOptions, getComponentData } = formContext(props)

// 表单默认数据
defineExpose(formExpose)

// 获取formItem 的 label
function getFormItemLabel(item: FormComponentOption) {
  return isString(item) ? item : item.label === '' ? '' : item.label || item.key
}
</script>

<template>
  <el-form
    ref="formRef"
    v-bind="getFormProps(props.formProps)"
    :model="state.formData"
    :rules="isFunction(props.rules) ? props.rules(formExpose) : props.rules"
  >
    <el-row v-bind="props.rowProps">
      <template v-for="item in componentOptions">
        <el-col
          v-if="getComponentIsShow(item, formExpose, state)"
          :key="item.key"
          v-bind="getColProps(props.colProps, item)"
        >
          <el-form-item
            :prop="item.key"
            :label="getFormItemLabel(item)"
            :label-width="item.label === '' ? '0px' : ''"
            v-bind="item.formItemProps"
          >
            <div class="bo-form-item-component-wrap" :style="item.warpCss || {}">
              <component
                :is="
                  item.prepend
                    ? item.prepend(formExpose)
                    : props.componentPrepend
                      ? props.componentPrepend(formExpose)
                      : null
                "
              ></component>
              <slot v-if="item.type === 'slot'" v-bind="formExpose" :name="item.key"></slot>
              <el-input
                v-else-if="item.type === 'input'"
                v-model="state.formData[item.key]"
                v-bind="getComponentProps(item, formExpose)"
                v-on="getComponentEvent(item, formExpose)"
              >
                <template
                  v-for="(val, key) in getComponentSlots(item, formExpose)"
                  v-slot:[key]
                  :key="key"
                >
                  <component :is="val"></component>
                </template>
              </el-input>
              <!-- 数字输入框 -->
              <el-input-number
                v-else-if="item.type === 'number'"
                v-model="state.formData[item.key]"
                v-bind="getComponentProps(item, formExpose)"
                v-on="getComponentEvent(item, formExpose)"
              >
                <template
                  v-for="(val, key) in getComponentSlots(item, formExpose)"
                  v-slot:[key]
                  :key="key"
                >
                  <component :is="val"></component>
                </template>
              </el-input-number>
              <el-select
                v-else-if="item.type === 'select'"
                v-model="state.formData[item.key]"
                v-bind="getComponentProps(item, formExpose)"
                v-on="getComponentEvent(item, formExpose)"
              >
                <template
                  v-if="isArray(getComponentData(item.key)) || isObject(getComponentData(item.key))"
                >
                  <el-option
                    v-for="(val, index) in getComponentData(item.key)"
                    v-bind="
                      getDataItemProps(item, formExpose, getComponentData(item.key), val, index)
                    "
                    :key="item.valueGetter ? item.valueGetter(val, index) : index"
                    :label="item.labelGetter ? item.labelGetter(val, index) : val"
                    :value="item.valueGetter ? item.valueGetter(val, index) : val"
                  >
                  </el-option>
                </template>
                <template
                  v-for="(val, key) in getComponentSlots(item, formExpose)"
                  v-slot:[key]
                  :key="key"
                >
                  <component :is="val"></component>
                </template>
              </el-select>
              <el-radio-group
                v-else-if="item.type === 'radio'"
                v-model="state.formData[item.key]"
                v-bind="getComponentProps(item, formExpose)"
                v-on="getComponentEvent(item, formExpose)"
              >
                <template
                  v-if="isObject(getComponentData(item.key)) || isArray(getComponentData(item.key))"
                >
                  <RadioComponent
                    :button="Boolean(item.button)"
                    v-for="(val, index) in getComponentData(item.key)"
                    v-bind="
                      getDataItemProps(item, formExpose, getComponentData(item.key), val, index)
                    "
                    :key="item.valueGetter ? item.valueGetter(val, index) : index"
                    :label="item.labelGetter ? item.labelGetter(val, index) : val"
                    :value="item.valueGetter ? item.valueGetter(val, index) : val"
                  ></RadioComponent>
                </template>
              </el-radio-group>
              <!-- 多选框 -->
              <el-checkbox-group
                v-else-if="item.type === 'checkbox'"
                v-model="state.formData[item.key]"
                v-bind="getComponentProps(item, formExpose)"
              >
                <template
                  v-if="isObject(getComponentData(item.key)) || isArray(getComponentData(item.key))"
                >
                  <CheckboxComponent
                    :button="Boolean(item.button)"
                    v-for="(val, index) in getComponentData(item.key)"
                    :key="item.valueGetter ? item.valueGetter(val, index) : index"
                    :label="item.labelGetter ? item.labelGetter(val, index) : val"
                    :value="item.valueGetter ? item.valueGetter(val, index) : val"
                    v-bind="
                      getDataItemProps(item, formExpose, getComponentData(item.key), val, index)
                    "
                  />
                </template>
              </el-checkbox-group>
              <!-- 开关 -->
              <el-switch
                v-else-if="item.type === 'switch'"
                v-bind="getComponentProps(item, formExpose)"
                v-model="state.formData[item.key]"
              />
              <!-- 树形选择框 -->
              <el-cascader
                v-else-if="item.type === 'cascader'"
                :options="getComponentData(item.key)"
                v-bind="getComponentProps(item, formExpose)"
                v-on="getComponentEvent(item, formExpose)"
                v-model="state.formData[item.key]"
              >
                <template
                  v-for="(val, key) in getComponentSlots(item, formExpose)"
                  v-slot:[key]
                  :key="key"
                >
                  <component :is="val"></component> </template
              ></el-cascader>
              <el-date-picker
                v-else-if="item.type === 'date'"
                v-model="state.formData[item.key]"
                v-bind="getComponentProps(item, formExpose)"
                v-on="getComponentEvent(item, formExpose)"
              />
              <component
                v-else-if="item.type === 'extend'"
                :is="getFormConfig('components')[item.component] || item.component"
                v-bind="{ ...formExpose, ...getComponentProps(item, formExpose) }"
                v-on="getComponentEvent(item, formExpose)"
                v-model="state.formData[item.key]"
              >
                <template
                  v-for="(val, key) in getComponentSlots(item, formExpose)"
                  v-slot:[key]
                  :key="key"
                >
                  <component :is="val"></component>
                </template>
              </component>
              <component
                :is="
                  item.append
                    ? item.append(formExpose)
                    : props.componentAppend
                      ? props.componentAppend(formExpose)
                      : null
                "
              ></component>
            </div>
          </el-form-item>
        </el-col>
      </template>
      <slot></slot>
    </el-row>
  </el-form>
</template>
