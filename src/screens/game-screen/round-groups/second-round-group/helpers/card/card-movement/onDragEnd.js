import { GLOBAL_COLORS } from "../../../../../../../styles/colors/global-colors.js";

export function onDragEnd({ app, card, onDrop }) {
  endDrag(card);
  removeGlobalEvents(app);
  handleDrop(card, onDrop);
}
const endDrag = (card) => {
  if (!card.dragging) return;
  card.dragging = false;
  card.data = null;
  card.cursor = 'pointer';
  // A cor da borda é definida pelo resultado do drop (verde/vermelho).
  // Não restauramos aqui para permitir que o feedback permaneça visível.

}
const removeGlobalEvents = (app) => {
  app.stage.off('pointermove');
}
const handleDrop = (card, onDrop) => {
  if (onDrop) onDrop(card);
}
