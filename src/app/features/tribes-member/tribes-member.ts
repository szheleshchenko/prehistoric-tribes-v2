import { Application, FederatedPointerEvent, Point, Sprite } from 'pixi.js';
import { BaseEntityConstructor } from '../../shared/interfaces';

export class TribesMember {
  private position: Point;
  private _sprite: Sprite;
  private _app: Application;
  private isSelected: boolean;
  private goTo?: Point | null;
  private speed: number;

  public get sprite(): Sprite {
    return this._sprite;
  }

  constructor({ position, texture, app }: BaseEntityConstructor) {
    this._app = app;
    this._sprite = new Sprite(texture);
    this.position = position;
    this._sprite.eventMode = 'dynamic';
    this._sprite.cursor = 'pointer';
    this.isSelected = false;
    this.speed = 1;

    this._sprite.scale.set(0.1, 0.1);
    this._sprite.anchor.set(0.5, 0.5);
    this._sprite.position.set(position.x, position.y);

    this.initEventHandlers();
  }

  public initEventHandlers(): void {
    this.sprite.on('pointerdown', (event) => this.handleMouseDown(event));

    const canvas = document.querySelector('canvas');

    if (canvas) {
      canvas.addEventListener('mousedown', (event) => {
        if (event.button === 0) {
          if (!this.sprite.containsPoint(new Point(event.x, event.y))) {
            this.sprite.tint = 0xffffff;
            return (this.isSelected = false);
          }
        }

        if (event.button !== 2 || !this.isSelected) {
          return;
        }

        const targetX = event.x;
        const targetY = event.y;
        this.goTo = new Point(targetX, targetY);
      });
    }

    this._app.ticker.add(() => {
      if (!this.goTo) {
        return;
      }

      if (this.sprite.x === this.goTo.x && this.sprite.y === this.goTo.y) {
        return (this.goTo = null);
      }

      if (this.sprite.x !== this.goTo.x) {
        if (this.sprite.x < this.goTo.x) {
          return (this.sprite.x += 1 * this.speed);
        } else {
          return (this.sprite.x -= 1 * this.speed);
        }
      }

      if (this.sprite.y !== this.goTo.y) {
        if (this.sprite.y < this.goTo.y) {
          this.sprite.y += 1 * this.speed;
        } else {
          this.sprite.y -= 1 * this.speed;
        }
      }
    });
  }

  private handleMouseDown = (event: FederatedPointerEvent): void => {
    if (event.button === 0) {
      this.selectPerson();
    }
  };

  private selectPerson() {
    this.isSelected = true;
    this.sprite.tint = 0xff0000;
  }
}
