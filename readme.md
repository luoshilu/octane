## octane

octane.js是一款简洁，轻量，零依赖的富文本编辑器，可用于pc端。

> octane的由来:
> 中文名为 辛烷，引用于 Rocket League 游戏里一辆车的简称。

![demo](https://asyncc.com/uploads/2019/02/a92144d61b53ad6e5041c2f4f81501e4.gif)

[演示地址](https://asyncc.com/static/home/demo_html/html_preview.html?https://github.com/luoshilu/octane/blob/master/index.html)

## use

html:

```
<link src="./dist/oct.min.css">
<script src="./dist/oct.min.js"></script>

<div id="editor"></div>
<script>
oct.init({
  ele: document.getElementById('editor')
});
</script>
```

API:

```
npm install --save octane-editor
```

```
// ES6
import oct from 'octane-editor'
```

---