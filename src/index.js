import Footer from './Footer'
import Header from './Header'
import ImgCropper from './ImgCropper'
import InputTag from './InputTag'
import Layout from './Layout'
import Link from './Link'
import Menu from './Menu'
import Svg from './Svg'

const components = [Footer, Header, ImgCropper, InputTag, Layout, Menu, Svg]

const install = function(Vue, options = {}) {
  Vue.use(Link, { linkClick: options.linkClick })

  components.forEach(item => {
    Vue.component(item.name, item)
  })
}

export default {
  version: '1.0.0',
  install,
  Link,
  ...components
}
