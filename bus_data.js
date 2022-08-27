const url = require("url");
const axios = require("axios");


global.bus_data = []

const accessTokenUrl = 'https://mvdapi-auth.montevideo.gub.uy/auth/realms/pci/protocol/openid-connect/token'
const client_id = '0fd745cf'
const client_secret = 'f2d54a0710923de3c95cb1342d436796'


let access_token = undefined
let refresh_token = undefined

const getToken = async (refresh = false) => {
    let params = new URLSearchParams({
        client_id,
        client_secret,
        grant_type: refresh ? 'refresh_token' : 'client_credentials'
    })
    return axios.post(accessTokenUrl, params.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
    }).then(r => r.data).catch(r => console.log(r))
}


const getAccessToken = async () => {
    let token = undefined
    // Get new token
    if (!refresh_token || !access_token || Date.now() > access_token.expires_date) {
        const body = await getToken(access_token != undefined && Date.now() > refresh_token.expires_date)
        access_token = {
            token: body.access_token,
            expires_in: body.expires_in,
            expires_date: Date.now() + body.expires_in * 1000,
        }
        refresh_token = {
            token: body.refresh_token,
            expires_in: body.refresh_expires_in,
            expires_date: Date.now() + body.refresh_expires_in * 1000,
        }
        token = body.access_token
    }
    if (!token) {
        token = access_token.token
    }
    return token
}


function init_bus_scheduler() {

    setInterval(async () => {

        getAccessToken().then(
            token =>
                axios.get('https://api.montevideo.gub.uy/api/transportepublico/buses', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
        ).then(res => res.data).then(body => bus_data = body).catch(err => console.log(err))

    }, 10000)

}

module.exports = {bus_data, init_bus_scheduler};