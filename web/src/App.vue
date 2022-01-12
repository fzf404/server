<script setup>
import onChangeTheme from '@/utils/theme'
import 'web-themes/simple/common.css'
import './utils/warning'
</script>

<template>
  <router-view @change-theme="onChangeTheme" />
</template>

<style>
</style>
