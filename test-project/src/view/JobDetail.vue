<template>
    <div>
        <h1>JobDetail</h1>
    </div>
</template>
<script setup>
    import supabase from '../supabase';
    import {useRoute} from 'vue-router'
    // LifeCycle Hook
    import { ref, onMounted } from 'vue';
        
    const route = useRoute();

    onMounted( async() => {
        const { data , error } = await supabase
        .from('job_posts')
        .select('id')
        .eq('id', route.params.id)


        if (error) {
            console.log("데이터없음")
        } else {
            console.log(data)
        }
    })
</script>
<style lang="sass">
    
</style>