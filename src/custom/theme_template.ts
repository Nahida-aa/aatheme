(function () {
  // Theme replacement CSS (Glow styles)
  const tokenReplacements: Record<string, string> = {
    // comment
    '848BBD': "color: #848BBD; text-shadow: 0 0 2px #270d3b, 0 0 8px #848BBD75, 0 0 2px #849dbd75; backface-visibility: hidden;",
    // variables
    'f1c9e5': "color: #fcd9eb; text-shadow: 0 0 2px #240111, 0 0 8px #ed8db575, 0 0 5px #f967ab75, 0 0 12px #ed8dc075; backface-visibility: hidden;",
    // specialVariables
    'f07178': "color: #fde6e9; text-shadow: 0 0 2px #05003b, 0 0 10px #f07177, 0 0 14px #8a5af3; backface-visibility: hidden;",
    // keyword
    'ebe5cd': "color: #f4eee4; text-shadow: 0 0 2px #393a33, 0 0 8px #f1c91475, 0 0 2px #f3cf0575; backface-visibility: hidden;",
    // String
    'b2f8e3': "color: #def2ec; text-shadow: 0 0 2px #033f31, 0 0 3px #06fd9a75, 0 0 5px #06fd9a75, 0 0 8px #06fd9a75; backface-visibility: hidden;",
    // func
    '80f7f5': "color: #fdfdfd; text-shadow: 0 0 2px #001716, 0 0 3px #03edf972, 0 0 5px #03edf972, 0 0 8px #03edf972; backface-visibility: hidden;",
    // Class
    'e3b0fb': "color: #f4edf7; text-shadow: 0 0 2px #0e002000, 0 0 7px #780afe75, 0 0 5px #780afe75, 0 0 18px #780afe75; backface-visibility: hidden;",
    // self, cls
    'e5dff5': "color: #fcd9eb; text-shadow: 0 0 2px #380234, 0 0 10px #d30eff75, 0 0 5px #d312ff75, 0 0 25px #d30eff75; backface-visibility: hidden;",
    // module
    'f3a0a5': "color: #fff5f6; text-shadow: 0 0 2px #000, 0 0 10px #fc1f2c[NEON_BRIGHTNESS], 0 0 5px #fc1f2c[NEON_BRIGHTNESS], 0 0 25px #fc1f2c[NEON_BRIGHTNESS]; backface-visibility: hidden;"
  };

  /**
   * @summary Check if the style element exists and that it has aaTheme color content
   * 检查样式元素是否存在，并且它包含 aaTheme 颜色内容
   * @param {HTMLElement} tokensEl the style tag
   * @param {object} replacements key/value pairs of color hex and the glow styles to replace them with
   */
  const themeStylesExist = (tokensEl: HTMLElement, replacements: Record<string, string>): boolean => {
    if (!tokensEl.innerText) {
      return false;
    }

    // const colorRegex = /#([a-fA-F0-9]{6})/g;
    // const foundColors = tokensEl.innerText.match(colorRegex);
    // console.log('AaTheme: 在原始样式中找到的所有颜色:', foundColors);
    const colors = Object.keys(replacements); // 本文件定义的颜色
    // console.log('AaTheme: 需要检查的颜色:', colors);

    const missingColors: string[] = [];
    const matchedColors: string[] = [];

    for (const color of colors) {
      const found = tokensEl.innerText.toLowerCase().includes(`#${color}`.toLowerCase());
      if (found) {
        matchedColors.push(color);
      } else {
        missingColors.push(color);
      }
    }
    // console.log('AaTheme: 匹配的颜色:', matchedColors);
    // console.log('AaTheme: 缺失的颜色:', missingColors);
    return tokensEl.innerText !== '' && missingColors.length === 0;
  };

  /**
   * @summary Search and replace colors within a CSS definition
   * 搜索并替换 CSS 定义中的颜色
   * @param {string} styles the text content of the style tag
   * @param {object} replacements key/value pairs of color hex and the glow styles to replace them with
   * @returns {string} the updated styles with colors replaced
   */
  const replaceTokens = (styles: string, replacements: Record<string, string>): string => {
    return Object.keys(replacements).reduce((acc, color) => {
      const re = new RegExp(`color: #${color};`, 'gi');
      return acc.replace(re, replacements[color]);
    }, styles);
  };
  /**
   * @summary Checks if a theme is applied, and that the theme belongs to the aaTheme family
   * 检查是否应用了主题，并且该主题属于 aaTheme 
   * @returns {boolean}
   */
  const usingAaTheme = (): boolean => {
    const appliedTheme = document.querySelector('[class*="theme-json"]');
    const aaThemeTheme = document.querySelector('[class*="Nahida-aa-aatheme-themes"]');
    return !!(appliedTheme && aaThemeTheme);
  };

  /**
   * @summary Checks if the tokens element is ready for replacement
   * 检查 tokens 元素是否准备好进行替换
   * @param {HTMLElement} tokensEl the style tag
   * @param {object} tokenReplacements key/value pairs of color hex and the glow styles to replace them with
   * @returns {boolean} true if the tokens element is ready for replacement
   */
  const readyForReplacement = (tokensEl: HTMLElement, tokenReplacements: Record<string, string>): boolean => {
    if (!tokensEl) {
      return false;
    }

    const isAaTheme = usingAaTheme();
    const stylesExist = themeStylesExist(tokensEl, tokenReplacements);
    return isAaTheme && stylesExist;
  };

  const DISABLE_GLOW = false; // 默认值，可根据需要调整
  /**
   * @summary Attempts to bootstrap the theme
   * @param {boolean} disableGlow 
   * @param {MutationObserver} obs 
   */
  const initGlowEffect = (disableGlow: boolean, obs: MutationObserver | null): void => {
    // 1. 获取 当前主题 的原始样式标签
    const tokensEl = document.querySelector('.vscode-tokens-styles') as HTMLElement;

    if (!tokensEl || !readyForReplacement(tokensEl, tokenReplacements)) {
      return;
    }
    // 2. 先检查是否已经存在主题样式标签，如果没有则创建一个新的样式标签
    if (!document.querySelector('#aatheme-theme-styles')) {
      // 3. 获取当前主题的样式
      const initialThemeStyles = tokensEl.innerText;
      // 4. 替换颜色代码为发光样式
      let updatedThemeStyles = !disableGlow 
        ? replaceTokens(initialThemeStyles, tokenReplacements) // 如果没有禁用发光效果, 则替换颜色代码
        : initialThemeStyles; // 保持原样

      updatedThemeStyles = `${updatedThemeStyles}[CHROME_STYLES]`;
      // 5. 创建新的样式标签并添加到文档中
      const newStyleTag = document.createElement('style');
      newStyleTag.setAttribute("id", "aatheme-theme-styles");
      newStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, '');
      document.body.appendChild(newStyleTag);

      console.log('AaTheme: GLOW EFFECT initialized!');
    }

    if (obs) {
      obs.disconnect();
    }
  };

  /**
   * @summary A MutationObserver callback that attempts to bootstrap the theme and assigns a retry attempt if it fails
   * 接收 mutationsList（变化列表）和 observer（观察者对象）; 遍历每个 DOM 变化事件
   */
  const watchForBootstrap = (mutationsList: MutationRecord[], observer: MutationObserver): void => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' || mutation.type === 'childList') {
        // does the style div exist yet?
        const tokensEl = document.querySelector('.vscode-tokens-styles') as HTMLElement;
        if (readyForReplacement(tokensEl, tokenReplacements)) {
          // 如果 tokens 元素准备好进行替换
          initGlowEffect(DISABLE_GLOW, observer);
        } else {
          if (tokensEl) {
            // sometimes VS code takes a while to init the styles content, so if there stop this observer and add an observer for that
            observer.disconnect();
            observer.observe(tokensEl, { childList: true });
          }
        }
      }
    }
  };

  // Start bootstrapping!
  const bodyNode = document.querySelector('body') as HTMLElement;
  const observer = new MutationObserver(watchForBootstrap);
  observer.observe(bodyNode, { attributes: true, childList: true });
})();
