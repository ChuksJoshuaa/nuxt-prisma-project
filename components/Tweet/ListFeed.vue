<template>
  <div>
    <h1>list feed</h1>

    <ul>
      <TweetItem v-for="tweet in props.tweets" :key="tweet.id" :tweet="tweet"/>
    </ul>
  </div>
</template>

<script setup>

const props = defineProps({
  tweets: {
    type: Array,
    required: true
  }
})

</script>
