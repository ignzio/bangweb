import { CardColor, CardFilter, CardRank, CardSuit, CardTarget, DeckType, EffectType, EquipType, ExpansionType, ModifierType, MthType, PlayerFilter, TagType, TargetType } from "./CardEnums";
import { Card } from "./GameTable";

export interface CardEffect {
    target: TargetType;
    player_filter: PlayerFilter[];
    card_filter: CardFilter[];
    effect_value: number;
    target_value: number;
    type: EffectType;
}

export interface CardEquip {
    effect_value: number;
    type: EquipType;
}

export interface CardTag {
    tag_value: number;
    type: TagType;
}

export interface CardSign {
    suit: CardSuit;
    rank: CardRank;
}

export interface CardData {
    name: string;
    image: string;
    effects: CardEffect[];
    responses: CardEffect[];
    optionals: CardEffect[];
    equips: CardEquip[];
    tags: CardTag[];
    expansion: ExpansionType[];
    deck: DeckType;
    modifier: {
        type: ModifierType
    };
    mth_effect: {
        type: MthType
    };
    mth_response: {
        type: MthType
    };
    equip_target: PlayerFilter[];
    color: CardColor;
    sign: CardSign;
}