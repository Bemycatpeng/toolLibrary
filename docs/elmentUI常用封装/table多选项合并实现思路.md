## 实现方式

合并可以按照表格合并的思路进行，让第一列根据第二列相同的参数进行合并。

```javascript
// 将该回调函数绑定到 element table 的 :span-metho 监听函数上。
function objectSpanMethod({ row, column, rowIndex, columnIndex }) {
  // 正常表格合并的处理
  const span = column['property'] + '-span'
  if (row[span]) {
    return row[span]
  }
  // 匹配 columnIndx 索引为 0的列并且按照第二列 'goodsId-span' 的规格去合并。
  if (columnIndex === 0) {
    return row['goodsId-span'];
  }
}
```

合并后直接进行多选操作还会有两点问题：
1. 合并后隐藏掉了其他的多选择，但是全选操作的时候会将他们都选上。则全选状态下选中的数据条数是大于视图显示的可选条数的。
2. 对全选状态下的选项逐一取消，当视图上可选项全部取消但还是处于半选状态，就是因为隐藏掉的多选项取消不掉。

## 以上问题解决方案

利用 `element ui table` 的 ` @select-all` 及 `@select` 方法，并对选择的数据进行二次加工。利用 `table` 的属性 `multipleTableRef.value.toggleRowSelection(tableData.value[item1], undefined)`对隐藏的选项进行处理。

| 解决隐藏选项的选中与取消问题。

```javascript
// 绑定在 @select 的回调函数
const handleColumnSelectChange = (selection, row) => {
  // 当前选项存储器（ if 存在 the 移除选项id）（if 不存在 the 添加选项id）
  if (currentSelectIds.value.includes(row.goodsId)) {
    currentSelectIds.value.splice(currentSelectIds.value.indexOf(row.goodsId), 1);
  } else {
    currentSelectIds.value.push(row.goodsId);
  }

  // 所有选项 id 存储器，将选中的选项所有相同 id 都存入。
  const selectIds = [];
  tableData.value.forEach((item1, index1) => {
    if (item1.goodsId === row.goodsId) {
      selectIds.push(index1);
    }
  });

  // 并且移除掉 ids 存储器中 index 0 的数据，防止重复选中切换。
  selectIds.splice(0, 1);
  selectIds.forEach((item1) => {
    // 将 ids 存储的所有列都进行多选状态切换。
    multipleTableRef.value.toggleRowSelection(tableData.value[item1], undefined);
  });
};
```

| 解决全选的问题

```javascript
const handleSelectAllChange = (vel) => {
  if (Object.keys(vel).length) {
    currentSelectIds.value = JSON.parse(JSON.stringify(idsGroup.value));
  } else {
    currentSelectIds.value = [];
  }
};
```
