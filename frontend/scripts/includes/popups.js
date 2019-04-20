import Vpopape from '../../libs/vpopape-0.0.4.min.js';

(function (w, d) {
  'use strict';
  var POPUP = 'popup';
  var POPUP_HIDDEN = 'popup_hidden';
  var POPUP_ACTIVE = 'popup_active';
  var POPUP_FWCLOSER = 'popup__fw-closer';
  var POPUP_CLOSER = 'popup__closer';
  var header = document.querySelector('.header-contain');

  w.addEventListener('DOMContentLoaded', init);

  function init () {
    var popups = d.querySelectorAll('.' + POPUP);
    Array.prototype.forEach.call(popups, initPopup);
  }

  function initPopup (popa) {
    var callers = d.querySelectorAll('[data-popup-id="' + popa.id + '"]');
    var closers = popa.querySelectorAll('.' + POPUP_FWCLOSER + ', .' + POPUP_CLOSER);

    new Vpopape({
      popup: popa,
      animationTime: 330,
      callers: callers,
      closers: closers,
      hideOnEsc: true,
      activeClassname: POPUP_ACTIVE,
      hidingClassname: POPUP_HIDDEN,

      beforeShow: handleBeforeShow,
      afterHide: handleAfterHide,
    });
  }

  function handleBeforeShow () {
    var scrollWidth = w.innerWidth - d.documentElement.clientWidth + 'px';
    
    d.body.style.marginRight = scrollWidth;
    header.style.paddingRight = scrollWidth;
    d.body.style.overflow = 'hidden';
  }

  function handleAfterHide() {
    if (Vpopape.getShown().length) {
      return;
    }

    d.body.style.overflow = '';
    d.body.style.marginRight = '';
    header.style.paddingRight= '';
  }

})(window, document);
