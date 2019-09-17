const fs = require("fs");
const path = require("path");
const frontendDir = path.resolve(__dirname, "../frontend");
const frontendBuildDir = path.resolve(frontendDir, "build");
const htmlFilePath = path.resolve(frontendDir, "index.html");
const jsFilePath = path.resolve(frontendDir, "index.js");

if (!htmlFilePath) {
  throw new Error("HTML file not found");
}

(async function build() {
  console.log("building...");
  console.time("build:time");
  await prepareHtml()
    .then(html => moveFilesToBuildDirectory(html))
    .catch(e => {
      throw new Error(e.message);
    });
  console.timeEnd("build:time");
  console.log("done!");
})();

function prepareHtml() {
  console.log("preparing html...");
  return new Promise((resolve, reject) =>
    Promise.all([
      fs.promises.readFile(htmlFilePath, "utf8"),
      fs.promises.mkdir(frontendBuildDir, { recursive: true })
    ])
      .then(([html]) => resolve(html))
      .catch(e => reject(e))
  );
}

async function moveFilesToBuildDirectory(html) {
  const htmlFileBuildPath = path.resolve(frontendBuildDir, "index.html");
  const jsFileBuildPath = path.resolve(frontendBuildDir, "index.js");
  console.log("copying files...");
  await Promise.all([
    fs.promises.writeFile(htmlFileBuildPath, html),
    fs.promises.copyFile(jsFilePath, jsFileBuildPath)
  ]);
}
