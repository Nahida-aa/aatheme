(function () {
  console.log('AaTheme: NEON DREAMS 进入脚本');
  //====================================
  // Theme replacement CSS (Glow styles)
  //====================================
  const tokenReplacements = {
    /* Default text color - 从 VS Code 输出中看到的是 #eeffff */  
    // 'eeffff': "color: #eeffff; text-shadow: 0 0 2px #001716, 0 0 3px #d7f6f875, 0 0 5px #5c6a6b75, 0 0 8px #9eb1b375; backface-visibility: hidden;",

    /* Numbers/Constants - 从 VS Code 输出中看到 #6796e6 */
    // '6796e6': "color: #6796e6; text-shadow: 0 0 2px #001716, 0 0 3px #03edf972, 0 0 5px #03edf972, 0 0 8px #03edf972; backface-visibility: hidden;",
    /* Keywords - 从 VS Code 输出中看到 #cd9731 */
    // 'cd9731': "color: #cd9731; text-shadow: 0 0 2px #393a33, 0 0 8px #f39f0572, 0 0 2px #f39f0572; backface-visibility: hidden;",
    /* Errors/Important - 从 VS Code 输出中看到 #f44747 */
    // 'f44747': "color: #f44747; text-shadow: 0 0 2px #000, 0 0 10px #fc1f2c72, 0 0 5px #fc1f2c72, 0 0 25px #fc1f2c72; backface-visibility: hidden;",
    /* Purple/Functions - 从 VS Code 输出中看到 #b267e6 */
    // 'b267e6': "color: #b267e6; text-shadow: 0 0 2px #0e002000, 0 0 7px #780afe75, 0 0 5px #780afe75, 0 0 18px #780afe75; backface-visibility: hidden;",
    /* Dark background - 从 VS Code 输出中看到 #262335 */
    // '262335': "color: #262335; background-color: #262335;",
    
    /* 保留主题中定义的颜色，以防它们也被使用 */
    /* comment - 从主题文件中确认 */ 
    '848BBD': "color: #848BBD; text-shadow: 0 0 2px #270d3b, 0 0 8px #848BBD75, 0 0 2px #849dbd75; backface-visibility: hidden;",
    /* Pink variables - 从主题文件中确认 */
    'f1c9e5': "color: #fcd9eb; text-shadow: 0 0 2px #240111, 0 0 8px #ed8db575, 0 0 5px #f967ab75, 0 0 12px #ed8dc075; backface-visibility: hidden;",
    // 珊瑚红 specialVariables
    'f07178': "color: #fde6e9; text-shadow: 0 0 2px #05003b, 0 0 10px #f07177, 0 0 14px #8a5af3; backface-visibility: hidden;",
    /*  keyword - 从主题文件中确认 */
    'ebe5cd': "color: #f4eee4; text-shadow: 0 0 2px #393a33, 0 0 8px #f1c91475, 0 0 2px #f3cf0575; backface-visibility: hidden;",
    /* String color - 从主题文件中确认 */
    'b2f8e3': "color: #def2ec; text-shadow: 0 0 2px #033f31, 0 0 3px #06fd9a75, 0 0 5px #06fd9a75, 0 0 8px #06fd9a75; backface-visibility: hidden;",
    /* Blue func - 从主题文件中确认 */
    '80f7f5': "color: #fdfdfd; text-shadow: 0 0 2px #001716, 0 0 3px #03edf972, 0 0 5px #03edf972, 0 0 8px #03edf972; backface-visibility: hidden;",
    /* Class, Tag - 从主题文件中确认 */ 
    'e3b0fb': "color: #f4edf7; text-shadow: 0 0 2px #0e002000, 0 0 7px #780afe75, 0 0 5px #780afe75, 0 0 18px #780afe75; backface-visibility: hidden;",
    /* self, cls - 从主题文件中确认 */ 
    'e5dff5': "color: #fcd9eb; text-shadow: 0 0 2px #380234, 0 0 10px #d30eff75, 0 0 5px #d312ff75, 0 0 25px #d30eff75; backface-visibility: hidden;",
    // module
    'f3a0a5': "color: #fff5f6; text-shadow: 0 0 2px #000, 0 0 10px #fc1f2c[NEON_BRIGHTNESS], 0 0 5px #fc1f2c[NEON_BRIGHTNESS], 0 0 25px #fc1f2c[NEON_BRIGHTNESS]; backface-visibility: hidden;"
  };

  //=============================
  // Helper functions
  //=============================

  /**
   * @summary Check if the style element exists and that it has synthwave '84 color content
   * 检查样式元素是否存在，并且它包含 Synthwave '84 颜色内容
   * @param {HTMLElement} tokensEl the style tag
   * @param {object} replacements key/value pairs of colour hex and the glow styles to replace them with
   * @returns {boolean}
   */
  const themeStylesExist = (tokensEl, replacements) => {
    console.log('AaTheme: 检查样式是否存在');
    
    if (!tokensEl.innerText) {
      console.warn('AaTheme: tokensEl.innerText 为空');
      return false;
    }
    
    console.log('AaTheme: tokensEl.innerText 长度:', tokensEl.innerText.length);
    console.log('AaTheme: tokensEl.innerText 完整内容:', tokensEl.innerText);
    
    // 提取所有颜色代码
    const colorRegex = /#([a-fA-F0-9]{6})/g;
    const foundColors = tokensEl.innerText.match(colorRegex);
    console.log('AaTheme: 在原始样式中找到的所有颜色:', foundColors);
    
    // 本文件定义的颜色
    const colors = Object.keys(replacements)
    console.log('AaTheme: 需要检查的颜色:', colors);
    
    const missingColors = [];
    const matchedColors = [];
    
    for (const color of colors) {
      const found = tokensEl.innerText.toLowerCase().includes(`#${color}`.toLowerCase());
      
      if (found) {
        matchedColors.push(color);
      } else {
        missingColors.push(color);
      }
    }
    
    console.log('AaTheme: 匹配的颜色:', matchedColors);
    console.log('AaTheme: 缺失的颜色:', missingColors);
    
    const result = tokensEl.innerText !== '' && missingColors.length === 0;
    console.log('AaTheme: themeStylesExist 结果:', result);
    
    return result;
  };

  /**
   * @summary Search and replace colours within a CSS definition
   * 搜索并替换 CSS 定义中的颜色
   * @param {string} styles the text content of the style tag
   * @param {object} replacements key/value pairs of colour hex and the glow styles to replace them with
   * @returns 
   */
  const replaceTokens = (styles, replacements) => Object.keys(replacements).reduce((acc, color) => {
    const re = new RegExp(`color: #${color};`, 'gi');
    return acc.replace(re, replacements[color]);
  }, styles);

  /**
   * @summary Checks if a theme is applied, and that the theme belongs to the Synthwave 84 family
   * 检查是否应用了主题，并且该主题属于 Synthwave 84 
   * @returns {boolean}
   */
  const usingSynthwave = () => {
    const appliedTheme = document.querySelector('[class*="theme-json"]');
    const synthWaveTheme = document.querySelector('[class*="Nahida-aa-aatheme-themes"]');
    
    console.log('AaTheme: appliedTheme 元素:', appliedTheme);
    console.log('AaTheme: synthWaveTheme 元素:', synthWaveTheme);
    
    if (appliedTheme) {
      console.log('AaTheme: appliedTheme 类名:', appliedTheme.className);
    }
    
    if (synthWaveTheme) {
      console.log('AaTheme: synthWaveTheme 类名:', synthWaveTheme.className);
    }
    
    const result = appliedTheme && synthWaveTheme;
    console.log('AaTheme: usingSynthwave 结果:', result);
    
    return result;
  }

  /**
   * @summary Checks if the theme is synthwave, and that the styles exist, ready for replacement
   * 检查是否满足所有条件来应用发光效果
   * @param {HTMLElement} tokensEl the style tag
   * @param {object} replacements key/value pairs of colour hex and the glow styles to replace them with
   * @returns 
   */
  const readyForReplacement = (tokensEl, tokenReplacements) => {
    console.log('AaTheme: 开始检查是否准备就绪');
    
    if (!tokensEl) {
      console.warn('AaTheme: tokensEl 不存在');
      return false;
    }
    
    console.log('AaTheme: tokensEl 存在，检查主题和样式');
    
    const isSynthwave = usingSynthwave();
    console.log('AaTheme: usingSynthwave() 返回:', isSynthwave);
    
    const stylesExist = themeStylesExist(tokensEl, tokenReplacements);
    console.log('AaTheme: themeStylesExist() 返回:', stylesExist);
    
    const result = isSynthwave && stylesExist;
    console.log('AaTheme: readyForReplacement 最终结果:', result);
    
    return result;
  };

  /**
   * @summary Attempts to bootstrap the theme
   * @param {boolean} disableGlow 
   * @param {MutationObserver} obs 
   */
  const initNeonDreams = (disableGlow, obs) => {
    console.log('AaTheme: NEON DREAMS 开始初始化.');
    // 1. 获取 VSCode 的原始样式标签
    const tokensEl = document.querySelector('.vscode-tokens-styles');

    if (!tokensEl || !readyForReplacement(tokensEl, tokenReplacements)) {
      console.warn('AaTheme: NEON DREAMS not initialised. Ensure you are using a Synthwave 84 subtheme and that the styles are loaded.');
      return; // 如果没有找到样式标签或不满足条件，则退出
    }

    // Add the theme styles if they don't already exist in the DOM
    // 2. 先检查是否已经存在主题样式标签，如果没有则创建一个新的样式标签
    if (!document.querySelector('#aatheme-theme-styles')) {
      // 3. 获取原始样式内容
      const initialThemeStyles = tokensEl.innerText;
      
      // Replace tokens with glow styles // 4. 替换颜色代码为发光样式
      let updatedThemeStyles = !disableGlow 
        ? replaceTokens(initialThemeStyles, tokenReplacements) // 如果没有禁用发光效果, 则替换颜色代码
        : initialThemeStyles; // 保持原样
      
      /* append the remaining styles */ // 5. 添加 Chrome 样式
      updatedThemeStyles = `${updatedThemeStyles}[CHROME_STYLES]`;
      // 6. 创建新的样式标签并添加到文档中
      const newStyleTag = document.createElement('style');
      newStyleTag.setAttribute("id", "aatheme-theme-styles");
      newStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, '');
      document.body.appendChild(newStyleTag);
      
      console.log('AaTheme: NEON DREAMS initialised!');
    }

    // disconnect the observer because we don't need it anymore
    if (obs) {
      obs.disconnect();
      obs = null;
    }
  };

  /**
   * @summary A MutationObserver callback that attempts to bootstrap the theme and assigns a retry attempt if it fails
   * 接收 mutationsList（变化列表）和 observer（观察者对象）; 遍历每个 DOM 变化事件
   */
  const watchForBootstrap = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      console.log('AaTheme: 迭代 DOM 变化事件.');
      if (mutation.type === 'attributes' || mutation.type === 'childList') {
        console.log('AaTheme: 监听到 DOM 的元素属性变化或子元素变化.');
        // does the style div exist yet? // 查找 VS Code 的样式标签 .vscode-tokens-styles 这个标签包含了语法高亮的颜色定义
        const tokensEl = document.querySelector('.vscode-tokens-styles');
        console.log('AaTheme: 遍历中准备判断是否可以应用发光效果.');
        if (readyForReplacement(tokensEl, tokenReplacements)) {
          // If everything we need is ready, then initialise
          initNeonDreams([DISABLE_GLOW], observer);
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

  //=============================
  // Start bootstrapping!
  //=============================
  console.log('AaTheme: NEON DREAMS 脚本正式运行');
  // Grab body node
  const bodyNode = document.querySelector('body');
  // Use a mutation observer to check when we can bootstrap the theme
  const observer = new MutationObserver(watchForBootstrap);
  /* watch for both attribute and childList changes because, depending on 
  the VS code version, the mutations might happen on the body, or they might 
  happen on a nested div */
  observer.observe(bodyNode, { attributes: true, childList: true });
})();