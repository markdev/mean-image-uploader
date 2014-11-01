var assert = require('assert');
var superagent = require('superagent');
var should = require('should');
var expect = require('expect.js');
//var request = superagent.agent();


describe('express rest api server', function(){
	var id;
	it('posts an object', function(done) {
		superagent.post('http://127.0.0.1:3000/api/user')
			.send({
				email: "a@b.com",
				password: "a",
				password2: "a"
			})
			.end(function(e,res) {
				expect(res).to.eql(null)
				expect(e).to.eql(null)
				/*
				if (res.error) {
					alert('oh no ' + res.error.message);
				} else {
					alert('got ' + res.status + ' response');
				}
				*/
				//expect(res).to.exist;
				//assert(1===2);
				//expect(1).to.be(1);
				//expect(e).to.eql(null)
				//expect(res.body.success).to.eq(true)
				//expect(res.body.length).to.eql(1)
				done()
			})
	});
});


//http://frisbyjs.com/