
"use strict";
(function () {

	let radius = 400; // how big of the radius
	let autoRotate = true; // auto rotate or not
	let rotateSpeed = -60; // unit: seconds/360 degrees
	let imgWidth = 120; // width of images (unit: px)
	let imgHeight = 140; // height of images (unit: px)

	setTimeout(init, 2000);

	const odrag = document.getElementById('drag-container');
	const ospin = document.getElementById('spin-container');
	const allImg = ospin.getElementsByTagName('img');
	const allVid = ospin.getElementsByTagName('video');
	const allMedia = [...allImg, ...allVid]; // combine 2 arrays

	// Size of images
	ospin.style.width = imgWidth + "px";
	ospin.style.height = imgHeight + "px";

	function init(delayTime) {
		for (let i = 0; i < allMedia.length; i++) {
			allMedia[i].style.transform = "rotateY(" + (i * (360 / allMedia.length)) + "deg) translateZ(" + radius + "px)";
			allMedia[i].style.transition = "transform 1s";
			allMedia[i].style.transitionDelay = delayTime || (allMedia.length - i) / 4 + "s";
		}
	}

	let sX, sY, nX, nY, desX = 0,
		desY = 0,
		tX = 0,
		tY = 10;

	// auto spin
	if (autoRotate) {
		const animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
		ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
	}

	function applyTranform(obj) {
		// Constrain the angle of camera (between 0 and 180)
		if (tY > 180) tY = 180;
		if (tY < 0) tY = 0;

		// Apply the angle
		obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
	}

	function playSpin(yes) {
		ospin.style.animationPlayState = (yes ? 'running' : 'paused');
	}


	// setup events
	document.onpointerdown = function (e) {
		clearInterval(odrag.timer);
		e = e || window.event;
		sX = e.clientX;
		sY = e.clientY;

		this.onpointermove = function (e) {
			e = e || window.event;
			nX = e.clientX;
			nY = e.clientY;
			desX = nX - sX;
			desY = nY - sY;
			tX += desX * 0.1;
			tY += desY * 0.1;
			applyTranform(odrag);
			sX = nX;
			sY = nY;
		};

		this.onpointerup = function (e) {
			odrag.timer = setInterval(function () {
				desX *= 0.95;
				desY *= 0.95;
				tX += desX * 0.1;
				tY += desY * 0.1;
				applyTranform(odrag);
				playSpin(false);
				if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
					clearInterval(odrag.timer);
					playSpin(true);
				}
			}, 17);
			this.onpointermove = this.onpointerup = null;
		};

		return false;
	};

	



	const all_cards = document.getElementsByClassName('knowledge-card');

	// Loop over them and prevent submission
	Array.prototype.slice.call(allImg)
		.forEach(function (img) {
			img.addEventListener('click', function (event) {
				const target = img.getAttribute("data-info-target");
				// console.log('click in image', target);



				for (const card of all_cards) {
					card.hidden = true;

				}


				document.getElementById(target).hidden = false;
			}, false)
		});



})();