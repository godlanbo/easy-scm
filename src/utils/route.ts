import { computed } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import {
  projectBuildTabRoutes,
  projectTabRouters,
  roomTabRouters,
} from '../router'

export function useRouteJudge() {
  const route = useRoute()
  // 检查路由是否匹配到了Room，判断是否在空间内
  const isInRoom = computed(() =>
    route.matched.some(match => match.name === 'Room'),
  )

  const isInProject = computed(() =>
    route.matched.some(match => match.name === 'Project'),
  )
  const isInBuild = computed(() =>
    route.matched.some(match => match.name === 'ProjectBuild'),
  )
  return { isInRoom, isInProject, isInBuild }
}

// 获取当前Nav应该显示的列表项
export function useNavTabRoutes() {
  const { isInProject, isInRoom, isInBuild } = useRouteJudge()
  console.log(isInProject.value, isInRoom.value, isInBuild.value)
  const res = computed(() => {
    let temp: RouteRecordRaw[] = []
    if (isInRoom.value) {
      temp = roomTabRouters
    }
    if (isInProject.value) {
      temp = projectTabRouters
    }
    if (isInBuild.value) {
      temp = projectBuildTabRoutes
    }

    return temp.filter(item => !item.meta?.hidden)
  })
  return res
}
