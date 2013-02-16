// ==UserScript==
// @name        AmazonPrice
// @namespace   http://lasiza.ca/amazonprice
// @description Amazon price checker
// @include     http://*.amazon.tld/*
// @version     0.1
// @grant 		GM_xmlhttpRequest
// @require		http:////ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
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
	  }
	});
}

if (window.location.hostname.match(/\.ca$/)) {
	$("#actualPriceContent").append("<span id='mycontent'><a href="+getAmazonDotComURL()+">View on Amazon.com</a></span>");
}

if (window.location.hostname.match(/\.com$/)) {
	$("#actualPriceContent").append("<span><a href="+getAmazonDotCaURL()+">View on Amazon.ca</a></span>");
	$(".priceLarge, .price, .listprice").prepend("USD");
}

insertPrice(getAmazonDotComURL());