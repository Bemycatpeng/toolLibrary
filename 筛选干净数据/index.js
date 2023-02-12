const searchParams = {
  recycle_order_id:'',
  member_name:'',
  member_alipay_phone:'',
  time_type:'',
  start_at:'',
  end_at:'',
  a:'',
  b:'',
  c:''
}

const filter = [
  'recycle_order_id',
  'member_name',
  'member_alipay_phone',
  'time_type',
  'start_at',
  'end_at',
];
const data = JSON.parse(JSON.stringify(searchParams.value, filter));

// 利用 json.parse 的第二特性筛选出来干净的数据。

export default data
