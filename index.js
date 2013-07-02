var dotty = require("dotty")
var DataSet = require("data-set")

var isArray = /\[\]$/
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
                if (isArray.test(marker)) {
                    marker = marker.slice(0, -2)
                    join(struct, marker, [child])
                } else {
                    dotty.put(struct, marker, child)
                }
                getChildMarkers(child)
            } else if (rootMarker) {
                if (isArray.test(rootMarker)) {
                    rootMarker = rootMarker.slice(0, -2)
                    join(struct, rootMarker, [child])
                } else {
                    dotty.put(struct, rootMarker, child)
                }
            } else {
                getChildMarkers(child)
            }
        })
    }

    function findElement(key) {
        var className = mapping[key]
        var children = elem.getElementsByClassName(className)
        struct[key] = children[0]
    }
}

function join(obj, key, value) {
    var existing = dotty.get(obj, key)
    if (Array.isArray(existing)) {
        value = existing.concat(value)
    }

    dotty.put(obj, key, value)
}
