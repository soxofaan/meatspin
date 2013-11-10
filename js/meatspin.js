

(function($) {

    // Simple Helper function to handle plurals in counter text.
    var plural = function(count, caseZero, caseOne, caseTens, caseRest) {
        if (count === 0) {
            return caseZero.replace('%d', count);
        }
        else if (count === 1) {
            return caseOne.replace('%d', count);
        }
        else if (count % 10 === 0) {
            return caseTens.replace('%d', count);
        }
        else {
            return caseRest.replace('%d', count);
        }
    };

    // Add custom 'inandout' easing function
    $.extend(
        $.easing,
        {
            inandout: function(p) { return 4 * p * (1 - p);}
        }
    );


    // Define meatspin as a jquery plugin.
    $.fn.meatspinCounter = function(animationDuration) {

        if (!animationDuration) {
            return;
        }

        var counterElement = $(this);
        var animationStartTime = (new Date().getTime()) / 1000;

        function updateCounter() {
            var now = (new Date().getTime()) / 1000;
            var count = Math.floor((now - animationStartTime) / animationDuration);
            var counterText = plural(count, 'No full spin yet.', '%d spin, nice.', "That's %d spins already!", '%d spins already.');
            if (counterText !== counterElement.text()) {
                counterElement.text(counterText);
                counterElement.addClass('changed');
            }
            else {
                counterElement.removeClass('changed');
            }
        }
        function keepUpdatingCounter() {
            updateCounter();
            setTimeout(keepUpdatingCounter, 100);
        }

        // Start animation.
        keepUpdatingCounter();

    };


})( jQuery );
