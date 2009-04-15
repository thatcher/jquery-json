(function($){
  	// RSpec/Bacon Style
	with (jqUnit) {
		
		//tests basic init functionality
		describe('jQuery jsPath', 'colors', {
			before: function(){
				var _this = this;
				// this is an assignment object so we cant mess
				// with the actual test suite
				this.colors = {};
				jQuery.ajax({
					type:'GET',
					dataType:'json',
					url:'data/colors.js',
					async:false,
					success:function(js){
						_this.colors = js;
					},
					error:function(){
						ok(false);
					}
				});
			}
		}).it('should be a function', function(){
			isType($, Function);
		}).should('return the context when setting the context', function(){
			equals($(this.a('colors'))[0], this.a('colors'));
		}).should('return the context called with no args', function(){
			equals($()[0], this.a('colors'));
		}).it('can select the first level', function(){
			ok($('.color').length == 1);
			ok($('.*').length == 1);
		}).it('can select all items in an array', function(){
			ok($('.color[*]').length == 7 );
			ok($('.*[*]').length == 7 );
		}).it('can test items attributes', function(){
			ok($('.color[?(@.$name == "red")]').length == 1 );
			ok($('.color[?(@.$name == "red")].$value').get(0) == '#f00' );
			ok($('.color[?(@.$name == "red")].$value')[0] == '#f00' );
			ok($('.color[?(@.$name == "red")].$value').toString() == '#f00' );
			ok($('.color[?(@.$name == "red")]').attr('$value') == '#f00' );
		}).pending('should do something awesome', function(){
			// It doesnt matter what you put here it wont be run until
			// you change this to an actual spec
			ok(false);
		});
		
		
	}
    
})(jQuery.jspath);
