<script setup lang="ts">
import { RouteNames } from "@/router/routes";
import WordsService from "@/services/WordsService";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const word = ref<string>("");
const randomWord = ref<string | null>();
const router = useRouter();

function goToDefinition() {
  router.push({ name: RouteNames.Word, params: { word: word.value } });
}

async function getRandomWord() {
  randomWord.value = await WordsService.random();
}

onBeforeMount(() => getRandomWord());
</script>

<template>
  <main class="flex h-full w-full flex-col items-center gap-24 px-[20%] pt-[15%]">
    <h1 class="text-8xl">Wordinary</h1>

    <div class="flex flex-col items-center gap-6">
      <input
        v-model="word"
        type="text"
        :placeholder="`Try ${randomWord ?? '...'}`"
        class="w-96 rounded-full border-2 border-neutral-700 bg-transparent py-2 px-4 font-sans placeholder:text-neutral-600 dark:text-white"
        @keypress.enter="goToDefinition"
      />
      <button @click="goToDefinition" class="w-fit rounded-full py-2 px-10 font-sans dark:bg-white dark:text-black">
        Get Definition
      </button>
    </div>
  </main>
</template>
