// Parent.vue

<template>
  <div>
    父组件:
    <span style="margin-right: 30px;">message: {{ message }}</span>
    <span>msg: {{ msg }}</span>
  </div>
  <Child></Child>
</template>

<script setup>
import { ref } from 'vue'
import Bus from './Bus.js'
import Child from './components/Child.vue'

const msg = ref(Bus.msg)

const message = ref('hello')

// 用监听的写法
Bus.$on('changeMsg', data => {
  message.value = data
})

</script>
