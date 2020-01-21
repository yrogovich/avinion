$(function() {
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

    $('.lazy').Lazy();
    
    //AOS
    AOS.init({
        duration: 1000, 
    });

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