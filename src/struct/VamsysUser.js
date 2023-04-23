const axios = require('axios');
const { VAMSYS_KEY } = require('../const/conf');

class VamsysUser {
  #firstName;

  #lastName;

  #pilotId;

  /**
     * Creates a new vAMSYS user from an API response
     * @param {Object} response
     */
  constructor(response) {
    this.#firstName = response.first_name;
    this.#lastName = response.last_name;
    this.#pilotId = response.username;
  }

  /**
     * Checks whether the pilot exists
     * @returns {boolean}
     */
  get exists() {
    return this.#pilotId != null;
  }

  /**
     * Returns an array of all possible names for the pilot, in lowercase.
     * Possible names include:
     * - First name only
     * - First name with first letter of surname
     * - Full name
     * @returns {string[]}
     */
  get possibleNames() {
    return [
      this.#firstName.toLowerCase(),
      `${this.#firstName} ${this.#lastName[0]}`.toLowerCase(),
      `${this.#firstName} ${this.#lastName}`.toLowerCase(),
    ];
  }

  /**
     * Checks whether name provided is valid (ie. in the array of possibleNames)
     * @param {string} nameToCompare
     * @returns {boolean}
     */
  doesNameMatch(nameToCompare) {
    return this.possibleNames.indexOf(nameToCompare.toLowerCase()) !== -1;
  }

  /**
     * Calls the vAMSYS API and creates a new VamsysUser from the API response
     * @param {string} pilotId
     * @returns {VamsysUser}
     */
  static async fromPilotId(pilotId) {
    return axios.post('https://vamsys.io/api/bot', { api_key: VAMSYS_KEY, username: pilotId })
      .then((response) => new VamsysUser(response.data))
      .catch((error) => {
        if (error.response.status === 401) return new VamsysUser({});
        console.log(error);
      });
  }
}

module.exports = VamsysUser;
