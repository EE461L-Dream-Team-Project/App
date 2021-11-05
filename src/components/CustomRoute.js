import { React, useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';
import { get } from '../request';

const CustomRoute = ({component: Component, loginRequired, redirectPath, ...rest}) => {
    const [authed, setAuth] = useState(null);
    useEffect(() => {
        async function getAuth() {
            const res = await get('/is_logged_in');
            setAuth(res.data.bool);
        }
        getAuth();
    },);
    return (
        <Route {...rest} render={props => (
            (authed != null) && (loginRequired ^ authed) ? // check if loginRequired and authed are different
                <Redirect to={redirectPath} />
            : <Component {...props} />
        )} />
    );
};

export default CustomRoute;