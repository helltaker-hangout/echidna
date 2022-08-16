module.exports = {
    name: 'catt',
    description: "removes the catt role and give it back after a defined delay",
    execute(message, args){
		//let userId = args[0];
		let catDuration = args[1];
		const logChan = '737631798921527366';
		const catRole = '951376685247365121';
		let logMsg = `moderator: ${message.author} removed the catt role from ${member} for ${catDuration}`;
		
		message.mentions.members.forEach(member => {
			member.roles.remove(catRole, logMsg);
			client.channels.fetch(logChan).then(channel => channel.send(logMsg));
			
			//timeout in miliseconds
			setTimeout(() => { 
				member.roles.add(catRole, 'giving the role back');
				
			}, catDuration);
			
		})
		
		
		
    }
}
