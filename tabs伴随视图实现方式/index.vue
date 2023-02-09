<template>
  <view class="tab_group">
    <view class="tab" v-for="item in tabsOptions" :key="item.id" @click="switchTab(item.el, item.id)" :class="item.id === currentID ? 'sure' : ''">
      {{ item.title }}
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'

const tabsOptions = [
  {
    id: 1,
    title: '粉丝权益',
    el: 'member',
    marginTop: 0
  },
  {
    id: 2,
    title: '用户之声',
    el: 'comment',
    marginTop: 40
  },
  {
    id: 3,
    title: 'BJ原创周边',
    el: 'peripheral',
    marginTop: 80
  },
  {
    id: 4,
    title: '了解八戒租',
    el: 'details',
    marginTop: 80
  }
]

const currentID = ref(1)
let isSlide = ref(false)
const scrollTiming = ref()

const switchTab = (el, id) => {
  isSlide.value = true
  clearInterval(scrollTiming.value)
  scrollTiming.value = setTimeout(() => {
    // 点击时平滑滚动完成前不监听滚动
    isSlide.value = false
  }, 600)

  currentID.value = id
  const dom = document.querySelector(`#${el}`)

  let addTop = 0
  tabsOptions.forEach((item) => {
    if (item.id === id) {
      addTop = item.marginTop
    }
  })

  // eslint-disable-next-line no-undef
  // console.log('我是元素的巨顶距离', dom.offsetTop + uni.upx2px(addTop))
  // eslint-disable-next-line no-undef
  uni.pageScrollTo({
    scrollTop: dom.offsetTop - uni.upx2px(addTop),
    duration: 300
  })
}

let [dom1, dom2, dom3, dom4] = [null, null, null, null]

onMounted(() => {
  dom1 = document.querySelector('#member')
  dom2 = document.querySelector('#comment')
  dom3 = document.querySelector('#peripheral')
  dom4 = document.querySelector('#details')
})

onPageScroll(() => {
  console.log('🚀liu ~ file: index.vue ~ line 81 ~ onPageScroll ~ isSlide.value', isSlide.value)

  if (isSlide.value) return
  if (dom4.getBoundingClientRect().top <= uni.upx2px(100)) {
    currentID.value = 4
    return false
  }
  if (dom3.getBoundingClientRect().top <= uni.upx2px(100)) {
    currentID.value = 3
    return false
  }
  if (dom2.getBoundingClientRect().top <= uni.upx2px(100)) {
    currentID.value = 2
    return false
  }
  if (dom1.getBoundingClientRect().top <= uni.upx2px(100)) {
    currentID.value = 1
  }
})
</script>

<style lang="scss" scoped>
.tab_group {
  position: fixed;
  z-index: 3;
  top: -2rpx;
  display: flex;
  height: 100rpx;
  width: 750rpx;
  background: #ffffff;
  opacity: 1;
  transition: all 2s ease-in;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 187.5rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #141414;
    line-height: 50rpx;
  }
  .sure {
    font-family: PingFang SC;
    color: #ffffff;
    font-size: 30rpx;
    font-weight: 600;
    background: linear-gradient(0deg, #ff4e00 0%, #ffcd91 100%);
  }
}
</style>
