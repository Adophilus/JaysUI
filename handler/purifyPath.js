module.exports = function (arg) {
    return arg.replace(/\/\//gi, "/").toString().replace(/\//, "/");
};
