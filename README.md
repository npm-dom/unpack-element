# unpack-element

[![browser support][5]][6]

<!-- [![build status][1]][2]  -->
[![NPM version][7]][8] [![dependency status][3]][4]

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

## Example with root markers

If you have server side generated DOM your page may be generated
    with multiple templates which each use unpack-element to
    extract their nodes. Ideally your top call to unpack-element
    won't recursively unpack every sub template as you only
    care about the top layer.

```html
<body>
    <div data-rootmarker="thingList">
        <ul data-marker="list">
        </ul>
        <span data-marker="foo"></span>
    </div>
    <div data-rootmarker="otherList">
        <ol data-marker="list">
        </ol>
        <span data-marker="bar"></span>
    </div>
</body>
```

```js
var unpack = require("unpack-element")

var elements = unpack(document.body)
elements.thingList // that div
elements.otherList // that other div
elements.root // document.body

var childElems = unpack(elements.thingList)
childElems.root // that div
childElems.list // that ul
childElems.foo // that span
```

When unpack reaches a `data-rootmarker` instead of a `data-marker`
    it will store that elem on the returned object with the
    marker but not recurse into it's children.

This strategy also works well for lists of sub elements where
    you want to only to fetch the root element of each sub
    template

```html
<div>
    <ul data-marker="list">
        <li data-rootmarker="listItems.1">
            <span>Item 1</span>
            <button data-marker="remove">X</button>
        </li>
        <li data-rootmarker="listItems.2">
            <span>Item 2</span>
            <button data-marker="remove">X</button>
        </li>
    </ul>
    <span data-marker="foo"></span>
</div>
```

```js
var unpack = require("unpack-element")

var elements = unpack(thatDiv)
elements.list // that ul
elements.foo // that span
elements.listItems /* {
    1: thatFirstLi,
    2: thatSecondLi
} */

var firstSubTemplate = unpack(elements.listItems.1)
firstSubTemplate.remove // that button
```

This style of using `data-rootmarker` allows you to unpack
    an entirely pre-rendered tree of templates and sub
    templates without having to worry about name collisions

## Example with array syntax

```html
<div>
    <button class="foo" data-marker="buttons[]"></button>
    <button class="bar" data-marker="buttons[]"></button>
</div>
```

```js
var unpack = require("unpack-element")

var elements = unpack(thatDiv)

elements.buttons // [button.foo, button.bar]
```

You can use `[]` syntax to mark that element as being part of
    an array. This means that the property on the return object
    will always be an array even if there is only one element
    with the `buttons[]` data-marker

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
    list: "apples-list",
    foo: "apple-foo"
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

  [1]: https://secure.travis-ci.org/Raynos/unpack-element.png
  [2]: https://travis-ci.org/Raynos/unpack-element
  [3]: https://david-dm.org/Raynos/unpack-element.png
  [4]: https://david-dm.org/Raynos/unpack-element
  [5]: https://ci.testling.com/Raynos/unpack-element.png
  [6]: https://ci.testling.com/Raynos/unpack-element
  [7]: https://badge.fury.io/js/unpack-element.png
  [8]: https://badge.fury.io/js/unpack-element
