import PropTypes from "prop-types";
import { Link, Redirect, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function ProtectedRoute({user, children, ...rest}) {
    return(
    <Route {...rest} render={({location}) => {
        if (user){
            return children;
        }
        if(!user){
            return(<Redirect to= {{pathname: ROUTES.LOGIN, state: {from: location}}}/>);
        }
    }}/>)
        
}

ProtectedRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired,
}