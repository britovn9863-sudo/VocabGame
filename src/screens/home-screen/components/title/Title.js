import { Sprite, Texture } from 'pixi.js';

import EasifyVocab from '../../../../assets/images/EasifyVocab.png';
import { homeScreenPositions } from '../../../../styles/screens-components-positions/home-screen/home-screen-components-position';

export class Title extends Sprite {
  constructor() {
    super(Texture.from(EasifyVocab));

    this.anchor.set(0.5);
    this.position.set(
      homeScreenPositions.title.desktop.x,
      homeScreenPositions.title.desktop.y + 30
    );

    this.scale.set(0.36);
  }
}