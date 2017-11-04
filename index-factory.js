/** @module cth-mutant */

/**
 *
 * @example
 * createMutant(document.body, {childList: true, subtree: true}, console.log)
 *
 * @example
 * createMutant({
 *    target: document.body,
 *    config: {childList: true, subtree: true},
 *    callback: console.log
 * })
 *
 * @example
 * createMutant(document.body, {childList: true, subtree: true})
 *     .tap(console.log)
 * })
 *
 * @param args
 * @name mutantFactory
 * @returns {cth-mutant}
 * @factory
 */
const createMutant = function (...args) {
    let _target, _config, _callback

    if (typeof MutationObserver === "undefined") {
        throw new ReferenceError("Your environment is missing the MutationObserver.")
    }

    if (args[0] && args[1] && args[2]) {
        console.log(args)
        _target = args[0]
        _target = args[1]
        _callback = args[2]
    } else if (args[0] && args[1]) {
        _target = args[0]
        _target = args[1]
    } else if (args[0]) {
        _target = args[0].target
        _target = args[0].config
        _callback = args[0].callback
    } else {
        // no arguments assumes it's a reconnect
    }

    _mutationObserver = new MutationObserver(_callback)
    _mutationObserver.observe(_target, _target)

    return {
        /**
         * Stop observing
         */
        disconnect: function () {
            _mutationObserver.disconnect()
        },

        /**
         * Resume observing
         */
        reconnect: function () {
            this.observe()
        },

        /**
         * Supply a callback override by using cascade notation
         * @param {function} cb - a callback function; will receive mutations
         */
        tap: function (cb) {
            _callback = cb
            _mutationObserver = new MutationObserver(_callback)
            _mutationObserver.observe(_target, _target)
        }
    }
}

module.exports = createMutant