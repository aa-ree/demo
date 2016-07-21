function Counter(timer, per) {
	if(!(this instanceof Counter)){
		return new Counter(timer, per);
	}
	this.timer = timer;
	this.per = per;

	var loadedimages = 0;
	this.imageLoaded = function(){
		loadedimages++;
		if(loadedimages === 12){
			this.start();
		}
	}
	this.imageInfo = [];
}

Counter.prototype.init = function() {
	var div = document.getElementById('container'),
		fragment = document.createDocumentFragment(),
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
			images[l] = document.createElement('img');
			images[l].onload = function(){
				var info = {
					id: this.id,
					width: this.width,
					height: this.height
				}
				that.imageInfo.push(info);
				that.imageLoaded();
			}
			images[l].src = 'images/'+ arr[l] +'.png';
			images[l].id = 'zodiac'+ l;
			fragment.appendChild(images[l]);
		}
		div.appendChild(fragment);
}

Counter.prototype.start = function() {
	var image = document.getElementsByTagName('img'),
	    div = document.getElementById('container'),
	    winWidth = window.screen.width,
	    winheight = window.screen.height,
	    divWidth = div.offsetWidth,
     	divHeight = div.offsetHeight,
	    i = 120, j = 0, imgs = [],
     	timerId, printId,
     	isTouch = false,
     	that = this,
	    count = function() {
	    	if(i <= 120 && i > 0) {
	    		i--;
	    	} else {
	    		clearInterval(timerId);
				this.timer = 0;
	    	}
	    },
	    orientationChange = function(e){
	    	var deviceHeight, deviceWidth;

	    	if(window.orientation === 90 || window.orientation === -90){
	    		deviceHeight = window.screen.width;
		    	deviceWidth = window.screen.height;
		    } else {
		    	deviceHeight = window.screen.height;
		    	deviceWidth = window.screen.width;
		    }
		   
		    var	widthOppo = parseFloat((deviceWidth / deviceHeight).toFixed(3)),
		    	heightOppo = parseFloat((deviceHeight / deviceWidth).toFixed(3)),
		    	i = 0, newImg = [];
				div.offsetWidth = deviceWidth;

		    	for (var img of imgs) {
		    		var new_img = {
		    			x: Math.ceil(img.x * widthOppo),
		    			y: Math.ceil(img.y * widthOppo),
		    			width: img.width,
		    			height: img.height
		    		};

		    		img.x = new_img.x;
		    		img.y = new_img.y;
    				printImg(i, img);
    				i++;
		    	}
	    },
	    printImg = function(j,img){
	    	image[j].style.cssText += "opacity: 1;top: "+ img.y +"px; left:"+ img.x +"px;";
			image[j].setAttribute("draggable", true);
			image[j].addEventListener("touchstart", dragStart, false);
    		image[j].addEventListener("touchmove", drop, false);
	    },
	    draw = function() {
	    	if(j < 12) {
				printImg(j,imgs[j]);
				j++;
	    	} else {
	    		clearInterval(printId);
	    		this.per = 0;	
	    	}
	    },
	    paint = function() {
	    	var maxX = divWidth,
			    maxY = divHeight,
			    info = that.imageInfo,
			    pos, x, y;

			    for(var r = 0; r < info.length; r++){
			    	do{
						x = Math.random() * maxX;
						y = Math.random() * maxY;

						( maxX > x + info[r].width) ? x : x -= info[r].width;
						( maxY > y + info[r].height) ? y : y -= info[r].height;

						pos = {
							x: x,
							y: y,
							width: info[r].width,
							height: info[r].height
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
	    },
	    dragStart = function(ev){
	    	ev.preventDefault();
	    	var touch = ev.changedTouches[0];
	   			isTouch = true;
	    		handler(touch, touch.target.id);
	    },
	    drop = function(ev){
	    	ev.preventDefault();
	    	var touch = ev.targetTouches[0];
	    		handler(touch, touch.target.id);
	    },
	    handler = function(touch, id){
        	var image = document.getElementById(id),
	    		halfH = image.offsetHeight / 2,
	    		halfW = image.offsetWidth / 2,
	    		top = touch.pageY - halfH,
	    		left = touch.pageX - halfW,
	    		index = id.split("zodiac")[1];

	    		imgs[index].x = left;
	    		imgs[index].y = top;
	    		if(isTouch && touch.pageX + halfW < div.offsetWidth && touch.pageY + halfH  < div.offsetHeight &&
	    		  touch.pageX > div.offsetLeft + halfW && touch.pageY > div.offsetTop + halfH){
	    			image.style.top = top + 'px';
	    			image.style.left = left + 'px';
	    		}
	    };

        paint();
		timerId = setInterval(count, this.timer);
		printId = setInterval(draw, this.per);
		window.addEventListener('orientationchange', orientationChange);  
}

window.onload = function(){
	var c = new Counter(1000, 10000);
	c.init();
}