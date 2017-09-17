import { appendHtml } from 'viperjs/dom';

function tpl() {
    /* def viper-template */
    <div>
        {$if(a > b)}
            condition
        {$else}
            condition2
        {$fi}
        {$each(list, item, index)}
            <div>{ '123' }</div>
        {$end}
    </div>;
    /* end */
}

function component() {
    return tpl();
}

appendHtml(document.body, component());
