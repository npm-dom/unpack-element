var dotty = require("dotty")
var DataSet = require("data-set")

var slice = Array.prototype.slice

module.exports = unpack

function unpack(elem, mapping) {
    var struct = {}

    getChildMarkers(elem)

    if (!struct.root) {
        struct.root = elem
    }

    if (mapping) {
        Object.keys(mapping).forEach(findElement)
    }

    return struct

    function getChildMarkers(elem) {
        var children = slice.call(elem.children)

        children.forEach(function (child) {
            var ds = DataSet(child)
            var marker = ds.marker
            var rootMarker = ds.rootmarker

            if (marker) {
                dotty.put(struct, marker, child)
                getChildMarkers(child)
            } else if (rootMarker) {
                dotty.put(struct, rootMarker, child)
            }
        })
    }

    function findElement(key) {
        var className = mapping[key]
        var children = elem.getElementsByClassName(className)
        struct[key] = children[0]
    }
}
