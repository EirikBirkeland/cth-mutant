TODO: Rewrite/finish

Usage goes something like:

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
