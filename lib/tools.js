//defined namespace
if(Tools == null) var Tools = {};
if(Tools.base == null) Tools.base = {};

/**
 * 转义html字符进行输出
 */
Tools.base.escapeHtml = function (original) {
    if (undefined == original)  return original;
    return original.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/**
 * 于escapeHtml相反
 */
Tools.base.unescapeHtml = function(original) {
    return original.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
};

/**
 * 替换XSS风险字符为可视字符
 */
Tools.base.replaceXmlCharacters = function(original) {
    original = original.replace("&", "+");
    original = original.replace("<", "\u2039");
    original = original.replace(">", "\u203A");
    original = original.replace("\'", "\u2018");
    original = original.replace("\"", "\u201C");
    return original;
};

/**
 * 判断是否包含XSS风险字符
 */
Tools.base.containsXssRiskyCharacters = function(original) {
    return (original.indexOf('&') != -1
            || original.indexOf('<') != -1
            || original.indexOf('>') != -1
            || original.indexOf('\'') != -1
            || original.indexOf('\"') != -1);
};

/**
 *  获得显示的时间字符串
 */
Tools.base.getTime = function () {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    return h + ":" + m + ":" + s;
};

/**
 *  获得毫秒数
 */
Tools.base.getTimeMillis = function () {
    return (new Date()).getTime();
};


Tools.base.getWindowHeight = function(){
  return window.innerHeight;
};

//错误信息显示函数
Tools.base.reportError = function(sMessage,sUrl,sLine) {
  return false;
  var str = "";
  str += "错误信息:" + sMessage + "\n";
  str += "错误地址:" + sUrl + "\n";
  str += "错误行数:" + sLine + "\n";
  str += "<=========调用堆栈=========>\n";
  var func = window.onerror.caller;
  var index = 1;
  while(func!=null){
    str += "第" + index + "个函数：" + func.name + "\n";
    str += "第" + index + "个函数：参数表：";
    for(var i = 0; i < arguments.length; i++){
      str += func.arguments[i] + ",";
    }
    str += "\n===================\n";
    func = func.caller;
      index++;
  }
  alert(str);
  return true;
}

/*
 *about google map data
 */
Tools.google_map = {
  getAddress: function(options,function_ref){
    if(options.lat == null || options.lng == null)
      return ;
    latlng = new GLatLng(options.lat,options.lng);
    geocoder = new GClientGeocoder();
    geocoder.getLocations(latlng, function_ref);
  },
  init_google_map:  function(options){
    var div_id = options.id || "minimap";
    var lat = options.lat;
    var lng = options.lng;
    var zoom = options.zoom || 12;
    if(GMap2 != null && lat != null && lng != null && lat != 0 && lng != 0){
      map = new GMap2(document.getElementById(div_id));
      var blueIcon = new GIcon(G_DEFAULT_ICON);
      blueIcon.image = "http://www.google.cn/intl/en_us/mapfiles/ms/micons/blue-dot.png";
      markerOptions = {
          icon:blueIcon
      };
      map.setCenter(new GLatLng(lat, lng), zoom);
      map.addControl(new GLargeMapControl());
      map.enableScrollWheelZoom();
      map.enableDoubleClickZoom();
      map.enableContinuousZoom();
      var point = new GLatLng(lat,lng);
      map.addOverlay(new GMarker(point, markerOptions));
    } else {
      alert("请先申请google地图apkey");
    }
  }
}

/*
 * about yunshi video functions
 **/
Tools.video_tools = {
  generate_video_html: function(options){
    if(options.url == null){
      return;
    }
    var url = options.url;
	var poster = options.poster;
    var width = options.width || 545;
    var height = options.height || 428;
    var live = options.live || 'live'; // live , recorded
    var autoPlay = !(options.autoPlay == undefined) ? options.autoPlay :  true;
    embed = '<object height="'+height+'" width="'+width+'">';
    embed += '<param name="movie" value="http://'+ location.host +'/player.swf">';
    embed += '<param name="flashvars" value="src='+ encodeURIComponent(url) +'&amp;streamType='+live+'&amp;autoRewind=true&amp;poster=' + encodeURIComponet(poster);
    if(autoPlay == true){
      embed += '&amp;autoPlay='+autoPlay+'">';
    } else {
	  embed += ' "></param>';
	}
    embed += '<param name="allowFullScreen" value="true"></param>';
    embed += '<param value="transparent" name="wmode"></param>';
    embed += '<param name="allowscriptaccess" value="always">';
    embed += '<embed height="'+height+'" width="'+width+'" src="http://'+ location.host +'/player.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" flashvars="src='+ encodeURIComponent(url) +'&amp;streamType='+live+'&amp;autoRewind=true&amp;poster=' +  encodeURIComponet(poster);
    if(autoPlay == true){
      embed += '&amp;autoPlay='+autoPlay;
    }
    embed += '"> </object>';
    return embed;
  },
  generate_voice_html: function(options){
    rtmp_url = options.rtmp_url;
    width = options.width || "100%";
    height = options.height || '145px';
    url = options.url;
    html =  '<object';
    html += '  id="flash_yuyin" width="'+width+'" height="'+height+'" >';
    html += '<param name="wmode" value="transparent">';
    html += '  <param name="movie" value="'+ url +'/'+flash_file+'" />';
    html += '  <param name="FlashVars" value="msg='+rtmp_url+'"/>';
    html += '  <param name="quality" value="high" />';
    html += '  <param name="bgcolor" value="#ffffff" />';
    html += '  <embed src="'+ url +'/'+flash_file+'" quality="high" bgcolor="#ffffff"';
    html += '          width="'+width+'" height="'+height+'" name="flash_yuyin" align="middle"';
    html += '          play="true"';
    html += '          loop="false"';
    html += '          wmode="transparent"';
    html += '          flashvars="msg='+rtmp_url+'"';
    html += '          quality="high"';
    html += '          allowScriptAccess="sameDomain"';
    html += '          type="application/x-shockwave-flash"';
    html += '  </embed>';
    html += '  </object>';
    return html;
  }


}

