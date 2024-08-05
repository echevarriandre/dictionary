<script setup lang="ts">
import type { GroupedWordDefinitions, WordDTO } from "@/@types";
import WordDetails from "@/components/word/WordDetails.vue";
import { RouteNames } from "@/router/routes";
import WordsService from "@/services/WordsService";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const groupedData = ref<GroupedWordDefinitions>();
const data = ref<WordDTO>();
const rhymes = ref<string[]>();

function getWordData(word: string) {
  groupedData.value = undefined;
  data.value = undefined;
  rhymes.value = undefined;

  WordsService.definition(word).then((response) => {
    data.value = response.data;
    groupedData.value = response.data.results.reduce((accumulator: GroupedWordDefinitions, word) => {
      const partOfSpeech = word.partOfSpeech;
      if (!accumulator[partOfSpeech]) {
        accumulator[partOfSpeech] = [];
      }
      accumulator[partOfSpeech].push(word);
      return accumulator;
    }, {});
  });

  WordsService.rhymes(word).then((response) => {
    rhymes.value = response.data.rhymes.all;
  });
}

watchEffect(() => {
  getWordData(route.params.word as string);
});
</script>

<template>
  <div class="h-full" v-if="data">
    <header class="flex items-center justify-between border-b-2 border-neutral-800 px-32 py-24">
      <h1 class="text-8xl font-bold capitalize">{{ route.params.word }}</h1>
      <button class="flex items-center gap-3 rounded-full border-2 border-neutral-700 px-20 py-3">
        <figure class="rounded-full px-2 dark:bg-neutral-100 dark:text-black">⏵</figure>
        <span class="whitespace-nowrap font-sans">/{{ data.pronunciation?.all }}/</span>
      </button>
    </header>

    <main class="flex">
      <div class="w-8/12">
        <div v-for="(t, i) in Object.keys(groupedData ?? {})" :key="i" class="flex">
          <div class="relative w-1/6 border-r-2 border-b-2 border-neutral-800 capitalize dark:text-neutral-300">
            <div class="sticky top-12 mb-6 mt-12 w-full pr-10 text-right">{{ t }}</div>
          </div>
          <div class="flex w-5/6 flex-col">
            <template v-for="(word, j) in groupedData?.[t]" :key="j">
              <WordDetails
                :index="i + 1"
                :isFirst="j == 0"
                :definition="word.definition"
                :partOfSpeech="word.partOfSpeech"
                :examples="word.examples"
                :synonyms="word.synonyms"
              />
            </template>
          </div>
        </div>
      </div>
      <aside class="flex w-4/12 flex-col gap-6 border-b-2 border-l-2 border-neutral-800 px-6 py-12">
        <h6 class="text-2xl">Rhymes</h6>
        <ul class="flex flex-col gap-2">
          <li v-for="rhyme in rhymes" :key="rhyme">
            <RouterLink :to="{ name: RouteNames.Word, params: { word: rhyme } }" class="dark:text-yellow-400">
              {{ rhyme }}
            </RouterLink>
          </li>
        </ul>
      </aside>
    </main>
  </div>
</template>
