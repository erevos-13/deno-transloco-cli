import { assertEquals } from "@std/assert";
import {
  getTranslationFile,
  writeToFileInNewLocation,
} from "../files-manager/index.ts";
import translation from "../../translate.json" with { type: "json" };
import { basename } from "@std/path/basename";
import { join } from "@std/path/join";

Deno.test("getTranslationFile function test", async () => {
  const filePath = "./translate.json"; // Adjust the path as necessary
  const result = await getTranslationFile(filePath);
  assertEquals(result, translation);
});

Deno.test("writeToFileInNewLocation function test", async () => {
  const filePath = "./translate"; // Adjust the path as necessary
  const newLocation = "./i18n"; // Adjust the path as necessary
  const content = new TextEncoder().encode(JSON.stringify(translation));
  await writeToFileInNewLocation(filePath, newLocation, content);
  const fileName = basename(filePath);
  const newPath = join(newLocation, fileName);
  const exists = await Deno.stat(`${newPath}.json`).then(() => true).catch(() =>
    false
  );
  assertEquals(exists, true);
});
