import { defineStore } from 'pinia'
import { Router, RouteRecordRaw, useRouter } from 'vue-router'
import {
  getProjectInfo,
  getRoomInfo,
  getRoomProjectList,
  getUserInfo,
} from '../api'
import { BUILD_STATUS, getUserCache, setUserCache } from '../utils'
// import { projectBuildTabRoutes, projectTabRouters, roomTabRouters } from '../router'
export const useOwnerStore = defineStore('owner', {
  state: () => {
    return { currentOwner: 'godlanbo' }
  },

  actions: {
    setOwner(owner: string) {
      this.currentOwner = owner
    },
  },
})

export const useUserStore = defineStore('user', {
  state(): {
    userInfo: User | null
    // userId: string
  } {
    return {
      userInfo: null,
      // userId: '',
    }
  },
  actions: {
    async registerUser() {
      const userInfoCache = getUserCache()
      if (!this.userInfo) {
        if (userInfoCache) {
          this.userInfo = userInfoCache
        } else {
          const userInfoRes = await getUserInfo()
          this.userInfo = userInfoRes.data
          setUserCache(this.userInfo)
        }
      }
    },
  },
})

export const useRoomStore = defineStore('room', {
  state(): {
    roomInfo: RoomInfo | null
  } {
    return {
      roomInfo: null,
    }
  },
  actions: {
    async checkRoomExist() {
      const resRoomInfo = await getRoomInfo()
      this.initRoomInfo(resRoomInfo.data)
    },
    initRoomInfo(roomInfo: RoomInfo) {
      this.roomInfo = roomInfo
    },
  },
})

export const useProjectStore = defineStore('project', {
  state: (): {
    currentProjectInfo: ProjectInfo | null
    currentRoomProjectList: ProjectInfo[]
  } => {
    return {
      currentProjectInfo: null,
      currentRoomProjectList: [],
    }
  },
  actions: {
    setCurrentProject(project: ProjectInfo) {
      this.currentProjectInfo = project
    },
    async getRoomProjectList() {
      const roomProjectListRes = await getRoomProjectList()
      this.currentRoomProjectList = roomProjectListRes.data
    },
    async refreshProjectInfo(projectId: number) {
      const rawProjectRes = await getProjectInfo(projectId)
      this.setCurrentProject(rawProjectRes.data)
    },
  },
})

export const useBuildStore = defineStore('build', {
  state: (): {
    buildList: BuildInfo[]
  } => {
    return {
      buildList: [
        {
          status: BUILD_STATUS.Failed,
          id: '12',
          buildBy: 'godlanbo',
          buildByName: 'godlanbo',
          belongRoom: '10',
          belongProject: '12',
          buildBranch: 'master',
          createDate: '1651752179061',
          belongProjectName: 'testProejctName',
          buildVersion: '1.4.0',
        },
        {
          status: BUILD_STATUS.Success,
          id: '13',
          buildBy: 'godlanbo',
          buildByName: 'godlanbo',
          belongRoom: '10',
          belongProject: '12',
          buildBranch: 'master',
          createDate: '1651752179061',
          belongProjectName: 'testProejctName',
          buildVersion: '1.4.1',
        },
        {
          status: BUILD_STATUS.Canceled,
          id: '14',
          buildBy: 'godlanbo',
          buildByName: 'godlanbo',
          belongRoom: '10',
          belongProject: '12',
          buildBranch: 'master',
          createDate: '1651752179061',
          belongProjectName: 'testProejctName',
          buildVersion: '1.4.2',
        },
        {
          status: BUILD_STATUS.Canceled,
          id: '15',
          buildBy: 'godlanbo',
          buildByName: 'godlanbo',
          belongRoom: '10',
          belongProject: '12',
          buildBranch: 'master',
          createDate: '1651752179061',
          belongProjectName: 'testProejctName',
          buildVersion: '1.4.3',
        },
        {
          status: BUILD_STATUS.Canceled,
          id: '16',
          buildBy: 'godlanbo',
          buildByName: 'godlanbo',
          belongRoom: '10',
          belongProject: '12',
          buildBranch: 'master',
          createDate: '1651752179061',
          belongProjectName: 'testProejctName',
          buildVersion: '1.4.4',
        },
      ],
    }
  },
  getters: {
    getCurrentBuildItem(state) {
      return (buildId: string) =>
        state.buildList.find(buildItem => buildItem.id === buildId)
    },
  },
})
