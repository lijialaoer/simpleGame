function  Snake(){
	this.box=document.querySelector('.box');
	this.snake=['0_0','0_1','0_2'];
	this.dirction=39;
	this.flag={'0_0':true,'0_1':true,'0_2':true};
	this.food='';
}
Snake.prototype={
	start:function(){
		this.Block();
		this.Draw();
		this.Move();
		this.Key();
		this.Food();
	},
	Block:function(){
		for(let i=0;i<=19;i++){
			for(let j=0;j<=19;j++){
				this.box.innerHTML+=`<div class='block' id='${i}_${j}'></div>`;
			}
		}
	},
	Draw:function(){
		this.snake.forEach(element =>{
			document.getElementById(element).classList.add('color');
		})
	},
	Move:function(){
		let that=this;
		that.t=setInterval(function(){
			 let oldt=that.snake[that.snake.length-1];
			 let arr=oldt.split('_');
			 let newt='';
			 if(that.dirction==37){
			 	newt=`${arr[0]*1}_${arr[1]*1-1}`;
			 	console.log(newt)
			 }else if(that.dirction==38){
			 	newt=`${arr[0]*1-1}_${arr[1]*1}`;
			 }else if(that.dirction==39){
			 	newt=`${arr[0]*1}_${arr[1]*1+1}`;
			 }else if(that.dirction==40){
			 	newt=`${arr[0]*1+1}_${arr[1]*1}`;
			 }
			 let narr=newt.split('_');
			 console.log(narr)
			 if(narr[0]<0 || narr[0]>19 || narr[1]<0 || narr[1]>19 || that.flag[newt]){
			 	clearInterval(that.t);
			 	alert('game over');
			 	return;
			 }
			 that.snake.push(newt);
			 that.flag[newt]=true;
			 if(newt==that.food){
			 	document.getElementById(that.food).style.background='';
			 	that.Food();
			 }else{
			 	let last=that.snake.shift();
			 	delete that.flag[last];
				document.getElementById(last).classList.remove('color');
				
			 }
				that.Draw(); 
		},200);
		
	},
	Key:function(){
		document.onkeydown=function(e){
			let time=e.keyCode;
			if(Math.abs(time-this.dirction)==2){
				return;
			}
			this.dirction=e.keyCode;
			console.log(this.dirction)
		}.bind(this);
	},
	Food:function(){
		let x,y;
		do{
			x=Math.floor(Math.random()*20);
			y=Math.floor(Math.random()*20);
		}while(this.flag[`${x}_${y}`]);
		this.food=`${x}_${y}`;
		document.getElementById(this.food).style.background='red';
	}
	
}
