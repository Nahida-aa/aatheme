# AaTheme 主题指南

## 概述
AaTheme 是一个专为编程而设计的 VS Code 深色主题，具有霓虹发光效果。本指南详细说明了主题的颜色分类和设计理念。

## 语法高亮颜色分类

### 1. 基础文本元素（按常用程度排序）

#### 🔤 **变量 (Variables)** - `#f1c9e5` (粉红色)
- **包含内容：**
  - 变量名 (`variable.other.readwrite`)
  - 对象属性 (`variable.object.property`)
  - 函数参数 (`variable.parameter`)
  - 属性名 (`entity.other.attribute-name`)
  - 元变量 (`variable.other.metavariable`)
- **使用场景：** 最常见的代码元素，用于标识所有变量和属性

#### 🔧 **函数 (Functions)** - `#80f7f5` (青蓝色)
- **包含内容：**
  - 函数定义 (`meta.definition.function`)
  - 函数调用 (`meta.function-call`)
  - 内置函数 (`support.function`)
  - 特殊方法 (`keyword.other.special-method`)
- **使用场景：** 所有函数相关的代码，包括定义和调用

#### 🎨 **关键字 (Keywords)** - `#ebe5cd` (浅黄色)
- **包含内容：**
  - 控制流关键字 (`keyword.control`) - if, for, while, return
  - 存储类型 (`storage.type`) - var, let, const, function
  - 操作符 (`keyword.operator`)
  - 单位关键字 (`keyword.other.unit`) - px, em, rem
- **使用场景：** 编程语言的保留字和操作符

#### 📝 **字符串 (Strings)** - `#b2f8e3` (浅绿色)
- **包含内容：**
  - 字符串字面量 (`string`)
  - 字符串定界符 (`punctuation.definition.string`)
- **使用场景：** 所有文本字符串内容

#### 💬 **注释 (Comments)** - `#848BBD` (紫灰色)
- **包含内容：**
  - 单行注释 (`comment`)
  - 多行注释 (`comment.block`)
  - 文档字符串 (`string.quoted.docstring`)
- **使用场景：** 代码注释和文档，使用斜体字体

#### 🔢 **数字 (Numbers)** - `#51c7f5` (亮蓝色)
- **包含内容：**
  - 数字字面量 (`constant.numeric`)
  - 十六进制数 (`constant.numeric.hex`)
  - 浮点数 (`constant.numeric.float`)
- **使用场景：** 所有数字常量

### 2. 高级语言结构

#### 🏗️ **类型和类 (Types & Classes)** - `#e3b0fb` (淡紫色)
- **包含内容：**
  - 类名 (`entity.name.type`)
  - HTML 标签 (`entity.name.tag`)
  - 内置类型 (`support.type`)
  - 基本类型 (`entity.name.type.primitive`) - int, float, bool
  - 结构体 (`storage.type.struct`)
- **使用场景：** 类型定义、类声明、HTML 标签

#### 🏷️ **模块和命名空间 (Modules)** - `#f3a0a5` (浅红色)
- **包含内容：**
  - 模块名 (`entity.name.type.module`)
  - 导入别名 (`variable.other.readwrite.alias`)
- **使用场景：** 模块导入、命名空间

#### 🎯 **特殊变量 (Special Variables)** - `#e5dff5` (浅紫色)
- **包含内容：**
  - `self`, `cls` (Python)
  - `this` (JavaScript/TypeScript)
  - CSS 伪类 (`entity.other.attribute-name.pseudo-class`)
- **使用场景：** 语言特定的特殊关键字

#### 🔗 **支持库变量 (Library Variables)** - `#f07178` (珊瑚红)
- **包含内容：**
  - 全局变量 (`support.other.variable`)
  - 框架提供的变量 (如 `window`, `document`, `console`)
- **使用场景：** 外部库或框架提供的变量

### 3. 文本和符号

#### ⚪ **标点符号 (Punctuation)** - `#fdfdfd` (纯白色)
- **包含内容：**
  - 括号 (`punctuation`)
  - 操作符 (`keyword.operator.arithmetic`)
  - 分隔符
- **使用场景：** 代码结构的基础符号

#### 🎨 **常量 (Constants)** - `#f6d9ca` (浅橙色)
- **包含内容：**
  - 语言常量 (`constant.language`) - True, False, None
  - 支持库常量 (`support.constant`) - Math.PI
  - 转义字符 (`constant.escape`)
- **使用场景：** 预定义常量和转义序列

## 发光效果系统

### 颜色映射表
```javascript
const tokenReplacements = {
  // VS Code 实际输出的颜色 -> 对应的发光效果
  'eeffff': "color: #eeffff; text-shadow: 0 0 2px #001716, 0 0 3px #d7f6f875, 0 0 5px #5c6a6b75, 0 0 8px #9eb1b375;",
  '848bbd': "color: #848BBD; text-shadow: 0 0 2px #270d3b, 0 0 8px #848BBD75, 0 0 2px #849dbd75;",
  'f1c9e5': "color: #fcd9eb; text-shadow: 0 0 2px #240111, 0 0 8px #ed8db575, 0 0 5px #f967ab75, 0 0 12px #ed8dc075;",
  // ... 更多颜色映射
};
```

### 发光效果层级
1. **强发光** - 关键字、函数名（8-25px 阴影）
2. **中发光** - 变量、类型（5-12px 阴影）
3. **弱发光** - 注释、标点（2-8px 阴影）

## 支持的编程语言

### 主要支持
- **JavaScript/TypeScript** - 完整支持，包括 React 组件
- **Python** - 完整支持，包括类型提示
- **Rust** - 完整支持，包括生命周期和宏
- **C/C++** - 完整支持，包括模板
- **HTML/CSS** - 完整支持，包括伪类

### 标记语言支持
- **Markdown** - 标题、链接、代码块
- **JSON** - 多层级键值对
- **YAML** - 键值对和列表
- **XML** - 标签和属性

## 自定义配置

### 可配置选项
```json
{
  "aatheme.disableGlow": false,    // 禁用发光效果
  "aatheme.brightness": 0.45       // 调整发光亮度 (0-1)
}
```

## 贡献指南

### 添加新语言支持
1. 在 `themes/AaTheme-color-theme.json` 中添加语言特定的 scope
2. 选择合适的颜色类别
3. 在 `src/custom/theme_template.js` 中添加对应的发光效果
4. 更新此文档

### 颜色选择原则
- **高频使用** → 柔和颜色（避免视觉疲劳）
- **重要语法** → 对比度高的颜色
- **语义相关** → 相似颜色（如不同类型的函数使用相近色调）

## 故障排除

### 常见问题
1. **发光效果不显示** - 检查是否正确应用了主题
2. **某些语言不高亮** - 确保安装了相应的语言扩展
3. **颜色不准确** - 重新加载 VS Code 窗口

### 调试模式
开启开发者工具查看控制台输出：
```
AaTheme: 在样式中找到的所有颜色: [...]
AaTheme: 匹配的颜色: [...]
```

