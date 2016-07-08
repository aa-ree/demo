var imgs = [],
	count = 0;

(function random(){
	var div = document.getElementById('container'),
		minX = 0,
	    maxX = div.offsetWidth,
	    minY = 0,
	    maxY = div.offsetHeight,
	    im = document.getElementsByTagName('img'),
	    pos;

		for(var i=0; i<12; i++){
			do{
				x = (Math.random() * (maxX-minX))+minX;
						y = (Math.random() * (maxY-minY))+minY;

						(x < im[i].offsetWidth) ? x : x -= im[i].offsetWidth;
						(y < im[i].offsetHeight) ? y : y -= im[i].offsetHeight;


						pos = {
							x: x,
							y: y,
							width: im[i].offsetWidth,
							height: im[i].offsetHeight
						};
			} while(check(pos));

			imgs.push(pos);
		}

		for(var i = 0; i<imgs.length; i++){
			im[i].style.cssText += "opacity:1; top: "+imgs[i].y+"px; left:"+imgs[i].x+"px;";
		}

})();
function check(pos){
	var originX = pos.x,
		originY = pos.y,
		originW = pos.x+pos.width,
		originH = pos.y+pos.height;

		for(var o =0; o<imgs.length; o++){
			currentX = imgs[o].x,
			currentY = imgs[o].y,
			currentW = imgs[o].x+imgs[o].width,
			currentH = imgs[o].y+imgs[o].height;

			if(count > 100) return false;
			if(currentX > originX && currentX < originW && currentY > originY && currentY < originH ||
				originX > currentX && originX < currentW && currentY > originY && currentY < originH ||
				currentX > originX && currentX < originW && currentY < originY && originY < currentH ||
				originX > currentX && originX < currentW && currentY < originY && originY < currentH ){
				console.log('oops, overlapping!');
				count++;
				return true;
			} else {
				console.log('not overlap now');
				continue;
			}
		}
		return false;
}
