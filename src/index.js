import { appendHtml } from 'viperjs/dom';

{{#sss}}
    <div>Hello webpack</div>
{{#}}

function component() {
    return sss();
}

appendHtml(document.body, component());
