const util = require("util");

module.exports = {
    toString: (object) => {
        return util.inspect(object, false, null, true);
    }
}