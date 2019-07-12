var loopA = document.getElementsByClassName('aa');

for (var i = 0; i < loopA.length; i++) {
    if (loopA[i].href === window.location.href) {
  	loopA[i].style.fontWeight = 'bold';
}}

 