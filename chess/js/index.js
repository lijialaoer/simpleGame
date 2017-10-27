/*
* @Author: lenovo
* @Date:   2017-10-26 10:11:30
* @Last Modified by:   lenovo
* @Last Modified time: 2017-10-27 08:43:56
*/
$(function(){
	let ul=$('ul');
	let hei={},bai={},blank={};
	let a,b,c,d;
	let flag=1;
 for(let i=0;i<15;i++){
 	$('<div class="hang">').appendTo(ul);
 	$('<span class="lie">').appendTo(ul);
 	for(let j=0;j<15;j++){
 		blank[i+'_'+j]={i,j};
 		$('<li class="qizi">').appendTo(ul).prop('id',`${i}-${j}`).data('pos',{i,j});
 	}	
 }

$('button.man').on('click',function(){
	ren();
})
$('button.copmuter').on('click',function(){
	com();
})
$('button.rev').on('click',function(){
	$('li').removeClass('hei').removeClass('bai');
	hei={};bai={};
	a=b=c=d=0;
	flag=1;
})
function ren(){
	ul.on('click','li[class=qizi]',function(e){
	let ele=$(e.target);
	let data=ele.data('pos');
	if(flag){
		ele.addClass('hei');
		hei[data.i+'_'+data.j]=true;
		if(pan(data,hei)>=5){
			alert('黑棋赢');
			ul.off();
		}
	}else{
		ele.addClass('bai');
		bai[data.i+'_'+data.j]=true;
		if(pan(data,bai)>=5){
			alert('白棋赢');
			ul.off();
		}
	}
	flag = !flag;
	})
}

	

	function pan(pos,obj){
		let row=1,col=1,zx=1,yx=1;
		let x=pos.i,y=pos.j;
		 x=pos.i,y=pos.j+1;
		while(obj[x+'_'+y]){
			row++;
			y++;
		}
		y=pos.j-1;
		while(obj[x+'_'+y]){
			row++;
			y--;
		}

		x=pos.i+1;y=pos.j;
		while(obj[x+'_'+y]){
			col++;
			x++;
		}
		x=pos.i-1;
		while(obj[x+'_'+y]){
			col++;
			x--;
		}

		x=pos.i+1;y=pos.j-1;
		while(obj[x+'_'+y]){
			zx++;
			x++;
			y--;
		}
		x=pos.i-1;y=pos.j+1;
		while(obj[x+'_'+y]){
			zx++;
			x--;
			y++;
		}

		x=pos.i-1;y=pos.j-1;
		while(obj[x+'_'+y]){
			yx++;
			x--;
			y--;
		}
		x=pos.i+1;y=pos.j+1;
		while(obj[x+'_'+y]){
			yx++;
			x++;
			y++;
		}
		a=row;b=col;c=zx;d=yx;
		return Math.max(row,col,zx,yx);
	}

	function com(){
		ul.on('click','li[class=qizi]',function(e){
				let ele=$(e.target);
				let data=ele.data('pos');
					ele.addClass('hei');
					hei[data.i+'_'+data.j]=true;
					delete blank[data.i+'_'+data.j];
					if(pan(data,hei)>=5){
						alert('黑棋赢');
						ul.off();
					}

				let ale=ai();
				$(`#${ale.i}-${ale.j}`).addClass('bai');
				bai[ale.i+'_'+ale.j]=true;
				delete blank[ale.i+'_'+ale.j];
					if(pan(ale,bai)>=5){
					alert('白棋赢');
					ul.off();
				}

				
		})
	}
	function ai(){
		let rmax=amax=-Infinity;
		let rzuo=azuo=null;
		for(let i in blank){
			let fen=pan(blank[i],bai);
			if(fen>=amax){
				amax=fen;
				azuo=blank[i];
			}
		}
		for(let i in blank){
			let fen=pan(blank[i],hei);
			if(fen>=rmax){
				rmax=fen;
				rzuo=blank[i];
			}
		}

		return (amax>=rmax)?azuo : rzuo;
	}

})


