<template>
  <div>
    <!--搜索-->
    <g-Search
        :form_params="defaultData.searchData"
        @getSearchInfo="getSearchInfo"
        @paramsReset="paramsReset"
    />
    <!--表格-->
    <g-Table
        @changePage="changePage"
    >
      <template #deferredInterest="scope">
        <div>
          {{ scope.itemscope.deferredInterest ? '有':'无' }}
        </div>
      </template>
      <template #rate_and_numDays="scope">
        <div v-if="scope.itemscope.numDays && scope.itemscope.rate">
          报价*{{ scope.itemscope.rate.toFixed(2) }}%*{{ scope.itemscope.numDays }}
        </div>
        <div v-else>
          --
        </div>
      </template>
      <template #operate="scope">
        <div
            class="table-operate"
            @click="openDialog(scope.itemscope.id)"
        >
          设置
        </div>
      </template>
    </g-Table>
    <!--弹窗-->
    <el-dialog
        v-if="dialogVisible"
        v-model="dialogVisible"
        title="设置"
        width="550px"
        :before-close="closeDialog"
    >
      <div>
        <el-form
            ref="formRef"
            label-position="Right"
            label-width="110px"
            :model="fromData"
        >
          <el-form-item
              label="延期付款利息"
              class="one-line"
              :rules="[
              {
                required: true,
              },
            ]"
          >
            <el-radio-group
                v-model="fromData.deferredInterest"
                class="ml-4"
            >
              <el-radio
                  :label="true"
                  size="large"
              >
                有
              </el-radio>
              <el-radio
                  :label="false"
                  size="large"
              >
                无
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="count-math__box">
            <el-form-item
                class="col-1"
                label="计算公式"
                prop="rate"
                :rules="[
                {
                  required: true,
                  validator:interestRule
                },
              ]"
            >
              <div class="count">
                <span>报价</span>
                <span class="unit">*</span>
                <el-input
                    v-model="fromData.rate"
                    class="count-input"
                    placeholder="请输入"
                />
              </div>
            </el-form-item>
            <span class="unit">%</span>
            <span class="unit">*</span>
            <el-form-item
                label-width="0"
                label=""
                prop="numDays"
                :rules="[{
                required: true,
                validator:numDaysRule
              },]"
            >
              <el-input
                  v-model="fromData.numDays"
                  class="count-input"
                  placeholder="请输入"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
              type="primary"
              @click="submitQuotation(formRef)"
          >
            确定
          </el-button>
          <el-button @click="closeDialog">
            取消
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { postSupplierListByPage, postSupplierSave } from '@/api/supplierManagement';

import { provide, reactive, ref } from 'vue';

const defaultData = reactive({
  searchData: {
    params: [
      {
        label: '名称',
        name: 'name',
        type: 'input',
      },
      {
        label: '延期付款利息',
        name: 'deferredInterest',
        type: 'select',
        options: {
          label: 'label',
          value: 'value',
        },
        list: [
          {
            label: '全部',
            value: '',
          },
          {
            label: '无',
            value: false,
          },
          {
            label: '有',
            value: true,
          },
        ],
      },
    ],
  },
  tableColumn: [
    {
      label: '供货商名称',
      key: 'name',
    },
    {
      label: '手机号',
      key: 'contactPhone',
    },
    {
      label: '延期付款利息',
      key: 'deferredInterest',
      slot: 'deferredInterest',
    },
    {
      label: '计算方式',
      key: 'rate_and_numDays',
      slot: 'rate_and_numDays',
      width: 300,
    },
    {
      label: '添加时间',
      key: 'createTime',
    },
    {
      label: '操作',
      key: 'operate',
      width: 150,
      slot: 'operate',
      fixed: 'right',
      align: 'center',
    },
  ],
});

const data = reactive({
  searchParams: {
    name: '',
    deferredInterest: '',
  },
});

const tableData = ref([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);
const dialogVisible = ref(false);
const formRef = ref(null);

const fromDataInit = {
  id: '',
  deferredInterest: false,
  rate: 0.05,
  numDays: 15,
};

const fromData = ref({});

fromData.value = JSON.parse(JSON.stringify(fromDataInit));

const tableParams = {
  expandRow: false,
  total,
  page,
  tableColumn: defaultData.tableColumn,
  tableData,
};
/* ============ 数据区域分割 ============ */
// 打开对话框
const openDialog = (id) => {
  dialogVisible.value = true;
  fromData.value.id = id;
};
// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
  fromData.value = JSON.parse(JSON.stringify(fromDataInit));
};
// 搜索回调
const getSearchInfo = (val) => {
  console.info('🚀 ~ file:list method:getSearchInfo line:253 -----', val);
  Object.assign(data.searchParams, val);
  requestListData();
};
// 搜索重置回调
const paramsReset = () => {
  page.value = 1;
  pageSize.value = 10;
};
// 分页器跳转
const changePage = (val) => {
  pageSize.value = val.page_size;
  page.value = val.page;
  requestListData();
};
// 提交表单
const submitQuotation = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      requestQuotation();
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
// 请求报价接口
const requestQuotation = () => {
  const params = {
    id: fromData.value.id,
    deferredInterest: fromData.value.deferredInterest,
    rate: fromData.value.rate,
    numDays: fromData.value.numDays,
  };
  postSupplierSave(params).then((res) => {
    closeDialog();
    requestListData();
  });
};
// 请求列表数据
const requestListData = () => {
  const params = {
    name: data.searchParams.name,
    deferredInterest: data.searchParams.deferredInterest,
    pageNum: page.value,
    pageSize: pageSize.value,
  };
  postSupplierListByPage(params).then((res) => {
    tableData.value = res.data.list;
    total.value = res.data.pageInfo.totalCount;
    page.value = res.data.pageInfo.pageNum;
    pageSize.value = res.data.pageInfo.pageSize;
  });
};
/* ============ 验证规则 ============ */
// 利率的验证
const interestRule = (rule, value, callback) => {
  const decimalRegex = /^\d*$/;

  if (!value) {
    return callback(new Error('请输入利率!'));
  }
  if (value.length > 6) {
    return callback(new Error('输入内容过多'));
  }

  if (!decimalRegex.test(value)) {
    return callback(new Error('请输入正确的利率!'));
  }
  callback();
};
// 输入天数的验证
const numDaysRule = (rule, value, callback) => {
  const decimalRegex = /^\d+$/;

  if (!value) {
    return callback(new Error('请输入天数!'));
  }

  if (value.length > 6) {
    return callback(new Error('输入内容过多'));
  }

  if (!decimalRegex.test(value)) {
    return callback(new Error('请输入正确的天数!'));
  }
  callback();
};
const init = () => {
  requestListData();
};

init();

provide('tableParams', tableParams);
</script>

<style lang="scss" scoped>
.table-operate {
  color: blue;
  cursor: pointer;
}
.count-math__box,.count {
  display: flex;
  align-items: center;

  .count-input {
    width: 80px;
  }
  .unit {
    margin: 0 3px;
  }
  .count {
    .math {
      margin-left: -100px;
    }
  }
}
.one-line {
  margin-bottom: 10px;
}
</style>
