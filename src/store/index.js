import { createStore } from "vuex";
import AuthService from '../services/AuthService'
import axios from "axios";
import { API_URL } from "../http";
export default createStore({
    state:{
        user: {},
        isAuth: false,
        isLoadingCheck: false
    },
    getters:{

    },
    mutations:{
        setAuth(state, bool){
            state.isAuth = bool
        },
        setLoadingCheck(state, bool){
            state.isLoadingCheck = bool
        },
        setUser(state, user){
            state.user = user
        }
    },
    actions:{
        async login({state, commit}, inputs){
            try {
                const response = await AuthService.login(inputs.email, inputs.password)
                localStorage.setItem('token', response.data.accessToken)
                commit('setAuth', true)
                commit('setUser', response.data.user)
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        },
        async registration({state, commit}, inputs){
            try {
                const response = await AuthService.register(inputs.email, inputs.password)
                localStorage.setItem('token', response.data.accessToken)
                commit('setAuth', true)
                commit('setUser', response.data.user)
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        },
        async logout({state, commit}){
            try {
                const response = await AuthService.logout()
                localStorage.removeItem('token')
                commit('setAuth', false)
                commit('setUser', {})
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        },
        async checkAuth({state, commit}){
            commit('setLoadingCheck', true)
            try {
                const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
                localStorage.setItem('token', response.data.accessToken)
                commit('setAuth', true)
                commit('setUser', response.data.user)
            } catch (error) {
                console.log(error.response?.data?.message);
            } finally{
                commit('setLoadingCheck', false)
            }
        }
    },
})