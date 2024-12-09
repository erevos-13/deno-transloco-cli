import flags from "./commands.ts";

export default function server() {
  console.log("Server is running flags", flags);
  if (flags.post) {
    console.log(
      "%cStart Posting to loco",
      "color: green;font-weight: bold;text-decoration: underline",
    );
  }
}
