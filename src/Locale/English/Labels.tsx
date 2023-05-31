import { LabelRegistry } from "../Registry";

export const LABELS_ENGLISH: LabelRegistry = {

    LobbyState: {
        waiting:                "Waiting",
        playing:                "Playing",
        finished:               "Finished"
    },

    GameOptions: {
        expansions:             "Expansions",
        character_choice:       "Character Choice",
        enable_ghost_cards:     "Enable Ghost cards",
        allow_beer_in_duel:     "Allow Beer in duel",
        quick_discard_all:      "Quick Discard All",
        scenario_deck_size:     "Scenario Cards",
        num_bots:               "Number of Bots",
        damage_timer:           "Damage Timer",
        escape_timer:           "Escape Timer",
        bot_play_timer:         "Bot Play Timer",
        tumbleweed_timer:       "Tumbleweed Timer",
    },

    ExpansionType: {
        thebullet:              "The Bullet",
        dodgecity:              "Dodge City",
        valleyofshadows:        "Valley of Shadows",
        greattrainrobbery:      "The Great Train Robbery",
        wildwestshow:           "Wild West Show",
        goldrush:               "Gold Rush",
        armedanddangerous:      "Armed And Dangerous",
        highnoon:               "High Noon",
        fistfulofcards:         "Fistful of Cards",
        canyondiablo:           "Canyon Diablo",
    },

    ui: {
        UNKNOWN_CARD: "(Unknown card)",
        USER_DISCONNECTED: "(Disconnected)",
    },
};