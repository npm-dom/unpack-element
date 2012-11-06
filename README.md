# unpack-element

unpack an element's children based on their id

## Example

Take a dom element and unpack it into it's children based on their ids

The ids are removed so you avoid naming collisions at the global level.

```html
<div>
    <ul id="list">
    </ul>
    <span id="foo"></span>
</div>
```

```js
var unpack = require("unpack-element")

var elements = unpack(thatDiv)
elements.root // that div
elements.list // that ul
elements.foo // that span
```

unpack removes the id attributes from the child nodes. This is useful if your
template generates a dom element with common ids in it and you want to have
access to those "named" children inside your template without having global
id's in your DOM.

You don't want those IDs in your document anyway since generally

 - it's bad to use ids for CSS selection
 - you can use `<a name="identifier></a>` if you want fragment identifiers.

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
