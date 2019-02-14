(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.oct = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
    'b': {
        icon: '<b>B</b>',
        exec: function exec() {
            return _exec('bold');
        }
    },
    'i': {
        icon: '<i>I</i>',
        exec: function exec() {
            return _exec('italic');
        }
    },
    'u': {
        icon: '<u>U</u>',
        exec: function exec() {
            return _exec('underline');
        }
    },
    's': {
        icon: '<s>S</s>',
        exec: function exec() {
            return _exec('strikeThrough');
        }
    },
    'h1': {
        icon: '<b>H<sub>1</sub></b>',
        exec: function exec() {
            return _exec('formatBlock', '<h1>');
        }
    },
    'h2': {
        icon: '<b>H<sub>2</sub></b>',
        exec: function exec() {
            return _exec('formatBlock', '<h2>');
        }
    }
};

var init = function init(arg) {
    // 检查配置
    if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) !== 'object') return;
    if (_typeof(arg.ele) !== 'object') return;

    // 构建工具栏
    var tools = document.createElement('div');
    tools.classList.add(defaultClasses.actionbar);
    if (!arg.tool || Object.prototype.toString.call(arg.tool).slice(-6, -1) !== 'Array') {
        arg.tool = Object.keys(actionbar);
    }

    arg.tool.forEach(function (type) {
        var actionType = actionbar[type];
        if (actionType) {
            var button = document.createElement('button');
            button.classList.add(defaultClasses.button);
            button.innerHTML = actionType.icon;
            button.onclick = function () {
                return actionType.exec() && content.focus();
            };
            tools.appendChild(button);
        }
    });
    // 构建可编辑区
    var content = document.createElement('div');
    content.classList.add(defaultClasses.content);
    content.contentEditable = true;

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
