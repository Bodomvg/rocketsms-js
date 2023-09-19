const axios = require('axios')
const md5 = require('md5')


class SmsService{
    constructor(username, password){
        this.auth = {
            username: username,
            password: md5(password)
        }
    }
    async send(phone, newMessage){
        try {
            const message = {
                username: this.auth.username,
                password: this.auth.password,
                phone: phone,
                text: newMessage
            }
            const queryString = `username=${message.username}&password=${message.password}&phone=${message.phone}&text=${message.text}`
            const result = await axios.post('https://api.rocketsms.by/simple/send', queryString)
            if (result.status === 200) {
                return result.data
            } else {
                throw new Error(`Запрос завершился с нежелательным статус-кодом: ${result.status}`)
            }
        } catch (err) {
            throw err
        }
    }
    async status(id) {
        try {
            this.auth.id = id
            const result = await axios.get('https://api.rocketsms.by/simple/status', {
                params: this.auth
            })
            if (result.status === 200) {
                return result.data
            } else {
                throw new Error(`Запрос завершился с нежелательным статус-кодом: ${result.status}`)
            }
        } catch (err) {
            throw err
        }
    }
    async balance() {
        try {
            const result = await axios.get('https://api.rocketsms.by/simple/balance', {
                params: this.auth
            })
            if (result.status === 200) {
                return result.data
            } else {
                throw new Error(`Запрос завершился с нежелательным статус-кодом: ${result.status}`)
            }
        } catch (err) {
            throw err
        }
    }
    async senders() {
        try {
            const result = await axios.get('https://api.rocketsms.by/simple/senders', {
                params: this.auth
            })
            if (result.status === 200) {
                return result.data
            } else {
                throw new Error(`Запрос завершился с нежелательным статус-кодом: ${result.status}`)
            }
        } catch (err) {
            throw err
        }
    }
    async senderAdd(sender){
        try {
            const queryString = `username=${this.auth.username}&password=${this.auth.password}&sender=${sender}`
            const result = await axios.post('https:// api.rocketsms.by/simple/senders/add', queryString)
            if (result.status === 200) {
                return result.data
            } else {
                throw new Error(`Запрос завершился с нежелательным статус-кодом: ${result.status}`)
            }
        } catch (err) {
            throw err
        }
    }
    async templates() {
        try {
            const result = await axios.get('https://api.rocketsms.by/simple/templates', {
                params: this.auth
            })
            if (result.status === 200) {
                return result.data
            } else {
                throw new Error(`Запрос завершился с нежелательным статус-кодом: ${result.status}`)
            }
        } catch (err) {
            throw err
        }
    }
}

module.exports = SmsService