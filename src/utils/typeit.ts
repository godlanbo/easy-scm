import TypeIt from 'typeit'
import { Element } from 'typeit/dist/types'
import { Ref } from 'vue'

export function initStartTypeit(node: HTMLElement, status: Ref<boolean>) {
  new TypeIt(node as Element, {
    speed: 50,
    startDelay: 900,
    afterComplete: () => {
      console.log('typeit is complete')
      status.value = true
    },
  })
    .type('产物冲突？', { delay: 1000 })
    .break()
    .type('本地构建环境复杂？', { delay: 1000 })
    .break()
    .type('现在', { delay: 300 })
    .type('立刻', { delay: 300 })
    .type(
      `就让你的打包变得
      <span class="text-teal-500">Easy!!</span>`,
      {
        delay: 500,
      },
    )
    .break()
    .type('方便快捷，立即享受。')
    // .move(-8, { delay: 100 })
    // .type('s', { delay: 400 })
    // .move(null, { to: 'START', instant: true, delay: 300 })
    // .move(1, { delay: 200 })
    // .delete(1)
    // .type('T', { delay: 225 })
    // .pause(200)
    // .move(2, { instant: true })
    // .pause(200)
    // .move(5, { instant: true })
    // .move(5, { delay: 200 })
    // .type('a', { delay: 350 })
    // .move(null, { to: 'END' })
    // .type('le typing utlity')
    // .move(-4, { delay: 150 })
    // .type('i')
    // .move(null, { to: 'END' })
    // .type(' on the <span class="place">internet</span>', { delay: 400 })
    // .delete('.place', { delay: 800, instant: true })
    // .type('<em><strong class="font-semibold">planet.</strong></em>', {
    //   speed: 100,
    // })
    .go()
}
