import { Rectangle, Sprite, Texture } from 'pixi.js';
import { CustomButton } from '../../../../components/button/CustomButton.js';
import { reviewScreenPositions } from '../../../../styles/screens-components-positions/review-screen/review-screen-components-positions.js';
import { reviewScreenStyles } from '../../../../styles/screens-components-styles/reviewScreen/review-screen-components-styles.js';
import ButtonRight from '../../../../assets/images/button_right.png';
import ButtonLeftHover from '../../../../assets/images/button_left_hover.png';

export class NextButton extends CustomButton {
  constructor() {
    super('', reviewScreenStyles.navigationButtons.desktop);

    this.background.visible = false;
    this.text.visible = false;

    const normalTexture = Texture.from(ButtonRight);
    const hoverTexture = Texture.from(ButtonLeftHover);
    this.arrow = new Sprite(normalTexture);

    this._setNormalArrowSize();
    this._centerArrow();
    this.arrow.anchor.set(0.5);
    this.addChild(this.arrow);

    this.hitArea = new Rectangle(
      0,
      0,
      reviewScreenStyles.navigationButtons.desktop.width,
      reviewScreenStyles.navigationButtons.desktop.height
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
    const textureWidth = this.arrow.texture.orig.width;
    const textureHeight = this.arrow.texture.orig.height;
    const maxWidth = this.options.width;
    const maxHeight = this.options.height;
    const scale = Math.min(maxWidth / textureWidth, maxHeight / textureHeight) * 1.35;

    this.arrow.width = textureWidth * scale;
    this.arrow.height = textureHeight * scale;
    this._normalArrowHeight = this.arrow.height;
  }

  _setHoverArrowSize() {
    const textureWidth = this.arrow.texture.orig.width;
    const textureHeight = this.arrow.texture.orig.height;
    const targetHeight = this._normalArrowHeight;
    const scale = targetHeight / textureHeight;

    // Keep the hover asset's proportions and exactly the same visual height as the normal arrow.
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
    const positionX = reviewScreenPositions.nextButton.desktop.x;
    const positionY = reviewScreenPositions.nextButton.desktop.y;

    this.position.set(positionX, positionY);
  }
}
