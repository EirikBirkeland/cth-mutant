const {MutationObserver, documentMock} = require('./lib/MutationObserver-mock')
global.MutationObserver = MutationObserver
const Mutant = require('./index')
const forEach = require('lodash.foreach')
const test = require('ava')

const myObserver = Object.create(Mutant)
const mutCallbackEvents = []

myObserver.observe(documentMock, {childList: true, subtree: true}, function (muts) {
    forEach(muts, mut => {
        mutCallbackEvents.push(mut)
    })
})

test('Change object and expect event to trigger', t => {
    const lenBefore = mutCallbackEvents.length

    documentMock.body = "<span></span>"

    const lenAfter = mutCallbackEvents.length

    if (lenAfter > lenBefore) {
        t.pass()
    }

})

test('Disconnect observer and expect event NOT to trigger', t => {

    myObserver.disconnect()
    const lenBefore = mutCallbackEvents.length

    documentMock.body = "<span>Doing some stuff without triggering events.</span>"

    const lenAfter = mutCallbackEvents.length

    if (lenAfter === lenBefore) {
        t.pass()
    }
})

test('Reconnect observer and expect event NOT to trigger', t => {

    myObserver.reconnect()
    const lenBefore = mutCallbackEvents.length

    documentMock.body = "<span>This one should trigger.</span>"

    const lenAfter = mutCallbackEvents.length

    if (lenAfter > lenBefore) {
        t.pass()
    }
})

/*
const myObserver2 = Object.create(Mutant)

myObserver2.observe({
    target: document,
    config: {childList: true},
    callback: function (muts) {
        muts.forEach(mut => {
            // pause observing
            myObserver3.disconnect()

            // do any intermittent synchronous DOM work here
            document.body.appendChild(document.createElement('span'))

            // Then, reconnect to the instance
            myObserver3.reconnect()
        })
    }
})

const myObserver3 = Object.create(Mutant)

myObserver3
    .observe({
        target: document,
        config: {childList: true, subtree: true}
    })
    .tap(function (muts) {
        console.log(muts)
    })
    */