
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
        exec: () => exec('bold')
    },
    'i': {
        icon: `<i>I</i>`,
        exec: () => exec('italic')
    },
    'u': {
        icon: `<u>U</u>`,
        exec: () => exec('underline')
    },
    's': {
        icon: `<s>S</s>`,
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

    // 构建工具栏
    let tools = document.createElement('div');
    tools.classList.add(defaultClasses.actionbar)
    if(!arg.tool || Object.prototype.toString.call(arg.tool).slice(-6,-1) !== 'Array') {
        arg.tool = Object.keys(actionbar);
    }

    arg.tool.forEach((type) => {
        let actionType = actionbar[type]
        if(actionType) {
            let button = document.createElement('button')
            button.classList.add(defaultClasses.button)
            button.innerHTML = actionType.icon
            button.onclick = () => actionType.exec() && content.focus()
            tools.appendChild(button);
        }
    })
    // 构建可编辑区
    let content = document.createElement('div')
    content.classList.add(defaultClasses.content)
    content.contentEditable = true

    // 合并工具栏和可编辑区
    arg.ele.classList.add('oct')
    arg.ele.appendChild(tools)
    arg.ele.appendChild(content)

}

export default { exec, init }