<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initStartTypeit } from '../utils'
import PreviewCode from '../components/PreviewCode.vue'
import { CODE_PREVIEW } from '../utils/constant'
import Logo from '../components/Logo.vue'
import { IconRight } from '@arco-design/web-vue/es/icon'

const typeitWrapper = ref<HTMLElement | null>(null)
const isTypeitComplete = ref(false)
onMounted(() => {
  typeitWrapper.value && initStartTypeit(typeitWrapper.value, isTypeitComplete)
})
</script>
<template>
  <div class="login-container overflow-hidden flex w-screen h-screen relative">
    <div class="introduce-container text-white px-14 pt-32">
      <div class="logo-line text-6xl font-black mb-8">
        <span class="icon-fire"></span>
        <span class="logo-text">Easy Scm</span>
      </div>

      <p
        ref="typeitWrapper"
        class="text-4xl font-extrabold introduce-content leading-normal mb-8"
      ></p>
      <a-button
        :class="{
          active: isTypeitComplete,
        }"
        class="start-btn"
        size="large"
        type="primary"
        >开始体验
        <icon-right />
      </a-button>
    </div>
    <div
      class="login-content-container bg-gradient-to-b from-white to-slate-100 relative"
    >
      <Logo class="pt-8 pl-8"></Logo>
      <div
        class="code-area-wrapper flex flex-col h-[35em] absolute shadow-2xl p-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-2xl"
      >
        <div
          class="code-area-header border-b border-solid border-slate-500/30 flex items-center px-3 space-x-2 relative w-full"
        >
          <div class="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
          <div class="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
          <div class="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
        </div>
        <PreviewCode class="flex-1" :code="CODE_PREVIEW"></PreviewCode>
        <div>
          <div
            class="code-button flex items-center justify-center bg-white -left-8 top-1/3"
          >
            <img
              class="code-button-img webpack object-contain w-4/5"
              src="../assets/images/Webpack.svg"
              alt="webpack"
            />
          </div>
          <div
            class="code-button flex items-center justify-center bg-white -bottom-8 left-[15%]"
          >
            <img
              class="code-button-img vue object-contain w-4/5 pt-4"
              src="../assets/images/Vue.svg"
              alt="vue"
            />
          </div>
          <div
            class="code-button flex items-center justify-center bg-white -top-8 left-1/3"
          >
            <img
              class="code-button-img react object-contain w-4/5"
              src="../assets/images/react.svg"
              alt="react"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../style/mixin.scss';
.login-container {
  background-image: url(../assets/images/login-bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  .login-content-container {
    flex: 1;
    .code-area-wrapper {
      // width: 155%;
      left: -10%;
      top: 20%;
      // box-shadow: 20px 20px 40px #1e1f1b, -20px -20px 40px #303129;

      .code-area-header {
        height: 30px;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        background-color: #272822;
      }
      .code-button {
        position: absolute;
        height: 100px;
        width: 100px;
        border-radius: 50%;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2);
        animation: floatInto 0.5s ease-in-out backwards;
        transition: transform 0.3s ease-in-out;
        @for $i from 1 through 3 {
          &:nth-child(#{$i}) {
            animation-delay: $i * 0.3s;
          }
        }
        &:hover {
          transform: scale(1.1);
          transform-origin: center;
        }
      }
    }
  }
  .introduce-container {
    flex: 0 1 55%;
    .introduce-content {
      // min-height: 25rem;
    }
    .logo-line {
      animation: floatInto 0.5s ease-in-out backwards;
    }
    .start-btn {
      opacity: 0;
      transition: all 0.4s ease-in-out;
      transform: translateY(100%);
      &.active {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
