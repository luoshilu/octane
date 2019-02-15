(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.oct = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var queryCommendState = function queryCommendState(command) {
    return document.queryCommandState(command);
};

var defaultClasses = {
    actionbar: 'oct-actionbar',
    button: 'oct-button',
    content: 'oct-content',
    selected: 'oct-button-selected'
};

var _exec = function _exec(command) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return document.execCommand(command, false, value);
};

var actionbar = {
    'bold': {
        icon: '<b>B</b>',
        title: 'bold',
        stat: function stat() {
            return queryCommendState('bold');
        },
        exec: function exec() {
            return _exec('bold');
        }
    },
    'italic': {
        icon: '<i>I</i>',
        title: 'italic',
        stat: function stat() {
            return queryCommendState('italic');
        },
        exec: function exec() {
            return _exec('italic');
        }
    },
    'underline': {
        icon: '<u>U</u>',
        title: 'underline',
        stat: function stat() {
            return queryCommendState('underline');
        },
        exec: function exec() {
            return _exec('underline');
        }
    },
    'strike': {
        icon: '<s>S</s>',
        title: 'strike',
        stat: function stat() {
            return queryCommendState('strikeThrough');
        },
        exec: function exec() {
            return _exec('strikeThrough');
        }
    },
    'left': {
        icon: '&#x21e4;',
        title: 'left',
        stat: function stat() {
            return queryCommendState('justifyLeft');
        },
        exec: function exec() {
            return _exec('justifyLeft');
        }
    },
    'center': {
        icon: '&#120675;',
        title: 'center',
        stat: function stat() {
            return queryCommendState('justifyCenter');
        },
        exec: function exec() {
            return _exec('justifyCenter');
        }
    },
    'right': {
        icon: '&#x21e5;',
        title: 'right',
        stat: function stat() {
            return queryCommendState('justifyRight');
        },
        exec: function exec() {
            return _exec('justifyRight');
        }
    },
    'h1': {
        icon: '<b>H<sub>1</sub></b>',
        title: 'h1',
        exec: function exec() {
            return _exec('formatBlock', '<h1>');
        }
    },
    'h2': {
        icon: '<b>H<sub>2</sub></b>',
        title: 'h2',
        exec: function exec() {
            return _exec('formatBlock', '<h2>');
        }
    },
    'olist': {
        icon: '&#35;',
        title: 'olist',
        exec: function exec() {
            return _exec('insertOrderedList');
        }
    },
    'ulist': {
        icon: '&#8226;',
        title: 'ulist',
        exec: function exec() {
            return _exec('insertUnorderedList');
        }
    },
    'code': {
        icon: '&lt;/&gt;',
        title: 'code',
        exec: function exec() {
            return _exec('formatBlock', '<pre>');
        }
    },
    'link': {
        icon: '&#128279;',
        title: 'link',
        exec: function exec() {
            var url = window.prompt('Enter the link URL');
            if (url) _exec('createLink', url);
        }
    },
    'image': {
        icon: '&#128247;',
        title: 'image',
        exec: function exec() {
            var url = window.prompt('Enter the image URL');
            if (url) _exec('insertImage', url);
        }
    }
};

var init = function init(arg) {
    // 检查配置
    if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) !== 'object') return;
    if (_typeof(arg.ele) !== 'object') return;

    // 构建可编辑区
    var content = document.createElement('div');
    content.classList.add(defaultClasses.content);
    content.contentEditable = true;

    // 构建工具栏
    var tools = document.createElement('div');
    tools.classList.add(defaultClasses.actionbar);
    if (!arg.tool || Object.prototype.toString.call(arg.tool).slice(-6, -1) !== 'Array') {
        arg.tool = Object.keys(actionbar);
    }

    arg.tool.forEach(function (type) {
        var actionbarType = actionbar[type];
        if (actionbarType) {
            var button = document.createElement('button');
            button.classList.add(defaultClasses.button);
            button.innerHTML = actionbarType.icon;
            button.title = actionbarType.title;
            button.onclick = function () {
                return actionbarType.exec() && content.focus();
            };
            tools.appendChild(button);

            // 记录工具按钮选择状态
            if (actionbarType.stat) {
                var hander = function hander() {
                    return button.classList[actionbarType.stat() ? 'add' : 'remove'](defaultClasses.selected);
                };
                content.addEventListener('keyup', hander);
                content.addEventListener('mouseup', hander);
                button.addEventListener('click', hander);
            }
        }
    });

    // 合并工具栏和可编辑区
    arg.ele.classList.add('oct');
    arg.ele.appendChild(tools);
    arg.ele.appendChild(content);
};

var oct = { exec: _exec, init: init };

exports.exec = _exec;
exports.init = init;
exports['default'] = oct;

Object.defineProperty(exports, '__esModule', { value: true });

})));
