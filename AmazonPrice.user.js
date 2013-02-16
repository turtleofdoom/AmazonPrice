// ==UserScript==
// @name        AmazonPrice
// @namespace   http://lasiza.ca/amazonprice
// @description Amazon price checker
// @include     http://*.amazon.tld/*
// @version     0.1
// @grant 		GM_xmlhttpRequest
// @require		http:////ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

/*
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

this.$ = this.jQuery = jQuery.noConflict(true);

function getAmazonDotComURL() {
	return window.location.toString().replace(".ca", ".com")
}

function getAmazonDotCaURL() {
	return window.location.toString().replace(".com", ".ca")
}

function insertPrice(str) {
	GM_xmlhttpRequest({
	  method: "GET",
	  url: str,
	  onload: function(response) {
	    var responseHTML = null;
	    if (!response.responseHTML) {
	      responseHTML = new DOMParser()
	        .parseFromString(response.responseText, "text/html");
	    }
	    var price = responseHTML.getElementById("actualPriceValue").textContent;
	    if (window.location.hostname.match(/\.ca$/)) {
	    	$("#mycontent a").html("or buy for <b class='priceLarge'>USD"+price+"</b> on Amazon.com");
	    } 
	    if (window.location.hostname.match(/\.com$/)) {
	    	$("#mycontent a").html("or buy for <b class='priceLarge'>"+price+"</b> on Amazon.ca");
	    } 
	  }
	});
}

if (window.location.hostname.match(/\.ca$/)) {
	$("#actualPriceContent").append("<span id='mycontent'><a href="+getAmazonDotComURL()+">View on Amazon.com</a></span>");
	insertPrice(getAmazonDotComURL());
}

if (window.location.hostname.match(/\.com$/)) {
	$("#actualPriceContent").append("<span id='mycontent'><a href="+getAmazonDotCaURL()+">View on Amazon.ca</a></span>");
	$(".priceLarge, .price, .listprice").prepend("USD");
	insertPrice(getAmazonDotCaURL());
}
