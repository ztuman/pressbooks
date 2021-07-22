/*! For license information please see export.js.LICENSE.txt */
(()=>{var e={808:(e,t,n)=>{var o,r;!function(i){if(void 0===(r="function"==typeof(o=i)?o.call(t,n,t,e):o)||(e.exports=r),!0,e.exports=i(),!!0){var a=window.Cookies,c=window.Cookies=i();c.noConflict=function(){return window.Cookies=a,c}}}((function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var o in n)t[o]=n[o]}return t}function t(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function n(o){function r(){}function i(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({path:"/"},r.defaults,i)).expires&&(i.expires=new Date(1*new Date+864e5*i.expires)),i.expires=i.expires?i.expires.toUTCString():"";try{var a=JSON.stringify(n);/^[\{\[]/.test(a)&&(n=a)}catch(e){}n=o.write?o.write(n,t):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var c="";for(var p in i)i[p]&&(c+="; "+p,!0!==i[p]&&(c+="="+i[p].split(";")[0]));return document.cookie=t+"="+n+c}}function a(e,n){if("undefined"!=typeof document){for(var r={},i=document.cookie?document.cookie.split("; "):[],a=0;a<i.length;a++){var c=i[a].split("="),p=c.slice(1).join("=");n||'"'!==p.charAt(0)||(p=p.slice(1,-1));try{var s=t(c[0]);if(p=(o.read||o)(p,s)||t(p),n)try{p=JSON.parse(p)}catch(e){}if(r[s]=p,e===s)break}catch(e){}}return e?r[e]:r}}return r.set=i,r.get=function(e){return a(e,!1)},r.getJSON=function(e){return a(e,!0)},r.remove=function(t,n){i(t,"",e(n,{expires:-1}))},r.defaults={},r.withConverter=n,r}((function(){}))}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(808),t=n.n(e);const o=function(e){var t=document.getElementById("pb-sse-seconds");document.getElementById("pb-sse-minutes").textContent="",t.textContent="",clearInterval(e)},r=function(e){return e>9?e:"0".concat(e)};jQuery((function(e){var n=e("#pb-export-form");n.on("submit",(function(t){t.preventDefault();var i=e("#pb-export-button"),a=e("#pb-sse-progressbar"),c=e("#pb-sse-info"),p=e(".notice"),s=null;a.val(0).show(),i.attr("disabled",!0).hide(),p.remove();var d=PB_ExportToken.ajaxUrl+(PB_ExportToken.ajaxUrl.includes("?")?"&":"?")+e.param(n.find(":checked")),l=new EventSource(d);l.onopen=function(){var t,n,o;t=document.getElementById("pb-sse-seconds"),n=document.getElementById("pb-sse-minutes"),o=0,n.textContent="00:",t.textContent="00",s=setInterval((function(){t.textContent=r(++o%60),n.textContent=r(parseInt(o/60,10))+":"}),1e3),e(window).on("beforeunload",(function(){return PB_ExportToken.unloadWarning}))},l.onmessage=function(t){var n=JSON.parse(t.data);switch(n.action){case"updateStatusBar":a.val(parseInt(n.percentage,10)),c.html(n.info);break;case"complete":l.close(),e(window).unbind("beforeunload"),n.error?(a.val(0).hide(),i.attr("disabled",!1).show(),function(e,t,n){var o,r=document.createElement("div"),i=document.createElement("p"),a=document.getElementsByTagName("h1")[0];if(i.setAttribute("aria-live","assertive"),i.insertAdjacentHTML("beforeend",t),r.classList.add("notice","notice-".concat(e)),r.appendChild(i),n){o=document.createElement("button");var c=document.createElement("span");o.classList.add("notice-dismiss"),c.classList.add("screen-reader-text"),c.appendChild(document.createTextNode("Dismiss this notice.")),o.appendChild(c),r.classList.add("is-dismissible"),r.appendChild(o)}a.parentNode.insertBefore(r,a.nextSibling),o&&(o.onclick=function(){r.parentNode.removeChild(r)})}("error",n.error,!0),s&&o(s)):window.location=PB_ExportToken.redirectUrl}},l.onerror=function(){l.close(),a.removeAttr("value"),c.html("EventStream Connection Error "+PB_ExportToken.reloadSnippet),e(window).unbind("beforeunload"),s&&o(s)}}));var i="pb_export",a=t().getJSON(i);void 0===a&&(a={});var c=document.getElementById("export-options"),p=c.querySelector(".handlediv");p.onclick=function(){var e="true"===p.getAttribute("aria-expanded")||!1;p.setAttribute("aria-expanded",!e),e?c.classList.add("closed"):c.classList.remove("closed")};var s=document.getElementById("bulk-action-selector-top"),d=document.getElementById("bulk-action-selector-bottom"),l=document.querySelector(".wp-list-table").parentNode;l.addEventListener("submit",(function(e){if(e.preventDefault(),("delete"===s.value||"delete"===d.value)&&!confirm(PB_ExportToken.bulkDeleteWarning))return!1;setTimeout((function(){l.submit()}),0)})),e("#pb-export-button").on("click",(function(t){t.preventDefault();var n=!1,o="";if(e("#pb-export-form input:checked").each((function(){o=e("label[for='"+e(this).attr("id")+"']").text().trim();var t=e(this).attr("name"),r=_pb_export_formats_map[t];if(Object.values(_pb_export_pins_inventory).filter((function(e){return e===r})).length>=3)return n=!0,!1})),n)return alert(o+": "+PB_ExportToken.tooManyExportsWarning),!1;e(".export-file-container").unbind("mouseenter mouseleave"),e(".export-control button").prop("disabled",!0),e("#pb-export-button").hide(),e("#loader").show();setTimeout((function(){e("#pb-export-form").submit()}),0)})),e("#pb-export-form").find("input").each((function(){var t=e(this).attr("name");if(jQuery.isEmptyObject(a))"export_formats[pdf]"===t||"export_formats[mpdf]"===t||"export_formats[epub]"===t?e(this).prop("checked",!0):e(this).prop("checked",!1);else{var n=0;Object.prototype.hasOwnProperty.call(a,t)&&(n=a[t]),e(this).prop("checked",!!n)}e(this).attr("disabled")&&e(this).prop("checked",!1)})).on("change",(function(){var n=e(this).attr("name");e(this).prop("checked")?a[n]=1:delete a[n],t().set(i,a,{path:"/",expires:365})}));var u=function(){var t=e("td.column-pin input").length;e("td.column-pin input:checked").length===t?e("#cb-select-all-1, #cb-select-all-2, #bulk-action-selector-top, #bulk-action-selector-bottom, #doaction, #doaction2").attr("disabled",!0):e("#cb-select-all-1, #cb-select-all-2, #bulk-action-selector-top, #bulk-action-selector-bottom, #doaction, #doaction2").attr("disabled",!1)};u(),e("td.column-pin").find("input").each((function(){if(e(this).prop("checked")){var t=e(this).closest("tr"),n=t.attr("data-id"),o=e("input[name='ID[]'][value='".concat(n,"']"));e(this).prop("checked",!0),o.prop("checked",!1),o.prop("disabled",!0),t.find("td.column-file span.delete").hide()}})).on("change",(function(){u();var t=e(this).attr("name"),n=e(this).closest("tr"),o=n.attr("data-id"),r=e("input[name='ID[]'][value='".concat(o,"']")),i=n.attr("data-format"),a=n.attr("data-file"),c=e(this).prop("checked")?1:0;if(c){if(_pb_export_pins_inventory[t]=i,Object.keys(_pb_export_pins_inventory).length>5)return delete _pb_export_pins_inventory[t],e(this).prop("checked",!1),alert(PB_ExportToken.maximumFilesWarning),!1;if(Object.values(_pb_export_pins_inventory).filter((function(e){return e===i})).length>3)return delete _pb_export_pins_inventory[t],e(this).prop("checked",!1),alert(PB_ExportToken.maximumFileTypeWarning),!1;r.prop("checked",!1),r.prop("disabled",!0),n.find("td.column-file span.delete").hide()}else delete _pb_export_pins_inventory[t],r.prop("disabled",!1),n.find("td.column-file span.delete").show();e.ajax({url:ajaxurl,type:"POST",data:{action:"pb_update_pins",pins:JSON.stringify(_pb_export_pins_inventory),file:a,pinned:c,_ajax_nonce:PB_ExportToken.pinsNonce},success:function(t){e("#pin-notifications").html(t.data.message)}})}))}))})()})();