/**
 * HTML Element manipulations
 */
export const El = {
  $: function(el) {
    return document.querySelector(el);
  },

  $$: function(el) {
    return document.querySelectorAll(el);
  },

  show: function(el) {
    if (typeof el === 'string') {
      this.$(el).style.display = 'block';
    } else {
      el.style.display = 'block';
    }
  },

  hide: function(el) {
    if (typeof el === 'string') {
      this.$(el).style.display = 'none';
    } else {
      el.style.display = 'none';
    }
  },

  /**
   * Set element's text
   *
   * @param el
   * @param text
   */
  text: function(el, text) {
    // array of objects
    if (el instanceof NodeList) {
      for (let i = 0, len = el.length; i < len; ++i) {
        el[i].textContent = text;
      }
    }

    // object
    if (typeof el === 'object' && (el instanceof Node)) {
      el.textContent = text;
    }

    // selector
    if (typeof el === 'string') {
      this.text(this.$$(el), text);
    }
  },

  /**
   * Set element's html
   *
   * @param el
   * @param html
   */
  html: function(el, html) {
    // array of objects
    if (el instanceof NodeList) {
      for (let i = 0, len = el.length; i < len; ++i) {
        el[i].innerHTML = html;
      }
    }

    // object
    if (typeof el === 'object' && (el instanceof Node)) {
      el.innerHTML = html;
    }

    // selector
    if (typeof el === 'string') {
      this.html(this.$$(el), html);
    }
  }
};

/**
 * Extension methods
 */
export const Ext = {
  /**
   * Dispatches params to popup.js
   *
   * @param message object
   */
  sendMessage: function(message) {
    if (typeof message !== 'object') {
      throw new Error('Message must be an object');
    }

    chrome.runtime.sendMessage(message);
  },

  /**
   * Save data in storage
   *
   * @param data object
   * @param message string
   */
  setValue: function(data, message) {
    if (typeof data !== 'object') {
      throw new Error('Data must be an object');
    }

    chrome.storage.local.get('quasimodo', (storage) => {
      if (typeof storage.quasimodo === 'undefined') {
        storage.quasimodo = {};
      }

      for (const prop in data) {
        storage.quasimodo[prop] = data[prop];
      }

      chrome.storage.local.set({ quasimodo: storage.quasimodo }, () => {
        // Notify that we saved.
        if (message) {
          alert(message);
        }
      });
    });
  },

  /**
   * Get locale message
   *
   * @param key
   * @returns {string}
   */
  __: function(key) {
    return chrome.i18n.getMessage(key);
  },

  /**
   * Create the offscreen document if it doesn't already exist
   *
   * @returns {Promise<void>}
   */
  createOffscreen: async function() {
    if (await chrome.offscreen.hasDocument()) {
      return;
    }

    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'play notification sound',
    });
  },
};
