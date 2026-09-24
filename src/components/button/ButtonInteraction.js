import { AudioManager } from '../../utils/audio/AudioManager.js';

export class ButtonInteraction {
  // Guarda globalmente a última posição conhecida do mouse
  static lastPointerPosition = null;

  constructor(button, buttonConfig) {
    this.button = button;
    this.buttonConfig = buttonConfig;

    this._configureInteractionType();
    this._configureEvents();

    // Garante que o botão sempre inicie no estado normal
    queueMicrotask(() => {
      this._mouseOut();
      this.refreshHover();
    });
  }

  _configureInteractionType() {
    this.button.eventMode = 'dynamic';
    this.button.cursor = 'pointer';
  }

  _configureEvents() {
    this.button.on('pointerover', (event) => {
      this._updatePointerPosition(event);
      this._mouseOver();
    });

    this.button.on('pointerout', (event) => {
      this._updatePointerPosition(event);
      this._mouseOut();
    });

    this.button.on('pointerup', (event) => {
      this._updatePointerPosition(event);
      this._mouseUp();
    });

    // Guarda a posição do mouse mesmo quando ele está se movimentando
    this.button.on('globalpointermove', (event) => {
      this._updatePointerPosition(event);
    });
  }

  _updatePointerPosition(event) {
    if (event?.global) {
      ButtonInteraction.lastPointerPosition = {
        x: event.global.x,
        y: event.global.y
      };
    }
  }

  /**
   * Verifica se o mouse continua sobre o botão.
   * Isso é necessário quando o conteúdo da tela muda
   * sem que o mouse seja movimentado.
   */
  refreshHover() {
    const pointer = ButtonInteraction.lastPointerPosition;

    if (!pointer || !this.button.worldVisible) {
      return;
    }

    const bounds = this.button.getBounds();

    const isInside =
      pointer.x >= bounds.x &&
      pointer.x <= bounds.x + bounds.width &&
      pointer.y >= bounds.y &&
      pointer.y <= bounds.y + bounds.height;

    if (isInside) {
      this._mouseOver();
    } else {
      this._mouseOut();
    }
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
    AudioManager.playSfx('button_click.wav');

    if (this.button.background.visible) {
      this.button.background.changeColor(this.buttonConfig.backgroundColor);
    }

    if (typeof this.button.onLeave === 'function') {
      this.button.onLeave();
    }
  }
}