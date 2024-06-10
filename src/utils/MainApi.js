class MainApi {
    constructor(options) {
        this._url = localStorage.getItem('url_CrocOtt') + '/panel_pro/api';
        this._headers = options.headers;
    }

    // Check Url
    checkUrl() {
        this._url = localStorage.getItem('url_CrocOtt') + '/panel_pro/api';
    }

    // Check Response
    async _checkResponse(res) {
        const result = await res.json();
        return res.ok ? result : Promise.reject(result);
    }

    // Get token from header
    setJwt() {
        this._headers.authorization = `Bearer ${localStorage.getItem('jwt_CrocOtt')}`;
    }

    // Check Token
    checkToken(token) {
        this.checkUrl()
        this._headers.authorization = `Bearer ${token}`
        return fetch(`${this._url}/client/profile`, {
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    // refresh token
    refreshToken(authorization, refresh_token) {
        console.log(authorization);
        console.log(refresh_token);
        this._headers.authorization = authorization
        return fetch(`${this._url}/client/refresh_token`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(
                { "refresh_token": refresh_token }
            )
        })
            .then(res => this._checkResponse(res));
    }

    // CLIENT
    // BASIC AUTH

    // Create Headers for auth
    // headers with login + password 
    createHeaders(login, password) {
        return 'Basic ' + window.btoa(login + ":" + password);
    }

    // headers with code 
    createHeadersWithCode(code) {
        return 'Code ' + code;
    }

    // get list devices
    getListDevices(authorization) {
        this.checkUrl()
        this._headers.authorization = authorization
        return fetch(`${this._url}/client/devices`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    // add device
    addDevice(authorization, name) {
        this.checkUrl()
        this._headers.authorization = authorization;
        return fetch(`${this._url}/client/devices/add`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name
            })
        })
            .then(res => this._checkResponse(res));
    }

    // login
    login(authorization, data) {
        this.checkUrl()
        this._headers.authorization = authorization;
        return fetch(`${this._url}/client/login`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(
                data
            )
        })
            .then(res => this._checkResponse(res));
    }

    // get profile
    getProfile() {
        this.checkUrl()
        this.setJwt();
        return fetch(`${this._url}/client/profile`, {
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }

    // get full content
    getFullContent() {
        this.checkUrl()
        this.setJwt();
        return fetch(`${this._url}/client/full_content`, {
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }

    // get Tv programs
    getTvPrograms(channelId) {
        this.checkUrl()
        this.setJwt();
        return fetch(`${this._url}/client/content/epg/${channelId}`, {
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }



    // NOT AUTH
    // get info
    getInfo() {
        this.checkUrl()
        return fetch(`${this._url}/info`, {
        })
            .then(res => this._checkResponse(res));
    }

}



const mainApi = new MainApi({
    // baseUrl: 'https://ott.crocott.com/panel_pro/api',
    baseUrl: localStorage.getItem('url_CrocOtt') + '/panel_pro/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default mainApi;