module.exports = function (arg: string, extension: string) {
  return `${__dirname.replace("handler", "")}/public/html/${arg}.${
    extension || "html"
  }`;
};
