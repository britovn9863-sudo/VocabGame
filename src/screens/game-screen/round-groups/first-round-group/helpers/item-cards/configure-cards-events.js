import { continueGame } from '../../helpers/first-round-helpers.js';
import { AudioManager } from '../../../../../../utils/audio/AudioManager.js';

/**
 * Configura os eventos de 'pointertap' para os cartões de itens do primeiro round.
 *
 * Para cada cartão, a função:
 * 1. Ativa os eventos interativos do cartão (e.g., hover, scale).
 * 2. Remove listeners 'pointertap' antigos para evitar duplicação.
 * 3. Adiciona um novo listener 'pointertap' que verifica a lógica do jogo.
 *
 * Ao clicar em um cartão:
 * - Se o item do cartão for o correto (comparando com o nome do item exibido),
 *   emite um evento 'correct' e avança para o próximo round (a menos que seja o último).
 * - Se for incorreto, emite um evento 'error'.
 *
 * @param {object} firstRoundGroupInstance - A instância do grupo do primeiro round.
 * @param {import('../../../../components/item-card/ItemCard.js').default[]} firstRoundGroupInstance.itemCards - A lista de cartões de itens na tela.
 * @param {import('../../../../../../components/text/CustomText.js').default} firstRoundGroupInstance.itemName - O objeto de texto que exibe o nome do item a ser encontrado.
 * @param {number} firstRoundGroupInstance.currentRound - O número do round atual.
 * @param {() => void} firstRoundGroupInstance.emit - Função para emitir eventos ('correct', 'error').
 */
export function configureCardEvents(firstRoundGroupInstance) {
  const itemCards = firstRoundGroupInstance.itemCards;
  const itemName = firstRoundGroupInstance.itemName;

  itemCards.forEach((card) => {
    card.activateEvents();
    card.off('pointertap');
    card.on('pointertap', () => {
      if (firstRoundGroupInstance._answerTransitionLocked) return;
      if (card.item.name === itemName.name) {
        firstRoundGroupInstance._answerTransitionLocked = true;
        itemCards.forEach((itemCard) => itemCard.deactivateEvents());

        card.showCorrectAnimation();

        setTimeout(() => {

            firstRoundGroupInstance.emit('correct');

            if (firstRoundGroupInstance.currentRound != 10) {
                setTimeout(() => {
                  firstRoundGroupInstance._answerTransitionLocked = false;
                  continueGame(firstRoundGroupInstance);
                }, 1820);
            } else {
              setTimeout(() => { firstRoundGroupInstance._answerTransitionLocked = false; }, 1820);
            }

          }, 180);

        } else {

          card.showWrongAnimation();

          firstRoundGroupInstance.emit('error');
          // Aguarda um pouco após o erro antes de repetir a palavra,
          // dando tempo para a criança perceber o feedback visual.
          if (!(firstRoundGroupInstance.parent?.mode === 'heart' && firstRoundGroupInstance.parent?.heartsCount <= 1)) {
            setTimeout(() => {
              if (!firstRoundGroupInstance._answerTransitionLocked) {
                AudioManager.speak(itemName.name);
              }
            }, 1200);
          }

      }
    });
  });
}
