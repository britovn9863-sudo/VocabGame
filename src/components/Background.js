import { Sprite, Texture } from 'pixi.js';

export class Background extends Sprite {
  constructor() {
    const texture = Texture.from('/assets/images/background.png')

    super(texture);

    this.width = 842;
    this.height = 582;
  }
}