/** @module cth-mutant */

/**
 * @namespace
 */
const Mutant = {
    /**
     * .observe() differs from the standard MutationObserver object in two respects:
     * (1) it takes the callback directly along with target and config
     * (2) it can be run without arguments to resume observing with previously provided parameters
     *
     * @param {args} args - multiple input styles possible. See readme for example
     * @returns {Mutant}
     */

    /**
     *
     * @param args
     * @returns {Mutant}
     */
    observe: function (...args) {
        if (typeof MutationObserver === "undefined") {
            throw new ReferenceError("Your environment is missing the MutationObserver.")
        }

        if (args[0] && args[1] && args[2]) {
            this._target = args[0]
            this._config = args[1]
            this._callback = args[2]
        } else if (args[0] && args[1]) {
            this._target = args[0]
            this._config = args[1]
        } else if (args[0]) {
            this._target = args[0].target
            this._config = args[0].config
            this._callback = args[0].callback
        } else {
            // no arguments assumes it's a reconnect
        }

        if (!this._callback) {
            return this
        }

        this._mutationObserver = new MutationObserver(this._callback)
        this._mutationObserver.observe(this._target, this._config)

    },

    /**
     *
     */
    disconnect: function () {
        this._mutationObserver.disconnect()
    },

    /**
     * Convenience method - an alias added for practical semantic reasons.
     */
    reconnect: function () {
        this.observe()
    },

    /**
     * .tap can be used for optionally adding a observer callback after initialization using jQuery-style cascade notation (returning this). Any existing callback stored on the object will be replaced.
     * @param {function} cb - a callback function; will receive mutations
     */
    tap: function (cb) {
        this._callback = cb
        this._mutationObserver = new MutationObserver(this._callback)
        this._mutationObserver.observe(this._target, this._config)
    }
}

module.exports = Mutant
