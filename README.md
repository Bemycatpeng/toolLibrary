## 项目名称

这是一个基于 Docusaurus 的前端文档项目，用于记录和分享我们的前端开发经验、最佳实践、代码示例等。

### 如何运行本地环境

1. 首先，确保你已经在本地安装了 Node.js 和 Yarn。
2. 克隆项目仓库到本地：git clone https://github.com/Bemycatpeng/toolLibrary
3. 进入项目根目录：cd toolLibrary
4. 安装项目依赖：yarn
5. 启动本地服务器：yarn start

### 如何编写文档

1. 打开 /docs 目录，你将会看到一些已经存在的 Markdown 文件。
2. 编辑或创建你自己的 Markdown 文件，遵循 Docusaurus 文档编写规范即可。
3. 如果你想添加新的章节或页面，只需要在 /docs 目录下创建新的 Markdown 文件即可。

### 如何部署文档

1. 确保你已经配置好了 docusaurus.config.js 中的 url 和 baseUrl 选项。
2. 运行 yarn build 命令，它将会生成一个静态的网站文件夹 /build。
3. 将 /build 文件夹上传到你的静态文件托管服务上即可。

### 如何贡献

我们非常欢迎你为该项目作出贡献，无论是发现和报告 Bug，还是编写新的文档章节、修复错别字等都可以。

如果你想为该项目做出贡献，请按照以下步骤进行：

1. Fork 该项目。
2. 创建新的分支：git checkout -b my-new-feature
3. 编写新的代码或修复 Bug。
4. 运行测试：yarn test
5. 提交你的更改：git commit -am 'Add some feature'
6. 推送分支到 GitHub：git push origin my-new-feature
7. 提交 Pull Request。

### 授权协议

该项目使用 MIT 授权协议，详情请参阅 LICENSE 文件。
