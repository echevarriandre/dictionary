export enum EndpointKeys {
  definitions = "definitions",
  pronunciation = "pronunciation",
}

export interface WordsApiResp<T> {
  word: string;
  [key: string]: T;
}

export interface Definition {
  definition: string;
  partOfSpeech: string;
}

export interface Pronunciation {
  all: string;
  noun: string;
  verb: string;
}
