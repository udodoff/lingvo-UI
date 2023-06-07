<template lang="">
    <div class="flex flex-col items-center">
        <h1 class="text-green-500 pt-40 text-center">страница авторизованного пользователя <br>{{ user }}</h1>
        <button @click="logout" class="w-48 mt-12">Выйти</button>
        <button @click="fetchUsers" class="w-48 mt-6">Получить<br>пользователей</button>
        <ul class="text-green-500 text-3xl text-center mt-8">
            <li v-for="(user, index) in fetchedUsers" :key="index">{{ user.email }}</li>
        </ul>
    </div>
</template>
<script>
import store from '../store';
import UserService from '../services/UserService'
    export default{
        data() {
            return {
                user: '',
                fetchedUsers: []
            }
        },
        methods: {
            async logout(){
                await store.dispatch('logout')
                this.$router.push('/')
            },
            async fetchUsers(){
                try {
                    if(!store.state.user.isActivated){
                        alert('Подтвердите Email, чтобы сделать это')
                        return 0
                    }
                    const response = await UserService.fetchUsers()
                    this.fetchedUsers = response.data
                } catch (error) {
                    console.log(error);
                }
            }
        },
        mounted() {
            store.dispatch('checkAuth').then(() => {
                if(store.state.isAuth){
                    this.user = store.state.user.email
                }
            })
        },
    }
</script>
