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
    _mutationObserver: null,
    _callback: null,
    _target: null,
    _config: null,

    observe: function (target = this._target, config = this._config, cb) {
        this._target = target
        this._config = config

        this._callback = cb || this._callback

        if (!this._mutationObserver) {
            this._mutationObserver = new MutationObserver(this._callback)
        }

        this._mutationObserver.observe(target, config)
    },

    disconnect: function () {
        this._mutationObserver.disconnect()
    },

    /**
     * Convenience method.
     */
    reconnect: function () {
        this.observe()
    }
}