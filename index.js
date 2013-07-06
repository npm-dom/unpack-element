var dotty = require("dotty")
var DataSet = require("data-set")

var isArray = /\[\]$/
var slice = Array.prototype.slice

module.exports = unpack

function unpack(elem, mapping) {
    var struct = {}

    getMarkers(struct, elem, true)

    if (!struct.root) {
        struct.root = elem
    }

    if (mapping) {
        Object.keys(mapping).forEach(findElement)
    }

    return struct

    function findElement(key) {
        var className = mapping[key]
        var children = elem.getElementsByClassName(className)
        struct[key] = children[0]
    }
}

function getMarkers(struct, elem, isTop) {
    var ds = DataSet(elem)
    var marker = ds.marker
    var rootMarker = ds.rootmarker

    if (marker) {
        if (isArray.test(marker)) {
            marker = marker.slice(0, -2)
            join(struct, marker, [elem])
        } else {
            dotty.put(struct, marker, elem)
        }

        getChildMarkers(struct, elem)
    } else if (rootMarker) {
        if (isArray.test(rootMarker)) {
            rootMarker = rootMarker.slice(0, -2)
            join(struct, rootMarker, [elem])
        } else {
            dotty.put(struct, rootMarker, elem)
        }

        if (isTop) {
            getChildMarkers(struct, elem)
        }
    } else {
        getChildMarkers(struct, elem)
    }
}

function getChildMarkers(struct, parent) {
    var children = slice.call(parent.children)

    children.forEach(function (child) {
        getMarkers(struct, child)
    })
}

function join(obj, key, value) {
    var existing = dotty.get(obj, key)
    if (Array.isArray(existing)) {
        value = existing.concat(value)
    }

    dotty.put(obj, key, value)
}
