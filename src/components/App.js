// eslint-disable-nex-line no-unused-vars
import React, { PropTypes } from "react";

const ContextType = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: PropTypes.func.isRequired,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(<App context={context}><HomePage /></App>, container);
 */
class App extends React.Component {

    // eslint-disable-nex-line no-unused-methods
    getChildContext() {
        return this.props.context;
    }

    render() {
        // NOTE: If you need to add or modify header, footer etc. of the app,
        // please do that inside the Layout component.
        return React.Children.only(this.props.children);
    }
}

App.propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
};

App.childContextTypes = ContextType;


export default App;
