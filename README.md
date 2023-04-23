# vAMSYS Discord Access Bot
This bot is specifically designed for handling Discord access requests for vAMSYS virtual airlines.

## Configuration
In order to configure this bot, edit the conf.jsonc file located in the main directory

```json5
{
  "airlineID": "", // prefix for pilot ID usernames in the server
  "vamsysKey": "", // eg. abcdefgh-ijkl-mnop-qrst-uvwxyz012345
  "discordToken": "", // Discord bot token
  "servers": {
    "012345678901234567": { // set to the guild ID (server id)
      "accessRoleId": ["012345678901234567"], // Role that should be assigned to users that have requested access - comma separate roles for multiple roles to be assigned (e.g. ["012345678901234567", "765432109876543210"])
      "nickSeparator": " - ", // Separator that should be used between the name and pilot ID in nicknames
      "roleRemoval": { // Configuration of the removal of role(s) when a pilot joins a server
        "enabled": true, // Set this to true if a role needs to be removed when a user is given access to the server, and false if not
        "roleId": ["012345678901234567"] // If role removal is enabled above, set this to the role(s) that need to be removed when a user is given access; comma separate roles for multiple roles to be removed (e.g. ["012345678901234567", "765432109876543210"])
      }
    }
  }
}
```

## Install
To install all the dependencies required by this bot, run ``` npm install ```.
Node "lts" it's required in order to install.

## Need Help?
This bot it's under MIT license.

I am not affiliated with vAMSYS in any way.

Originally created for ITA Airways Virtual and Volotea Virtual

These 2 virtual airlines are hosted on vAMSYS that simulates the real world operations of these Airlines.

For any assistance with configuring the bot, or any other queries at all, please contact [luca@ahd-creative.agency](mailto:luca@ahd-creative.agency).
