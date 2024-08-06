<template>
  <div>
    <el-radio-group v-model="model" @change="emits('change', $event)">
      <el-radio value="search">
        <el-icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            data-v-6fbb019e=""
          >
            <path
              fill="currentColor"
              d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
            ></path>
          </svg>
        </el-icon>
      </el-radio>
      <el-radio value="house">
        <el-icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            data-v-6fbb019e=""
          >
            <path
              fill="currentColor"
              d="M192 413.952V896h640V413.952L512 147.328zM139.52 374.4l352-293.312a32 32 0 0 1 40.96 0l352 293.312A32 32 0 0 1 896 398.976V928a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V398.976a32 32 0 0 1 11.52-24.576"
            ></path>
          </svg>
        </el-icon>
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "IconSelect",
})

const model = defineModel({ type: String })
const emits = defineEmits(["change"])
</script>
