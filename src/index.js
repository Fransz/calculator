/* global document */
/* eslint-disable no-unused-vars */
import App from "./components/App";
import Calculator from "./components/Calculator/Calculator";
/* eslint-enable no-unused-vars */

import ReactDOM from "react-dom";
const context = {
    insertCss: (...styles) => {
        const removeCss = styles.map(x => x._insertCss());
        return () => { removeCss.forEach(f => f()); };
    }
};

ReactDOM.render(<App context={context}><Calculator /></App>, document.querySelectorAll("#root")[0]);
