const Discord = require('discord.js');
const bot = new Discord.Client();
const { token, prefix } = require('./ayarlar.json')
const fs = require('fs');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'))

for(const file of commandFiles){
    const command = require(`./komutlar/${file}`)
    bot.commands.set(command.name, command)
}

bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(" ")
    const command = args.shift().toLocaleLowerCase();

    if(!bot.commands.has(command)) return;

    try{
        bot.commands.get(command).execute(message, args)
    } catch(error){
    console.error(error)
    }
})

bot.on("ready", () =>{
    console.log(`${bot.user.username} Adlı Bot Aktif!`);
    bot.user.setActivity('Bot Version 0.0.1');
})

bot.on('message', message =>{
    const args = message.content.toLocaleLowerCase().split(" ");

    switch(args[0]){
        case 'embed':
            const embed = new Discord.MessageEmbed()
            .setAuthor('Baba KISIM', 'https://www.youtube.com/img/desktop/yt_1200.png', 'https://www.youtube.com')
            .setTitle('Baslik')
            .setURL('https://www.youtube.com')
            .setColor('#21CAD0')
            .setDescription(`<@${message.author.id}> SA AS`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .addField('FIELD 1', 'ADADA', true)
            .addField('FIELD 1', 'ADADA', true)
            .addField('FIELD 1', 'ADADA', false)
            .addFields(
                { name: 'FIELDS 1', value: 'ADADAq', inline: true },
                { name: 'FIELDS 1', value: 'ADADAq', inline: true },
                { name: 'FIELDS 1', value: 'ADADAq', inline: false }
            )
            .setImage(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter('Author BrnOrkun Version 0.0.1', message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
        break;
        case `${prefix}kick`:
            if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Kicklemeye Yetkin Yok');
            let Kuser = message.mentions.members.first();
            if(!Kuser) return message.reply('Bir Üye Bulunamadı Lütfen Geçerli Bir Üyeyi Etiketleyin.')
            if(!Kuser.kickable) return message.reply('Bu kişiyi kicklemeye yetkim yetmiyor')
            Kuser.kick()
            message.channel.send(`${Kuser} Adlı Kişi Kicklendi.`)
        break;
        case `${prefix}ban`:
            if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Banlamaya Yetkin Yok');
            let Buser = message.mentions.members.first();
            if(!Buser) return message.reply('Bir Üye Bulunamadı Lütfen Geçerli Bir Üyeyi Etiketleyin.')
            if(!Buser.kickable) return message.reply('Bu kişiyi banlamaya yetkim yetmiyor')
            Buser.ban()
            message.channel.send(`${Buser} Adlı Kişi banlandı.`)
        break;
    }
})

bot.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.cache.find(ch => ch.id === '736691689737027597')
    channel.send(`${member} Server\'a Hoşgeldin`)
})

bot.on('guildMemberRemove', member =>{
    const channel = member.guild.channels.cache.find(ch => ch.id === '736691689737027597')
    channel.send(`${member} Tekrar Görüşmek Üzere`)
})

bot.login(token);
