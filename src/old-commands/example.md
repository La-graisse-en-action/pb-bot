This file is basically for, how to create a new command just copy the code base and edit for ur needs

For buttons using action row

`UPDATE`: Per the docs, it is recommended to **create new embeds**, but you use the original embed to pre-populate the new embed. Then, just update what you need and edit the message with the new embed

@example:

```js
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder().setName('').setDescription(''),
  async autocomplete(interaction) {},
  async execute(interaction) {
    // some code here
  },
}
```
