
// 筛选出自己想要的属性值，并在一次循环中对其去重。
const filterAndrRepeat = (vel) => {
  for (let i = 0; i < vel.length; i++) {
    const { goodsId } = vel[i];
    goodsIds.push(goodsId); // 获取每个商品对象的 goodsId 属性值，生成一个新的数组
    if (!uniqueGoodsIds.includes(goodsId)) {
      uniqueGoodsIds.push(goodsId); // 对新数组去重
    }
  }
}

// 三维数组一维平铺
const arryOfoneRow = (data) => {
 data.forEach((item1) => {
    item1.isAndNoEdit = true;
    item1.goodsNameFlag = `${item1.goodsId}-${item1.goodsName}`;
    item1.goodsInfoList.forEach((item2) => {
      item2.specificationFlag = `${item1.goodsId}-${item2.specification}`;
      item2.colorPriceInfos.forEach((item3) => {
        item3.supplierPrice_copy = item3.supplierPrice;
        data.push({
          ...item1,
          ...item2,
          ...item3,
        });
      });
    });
  });
}


