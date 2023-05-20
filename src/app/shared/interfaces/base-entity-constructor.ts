import { Application, Point, Texture } from 'pixi.js';

export interface BaseEntityConstructor {
  app: Application;
  position: Point;
  texture: Texture;
}
