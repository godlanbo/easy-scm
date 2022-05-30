import axios from 'axios'
import request from '../utils/request'

export function userLogin(userId: string) {
  return request({
    method: 'get',
    params: {
      userId,
    },
    url: '/user/login',
  })
}

export function getUserInfo() {
  return request<User>({
    method: 'get',
    url: `/user`,
  })
}

export function getRoomInfo() {
  return request<RoomInfo>({
    method: 'get',
    url: '/room',
  })
}

export function uploadImage(fileData: FormData) {
  return request<{
    fileName: string
    imgUrl: string
  }>({
    method: 'post',
    url: '/uploadImg',
    data: fileData,
  })
}

export function createRoom(rawRoomInfo: any) {
  return request<RoomInfo>({
    method: 'post',
    url: '/room',
    data: rawRoomInfo,
  })
}

export function getRoomProjectList() {
  return request<ProjectInfo[]>({
    method: 'get',
    url: '/project/list',
  })
}

export function getRepoList() {
  return axios.request<GithubRepoItem[]>({
    method: 'get',
    url: 'https://api.github.com/users/godlanbo/repos',
  })
}

export function getRepoBranchList(ownerId: string, repoName: string) {
  return axios.request<GithubRepoBranchItem[]>({
    method: 'get',
    url: `https://api.github.com/repos/${ownerId}/${repoName}/branches`,
  })
}

export function createProject(projectInfo: RawProjectInfo) {
  return request<{ projectId: number }>({
    method: 'post',
    url: '/project',
    data: projectInfo,
  })
}

export function getProjectInfo(projectId: number) {
  return request<ProjectInfo>({
    method: 'get',
    url: `/project/${projectId}`,
  })
}

export function triggerBuild(projectId: number, triggerBranch: string) {
  return request({
    method: 'post',
    url: '/project/build',
    data: {
      projectId,
      triggerBranch,
    },
  })
}

export function getBuildListByProject(projectId) {
  return request<BuildInfo[]>({
    method: 'get',
    url: '/project/build/list',
    params: {
      projectId,
    },
  })
}

export function getBuildInfo(buildId) {
  return request<BuildInfo>({
    method: 'get',
    url: `/project/build/${buildId}`,
  })
}

export function deleteProject(projectId: number) {
  return request({
    method: 'delete',
    url: `/project/${projectId}`,
  })
}

export function getRoomBuildList(roomId: string) {
  return request<BuildInfo[]>({
    method: 'get',
    url: `/build/list`,
    params: {
      roomId,
    },
  })
}

export function getRoomMemberList(roomId: string) {
  return request<User[]>({
    method: 'get',
    url: '/user/about',
    params: {
      roomId,
    },
  })
}

export function patchProjectTriggerConfig(payload: ProjectInfo) {
  return request({
    method: 'patch',
    url: '/project',
    data: payload,
  })
}
