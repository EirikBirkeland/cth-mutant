/**
 * This object encapsulates MutationObserver and adds a pleasant .reconnect() method. If you use MutationObservers quite often and want a simpler syntax, try this.
 *
 * .disconnect() and .reconnect() are sometimes a handy pair to use when we want to listen for a change in the DOM, suspend the listening, make our changes, and resume the listening.
 */

/**
 *
 * const myObserver = Object.create(CthChangeObserver)
 * myObserver.observe(document, {childNodes: true}, console.log)
 * myObserver.disconnect()
 * // do your work here
 *
 * // Then, reconnect to the instance
 * myObserver.reconnect()
 */

const Mutant = {
    observe: function (...args) {

        if (args[0] && args[1] && args[2]) {
            console.log(args)
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

    disconnect: function () {
        this._mutationObserver.disconnect()
    },

    /**
     * Convenience method.
     */
    reconnect: function () {
        this.observe()
    },

    tap: function (cb) {
        this._callback = cb
        this._mutationObserver = new MutationObserver(this._callback)
        this._mutationObserver.observe(this._target, this._config)
    }
}

module.exports = Mutant