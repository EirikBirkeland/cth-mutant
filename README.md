TODO: Rewrite/finish

Usage goes something like:

```js
// Duplicate the object, OLOO style
const myObserver = Object.create(Mutant)

myObserver.observe(document, {childNodes: true}, function(muts){
  muts.forEach(mut => {
    console.log(mut)
  })
})

myObserver.disconnect()
// do any intermittent synchronous DOM work here
document.appendNode(document.createElement('span'))

// Then, reconnect to the instance
myObserver.reconnect()

// -------------------------------------

// Duplicate the object, OLOO style
const myObserver2 = Object.create(Mutant)

myObserver2.observe(document, {childNodes: true}, function(muts){
  muts.forEach(mut => {
    myObserver2.disconnect()
    // do any intermittent synchronous DOM work here
    document.appendNode(document.createElement('span'))

    // Then, reconnect to the instance
    myObserver2.reconnect()
  })
})

// -----------------------------------------

const myObserver3 = Object.create(Mutant)

myObserver3.observe({
    target: document,
    config: {childNodes: true},
    callback: function (muts) {
        muts.forEach(mut => {
            // pause observing
            myObserver2.disconnect()

            // do any intermittent synchronous DOM work here
            document.body.appendChild(document.createElement('span'))

            // Then, reconnect to the instance
            myObserver2.reconnect()
        })
    }
})

(;,;)
