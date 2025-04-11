<template>
    <section v-if="isLogin">
        <figure>
            <img src="https://placehold.co/640x360" alt="head image">
        </figure>
        <!-- 
            v-if post를 해주지 않으면 DOM이 먼저 그려지기 때문에
            reference 참조 오류가 뜨는 듯하다.
        -->

        <!-- 상세정보 -->
        <div class="container" v-if="post">
            <h2>{{post.title}}</h2>
            <p class="top_info">
                {{post.company_name}}
                <span>&middot;</span>
                {{post.location}}
            </p>
            <!-- toLocaleString() :: 자바스크립트 천단위 표시 -->
            <p class="pay">{{post.pay_rule}} : <b>{{post.pay.toLocaleString()}}원</b></p>
            <textarea class="desc" rows="8" disabled :value="post.desc"></textarea>
        </div>
        <!-- 하단 고정 버튼 -->
        <div class="bottom-btn-group" v-if="post && post.author === user.id">
            <router-link :to="`/job-post-update/${post.id}`" class="btn-tel">수정</router-link>
            <button @click="handleDelete" class="btn-apply">삭제</button>
        </div>
        <div class="bottom-btn-group" v-else-if="post">
            <!-- tel : href로 연결 시 전화로 자동 연결 -->
            <a :href="`tel:${post.tel}`" class="btn-tel">전화문의</a>
            <button @click="handleApply" class="btn-apply">지원하기</button>
        </div>
    </section>
</template>
<script setup>
    import supabase from '../supabase';
    import {useRoute, useRouter} from 'vue-router'
    import {useAuth} from '../auth/auth.js'
    import { ref, onMounted } from 'vue';
    
    const {isLogin, user, checkLoginStatus} = useAuth();
    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;
    const post = ref(null);

    onMounted( async() => {
        await checkLoginStatus();

        if (user.value){
            const { data, error } = await supabase
            .from('job_posts')
            .select()
            .eq('id', id)
            .single()

            // single == 데이터를 배열이 아닌 하나의 객체로 받음
            post.value = data;

            if (error) {
                console.log("데이터없음");
            } else {
                console.log(data)
            }
        }
    })

    const handleApply = async() => {
        // 유저 데이터에서 이름 전화 번호 가져오기
        const { data, error } = await supabase
        .from('job_posts')
        .select()
        .eq('id', id)
        .single()


        // 지원내역 저장
        // const { error } = await supabase.from('job_apply_list')


        // 지원 저장 시 글목록 이동
    }


    const handleDelete = async() => {
        const conf = confirm('정말 삭제하시겠습니까?')

        if (!conf) return;

        const { error } = await supabase
        .from('job_posts')
        .delete()
        .eq('id', id)

        if (error) {
            console.log(error.message)
        } else {
            alert('삭제가 완료되었습니다.')
            router.push('/job-list')
        }
    }
</script>
<style lang="scss" scoped>
    figure {
    aspect-ratio: 16 / 9;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    h2 {
        font-size: 16px;
        margin-bottom: 5px;
    }

    .top_info {
        font-size: 12px;
        color: #666;
        margin-bottom: 16px;
    }

    .pay {
        font-size: 14px;
        font-weight: bold;
        color: #444;
        padding: 10px 0;
        margin-bottom: 16px;
    }

    .desc {
        width: 100%;
        padding: 0px;
        border: none;
        line-height: 22px;
        margin-bottom: 10px;
        outline: none;
        background: #fff;
    }

    .bottom-btn-group {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
    
        button, .btn-tel {
            width: 50%;
            border-radius: 0;
            padding-top: 14px;
            padding-bottom: 14px;
            margin: 0;
            cursor: pointer;
            color: #fff;
            text-align: center;
            font-size: 15px;
        }
    
        .btn-tel {
            background-color: var(--main-color-dark);
        }
    
        .btn-apply {
            background-color: var(--main-color-light);
        }
    }
</style>