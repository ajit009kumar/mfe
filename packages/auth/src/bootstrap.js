import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// mount function to start up the app
const mount = (el, { onNavigate, onSignIn, defaultHistory, initialPath }) => {
    // Memory history to be used in child App.
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if(onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={history} onSignIn={onSignIn} />,
        el
    );

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};

// If we are in development and in isolation, 
// call mount immediately
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');
    if(devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

// we are running through container, export the mount function

export { mount };

