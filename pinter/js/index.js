/*
* @Author: lenovo
* @Date:   2017-10-10 11:07:38
* @Last Modified by:   lenovo
* @Last Modified time: 2017-10-13 09:20:11
*/
window.onload=function(){
	let can=document.querySelector('canvas');
	let era=document.querySelector('.earser');
	let clipp=document.querySelector('.clipp');
	console.log(getComputedStyle(era,null).width)
	let opt=document.querySelector('.opt');
	let color=document.querySelectorAll('input');
	let li=document.querySelectorAll('.tools>li');

	
	 
	let tool=document.querySelectorAll('.tool');
	let eraser=document.querySelector('#eraser');
	let stroke=document.querySelector('#styles');
	let fill=document.querySelector('#stylef'); 
	let colors=document.querySelector('#colors');
	let colorf=document.querySelector('#colorf');
	let font=document.querySelector('#font');
	let clip=document.querySelector('#clip');
	let cdel=document.querySelector('#cdelete');
	let ssave=document.querySelector('#ssave');
	let neww=document.querySelector('#neww');
	let revrese=document.querySelector('#revrese');
	let clr=document.querySelector('#clear');
	let linew=document.querySelector('#linew');
	let linecap=document.querySelector('#linecap');
	let optbtn=document.querySelectorAll('#linew>option');
	let optbtns=document.querySelectorAll('#licap>option');

   	let bottom=document.querySelector('.bottom');
	let ctx=can.getContext("2d");
	can.width=bottom.offsetWidth-2;
	can.height=bottom.offsetHeight-2;
	let pin=new pinter(can,ctx,opt);

	li.forEach(element =>{
		element.onclick=function(){
			document.querySelector('li[active=true]').setAttribute('active',false);
			this.setAttribute('active',true);
		}
	})
	eraser.onclick=function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
		this.setAttribute('active',true);	
		let w=prompt('输入大小',30);
		pin.eraser(w,era);
	}
	pin.draw('line');
	tool.forEach(element =>{
		element.onclick=function(){
			let n=0
			document.querySelector('li[active=true]').setAttribute('active',false);
			this.setAttribute('active',true);
			if(this.id=='pencil'){
				pin.pencil();
				return;
			}
			if(this.id=='poly' || this.id=='angle'){
				n=prompt('输入边数',5);
			}
			pin.draw(this.id,n);
		}
	})

	stroke.onclick=function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
			this.setAttribute('active',true);
		pin.style='stroke';
	}
	color[0].onclick=function(){
		color[0].onblur=function(){
			 pin.strokeStyle=color[0].value;
		}
	}
	fill.onclick=function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
		this.setAttribute('active',true);
		pin.style='fill';

	}
	color[1].onclick=function(){
		color[1].onblur=function(){
			pin.fillStyle=color[1].value;
			
		}
	}
	
	font.onclick=function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
		this.setAttribute('active',true);
		let n=prompt('输入大小',18);
		color[1].onclick();
		pin.font(n);
	}
	clip.onclick=function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
		this.setAttribute('active',true);
		pin.clip(clipp);
	}
	cdel.onclick=function(){
		pin.cdel();
	}
	ssave.onclick=function(){
		let data=can.toDataURL('image/png');
		ssave.href=data;
		ssave.download='tu.png';
	}
	neww.onclick=function(){
		let flag=confirm('是否保存');
		if(flag){
			ssave.download=can.toDataURL('image/png').replace(' ');
		}
		pin.clearAll(); 
	}

	revrese.onclick=function(){
		pin.revers();
	}

	clr.onclick=function(){
		pin.clearAll(); 
	}
	linew.onclick=function(){
		pin.lineWidth=Number(linew.value);
	}

	linecap.onclick=function(){
		pin.lineCap=linecap.value;
	}
}