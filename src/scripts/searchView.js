//Controller for retreiving user input and displaying price

import {elements} from "./base";
import { fetchedPrices, retrieveAllPrices } from "./Search";

export const getInput = () => elements.search_box.value;

export const clearInput = () => {
    elements.search_box.onfocus = () => elements.search_box.value = "";
};



export const elementStrings = {
    loader: "price_box_loader"
}

export const renderLoader = () => {
    const markup = `
    <div class="${elementStrings.loader}">
        <div class="loader"><i class="fas fa-spinner"></i></div>
    </div>`
    elements.price_container.insertAdjacentHTML("beforeend", markup)
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) {
        loader.parentElement.removeChild(loader);
    }
};


export const renderPrice = (result) => {
    const markup = `
    <div class="price_box" id="${result.ID}">
        <p class="ticker">${result.price1}/${result.price2}</p><p class="price_r">${result.result}</p>
        <button class="price_del"><i class="fas fa-backspace"></i></button>
    </div>
    `;
    if (elements.price_container.childElementCount <8) {
        elements.price_container.insertAdjacentHTML("beforeend", markup);
    }    
}


export const deleteAllPrices = () => {
    let affect_all = document.getElementById("all");
    Object.keys(fetchedPrices).forEach(key => delete fetchedPrices[key]);
    elements.price_container.innerHTML = ""
    affect_all.parentNode.removeChild(affect_all)  
}

export const deletePrice = (id) => {
    let price = document.getElementById(`${id}`)
    let affect_all = document.getElementById("all");
    price.style.animationDuration = "0.3s";
    const deleteP = () => {
        delete fetchedPrices[id];
        price.parentNode.removeChild(price);
    }
    if (elements.price_container.childElementCount <= 1) {
        price.classList.add("animated", "fadeOutUp")
        affect_all.classList.add("animated", "fadeOutDown");
        setTimeout(() => {
        price.classList.remove("animated", "fadeOutUp")
        affect_all.classList.remove("animated", "fadeOutDown");
        deleteP();
        affect_all.parentNode.removeChild(affect_all)    
        }, 200);
    } else {
        animateCSS(price, "fadeOutUp", deleteP)
    }
    
}


export const renderAllButtons = () => {
    const markup = `
    <div class="affect_all_div" id="all">
        <button class="refresh_all"><i class="fas fa-sync-alt"></i></button>
        <button class="delete_all"><i class="fas fa-backspace"></i></button>
    </div>
    `;
    if (!document.querySelector(".affect_all_div")) {
        elements.main.insertAdjacentHTML("beforeend", markup);
    }
} 


export const animateCSS = (element, animationName, callback) => {
    
    element.classList.add("animated", animationName)
    setTimeout(() => {
        element.classList.remove("animated", animationName)
        if (typeof callback === "function") callback()
    }, 200);
};


//document.querySelector("").addEventListener("animationend", () => {})