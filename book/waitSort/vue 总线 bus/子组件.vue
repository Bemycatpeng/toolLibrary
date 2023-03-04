// Child.vue

<template>
  <div>
    子组件：
    <button @click="handleBusEmit">触发Bus.$emit</button>
    <button @click="changeBusMsg">修改总线里的 msg</button>
  </div>
</template>

<script setup>
import Bus from '../Bus.js'

function handleBusEmit() {
  Bus.$emit('changeMsg', '雷猴啊')
}

function changeBusMsg() {
  // console.log(Bus.msg)
  Bus.msg.value = '在子组件里修改了总线的值'
}
</script>
