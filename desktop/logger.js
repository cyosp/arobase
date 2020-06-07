const debug = process.argv.indexOf('--debug') !== -1;

module.exports = {
    debug: (message) => {
        if (debug)
            console.debug(message);
    }
}