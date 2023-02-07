<template>
  <div>
    <div class="pt-5 space-y-6">
       <UIInput label="Email" placeholder="@email" type="email" v-model="data.email"/>
       <UIInput label="Password" placeholder="********"  type="password" v-model="data.password"/>
    
      <div class="flex justify-start items-center">
        <button @click="handleLogin">Login</button>
        <div v-if="data.loading" class="mx-4">
            <UISpinner />
        </div>
        <div v-else></div>
    </div>
    </div>
  </div>
</template>

<script setup>



const data = reactive({
    email: '',
    password: '',
    loading: false,
})

async function handleLogin() {
    const { login } = useAuth()
    data.loading = true
    try {
        await login({
            email: data.email,
            password: data.password
        })
    } catch (error) {
        
    }
    finally {
       data.loading= false
    }
}

</script>

