declare module 'foo' {
  export const bar: number;
}
// import foo from 'foo';
// foo.bar;

interface Window {
  a: number
}
// window.a === 1;

declare const c: number
// c === 1;

declare namespace bar {
  const d: number
}
// bar.d === 1;