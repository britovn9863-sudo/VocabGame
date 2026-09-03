import { App } from '../app/App.js';
import { CategoriesScreenComponentsResponsive } from './screens-components-responsive/categories-screen/categories-screen-components-responsive.js';
import { GameScreenComponentsResponsive } from './screens-components-responsive/game-screen/game-screen-components-responsive.js';
import { HomeScreenComponentsResponsive } from './screens-components-responsive/home-screen/home-screen-components-responsive.js';
import { PreGameScreenComponentsResponsive } from './screens-components-responsive/pre-game-screen/pre-game-screen-components-responsive.js';
import { ReviewScreenComponentsResponsive } from './screens-components-responsive/review-screen/review-screen-components-responsive.js';

export class Responsive {
  static instance = null;

  static getInstance() {
    if (!Responsive.instance) {
      Responsive.instance = new Responsive();
    }
    return Responsive.instance;
  }

  constructor() {
    this.mediaQuery = window.matchMedia('(orientation: portrait)');
    const IS_PORTRAIT = this.mediaQuery.matches;

    this.applyResponsiveLayout(IS_PORTRAIT);
  }

  applyResponsiveLayout(isPortrait) {
    const homeResponsiveInstance = HomeScreenComponentsResponsive.instance;
    const categoriesResponsiveInstance = CategoriesScreenComponentsResponsive.instance;
    const reviewResponsiveInstance = ReviewScreenComponentsResponsive.instance;
    const preGameResponsiveInstance = PreGameScreenComponentsResponsive.instance;
    const gameResponsiveInstance = GameScreenComponentsResponsive.instance;

    if (isPortrait) {
      App.getInstance().setSize(586, 837); // Aspect Ratio Vertical
      if (homeResponsiveInstance && homeResponsiveInstance.components) {
        homeResponsiveInstance.changeComponentsStylesAndPositions();
      }
      if (categoriesResponsiveInstance && categoriesResponsiveInstance.components) {
        categoriesResponsiveInstance.changeComponentsStyles();
      }
      if (reviewResponsiveInstance && reviewResponsiveInstance.isLoaded) {
        reviewResponsiveInstance.changeComponentsStylesAndPositions();
      }
      if (preGameResponsiveInstance && preGameResponsiveInstance.isLoaded) {
        preGameResponsiveInstance.changeComponentsStylesAndPositions();
      }
      if (gameResponsiveInstance && gameResponsiveInstance.isLoaded) {
        gameResponsiveInstance.changeComponentsStylesAndPositions();
      }
    } else {
      App.getInstance().setSize(842, 582); // Aspect Ratio Horizontal
      if (homeResponsiveInstance && homeResponsiveInstance.components) {
        homeResponsiveInstance.resetComponentsStylesAndPositions();
      }
      if (categoriesResponsiveInstance && categoriesResponsiveInstance.components) {
        categoriesResponsiveInstance.resetComponentsStyles();
      }
      if (reviewResponsiveInstance && reviewResponsiveInstance.isLoaded) {
        reviewResponsiveInstance.resetComponentsStylesAndPositions();
      }
      if (preGameResponsiveInstance && preGameResponsiveInstance.isLoaded) {
        preGameResponsiveInstance.resetComponentsStylesAndPositions();
      }
      if (gameResponsiveInstance && gameResponsiveInstance.isLoaded) {
        gameResponsiveInstance.resetComponentsStylesAndPositions();
      }
    }

    // Atualiza o background de todas as telas ativas
    const screenManager = App.getInstance().screenManager;
    if (screenManager && screenManager.screens) {
      Object.values(screenManager.screens).forEach((screen) => {
        if (screen && screen.children) {
          screen.children.forEach((child) => {
            if (typeof child.updateSize === 'function') {
              child.updateSize();
            }
          });
        }
      });
    }
  }

  setEvents() {
    const homeResponsiveInstance = HomeScreenComponentsResponsive.instance;
    const categoriesResponsiveInstance = CategoriesScreenComponentsResponsive.instance;

    if (this.mediaQuery.matches) {
      if (homeResponsiveInstance && homeResponsiveInstance.components) {
        homeResponsiveInstance.changeComponentsStylesAndPositions();
      }
      if (categoriesResponsiveInstance && categoriesResponsiveInstance.components) {
        categoriesResponsiveInstance.changeComponentsStyles();
      }
    }

    this.mediaQuery.addEventListener('change', (e) => {
      this.applyResponsiveLayout(e.matches);
    });
  }
}
