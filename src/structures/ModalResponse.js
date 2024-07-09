const { NICK_FORMAT } = require('../constants/configuration');

class ModalResponse {
    #pilotId;
    #name;
  
    /**
     * Creates a new modal response.
     * @constructor
     * @param {ModalSubmitInteraction} modal
     */
    constructor(modal) {
      this.#pilotId = modal.fields.getTextInputValue('pilot-id');
      this.#name = modal.fields.getTextInputValue('name');
    }
  
    /**
     * Returns name inputted by user in modal input
     * @returns {string}
     */
    get name() {
      return this.#name;
    }
  
    /**
     * Returns pilot ID inputted by user in modal input
     * @return {string}
     */
    get pilotId() {
      return this.#pilotId;
    }
  
    /**
     * Returns the name inputted by the user after sanitisation.
     * Sanitisation involves capitalising the first character of each name and forcing
     * all characters after to be lowercase.
     * @returns {string}
     */
    get sanitisedName() {
      return this.#name.split(' ').map(part => {
        // handle double-barrel surnames....
        if (part.includes('-')) {
          part.split('-').map(section => {
            // make first letter capital, then the rest lowercase
            return section.charAt(0).toUpperCase() + section.slice(1).toLowerCase();
          }).join('-');
        }
  
        // make first letter capital, then the rest lowercase
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      }).join(' ')
    }
  }
  
  module.exports = ModalResponse;
