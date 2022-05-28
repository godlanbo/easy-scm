interface RoomInfo {
  id: string
  cover?: string
  owner: string
  ownerId: string
  membersNum: number
  projectsNum: number
  createDate: string
  desc: string
  isCollect: boolean
}

interface ProjectInfo {
  id: number
  owner: string // 所属人name
  ownerId: string
  updateDate: string
  createDate: string
  name: string
  desc: string
  isCollect: boolean
  version: string
  cover?: string
  repoUrl: string
  triggerBranch: string // 触发分支
  autoTrigger: boolean // 是否自动触发
  buildEnv: string
  buildFile: string
  resDir: string
  repoName: string
}

interface BuildSetting {
  baseDirectory: string
  // buildDepInitCommand: string
  buildFile: string
  // buildCommand: string
  buildEnvironment: string
}

declare enum BuildStatus {
  'Success' = 0,
  'Failed' = 1,
  'Canceled' = 2,
  'Loading' = 3,
}

interface RepoItem {
  id: number
  repoUrl: string
  repoName: string
  repoFullName: string
}

interface BuildInfo {
  id: string
  buildBy: string // 触发人id
  buildByName: string // 触发人name
  belongProject: string // 属于哪个项目id
  belongProjectName: string
  belongRoom: string // 属于哪个空间id
  createDate: string
  status:
    | BuildStatus.Success
    | BuildStatus.Failed
    | BuildStatus.Canceled
    | BuildStatus.Loading
  buildBranch: string // 构建分支
  buildVersion: string
}

interface MemberInfo {
  id: string
  name: string
  eamil: string
  avatar: string
}

interface User {
  id: string
  name: string
  eamil: string
  avatar: string
}

interface ExploreRoomItem extends RoomInfo {
  type: 'room'
}

interface ExploreProjectItem extends ProjectInfo {
  type: 'project'
}

type ExploreItem = ExploreProjectItem | ExploreRoomItem

type ExploreType = 'room' | 'project'
type ExploreFilterType = 'all' | 'collected'

interface GithubRepoItem {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  html_url: string
  description: string
  visibility: string
  default_branch: string
  owner: {
    login: string
  }
}

interface GithubRepoBranchItem {
  name: string
  commit: {
    sha: string
    url: string
  }
  protected: boolean
}

interface RawProjectInfo {
  name: string
  desc: string
  cover?: string
  repoUrl: string
  triggerBranch: string
  autoTrigger: boolean
  buildEnv: string
  resDir: string
  buildFile: string
  repoName: string
}
