$(function() {
    // Smile animations
    try {
        let cardWithSmile = document.querySelector('.main-card');
        let smileAnimation = bodymovin.loadAnimation({
            container: document.querySelector('#lottie-smile'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'JSON/smile.json'
        });

        setTimeout(function() {
            smileAnimation.pause();
        }, 1800);

        // Handler
        cardWithSmile.addEventListener('mouseenter', smileAnimationStart);
        cardWithSmile.addEventListener('mouseleave', smileAnimationStop);

        // Functions
        function smileAnimationOnLoad() {
            smileAnimation.goToAndPlay(0);
            setTimeout(function() {
                smileAnimation.pause();
            }, 3200);
        }
        function smileAnimationStart() {
            smileAnimation.goToAndPlay(2000);
            Thread.sleep(1000);
            smileAnimation.pause();
        }
        function smileAnimationStop() {
            smileAnimation.goToAndPlay(7800);
            setTimeout(function() {
                smileAnimation.pause();
            }, 900);
        }
    } catch (error) {
        console.log(`Lottie plugin error: ${error}`);
    }
    
    // Eyes animations
    try {
        let eyesArray = document.querySelectorAll('.photo-group .icon .eye');
        for(let i=0; i< eyesArray.length; i++) {
            let eyeAnimation = bodymovin.loadAnimation({
                container: eyesArray[i],
                renderer: 'svg',
                loop: true,
                autoplay: true,
                speed: 2,
                path: 'JSON/eye.json'
            });
            eyeAnimation.setSpeed(1.5);
        }
    } catch (error) {
        console.log(`Lottie plugin error: ${error}`);
    }

    //Get scroll width
    function getScrollWidth() {
        let div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();

        return scrollWidth;
    }

    // Jquery LazyLoad init
    try {
        $('.lazy').Lazy({
             // called after an element was successfully handled
            afterLoad: function(element) {
                try {
                    //Add parallax effect
                    if(element[0].classList.contains('petal-top__img')) {
                        let petalsTop = element[0];
                        new simpleParallax(petalsTop, {
                            delay: 0,
                            orientation: 'up',
                            scale: 2.5,
                            overflow: true,
                            delay: .8,
                            transition: 'cubic-bezier(0,0,0,1)',
                        });
                    }
                    else if(element[0].classList.contains('petal-bottom__img')) {
                        let petalsBottom = element[0];
                        new simpleParallax(petalsBottom, {
                            delay: 0,
                            orientation: 'up',
                            scale: 3,
                            overflow: true,
                            delay: .8,
                            transition: 'cubic-bezier(0,0,0,1)',
                        });
                    }
                    else if(element[0].classList.contains('petal-header__img')) {
                        let petalHeader = element[0];
                        new simpleParallax(petalHeader, {
                            delay: 0,
                            orientation: 'up',
                            scale: 1.5,
                            overflow: true,
                            delay: .8,
                            transition: 'cubic-bezier(0,0,0,1)',
                        });
                    }
                    else if(element[0].classList.contains('big-petals__img')) {
                        let bigPetals = element[0];
                        new simpleParallax(bigPetals, {
                            delay: 0,
                            orientation: 'down',
                            scale: 1.1,
                            overflow: true,
                            delay: .8,
                            transition: 'cubic-bezier(0,0,0,1)',
                        });
                    }
                    else if(element[0].classList.contains('fern-left__img')) {
                        let fernLeft = element[0];
                        new simpleParallax(fernLeft, {
                            delay: 0,
                            orientation: 'down',
                            scale: 1.2,
                            overflow: true,
                            delay: .8,
                            transition: 'cubic-bezier(0,0,0,1)',
                        });
                    }
                    else if(element[0].classList.contains('fern-left-blured__img')) {
                        let fernLeftBlured = element[0];
                        new simpleParallax(fernLeftBlured, {
                            delay: 0,
                            orientation: 'down',
                            scale: 1.05,
                            overflow: true,
                            delay: .8,
                            transition: 'cubic-bezier(0,0,0,1)',
                        });
                    }
                    else if(element[0].classList.contains('fern-right__img')) {
                        let fernRight = element[0];
                        new simpleParallax(fernRight, {
                            delay: 0,
                            orientation: 'down',
                            scale: 1.2,
                            overflow: true,
                            delay: .8,
                            transition: 'cubic-bezier(0,0,0,1)',
                        });
                    }
                    else if(element[0].classList.contains('fern-right-blured__img')) {
                        let fernRightBlured = element[0];
                        new simpleParallax(fernRightBlured, {
                            delay: 0,
                            orientation: 'down',
                            scale: 1.05,
                            overflow: true,
                            delay: .8,
                            transition: 'cubic-bezier(0,0,0,1)',
                        });
                    }
                } catch (error) {
                    console.log(`Parralax error: ${error}`);
                }
            }
        });
    } catch (error) {
        console.log(`LazyLoad plugin error: ${error}`);
    }

    //AOS
    try {
        AOS.init({
            duration: 1000, 
        });
    } catch (error) {
        console.log(`AOS plugin error: ${error}`);
    }

    // Smooth Scroll
    try {
        SmoothScroll({ 
            animationTime: 900,
            stepSize: 85,
        });
    } catch (error) {
        console.log(`SmoothScroll plugin error: ${error}`);
    }

    // Change active menu item on scroll
    $(document).on("scroll", onScroll);
    function onScroll(event){
        let scrollPos = $(document).scrollTop();
        $('.menu a').each(function () {
            let currLink = $(this);
            let refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.menu a').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }   

    //  Show ymaps on scroll
    let point = $('#discounts');
    let pointTop = point.offset().top;
    let handler = function () {
        let windowTop = $(this).scrollTop();
        if (windowTop > pointTop) {
            $('#map').html('<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A7ebdb72eaffd8f5252bee2db8223a3e5d51e60278d52b1cc7e6b2288974cfa42&amp;width=100%&amp;height=100%&amp;lang=ru_RU&amp;scroll=false"></script>');
            $(window).unbind( "scroll", handler );
        }
    };
    $(window).bind( "scroll", handler );     
    
    // Fern animation on hover to price card
    let priceCard = document.querySelector('#prices .price-card');
    let ferns = document.querySelectorAll('.ferns .fern');
    priceCard.addEventListener('mouseover', function() {
        ferns.forEach(fern => {
            fern.classList.add('active');
        })
    });
    priceCard.addEventListener('mouseout', function() {
        ferns.forEach(fern => {
            fern.classList.remove('active');
        })
    });
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