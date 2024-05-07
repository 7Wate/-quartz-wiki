import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";
import { QuartzPluginData } from "./quartz/plugins/vfile";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      Home: "https://www.7wate.com",
      Blog: "https://blog.7wate.com",
      GitHub: "https://github.com/7wate",
    },
  }),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
    Component.DesktopOnly(
      Component.RecentNotes({
        filter: (data: QuartzPluginData) => {
          // 是否以 'Blog/' 开头
          // console.log('Current file path:', data.filePath);
          return data.filePath
            ? data.filePath.startsWith("content/Blog")
            : false;
        },
      })
    ),
  ],
  right: [
    Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 2, // 显示直接连接的节点及其邻居
        scale: 0.8, // 默认缩放比例设为1，即100%
        repelForce: 0.5, // 稍增加排斥力以避免节点重叠
        centerForce: 0.5, // 增强中心力以更好地聚焦图形中心
        linkDistance: 50, // 增加链接长度以提高可读性
        fontSize: 0.7, // 增大字体大小以提高标签可读性
        opacityScale: 0.8, // 减轻标签透明度的变化，以便在缩放时仍然较清楚
        removeTags: [], // 保持默认，不移除任何标签
        showTags: true,
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1, // 显示更多层级的节点
        scale: 0.8, // 默认更小的缩放比例，以便观察更大的图形
        repelForce: 0.7, // 进一步增加排斥力以管理更多的节点
        centerForce: 0.5, // 增强中心力以维持图形的整体结构
        linkDistance: 60, // 增加链接长度，适应更广阔的视图
        fontSize: 0.7, // 保持较大的字体以确保标签在更大视图中也可读
        opacityScale: 0.7, // 减轻标签透明度的变化
        removeTags: [],
        showTags: true,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.MobileOnly(Component.Explorer()),
  ],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  right: [],
};
