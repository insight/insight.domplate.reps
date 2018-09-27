{
    rep: "../default/map.rep",
    css: (css () >>>

        :scope SPAN.map > SPAN {
            color: green;
            font-weight: normal;
        }

        :scope SPAN.map > .pair > SPAN.delimiter,
        :scope SPAN.map > .pair > SPAN.separator {
            color: green;
        }
    
    <<<)
}
