var walk = require("dom-walk")

module.exports = unpack

function unpack(elem) {
    var struct = {}
    walk([elem], function (node) {
        if (node.id) {
            var id = node.id
            node.removeAttribute("id")
            struct[id] = node
        }
    })
    if (!struct.root) {
        struct.root = elem
    }
    return struct
}