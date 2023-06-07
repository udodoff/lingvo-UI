import $api from "../http/index"

export default class AuthService{
    static async login(email, password){
        return await $api.post('/login', {email, password})
    }
    static async register(email, password){
        return await $api.post('/register', {email, password})
    }
    static async logout(email, password){
        return await $api.post('/logout', {email, password})
    }
}