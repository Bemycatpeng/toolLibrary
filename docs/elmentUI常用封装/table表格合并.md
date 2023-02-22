
### 表格数据

```javascript
// table表格数据
const tableData = [{
  id: '1',
  checkRoom: 'CTROOM',
  checkProject: '颈椎MRICT',
  checkMoney: '300.22',
  attention: '检查前空腹',
  appointmentTime: ''
},{
  id: '1',
  checkRoom: 'CTROOM',
  checkProject: '颈椎MRICT1',
  checkMoney: '303.22',
  attention: '检查前空腹',
  appointmentTime: ''
},{
  id: '1',
  checkRoom: 'CTROOM',
  checkProject: '颈椎MRICT22',
  checkMoney: '340.22',
  attention: '检查前空腹',
  appointmentTime: '2019-5-29 10:30'
},{
  id: '1',
  checkRoom: 'DR',
  checkProject: '鼻骨',
  checkMoney: '340.22',
  attention: '检查前空腹',
  appointmentTime: '2019-5-29 9:30'
}]
```

### 调用 table 数据处理函数

```javascript
mergeTableRow({
  data: tableData,
  mergeColNames: ['checkRoom', 'checkMoney', 'attention', 'appointmentTime'], // 需要合并的列，默认合并列相同的数据
  firstMergeColNames: ['attention'], // 受影响的列，只合并以firstMerge为首的同类型数据
  firstMerge: 'checkRoom' // 以哪列为基础进行合并，一般为第一列
})
```

```javascript
// 将该回调函数绑定到 element table 的 :span-metho 监听函数上。
function objectSpanMethod({ row, column, rowIndex, columnIndex }) {
  const span = column['property'] + '-span'
  if (row[span]) {
    return row[span]
  }
}
```
### 封装好的对表格进行傻瓜式合并

```javascript
// 对表格的数据进行处理
function mergeTableRow(config) {
  let data = config.data
  const {mergeColNames, firstMergeColNames, firstMerge} = config
  if (!mergeColNames || mergeColNames.length === 0) {
    return data
  }
  mergeColNames.forEach((m) => {
    const mList = {}
    data = data.map((v, index) => {
      const rowVal = v[m]
      if (mList[rowVal] && mList[rowVal].newIndex === index) {
        const flag = firstMergeColNames.filter((f) => {
          return f === m
        }).length !== 0
        const mcFlag = mergeColNames.filter((mc) => {
          return mc === firstMerge
        }).length === 0
        if ((mcFlag && flag) || (flag && data[index][firstMerge + '-span'] && data[index][firstMerge + '-span'].rowspan === 1)) {
          v[m + '-span'] = {
            rowspan: 1,
            colspan: 1
          }
        } else {
          data[mList[rowVal]['index']][m + '-span'].rowspan++
          v[m + '-span'] = {
            rowspan: 0,
            colspan: 0
          }
          mList[rowVal]['num']++
          mList[rowVal]['newIndex']++
        }
      } else {
        mList[rowVal] = {num: 1, index: index, newIndex: index + 1}
        v[m + '-span'] = {
          rowspan: 1,
          colspan: 1
        }
      }
      return v
    })
  })
  return data
}
```
