import { getTranslationFile } from "../files-manager/index.ts";
import { URL } from "../utils/constants.ts";
export const postToEndpoint = async (fileToSend: string, token: string) => {
  try {
    const translationFile = await getTranslationFile(fileToSend);
    const url =
      `${URL}/import/json?key=${token}&locale=en&ignore-existing=true&tag-absent=obsolete&format=JSON`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(translationFile),
    });

    if (!response.ok) {
      console.error(
        "%cError during post response is not ok",
        "color: red",
        JSON.stringify(response, null, 4),
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "%cError during post",
      "color: red",
      JSON.stringify(error, null, 4),
    );
    throw error;
  }
};
