This object encapsulates MutationObserver and adds a pleasant .reconnect() method. Try this f you use MutationObservers often and want a simpler syntax.
.disconnect() and .reconnect() are handy to use when we want to listen for a change in the DOM, suspend the listening, make our changes, and resume the listening.

### Usage

API 1 - like standard, but just provide the callback as 3rd parameter.
```js
// Duplicate the object, OLOO style
const myObserver = Object.create(Mutant)

myObserver.observe(document, {childList: true}, function(muts){
  muts.forEach(mut => {
    console.log(mut)
  })
})
```

API 2 - explicit
```js
const myObserver2 = Object.create(Mutant)

myObserver2.observe({
    target: document,
    config: {childList: true},
    callback: function (muts) {
        muts.forEach(mut => {
          console.log(mut)
        })
    }
})
```

API 3 - chained
```js
const myObserver3 = Object.create(Mutant)

myObserver3
.observe({
    target: document,
    config: {childList: true}
})
.tap(function(muts){
    muts.forEach(mut => {
      console.log(mut)
    })
})
```

(;,;)

