/* ==========================================================================
   projects.js — 项目数据（唯一数据源）
   新增项目：在 PROJECTS 数组顶部追加一个对象即可，
   页面编号、版式、类别色块都会自动生成，无需改动 index.html。
     layout  : feature | split-left | split-right | compact
     ratio   : wide(16:9) | pano(21:9) | classic(4:3) | tall(4:5) | square(1:1)
     details : 元信息行，按数据里实际提供的内容渲染（未提供的不显示）
     subtitle: 可选的小标题，未提供则不渲染
     tag     : 项目类别标签，显示在项目名下方的小胶囊
   ========================================================================== */

const PROJECT_CATEGORIES = {
  "后端开发": { color: "#3b4c8c" },
  "系统编程": { color: "#1f6e7a" }
};

const PROJECTS = [
  {
    id: "campus-secondhand-backend",
    name: "校园二手交易平台后端开发",
    summary:
      "面向校内学生的二手物品交易小程序，支持商品发布、搜索、在线沟通等功能。",
    details: [
      { key: "技术选型", value: "Spring Boot、MySQL、Redis、微信小程序" },
      {
        key: "个人职责",
        value:
          "负责后端服务搭建与数据库表结构设计；完成商品发布、搜索等核心接口开发；参与项目部署与接口文档编写；项目上线后累计注册用户达 XXX 人"
      }
    ],
    category: "后端开发",
    tag: "移动应用",
    layout: "feature",
    ratio: "wide",
    image:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20showing%20a%20minimal%20second%20hand%20marketplace%20app%20interface%20on%20a%20light%20desk%20warm%20neutral%20tones%20editorial%20product%20photography&image_size=landscape_16_9",
    imageAlt: "手机上展示的二手交易应用界面"
  },
  {
    id: "linux-file-manager",
    name: "Linux 环境下的文件管理系统",
    summary:
      "基于 Linux 命令行的文件管理工具，支持文件上传、下载、权限管理等功能。",
    details: [
      { key: "技术选型", value: "C++、Linux 系统编程、Makefile" },
      {
        key: "个人职责",
        value:
          "独立完成核心功能模块的代码编写；解决 Linux 环境下的文件权限适配问题；完成项目打包与部署测试"
      }
    ],
    category: "系统编程",
    tag: "命令行工具",
    layout: "split-left",
    ratio: "classic",
    image:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=laptop%20screen%20showing%20a%20dark%20terminal%20interface%20in%20a%20dim%20study%20room%20with%20cool%20blue%20light%20minimal%20editorial%20photography&image_size=landscape_4_3",
    imageAlt: "昏暗书房中显示终端界面的笔记本电脑"
  }
];