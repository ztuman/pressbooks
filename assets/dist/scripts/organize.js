(()=>{"use strict";var t=function(){return t=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t},t.apply(this,arguments)},e=function(){function e(e,n,i){var a=this;this.endVal=n,this.options=i,this.version="2.7.1",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,useIndianSeparators:!1,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(t){a.startTime||(a.startTime=t);var e=t-a.startTime;a.remaining=a.duration-e,a.useEasing?a.countDown?a.frameVal=a.startVal-a.easingFn(e,0,a.startVal-a.endVal,a.duration):a.frameVal=a.easingFn(e,a.startVal,a.endVal-a.startVal,a.duration):a.frameVal=a.startVal+(a.endVal-a.startVal)*(e/a.duration);var n=a.countDown?a.frameVal<a.endVal:a.frameVal>a.endVal;a.frameVal=n?a.endVal:a.frameVal,a.frameVal=Number(a.frameVal.toFixed(a.options.decimalPlaces)),a.printValue(a.frameVal),e<a.duration?a.rAF=requestAnimationFrame(a.count):null!==a.finalEndVal?a.update(a.finalEndVal):a.options.onCompleteCallback&&a.options.onCompleteCallback()},this.formatNumber=function(t){var e,n,i,r,o=t<0?"-":"";e=Math.abs(t).toFixed(a.options.decimalPlaces);var s=(e+="").split(".");if(n=s[0],i=s.length>1?a.options.decimal+s[1]:"",a.options.useGrouping){r="";for(var l=3,c=0,p=0,u=n.length;p<u;++p)a.options.useIndianSeparators&&4===p&&(l=2,c=1),0!==p&&c%l==0&&(r=a.options.separator+r),c++,r=n[u-p-1]+r;n=r}return a.options.numerals&&a.options.numerals.length&&(n=n.replace(/[0-9]/g,(function(t){return a.options.numerals[+t]})),i=i.replace(/[0-9]/g,(function(t){return a.options.numerals[+t]}))),o+a.options.prefix+n+i+a.options.suffix},this.easeOutExpo=function(t,e,n,i){return n*(1-Math.pow(2,-10*t/i))*1024/1023+e},this.options=t(t({},this.defaults),i),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(n),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof e?document.getElementById(e):e,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined","undefined"!=typeof window&&this.options.enableScrollSpy&&(this.error?console.error(this.error,e):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push((function(){return a.handleScroll(a)})),window.onscroll=function(){window.onScrollFns.forEach((function(t){return t()}))},this.handleScroll(this)))}return e.prototype.handleScroll=function(t){if(t&&window&&!t.once){var e=window.innerHeight+window.scrollY,n=t.el.getBoundingClientRect(),i=n.top+window.pageYOffset,a=n.top+n.height+window.pageYOffset;a<e&&a>window.scrollY&&t.paused?(t.paused=!1,setTimeout((function(){return t.start()}),t.options.scrollSpyDelay),t.options.scrollSpyOnce&&(t.once=!0)):(window.scrollY>a||i>e)&&!t.paused&&t.reset()}},e.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var e=t-this.startVal;if(Math.abs(e)>this.options.smartEasingThreshold&&this.options.useEasing){this.finalEndVal=t;var n=this.countDown?1:-1;this.endVal=t+n*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=t,this.finalEndVal=null;null!==this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},e.prototype.start=function(t){this.error||(t&&(this.options.onCompleteCallback=t),this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},e.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},e.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},e.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,null==this.finalEndVal&&this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},e.prototype.printValue=function(t){var e;if(this.el){var n=this.formattingFn(t);(null===(e=this.options.plugin)||void 0===e?void 0:e.render)?this.options.plugin.render(this.el,n):"INPUT"===this.el.tagName?this.el.value=n:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=n:this.el.innerHTML=n}},e.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},e.prototype.validateValue=function(t){var e=Number(t);return this.ensureNumber(e)?e:(this.error="[CountUp] invalid start or end value: ".concat(t),null)},e.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},e}();var n=window.jQuery,i={organize:{bulkToggle:[],oldParent:null,newParent:null,oldOrder:null,newOrder:null,sortableOptions:{revert:!0,helper:"clone",zIndex:2700,distance:3,opacity:.6,placeholder:"ui-state-highlight",dropOnEmpty:!0,cursor:"crosshair",items:"tbody > tr",start:function(t,e){i.organize.oldParent=n(e.item).parents("table").attr("id")},stop:function(t,e){i.organize.newParent=n(e.item).parents("table").attr("id"),p(n(e.item))}}}};function a(t){n.blockUI.defaults.applyPlatformOpacityRules=!1;var e,i=n('[role="alert"]');if("book"===t)e=PB_OrganizeToken.updating.book;else{var a=t.post_type.replace("-","");e=PB_OrganizeToken.updating[a]}i.children("p").text(e),i.addClass("loading-content").removeClass("visually-hidden"),n.blockUI({message:n(i),baseZ:1e5})}function r(t,e){var i,a=n('[role="alert"]');if("book"===t)i=PB_OrganizeToken[e].book;else{var r=t.post_type.replace("-","");i=PB_OrganizeToken[e][r]}n.unblockUI({onUnblock:function(){a.removeClass("loading-content").addClass("visually-hidden"),a.children("p").text(i)}})}function o(t,e){return"prev"===e?n(t).prevAll("[id^=part]").first():"next"===e?n(t).nextAll("[id^=part]").first():void 0}function s(t){return{id:(t=n(t).attr("id").split("_"))[t.length-1],post_type:t[0]}}function l(t){var e=[];return t.children("tbody").children("tr").each((function(t,i){var a=s(n(i));e.push(a.id)})),e}function c(t){t.children("tbody").children("tr").each((function(e,i){var a="",r='<button class="move-up">'.concat(PB_OrganizeToken.moveUp,"</button>"),o='<button class="move-down">'.concat(PB_OrganizeToken.moveDown,"</button>");n(i).is("tr:only-of-type")?t.is("[id^=part]")&&t.prevAll("[id^=part]").length&&t.nextAll("[id^=part]").length?a=" | ".concat(r," | ").concat(o):t.is("[id^=part]")&&t.nextAll("[id^=part]").length?a=" | ".concat(o):t.is("[id^=part]")&&t.prevAll("[id^=part]").length&&(a=" | ".concat(r)):a=n(i).is("tr:first-of-type")?t.is("[id^=part]")&&t.prevAll("[id^=part]").length?" | ".concat(r," | ").concat(o):" | ".concat(o):n(i).is("tr:last-of-type")?t.is("[id^=part]")&&t.nextAll("[id^=part]").length?" | ".concat(r," | ").concat(o):" | ".concat(r):" | ".concat(r," | ").concat(o),n(i).children(".has-row-actions").children(".row-title").children(".row-actions").children(".reorder").html(a)}))}function p(t){var e=s(t);n.ajax({url:ajaxurl,type:"POST",data:{action:"pb_reorder",id:e.id,old_order:n("#".concat(i.organize.oldParent)).sortable("serialize"),new_order:n("#".concat(i.organize.newParent)).sortable("serialize"),old_parent:i.organize.oldParent.replace(/^part_([0-9]+)$/i,"$1"),new_parent:i.organize.newParent.replace(/^part_([0-9]+)$/i,"$1"),_ajax_nonce:PB_OrganizeToken.reorderNonce},beforeSend:function(){a(e),i.organize.oldParent!==i.organize.newParent&&c(n("#".concat(i.organize.oldParent))),c(n("#".concat(i.organize.newParent)))},success:function(){r(e,"success")},error:function(){r(e,"failure")}})}function u(t,i,o,s){var l,c,p,u={action:"pb_update_post_visibility",post_ids:t,_ajax_nonce:PB_OrganizeToken.postVisibilityNonce};n.ajax({url:ajaxurl,type:"POST",data:Object.assign(u,(l={},c=o,p=s,c in l?Object.defineProperty(l,c,{value:p,enumerable:!0,configurable:!0,writable:!0}):l[c]=p,l)),beforeSend:function(){a({post_type:i})},success:function(t){r({post_type:i},"success"),function(){var t={action:"pb_update_word_count_for_export",_ajax_nonce:PB_OrganizeToken.wordCountNonce};n.post(ajaxurl,t,(function(t){var i=parseInt(n("#wc-selected-for-export").text(),10);new e("wc-selected-for-export",t,{startVal:i,separator:""}).start()}))}()},error:function(){r({post_type:i},"failure")}})}function d(t,e,i){n.ajax({url:ajaxurl,type:"POST",data:{action:"pb_update_post_title_visibility",post_ids:t,show_title:i,_ajax_nonce:PB_OrganizeToken.showTitleNonce},beforeSend:function(){a({post_type:e})},success:function(t){r({post_type:e},"success")},error:function(){r({post_type:e},"failure")}})}n(document).ready((function(){n(".allow-bulk-operations #front-matter").sortable(i.organize.sortableOptions).disableSelection(),n(".allow-bulk-operations table#back-matter").sortable(i.organize.sortableOptions).disableSelection(),n(".allow-bulk-operations table.chapters").sortable(Object.assign(i.organize.sortableOptions,{connectWith:".chapters"})).disableSelection(),n("input[name=blog_public]").on("change",(function(t){var e,i=n(".publicize-alert"),o=n(".publicize-alert > span");e=1===parseInt(t.currentTarget.value,10)?1:0,n.ajax({url:ajaxurl,type:"POST",data:{action:"pb_update_global_privacy_options",blog_public:e,_ajax_nonce:PB_OrganizeToken.privacyNonce},beforeSend:function(){a("book")},success:function(){0===e?(i.removeClass("public").addClass("private"),o.text(PB_OrganizeToken.bookPrivate)):1===e&&(i.removeClass("private").addClass("public"),o.text(PB_OrganizeToken.bookPublic)),r("book","success")},error:function(){r("book","failure")}})})),n(".web_visibility, .export_visibility").on("change",(function(){var t,e=s(n(this).parents("tr")),i=0;n(this).is(":checked")&&(i=1),n(this).is('[id^="export_visibility"]')?t="export":n(this).is('[id^="web_visibility"]')&&(t="web"),u(e.id,e.post_type,t,i)})),n(".show_title").on("change",(function(t){var e=s(n(t.target).parents("tr")),i="";n(t.currentTarget).is(":checked")&&(i="on"),d(e.id,e.post_type,i)})),n(document).on("click",".move-up",(function(t){var e=n(t.target).parents("tr"),a=n(t.target).parents("table");if(i.organize.oldParent=a.attr("id"),e.is("tr:first-of-type")&&a.is("[id^=part]")&&a.prevAll("[id^=part]").length){var r=o(a,"prev");i.organize.newParent=r.attr("id"),r.append(e),p(e)}else i.organize.newParent=a.attr("id"),e.prev().before(e),p(e)})),n(document).on("click",".move-down",(function(t){var e=n(t.target).parents("tr"),a=n(t.target).parents("table");if(i.organize.oldParent=a.attr("id"),e.is("tr:last-of-type")&&a.is("[id^=part]")&&a.nextAll("[id^=part]").length){var r=o(a,"next");i.organize.newParent=r.attr("id"),r.prepend(e),p(e)}else i.organize.newParent=a.attr("id"),e.next().after(e),p(e)})),n('.allow-bulk-operations table thead th button[id$="show_title"]').on("click",(function(t){var e=n(t.target).attr("id");e=e.replace("-","");var a=n(t.target).parents("table"),r=a.attr("id").split("_")[0];"part"===r&&(r="chapter");var o=l(a);i.organize.bulkToggle[e]?(a.find('tr td.column-showtitle input[type="checkbox"]').prop("checked",!1),i.organize.bulkToggle[e]=!1,d(o.join(),r,""),t.target.setAttribute("aria-pressed",!1)):(a.find('tr td.column-showtitle input[type="checkbox"]').prop("checked",!0),i.organize.bulkToggle[e]=!0,d(o.join(),r,"on"),t.target.setAttribute("aria-pressed",!0))})),n('.allow-bulk-operations table thead th button[id$="visibility"]').on("click",(function(t){var e=n(t.target).attr("id"),a=(e=e.replace("-","")).split("_");a=a[a.length-2];var r=n(t.target).parents("table"),o=r.attr("id").split("_")[0];"part"===o&&(o="chapter");var s=l(r);i.organize.bulkToggle[e]?(r.find("tr td.column-".concat(a," input[type=checkbox]")).prop("checked",!1),i.organize.bulkToggle[e]=!1,u(s.join(),o,a,0),t.target.setAttribute("aria-pressed",!1)):(r.find("tr td.column-".concat(a,' input[type="checkbox"]')).prop("checked",!0),i.organize.bulkToggle[e]=!0,u(s.join(),o,a,1),t.target.setAttribute("aria-pressed",!0))})),n(window).on("beforeunload",(function(){if(n.active>0)return"Changes you made may not be saved..."}))}))})();