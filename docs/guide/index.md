# 快速上手

## 安装

```sh
yarn add element-pro-components
# or
npm i element-pro-components
```

## 完整引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import ElementPro from 'element-pro-components'
import 'element-pro-components/lib/index.min.css'

const app = createApp(App)

app.use(ElementPro)
app.mount('#app')
```

## 按需引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import { ProLayout } from 'element-pro-components'
import 'element-pro-components/lib/index.min.css'

const app = createApp(App)

app.use(ProLayout)
// 或者
app.component('ProLayout', ProLayout)
app.mount('#app')
```

::: tip 提示
与 `Element Plus` 不同，样式不支持按需引入，由于只包含少量必要样式，不太会提供相同功能。

完整组件列表[参考里面的 components](https://github.com/tolking/element-pro-components/blob/master/src/index.ts)
:::

::: tip 提示
在导出组件的同时，一起导出的还包括内部使用的[utils](https://github.com/tolking/element-pro-components/blob/master/src/utils/index.ts)与[composables](https://github.com/tolking/element-pro-components/blob/master/src/composables/public.ts)，如果需要可以引用使用
:::

## 全局配置

##### 参考

@[code](@/src/config.ts)

##### 配置

```js
app.use(ElementPro, {
  pagination: {
    small: true,
    hideOnSinglePage: true,
    layout: 'prev, pager, next',
  },
})
```

## 开始使用

@[code](@/example/src/layout/Layout.vue)