var walk = require("dom-walk")
    , forEach = require("for-each")

module.exports = unpack

function unpack(elem, mapping) {
    var struct = {}

    walk([elem], findChildren)

    if (!struct.root) {
        struct.root = elem
    }

    if (mapping) {
        forEach(mapping, findElement)
    }

    return struct

    function findChildren(node) {
        if (node.id) {
            var id = node.id
            node.removeAttribute("id")
            struct[id] = node
        }
    }

    function findElement(className, key) {
        var children = elem.getElementsByClassName(className)
        struct[key] = children[0]
    }
}
