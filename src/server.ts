import { getAllTranslation, getFromEndpoint } from "./API/get.ts";
import { postToEndpoint } from "./API/post.ts";
import flags from "./commands.ts";
import { writeToFileInNewLocation } from "./files-manager/index.ts";
import { extractJsonLocale, getTags } from "./utils/helper.ts";

export default async function server() {
  if (flags.post) {
    console.log(
      "%cStart Posting to loco",
      "color: green;font-weight: bold;text-decoration: underline",
    );
    try {
      const tags = getTags(flags);
      console.log(
        "%cTags",
        "color: green;font-weight: bold;text-decoration: underline",
        tags,
      );
      await postToEndpoint(
        flags.translate,
        flags.token!,
        flags.locale!,
      );
      if (flags.extractAll) {
        const allTranslation = await getAllTranslation(
          flags.token!,
          tags,
        );

        const locales = extractJsonLocale(allTranslation);
        console.log(
          "%cLocales",
          "color: green;font-weight: bold;text-decoration: underline",
          locales,
        );
        const encoder = new TextEncoder();
        for (const locale of locales) {
          const translationsDownload = await writeToFileInNewLocation(
            locale,
            flags.extract!,
            encoder.encode(JSON.stringify(allTranslation[locale])),
          );
        }
        console.log(
          "%cAll translations downloaded",
          "color: green;font-weight: bold;text-decoration: underline",
        );
        return;
      }

      const translationsDownload = await getFromEndpoint(
        flags.locale!,
        flags.token!,
        tags,
      );
      if (!translationsDownload) {
        throw new Error("Error during post response is not ok");
      }
      const newPath = await writeToFileInNewLocation(
        flags.filename!,
        flags.extract!,
        translationsDownload,
      );
      console.log(
        "%cTranslations downloaded and saved to",
        "color: green;font-weight: bold;text-decoration: underline",
        newPath,
      );
    } catch (error) {
      console.error(
        "%cError during post response is not ok",
        "color: red",
        JSON.stringify(error, null, 4),
      );
    }
  }
}
