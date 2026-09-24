/* ==========================================================================
   main.js — 页面交互
   1) 渲染项目列表（数据驱动，可无限追加）
   2) 导航滚动高亮 + 滚动后导航栏加背景
   3) 移动端菜单开合
   4) 元素进入视口时的轻微淡入
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------- 1. 渲染项目列表 ---------------- */

  var projectList = document.getElementById("projectList");
  var projectCount = document.getElementById("projectCount");

  function createElement(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function createMetaItem(key, value) {
    var item = createElement("div", "project__meta-item");
    item.appendChild(createElement("dt", null, key));
    item.appendChild(createElement("dd", null, value));
    return item;
  }

  function createProject(project, index) {
    var category = PROJECT_CATEGORIES[project.category] || {};

    var article = createElement("article", "project project--" + project.layout + " reveal");
    article.id = "project-" + project.id;
    article.style.setProperty("--accent", category.color || "#c0442b");

    // 编号：01 / 02 / 03 ...
    var indexEl = createElement("p", "project__index", String(index + 1).padStart(2, "0"));
    indexEl.setAttribute("aria-hidden", "true");

    // 图片
    var media = createElement("figure", "project__media project__media--" + project.ratio);
    var img = document.createElement("img");
    img.src = project.image;
    img.alt = project.imageAlt;
    img.loading = "lazy";
    img.decoding = "async";
    media.appendChild(img);

    // 文字
    var main = createElement("div", "project__main");
    main.appendChild(createElement("p", "project__kicker", project.category));
    main.appendChild(createElement("h3", "project__title", project.name));
    if (project.subtitle) {
      main.appendChild(createElement("p", "project__subtitle", project.subtitle));
    }
    if (project.tag) {
      main.appendChild(createElement("p", "project__tag", project.tag));
    }
    main.appendChild(createElement("p", "project__summary", project.summary));

    // 元信息：按数据中实际提供的内容渲染
    var meta = createElement("dl", "project__meta");
    (project.details || []).forEach(function (detail) {
      meta.appendChild(createMetaItem(detail.key, detail.value));
    });

    var body = createElement("div", "project__body");
    body.appendChild(main);
    body.appendChild(meta);

    article.appendChild(indexEl);
    article.appendChild(media);
    article.appendChild(body);
    return article;
  }

  if (projectList && typeof PROJECTS !== "undefined") {
    var fragment = document.createDocumentFragment();
    PROJECTS.forEach(function (project, index) {
      fragment.appendChild(createProject(project, index));
    });
    projectList.appendChild(fragment);
    if (projectCount) projectCount.textContent = String(PROJECTS.length);
  }

  /* ---------------- 2. 导航状态 ---------------- */

  var nav = document.getElementById("siteNav");

  function updateNavBackground() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 16);
  }

  updateNavBackground();
  window.addEventListener("scroll", updateNavBackground, { passive: true });

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------------- 3. 移动端菜单 ---------------- */

  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeMenu() {
    document.body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "打开导航菜单");
    }
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "打开导航菜单");
    });

    navMenu.addEventListener("click", function (event) {
      if (event.target.closest(".nav__link")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  /* ---------------- 4. 进入视口的淡入 ---------------- */

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );
    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }
})();