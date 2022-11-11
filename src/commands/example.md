// This file is basically for, how to create a new command
// just copy the code base and edit for ur needs

```js
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder().setName('').setDescription(''),
  async execute(interaction) {
    // some code here
  },
}
```
