import { parseArgs } from "@std/cli/parse-args";

console.log("%cLoco CLI Upload and extract", "color: green");
console.log(
  "%cPlease add the key of your loco project, the json file that we will upload",
  "color: blue",
);
console.log("%cand the locale that you want to extract", "color: blue");
console.log("%cand the path where you want to extract the file", "color: blue");
console.log(
  "%cand the name that the translation file is going to get (Default is the locale)",
  "color: blue",
);
console.log(
  "%cThis will upload the json file to loco and extract the locale file",
  "color: blue",
);

const flags = parseArgs(Deno.args, {
  boolean: [
    "help",
    "post",
    "update",
    "extractAll",
  ],
  string: [
    "version",
    "translate",
    "filtersPath",
    "filename",
    "locale",
    "filter",
    "token",
    "extract",
  ],
  default: {
    post: true,
    filter: [],
    extract: "./",
    translate: "./",
    extractAll: false,
    filename: "./",
  },
  negatable: ["post"],
});
if (flags.help) {
  console.log("%c--------------------------------", "color: green");
  console.log(
    "%cToken: The token of your loco project (Required)",
    "color: blue",
  );
  console.log(
    "%cLocale: The locale that you want to extract (Required)",
    "color: blue",
  );
  console.log(
    "%cPath to export: The path where you want to extract the file (Required)",
    "color: blue",
  );
  console.log(
    "%cName: The name that the translation file is going to get (Default is the locale)",
    "color: blue",
  );
  console.log(
    "%cFilters: The filters that you want to apply to the json file (Optional)",
    "color: blue",
  );
  console.log(
    "%cPost: If you want to post the json file to loco (Default is true)",
    "color: blue",
  );
  console.log(
    "%cExtract: If you want to extract the locale file from loco (Default is true)",
    "color: blue",
  );
  console.log(
    "%cUpdate: If you want to update the json file with the new translations from loco (Default is false)",
    "color: blue",
  );
  console.log("%c--------------------------------", "color: green");
  Deno.exit(1);
}
if (!flags.token) {
  console.log(
    "%cPlease add the token of your loco project",
    "color: red",
  );
  Deno.exit(1);
}
if (!flags.locale) {
  console.log("%cPlease add the locale that you want to extract", "color: red");
  Deno.exit(1);
}
export default flags;
