# Bifrost B2B 纺织品存档与管理系统 - 产品设计文档 (PRD)

## 1. 项目愿景与目标
Bifrost 旨在打造一个闭环的 B2B 贸易生态。不仅作为一个数字产品目录，更是一个受保护的商业协作空间。通过用户管理模块，系统能够实现商业敏感数据的保护（如特定价格或规格仅对认证客户可见），并缩短从“发现产品”到“建立订单”的沟通链条。

---

## 2. 信息架构 (Information Architecture)

应用采用 **多层级访问策略**，架构图如下：

### 2.1 核心层级
- **公共层 (Public)**:
    - `Landing Page`: 品牌展示、新品推介。
    - `Login/Register`: 极简的身份识别入口。
- **保护层 (Protected - 仅限注册客户)**:
    - `Master Archive`: 完整的产品存档，支持高阶筛选。
    - `Product Deep-Dive`: 包含材质、合规性文档、B2B 参考报价的详情页。
    - `User Selection Hub`: 用户个人的询价待办区。
- **管理层 (Management - 仅限管理员)**:
    - `Inventory Admin`: 产品上架、下架、信息修订。
    - `Inquiry CRM`: 汇总并处理客户发来的询价单。

### 2.2 导航拓扑
- **全局顶部栏 (Navbar)**: 包含品牌 Logo、主分类、搜索触发、用户中心入口、询价清单计次。

---

## 3. 用户管理模块 (User Management Module)

### 3.1 身份认证 (Authentication)
- **注册机制**: 仅限企业邮箱注册。需收集：姓名、公司名称、国家/地区、联系方式。
- **登录方式**: 邮箱+密码。支持“记住我” Session。
- **权限恢复**: 找回密码功能（邮件验证）。

### 3.2 角色与权限 (RBAC)
| 功能 | 游客 | 认证客户 (Client) | 管理员 (Admin) |
| :--- | :---: | :---: | :---: |
| 浏览首页/基本搜索 | ✓ | ✓ | ✓ |
| 查看产品基本信息 | ✓ | ✓ | ✓ |
| 查看 B2B 特供文档 (PDF/ISO) | ✕ | ✓ | ✓ |
| 加入询价列表/发起询价 | ✕ | ✓ | ✓ |
| 修改产品库存/信息 | ✕ | ✕ | ✓ |
| 管理所有用户询价单 | ✕ | ✕ | ✓ |

### 3.3 个人工作台 (User Portal)
- **Profile**: 维护公司开票信息与收货地址。
- **Inquiry History**: 历史询价记录的状态跟踪（待回复、已报价、完成）。

---

## 4. 数据结构与领域模型 (Data Model)

### 4.1 核心数据实体
#### `User` (用户)
```typescript
interface User {
  uid: string;
  email: string;
  role: 'client' | 'admin';
  companyProfile: {
    name: string;
    hqLocation: string;
    taxId?: string;
  };
  preferences: {
    language: 'en' | 'cn';
    history: string[]; // 最近浏览过产品的 ID
  };
}
```

#### `ArchiveItem` (存档产品)
- *原有基础属性...*
- `minimumOrderQuantity`: 最小起订量 (MOQ)。
- `restrictedDocs`: 指向 PDF/证书的路径字符串。

#### `Inquiry` (询价单)
```typescript
interface Inquiry {
  id: string;
  userId: string;
  items: Array<{ productId: string, quantity: number }>;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Timestamp;
}
```

---

## 5. UI 与 交互设计 (UX/UI Design)

### 5.1 视觉风格
- **身份区**: 位于 Navbar 右侧，未登录显示 `[ LOGIN ]`，已登录显示 `[ 用户名 ]` 或图标。
- **表单设计**: 采用浮动标签（Floating Labels），减少视觉干扰，金色边框强调激活状态。
- **加载状态**: 全局 Skeleton 屏，用于产品列表加载。

### 5.2 核心交互流
1. **认证流**: 点击登录 -> 半透明覆盖层 (Overlay) 弹出 -> 切换登录/注册 -> 成功后平滑重载全局状态。
2. **询价流**: 必须登录。点击“Add to Selection” -> Navbar 上的计数器带缩放动效渲染 -> 进入清单提交询价。
3. **分权预览**: 游客点击受限信息时，自动弹出“登录后查看”的优雅提示语，而非冷冰冰的报错。

---

## 6. 用户反馈与系统通知
- **实时校验**: 输入框实时验证邮箱格式与密码强度。
- **提交反馈**: 提交询价后，展示带成功勾选图标的卡片，并发送确认通知。
- **错误处理**: 对权限不足的操作，使用 Toast 通知框进行温和提醒。

---
*文档版本: 2.0.0 (User-Centric Redesign) | 生效日期: 2026-04-28*
