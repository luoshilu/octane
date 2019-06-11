<template>
  <div class="oct">
    <!-- tool -->
    <div :class="defaultClasses.actionbar" v-if="actionbarKeys.length > 0">
      <button
        v-for="key in actionbarKeys"
        :ref="key"
        v-bind:key="key"
        :class="defaultClasses.button"
        :title="actionbar[key].title"
        v-html="actionbar[key].icon"
        @click="hander(actionbar[key], $event)"
        >
      </button>
    </div>
    <!-- content -->
    <div
      ref="content"
      :class="defaultClasses.content"
      :contentEditable="true"
      @keyup="getvalue"
      @mouseup="getvalue"
      >
    </div>
  </div>
</template>

<script>

import { actionbar } from './util/actionbar.js'
import { defaultClasses } from './util/defaultClasses.js'
import { exec } from './util/exec.js'

export default {
  name: 'octEditor',
  model: {
    prop: 'html',
    event: 'change',
  },
  props: {
    tools: Array,
    html: String,
  },
  data () {
    return {
      actionbar,
      defaultClasses,
    }
  },
  methods: {
    hander: function(actionbarType, evt) {
      this.exec(actionbarType)
      if(!actionbarType.stat) return
      this.buttonStatus(actionbarType, evt.currentTarget)
      this.getvalue()
    },
    exec: function(actionbarType) {
      actionbarType.exec() && this.$refs.content.focus()
    },
    buttonStatus: function(actionbarType, button){
      button.classList[actionbarType.stat() ? 'add' : 'remove'](this.defaultClasses.selected)
    },
    getvalue: function(){
      this.html = this.$refs.content.innerHTML
      this.$emit('change', this.$refs.content.innerHTML)
    }
  },
  computed: {
    actionbarKeys: function(){
      if(this.tools) {
        let tools = this.tools.filter(val => this.actionbar[val])
        if(tools.length < this.tools.length) {
          throw ("tools is error or nothing, please select to something in " + `"bold", "italic", "underline", "strike", "left", "center", "right", "h1", "h2", "olist", "ulist", "code", "link", "image"`)
        }
        return tools
      }
      return Object.keys(this.actionbar)
    }
  },
  mounted() {
    const content = this.$refs.content
    // 操作编辑框时，实时展现当前光标下的按钮状态
    this.actionbarKeys.forEach((type, index) => {
      const actionbarType = actionbar[type]
      const button = this.$refs[type][0]
      if (actionbarType && actionbarType.stat) {
        content.addEventListener('keyup', () => this.buttonStatus(actionbarType, button))
        content.addEventListener('mouseup', () => this.buttonStatus(actionbarType, button))
      }
    })
  },
}
</script>

<style lang="scss">
  $oct-actionbar-color: #FFF !default;
  $oct-border-color: rgba(10, 10, 10, 0.8) !default;
  $oct-border-style: solid !default;
  $oct-border-width: 1px !default;
  $oct-button-height: 30px !default;
  $oct-button-selected-color: #D3D3D3 !default;
  $oct-button-width: 30px !default;
  $oct-content-height: 300px !default;
  $oct-content-padding: 10px !default;

  .oct {
    border: $oct-border-width $oct-border-style $oct-border-color;
    box-sizing: border-box;
  }

  .oct-content {
    box-sizing: border-box;
    height: $oct-content-height;
    outline: 0;
    overflow-y: auto;
    padding: $oct-content-padding;
  }

  .oct-actionbar {
    background-color: $oct-actionbar-color;
    border-bottom: $oct-border-width $oct-border-style $oct-border-color;
  }

  .oct-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    height: $oct-button-height;
    outline: 0;
    width: $oct-button-width;
    vertical-align: bottom;
  }

  .oct-button-selected {
    background-color: $oct-button-selected-color;
  }
</style>
