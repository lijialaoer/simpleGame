function Game(){
	this.charArr=[['A','img/a.jpg'],
	['B','img/b.jpg'],
	['C','img/c.jpg'],
	['D','img/d.jpg'],
	['E','img/e.jpg'],
	['F','img/f.jpg'],
	['G','img/g.jpg'],
	['H','img/h.jpg'],
	['I','img/i.jpg'],
	['J','img/j.jpg'],
	['K','img/k.jpg'],
	['L','img/l.jpg'],
	['M','img/m.jpg'],
	['N','img/n.jpg'],
	['O','img/o.jpg'],
	['P','img/p.jpg'],
	['J','img/q.jpg'],
	['R','img/r.jpg'],
	['S','img/s.jpg'],
	['T','img/t.jpg'],
	['U','img/u.jpg'],
	['V','img/v.jpg'],
	['W','img/w.jpg'],
	['X','img/x.jpg'],
	['Y','img/y.jpg'],
	['Z','img/z.jpg']];
	this.current=[];
	this.pos=[];
	this.num=5;
	this.s=10;
	this.score=0;
	this.hp=10;
	this.gk=10;
	this.fen=document.querySelector('.score > span');
	this.life=document.querySelector('.life>span');
	
}
Game.prototype={
	getChars:function(){
		for(let i=0;i<this.num;i++){
			this.getChar();
		}
	},
	star:function(){
		this.getChars();
		this.Drop();
		this.key();

	},
	getChar:function(){
		let j=Math.floor(Math.random()*this.charArr.length);
		let divs=document.createElement('div');
		divs.classList.add('char');
		divs.innerText=this.charArr[j][0];
		
		while(this.checkword(divs.innerText)){
			j=Math.floor(Math.random()*this.charArr.length);
			divs.innerText=this.charArr[j][0];
		}
		
		let tops=Math.random()*100;
		let lefts=(innerWidth-400)*Math.random()+200;
		

		while(this.checkpos(lefts)){
			lefts=(innerWidth-400)*Math.random()+200;
		}

		divs.style.cssText=`top:${tops}px;left:${lefts}px;background-image:url('${this.charArr[j][1]}');`;
		console.log(divs.style.cssText)
		document.body.appendChild(divs);
		this.current.push(divs);
		this.pos.push(lefts);
		
	},
	checkword:function(word){
		let flag=this.current.some(function(v){
			return v.innerText==word;
		})
		return flag;
	},
	checkpos:function(lefts){
		let flag=this.pos.some(function(v){
			return Math.abs(v-lefts)<100;
			
		})
		return flag;
	},
	Drop:function(){
		let that=this;
		this.t=setInterval(function(){
			for(let i=0;i<that.current.length;i++){
				let tops=that.current[i].offsetTop+that.s;
				that.current[i].style.top=tops+'px';
				if(tops>=400){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.pos.splice(i,1);
					that.getChar();
					that.life.innerText=--that.hp;
					if(that.hp<=0){
						let f=confirm('你死了，重来否？');
							if(f){
								that.restar();
							}else{
								close();
							}
					}
					
				}
			}
		},300)
	},
	key:function(){
		let that=this;
		document.onkeydown=function(e){
			for(let i=0;i<that.current.length;i++){
				if(that.current[i].innerText== String.fromCharCode(e.keyCode)){
					that.score+=2;
					that.fen.innerText=that.score;
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.pos.splice(i,1);
					that.getChar();
					if(that.score==that.gk){
						let f=confirm('成功，是否进入下一关？');
							if(f){
								that.next();
							}else{
								that.restar();
							}
						
					}
				}
			}

		}
	},
	next:function(){
		clearInterval(this.t);
		this.current.forEach(element =>{
			document.body.removeChild(element);
		})
		this.current.length=0;
		this.pos.length=0;
		this.score=0;
//		this.gk=10;
		if(this.num>=8){
			this.s+=5;
			this.hp+=5;
		}else{
			this.num++;
			this.gk+=10;
		}
		this.star();
	},
	restar:function(){
		clearInterval(this.t);
		this.current.forEach(element =>{
			document.body.removeChild(element);
		})
		this.current.length=0;
		this.pos.length=0;
		this.score=0;
		this.fen.innerText=this.score;
		this.num=5;
		this.hp=10;
		this.life.innerText=this.hp;
		this.star();
	}
	
	
	
	
	
	
	
	
	
}


