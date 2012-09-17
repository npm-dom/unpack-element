var snippet = require("./snippet.html")
    , Element = require("fragment").Element
    , unpack = require("../index")
    , assert = require("assert")

var elements = unpack(Element(snippet))

assert.equal(elements.root.tagName, "DIV")
assert.equal(elements.list.tagName, "UL")
assert.equal(elements.foo.tagName, "SPAN")
console.log("done", elements)