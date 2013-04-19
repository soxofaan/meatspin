

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
    $.fn.meatspin = function(options) {

        // Create some defaults, extending them with any options that were provided
        var settings = $.extend( {
            'spinsPerMinute': 25,
            'targetFrameRate': 25,
            'counterTextContainer': null
        }, options);

        // Cache some elements (and avoid 'this' confusion).
        var spinElement = this;
        var counterElement = settings['counterTextContainer'];

        // Do animation calculation ourself, to ensure smoothness.
        var animationStartTime = (new Date().getTime()) / 1000;
        var setRotation = function() {
            // Update the image.
            var now = (new Date().getTime()) / 1000;
            var rotations = (now - animationStartTime) / 60 * settings['spinsPerMinute'];
            spinElement.rotate(rotations * 360);
            // Update the counter.
            if (counterElement) {
                var count = Math.floor(rotations);
                var counterText = plural(count, 'No full spin yet.', '%d spin, nice.', "That's %d spins already!", '%d spins already.');
                if (counterText !== counterElement.text()) {
                    counterElement.text(counterText);
                    // Add animation.
                    counterElement.animate({
                        'top': '-40px'
                    }, {
                        'duration': 250,
                        'easing': 'inandout'
                    });
                }
            }
        };
        var animate = function() {
            setRotation();
            setTimeout(animate, 1000 / settings['targetFrameRate']);
        };

        // Start animation.
        animate();

    };


})( jQuery );