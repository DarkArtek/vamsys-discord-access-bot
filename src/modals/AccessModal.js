const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { AIRLINE_ID, NICK_FORMAT, TEST } = require('../constants/configuration');

const ModalResponse = require("../structures/ModalResponse");
const VamsysUser = require("../structures/VamsysUser");

/**
 * Create input row for the pilot ID
 */
const pilotIdRow = new ActionRowBuilder()
  .addComponents(
    new TextInputBuilder()
      .setCustomId('pilot-id')
      .setLabel('Pilot ID')
      .setStyle(TextInputStyle.Short)
      .setMinLength(7)
      .setMaxLength(8)
      .setPlaceholder(`${AIRLINE_ID}0001`)
      .setRequired(true),
  )

/**
 * Create input row for the name
 */
const nameRow = new ActionRowBuilder()
  .addComponents(
    new TextInputBuilder()
    .setCustomId('name')
    .setLabel('Name')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Barry Allen')
    .setRequired(true)
  )

const ACCESS_REQUEST_MODAL = {
 data: new ModalBuilder()
  .setCustomId('access-form')
  .addComponents([
    pilotIdRow,
    nameRow
  ]),
  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });

      const userResponse = new ModalResponse(interaction);
      const pilotId = userResponse.pilotId.toUpperCase();

      const vamsysUser = await VamsysUser.fromPilotId(userResponse.pilotId);

      if (!vamsysUser.exists || !vamsysUser.doesNameMatch(userResponse.name)) {
        console.log(`${interaction?.user?.tag} rejected access`)
        return await interaction.followUp({content: 'Your details were incorrect. Please try again, ensuring that you have entered your details exactly as requested above.', ephemeral: true});
      }

      const nickname = userResponse.sanitisedName;
			let nicknameformat;
			let firstname;
			let lastname;

			console.log(`Nickname Format ${NICK_FORMAT}`);
			
			switch (NICK_FORMAT) {
			  case 'FULL':
			    nicknameformat = nickname;
					console.log(`Nickname Format ${nicknameformat}`);
			    break;
			  case 'FIRST':
					namesplit = nickname.split(" ");
					nicknameformat = namesplit[0];
					console.log(`Nickname Format ${nicknameformat}`);
					break;
			  case 'HALF':
			    namesplit = nickname.split(" ");
					firstname = namesplit[0];
					lastname = namesplit[1];
					nicknameformat = firstname + " " + lastname.charAt(0) + ".";
					console.log(`Nickname Format ${nicknameformat}`);
			    break;
			  default:
			    nicknameformat = nickname;
					console.log(`Nickname Format ${nicknameformat}`);
					break;
			}

      const serverConfiguration = interaction.client.getServerConfiguration(interaction.guildId);
      const separator = serverConfiguration.nickSeparator

      await interaction.member.setNickname(`${nicknameformat}${separator}${pilotId}`);

      const roleRemovalEnabled = serverConfiguration.roleRemoval.enabled;

      let userRoles = new Array(...interaction.member.roles.cache.keys());

      if (roleRemovalEnabled) {
        userRoles = userRoles.filter(role => { return serverConfiguration.roleRemoval.roleId.indexOf(role) === -1 })
      }

      userRoles.push(...serverConfiguration.accessRoleId);

      await interaction.member.roles.set(userRoles);
      await interaction.followUp({content: `Welcome to ${interaction.guild.name}!`});
    } catch(e) {
      console.log(e);
      if (!interaction.deferred) await interaction.deferReply({ ephemeral: true });
      await interaction.followUp('There was an error whilst handling your submission. Please try again later.');
    }
  }
}

module.exports = ACCESS_REQUEST_MODAL;
