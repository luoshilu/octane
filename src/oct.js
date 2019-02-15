
const queryCommendState = command => document.queryCommandState(command)

const defaultClasses = {
    actionbar: 'oct-actionbar',
    button: 'oct-button',
    content: 'oct-content',
    selected: 'oct-button-selected'
}

export const exec = (command, value = null) => document.execCommand(command, false, value)

const actionbar = {
    'b': {
        icon: `<b>B</b>`,
        stat: () => queryCommendState('bold'),
        exec: () => exec('bold')
    },
    'i': {
        icon: `<i>I</i>`,
        stat: () => queryCommendState('italic'),
        exec: () => exec('italic')
    },
    'u': {
        icon: `<u>U</u>`,
        stat: () => queryCommendState('underline'),
        exec: () => exec('underline')
    },
    's': {
        icon: `<s>S</s>`,
        stat: () => queryCommendState('strikeThrough'),
        exec: () => exec('strikeThrough')
    },
    'h1': {
        icon: '<b>H<sub>1</sub></b>',
        exec: () => exec('formatBlock', '<h1>')
    },
    'h2': {
        icon: '<b>H<sub>2</sub></b>',
        exec: () => exec('formatBlock', '<h2>')
    }
};

export const init = (arg) => {
    // 检查配置
    if(typeof arg !== 'object') return
    if(typeof arg.ele !== 'object') return

    // 构建可编辑区
    let content = document.createElement('div')
    content.classList.add(defaultClasses.content)
    content.contentEditable = true

    // 构建工具栏
    let tools = document.createElement('div')
    tools.classList.add(defaultClasses.actionbar)
    if(!arg.tool || Object.prototype.toString.call(arg.tool).slice(-6,-1) !== 'Array') {
        arg.tool = Object.keys(actionbar)
    }

    arg.tool.forEach((type) => {
        let actionbarType = actionbar[type]
        if(actionbarType) {
            let button = document.createElement('button')
            button.classList.add(defaultClasses.button)
            button.innerHTML = actionbarType.icon
            button.onclick = () => actionbarType.exec() && content.focus()
            tools.appendChild(button)

            // 记录工具按钮选择状态
            if(actionbarType.stat) {
                let hander = () => button.classList[actionbarType.stat()? 'add':'remove'](defaultClasses.selected)
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