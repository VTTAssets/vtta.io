module.exports = (directory) =>
  require("fs")
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => dirent.name[0] !== ".")
    .map((dirent) => `${directory}/${dirent.name}`);
