<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { generateUrlSearch, setToken } from '../utils'
import { userLogin } from '../api'
import { useUserStore } from '../store'
import { isString } from '@vue/shared'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const oauthUrl = `https://github.com/login/oauth/authorize?${generateUrlSearch({
  client_id: '40d8dd732ffe7a24d23b',
  scope: 'repo,user',
  redirect_uri: 'http://localhost:3000/api/oauth/redirect',
})}`

onMounted(async () => {
  console.log('onMounted login')
  try {
    const query = route.query
    if (query.user && isString(query.user)) {
      const res = await userLogin(query.user)
      console.log(res)
      setToken(res.data.token)
      userStore.registerUser()
      router.push({
        name: 'Overview',
        params: {
          owner: query.user,
        },
      })
    }
  } catch (err) {
    document.getElementById('login')?.click()
  }
})

// onMounted(() => {
//   axios
//     .get('https://github.com/login/oauth/authorize', {
//       params: {
//         client_id: '40d8dd732ffe7a24d23b',
//         scope: 'repo,user',
//         redirect_uri: 'http://localhost:3000/api/oauth/redirect',
//       },
//     })
//     .then(userInfo => {
//       localStorage.setItem('user', JSON.stringify(userInfo))
//     })

//   // cad8c4e590039e17f0708a649b13e34963377c4a client_secret
// })
</script>
<template>
  <div class="login-container">
    <a id="login" :href="oauthUrl">login github</a>
  </div>
</template>
<style lang="scss" scoped></style>
