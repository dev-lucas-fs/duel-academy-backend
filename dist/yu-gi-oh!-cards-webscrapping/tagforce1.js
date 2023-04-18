"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTagForce1Data = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
const BASE_URL = "https://yugioh.fandom.com";
const BOOSTERS_URL = `${BASE_URL}/Yu-Gi-Oh!_GX_Tag_Force:_Booster_Packs`;
const YUGIOH_API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=";
const RARITIES = ["Ultra Rare", "Super Rare", "Rare", "Common"];
async function getBoosterList() {
    const { data: HTML } = await axios_1.default.get(BOOSTERS_URL);
    const $ = cheerio.load(HTML);
    const boosters = [];
    $("#mw-content-text > div ul li").each((i, el) => {
        if (i >= 48)
            return;
        let [name, unlock] = $(el).text().trim().split(": ");
        let url = "";
        cheerio.load(el)("a").each((i, el) => {
            if (i === 0)
                url = $(el).attr("href");
        });
        url = `${BASE_URL}${url}`;
        boosters.push({ name, unlock, url, cards: {} });
    });
    return boosters;
}
function formatHTMLtoCardListStr(text) {
    let cards = [""], rows = text.split("\n");
    for (let row of rows) {
        if (row === "Ultra Rare")
            cards.push(row);
        if (row === "ve")
            break;
        if (cards.length > 1 && row !== "" && row !== "Ultra Rare")
            cards.push(row);
    }
    return cards.slice(1).join("\n");
}
function strToCardListObj(str) {
    let lastRarity = "", cards = {};
    for (let row of str.split('\n')) {
        if (RARITIES.includes(row)) {
            lastRarity = row;
            continue;
        }
        if (cards[lastRarity] === undefined)
            cards[lastRarity] = [];
        cards[lastRarity].push({
            name: row.trim()
        });
    }
    return cards;
}
function formatCardNameToYUGIOHAPI(name) {
    return name.trim().replace(" ", "%20");
}
async function getCardInfo(name) {
    const { data: obj } = await axios_1.default.get(`${YUGIOH_API_URL}${formatCardNameToYUGIOHAPI(name)}`);
    const { data } = obj;
    const info = {};
    info.image = data[0].card_images[0]["image_url"];
    info.type = data[0].type;
    info.description = data[0].desc;
    return info;
}
async function getBoosterPacksCards(url) {
    const { data } = await axios_1.default.get(url);
    const $ = cheerio.load(data);
    let cards = {};
    $("#mw-content-text .mw-parser-output").each((i, el) => {
        const rows = $(el).text().trim();
        cards = strToCardListObj(formatHTMLtoCardListStr(rows));
    });
    for (let key of RARITIES)
        for (let i = 0; i < cards[key].length; i++) {
            const { image, type, description } = await getCardInfo(cards[key][i].name);
            cards[key][i] = { ...cards[key][i], ...{ image, type, description } };
        }
    console.log(cards);
    return cards;
}
async function getTagForce1Data() {
    const boosters = await getBoosterList();
    for (let booster of boosters.slice(0, 1))
        booster.cards = await getBoosterPacksCards(`${booster.url}`);
    fs_1.default.writeFileSync("./yu-gi-oh!-cards-webscrapping/tag-force-1.data.ts", `
        export default ${JSON.stringify(boosters)}
    `);
}
exports.getTagForce1Data = getTagForce1Data;
