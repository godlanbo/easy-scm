<script setup lang="ts">
import { computed } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { roomTabRouters, projectTabRouters } from '../../router'
import { useUserStore } from '../../store'
import { useNavTabRoutes, useRouteJudge } from '../../utils'
const globRoute = useRoute()
const userStore = useUserStore()
const currentActiveTabsRouters = useNavTabRoutes()

// function parentRouteMatch(currentRoute: RouteRecordRaw) {}

console.log('nav:', globRoute.params)
</script>
<template>
  <div class="room-container">
    <nav>
      <ul class="flex items-center nav-list">
        <router-link
          v-for="route in currentActiveTabsRouters"
          :key="route.path"
          v-slot="{ isActive, navigate, href }"
          custom
          :to="{
            name: route.meta?.to,
          }"
        >
          <li class="m-1 nav-item">
            <a
              :href="href"
              class="btn-standard nav-item-link font-semibold text-base text-black-default"
              :class="{ active: isActive }"
              @click="navigate"
              >{{ route.meta?.tabName }}</a
            >
          </li>
        </router-link>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.nav-list {
  .nav-item {
    .nav-item-link {
      text-decoration: none;
      &.active {
        text-decoration: underline;
      }
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
