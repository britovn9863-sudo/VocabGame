export class ButtonInteraction {
  constructor(button, buttonConfig) {
    this.button = button;
    this.buttonConfig = buttonConfig;

    this._configureInteractionType();
    this._configureEvents();
  }

  _configureInteractionType() {
    this.button.eventMode = 'dynamic';
    this.button.cursor = 'pointer';
  }

  _configureEvents() {
    this.button.on('pointerover', () => this._mouseOver());
    this.button.on('pointerout', () => this._mouseOut());
    this.button.on('pointerup', () => this._mouseUp());
  }

  _mouseOver() {
    if (this.button.background.visible) {
      this.button.background.changeColor(this.buttonConfig.hoverColor);
    }

    if (typeof this.button.onHover === 'function') {
      this.button.onHover();
    }
  }

  _mouseOut() {
    if (this.button.background.visible) {
      this.button.background.changeColor(this.buttonConfig.backgroundColor);
    }

    if (typeof this.button.onLeave === 'function') {
      this.button.onLeave();
    }
  }

  _mouseUp() {
    if (this.button.background.visible) {
      this.button.background.changeColor(this.buttonConfig.backgroundColor);
    }
  }
}
