<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else>
       <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit"
       :placeholder="props.placeholder"
       />
    </div>
  </div>
</template>


<script setup>

const {postTweet} = useTweet()
const loading = ref(false)
const props = defineProps({
  user: {
    type: Object,
    required: true
  }, 
  placeholder: {
    type: String,
    default: "What's happening?"
  }
})

async function handleFormSubmit(data) {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles
    })
    
  }
  catch (error) {
    console.log(error)
  }
  finally {
    loading.value = false
   }
}

</script>