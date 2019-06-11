const queryCommendState = command => document.queryCommandState(command)
import { exec } from './exec.js'
export const actionbar = {
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
