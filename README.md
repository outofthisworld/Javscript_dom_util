  Useful utility file for working within the dom in vanilla javascript.

    Defines a global function named ya which returns a symbol and can be used to retrieve a function from
    the global namespace which enables you to define where to store the public API (either under your own object namespace or globally if no object is specified).

    For instance,
     window[ya()]('mySelector');

    will expose the `mySelector` function on the global object.

    Where as:
    const namespace = {}
    window[ya()]('mySelector',namespace);

    will enable the exposed api to be available as namespace.mySelector(args)

    We can then select elements like in JQuery and work with them like they are arrays of elements, without actually installing jQuery.

    const forEachLi = mySelector('ul.intermediate li').forEach;
    forEachLi(function(ele, index) {
        console.log(ele)
    })

    As such, this is useful should you not want to install jQuery as a dependency or cannot do so for whatever reason.