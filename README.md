# unpack-element

unpack an element's children based on their id

## Example

Take a dom element and unpack it into it's children based on their ids

```
<div>
    <ul id="list">
    </ul>
    <span id="foo"></span>
</div>
```

```
var unpack = require("unpack-element")

var elements = unpack(thatDiv)
elements.root // that div
elements.list // that ul
elements.foo // that span
```

unpack removes the id attributes from the child nodes. This is useful if your
template generates a dom element with common ids in it and you want to have
access to those "named" children inside your template without having global
id's in your DOM

## Installation

`npm install unpack-element`

## Contributors

 - Raynos

## MIT Licenced