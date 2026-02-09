// ==UserScript==
// @name         YouTube Desktop Feed
// @namespace    r57zone userscripts youtube
// @version      1.1
// @match        https://www.youtube.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
  
    function applyExtraCSS() {
      let style = document.getElementById('yt-extra-style');
      if (!style) {
          style = document.createElement('style');
          style.id = 'yt-extra-style';
          document.head.appendChild(style);
      }

      style.textContent =
          '#content.ytd-rich-section-renderer {' +
          'width: 70% !important;' +
          '}';
  	}


    function fixGrid() {
        const grids = document.querySelectorAll('ytd-rich-grid-renderer');

        grids.forEach(function(grid) {
            grid.setAttribute('elements-per-row', '5');
            grid.style.setProperty('--ytd-rich-grid-item-max-width', '320px', 'important');
            grid.style.setProperty('--ytd-rich-grid-items-per-row', '5', 'important');
        });
    }
  
  	function fixAll() {
        fixGrid();
        applyExtraCSS();
    }

    // ждём пока появится grid
    function waitForGrid() {
        if (document.querySelector('ytd-rich-grid-renderer'))
            fixAll();
        else
            setTimeout(waitForGrid, 300);
    }

    // после загрузки
    window.addEventListener('load', function() {
        setTimeout(waitForGrid, 800);
    });

    // при SPA-навигации
    document.addEventListener('yt-navigate-finish', function() {
        setTimeout(waitForGrid, 800);
    });

    // при скролле
    window.addEventListener('scroll', function() {
        fixAll();
    });
  
  
 	//let resizeTimer = null;

  /*window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
          fixAll();
      }, 300);
  });*/

})();
