import React, { useEffect, useState, createContext, useContext } from 'react';
import { Context, useStore, getStore } from './store'

function App() {
  const store = useStore();
  return <Context.Provider value={store}>
    <Header />
    <Footer />
  </Context.Provider>
}

function Header() {
  const { userInfo } = getStore();
  return <div>
    {userInfo?.name}
  </div>
}

function Footer() {
  const { userInfo } = getStore();
  return <div>
    {userInfo?.name}
  </div>
}

export default App;