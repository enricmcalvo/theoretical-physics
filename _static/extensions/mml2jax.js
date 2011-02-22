/*
 *  /MathJax/extensions/mml2jax.js
 *  
 *  Copyright (c) 2010 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

MathJax.Extension.mml2jax={varsion:"1.0.5",config:{element:null,preview:"alttext"},MMLnamespace:"http://www.w3.org/1998/Math/MathML",PreProcess:function(e){if(!this.configured){MathJax.Hub.Insert(this.config,(MathJax.Hub.config.mml2jax||{}));if(this.config.Augment){MathJax.Hub.Insert(this,this.config.Augment)}this.InitBrowser();this.configured=true}if(typeof(e)==="string"){e=document.getElementById(e)}if(!e){e=this.config.element||document.body}this.ProcessMathArray(e.getElementsByTagName("math"));if(e.getElementsByTagNameNS){this.ProcessMathArray(e.getElementsByTagNameNS(this.MMLnamespace,"math"))}var d=document.getElementsByTagName("html")[0];if(d){for(var c=0,b=d.attributes.length;c<b;c++){var a=d.attributes[c];if(a.nodeName.substr(0,6)==="xmlns:"&&a.nodeValue===this.MMLnamespace){this.ProcessMathArray(e.getElementsByTagName(a.nodeName.substr(6)+":math"))}}}},ProcessMathArray:function(b){var a;if(b.length){if(this.msieMathTagBug){for(a=b.length-1;a>=0;a--){if(b[a].nodeName==="MATH"){this.msieProcessMath(b[a])}else{this.ProcessMath(b[a])}}}else{for(a=b.length-1;a>=0;a--){this.ProcessMath(b[a])}}}},ProcessMath:function(e){var d=e.parentNode;var a=document.createElement("script");a.type="math/mml";d.insertBefore(a,e);if(this.msieScriptBug){var b=this.msieOuterHTML(e);b=b.replace(/<\?import .*?>/i,"").replace(/<\?xml:namespace .*?\/>/i,"");a.text=b.replace(/&nbsp;/g,"&#xA0;");d.removeChild(e)}else{var c=MathJax.HTML.Element("span");c.appendChild(e);MathJax.HTML.addText(a,c.innerHTML)}if(this.config.preview!=="none"){this.createPreview(e,a)}},msieProcessMath:function(e){var c=e.parentNode;var a=document.createElement("script");a.type="math/mml";c.insertBefore(a,e);var b="",d;while(e&&e.nodeName!=="/MATH"){d=e;e=e.nextSibling;b+=this.msieNodeHTML(d);d.parentNode.removeChild(d)}if(e&&e.nodeName==="/MATH"){e.parentNode.removeChild(e)}a.text=b+"</math>";if(this.config.preview!=="none"){this.createPreview(e,a)}},msieNodeHTML:function(d){var c,b,a;if(d.nodeName==="#text"){c=d.nodeValue.replace(/&/g,"&#x26;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}else{if(d.nodeName==="#comment"){c="<!--"+d.nodeValue+"-->"}else{if(this.msieAttributeBug){c="<"+d.nodeName.toLowerCase();for(b=0,a=d.attributes.length;b<a;b++){if(d.attributes[b].specified){c+=" "+d.attributes[b].nodeName.toLowerCase()+"=";c+='"'+d.attributes[b].nodeValue.replace(/\"/g,'\\"')+'"'}}c+=">"}else{c=this.toLowerCase(d.outerHTML);var e=c.split(/\"/);for(b=0,a=e.length;b<a;b+=2){e[b]=e[b].toLowerCase()}c=e.join('"')}}}return c},msieOuterHTML:function(d){if(d.nodeName.charAt(0)==="#"){return this.msieNodeHTML(d)}if(!this.msieAttributeBug){return d.outerHTML}var c=this.msieNodeHTML(d);for(var b=0,a=d.childNodes.length;b<a;b++){c+=this.msieOuterHTML(d.childNodes[b])}c+="</"+d.nodeName.toLowerCase()+">";return c},createPreview:function(b,a){var c;if(this.config.preview==="alttext"){var d=b.getAttribute("alttext");if(d!=null){c=[this.filterText(d)]}}else{if(this.config.preview instanceof Array){c=this.config.preview}}if(c){c=MathJax.HTML.Element("span",{className:MathJax.Hub.config.preRemoveClass},c);a.parentNode.insertBefore(c,a)}},filterText:function(a){return a},InitBrowser:function(){MathJax.Hub.Browser.Select({MSIE:function(a){var b=MathJax.HTML.Element("span",{className:"mathjax"});MathJax.Hub.Insert(MathJax.Extension.mml2jax,{msieScriptBug:true,msieMathTagBug:(MathJax.HTML.Element("span",{innerHTML:"<math><mi>x</mi></math>"}).childNodes.length!==1),msieAttributeBug:(b.outerHTML.substr(12)!=='"')})}})}};MathJax.Hub.Register.PreProcessor(["PreProcess",MathJax.Extension.mml2jax]);MathJax.Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");

