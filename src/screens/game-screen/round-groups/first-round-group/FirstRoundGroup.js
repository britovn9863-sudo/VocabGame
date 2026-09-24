import { firstRoundGroupPositions } from '../../../../styles/screens-components-positions/game-screen/round-groups/first-round-group/first-round-group-components-positions.js';
import * as FirstRoundHelpers from './helpers/first-round-helpers.js';
import { Container } from "pixi.js"

export class FirstRoundGroup extends Container {
  constructor(app, itemCards) {
    super();
    this.appContainer = document.getElementById('game-container');
    this.itemCards = itemCards;
    this.itemName = null;
    this.selectedCards = [];
    this.selectedNames = [];
    this.currentRound = 1;
    this.itemCardSelected = null;

    this._initialize();
  }

  _initialize() {
    this._createItemName();
    FirstRoundHelpers.addItemCards(this, 3);
  }

  _createItemName() {
    this.itemName = FirstRoundHelpers.createItemName(this);
    this.addChild(this.itemName);
  }

  updateResponsive(isPortrait) {
    if (!this.selectedCards || this.selectedCards.length === 0) return;
    const cardCount = this.selectedCards.length;
    const groupKeyMap = {
      3: 'firstGroupCardsPositions',
      5: 'secondGroupCardsPositions',
      7: 'thirdGroupCardsPositions',
    };
    const groupKey = groupKeyMap[cardCount] || 'firstGroupCardsPositions';
    const deviceType = isPortrait ? 'mobile' : 'desktop';
    FirstRoundHelpers.positionCards(this.selectedCards, groupKey, deviceType);

    if (this.itemName) {
      const targetPositions = isPortrait
        ? firstRoundGroupPositions.nameFieldContainer.mobile
        : firstRoundGroupPositions.nameFieldContainer.desktop;

      const positionFn =
        cardCount === 5 || cardCount === 7
          ? targetPositions.secondPosition
          : targetPositions.firstPosition;

      const [posX, posY] = positionFn();
      this.itemName.position.set(posX, posY);
    }
  }
}
