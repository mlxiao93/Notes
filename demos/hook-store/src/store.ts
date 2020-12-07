import { useEffect, useState, createContext, useContext } from 'react';

export function useStore() {
  const [userInfo, setUserInfo] = useState<{id: string, name: string}>()
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(data => {
      setUserInfo(data);
    })
  }, []);

  return { userInfo }
}

export const Context = createContext<ReturnType<typeof useStore>>(null!);

export function getStore() {
  return useContext(Context);
}