function saveJwt(res) {
    localStorage.setItem('jwt_CrocOtt', res.data.access_token)
    localStorage.setItem('jwt_refresh_CrocOtt', res.data.refresh_token)
}

export default saveJwt;