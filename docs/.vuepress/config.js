module.exports = {
  base: '/vue-components/',
  title: 'vue-components',
  description: 'vue-components',
  dest: 'dist/',
  evergreen: true,
  theme: 'default-prefers-color-scheme',
  themeConfig: {
    sidebar: [
      '/',
      {
        title: 'element-ui',
        path: '/element-ui/',
        children: [
          '/element-ui/',
          '/element-ui/Page',
          '/element-ui/ImgUpload',
          '/element-ui/InputTag',
        ]
      }
    ],
    lastUpdated: '最后更新时间',
    repo: 'tolking/vue-components',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页'
  }
}