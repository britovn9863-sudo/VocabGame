import { Rectangle, Sprite, Texture } from 'pixi.js';
import { CustomButton } from '../../../../../components/button/CustomButton.js';
import { preGameScreenPositions } from '../../../../../styles/screens-components-positions/pre-game-screen/pre-game-screen-components-positions.js';
import { preGameScreenStyles } from '../../../../../styles/screens-components-styles/pre-game-screen/pre-game-screen-components-styles.js';
import ButtonRight from '../../../../../assets/images/button_right.png';
import ButtonLeftHover from '../../../../../assets/images/button_left_hover.png';

export class NextButton extends CustomButton {
  constructor(preGameScreen) {
    super('', preGameScreenStyles.navigationButtons.desktop);

    this.background.visible = false;
    this.text.visible = false;

    const normalTexture = Texture.from(ButtonRight);
    const hoverTexture = Texture.from(ButtonLeftHover);
    this.arrow = new Sprite(normalTexture);
    this.arrow.anchor.set(0.5);

    // The normal button assets are 677x369. Use their intrinsic dimensions
    // instead of texture.orig at construction time so the first render cannot
    // use the temporary dimensions Pixi has before the image finishes loading.
    this._normalTextureWidth = 677;
    this._normalTextureHeight = 369;

    this._setNormalArrowSize();
    this._centerArrow();
    this.addChild(this.arrow);

    this.hitArea = new Rectangle(
      0,
      0,
      preGameScreenStyles.navigationButtons.desktop.width,
      preGameScreenStyles.navigationButtons.desktop.height
    );

    this.onHover = () => {
      this.arrow.texture = hoverTexture;
      this._setHoverArrowSize();
    };

    this.onLeave = () => {
      this.arrow.texture = normalTexture;
      this._setNormalArrowSize();
    };

    this._setPosition();
  }

  updateStyle(newOptions) {
    super.updateStyle(newOptions);
    this._setNormalArrowSize();
    this._centerArrow();
    this._updateHitArea();
  }

  _setNormalArrowSize() {
    const textureWidth = this._normalTextureWidth;
    const textureHeight = this._normalTextureHeight;
    const maxWidth = this.options.width;
    const maxHeight = this.options.height;
    const scale = Math.min(maxWidth / textureWidth, maxHeight / textureHeight) * 1.35;

    this.arrow.width = textureWidth * scale;
    this.arrow.height = textureHeight * scale;
    this._normalArrowHeight = this.arrow.height;
  }

  _setHoverArrowSize() {
    // Hover assets are 678x877. Keep their own proportions while preserving
    // exactly the same visual height as the normal arrow.
    const textureWidth = 678;
    const textureHeight = 877;
    const targetHeight = this._normalArrowHeight;
    const scale = targetHeight / textureHeight;

    this.arrow.width = textureWidth * scale;
    this.arrow.height = targetHeight;
  }

  _centerArrow() {
    this.arrow.position.set(
      this.options.width / 2,
      this.options.height / 2
    );
  }

  _updateHitArea() {
    this.hitArea.width = this.options.width;
    this.hitArea.height = this.options.height;
  }

  _setPosition() {
    const positionX = preGameScreenPositions.nextButton.desktop.x;
    const positionY = preGameScreenPositions.nextButton.desktop.y;

    this.position.set(positionX, positionY);
  }
}
