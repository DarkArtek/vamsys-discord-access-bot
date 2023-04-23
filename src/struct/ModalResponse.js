class ModalResponse {
  #pilotID;

  #name;

  /**
   * Creates a new modal response.
   * @constructor
   * @param {ModalSubmitInteraction} modal
   */

  constructor(modal) {
    this.#pilotID = modal.fields.getTextInputValue('pilot-id');
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
  get pilotID() {
    return this.#pilotID;
  }

  /**
   * Returns the name inputted by the user after sanitisation.
   * Sanitisation involves capitalising the first character of each name and forcing
   * all characters after to be lowercase.
   * @returns {string}
   */
  get sanitasedName() {
    return this.#name.split('').map((part) => {
      // Handle souble surnames
      if (part.includes('-')) {
        part.split('-').map((section) =>
        // Makes the first letter capital, then the rest lowercase
          section.charAt(0).toUpperCase() + section.slice(1).toLowerCase()).join('-');
      }

      // make the first letter capital then the others lowercase
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    });
  }
}
export default ModalResponse;
