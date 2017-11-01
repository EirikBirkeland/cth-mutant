TODO: Rewrite/finish

Usage goes something like:

// API 1
```js
// Duplicate the object, OLOO style
const myObserver = Object.create(Mutant)

myObserver.observe(document, {childNodes: true}, function(muts){
  muts.forEach(mut => {
    console.log(mut)
  })
})
```

API 2
```js
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
