<template>
  <div>
    
    <MainSection title="Tweet" :loading="loading">
        <Head>
            <Title></Title>
        </Head>


        <h1>{{ getTweetIdFromRoute()}}</h1>

    </MainSection>

  </div>
</template>

<script setup>
const loading = ref(false)


function getTweetIdFromRoute() {
  return useRoute().params.id
}

</script>
