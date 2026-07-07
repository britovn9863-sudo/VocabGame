export function configureButtonOptions(buttonOptions) {
  return {
    width: buttonOptions.width || 200,
    height: buttonOptions.height || 50,
    backgroundColor: buttonOptions.backgroundColor || 0xE39F2D,
    borderColor: buttonOptions.borderColor || 0x474747,
    borderSize: buttonOptions.borderSize || 4,
    borderRadius: buttonOptions.borderRadius || 32,
    fontFamily: buttonOptions.fontFamily || 'Arial, sans-serif',
    fontSize: buttonOptions.fontSize || 25,
    textColor: buttonOptions.textColor || 0xFFFFFF,
    hoverColor: buttonOptions.hoverColor || 0XFCD2AE
  }
}