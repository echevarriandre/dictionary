import type { Definition, Pronunciation, WordsApiResp } from "@/@types";
import dictionaryApi from "@/axios.config";

enum API_ENDPOINTS {
  Definition = "/definitions",
  Pronunciation = "/pronunciation",
}

class WordsService {
  definition(word: string) {
    return dictionaryApi.get<WordsApiResp<Definition[]>>(word + API_ENDPOINTS.Definition);
  }

  pronunciation(word: string) {
    return dictionaryApi.get<WordsApiResp<Pronunciation>>(word + API_ENDPOINTS.Pronunciation);
  }
}

export default new WordsService();
