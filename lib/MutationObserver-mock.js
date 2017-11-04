class MutationObserver {
    constructor(cb) {
        this._cb = cb
        this.enabled
    }

    observe(target, config) {
        documentMock.subscribe.call(documentMock, {
            MutationObserver: function (arr) {
                this._cb(arr)
            }.bind(this)
        })
    }

    disconnect() {
        documentMock.unsubscribe.call(documentMock, 'MutationObserver')
    }
}

/**
 * Think of this as the global 'document' object
 * The contents of body is just a string for the purposes of this unit test
 */
const documentMock = {
    set body(str) {
        this._body = str
        this.triggerEvent(str)
    },
    get body(){
        return this._body
    },
    triggerEvent: function (arr) {
        for (let key in this.subscribers) {
            this.subscribers[key](["event1"])
        }
    },
    subscribe: function (sub) {
        this.subscribers = sub
    },
    unsubscribe: function (sub) {
        delete this.subscribers[sub]
    },
    subscribers: {}
}

module.exports = {MutationObserver, documentMock}