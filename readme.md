<div align="center">
  <a href="https://github.com/thinkjs/thinkjs">
    <img width="592" heigth="242" src="https://asyncc.com/uploads/2019/02/6782ba6bd28870640645eb3420523614.png">
  </a>  

  <h2>octane editor</h2>

  <div>
    <a href="http://badge.fury.io/js/thinkjs">
      <img src="https://img.shields.io/npm/v/octane-editor.svg?style=flat-square" alt="NPM version" />
    </a>
  </div>
  <p>octane.js是一款简洁，轻量，零依赖的富文本编辑器，可用于pc端。</p>
</div>

> octane的由来: octane译为辛烷，引用于 Rocket League 游戏里一辆车的简称。

![demo](https://asyncc.com/uploads/2019/02/a92144d61b53ad6e5041c2f4f81501e4.gif)
- [点击查看示例](https://asyncc.com/static/home/demo_html/html_preview.html?https://github.com/luoshilu/octane/blob/master/index.html)

## use

html:

```
<link src="./dist/oct.min.css">
<script src="./dist/oct.min.js"></script>

<div id="editor"></div>
<script>
oct.init({
  ele: document.getElementById('editor'),
  tool: ['bold', 'italic', 'underline', 'strike']
});
</script>
```

API:

```
// install
npm install --save octane-editor
```

```
// ES6
import oct from 'octane-editor'
```

---