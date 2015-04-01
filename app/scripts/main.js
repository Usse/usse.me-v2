
var USSE = USSE || {};



USSE.navigation = USSE.navigation || (function() {
		'use strict';
		var $sections = $('section.block'),
				$pageHeight = $(window).outerHeight();

		function init() {
			window.scrollTo(0, 1);
			setHeight();
		}
		function resize() {
			$pageHeight = $(window).outerHeight();
			setHeight();
		}
		function setHeight() {
			if (!Modernizr.mq('only screen and (max-width:768px)')) {
				$sections.eq(0).css({
					height : $pageHeight
				});
			}
			else {
				$sections.css({
					height : 'auto'
				});
			}
		}

    return {
        init: init,
        resize : resize
    };

}());



USSE.graph = USSE.graph || (function() {
	'use strict';
	function init() {
		$('#chart svg').remove();
		var w = $(window).width() -2, h = $('section.block').eq(0).height();

		var vertices = d3.range(100).map(function() {
			return [Math.random() * w, Math.random() * h];
		});

		svg = d3.select('#chart')
			.append('svg:svg')
			.attr('width', w)
			.attr('height', h)
			.attr('class', 'PiYG')
			.on('mousemove', update);

		svg.selectAll('path')
			.data(d3.geom.voronoi(vertices))
			.enter().append('svg:path')
			.attr('class', function(d, i) { return i ? 'q' + (i % 9) + '-9' : null; })
			.attr('d', function(d) { return 'M' + d.join('L') + 'Z'; });

		svg.selectAll('circle')
			.data(vertices.slice(1))
			.enter().append('svg:circle')
			.attr('transform', function(d) { return 'translate(' + d + ')'; })
			.attr('r', 2);

		function update() {
			vertices[0] = d3.svg.mouse(this);
			svg.selectAll('path')
				.data(d3.geom.voronoi(vertices)
				.map(function(d) { return 'M' + d.join('L') + 'Z'; }))
				.filter(function(d) { return this.getAttribute('d') !== d; })
				.attr('d', function(d) { return d; });
        }
	}

    var resize  =
        debounce(function() {
            console.log('Woooooo');
            USSE.graph.init();
        }, 50);


	return {
		init : init,
        resize : resize
	}
}());




var svg = null;

$(document).ready(function() {
	USSE.navigation.init();
	USSE.graph.init();
});


$(window).resize(function() {
	USSE.navigation.resize();
    USSE.graph.resize();

});
