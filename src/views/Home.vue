<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">    
    
  </div>
</template>

<script>
// @ is an alias to /src
import request from 'utils/request'

export default {
  name: 'home',
  created () {
    request.get('/api/seller').then(data => {
      console.log('请求到的商家数据：\n', data)
    })
  }
}
</script>
