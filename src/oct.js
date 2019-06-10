
const queryCommendState = command => document.queryCommandState(command)

const defaultClasses = {
  actionbar: 'oct-actionbar',
  button: 'oct-button',
  content: 'oct-content',
  selected: 'oct-button-selected',
}

export const exec = (command, value = null) => document.execCommand(command, false, value)

const actionbar = {
  'bold': {
    icon: `<b>B</b>`,
    title: 'bold',
    stat: () => queryCommendState('bold'),
    exec: () => exec('bold'),
  },
  'italic': {
    icon: `<i>I</i>`,
    title: 'italic',
    stat: () => queryCommendState('italic'),
    exec: () => exec('italic'),
  },
  'underline': {
    icon: `<u>U</u>`,
    title: 'underline',
    stat: () => queryCommendState('underline'),
    exec: () => exec('underline'),
  },
  'strike': {
    icon: `<s>S</s>`,
    title: 'strike',
    stat: () => queryCommendState('strikeThrough'),
    exec: () => exec('strikeThrough'),
  },
  'left': {
    icon: '&#x21e4;',
    title: 'left',
    stat: () => queryCommendState('justifyLeft'),
    exec: () => exec('justifyLeft'),
  },
  'center': {
    icon: '&#120675;',
    title: 'center',
    stat: () => queryCommendState('justifyCenter'),
    exec: () => exec('justifyCenter'),
  },
  'right': {
    icon: '&#x21e5;',
    title: 'right',
    stat: () => queryCommendState('justifyRight'),
    exec: () => exec('justifyRight'),
  },
  'h1': {
    icon: '<b>H<sub>1</sub></b>',
    title: 'h1',
    exec: () => exec('formatBlock', '<h1>'),
  },
  'h2': {
    icon: '<b>H<sub>2</sub></b>',
    title: 'h2',
    exec: () => exec('formatBlock', '<h2>'),
  },
  'olist': {
    icon: '&#35;',
    title: 'olist',
    exec: () => exec('insertOrderedList'),
  },
  'ulist': {
    icon: '&#8226;',
    title: 'ulist',
    exec: () => exec('insertUnorderedList'),
  },
  'code': {
    icon: '&lt;/&gt;',
    title: 'code',
    exec: () => exec('formatBlock', '<pre>'),
  },
  'link': {
    icon: '&#128279;',
    title: 'link',
    exec: () => {
      const url = window.prompt('Enter the link URL')
      if (url) exec('createLink', url)
    },
  },
  'image': {
    icon: '&#128247;',
    title: 'image',
    exec: () => {
      const url = window.prompt('Enter the image URL')
      if (url) exec('insertImage', url)
    },
  },
}

export const init = arg => {
  // 检查配置
  if (typeof arg !== 'object') return
  if (typeof arg.ele !== 'object') return

  // 构建可编辑区
  const content = document.createElement('div')
  content.classList.add(defaultClasses.content)
  content.contentEditable = true

  // 构建工具栏
  const tools = document.createElement('div')
  tools.classList.add(defaultClasses.actionbar)
  if (!arg.tool || Object.prototype.toString.call(arg.tool).slice(-6, -1) !== 'Array') {
    arg.tool = Object.keys(actionbar)
  }

  arg.tool.forEach(type => {
    const actionbarType = actionbar[type]
    if (actionbarType) {
      const button = document.createElement('button')
      button.classList.add(defaultClasses.button)
      button.innerHTML = actionbarType.icon
      button.title = actionbarType.title
      button.onclick = () => actionbarType.exec() && content.focus()
      tools.appendChild(button)

      // 记录工具按钮选择状态
      if (actionbarType.stat) {
        const hander = () => button.classList[actionbarType.stat() ? 'add' : 'remove'](defaultClasses.selected)
        content.addEventListener('keyup', hander)
        content.addEventListener('mouseup', hander)
        button.addEventListener('click', hander)
      }
    }
  })

  // 合并工具栏和可编辑区
  arg.ele.classList.add('oct')
  arg.ele.appendChild(tools)
  arg.ele.appendChild(content)
}

export default { exec, init }
