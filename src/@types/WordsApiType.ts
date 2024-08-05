export interface Definition {
  definition: string;
  partOfSpeech: string;
  synonyms?: string[];
  inCategory?: string[];
  typeOf: string[];
  hasTypes?: string[];
  hasParts?: string[];
  derivation?: string[];
  examples?: string[];
  partOf?: string[];
}

export interface Syllables {
  count: number;
  list: string[];
}

export interface Pronunciation {
  all: string;
}

export interface WordDTO {
  word: string;
  results: Definition[];
  syllables: Syllables;
  pronunciation: Pronunciation;
  frequency: number;
}

export interface GroupedWordDefinitions {
  [partOfSpeech: string]: Definition[];
}

export interface RhymesDTO {
  word: string;
  rhymes: { all: string[] };
}
