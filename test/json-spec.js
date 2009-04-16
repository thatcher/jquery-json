(function($, _){
  	// RSpec/Bacon Style
	with (jqUnit) {
		
		//tests basic init functionality
		describe('_', 'json2js', {
			before: function(){
                var _this = this;
                $.ajax({
                    async:false,
                    url:'data/values.json',
                    type:'GET',
                    dataType:'text',
                    success:function(json){
                        _this.json = json;
                    }
                });
			}
		}).it('should add a static function named json2js', function(){
			isType(_.json2js, Function);
		}).it('should parse json into js', function(){
            var js = _.json2js(this.a('json')); 
			ok(js,                               'and the js is defined');
			ok(js.value,                         'and the js has properties');
			ok(js.error === null,                'and the js parses null object properties');
			equals(js.value.items.length, 5,     'and the array has  the correct length');
		}).pending('should do something awesome', function(){
			// It doesnt matter what you put here it wont be run until
			// you change this to an actual spec
			ok(false);
		});
        
        
        //tests basic safe functionality
		describe('_', 'json2js (safe)', {
			before: function(){
                var _this = this;
                $.ajax({
                    async:false,
                    url:'data/unsafe_values.json',
                    type:'GET',
                    dataType:'text',
                    success:function(json){
                        _this.json = json;
                    }
                });
			}
		}).it('can parse untrusted json safely', function(){
            var js;
            try {
                _.json2js(this.a('json'), true);
                fail('evil json was parsed');
            }catch(e){
                ok(e,'parsing evil json threw an exception')
            }
		});
		
	}
    
})(jQuery, jsPath);
