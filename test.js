function Counter(timer, per) {
	this.timer = timer;
	this.per = per;

	var loadedimages = 0;
	this.imageLoaded = function(){
		loadedimages++;
		if(loadedimages == 11){
			this.start();
		}
	}
}

Counter.prototype.init = function() {
	var div = document.getElementById('container'),
		arr = [],
		images = [],
		that = this;

		for(var k = 0; k < 12; k++){
			arr[k] = k;
		}
		arr.sort(function() {
			return Math.random() - 0.5;
		});
		for (var l = 0; l<12; l++) {
			images[l] = new Image();
			images[l].onload = function(){
				that.imageLoaded();
			}
			images[l].src = 'images/'+ arr[l] +'.png';
			div.appendChild(images[l]);
		}
}

Counter.prototype.start = function() {
	var image = document.getElementsByTagName('img'),
	    div = document.getElementById('container'),
	    divWidth = div.offsetWidth,
     	divHeight = div.offsetHeight,
	    i = 120,
	    j = 0,
	    imgs = [],
     	timerId, printId, 

	    count = function() {
	    	if(i <= 120 && i > 0) {
	    		i--;
	    	} else {
	    		clearInterval(timerId);
				this.timer = 0;
	    	}
	    },
	    draw = function() {
	    	if(j < 12) {
				image[j].style.cssText += "opacity: 1;top: "+ imgs[j].y +"px; left:"+ imgs[j].x +"px;";
				j++;
	    	} else {
	    		clearInterval(printId);
	    		this.per = 0;
	    	}
	    },
	    paint = function() {
	    	var maxX = divWidth,
			    maxY = divHeight,
			    pos, x, y;

			    for(var r = 0; r < image.length; r++){
					do{
						x = Math.random() * maxX;
						y = Math.random() * maxY;

						( maxX > x + image[r].offsetWidth) ? x : x -= image[r].offsetWidth;
						( maxY > y + image[r].offsetHeight) ? y : y -= image[r].offsetHeight;

						pos = {
							x: x,
							y: y,
							width: image[r].offsetWidth,
							height: image[r].offsetHeight
						};
					} while(check(pos));

					imgs.push(pos);
				}
	    },
	    check = function(pos) {
	    	var originX = pos.x,
				originY = pos.y,
				originW = pos.x + pos.width,
				originH = pos.y + pos.height;

				for(var o = 0; o < imgs.length; o++){
					var currentX = imgs[o].x,
						currentY = imgs[o].y,
						currentW = imgs[o].x + imgs[o].width,
						currentH = imgs[o].y + imgs[o].height;

					if(currentX > originX && currentX < originW && currentY > originY && currentY < originH ||
						originX > currentX && originX < currentW && currentY > originY && currentY < originH ||
						currentX > originX && currentX < originW && currentY < originY && originY < currentH ||
						originX > currentX && originX < currentW && currentY < originY && originY < currentH ){
						return true;
					} else {
						continue;
					}
				}
				return false;
	    };

        paint();
		timerId = setInterval(count, this.timer);
		printId = setInterval(draw, this.per);  
}

var c = new Counter(1000, 10000);
c.init();