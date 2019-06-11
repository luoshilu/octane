<div align="center">
  <a href="https://github.com/luoshilu/octane">
    <img width="592" heigth="242" src="https://asyncc.com/uploads/2019/02/6782ba6bd28870640645eb3420523614.png">
  </a>

  <h2>octane editor - vue</h2>

  <div>
    <a href="http://badge.fury.io/js/octane-editor">
      <img src="https://img.shields.io/npm/v/octane-editor.svg?style=flat-square" alt="NPM version" />
    </a>
  </div>
  <p>基于vue的octane，是一款简洁，轻量，零依赖的富文本编辑器。</p>
</div>

---

> octane的由来: octane译为辛烷，引用于 Rocket League 游戏里一辆车的简称。

- [点击查看示例](https://asyncc.com/static/home/demo_html/html_preview.html?https://github.com/luoshilu/octane/blob/master/index.html)


![demo](https://asyncc.com/uploads/2019/02/a92144d61b53ad6e5041c2f4f81501e4.gif)

## use
---

```
npm install oct-editor
```
```
<octEditor v-model="html"></octEditor>
```
```
<octEditor :tools="['bold', 'italic', 'underline']" v-model="html"></octEditor>
```
