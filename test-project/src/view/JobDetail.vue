<template>
    <div>
        <h1>JobDetail</h1>
        {{ detail }}
    </div>
</template>
<script setup>
    import supabase from '../supabase';
    import {useRoute} from 'vue-router'
    // LifeCycle Hook
    import { ref, onMounted } from 'vue';
        
    const route = useRoute();

    const detail = ref([])

    onMounted( async() => {
        const { data , error } = await supabase
        .from('job_posts')
        .select()
        .eq('id', route.params.id)

        detail.value = data

        if (error) {
            console.log("데이터없음")
        } else {
            console.log(data)
        }
    })
</script>
<style lang="sass">
    
</style>