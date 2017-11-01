TODO: Rewrite/finish

Usage goes something like:

API 1 - like standard, but just provide the callback as 3rd parameter.
```js
// Duplicate the object, OLOO style
const myObserver = Object.create(Mutant)

myObserver.observe(document, {childNodes: true}, function(muts){
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
    config: {childNodes: true},
    callback: function (muts) {
        muts.forEach(mut => {
          console.log(mut)
        })
    }
})
```

API 3 - chained

```js
const myObserver2 = Object.create(Mutant)

myObserver2
.observe({
    target: document,
    config: {childNodes: true}
})
.tap(function(muts){
    console.log(muts)
})
```

(;,;)
