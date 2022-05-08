module.exports = function (arg, extension) {
    return "".concat(__dirname.replace("handler", ""), "/public/html/").concat(arg, ".").concat(extension || "html");
};
