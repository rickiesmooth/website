const fs = require("fs");
const path = require("path");
const outputs = require("./outputs.json");
const frontendDir = path.resolve(__dirname, "../frontend");
const frontendBuildDir = path.resolve(frontendDir, "build");
const htmlFilePath = path.resolve(frontendDir, "index.html");
const jsFilePath = path.resolve(frontendDir, "index.js");

if (!outputs) {
  throw new Error("outputs.json not found");
}

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
  const exposedServices = outputs
    .map(
      ({ OutputKey, OutputValue }) => `window.${OutputKey} = "${OutputValue}";`
    )
    .join("");
  console.log("preparing html...");
  return new Promise((resolve, reject) =>
    Promise.all([
      fs.promises.readFile(htmlFilePath, "utf8"),
      fs.promises.mkdir(frontendBuildDir, { recursive: true })
    ])
      .then(([html]) =>
        resolve(html.replace(`("__SERVICES__");`, exposedServices))
      )
      .catch(e => reject(e))
  );
}

async function moveFilesToBuildDirectory(preparedHtml) {
  const htmlFileBuildPath = path.resolve(frontendBuildDir, "index.html");
  const jsFileBuildPath = path.resolve(frontendBuildDir, "index.js");
  console.log("copying files...");
  await Promise.all([
    fs.promises.writeFile(htmlFileBuildPath, preparedHtml),
    fs.promises.copyFile(jsFilePath, jsFileBuildPath)
  ]);
}
