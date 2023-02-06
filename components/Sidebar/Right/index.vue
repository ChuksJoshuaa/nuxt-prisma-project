<template>
 <div class="flex flex-col">
  <!-- Preview card: what's happening -->
  <SidebarRightPreviewCard title="what's happening">
    <SidebarRightPreviewCardItem v-for="item in whatsHappening" :key="item.title">
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">#{{ item.title}}</h2>
          <p class="text-xs text-gray-400">{{item.count}}</p>
        </div>
    </SidebarRightPreviewCardItem>
  </SidebarRightPreviewCard>

<!-- Preview card: Who to follow -->
<SidebarRightPreviewCard title="who to follow" >
   <SidebarRightPreviewCardItem v-for="item in whoToFollowItem" :key="item">
      <div class="flex flex-row justify-between p-2 items-center">
          <div class="flex flex-row">
            <img  class="w-10 h-10 rounded-full" :src="item.image" :alt="item.name"/> 
            <div class="flex flex-col ml-2">
              <h2 class="text-sm font-bold text-gray-900 dark:text-white">{{item.name}}</h2>
              <p class="text-xs text-gray-400">{{item.handle}}</p>
            </div> 
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 rounded-full font-bold text-xs text-white dark:text-black bg-black dark:bg-white">Follow</button>
          </div>
      </div>
   </SidebarRightPreviewCardItem>
</SidebarRightPreviewCard>
 </div>
</template>

<script setup>

const whatsHappening = ref([
  {
    title: 'SpaceX',
    count: '18.8k Tweets',
  },
  {
    title: 'CodingIsFun',
    count: '8.8k Tweets',
  },
  {
    title: 'artForAll',
    count: '1.8k Tweets',
  },
])

const whoToFollowItem = ref([
  {
    name: 'Chuck Joshua',
    handle: 'ChuksJoshuaa',
    image: 'https://res.cloudinary.com/chuksmbanaso/image/upload/v1675578241/IMG_20230110_150653_7_bxk0oe.jpg'
  },
  {
    name: 'Wizkid',
    handle: 'wizkidayo',
    image: 'https://res.cloudinary.com/chuksmbanaso/image/upload/v1675649777/wizkid_driiij.jpg'
  },
  {
    name: 'Cristaino Ronaldo',
    handle: 'Cristaino',
    image: 'https://res.cloudinary.com/chuksmbanaso/image/upload/v1675649792/ronaldo_czupch.webp'
  },
])

</script>

