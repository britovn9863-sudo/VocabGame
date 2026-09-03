import { thirdRoundGroupPositions } from '../../../../../../styles/screens-components-positions/game-screen/round-groups/third-round-group/third-round-group-components-positions.js';

/**
 * Determina qual função de posicionamento usar com base no round atual.
 * @param {number} round - O número do round atual.
 * @param {object} positions - O objeto contendo as funções de posicionamento para o dispositivo atual.
 * @returns {Function|null} A função de posicionamento correspondente ou null se nenhuma for encontrada.
 */
function getPositioner(round, positions) {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  // DESKTOP
  if (round <= 21 && !isPortrait) return positions.firstPosition;
  if (round <= 23 && !isPortrait) return positions.secondPosition;
  if (round <= 26 && !isPortrait) return positions.thirdPosition;
  if (round === 27 && !isPortrait) return positions.secondPosition;
  if (round === 28 && !isPortrait) return positions.firstPosition;
  if (round === 29 && !isPortrait) return positions.fourthPosition;
  if (round === 30 && !isPortrait) return positions.fifthPosition;

  // MOBILE
  if (round <= 23 && isPortrait) return positions.firstPosition;
  if (round <= 27 && isPortrait) return positions.secondPosition;
  if (round === 28 && isPortrait) return positions.firstPosition;
  if (round === 29 && isPortrait) return positions.thirdPosition;
  if (round === 30 && isPortrait) return positions.fourthPosition;

  return null;
}

/**
 * Posiciona os nameContainers na tela com base no round atual do jogo.
 * @param {object} thirdRoundGroupInstance - A instância do grupo do segundo round.
 */
export function positionNameContainers(thirdRoundGroupInstance) {
  const selectedNamesContainers = thirdRoundGroupInstance.selectedNameContainers;
  const currentRound = thirdRoundGroupInstance.currentRound;

  const IS_PORTRAIT = window.matchMedia('(orientation: portrait)').matches;
  const devicePositions = IS_PORTRAIT
    ? thirdRoundGroupPositions.nameContainer.mobile
    : thirdRoundGroupPositions.nameContainer.desktop;

  const positioner = getPositioner(currentRound, devicePositions);
  if (positioner) {
    selectedNamesContainers.forEach((nameContainer, index) => {
      const position = positioner(index);
      nameContainer.position.set(position.x, position.y);
      thirdRoundGroupInstance.addChild(nameContainer);
    });
  }
}
