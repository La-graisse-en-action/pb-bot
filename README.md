# pb-bot

A modern Discord bot built with TypeScript and discord.js, designed for the Pañal Band Discord server. Features AI integration, Instagram media handling, and a modular command system.

## Features

- 🤖 AI-powered chat responses using Hugging Face and OpenAI
- 📱 Instagram reel and post media extraction
- 🏗️ Modular command structure with TypeScript
- ⚡ Built with Bun for fast development and runtime
- 🎨 Rich embed messages and interactive components

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Discord Bot Token ([Discord Developer Portal](https://discord.com/developers/applications))
- Environment variables for AI services (optional)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/La-graisse-en-action/pb-bot.git
   cd pb-bot
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:

   ```bash
   DISCORD_TOKEN=your_discord_bot_token
   CLIENT_ID=your_discord_client_id
   GUILD_ID=your_discord_guild_id
   OPENAI_API_KEY=your_openai_key # optional
   HUGGINGFACE_TOKEN=your_hf_token # optional
   ```

## Development

**Run in development mode with hot reload:**

```bash
bun run dev
```

**Build the project:**

```bash
bun run build
```

**Run the built project:**

```bash
bun start
```

**Lint the code:**

```bash
bun run lint
```

## Project Structure

```text
src/
├── bot.ts              # Main bot entry point
├── config.ts           # Configuration management
├── commands/           # Slash commands
├── events/             # Discord event handlers
├── services/           # External service integrations
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Creating Commands

Commands follow a modular structure using TypeScript. Here's an example:

```typescript
// src/commands/example.ts
import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from '../types/SlashCommand';

const command: SlashCommand = {
  data: new SlashCommandBuilder().setName('example').setDescription('An example command'),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
      content: 'Hello from pb-bot!',
      ephemeral: true,
    });
  },
};

export default command;
```

Commands are automatically loaded from the `src/commands/` directory and registered with Discord.

## Event Handling

Event handlers are located in `src/events/` and follow this pattern:

```typescript
// src/events/messageCreate.ts
import type { CustomEvent } from '../types/CustomEvent';

const event: CustomEvent = {
  name: 'messageCreate',
  once: false,
  execute: async (message) => {
    // Handle message events
    console.log(`Message received: ${message.content}`);
  },
};

export default event;
```

## Running the Bot

1. **Ensure your bot has the necessary permissions in your Discord server:**

   - Send Messages
   - Use Slash Commands
   - Embed Links
   - Attach Files

2. **Start the bot:**

   ```bash
   bun run dev  # Development with hot reload
   # or
   bun run build && bun start  # Production
   ```

3. **The bot will automatically:**
   - Connect to Discord
   - Register slash commands
   - Load event handlers
   - Be ready to respond to interactions

## Configuration

The bot uses environment variables for configuration. Key settings include:

- **DISCORD_TOKEN**: Your bot's token from Discord Developer Portal
- **CLIENT_ID**: Your Discord application's client ID
- **GUILD_ID**: Your Discord server's ID (for development)
- **OPENAI_API_KEY**: OpenAI API key for AI features (optional)
- **HUGGINGFACE_TOKEN**: Hugging Face token for AI models (optional)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes following the existing code style
4. Test your changes: `bun run dev`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/La-graisse-en-action/pb-bot/issues)
- **Author**: [mrluisfer](https://mrluisfer.vercel.app)

---

Built with ❤️ using [Bun](https://bun.sh/) and [discord.js](https://discord.js.org/)
