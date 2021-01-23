import type { App } from 'vue'
import ProBreadcrumb from './Breadcrumb.vue'
import { ProDefineComponent, ProRouteRecordRaw } from '../types/index'

ProBreadcrumb.install = (app: App) => {
  app.component(ProBreadcrumb.name || 'ProBreadcrumb', ProBreadcrumb)
}

export default ProBreadcrumb as ProDefineComponent<{
  routes?: ProRouteRecordRaw[]
}>
