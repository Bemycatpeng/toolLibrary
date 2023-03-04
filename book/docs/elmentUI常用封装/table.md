## 有关表格的封装

### template 部分

```html 
<el-table
    ref="multipleTableRef"
    :span-method="objectSpanMethod"
    :data="tableDataList"
    border
    @select-all="handleSelectAllChange"
    @select="handleColumnSelectChange"
>
    <el-table-column
        type="selection"
        width="55"
    />
    <el-table-column
        v-for="column in defaultData.tableColumn"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        show-overflow-tooltip
        :fixed="column.fixed"
        align="center"
    >
      <template #default="scope">
        <div v-if="column.prop === 'goodsId'"
        >
          {{ scope.row.goodsBrand }}
        </div>
        <span v-else>{{ scope.row[column.prop] }}</span>
      </template>
      <!--品牌-->
    </el-table-column>
</el-table>
```
### js 部分
```javascript
  tableColumn: [
    { label: '品牌', prop: 'goodsId', width: '200' },
    { label: '型号', prop: 'goodsNameFlag', width: '200' },
    { label: '规格', prop: 'specificationFlag', width: '140' },
    { label: '颜色', prop: 'color' },
    { label: '官网价', prop: 'goodsOfficePrice', width: '140' },
    { label: '最低报价', prop: 'minPrice', width: '140' },
    { label: '差价区间', prop: 'priceDifferenceSection', width: '120' },
    { label: '最高溢价', prop: 'highestOverflowAmount', width: '120' },
    { label: '最低溢价', prop: 'lowestOverflowAmount', width: '120' },
    { label: '平均溢价', prop: 'avgOverflowAmount', width: '120' },
    { label: '现溢价金', prop: 'overflowAmount', width: '120' },
    { label: '总租官网系数', prop: 'totalRentOwCoefficient', width: '120' },
    { label: '总租系数', prop: 'totalRentCoefficient', width: '120' },
    { label: '总价系数', prop: 'totalPriceCoefficient', width: '120' },
    {
      label: '操作', prop: 'operation', fixed: 'right', width: '200',
    },
  ],
```

## 搭配上分页器使用

```html
<el-pagination
    v-model:current-page="searchPrams.pageNum"
    v-model:page-size="searchPrams.pageSize"
    :page-sizes="[2, 4, 6, 10]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="searchPrams.totalCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
/>
```

```javascript
// 分页器回调
const handleCurrentPageChange = (val) => {
  pagingData.value.current_page = val;
  requestSupplierList();
};

const handleSizeChange = (val) => {
  pagingData.value.page_size = val;
  pagingData.value.current_page = 1;
  requestSupplierList();
};
```
