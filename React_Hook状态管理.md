# 使用React Hook进行状态管理

## 背景

在React Hook发布之前，状态管理基本上用Redux或者Mobx，Hook的出现为状态管理提供了一种新的方式，接来下我们探索下这种方式。

## 状态管理关键点

+ 状态逻辑复用
+ 状态共享

## 状态逻辑复用

Hook的出现动机之一就是解决“组件之间复用状态逻辑很难”的问题

### useState

举个例子，假设我们需要一个用户信息的状态

```tsx
import React, { useState } from 'react';

function App() {

  // 用户信息state
  const [userInfo, setUserInfo] = useState<{id: string, name: string}>()    

  return <div>
    {userInfo?.name}
  </div>
}

export default App;

```

### useEffect

接上一个例子，我们需要在初始化的时候发请求拉取用户信息

```tsx
function App() {

  const [userInfo, setUserInfo] = useState<{id: string, name: string}>()

  // 拉取用户信息并更新state
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(data => {
      setUserInfo(data);
    })
  }, []);

  return <div>
    {userInfo?.name}
  </div>
}
```

### 自定义hook

App新增了Header和Footer, 并且Header、Footer都要展示用户名

可以组合上一步的useState和useEffect为一个自定义hook进行状态复用

```tsx
// 自定义hook
function useUserInfo() {
  const [userInfo, setUserInfo] = useState<{id: string, name: string}>()
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(data => {
      setUserInfo(data);
    })
  }, []);

  return { userInfo }
}

function App() {
  return <div>
    <Header />
    <Footer />
  </div>
}

function Header() {
  const { userInfo } = useUserInfo();
  return <div>
    {userInfo?.name}
  </div>
}

function Footer() {
  const { userInfo } = useUserInfo();
  return <div>
    {userInfo?.name}
  </div>
}
```

## 状态共享

上文演示了状态复用，接下来考虑状态管理的另个一个关键点：状态共享

观察上面的例子，由于没有状态没有共享，Header和Footer各拉取了一次userInfo

如何进行状态共享呢？

---- 很容易想到使用`Context`。

将自定义的`useUserInfo`存入`Context`中

```tsx
// 自定义hook
function useUserInfo() {
  const [userInfo, setUserInfo] = useState<{id: string, name: string}>()
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(data => {
      setUserInfo(data);
    })
  }, []);

  return { userInfo }
}

// 创建Context
const Context = createContext<ReturnType<typeof useUserInfo>>(null!);

function App() {
  const userInfoStore = useUserInfo();
  
  // 顶层组件将自定义hook的返回存入Context
  return <Context.Provider value={userInfoStore}>
    <Header />
    <Footer />
  </Context.Provider>
}
```

子组件如何获取共享的状态呢？
Hook提供了 `useContext`

### useContext

在Header和Footer中获取共享的userInfo

```tsx
function Header() {
  const { userInfo } = useContext(Context);
  return <div>
    {userInfo?.name}
  </div>
}

function Footer() {
  const { userInfo } = useContext(Context);
  return <div>
    {userInfo?.name}
  </div>
}
```

这样就实现了状态管理的关键链路

## 总结

将上述代码提炼，整理下，行成一个Hook状态管理的模板

+ 首先创建`store.ts`

```tsx
// 1. 将自定义hook命名为useStore并导出
export function useStore() {   
  const [userInfo, setUserInfo] = useState<{id: string, name: string}>()
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(data => {
      setUserInfo(data);
    })
  }, []);
  return { userInfo }
}

// 2. 导出Context
export const Context = createContext<ReturnType<typeof useStore>>(null!);

// 3. 封装useContext并导出getStore方法
export function getStore() {
  return useContext(Context);
}
```

+ 顶层组件使用 `Context` + `useStore` 进行初始化
  
```tsx
function App() {
  const store = useStore();
  return <Context.Provider value={store}>
    <Header />
    <Footer />
  </Context.Provider>
}
```

+ 子组件中使用 `getStore` 获取 store

```tsx
function Header() {
  const { userInfo } = getStore();
  return <div>
    {userInfo?.name}
  </div>
}
```
