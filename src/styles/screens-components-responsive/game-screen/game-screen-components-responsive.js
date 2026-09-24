import { changeComponentsPositions } from './helpers/change-components-positions.js';
import { changeComponentsStyles } from './helpers/change-components-styles.js';
import { resetComponentsStyles } from './helpers/reset-components-styles.js';

export class GameScreenComponentsResponsive {
  static instance = null;

  static getInstance(components) {
    if (!GameScreenComponentsResponsive.instance) {
      GameScreenComponentsResponsive.instance = new GameScreenComponentsResponsive(components);
    }
    return GameScreenComponentsResponsive.instance;
  }

  constructor(components) {
    this.components = components;
    this.gameScreen = null;
    this.isLoaded = true;
  }

  setGameScreen(gameScreen) {
    this.gameScreen = gameScreen;
  }

  changeComponentsStylesAndPositions() {
    changeComponentsStyles(this.components);
    changeComponentsPositions(this.components);
    if (this.gameScreen && typeof this.gameScreen.updateRoundResponsive === 'function') {
      this.gameScreen.updateRoundResponsive(true);
    }
  }

  resetComponentsStylesAndPositions() {
    resetComponentsStyles(this.components);
    if (this.gameScreen && typeof this.gameScreen.updateRoundResponsive === 'function') {
      this.gameScreen.updateRoundResponsive(false);
    }
  }

  updateComponents(components) {
    this.components = components;
  }
}
