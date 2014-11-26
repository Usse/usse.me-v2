
var USSE = USSE || {};



USSE.navigation = USSE.navigation || (function() {
		var $sections = $('section.panel'),
				$pageHeight = $(window).outerHeight();

		function init() {
			window.scrollTo(0, 1);
			setHeight();
		};
		function resize() {
			$pageHeight = $(window).outerHeight();
			setHeight();
		}
		function setHeight() {
			if (!Modernizr.mq('only screen and (max-width:768px)')) {
				$sections.css({
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
	function init() {
		$('#chart svg').remove();
		var w = $(window).width() -2, h = $('section.panel').eq(0).height();
		
		var vertices = d3.range(80).map(function(d) {
			return [Math.random() * w, Math.random() * h];
		});
		
		svg = d3.select('#chart')
			.append('svg:svg')
			.attr('width', w)
			.attr('height', h)
			.attr('class', 'PiYG')
			.on('mousemove', update);

		svg.selectAll("path")
			.data(d3.geom.voronoi(vertices))
			.enter().append("svg:path")
			.attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
			.attr("d", function(d) { return "M" + d.join("L") + "Z"; });
											 
		svg.selectAll("circle")
			.data(vertices.slice(1))
			.enter().append("svg:circle")
			.attr("transform", function(d) { return "translate(" + d + ")"; })
			.attr("r", 2);
											 
		function update() {
			vertices[0] = d3.svg.mouse(this);
			svg.selectAll("path")
				.data(d3.geom.voronoi(vertices)
				.map(function(d) { return "M" + d.join("L") + "Z"; }))
				.filter(function(d) { return this.getAttribute("d") != d; })
				.attr("d", function(d) { return d; });
			}
	}

	return {
		init : init
	}
}());




var svg = null;

$(document).ready(function() {
	USSE.navigation.init();
	USSE.graph.init();
});


$(window).resize(function() {
	USSE.navigation.resize();
	USSE.graph.init();
});





