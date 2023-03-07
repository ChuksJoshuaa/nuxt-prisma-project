<template>
  <div :class="{'dark': darkMode}">
    <div class="bg-white dark:bg-dim-900">

      <div v-if="isAuthLoading">
        <LoadingPage />
      </div>

      <!-- App -->
      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <!-- Left sidebar -->
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft @on-tweet="handleOpenTweetModal"/>
            </div>
          </div>

          <!-- Main content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>

          <!-- Right sidebar -->
          <div class="hidden md:block col-span-12 xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div> 
     
      <!-- Auth -->
      <AuthPage v-else />

      <UIModal :isOpen="postTweetModal" @on-close="handleModalClose">
  
        <TweetForm :user="user" @onSuccess="handleFormSuccess" :replyTo="replyTweet" showReply/>
      </UIModal>
    </div>
  </div>
</template>  


<script setup>
const darkMode = ref(false)
const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const isAuthLoading = useAuthLoading()
const user = useAuthUser()

const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } = useTweet()
const postTweetModal = usePostTweetModal()
const emitter = useEmitter()
const replyTweet = useReplyTweet()


emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet)
})

onBeforeMount(() => {
  initAuth()
})

function handleFormSuccess(tweet) {
  closePostTweetModal()
}


function handleOpenTweetModal() {
  openPostTweetModal(null)
}


function handleModalClose() {
  closePostTweetModal()
}
</script>