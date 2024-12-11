import { getTranslationFile } from "../files-manager/index.ts";
import { URL } from "../utils/constants.ts";
export const postToEndpoint = async (
  fileToSend: string,
  token: string,
  locale: string,
) => {
  try {
    const translationFile = await getTranslationFile(fileToSend);
    if (!translationFile) {
      throw new Error("Translation file not found");
    }
    const url =
      `${URL}/import/json?key=${token}&locale=${locale}&ignore-existing=true&tag-absent=obsolete&format=JSON`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(translationFile),
    });

    if (!response.ok) {
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
