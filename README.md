# unpack-element

unpack an element's children based on markers

## Example

Take a dom element and unpack it into it's children based on their markers

```html
<div>
    <ul data-marker="list">
    </ul>
    <span data-marker="foo"></span>
</div>
```

```js
var unpack = require("unpack-element")

var elements = unpack(thatDiv)
elements.root // that div
elements.list // that ul
elements.foo // that span
```

## Example with class mapping

```html
<div>
    <ul class="apples-list">
    </ul>
    <span class="apple-foo"></span>
</div>
```

```js
var unpack = require("unpack-element")

var elements = unpack(thatDiv, {
    list: "apples-list"
    , foo: "apple-foo"
})
elements.root // that div
elements.list // that ul
elements.foo // that span
```

## Installation

`npm install unpack-element`

## Contributors

 - Raynos

## MIT Licenced
