/*
* @Author: lenovo
* @Date:   2017-10-10 11:55:22
* @Last Modified by:   lenovo
* @Last Modified time: 2017-10-12 13:57:56
*/
class pinter{
	constructor(can,ctx,opt){
		this.can=can;
		this.opt=opt;
		this.ctx=ctx;
		this.canw=this.can.width;
		this.canh=this.can.height;
		this.arr=[];

		this.style='stroke';
		this.strokeStyle='#000';
		this.fillStyle='#000';
		this.lineWidth=1;
		this.lineCap='butt';

		this.temp=null;

	}
	init(){
		this.ctx[this.style]();
		this.ctx.lineWidth=this.lineWidth;
		this.ctx.lineCap=this.lineCap;
		this.ctx.strokeStyle=this.strokeStyle;
		this.ctx.fillStyle=this.fillStyle;
	}
	line(dx,dy,mx,my){
	
		this.ctx.moveTo(dx,dy);
		this.ctx.lineTo(mx,my);
		this.ctx.setLineDash([3,0]);
	}
	dash(dx,dy,mx,my){
		
		this.ctx.moveTo(dx,dy);
		this.ctx.lineTo(mx,my);
		this.ctx.setLineDash([3,5]);
	}
	circle(dx,dy,mx,my){
		let r=Math.hypot(dx-mx,dy-my);		
		this.ctx.arc(dx,dy,r,0, Math.PI*2);	
						
	}
	rect(dx,dy,mx,my){
		let w=Math.abs(dx-mx),h=Math.abs(dy-my);
		let minx=dx>=mx ? mx : dx;
		let miny=dy>=my ? my : dy;
		if(this.style=='stroke'){
			this.ctx.strokeRect(minx, miny, w, h);
		}else if(this.style=='fill'){
			this.ctx.fillRect(minx, miny, w, h);
		}
		
	}
	poly(dx,dy,mx,my,n){
		
		let rad=Math.PI*2/n;
		let r=Math.hypot(dx-mx,dy-my);
		this.ctx.moveTo(dx+r,dy)
		for(let i=0;i<n;i++){
			let x=dx+r*Math.cos(rad*i),y=dy+r*Math.sin(rad*i)
			this.ctx.lineTo(x,y);
		}
		this.ctx.closePath();		
	}
	angle(dx,dy,mx,my,n){
		
		let rad=Math.PI/n;
		let r=Math.hypot(dx-mx,dy-my);
		this.ctx.moveTo(dx+r,dy)
		for(let i=0;i<2*n;i++){
			let sr = i%2==0 ? r : r/2;
			let x=dx+sr*Math.cos(rad*i),y=dy+sr*Math.sin(rad*i)
			this.ctx.lineTo(x,y);
		}
		this.ctx.closePath();	
	}
	draw(type,n){
		this.opt.onmousedown=function(e){
			let dx=e.offsetX,dy=e.offsetY;
			this.opt.onmousemove=function(e){
				let mx=e.offsetX,my=e.offsetY;
				this.ctx.clearRect(0, 0, this.canw, this.canh);
				if(this.arr.length){
					this.ctx.putImageData(this.arr[this.arr.length-1],0,0)
				}
				this.ctx.beginPath();
				this.init();
				this[type](dx,dy,mx,my,n);
				this.init();
			}.bind(this)
			this.opt.onmouseup=function(){
				this.arr.push(this.ctx.getImageData(0, 0,this.canw, this.canh));
				this.opt.onmousemove=null;
			}.bind(this)
		}.bind(this)
	}
	pencil(){
		this.opt.onmousedown=function(e){
			let dx=e.offsetX,dy=e.offsetY;
			this.ctx.beginPath();
			this.ctx.moveTo(dx,dy);
			this.opt.onmousemove=function(e){
				let mx=e.offsetX,my=e.offsetY;
				this.ctx.clearRect(0, 0, this.canw, this.canh);
				if(this.arr.length){
					this.ctx.putImageData(this.arr[this.arr.length-1],0,0)
				}
				this.ctx.lineTo(mx,my);
				this.ctx.setLineDash([3,0]);
				this.ctx.stroke();
			}.bind(this)
			this.opt.onmouseup=function(){
				this.arr.push(this.ctx.getImageData(0, 0,this.canw, this.canh));
				this.opt.onmousemove=null;
			}.bind(this)
		}.bind(this)
	}

	eraser(w,era){
		this.opt.onmousedown=function(e){
			e.preventDefault();
			era.style.display='block';
			let dx=e.offsetX-w/2,dy=e.offsetY-w/2;
			era.style.left=dx+'px';
			era.style.top=dy+'px';
			era.style.width=w+'px';
			era.style.height=w+'px'; 
			this.opt.onmousemove=function(e){
				e.preventDefault();
				let x=e.offsetX-w/2,y=e.offsetY-w/2;
				if(x>=this.can.offsetWidth-w){
					x=this.can.offsetWidth-w;
				}
				if(x<=0){
					x=0
				}
				if(y>=this.can.offsetHeight-w){
					y=this.can.offsetHeight-w;
				}
				if(y<=0){
					y=0
				}
				era.style.left=x+'px';
				era.style.top=y+'px';
				this.ctx.clearRect(x,y,w,w);
			}.bind(this)
			this.opt.onmouseup=function(){
				era.style.display='none';
				this.arr.push(this.ctx.getImageData(0, 0,this.canw, this.canh));
				this.opt.onmousemove=null;
			}.bind(this)
		}.bind(this)
	}

	font(n){
		let that=this;
		let lefts,tops;

		that.opt.ondblclick=function(e){
			that.opt.onmousedown=null;
			let dbx=e.offsetX,dbh=e.offsetY;
			let divs=document.createElement('div');
			divs.contentEditable=true;
			divs.style.cssText=`width:100px;height:20px;border:1px dashed blue;position:absolute;left:${dbx}px;top:${dbh}px;cursor:move;`;
			this.appendChild(divs);
			divs.onmousedown=function(e){
				let cx=e.clientX,cy=e.clientY;
				let divx=this.offsetLeft;
				let divh=this.offsetTop;
				that.opt.onmousemove=function(e){
					e.preventDefault();
					let ox=e.clientX,oy=e.clientY;
					lefts=divx+ox-cx;
					tops=divh+oy-cy;
					if(lefts>=that.canw-100){
						lefts=that.canw-100;
					}
					if(lefts<=0){
						lefts=0;
					}
					if(tops>=that.canh-20){
						tops=that.canh-20;
					}
					if(tops<=0){
						tops=0;
					}
					divs.style.left=lefts+'px';
					divs.style.top=tops+'px';
					
				}
				that.opt.onmouseup=function(){
					that.opt.onmousemove=null;
				}
			}
			divs.onblur=function(){
				let value=this.innerText;
				that.opt.removeChild(divs);
				that.ctx.font=`bold ${n}px sans-serif`;
				that.ctx.textAlign='center';
				that.ctx.textBaseLine='middle';
				that.init();
				if(that.style=='stroke'){
					that.ctx.strokeText(value,lefts,tops);
				}else if(that.style=='fill'){
					that.ctx.fillText(value,lefts,tops);
				}
				
				that.arr.push(that.ctx.getImageData(0, 0,that.canw, that.canh));
			}
		}
	}


	clip(obj){
		let that=this;
		let minx,miny,w,h;
		this.opt.onmousedown=function(e){
			obj.style.display='block';
			let dx=e.offsetX,dy=e.offsetY;
			that.opt.onmousemove=function(e){
				let mx=e.offsetX,my=e.offsetY;
				w=Math.abs(mx-dx);h=Math.abs(dy-my);
				minx= dx>=mx ? mx : dx;
				miny= dy>=my ? my : dy;
				obj.style.left=minx+'px';
				obj.style.top=miny+'px';
				obj.style.width=w+'px';
				obj.style.height=h+'px';
			}
			that.opt.onmouseup=function(){
				that.temp=that.ctx.getImageData(minx,miny,w,h);
				that.ctx.clearRect(minx,miny,w,h);
				that.arr.push(that.ctx.getImageData(0, 0,that.canw, that.canh));
				that.ctx.putImageData(that.temp,minx,miny);
				that.tuo(minx,miny,obj);
				that.opt.onmousemove=null;

			}
		}
	}

	tuo(x,y,obj){
		let that=this;
		this.opt.onmousedown=function(e){
			e.preventDefault();
			let dx=e.offsetX,dy=e.offsetY;
			that.opt.onmousemove=function(e){
				e.preventDefault();
				let mx=e.offsetX,my=e.offsetY;
				let lefts=x+mx-dx;
				let tops=y+my-dy;
				if(lefts>=that.canw-obj.offsetWidth){
					lefts=that.canw-obj.offsetWidth;
				}
				if(lefts<=0){
					lefts=0;
				}
				if(tops>=that.canh-obj.offsetHeight){
					tops=that.canh-obj.offsetHeight;
				}
				if(tops<=0){
					tops=0;
				}
				obj.style.left=lefts+'px';
				obj.style.top=tops+'px';
				that.ctx.clearRect(0,0,that.canw,that.canh);
				if(that.arr.length){
					that.ctx.putImageData(that.arr[that.arr.length-1],0,0)
				}
				that.ctx.putImageData(that.temp,lefts,tops);

			}
			that.opt.onmouseup=function(){
				that.arr.push(that.ctx.getImageData(0, 0,that.canw, that.canh));
				that.opt.onmousemove=null;
				that.temp=null;
				obj.style.display='none';
			}
		}
	}


	cdel(){
		this.arr.pop();
		this.ctx.clearRect(0,0,this.canw,this.canh);
		if(this.arr.length){
			this.ctx.putImageData(this.arr[this.arr.length-1],0,0);
		}else{
			alert('只能返回到这里了');
			return;
		}
	}

	clearAll(){
		this.ctx.clearRect(0,0,this.canw,this.canh);
		this.arr.push(this.ctx.getImageData(0, 0,this.canw, this.canh));
	}

	revers(){
		let imgdata=this.ctx.getImageData(0,0,this.canw,this.canh);
		for(let i=0;i<imgdata.data.length;i+=4){
			imgdata.data[i]=255-imgdata.data[i];
			imgdata.data[i+1]=255-imgdata.data[i+1];
			imgdata.data[i+2]=255-imgdata.data[i+2];

		}
		this.ctx.putImageData(imgdata,0,0);
		this.arr.push(this.ctx.getImageData(0, 0,this.canw, this.canh));
	}
}
