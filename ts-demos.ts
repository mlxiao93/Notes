/**
 * base 返回string或者number,
 * useage 调用base返回string
 */
type BaseRes = string | number
function base<T extends BaseRes>(): T {
  return '' as T;
}
function useage(): string {
  return base(); 
}


/**
 *  foo的第一个参数为string或者number
 *  当第一个参数为string时，第二个参数只能是number
 *  当第一个参数为number时，第二个参数只能是string
 */
type Arg2<T> = T extends string ? number : T extends Number ? string : never; 
function foo<T>(arg1: T, arg2: Arg2<T>) {}
foo(1, '1');
foo('1', 1);


/**
 * bar的第一个参数为string或者函数
 * 当第一个参数为函数时，第二个参数只能是函数的返回类型
 * 当地一个参数不为函数时，第二个参数要和第一个参数的类型相同
 */
type Argg2<T> = T extends () => infer P ? P : T

function bar<T>(arg: T, arg2: Argg2<T>) {}
bar(1, 1);
bar(() => '', '')


type ReturnType4Promise<Fun> = Fun extends (...params: any[]) => Promise<infer D> ?  D : never