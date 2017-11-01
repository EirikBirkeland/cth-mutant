// TODO: Get a MutationObserver node polyfill .. use with Cheerio for testing?

// Duplicate the object, OLOO style
const myObserver = Object.create(Mutant)

myObserver.observe(document, {childList: true}, function (muts) {
    muts.forEach(mut => {
        console.log(mut)
    })
})

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