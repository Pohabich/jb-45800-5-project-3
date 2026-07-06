export interface HighlightItem {
    name: string;
    description: string;
}

export interface TipItem {
    topic: string;
    text: string;
}

export interface KeyPlace {
    name: string;
    description: string;
}

export default interface RecommendationResponse {
    title: string;
    keyPlace: KeyPlace;
    highlights: HighlightItem[];
    tips: TipItem[];
}