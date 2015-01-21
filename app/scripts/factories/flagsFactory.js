'use strict';

//factories Awardsfactory.js
angular.module('awardsApp')
  .factory('Flags',
    function Flags() {
      var exports = {};
      var UA                  = navigator.userAgent,
          isIOS               = /ip(hone|od|ad)/i.test(UA),
          isSafari            = /(mac os x).*version\/\d(.\d)+ (mobile\/\w{5,} )?safari/i.test(UA),
          isSafari5           = /(mac os x).*version\/5[.\d]+ (mobile\/\w{5} )?safari/i.test(UA),
          isAndroid           = /android/i.test(UA),
          isAndroidBrowser    = isAndroid && !/chrome|firefox/i.test(UA),
          isAndroidBrowserOld = isAndroidBrowser && parseFloat(/android ([\d\.]+)/i.exec(UA).pop()) < 4.3,
          isAndroid2          = isAndroidBrowser && /android 2\.\d/i.test(UA),
          isAndroidChrome     = isAndroid && /chrome/i.test(UA),
          isKindleFire        = /KF[A-Z]{2,3}/.test(UA),
          isFirefox           = /firefox/i.test(UA),
          isIE11              = /Trident/i.test(UA),
          isLtIE11            = /msie \d/i.test(UA),
          isIE9               = /msie 9/i.test(UA),
          isIE                = isLtIE11 || isIE11,
          isMSTouch           = (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
          isMSTouchPrefix     = !!navigator.msMaxTouchPoints,
          isPhone             = ((/mobile/i.test(UA) && !/ipad|tablet/i.test(UA)) || matchMedia('only screen and (max-device-width : 767px)').matches) && !isKindleFire,
          isTablet            = (isAndroid && !isPhone) || (isIOS && !isPhone) || isKindleFire,
          isMobile            = isPhone || isTablet;

      exports.Browser = {
        isIOS               : isIOS,
        isSafari            : isSafari,
        isSafari5           : isSafari5,
        isAndroid           : isAndroid,
        isAndroidBrowser    : isAndroidBrowser,
        isAndroidBrowserOld : isAndroidBrowserOld,
        isAndroidChrome     : isAndroidChrome,
        isAndroid2          : isAndroid2,
        isKindleFire        : isKindleFire,
        isFirefox           : isFirefox,
        isIE11              : isIE11,
        isLtIE11            : isLtIE11,
        isIE9               : isIE9,
        isIE                : isIE,
        isMSTouch           : isMSTouch,
        isPhone             : isPhone,
        isTablet            : isTablet,
        isMobile            : isMobile
      };
      return exports;
    }
  );
