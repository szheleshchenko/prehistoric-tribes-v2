import { Application, Point } from 'pixi.js';
import { assets } from '../assets';
import { Dashboard } from './features/dashboard';
import { TribesMember } from './features/tribes-member';

export class Game {
  private app: Application;

  constructor() {
    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 'gray',
      eventMode: 'dynamic'
    });

    document.body.appendChild(this.app.view as unknown as Node);
  }

  public async start(): Promise<void> {
    const personTexture = await assets.tribesMember;
    const person = new TribesMember({ position: new Point(200, 200), texture: personTexture, app: this.app });
    const dashboard = new Dashboard({ position: new Point(), texture: personTexture, app: this.app });
    this.initEventListeners();

    this.app.stage.addChild(person.sprite);
    this.app.stage.addChild(dashboard.container);
    requestAnimationFrame(this.loop.bind(this));
  }

  public loop(): void {
    this.app.renderer.render(this.app.stage);
    requestAnimationFrame(this.loop.bind(this));
  }

  public initEventListeners(): void {
    const canvas = document.querySelector('canvas');

    if (canvas) {
      canvas.addEventListener('contextmenu', (event) => event.preventDefault());
    }
  }
}
