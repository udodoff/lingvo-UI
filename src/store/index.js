import { createStore } from "vuex";
import AuthService from '../services/AuthService'
export default createStore({
    state:{
        user: {},
        isAuth: false
    },
    getters:{

    },
    mutations:{
        setAuth(state, bool){
            state.isAuth = bool
        },
        setUser(state, user){
            state.user = user
        }
    },
    actions:{
        async login({state, commit}, email, password){
            try {
                const response = await AuthService.login(email, password)
                localStorage.setItem('token', response.data.accessToken)
                commit('setAuth', true)
            } catch (error) {
                
            }
        }
    },
})