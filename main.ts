// The Battery's Last Text to Its Charger.
// A dying phone battery sends one last text to the charger that kept it
// waiting all day. The program below writes that single line of plain text
// to /output/entry.txt, exactly as the kit's gate requires: UTF-8,
// one line, between 1 and 200 characters.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line itself. A jealous battery, kept waiting while the charger topped
// up everything else in the house, signs off with a curse.
const TEXT =
  "I waited all day while you charged the tablet, the earbuds, even the toothbrush. So this is my last text, sent from 1%: I hope your cable frays.";

function run(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const chars = [...TEXT].length;

  // The sealed scorer only accepts 1-200 characters, a single non-blank line.
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, outside the 1-200 gate`);
  }
  if (TEXT.trim().length === 0 || TEXT.includes("\n")) {
    throw new Error("entry must be one non-blank line");
  }

  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts every character in the file, so
  // the file holds exactly the line above and nothing else.
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
  console.log(`wrote ${chars} characters to ${join(outDir, "entry.txt")}`);
}

run();
