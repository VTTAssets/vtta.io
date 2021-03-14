require("dotenv").config();
const fs = require("fs");
const path = require("path");
const renderMarkdown = require("./markdown/render");
const getDirectories = require("./utils/getDirectories");
const mongoose = require("mongoose");

const Content = require("./models/content.model");

const contentTypes = getDirectories(path.resolve(process.env.CONTENT_ROOT)).map(
  (directory) => ({
    type: path.basename(directory),
    path: directory,
  })
);

const processContentTypes = (contentTypes) => {
  console.log(
    "ContentTypes: " +
      contentTypes.map((contentType) => contentType.type).join(", ")
  );
  let results = [];

  contentTypes.forEach((contentType) => {
    const contents = getDirectories(contentType.path)
      .map((dir) => {
        if (fs.existsSync(dir + "/index.md")) {
          const slug = path.basename(dir);
          const result = renderMarkdown(
            contentType.type,
            slug,
            dir + "/index.md"
          );
          //   const stat = fs.statSync(dir + "/index.md");
          //   result.created = stat.birthtime;
          //   result.updated = stat.mtime;
          return result;
        }
        return undefined;
      })
      .filter((result) => result !== undefined)
      .map((result) => {
        console.log(result.title + ": " + result.draft);
        return result;
      })
      .filter((result) => result.draft === undefined || result.draft === false);
    results = results.concat(contents);
  });
  return results;
};

mongoose
  .connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    let contents = processContentTypes(contentTypes);
    for (let i = 0; i < contents.length; i++) {
      let content = await Content.findOne({ link: contents[i].link });
      if (content) {
        if (content.hash !== contents[i].hash) {
          console.log("[UPDATE] :" + contents[i].title + "...");
          await Content.findOneAndUpdate({ _id: content._id }, contents[i]);
        } else {
          console.log("[SKIP]   :" + contents[i].title + "...");
        }
      } else {
        console.log("[CREATE] :" + contents[i].title + "...");
        content = new Content(contents[i]);
        await content.save();
      }
    }
    process.exit(0);
  });
