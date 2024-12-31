import React, { useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { mount } from 'auth/AuthApp';


export default ({ onSignIn }) => {
    const ref = useRef(null);
    // copy of history used in container i.e browser History
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;

                if (pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            },
            initialPath: history.location.pathname,
            onSignIn,
        });
        history.listen(onParentNavigate);
    }, []);

    return (<div ref={ref} />)
};
