import { TextContainer } from '../../../../../../components/text-container/TextContainer.js';
import { thirdRoundGroupStyles } from '../../../../../../styles/screens-components-styles/game-screen/round-groups/third-roun-group/third-round-components-styles.js';

export class NameContainer extends TextContainer {
  constructor(name) {
    super(name, thirdRoundGroupStyles.nameContainer.desktop);
    this._setResponsive();
  }
  _setResponsive() {
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    if (isPortrait) {
      this.updateStyle(thirdRoundGroupStyles.nameContainer.mobile);
      this.text.updateStyle(thirdRoundGroupStyles.nameContainer.mobile);

      const WIDTH = thirdRoundGroupStyles.nameContainer.mobile.width;
      const HEIGHT = thirdRoundGroupStyles.nameContainer.mobile.height;

      this.text.position.set(WIDTH / 2, HEIGHT / 2);
    } else {
      this.updateStyle(thirdRoundGroupStyles.nameContainer.desktop);
      this.text.updateStyle(thirdRoundGroupStyles.nameContainer.desktop);

      const WIDTH = thirdRoundGroupStyles.nameContainer.desktop.width;
      const HEIGHT = thirdRoundGroupStyles.nameContainer.desktop.height;

      this.text.position.set(WIDTH / 2, HEIGHT / 2);
    }
  }
}
