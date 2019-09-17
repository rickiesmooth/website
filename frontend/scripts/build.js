const fs = require("fs");
const path = require("path");
const frontendDir = path.resolve(__dirname, "../");
const frontendBuildDir = path.resolve(frontendDir, "build");
const htmlFilePath = path.resolve(frontendDir, "index.html");
const jsFilePath = path.resolve(frontendDir, "index.js");

if (!htmlFilePath) {
  throw new Error("HTML file not found");
}

(async function build() {
  console.log("building...");
  console.time("build:time");
  try {
    await moveFilesToBuildDirectory();
  } catch (error) {
    throw new Error(error);
  }
  console.timeEnd("build:time");
  console.log("done!");
})();

async function moveFilesToBuildDirectory() {
  const htmlFileBuildPath = path.resolve(frontendBuildDir, "index.html");
  const jsFileBuildPath = path.resolve(frontendBuildDir, "index.js");
  console.log("copying files...");
  await fs.promises.mkdir(frontendBuildDir, { recursive: true });
  await Promise.all([
    fs.promises.copyFile(htmlFilePath, htmlFileBuildPath),
    fs.promises.copyFile(jsFilePath, jsFileBuildPath)
  ]);
}
