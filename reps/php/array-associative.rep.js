{
    rep: "../default/map.rep",
    css: (css () >>>

        SPAN.map > SPAN {
            color: green;
            font-weight: normal;
        }

        SPAN.map > .pair > SPAN.delimiter,
        SPAN.map > .pair > SPAN.separator {
            color: green;
        }
    
    <<<)
}
