import {createBrowserHistory} from 'history';

export const history = (forceRefresh = true) => {
    if (!forceRefresh) {
        return createBrowserHistory()
    }
    return createBrowserHistory({ forceRefresh: true})
}