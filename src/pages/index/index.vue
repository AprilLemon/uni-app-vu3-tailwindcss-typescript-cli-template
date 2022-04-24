<template>
  <view class="flex flex-col justify-center ceshi">
    <image class="logo block " src="/static/logo.png" />
    <view class="text-area bg-blue text-right bg-black">
      <text class="text-gray-200 underline uppercase">{{ title }}</text>
    </view>
    <view class="btn" @tap="clickShowDialog">打开弹窗</view>
    <UniPopup ref="testPopup">
      <view class="text-blue-50 font-bold">testPopup</view>
    </UniPopup>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import UniPopup from '@/components/uni-popup/uni-popup.vue'

  const title = ref('Hello2122dddd')
  const testPopup = ref()
  const clickShowDialog = () => {
    testPopup.value.open('dialog')
  }
</script>

<style scoped lang="scss">
  .ceshi {

    .logo {
      height: 200rpx;
      width: 200rpx;
      margin: 200rpx auto 50rpx;
    }

    .text-area {}

    .title {
      font-size: 36rpx;
      color: #8f8f94;
    }
  }
</style>
