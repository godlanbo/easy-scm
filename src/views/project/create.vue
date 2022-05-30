<script setup lang="ts">
import { IconGithub } from '@arco-design/web-vue/es/icon'
import { reactive, ref, watchEffect } from 'vue'
import {
  createProject,
  getRepoBranchList,
  getRepoList,
  triggerBuild,
} from '../../api'
import { useUserStore } from '../../store'
import UploadImage from '../../components/UploadImage.vue'
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon'
import { BUILD_ENV_LIST } from '../../utils'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'

const userStore = useUserStore()
const router = useRouter()
const repoList = ref<GithubRepoItem[]>([])
const triggerBranch = ref('')
const repoBranchList = ref<GithubRepoBranchItem[]>([])
const rawProjectInfo = reactive<RawProjectInfo>({
  name: '',
  desc: '',
  cover: '',
  repoUrl: '',
  triggerBranch: '',
  autoTrigger: true,
  buildEnv: '',
  resDir: 'dist',
  buildFile: 'build.sh',
  repoName: '',
})
const newProjectId = ref(-1)
watchEffect(async () => {
  const githubRepoListRes = await getRepoList()
  repoList.value = githubRepoListRes.data
})

const currentStep = ref(1)
const chooseRepo = ref<GithubRepoItem>()
function handleImageUpload(imgSrc: string) {
  rawProjectInfo.cover = imgSrc
}
async function handleTriggerBuild() {
  if (triggerBranch.value.length === 0) {
    Message.error('构建分支为必填')
  }
  await triggerBuild(newProjectId.value, triggerBranch.value)
  router.push({
    name: 'ProjectOverview',
    params: {
      projectId: newProjectId.value,
    },
  })
}
async function handleCreateProject() {
  const craeteProjectRes = await createProject(rawProjectInfo)
  console.log('after crate', craeteProjectRes)
  newProjectId.value = craeteProjectRes.data.projectId
  currentStep.value++
}
async function handleChooseRepo(repoItem: GithubRepoItem) {
  console.log(repoItem)
  currentStep.value++
  chooseRepo.value = repoItem

  rawProjectInfo.name = repoItem.name
  rawProjectInfo.desc = repoItem.description
  rawProjectInfo.repoUrl = repoItem.html_url
  rawProjectInfo.triggerBranch = repoItem.default_branch
  rawProjectInfo.repoName = repoItem.name
  const githubRepoBranchListRes = await getRepoBranchList(
    repoItem.owner.login,
    repoItem.name,
  )
  repoBranchList.value = githubRepoBranchListRes.data
}
function handleSelectBuildEnv(envTag) {
  // console.log(envName)
  rawProjectInfo.buildEnv = envTag
}
</script>
<template>
  <div class="craete-container card">
    <section class="main-content mx-auto py-8 w-1/2 flex flex-col">
      <header class="header text-3xl font-extrabold text-black-default mb-8">
        从已有的Git仓库中导入项目
      </header>
      <div class="steps mb-16">
        <a-steps :current="currentStep" label-placement="vertical">
          <a-step>1.选择一个仓库</a-step>
          <a-step>2.项目配置</a-step>
          <a-step>3.开始构建！</a-step>
        </a-steps>
      </div>
      <main v-show="currentStep === 1" class="step1 flex flex-col flex-grow">
        <div class="desc mb-6">
          <div class="title text-2xl font-extrabold text-black-default mb-2">
            从GitHub选择一个存储库
          </div>
          <div class="title-content text-base text-gray-600">
            选择要链接到EasyScm上的项目的存储库。当您推送到Git时，我们会在服务器上自动构建。
          </div>
        </div>
        <div class="repo-choose flex flex-col">
          <div class="flex mb-4 border-gray-light border-b border-solid">
            <div class="user-info btn-standard flex-grow-0 flex items-center">
              <div class="avatar mr-2 w-7 h-7">
                <img
                  class="w-full rounded-full object-cover"
                  :src="userStore.userInfo?.avatar"
                  alt="user avatar"
                />
              </div>
              <div class="nickname text-xl font-extrabold text-black-default">
                {{ userStore.userInfo?.name }}
              </div>
            </div>
          </div>
          <div class="repo-list">
            <div
              v-for="repoItem in repoList"
              :key="repoItem.id"
              class="repo-list-item py-4 px-6 cursor-pointer relative flex items-center"
              @click="handleChooseRepo(repoItem)"
            >
              <icon-github size="24" class="mr-4" />
              <div
                class="repo-name text-base font-semibold text-black-default tracking-tight"
              >
                <span class="text-gray-600">{{ userStore.userInfo?.id }}/</span>
                <span>{{ repoItem.name }}</span>
              </div>
              <div class="arrow opacity-[0.38] absolute right-4 font-extrabold">
                <i class="icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </main>
      <main v-show="currentStep === 2" class="step2 flex flex-col flex-grow">
        <div class="desc mb-6">
          <div class="title text-2xl font-extrabold text-black-default mb-2">
            {{ chooseRepo?.full_name }}的项目配置
          </div>
          <div class="title-content text-base text-gray-600">
            使用这些设置，可以更好地控制EasyScm如何构建您的项目。
          </div>
        </div>
        <div class="project-setting mb-6">
          <div class="setting-line flex items-stretch">
            <div class="mr-4 flex-grow flex flex-col">
              <a-textarea
                v-model="rawProjectInfo.desc"
                class="flex-grow"
                placeholder="输入你对于项目的描述"
                allow-clear
                auto-size
              />
            </div>
            <UploadImage
              class="h-40"
              :src="rawProjectInfo.cover"
              @uploaded="handleImageUpload"
            ></UploadImage>
          </div>
          <div class="tip mt-4 text-gray-500">
            <icon-exclamation-circle-fill class="mr-1" />
            <span>描述是必须的，项目的封面可选</span>
          </div>
          <div class="setting-line">
            <div class="input-line mt-6 flex items-center">
              <div class="mask mr-4 whitespace-nowrap">项目名称：</div>
              <a-input
                v-model="rawProjectInfo.name"
                placeholder="项目名称"
                allow-clear
              ></a-input>
            </div>
            <div class="input-line mt-6 flex items-center">
              <div class="mask mr-4 whitespace-nowrap">自动触发配置：</div>
              <div class="mr-4 flex-grow">
                <a-select
                  v-model="rawProjectInfo.triggerBranch"
                  placeholder="Please select auto trigger branch"
                >
                  <a-option
                    v-for="branch in repoBranchList"
                    :key="branch.commit.sha"
                    >{{ branch.name }}</a-option
                  >
                </a-select>
              </div>
              <a-switch v-model="rawProjectInfo.autoTrigger" />
            </div>
            <div class="input-line mt-6 flex items-center">
              <div class="mask mr-4 whitespace-nowrap">构建环境配置：</div>
              <div class="flex-grow">
                <a-select
                  placeholder="Please select auto trigger branch"
                  @change="handleSelectBuildEnv"
                >
                  <template #label="{ data }">
                    <span class="flex items-center">
                      <span
                        class="icon-node-js mr-1 text-base text-green-nodejs"
                      ></span
                      >{{ data?.label }}</span
                    >
                  </template>
                  <a-option
                    v-for="(env, index) in BUILD_ENV_LIST"
                    :key="index"
                    :value="env.imageTag"
                    >{{ env.name }}</a-option
                  >
                </a-select>
              </div>
            </div>
            <div class="input-line mt-6 flex items-center">
              <div class="mask mr-4 whitespace-nowrap">构建脚本：</div>
              <a-input
                v-model="rawProjectInfo.buildFile"
                placeholder="构建脚本"
                allow-clear
              ></a-input>
            </div>
            <div class="input-line mt-6 flex items-center">
              <div class="mask mr-4 whitespace-nowrap">产物目录：</div>
              <a-input
                v-model="rawProjectInfo.resDir"
                placeholder="产物目录"
                allow-clear
              ></a-input>
            </div>
          </div>
        </div>
        <footer class="flex">
          <a-button type="primary" class="mr-4" @click="currentStep = 1"
            >上一步</a-button
          >
          <a-button type="primary" status="success" @click="handleCreateProject"
            >完成配置</a-button
          >
        </footer>
      </main>
      <main v-show="currentStep === 3" class="step3 flex flex-col flex-grow">
        <div class="desc mb-6">
          <div class="title text-2xl font-extrabold text-black-default mb-2">
            立即开始构建吧
          </div>
          <div class="title-content text-base text-gray-600">
            项目已经创建好了，立即选择分支进行第一次构建吧！
          </div>
        </div>
        <div class="branch-choose flex">
          <div class="mr-4 flex-grow">
            <a-select
              v-model="triggerBranch"
              placeholder="Please select trigger branch"
            >
              <a-option
                v-for="branch in repoBranchList"
                :key="branch.commit.sha"
                >{{ branch.name }}</a-option
              >
            </a-select>
          </div>
        </div>
        <div></div>
        <footer class="mt-6">
          <a-button type="primary" @click="handleTriggerBuild"
            >触发构建</a-button
          >
        </footer>
      </main>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.repo-list-item {
  &:nth-child(even) {
    &::before {
      @apply bg-gray-900/[0.02];
    }
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    pointer-events: none;
  }
  &:hover {
    &::before {
      @apply bg-gray-900/[0.03];
    }
  }

  &:hover {
    .arrow {
      opacity: 1;
    }
  }
}
</style>
