const { Events } = require('discord.js');
const { CronJob } = require('cron');

const ID = 'ID HERE'
const collectorFilter = (reaction, user) => {
    return reaction.emoji.name === '👍' && user.id === ID;
};

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        const guild = client.guilds.cache.get('713353387944575007');
        const channel = guild.channels.cache.get('728558554641858570');
        let repeater = new CronJob(
            '02 * * * * *',
            async function () {
                let notCollected = true;
                let message = await channel.send(`<@${ID}> did you take your meds?`);
                const collector = message.createReactionCollector({ filter: collectorFilter, time: 50_000 })
                collector.on('collect', () => {
                    channel.send(`Good!`);
                    notCollected=false;
                    collector.stop();
                    repeater.stop();
                });
                collector.on('end', () => {
                    if (notCollected) {
                        channel.send(`>:(`);
                    }
                });
            });
        let scheduledMessage = new CronJob(
            '00 * * * * *',
            function () {
                repeater.start();
            }
        );
        scheduledMessage.start();
    }
};