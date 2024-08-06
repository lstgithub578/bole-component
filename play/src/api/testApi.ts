import { treeData } from "./data"

const treeMap = {}

function buildTreeMap(data) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.id) treeMap[item.id] = item
    if (item.children && item.children.length) {
      buildTreeMap(item.children)
    }
  }
}

buildTreeMap(treeData)

function returnRes(data = null) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        msg: "执行成功",
        data,
      })
    }, 2000)
  })
}

class TestApi {
  getTree(id) {
    return returnRes(id ? treeMap[id].children : id === 0 ? treeData : [])
  }

  get(id) {
    return returnRes({
      name: "demo",
      price: 100,
      cate1: 1,
      cate2: 2,
      cate3: 8,
      cate4: 8,
      remark: "随便写点",
      date: ["2023-02-05 12:07:02", "2023-02-08 12:01:02"],
      req: "必填1",
      req1: "必填2",
      req2: "必填3",
      req3: "必填4",
    })
  }

  add(data) {
    data.id = Object.keys(treeMap).length + 1
    treeMap[data.cate].children.push(data)
    return returnRes()
  }

  test(data) {
    return returnRes()
  }

  test1(data) {
    return returnRes()
  }
}

export default new TestApi()
