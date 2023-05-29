<template lang="">
    <div class="h-screen flex">
        <div v-if="!$store.state.isLoadingCheck" class="mx-auto w-2/5 bg-slate-500 rounded-xl pb-12 self-center">
            <div class="text-center mb-5">
                <div class="text-900 text-3xl font-medium pt-7 mb-5">Авторизация</div>
                <!-- <span class="text-600 font-medium line-height-3">Нет аккаунта?</span>
                <span class="font-medium no-underline ml-2 text-blue-700 cursor-pointer">
                    Зарегистрироваться
                </span> -->
            </div>


            <div class="text-center">
                <label for="email" class="block text-900 font-medium mb-2">
                Почта
                </label>
                <input
                id="email"
                type="text"
                class="pl-1 mb-3 w-1/2 rounded-md bg-white outline-none text-black pb-1"
                v-model="email"
                />
                <label for="password" class="block text-900 font-medium mb-2">
                Пароль
                </label>
                <input
                id="password"
                type="password"
                class="pl-1 mb-7 w-1/2 rounded-md bg-white outline-none text-black pb-1"
                v-model="password"
                />

                <div class="flex align-items-center justify-content-between mb-6">
                <span class="mx-auto font-medium no-underline text-blue-700 cursor-pointer">
                    Забыли пароль?
                </span>
                </div>
                <button class="w-48 mt-6" @click="handleLogin">Войти</button>
                <br>
                <button class="w-48 mt-6 text-center" @click="handleRegistration">Зарегистрироваться</button>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../store';

    export default{
        data() {
            return {
                email: '',
                password: '',
                isRegistered: false
            }
        },
        methods: {
            handleLogin(){
                store.dispatch('login', {email: this.email, password: this.password}).then(() => {
                    if(store.state.isAuth){
                        this.$router.push('main')
                    }
                })
            },
            handleRegistration(){
                store.dispatch('registration', {email: this.email, password: this.password}).then(() => {
                    if(store.state.isAuth){
                        alert('Пользователь зарегистрирован, перейдите по ссылке, отправленной вам на почту для подтверждения')
                        this.$router.push('main')
                    }
                })
            }
        },
        mounted() {
            if(localStorage.getItem('token')){
                store.dispatch('checkAuth').then(() => {
                    if(store.state.isAuth){
                        this.$router.push('main')
                    }
                })
            }
        },
    }
</script>