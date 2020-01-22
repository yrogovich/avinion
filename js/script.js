$(function() {
    // Eyes animations
    let eyesArray = document.querySelectorAll('.photo-group .icon .eye');
    for(let i=0; i< eyesArray.length; i++) {
        let eyeAnimation = bodymovin.loadAnimation({
            container: eyesArray[i],
            renderer: 'svg',
            loop: true,
            autoplay: true,
            speed: 2,
            path: 'json/eye.json'
        });
        eyeAnimation.setSpeed(1.5);
    }

    // Smile animations
    let cardWithSmile = document.querySelector('.main-card');
    let smileAnimation = bodymovin.loadAnimation({
        container: document.querySelector('#lottie-smile'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'json/smile.json'
    });
    // Handler
    cardWithSmile.addEventListener('mouseenter', smileAnimationStart);
    cardWithSmile.addEventListener('mouseleave', smileAnimationStop);
    // Functions
    totalDuration = cardWithSmile.totalFrames / cardWithSmile.frameRate*1000;
    function smileAnimationStart() {
        smileAnimation.goToAndPlay(0);
        setTimeout(function() {
            smileAnimation.pause();
        }, 5000);
    }
    function smileAnimationStop() {
        smileAnimation.goToAndPlay(7000);
    }

    // Jquery LazyLoad init
    $('.lazy').Lazy();

    //AOS
    AOS.init({
        duration: 1000, 
    });

    // Smooth Scroll
    SmoothScroll({ 
        animationTime: 900,
        stepSize: 85,
    });

    // Form handler
    function callHandler(form) {
        console.log('form func is running');
        let  msg = jQuery(form).serialize();
        jQuery.ajax({
            type: 'POST',
            url: '<?php bloginfo("template_url"); ?>/src/send.php',
            data: msg,
            success: function(data) {
                console.log('form ok');
                jQuery.fancybox.open({ // FancyBox 3
                    src: '#thanks-modal', 
                    modal: true
                });
                setTimeout(() => {
                    jQuery.fancybox.close();
                    jQuery.fancybox.close();
                }, 2000);
            },
            error: function () {
                console.log('form error');
            }
        });
    }
});

// Youtube
(function() {
	let youtube = document.querySelectorAll( ".youtube" );	
	for (let i = 0; i < youtube.length; i++) {		
		let source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";		
		let image = new Image();
        image.src = source;
        image.addEventListener( "load", function() {
            youtube[ i ].appendChild( image );
        }( i ) );		
        youtube[i].addEventListener( "click", function() {
            let iframe = document.createElement( "iframe" );
                    iframe.setAttribute( "frameborder", "0" );
                    iframe.setAttribute( "allowfullscreen", "" );
                    iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );
                    this.innerHTML = "";
                    this.appendChild( iframe );
        } );	
	};	
})();