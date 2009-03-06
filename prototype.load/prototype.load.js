/*
 * Prototype Element.load Plugin
 * version: 1.0 (6-MAR-2009)
 * author: Pierre Paridans
 * @requires Prototype v1.6.0 or later
 *
 * Inspired by the jQuery(selector).load( url, [data], [callback] ) method
 *   http://docs.jquery.com/Ajax/load
 * Added to the Element's methods.
 * The default request's method is POST.
 * Support the url+selector format.
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
Element.addMethods({
	load: function(element,url,params){
		element = $(element);
		params = params || {};
		url = url.strip();
		var offset = url.indexOf(" ");
		if(offset > 0){
			var selector = url.slice(offset,url.length);
			url = url.slice(0,offset);
		}
		if(Object.isFunction(params.onComplete)){
			var callback = params.onComplete;
		}
		var ajx = new Ajax.Request(url,Object.extend(params,{
			evalJS: false,
			onComplete: function(res){
				if(selector){
					element.update();
					new Element('div')
						.insert(res.responseText.stripScripts())
						.select(selector)
							.each(function(item){
								element.insert(item);
							});
				} else {
					element.update(res.responseText);
				}
				
				if(callback){
					callback.bind(element)(res);
				}
			}
		}));
		return element;
	}
});