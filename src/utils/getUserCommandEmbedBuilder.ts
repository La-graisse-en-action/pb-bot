import { type APIEmbedField, EmbedBuilder, GuildMember, User } from 'discord.js';
import { formatStringCode } from './formatStringCode';

type UserCommandEmbedBuilderParams = {
  user: User;
  member: GuildMember;
};

export const getUserCommandEmbedBuilder = async ({ user, member }: UserCommandEmbedBuilderParams) => {
  try {
    const fields: APIEmbedField[] = [
      { name: 'User ID', value: formatStringCode(user.id), inline: true },
      { name: 'Username', value: formatStringCode(user.username), inline: true },
      { name: 'Global Name', value: formatStringCode(user.globalName ?? '—'), inline: true },
      { name: '\u200B', value: '\u200B', inline: false },

      { name: 'Display Name', value: formatStringCode(member.displayName), inline: true },
      { name: 'Nickname', value: member.nickname ? formatStringCode(member.nickname) : '—', inline: true },
      {
        name: 'Joined Server',
        value: member.joinedTimestamp ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:f>` : '-',
        inline: true,
      },

      {
        name: 'Roles',
        value:
          member.roles.cache.size > 1
            ? member.roles.cache
                .filter((r) => r.id !== member.guild.id)
                .map((r) => `<@&${r.id}>`)
                .join(' ')
            : '—',
        inline: false,
      },
      { name: '\u200B', value: '\u200B', inline: false },

      // Status especiales
      { name: 'Is Bot?', value: formatStringCode(user.bot ? '✅ Yes' : '❌ No'), inline: true },
      { name: 'Is System?', value: formatStringCode(user.system ? '✅ Yes' : '❌ No'), inline: true },
      {
        name: 'Premium Since',
        value: member.premiumSinceTimestamp ? `<t:${Math.floor(member.premiumSinceTimestamp / 1000)}:F>` : '—',
        inline: true,
      },

      // Guild data extra
      { name: 'Server Name', value: formatStringCode(member.guild.name), inline: true },
      { name: 'Guild ID', value: formatStringCode(member.guild.id), inline: true },
      { name: 'Server Owner', value: formatStringCode(`<@${member.guild.ownerId}>`), inline: true },

      // Avatar, Banner, etc.
      { name: '\u200B', value: '\u200B', inline: false },
      {
        name: 'Avatar',
        value: user.avatar
          ? `[View Avatar](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512)`
          : '—',
        inline: true,
      },
      {
        name: 'Banner',
        value: user.banner
          ? `[View Banner](https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=512)`
          : '—',
        inline: true,
      },

      // Otros
      { name: '\u200B', value: '\u200B', inline: false },
      { name: 'Account Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true },
      { name: 'Server Boosts', value: member.guild.premiumSubscriptionCount?.toString() ?? '—', inline: true },
    ].filter(Boolean);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL({ extension: 'png', size: 128 }),
      })
      .setColor('#0099ff')
      .setTitle(`Información de ${user.username.toUpperCase()}`)
      .setDescription(formatStringCode(`ID: ${user.id}`))
      .setThumbnail(user.displayAvatarURL({ extension: 'png', size: 128 }))
      .addFields(fields);

    return embed;
  } catch (error) {
    console.error('Error building user command embed:', error);
    return new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('Error')
      .setDescription('Ocurrió un error al construir el embed de usuario.')
      .setFooter({ text: 'Por favor, inténtalo de nuevo más tarde.' });
  }
};
