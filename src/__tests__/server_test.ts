import { assertEquals } from "@std/assert";
import server from "../server.ts";
import flags from "../commands.ts";

Deno.test("server function test - post flag", async (t) => {
  await t.step("should post to loco", () => {
    assertEquals(flags.translate, "./translate.json");
    assertEquals(flags.token, "testtestttsdfsfddsfs");
    assertEquals(flags.locale, "en");
    assertEquals(flags.extract, "./i18n");
    assertEquals(flags.filename, "en-GB");
    assertEquals(flags.extractAll, false);
  });
});
