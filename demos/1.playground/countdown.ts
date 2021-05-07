export default class Countdown {
  private total: number;   // 总毫秒

  private remaining: number;   // 剩余的毫秒数

  private startPoint: number;

  private interval: null | ReturnType<typeof setInterval> = null;

  private onCountdown: (params: {
    remaining: number,
    remainingCount: number    // 毫秒
  }) => void;

  private countInterval: number  // 默认1000

  private lastRemainingCount: number = NaN

  constructor(args: {
    total: number, onCountdown: (params: {
      remaining: number,    // 剩余的时间，单位毫秒.
      remainingCount: number   //  剩余的计数次数.
    }) => void,
    countInterval?: number    // 倒计时间隔
  }) {
    this.onCountdown = args.onCountdown;
    this.total = args.total;
    this.remaining = args.total;
    this.startPoint = Date.now();
    this.countInterval = args.countInterval || 1000
    this.start();
  }

  private doCount() {
    this.remaining = this.total - (Date.now() - this.startPoint);
    this.remaining = Math.max(0, this.remaining)
    const remainingCount = Math.abs(Math.ceil(this.remaining / this.countInterval));

    if (remainingCount !== this.lastRemainingCount) {     // 保证间隔countInterval执行onCountdown
      this.onCountdown({ remaining: this.remaining, remainingCount });
    }
    this.lastRemainingCount = remainingCount

    if (remainingCount <= 0) {
      this.interval && clearInterval(this.interval);
      this.interval = null;
    };
  }

  private start(): void {
    this.doCount();
    if (this.interval !== null) return;
    this.interval = setInterval(() => {
      this.doCount();
    }, this.countInterval * 0.5);    // 尽量避免跳越
  }

  public cancel(): void {
    this.interval && clearInterval(this.interval)
  }
}