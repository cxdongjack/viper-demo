import {square} from './math.js';
function component() {
  var element = document.createElement('div');
  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  element.innerHTML = ['Hello', 'webpack'].join(' ') + square(3);
  return element;
}
document.body.appendChild(component());