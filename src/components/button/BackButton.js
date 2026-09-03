import { Sprite, Texture, Rectangle } from 'pixi.js';
import { App } from '../../app/App.js';
import { CustomButton } from './CustomButton.js';

import BackArrow from '../../assets/images/back.png';
import BackArrowHover from '../../assets/images/back_hover.png';

const BACK_BUTTON_SETTINGS = {
  width: 70,
  height: 50,
  backgroundColor: 0xFF7E00,
  hoverColor: 0xFCD2AE,
  borderColor: 0x5549E3
};

export class BackButton extends CustomButton {
  constructor() {
    super('', BACK_BUTTON_SETTINGS);

    this.background.visible = false;
    this.text.visible = false;

    const normalTexture = Texture.from(BackArrow);
    const hoverTexture = Texture.from(BackArrowHover);

    const arrow = new Sprite(normalTexture);

    arrow.anchor.set(0.5);
    arrow.scale.set(0.17);
    arrow.position.set(
      BACK_BUTTON_SETTINGS.width / 2,
      BACK_BUTTON_SETTINGS.height / 2
    );

    this.addChild(arrow);

    this.eventMode = 'static';
    this.hitArea = new Rectangle(
      arrow.x - 15,
      arrow.y - 15,
      27,
      27
    );

    this.onHover = () => {
      arrow.texture = hoverTexture;
    };

    this.onLeave = () => {
      arrow.texture = normalTexture;
    };

    // Garante que o botão sempre inicie na textura normal
    arrow.texture = normalTexture;

    // Força uma atualização no próximo ciclo
    setTimeout(() => {
      arrow.texture = normalTexture;
    }, 0);

    this._setPosition();
  }

  _setPosition() {
    const positionX = 20;
    const positionY = App.getInstance().renderer.height - 70;

    this.position.set(positionX, positionY);
  }
}