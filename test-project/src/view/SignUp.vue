<template>
    <div>
        <div class="loading-info" v-if="isLoading === true">
            <p>회원가입 처리중...</p>
        </div>
        <h1>SignUp</h1>
        <div class="form-container">
            <form @submit.prevent="handleSignup">
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
                <div class="form-group">
                    <label for="tel">Phone</label>
                    <input 
                    type="tel"
                    id="tel" 
                    placeholder="010-1234-5678"
                    required
                    v-model="tel"
                    >
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input 
                    type="text"
                    id="name" 
                    placeholder="이름 입력"
                    required
                    v-model="name"
                    >
                </div>
                <div class="form-group">
                    <label for="addr">Address</label>
                    <input 
                    type="text"
                    id="addr" 
                    placeholder="주소 입력"
                    required
                    v-model="addr"
                    >
                </div>
                <div class="form-group">
                    <label for="text">자기소개</label>
                    <textarea id="text" v-model="text">

                    </textarea>
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    </div>
</template>
<script setup>
    import {useRouter} from 'vue-router';
    import {ref} from 'vue';
    import supabase from '../supabase';

    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const tel = ref('');
    const text = ref('');
    const name = ref('');
    const addr = ref('');
    const isLoading = ref(false);

    const handleSignup = async () => {

        isLoading.value = true; // 서버 요청 시작

        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        })

        if (error){
            alert(error.message)
        } else {
            console.log('회원가입 성공')

            /**
             * 회원가입 완료 시 해당 데이터베이스 테이블값과 연결된
             * user_table에 데이터 할당
             */
            const { error } = await supabase
                .from('user_table')
                .insert({
                    tel : tel.value,
                    text : text.value,
                    name : name.value,
                    address : addr.value
                })

                if (error) {
                    isLoading.value = false;

                    alert(error.message)
                } else {
                    isLoading.value = false; // 서버 요청 완료
                    alert('회원가입 성공')
                    router.push('/');
                }
        }
    }



</script>
<style lang="scss">
    @use '../style/form.scss';

    .loading-info {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.7);
        color: #fff;
        display: grid;
        place-items: center;
    }
</style>