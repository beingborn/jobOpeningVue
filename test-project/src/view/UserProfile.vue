<template>
    <div>
        <h1>UserProfile</h1>
    </div>
</template>
<script setup>
    import supabase from '../supabase';
    
    // LifeCycle Hook
    import { onMounted } from 'vue';

    // 마운트시 로그인 상태 확인
    onMounted(async()=> {
        // 로그인 하지 않은 경우 Null 반환
        const { data: {user} } = await supabase.auth.getUser()

        if (user) {
            console.log('로그인')
        } else {
            console.log('로그아웃')
        }
    })

</script>
<style lang="sass">
    
</style>