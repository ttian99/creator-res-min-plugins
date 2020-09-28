const logger = {
    TAG: '[res-min]',
    init() {
        console.log = this.log;
        console.info = this.info;
        console.warn = this.warn;
        console.error = this.error;
    },
    log() {
        Array.prototype.unshift.call(arguments, this.TAG);
        return Editor.log.apply(Editor.log, arguments);
    },
    info() {
        Array.prototype.unshift.call(arguments, this.TAG);
        return Editor.info.apply(Editor.info, arguments);
    },
    warn() {
        Array.prototype.unshift.call(arguments, this.TAG);
        return Editor.warn.apply(Editor.warn, arguments);
    },
    error() {
        Array.prototype.unshift.call(arguments, this.TAG);
        return Editor.error.apply(Editor.error, arguments);
    },
    success() {
        Array.prototype.unshift.call(arguments, this.TAG);
        return Editor.success.apply(Editor.success, arguments);
    },
    failed() {
        Array.prototype.unshift.call(arguments, this.TAG);
        return Editor.failed.apply(Editor.failed, arguments);
    }
}

module.exports = logger;