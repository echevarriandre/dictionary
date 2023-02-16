<script setup lang="ts">
import type { GroupedWordDefinitions, WordDTO } from "@/@types";
import WordDetails from "@/components/word/WordDetails.vue";
import WordsService from "@/services/WordsService";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { $ref } from "vue/macros";

const route = useRoute();
let groupedData = $ref<GroupedWordDefinitions>();
let data = $ref<WordDTO>();

function getWordData(word: string) {
  groupedData = undefined;
  data = undefined;
  WordsService.definition(word).then((response) => {
    data = response.data;
    groupedData = response.data.results.reduce(
      (r, v, i, a, k = v.partOfSpeech) => ((r[k] || (r[k] = [])).push(v), r),
      {} as GroupedWordDefinitions,
    );
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
        <span class="font-sans">/{{ data.pronunciation?.all }}/</span>
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
      <aside class="w-4/12 border-b-2 border-neutral-800 pb-6 pt-12">watch this space</aside>
    </main>
  </div>
</template>
