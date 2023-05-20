import { Assets, Texture } from 'pixi.js';
import person from './person.png';

export const assets = {
  tribesMember: Assets.load<Texture>(person)
} as const;
