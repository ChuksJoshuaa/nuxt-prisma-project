<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
        <div class="flex w-12 items-top">
            <img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 rounded-full"/>
        </div>
        <div class="w-full p-2">
            <textarea v-model="text" class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0"
            placeholder="What's happening ?"
            ></textarea>
        </div>
    </div>
    <!-- File Selector -->
    <div class="p-4 pl-16">
        <img :src="inputImageUrl" alt="" v-if="inputImageUrl" class="rounded-2xl border" :class="twitterBorderColor"/>
      <input type="file" ref="imageInput" hidden accept="image/png, image/gif, image/jpeg, image/jpg" @change="handleImageChange"/>
    </div>

    <!-- ICONS -->
    <div class="flex p-2 pl-14">
        <div class="flex w-full text-white">
          <div class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer" @click="handleImageClick">
                <LogoImage />
            </div>
            <div class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer">
                <LogoGif />        
            </div>
            <div class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer">
                <LogoChart />
            </div>
            <div class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer">
                <LogoEmoji />   
            </div>
            <div class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer">
                <LogoCalender />   
            </div>
        </div>
        
        <div class="ml-auto">
            <UIButton size="sm">
                <span class="font-bold">
                    Tweet
                </span>
            </UIButton>
                <!-- <button @click="handleFormSubmit">Tweet</button> -->
        </div>
    </div>
    <div>

        
    </div>
  </div>
</template>

<script  setup>
const {twitterBorderColor} = useTailwindconfig()
const imageInput = ref()
const selectedFile = ref(null)
const inputImageUrl = ref(null)
const emits = defineEmits(['onSubmit'])
const text = ref("")

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})


function handleFormSubmit() {
    emits('onSubmit', {
        text: text.value,
        mediaFiles: [selectedFile.value]
  })
}

function handleImageClick() {
    imageInput.value.click()
}

function handleImageChange(event) {
    const file = event.target.files[0]

    selectedFile.value = file

    const reader = new FileReader()

    reader.onload = (event) => {
        inputImageUrl.value = event.target.result
    }

    reader.readAsDataURL(file)
}

</script>
