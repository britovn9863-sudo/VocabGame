import { Container } from 'pixi.js';
import { thirdRoundGroupStyles } from '../../../../styles/screens-components-styles/game-screen/round-groups/third-roun-group/third-round-components-styles.js';
import * as ThirdRoundHelpers from './helpers/third-group-helpers.js';
import { AudioManager } from '../../../../utils/audio/AudioManager.js';

export class ThirdRoundGroup extends Container {
  constructor(itemCards) {
    super();
    this.cards = itemCards;
    this.currentRound = 21;
    this.allNames = [];
    this.usedNames = [];
    this.selectedNames = [];
    this.selectedNameContainers = [];
    this.selectedCard = null;

    this._initialize();
  }

  _setResponsive() {
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    this.updateResponsive(isPortrait);
  }

  updateResponsive(isPortrait) {
    if (isPortrait) {
      this.cards.forEach((card) => {
        card.updateStyle(thirdRoundGroupStyles.card.mobile);
        card.changeImageSize(thirdRoundGroupStyles.card.mobile);
        card.width = thirdRoundGroupStyles.card.mobile.width;
        card.height = thirdRoundGroupStyles.card.mobile.height;
      });
    } else {
      this.cards.forEach((card) => {
        card.updateStyle(thirdRoundGroupStyles.card.desktop);
        card.changeImageSize(thirdRoundGroupStyles.card.desktop);
        card.width = thirdRoundGroupStyles.card.desktop.width;
        card.height = thirdRoundGroupStyles.card.desktop.height;
      });
    }
    ThirdRoundHelpers.positionNameContainers(this);
    if (typeof ThirdRoundHelpers.positionCard === 'function') {
      ThirdRoundHelpers.positionCard(this);
    }
    if (this.selectedNameContainers) {
      this.selectedNameContainers.forEach((container) => {
        if (container && typeof container._setResponsive === 'function') {
          container._setResponsive();
        }
      });
    }
  }

  async _initialize() {
    await this._changeCardsStyles();
    this._getAllNames();
    this._addComponents();
    this._setResponsive();
  }

  async _changeCardsStyles() {
    this.cards = await ThirdRoundHelpers.changeCardStyles(this.cards);
  }

  _getAllNames() {
    this.cards.forEach((card) => {
      this.allNames.push(card.item.name);
    });
  }

  _addComponents() {
    this._addNameContainers();
    this._addCard();
  }

  _addNameContainers(numberOfNameContainers = 3) {
    ThirdRoundHelpers.updateSelectedNames(numberOfNameContainers, this);
    ThirdRoundHelpers.createAndAddNameContainers(this);
    ThirdRoundHelpers.configureSelectedNames(this);
    ThirdRoundHelpers.positionNameContainers(this);
  }

  _addCard() {
    if (this.selectedCard) this.removeChild(this.selectedCard);
    ThirdRoundHelpers.updateSelectedCard(this);
    this.addChild(this.selectedCard);
    // Speak the animal/object shown in the image for every new third-round prompt.
    setTimeout(() => AudioManager.speak(this.selectedCard?.item?.name), 80);
  }

  _continueGame(correctNameContainer) {
    ThirdRoundHelpers.continueGame(this, correctNameContainer);
  }
}
