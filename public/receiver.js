(function(){

	const socket = io();
	let sender_uid;

	function generateID(){
		return `${Math.trunc(Math.random()*999)}-${Math.trunc(Math.random()*999)}-${Math.trunc(Math.random()*999)}`;
	}

	document.querySelector("#receiver-start-con-btn").addEventListener("click",function(){
		sender_uid = document.querySelector("#join-id").value;
		if(sender_uid.length == 0){
			return;
		}
		let joinID = generateID();
		socket.emit("receiver-join", {
			sender_uid:sender_uid,
			uid:joinID
		});
		document.querySelector(".join-screen").classList.remove("active");
		document.querySelector(".fs-screen").classList.add("active");
	});

})();