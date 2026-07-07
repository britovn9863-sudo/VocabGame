import { loadImage } from '../../utils/load-images/loadImage.js';
import { CustomContainer } from '../container/CustomContainer.js';
import { ItemCardImage } from './ItemCardImage.js';
import { Texture, Graphics, Text, TextStyle } from "pixi.js";

export class CustomItemCard extends CustomContainer {
  constructor(category, item, itemStyles) {
    super(null, itemStyles);
    this.styles = itemStyles;
    this.category = category;
    this.item = item;
    this.image = new ItemCardImage(Texture.EMPTY, this.styles);
    this.addChild(this.image);
    this.updateImage(item);

    // Define os manipuladores de eventos uma única vez para poder referenciá-los ao desativar.
    this._onPointerOver = () => this.changeBorderColor(this.styles.borderHoverColor);
    this._onPointerOut = () => this.changeBorderColor(this.styles.borderColor);
    this._onPointerUp = () => this.changeBorderColor(this.styles.borderColor);
  }

  async updateImage(newItem) {
    if (!newItem || !newItem.image) {
      console.error('Novo item ou imagem do item é inválido.');
      return;
    }

    const IMAGE_URL = `assets/categories/${encodeURIComponent(
      this.category.title
    )}/${encodeURIComponent(newItem.image)}`;

    try {
      const texture = await loadImage(IMAGE_URL);
      this.image.texture = texture;
      this.item = newItem;
    } catch (error) {
      console.error(`Erro ao carregar a imagem: ${IMAGE_URL}`, error);
    }
  }

  /**
   * Ativa os eventos de interação do card, como hover e clique.
   * Modifica o cursor e adiciona listeners para 'pointerover', 'pointerout' e 'pointerup'
   * para alterar a cor da borda, proporcionando feedback visual ao usuário.
   */
  activateEvents() {
    this.eventMode = 'dynamic';
    this.cursor = 'pointer';

    this.on('pointerover', this._onPointerOver);
    this.on('pointerout', this._onPointerOut);
    this.on('pointerup', this._onPointerUp);
  }

  /**
   * Desativa os eventos de interação do card.
   * Remove os listeners de eventos e redefine o cursor e o modo de evento para o padrão.
   * Também garante que a cor da borda seja redefinida para o estado inicial.
   */
  deactivateEvents() {
    this.eventMode = 'static';
    this.cursor = 'default';

    this.off('pointerover', this._onPointerOver);
    this.off('pointerout', this._onPointerOut);
    this.off('pointerup', this._onPointerUp);

    // Garante que a borda volte ao estado padrão, caso o mouse ainda esteja sobre o elemento.
    if (this.background) {
      this.changeBorderColor(this.styles.borderColor);
    }
  }

  showWrongAnimation() {

    if (this._wrongAnimationRunning) return Promise.resolve();

    this._wrongAnimationRunning = true;

    return new Promise((resolve) => {

        const wrongMark = new Text("✖", new TextStyle({
            fill: 0xff0000,
            fontSize: 50,
            fontWeight: "bold",
        }));

        wrongMark.anchor.set(0.5);
        wrongMark.x = this.settings.width - 32;
        wrongMark.y = this.settings.height - 32;

        this.addChild(wrongMark);

        this.changeBorderColor(0xff0000);

        const originalX = this.x;

        let count = 0;

        const shake = setInterval(() => {

            this.x = originalX + (count % 2 === 0 ? -6 : 6);

            count++;

            if (count > 8) {

                clearInterval(shake);

                this.x = originalX;

                this.changeBorderColor(this.styles.borderColor);

                this.removeChild(wrongMark);

                this._wrongAnimationRunning = false;

                resolve();

            }

        },35);

    });

}

  showCorrectAnimation() {
    if (this._correctAnimationRunning) return;

    this._correctAnimationRunning = true;

    this.changeBorderColor(0x00cc44);

    const originalY = this.y;

    this.y = originalY - 12;

    setTimeout(() => {
      this.y = originalY;

      this.changeBorderColor(this.styles.borderColor);

      this._correctAnimationRunning = false;
    }, 180);
  }
}
