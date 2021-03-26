const Utils = ()=>{
    function applyLoadingForm(selector, isLoading) {
        const parent = document.querySelector(selector);
        if(!parent) return
        var elements = parent.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].disabled = isLoading;
            elements[i].classList.toggle("loading");
        }
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return {
        applyLoadingForm,
        validateEmail
    }
}

export default Utils();

