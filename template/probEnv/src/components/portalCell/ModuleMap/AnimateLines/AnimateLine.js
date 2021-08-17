const lineLength = 100;

export default class MoveLine {
  option = {
    duration: 100,
    transparent: 'rgba(138, 140, 0, .2)',
    color: 'rgba(255, 255, 255, 1)',
    points: [[295, 10]],
  };

  constructor(id) {
    this.canvas = document.getElementById(id);
    if (this.canvas && this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
  }

  draw(begin = [0, 0], end = [0, 0], color = '') {
    this.ctx.beginPath();
    this.ctx.moveTo(begin[0], begin[1]);
    this.ctx.lineTo(end[0], end[1]);
    const grd = this.ctx.createLinearGradient(begin[0], begin[1], end[0], end[1]);
    grd.addColorStop(0, color || this.option.transparent);
    grd.addColorStop(1, color || this.option.color);
    this.ctx.closePath();
    this.ctx.strokeStyle = grd;
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, 910, 400);
  }

  drawMoveLine(index = 0) {
    const { points = [] } = this.option;
    const begin = points[index];
    const end = points[index + 1];
    if (!end) {
      this.clear();
      return;
    }
    const dx = end[0] - begin[0];
    const dy = end[1] - begin[1];
    const length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    const count = length / lineLength;
    const vx = dx / count;
    const vy = dy / count;
    let i = 0;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.clear();
      const p0 = [begin[0] + i * vx, begin[1] + i * vy];
      if (i < count - 1) {
        const p1 = [begin[0] + (i + 1) * vx, begin[1] + (i + 1) * vy];
        this.draw(p0, p1);
        i++;
      } else {
        this.draw(p0, end);
        this.timeoutTimer = setTimeout(() => {
          clearTimeout(this.timeoutTimer);
          clearInterval(this.timer);
          this.drawMoveLine(index + 1);
        }, this.option.duration);
      }
    }, this.option.duration)
  }

  // 描点用的方法
  drawLines(index = 0) {
    const { points = [] } = this.option;
    const begin = points[index];
    const end = points[index + 1];
    if (!end) {
      return;
    }
    this.draw(begin, end, 'white');
    this.drawLines(index + 1);
  }

  start(option) {
    this.option = { ...this.option, ...option };
    this.drawMoveLine();
    // this.drawLines();
  }
}
