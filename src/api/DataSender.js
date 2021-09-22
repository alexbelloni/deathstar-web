module.exports = ({ token, route, method, data, withoutToken }) => {
    const url = new URL(route, process.env.REACT_APP_BASE_URL).href;

    return new Promise((resolve, reject) => {
        if (!withoutToken && !token) reject({message:'Token not found.'});

        fetch(url, {
            method,
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data
        })
            .then(res => resolve(res))
            .catch(e => reject(e));
    })
}
