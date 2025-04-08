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
            <button class="btn-tel">수정</button>
            <button class="btn-apply">삭제</button>
        </div>
        <div class="bottom-btn-group" v-else>
            <button class="btn-tel">전화문의</button>
            <button class="btn-apply">지원하기</button>
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
</script>
<style lang="scss">
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
    
        button {
            width: 50%;
            border-radius: 0;
            padding-top: 14px;
            padding-bottom: 14px;
            margin: 0;
            cursor: pointer;
        }
    
        .btn-tel {
            background-color: var(--main-color-dark);
        }
    
        .btn-apply {
            background-color: var(--main-color-light);
        }
    }
</style>