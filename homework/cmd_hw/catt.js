module.exports = {
    name: 'catt',
    description: "removes the catt role and give it back after a defined delay",
    execute(message, args){
		//let userId = args[0];
		let catDuration = args[1];
		const logChan = '';
		const catRole = '';
		let logMsg = `moderator: ${message.author} removed the catt role from ${member} for ${catDuration}`;
		
		message.mentions.members.forEach(member => {
			member.roles.remove(catRole, logMsg);
			client.channels.fetch(logChan).then(channel => channel.send(logMsg));
			
			//timeout in miliseconds
			setTimeout(() => { 
				member.roles.add(catRole, 'giving the role back');
				
			}, catDuration);
			
			
			
			
			// logging actions in #logs channel
			const channel = client.channels.cache.get('id');
			channel.send('content');
			
		})
		
		
		
    }
}
