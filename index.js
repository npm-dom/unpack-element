var walk = require("dom-walk")
var dotty = require("dotty")
var DataSet = require("data-set")

module.exports = unpack

function unpack(elem, mapping) {
    var struct = {}

    walk([elem], findChildren)

    if (!struct.root) {
        struct.root = elem
    }

    if (mapping) {
        Object.keys(mapping).forEach(findElement)
    }

    return struct

    function findChildren(node) {
        var ds = DataSet(node)
        var marker = ds.marker

        if (marker) {
            dotty.put(struct, marker, node)
        }
    }

    function findElement(key) {
        var className = mapping[key]
        var children = elem.getElementsByClassName(className)
        struct[key] = children[0]
    }
}
