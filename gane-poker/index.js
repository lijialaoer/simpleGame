$(function(){
	let poker=[];
	let flag={};
	let index=0;
	let first=null;
	for(let i=0;i<52;i++){
		let colors=['c','d','s','h'];
		let hua=colors[Math.floor(Math.random()*colors.length)];
		let n=Math.floor(Math.random()*13+1);
		while(flag[`${hua}_${n}`]){
			hua=colors[Math.floor(Math.random()*colors.length)];
		 	n=Math.floor(Math.random()*13+1);
		}
		poker.push({hua,n});
		flag[`${hua}_${n}`]=true;

	}
	for(let i=0;i<7;i++){
		for(let j=0;j<=i;j++){
			let left=300-50*i+100*j;
			let top=i*60;
			$('<div>').addClass('face shang').attr('id',`${i}_${j}`).css('background-image',`url(img/${poker[index].n}${poker[index].hua}.jpg)`).appendTo('.desk').delay(index*10).animate({left,top,opacity:1}).data('num',poker[index].n);
			index++;

		}
	}

	for(;index<poker.length;index++){
		$('<div>').addClass('face zuo').css('background-image',`url(img/${poker[index].n}${poker[index].hua}.jpg)`).appendTo('.desk').delay(index*10).animate({left:0,top:500,opacity:1}).attr('id',`${-2}_${-2}`).data('num',poker[index].n);
	}

	$('.desk').on('click','.face',function(e){
		let li=$(e.target);
		let ids=li.attr('id').split('_');
		let ele1=`#${ids[0]*1+1}_${ids[1]*1}`;
		let ele2=`#${ids[0]*1+1}_${ids[1]*1+1}`;
		if($(ele1).length || $(ele2).length){
			return;
		}
		li.toggleClass('active');
		if(li.hasClass('active')){
			li.animate({top:'-=10'});
		}else{
			li.animate({top:'+=10'});
		}

		if(!first){
			first=$(e.target);
		}else{

			if(first.data('num')==li.data('num')){
				$('.active').animate({top:0,left:600,opacity:0},function(){
					$(this).remove();
				})
			}else{	

				$('.active').animate({top:'+=10'},function(){
					$(this).removeClass('active');
				})
			}
			first=null;
		}
	})

	let btnr=$('button.right');
	let btnl=$('button.left');
	let z=0;
	let toper;
	btnr.on('click',function(){
		$('.zuo').last().animate({left:600}).removeClass('zuo').addClass('you').css('z-index',z++);
		
	})

	btnl.on('click',function(){
		$('.you').each(function(index){
			$(this).css('z-index',z++).delay(index*100).animate({left:0}).removeClass('you').addClass('zuo');
		})
		
	})


	
})