<template>
    <div>
        <h1>login</h1>
        <div class="form-container">
            <!-- 
            Submit Event => Login() 
            새로고침 막기
            -->
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                    type="email"
                    id="email"
                    placeholder="이메일 입력"
                    required
                    v-model="email"
                    >
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                    type="password"
                    id="password" 
                    placeholder="비밀번호 입력"
                    required
                    v-model="password"
                    >
                </div>
                <button type="submit">로그인</button>
                <router-link to="/signup">회원가입</router-link>
            </form>
        </div>
    </div>
</template>
<script setup>
    // 상태변수
    import {ref} from 'vue';

    const email = ref('');
    const password = ref('');

    const handleLogin = () => {
        console.log(email.value)
        console.log(password.value)
    }

</script>
<style lang="scss">
    @use '../style/form.scss';
</style>