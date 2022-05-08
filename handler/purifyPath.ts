module.exports = function (arg: string) {
  return arg.replace(/\/\//gi, "/").toString().replace(/\//, "/");
};
