import { basename, join } from "jsr:@std/path";

export const getTranslationFile = async (filePath: string) => {
  try {
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
    const fileName = basename(filePath);
    const newPath = join(newLocation, fileName);
    await Deno.writeFile(newPath, content);
  } catch (error) {
    console.error(`Error writing file to disk: ${error}`);
    throw error;
  }
};

export const extractLocale = async (
  locale: string,
  destinationFile: string,
  nameOfFile: string,
) => {
  try {
    const fileContent = await Deno.readFile(`./${locale}.json`);
    await writeToFileInNewLocation(
      `./${nameOfFile ? nameOfFile : locale}.json`,
      destinationFile,
      fileContent,
    );
    console.log("%cFile extracted", "color: green");
  } catch (err) {
    console.error("%cError on extract file", "color: red");
    throw err;
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
  } catch (error) {
    console.error(`Error creating file`, JSON.stringify(error, null, 4));
    throw error;
  }
};
