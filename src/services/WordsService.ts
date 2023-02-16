import type { WordDTO } from "@/@types";
import dictionaryApi from "@/axios.config";

class WordsService {
  definition(word: string) {
    return dictionaryApi.get<WordDTO>(word);
  }
}

export default new WordsService();
