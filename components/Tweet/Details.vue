<template>
  <div>
     <TweetItem :tweet="props.tweet"/>

     <TweetForm placeholder="tweet your reply" :replyTo="props.tweet" :user="props.user" @on-success="handleFormSuccess" />

     <TweetListFeed :tweets="replies" />
  </div>
</template>

<script setup>
const props = defineProps({
    tweet: {
        type: Object,
        required: true,
    },
    user: {
       type: Object,
        required: true, 
    }
})

const replies = computed(() => props.tweet?.replies || [])

const handleFormSuccess = async (tweet) => {
  
    await navigateTo({
        path: `/status/${tweet.id}`
    })
}

</script>
