<script setup lang="ts">
import { RouteNames } from "@/router/routes";

const props = defineProps<{
  index: number;
  definition: string;
  partOfSpeech: string;
  examples?: string[];
  synonyms?: string[];
  isFirst: boolean;
}>();
</script>

<template>
  <div class="flex">
    <article class="flex w-full flex-col border-r-2 border-b-2 border-neutral-800 p-6 pt-12">
      <p class="mb-4 text-2xl">
        <span v-if="props.isFirst">{{ props.index }}.</span>
        <span v-else class="text-5xl">⋅</span>
        {{ props.definition }}
      </p>

      <p v-if="props.examples" class="dark:text-neutral-500">"{{ props.examples[0] }}"</p>

      <div v-if="props.synonyms" class="mt-8 flex gap-12">
        <span>synonyms</span>
        <div class="flex flex-wrap">
          <template v-for="(s, i) in props.synonyms" :key="s">
            <RouterLink :to="{ name: RouteNames.Word, params: { word: s } }" class="dark:text-yellow-400">
              {{ s }}
            </RouterLink>
            <span v-if="i < props.synonyms.length - 1 && props.synonyms.length >= 2">,&nbsp;</span>
          </template>
        </div>
      </div>
    </article>
  </div>
</template>
