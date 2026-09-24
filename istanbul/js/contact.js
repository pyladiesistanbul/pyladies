/* contact.js — Contact page */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    /* Animate crying cat on hover */
    const catWrap = document.querySelector('.cat-keyboard-wrap');
    if (catWrap) {
      catWrap.addEventListener('mouseenter', function () {
        catWrap.classList.add('active');
      });
      catWrap.addEventListener('mouseleave', function () {
        catWrap.classList.remove('active');
      });
    }
  });
})();
