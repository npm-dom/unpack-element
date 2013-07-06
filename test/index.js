var test = require("tape")
var dom = require("jsonml-stringify/dom")

var unpack = require("../index")

test("unpack simple template", function (assert) {
    var tmpl = dom(["div", [
        ["ul", { "data-marker": "list" }],
        ["span", { "data-marker": "foo" }]
    ]])

    var elements = unpack(tmpl)
    assert.equal(elements.root, tmpl)
    assert.equal(elements.list.tagName, "UL")
    assert.equal(elements.foo.tagName, "SPAN")
    assert.equal(Object.keys(elements).length , 3)

    assert.end()
})

test("unpack complex nested template", function (assert) {
    var tmpl = dom(["body", [
        ["div.foo", { "data-rootmarker": "thingList" }, [
            ["ul", { "data-marker": "list" }],
            ["span", { "data-marker": "foo" }]
        ]],
        ["div.bar", { "data-rootmarker": "otherList"}, [
            ["ol", { "data-marker": "list" }],
            ["span", { "data-marker": "bar" }]
        ]]
    ]])

    var elements = unpack(tmpl)
    assert.equal(elements.root, tmpl)
    assert.equal(elements.thingList.className, "foo")
    assert.equal(elements.otherList.className, "bar")
    assert.equal(Object.keys(elements).length, 3)

    var thingChild = unpack(elements.thingList)
    assert.equal(thingChild.root, elements.thingList)
    assert.equal(thingChild.list.tagName, "UL")
    assert.equal(thingChild.foo.tagName, "SPAN")
    assert.equal(Object.keys(elements).length, 3)

    var otherChild = unpack(elements.otherList)
    assert.equal(otherChild.root, elements.otherList)
    assert.equal(otherChild.list.tagName, "OL")
    assert.equal(otherChild.bar.tagName, "SPAN")
    assert.equal(Object.keys(elements).length, 3)

    assert.end()
})

test("unpack nested templates with sub paths", function (assert) {
    var tmpl = dom(["div", [
        ["ul", { "data-marker": "list"}, [
            ["li", { "data-rootmarker": "listItems.1" }, [
                ["span", "Item 1"],
                ["button", { "data-marker": "remove" }, "X"]
            ]],
            ["li", { "data-rootmarker": "listItems.2" }, [
                ["span", "Item 2"],
                ["button", { "data-marker": "remove" }, "X"]
            ]]
        ]],
        ["span", { "data-marker": "foo" }]
    ]])

    var elements = unpack(tmpl)
    assert.equal(elements.root, tmpl)
    assert.equal(elements.list.tagName, "UL")
    assert.equal(elements.foo.tagName, "SPAN")
    assert.equal(Object.getPrototypeOf(elements.listItems),
        Object.prototype)
    assert.equal(Object.keys(elements).length, 4)

    var listItem1 = unpack(elements.listItems[1])
    assert.equal(listItem1.root, elements.listItems[1])
    assert.equal(listItem1.remove.tagName, "BUTTON")
    assert.equal(Object.keys(listItem1).length, 3)

    var listItem2 = unpack(elements.listItems[2])
    assert.equal(listItem2.root, elements.listItems[2])
    assert.equal(listItem2.remove.tagName, "BUTTON")
    assert.equal(Object.keys(listItem2).length, 3)

    assert.end()
})

test("unpack with class mapping", function (assert) {
    var tmpl = dom(["div", [
        ["ul.apples-list"],
        ["span.apple-foo"]
    ]])

    var elements = unpack(tmpl, {
        list: "apples-list",
        foo: "apple-foo"
    })

    assert.equal(elements.root, tmpl)
    assert.equal(elements.list.tagName, "UL")
    assert.equal(elements.foo.tagName, "SPAN")
    assert.equal(Object.keys(elements).length, 3)

    assert.end()
})

test("nested traversal", function (assert) {
    var tmpl = dom(["div", [
        ["div", [
            ["div", { "data-marker": "foo" }]
        ]]
    ]])

    var elements = unpack(tmpl)

    assert.equal(elements.root, tmpl)
    assert.equal(elements.foo.tagName, "DIV")
    assert.equal(Object.keys(elements).length, 2)

    assert.end()
})

test("unpack with array syntax", function (assert) {
    var tmpl = dom(["div", [
        ["button.foo", { "data-marker": "buttons[]" }],
        ["button.bar", { "data-marker": "buttons[]" }]
    ]])

    var elements = unpack(tmpl)

    assert.equal(elements.root, tmpl)
    assert.equal(Array.isArray(elements.buttons), true)
    assert.equal(elements.buttons[0].className, "foo")
    assert.equal(elements.buttons[1].className, "bar")
    assert.equal(elements.buttons.length, 2)
    assert.equal(Object.keys(elements).length, 2)

    assert.end()
})
