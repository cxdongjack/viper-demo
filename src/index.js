import { appendHtml } from 'viperjs/dom';

function tpl() {
    /* def viper-template */
    <div>
        {$if(2 > 1)}
            condition
        {$else}
            condition
        {$fi}
        {$each([1, 2] / item / i)}
        <div>{ '123' }</div>
        {$end}
    </div>
    /* end */
}

function component() {
    return tpl();
}

appendHtml(document.body, component());
