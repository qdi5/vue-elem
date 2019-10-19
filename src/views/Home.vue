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
    request.get('http://api.wuzhe.online/article/page/1').then(data => {
      console.log('请求到的文章数据：\n', data)
    })
  }
}
</script>
