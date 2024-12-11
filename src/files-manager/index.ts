import { basename, join } from "@std/path";

export const getTranslationFile = async (filePath: string) => {
  try {
    console.log(
      "%cFile path",
      "color: green;font-weight: bold;text-decoration: underline",
      filePath,
    );
    const decoder = new TextDecoder();
    const data = await Deno.readFile(filePath);
    return JSON.parse(decoder.decode(data));
  } catch (error) {
    console.error(`Error reading file from disk: ${error}`);
  }
};

export const writeToFileInNewLocation = async (
  filePath: string,
  newLocation: string,
  content: Uint8Array,
) => {
  try {
    if (!await Deno.stat(newLocation).catch(() => false)) {
      await Deno.mkdir(newLocation, { recursive: true });
      console.log(`${newLocation} created.`);
    }
    const fileName = basename(filePath);
    const newPath = join(newLocation, fileName);
    const decoder = new TextDecoder();
    const jsonData = JSON.parse(decoder.decode(content));
    const formattedJson = JSON.stringify(jsonData, null, 2);
    await Deno.writeTextFile(`${newPath}.json`, formattedJson, {
      create: true,
    });
    return `${fileName}.json`;
  } catch (error) {
    console.error(`Error writing file to disk: ${error}`);
    throw error;
  }
};

export const createAndStoreFile = async (
  locale: string,
  destinationFile: string,
  content: Uint8Array,
) => {
  try {
    if (!await Deno.stat(destinationFile).catch(() => false)) {
      await Deno.mkdir(destinationFile, { recursive: true });
      console.log(`${destinationFile} created.`);
    }
    const newPath = join(destinationFile, `${locale}.json`);
    await Deno.writeFile(newPath, content);
    return `${locale}.json`;
  } catch (error) {
    console.error(`Error creating file`, JSON.stringify(error, null, 4));
    throw error;
  }
};
