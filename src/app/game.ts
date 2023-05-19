import { Application } from 'pixi.js';

export class Game {
  private app: Application;

  constructor() {
    this.app = new Application({
      width: 240,
      height: 320,
      backgroundColor: 'gray'
    });

    document.body.appendChild(this.app.view as unknown as Node);
  }

  start(): void {
    // Implement game logic here
  }
}
