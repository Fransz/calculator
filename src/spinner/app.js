/**
 * In this lesson we expand on jsx.js.
 * - Our item list is passed as a backbone collection of backbone models to our components.
 * - We introduce jQuery.ui.spinner as input widget for adjusting quantities.
 * - Our shopinglists items quantities have their own component now.
 */
'use strict'

var itemList = [
    {
        name: 'Sleeping Bag w/ Stuff Sack',
        quantity: 1,
        price: 44.99
    },
    {
        name: 'Chocolate Energy Bar',
        quantity: 4,
        price: 2.99 * 4
    },
    {
        name: '2-Person Polyethylene Tent',
        quantity: 1,
        price: 104.33
    }
]

document.onreadystatechange = function () {
    if(document.readyState === 'complete') {
        let renderShoppingList = function(coll) {
            ReactDOM.render(<ShoppingList collection={coll} />, document.getElementById('here'))
        }

        const ShoppingItem = Backbone.Model.extend()

        const ShoppingItemCollection = Backbone.Collection.extend({
            model: ShoppingItem,

            initialize: function() {
                this.on('change', () => renderShoppingList(this))
            }
        })

        let shoppingItemCollection = new ShoppingItemCollection(itemList)
        renderShoppingList(shoppingItemCollection)
    }
}

