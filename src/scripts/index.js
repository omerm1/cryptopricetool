//Global App controller
import "./../scss/main.scss"; 
import { elements } from "./base";
import * as searchView from "./searchView";
import { Search, fetchedPrices, retrieveAllPrices } from "./Search";

//Global state of the app
const state = {};


//Query parser 
const queryParser = (query) => {
    //btc/usd
    const ticker = query.split(" ")[0].split("/");
    //exchange
    const exc = query.split(" ")[1];
    return ticker.concat(exc)
}


//Search controller
const controlSearch = async () => {
    const query = searchView.getInput();

    if (query) {
        //Send the parsed qeury to the Search class 
        //and then add this Search object to the global state
        state.search = new Search(...queryParser(query));

        //Prepare UI for results
        searchView.clearInput();
        searchView.renderLoader();

        try {
            await state.search.getResults();

            //Add results to a separate object to keep track of them
            state.search.priceID();
            fetchedPrices[state.search.ID] = state.search
            //Render results on UI
            searchView.clearLoader();
            searchView.renderPrice(state.search);
            searchView.renderAllButtons();
        } catch (error) {
            alert("Something went wrong with the search...");
            console.log(error);
        }
    }
}


elements.search.addEventListener("submit", e => {
    //Prevent page reload
    e.preventDefault();
    controlSearch();
});


elements.main.addEventListener("click", e => {
    if (e.target.matches(".delete_all, .delete_all *")) {
        searchView.deleteAllPrices();
    }
    if (e.target.matches(".price_del, .price_del *")) {
        searchView.deletePrice(e.target.closest(".price_del").parentNode.id);
    }
    if (e.target.matches(".refresh_all, .refresh_all *")) {
        retrieveAllPrices();
    }
})
