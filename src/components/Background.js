import { Sprite, Texture } from 'pixi.js';
import { App } from '../app/App.js';
import backgroundUrl from '../assets/images/background.png';

export class Background extends Sprite {
  constructor() {
    const texture = Texture.from(backgroundUrl)

    super(texture);

    this.updateSize();
  }

  updateSize() {
    const { width, height } = App.getInstance().getSize();
    this.width = width;
    this.height = height;
  }
}