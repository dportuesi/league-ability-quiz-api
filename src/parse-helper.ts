import { Ability } from "./models/ability";
import { replaceAll, shuffleArray } from "./util";

function parseAbilityInfo(htmlContent: string): Ability {
    // filter string ascii codes (there is probably a better way of doing this)
    htmlContent = replaceAll(htmlContent, '&amp;', '&');
    htmlContent = replaceAll(htmlContent, '&#039;', "'");

    const ability: Ability = {
        name: null,
        champion: null,
        control: null,
        image: null,
        championImage: null,
        description: null
    };

    //Check for passives
    const rePassive = /(passive-symbol)/g;
    const passiveCheck = htmlContent.match(rePassive);

    let isPassive = false;
    if (passiveCheck) {
        isPassive = true;
    }

    //Regex for getting ability name
    const reAbility =  /(?<="ability-list__item__name">).*?(?=\n* *<span)/gs
    ability.name = htmlContent.match(reAbility)[0];

    //Regex for champion name
    const reChampion = /(?<=champ=").*?(?=\n* *")/g
    ability.champion = htmlContent.match(reChampion)[0];

    //Regex for default key of ability
    if (isPassive) {
        ability.control = "Passive";
    } else {
        const reControl = /(?<="ability-list__item__keybind">).*?(?=\ *<\/div>)/g;
        ability.control = htmlContent.match(reControl)[0];
    }

    const absoluteUrlPrefixAbility = 'https://www.mobafire.com/images/ability/';

    //Regex for getting ability image 
    const reImage = /(?<=<img data-original="\/images\/ability\/).*?(?=" src)/gs
     ability.image = absoluteUrlPrefixAbility + htmlContent.match(reImage)[0];
 
    
    //Regex for getting champion name
    const reChampImage =  /(?<=\/images\/champion\/square\/).*?.png/g;
    const absoluteUrlPrefixChampion = 'https://www.mobafire.com/images/champion/square/';
    ability.championImage = absoluteUrlPrefixChampion +  htmlContent.match(reChampImage)[0];

    //Regex for getting ability description
    const reDesc = /(?<=<span class="desc">)(.*?)(?=<div)/gs
    ability.description = htmlContent.match(reDesc)[0];

    return ability;
}

/**
 * Takes an HTML Sources string and parses out abilities
 * @param source html page source from mobafire
 * @returns array of Ability
 */
export function getAbilitiesFromHTML(source: string, amount = 0): Ability[] {
    const results: Ability[] = [];
    const abilityHTMLParser = (content: string): string[] => {

        //Regex for getting entire a block
        const re = /(?<=<a href="https:\/\/www.mobafire.com\/league-of-legends\/ability\/).*?(?=<\/a>)/gs;
        return (content || "").match(re) || [];
    };
    let htmlAbilities: string[] = abilityHTMLParser(source);
    shuffleArray(htmlAbilities);

    if (amount > 0 && amount < htmlAbilities.length) {
        htmlAbilities = htmlAbilities.slice(0, amount);
    }
    htmlAbilities.forEach((element: string) => {
        const ability = parseAbilityInfo(element);
        if (ability.name) {
            results.push(parseAbilityInfo(element));
        }
    });

    return results;
}

/**
 * Takes an HTML Sources string and parses out abilities, then returns the count.
 * @param source html page source from mobafire
 * @returns count of abilities parsed
 */
export function getAbilitiesCountFromHTML(source: string): number {
    const abilityHTMLParser = (content: string): string[] => {

        //Regex for getting entire a block
        const re = /(?<=<a href="https:\/\/www.mobafire.com\/league-of-legends\/ability\/).*?(?=<\/a>)/gs;
        return (content || "").match(re) || [];
    };
    const htmlAbilities: string[] = abilityHTMLParser(source);
    return htmlAbilities.length;
}