<template>
  <ClientOnly>
    <div class="demo">
      <p v-html="props.description || ''"></p>
      <div class="example">
        <div class="example-showcase vp-raw">
          <component :is="formatPathDemos[path]" v-if="formatPathDemos[path]" />
        </div>

        <div class="bottom">
          <div class="control">
            <el-tooltip content="复制代码">
              <el-icon size="16px" class="icon" @click="copyCode">
                <!-- <svg
                  t="1717672240573"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5575"
                  width="128"
                  height="128"
                >
                  <path
                    d="M234.794667 197.418667L234.666667 288v448.170667a138.666667 138.666667 0 0 0 138.666666 138.666666h367.616a96.042667 96.042667 0 0 1-90.538666 64H373.333333A202.666667 202.666667 0 0 1 170.666667 736.170667V288c0-41.813333 26.752-77.44 64.128-90.581333zM757.333333 85.333333A96 96 0 0 1 853.333333 181.333333v554.666667a96 96 0 0 1-96 96h-384a96 96 0 0 1-96-96v-554.666667A96 96 0 0 1 373.333333 85.333333h384z m0 64h-384a32 32 0 0 0-32 32v554.666667c0 17.664 14.336 32 32 32h384a32 32 0 0 0 32-32v-554.666667a32 32 0 0 0-32-32z"
                    fill="#212121"
                    p-id="5576"
                  ></path>
                </svg> -->
                <CopyDocument />
              </el-icon>
            </el-tooltip>
            <el-tooltip :content="showCode ? '关闭源码' : '查看源码'">
              <el-icon size="16px" class="icon" @click="showCode = !showCode">
                <svg
                  t="1717669484643"
                  class="icon"
                  viewBox="0 0 1027 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4455"
                >
                  <path
                    d="M321.828571 226.742857c-14.628571-14.628571-36.571429-14.628571-51.2 0L7.314286 482.742857c-14.628571 14.628571-14.628571 36.571429 0 51.2l256 256c14.628571 14.628571 36.571429 14.628571 51.2 0 14.628571-14.628571 14.628571-36.571429 0-51.2L87.771429 512l234.057142-234.057143c7.314286-14.628571 7.314286-36.571429 0-51.2z m263.314286 0c-14.628571 0-36.571429 7.314286-43.885714 29.257143l-131.657143 497.371429c-7.314286 21.942857 7.314286 36.571429 29.257143 43.885714s36.571429-7.314286 43.885714-29.257143l131.657143-497.371429c7.314286-14.628571-7.314286-36.571429-29.257143-43.885714z m431.542857 256l-256-256c-14.628571-14.628571-36.571429-14.628571-51.2 0-14.628571 14.628571-14.628571 36.571429 0 51.2L936.228571 512l-234.057142 234.057143c-14.628571 14.628571-14.628571 36.571429 0 51.2 14.628571 14.628571 36.571429 14.628571 51.2 0l256-256c14.628571-14.628571 14.628571-43.885714 7.314285-58.514286z"
                    fill=""
                    p-id="4456"
                  ></path>
                </svg>
              </el-icon>
            </el-tooltip>
          </div>

          <transition name="fade-in-linear">
            <div v-show="showCode">
              <div
                class="example-source"
                v-html="decodedSource"
              ></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue"
import { demos, sourceCode } from "../../../examples"
import { ElMessage } from "element-plus"
import { CopyDocument } from "@element-plus/icons-vue"

const props = defineProps<{
  source: string
  path: string
  description?: string
}>()

const showCode = ref(false)

const formatPathDemos = computed(() => {
  const demoObj = {}

  Object.keys(demos || {}).forEach((key) => {
    demoObj[key.replace("./", "").replace(".vue", "")] = demos[key].default
  })

  return demoObj
})

const decodedSource = computed(() => {
  return decodeURIComponent(props.source)
})

function copyCode() {
  navigator.clipboard.writeText(sourceCode[`./${props.path}.vue`]).then(
    () => {
      ElMessage.success("复制成功!")
    },
    () => {
      ElMessage.error("复制失败!")
    },
  )
}
</script>

<style lang="scss" scoped>
.example {
  border: 1px solid #dcdfe6;
  border-radius: 3px;

  .example-showcase {
    padding: 10px;
    margin: 0.5px;
  }
}

.bottom {
  .control {
    padding: 5px 10px;
    border: 1px solid #dcdfe6;
    border-left: none;
    border-right: none;
    text-align: right;

    .icon {
      vertical-align: middle;
      cursor: pointer;

      & + .icon {
        margin-left: 5px;
      }
    }
  }
}

.fade-in-linear-enter-active,
.fade-in-linear-leave-active {
  transition: all 0.3s;
}

.fade-in-linear-enter-from,
.fade-in-linear-leave-to {
  opacity: 0;
}
</style>

<style>
pre[class*="language-"].line-numbers {
  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;
}

pre[class*="language-"].line-numbers > code {
  position: relative;
  white-space: inherit;
}

.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 0;
  font-size: 100%;
  left: -3.8em;
  width: 3em; /* works for line-numbers below 1000 lines */
  letter-spacing: -1px;
  border-right: 1px solid #999;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.line-numbers-rows > span {
  display: block;
  counter-increment: linenumber;
}

.line-numbers-rows > span:before {
  content: counter(linenumber);
  color: #999;
  display: block;
  padding-right: 0.8em;
  text-align: right;
}
</style>
