import type { RhymesDTO, WordDTO } from "@/@types";
import dictionaryApi from "@/axios.config";

class WordsService {
  definition(word: string) {
    return dictionaryApi.get<WordDTO>(word);
  }

  async random() {
    const result = await dictionaryApi.get<WordDTO>("?random=true");
    return result.data.word;
  }

  async rhymes(word: string) {
    return dictionaryApi.get<RhymesDTO>(`${word}/rhymes`);
  }
}

export default new WordsService();
