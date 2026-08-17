import { copyFile, readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const outputDirectory = process.argv[2];
const rawBasePath = process.argv[3] ?? "";

if (!outputDirectory) {
  throw new Error("Missing GitHub Pages output directory.");
}

const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");
const localPaths = [
  "/_next/",
  "/favicon.svg",
  "/hero-sand-ray.png",
  "/vision-mate-spritesheet.webp",
  "/work-codex.jpg",
  "/work-company.jpg",
];
const textExtensions = new Set([".html", ".js", ".css", ".json"]);

const rewriteAssets = (source) => {
  if (!basePath) return source;
  return localPaths.reduce(
    (result, path) => result.replaceAll(path, `${basePath}${path}`),
    source,
  );
};

const rewriteDirectory = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteDirectory(path);
    } else if (textExtensions.has(extname(entry.name))) {
      const source = await readFile(path, "utf8");
      await writeFile(path, rewriteAssets(source));
    }
  }
};

await rewriteDirectory(outputDirectory);
await copyFile(join(outputDirectory, "index.html"), join(outputDirectory, "404.html"));
await writeFile(join(outputDirectory, ".nojekyll"), "");
