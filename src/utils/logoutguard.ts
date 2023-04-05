import { NavigateFunction } from 'react-router-dom';
import { checkJWT } from './api';
// User should be logged out to access this page, otherwise redirect to dashboard
function logoutGuard(navigate: NavigateFunction) {
    function navigator() {
        if (checkJWT()) {
            navigate('/');
        }
    }
    return navigator;
}

export default logoutGuard;