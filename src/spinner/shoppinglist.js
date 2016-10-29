'use strict'

var priceToEuroString = function(amount) {
    return '€' + amount.toFixed(2)
}

var ShoppingItemQuantity = React.createClass({
    propTypes: {
        article: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    render: function () {
        return <div><input className='spin-here' /></div>
    },

    // Helper for getting the element where we want to inject the spinner
    getSpinnerWrapper: function () {
        return $('.spin-here', ReactDOM.findDOMNode(this))
    },

    // After the component is mounted we assign the onChange functin to 2 events.
    componentDidMount: function () {
        const spinnerWrapper = this.getSpinnerWrapper()
        spinnerWrapper.spinner({
            min: 0,
            spin: this.props.onChange
        })
        spinnerWrapper.spinner('value', this.props.article.get('quantity'))
        spinnerWrapper.on('change', this.props.onChange)
    },

    componentWillReceiveProps: function (nextProps) {
        this.getSpinnerWrapper().spinner('value', nextProps.article.get('quantity')) 
    },

    shouldComponentUpdate: function () {
        return true
    },

    componentWillUnmount: function () {
        this.getSpinnerWrapper.spinner('destroy')
    },
    

})

var ShoppingItemRow = React.createClass({
    propTypes: {
        article: React.PropTypes.object
    },

    render: function() {
        let article = this.props.article
        return <li><ul>
            <li className='name' key='name'>{article.get('name')}</li> 
            <li className='quantity' key='quantity'>
                <ShoppingItemQuantity article={article} onChange={this.onChangeQuantity} />
            </li>
            <li className='price' key='price'>{priceToEuroString(article.get('quantity') * article.get('price'))}</li> 
        </ul></li>
    },

    // The event handler for changing the quantity. It might be called by jquery.ui, or by an event.
    // React binds all uses of this, so this is the place to define the handler.
    // In the handler we change the backbone model, which in turn triggers the handler on the colection defined in app.js
    onChangeQuantity: function(event, ui) {
        this.props.article.set('quantity', ui ? ui.value : event.target.value) 
    }
})

var ShoppingTotal = React.createClass({
    propTypes: {
        articles: React.PropTypes.object
    },

    render: function() {
        var total = this.props.articles.reduce((sum, article) => sum += article.get('quantity') * article.get('price'), 0)
        return <ul className='total'>
            <li>Totaal</li>
            <li>{priceToEuroString(total)}</li>
        </ul>
    }
})

var ShoppingList = React.createClass({
    propTypes: {
        collection: React.PropTypes.object.isRequired
    },
    
    render: function() {
        return <div>
                <ol className='items'>
                    { this.props.collection.map((article) => <ShoppingItemRow key={article.get('name')} article={article} />) }
                </ol>
                <ShoppingTotal articles={this.props.collection} />
            </div>
    }
})
