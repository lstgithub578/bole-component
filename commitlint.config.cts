import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'build', // 部署版本
        'docs', // 项目文档或注释变更
        'fix', // 修复 bug
        'feat', // 新功能 feature
        'perf', // 优化相关，比如提升性能、体验
        'refactor', //重构代码
        'revert', // 回滚到上一个版本
        'release', // 发布
        'revert', // 回滚到上一个版本
        'style', // 修改样式
        'test', // 增加测试
        'chore' // 改变构建流程、或者增加依赖库、工具等
      ]
    ]
  }
}

module.exports = Configuration
