import { isGameOver, updateHearts } from '../game-screen-helpers.js';
import { AudioManager } from '../../../../utils/audio/AudioManager.js';

/**
 * Adiciona um grupo de rodada ao contexto do jogo, com lógica de eventos e pontuação.
 * @param {Object} options
 * @param {Object} options.context - O objeto GameScreen (this).
 * @param {Function} options.GroupClass - Classe do grupo (FirstRoundGroup, etc.).
 * @param {string} options.groupKey - Nome da propriedade onde o grupo será armazenado.
 * @param {Array} options.initArgs - Argumentos para instanciar o grupo.
 * @param {number} options.penalty - Penalidade em caso de erro.
 * @param {string} options.currentScreenName - Nome da tela atual.
 * @param {Function} options.updateRoundFn - Função para atualizar o contador da rodada.
 */
export function addRoundGroup({
  context,
  GroupClass,
  groupKey,
  initArgs,
  penalty,
  currentScreenName,
  updateRoundFn,
}) {
  const groupInstance = createGroupInstance(GroupClass, initArgs);
  registerCorrectHandler(groupInstance, context, updateRoundFn);
  registerErrorHandler(groupInstance, context, penalty);

  attachGroupToContext(context, groupInstance, groupKey, currentScreenName);
}

function createGroupInstance(GroupClass, initArgs) {
  return new GroupClass(...initArgs);
}

function registerCorrectHandler(group, context, updateRoundFn) {
  if (group.name === 'SecondRoundGroup') {
    context.timer.visible = false;
    group.on('correct', () => {
      AudioManager.playSfx('correct.wav');
      context.score.addScore(100);
      context.totalScore += 100;
      // Mantem o acerto visivel por 2 segundos antes de avancar.
      setTimeout(() => updateRoundFn(), 2000);
    });
  } else {
    context.timer.visible = true;
    group.on('correct', () => {
      AudioManager.playSfx('correct.wav');
      context.timer.stopTimer();
      context.totalScore += context.score.getScore(context.timer);
      context.score.updateScore(context.totalScore);
      // O som de acerto toca imediatamente; a proxima atividade so aparece apos 2s.
      setTimeout(() => {
        updateRoundFn();
        context.timer.startTimer(() => handleTimerEnd(context));
      }, 2000);
      // context.timer fica parado durante os 2 segundos do feedback.
    });
  }
}

function registerErrorHandler(group, context, penalty) {
  group.on('error', () => {
    // On the final Heart Mode life, use only the Game Over sound.
    // The regular error sound must not play, and the prompt must not be repeated.
    const isFinalHeartLife = context.mode === 'heart' && context.heartsCount === 1;

    // On the last life, immediately cancel both current and queued narration.
    if (isFinalHeartLife) {
      AudioManager.stopSpeech();
    } else {
      AudioManager.playSfx('wrong.wav');
    }

    if (context.mode === 'score') {
      context.totalScore = Math.max(context.totalScore - penalty, 0);
      context.score.updateScore(context.totalScore);
    } else if (context.mode === 'heart') {
      context.heartsCount--;
      updateHearts(context.heartSprites, context.heartsCount);
      if (context.heartsCount <= 0) {
        AudioManager.playSfx('heart_game_over.wav', 0.55);
        AudioManager.stopSpeech();
        isGameOver(context);
      }
    }
  });
}

function attachGroupToContext(context, groupInstance, groupKey, screenName) {
  context[groupKey] = groupInstance;
  context.addChild(groupInstance);
  context.currentScreen = screenName;
  context.timer.startTimer(() => handleTimerEnd(context));
}

function handleTimerEnd(context) {
  if (context.mode === 'heart') {
    context.heartsCount--;
    updateHearts(context);
    if (context.heartsCount <= 0) {
      AudioManager.playSfx('heart_game_over.wav', 0.55);
      isGameOver(context);
    }
  }
}
