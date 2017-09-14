import { appendHtml } from 'viperjs/dom';
function component() {
    return ['Hello', 'webpack'].join(' ');
}
appendHtml(document.body, component());
