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
    <article class="flex w-full flex-col border-b-2 border-neutral-800 p-6 pt-12">
      <p class="mb-4 text-2xl">
        {{ props.definition }}
      </p>

      <template v-if="props.examples">
        <p v-for="(example, i) in props.examples" :key="i" class="dark:text-neutral-500">"{{ example }}"</p>
      </template>

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
