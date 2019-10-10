//Controller for fetching and returning price
import axios from "axios";
import {key} from "./config";
import {elements} from "./base";
import * as i from "./index";
import * as SearchView from "./searchView"


export class Search {
    constructor (price1, price2, exchange) {
        this.price1 = price1
        this.price2 = price2
        this.exchange = exchange
    }

    addSymbol(input) {
        switch (input) {
            case("BTC"):
            return "₿";
            break;
            
            case("USD"):
            return "$";
            break; 

            case("EUR"):
            return "€";
            break;

            case("GBP"):
            return "£";
            break;
        }
    } 

    async getResults() {
        try {
            //API call
            const res = await axios(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${this.price1}&tsyms=${this.price2}&e=${this.exchange}&api_key={${key}}`)
            //Extract API result and assign it to this.result
            this.result = this.addSymbol(this.price2) + Object.values(Object.values(res.data)[0])[0];
        } catch (error) {
            console.log(error)
            alert("Something went wrong with the API call!")
        }
    }

    //assign ID to each price so we can delete them individually
    priceID() {
        let ArrFP, ID;
        ArrFP = Object.keys(fetchedPrices)
        if (ArrFP.length > 0) {
            this.ID = parseInt(ArrFP[ArrFP.length-1]) + 1;
        } else {
            this.ID = 0;
        } 
    }
}

export const fetchedPrices = {};


export const retrieveAllPrices = async () => {
    for (let[key, val] of Object.entries(fetchedPrices)) {
        const res = await axios(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${val.price1}&tsyms=${val.price2}&e=${val.exchange}&api_key={${key}}`)
        val.result = val.__proto__.addSymbol(val.price2) + Object.values(Object.values(res.data)[0])[0];
        let children = document.getElementById(`${key}`).children
        children[1].innerText = val.result;
    }
}

