import { Text, TextStyle } from "pixi.js";
const HOVER_BORDER_COLOR = 0x853700;

/**
 * Configura os listeners de eventos para os contêineres de nome selecionados.
 * @param {import('../../../ThirdRoundGroup2.js').ThirdRoundGroup} thirdRoundGroupInstance - A instância do grupo do terceiro round.
 */
export function configureSelectedNames(thirdRoundGroupInstance) {
  thirdRoundGroupInstance.selectedNameContainers.forEach((nameContainer) => {
    // Limpa listeners antigos para evitar duplicatas
    nameContainer.removeAllListeners();

    nameContainer.eventMode = 'dynamic';
    nameContainer.cursor = 'pointer';

    // Adiciona o listener para o clique/toque
    nameContainer.on('pointertap', () =>
      handleNameSelection(nameContainer, thirdRoundGroupInstance)
    );
    // Adiciona os efeitos de hover
    addHoverEffects(nameContainer);
  });
}

/**
 * Adiciona efeitos visuais de hover (passar o mouse) a um contêiner de nome.
 * @private
 * @param {import('../../../components/name-container/NameContainer.js').NameContainer} nameContainer - O contêiner de nome.
 */
export function addHoverEffects(nameContainer) {
  const originalBorderColor = nameContainer.settings.borderColor;

  nameContainer.on('pointerover', () => {

    if (nameContainer._animating) return;

    nameContainer.changeBorderColor(HOVER_BORDER_COLOR);

  });

  nameContainer.on('pointerout', () => {

    if (nameContainer._animating) return;

    nameContainer.changeBorderColor(originalBorderColor);

  });
}

function showWrongAnimation(nameContainer) {

  if (nameContainer._animating) return;

  nameContainer._animating = true;
  nameContainer.eventMode = 'none';

  const originalX = nameContainer.x;
  const originalBorder = nameContainer.settings.borderColor;

  // Borda vermelha
  nameContainer.changeBorderColor(0xff0000);

  // X vermelho
  const wrongMark = new Text(
    "✖",
    new TextStyle({
      fill: 0xff0000,
      fontSize: 36,
      fontWeight: "bold",
    })
  );

  wrongMark.anchor.set(0.5);

  // Coloca o X um pouco à direita da caixa
  wrongMark.x = nameContainer.settings.width - 38;
  wrongMark.y = nameContainer.settings.height / 2;

  nameContainer.addChild(wrongMark);

  let count = 0;

  const shake = setInterval(() => {

    nameContainer.x = originalX + (count % 2 === 0 ? -5 : 5);

    count++;

    if (count > 8) {

      clearInterval(shake);

      nameContainer.x = originalX;

      // Volta SEMPRE para a cor padrão
      nameContainer.changeBorderColor(0xFB7302);

      wrongMark.destroy();

      nameContainer._animating = false;

      nameContainer.eventMode = 'dynamic';

      // Se o mouse ainda estiver em cima, só então deixa verde novamente
      setTimeout(() => {

          const bounds = nameContainer.getBounds();

          const mouse = nameContainer.parent.toLocal(
              nameContainer.renderer.events.pointer.global
          );

          if (
              mouse.x >= bounds.x &&
              mouse.x <= bounds.x + bounds.width &&
              mouse.y >= bounds.y &&
              mouse.y <= bounds.y + bounds.height
          ) {
              nameContainer.changeBorderColor(HOVER_BORDER_COLOR);
          }

      }, 0);

    }

  }, 35);

}

/**
 * Lida com a lógica de quando um nome é selecionado pelo jogador.
 * @private
 * @param {import('../../../components/name-container/NameContainer.js').NameContainer} nameContainer - O contêiner de nome selecionado.
 * @param {import('../../../ThirdRoundGroup2.js').ThirdRoundGroup} thirdRoundGroupInstance - A instância do grupo do terceiro round.
 */
export function handleNameSelection(nameContainer, thirdRoundGroupInstance) {
  if (nameContainer.name === thirdRoundGroupInstance.selectedCard.item.name) {
    thirdRoundGroupInstance.emit('correct');
    thirdRoundGroupInstance._continueGame(nameContainer);
  } else {

      showWrongAnimation(nameContainer);

      thirdRoundGroupInstance.emit('error');
  }
}
