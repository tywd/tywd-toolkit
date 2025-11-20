# @tywd/shared-utils

TYWD 工具包的基础工具函数集合，提供常用的工具函数和实用方法。

## 功能特性

- 📦 轻量级工具函数集合
- 🔄 TypeScript 支持
- 🎯 专注于常用的工具方法
- 🚀 高性能实现

## 安装

```bash
npm install @tywd/shared-utils
```

## 使用方法

### 导入所有工具函数

```javascript
import * as utils from '@tywd/shared-utils'

// 使用日期工具
const formattedDate = utils.formatDate(new Date())
```

### 按需导入

```javascript
import { formatDate } from '@tywd/shared-utils'

const formattedDate = formatDate(new Date())
```

## API 文档

### 日期工具 (dateUtils)

#### formatDate(date: Date | string | number, format: string = 'YYYY-MM-DD'): string

格式化日期

```javascript
import { formatDate } from '@tywd/shared-utils'

// 默认格式
formatDate(new Date()) // '2023-01-01'

// 自定义格式
formatDate(new Date(), 'YYYY/MM/DD HH:mm:ss') // '2023/01/01 12:00:00'
```

#### formatTime(date: Date | string | number): string

格式化时间为 'HH:mm:ss' 格式

```javascript
import { formatTime } from '@tywd/shared-utils'

formatTime(new Date()) // '12:00:00'
```

#### formatDateTime(date: Date | string | number): string

格式化日期和时间

```javascript
import { formatDateTime } from '@tywd/shared-utils'

formatDateTime(new Date()) // '2023-01-01 12:00:00'
```

#### padStartZero(num: number, length: number = 2): string

在数字前补零

```javascript
import { padStartZero } from '@tywd/shared-utils'

padStartZero(5) // '05'
padStartZero(12, 4) // '0012'
```

## 支持的格式化模式

日期格式化支持以下占位符：

- `YYYY`：四位年份
- `MM`：月份（01-12）
- `DD`：日期（01-31）
- `HH`：小时（00-23）
- `mm`：分钟（00-59）
- `ss`：秒（00-59）

## TypeScript 支持

所有工具函数都提供了完整的 TypeScript 类型定义，支持类型检查和智能提示。

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT