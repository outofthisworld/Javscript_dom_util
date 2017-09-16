window.ya = function() {
    if (!_.symbol)
        window._.symbol = Symbol('domUtils');

    return window._.symbol;
}

window[ya()] = function(name, obj) {

    //Allows the user to name the function
    var domUtils = {
        [name](selector) {
            Array.prototype.splice.call(domUtils.elements, 0, domUtils.elements.length);
            Array.prototype.slice.call(document.querySelectorAll(selector))
                .forEach((ele) => {
                    domUtils.elements.push(ele);
                })
            return domUtils;
        }
    }[name]

    //Where elements will be stored
    domUtils.elements = [];

    //Extension function, extends the object safely.
    domUtils.extend = function(key, val) {
        if (domUtils[key]) throw new Error('Key is already defined on object, unsafe operation');
        domUtils[key] = val;
    }

    //Sets up the prototype (Array.prototype has non-enumerable properties)
    const proto = {}
    Object.getOwnPropertyNames(Array.prototype).forEach(function(key) {
        if (!(typeof Array.prototype[key] == 'function')) return;
        proto[key] = Array.prototype[key].bind(domUtils.elements);
    })


    //Set the prototype
    Object.setPrototypeOf(domUtils.__proto__, proto);

    //Put in the correct namespace
    const namespace = obj ? obj : window;
    namespace[name] = domUtils;

    //return the public API.
    return domUtils;
}

window[ya()]('mySelector');


const forEachLi = mySelector('ul.intermediate li').forEach;
forEachLi(function(ele, index) {
    console.log(ele)
})