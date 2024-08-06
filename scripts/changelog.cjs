// eslint-disable-next-line no-undef
module.exports = {
  writerOpts: {
    transform: (commit) => {
      if (commit.type === 'feat') {
        commit.type = '✨ Features'
      } else if (commit.type === 'fix') {
        commit.type = '🐛 Bug Fixes'
      } else if (commit.type === 'perf') {
        commit.type = '⚡ Performance Improvements'
      } else if (commit.type === 'revert' || commit.revert) {
        commit.type = '⏪ Reverts'
      } else if (commit.type === 'docs') {
        commit.type = '📄 Docs'
      }
      return commit
    }
  }
}
