window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/stockapp/sw.js', { scope: '/stockapp/' })
            .then(registration => {
                console.log('Service Worker registrato con successo:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker fallito:', error);
            });
    }
    
    let qty = document.getElementById("qty");
    let margin = document.getElementById("margin");
    let price = document.getElementById("price");
    let comm = document.getElementById("comm");
    let taxes = document.getElementById("taxes");

    document.getElementById("qty").value = localStorage.getItem('qty');
    document.getElementById("margin").value = localStorage.getItem('margin');
    document.getElementById("price").value = localStorage.getItem('price');
    document.getElementById("comm").value = localStorage.getItem('comm');
    document.getElementById("taxes").value = localStorage.getItem('taxes');
}


function calcNet(p1, q, p, t, c) {
    const sell = q * p1;
    const taxes = q * (p1 - p) * t;
    const initCost = q * p;
    return ((sell - c - taxes) / initCost) - 1;
}


function calc(q, netGainPerc, p, t, c) {
    let p_i = p + 0.01;
    while (calcNet(p_i, q, p, t, c) < netGainPerc) {
        p_i += 0.01;
    }
    return p_i;
}



function doMath(){
    let str = "Price"
    if(qty.value != "" && margin.value != "" && price.value != "" && comm.value != "" && taxes.value != ""){
        let q = parseFloat(qty.value);
        let m = parseFloat(margin.value);
        let p = parseFloat(price.value);
        let c = parseFloat(comm.value);
        let t = parseFloat(taxes.value);

        localStorage.setItem('q', q);
        localStorage.setItem('m', m);
        localStorage.setItem('p', p);
        localStorage.setItem('c', c);
        localStorage.setItem('t', t);

        let cal = calc(q, m/100, p, t, c)


        str = Math.round(cal*1000)/1000;
    }
    txt.innerHTML = str;
}

let qty = document.getElementById("qty");
let margin = document.getElementById("margin");
let price = document.getElementById("price");
let comm = document.getElementById("comm");
let taxes = document.getElementById("taxes");

let txt = document.getElementById("txt");

qty.addEventListener("input", doMath);
margin.addEventListener("input", doMath);
price.addEventListener("input", doMath);
comm.addEventListener("input", doMath);
taxes.addEventListener("input", doMath);