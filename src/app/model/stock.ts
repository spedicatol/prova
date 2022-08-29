import { Sentiment } from "./sentiment";

export interface Stock {
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string,
    sentiment?: Sentiment;
}
