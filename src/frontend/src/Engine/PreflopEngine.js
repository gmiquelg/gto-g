// ============================================================
// PreflopEngine.js — Modular preflop poker game engine
// ============================================================

// ---- CONSTANTS ----
const SUITS = ['s', 'h', 'd', 'c'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

// 6-max position order for preflop action (UTG first, BB last)
const POSITION_ACTION_ORDER = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'];

const OPEN_RAISE_SIZE = 3;   // BB
const RERAISE_MULTIPLIER = 3;

// ---- DECK ----

function createDeck() {
    const deck = [];
    for (const suit of SUITS) {
        for (const value of VALUES) {
            deck.push({ value, suit });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    const d = [...deck];
    for (let i = d.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
}

function dealCards(deck, count) {
    return deck.splice(0, count);
}

// ---- HAND STRENGTH ----

function cardRank(value) {
    return VALUES.indexOf(value);
}

function classifyHand(cards) {
    const [c1, c2] = cards;
    const r1 = cardRank(c1.value);
    const r2 = cardRank(c2.value);
    const high = Math.max(r1, r2);
    const low = Math.min(r1, r2);
    const suited = c1.suit === c2.suit;
    const pair = r1 === r2;

    const highV = VALUES[high];
    const lowV = VALUES[low];

    // Helper: check if hand matches a specific combo
    const is = (h, l) => highV === h && lowV === l;
    const isPair = (v) => pair && highV === v;

    // PREMIUM: AA, KK, QQ, AKs, AKo
    if (isPair('A') || isPair('K') || isPair('Q')) return 'PREMIUM';
    if (is('A', 'K')) return 'PREMIUM';

    // STRONG: JJ, TT, AQs, AQo, AJs, KQs
    if (isPair('J') || isPair('T')) return 'STRONG';
    if (is('A', 'Q')) return 'STRONG';
    if (is('A', 'J') && suited) return 'STRONG';
    if (is('K', 'Q') && suited) return 'STRONG';

    // MEDIUM: 99-77, ATs-A9s, KJs, QJs, JTs
    if (pair && high >= cardRank('7') && high <= cardRank('9')) return 'MEDIUM';
    if (highV === 'A' && suited && low >= cardRank('9') && low <= cardRank('T')) return 'MEDIUM';
    if (is('K', 'J') && suited) return 'MEDIUM';
    if (is('Q', 'J') && suited) return 'MEDIUM';
    if (is('J', 'T') && suited) return 'MEDIUM';

    // WEAK: everything else
    return 'WEAK';
}

// ---- WEIGHTED RANDOM ----

function weightedChoice(options) {
    // options: [{ value, weight }]
    const total = options.reduce((sum, o) => sum + o.weight, 0);
    let roll = Math.random() * total;
    for (const o of options) {
        roll -= o.weight;
        if (roll <= 0) return o.value;
    }
    return options[options.length - 1].value;
}

// ---- VILLAIN AI ----

// When Villain has earlier position: always open-raise 3BB.
function villainOpenDecide() {
    return { action: 'raise', size: OPEN_RAISE_SIZE };
}

// Villain response when facing a raise from Hero
function villainFacingRaise(tier, currentBet) {
    const reraiseSize = currentBet * RERAISE_MULTIPLIER;
    switch (tier) {
        case 'PREMIUM':
            return weightedChoice([
                { value: { action: 'raise', size: reraiseSize }, weight: 60 },
                { value: { action: 'call', size: currentBet }, weight: 40 },
            ]);
        case 'STRONG':
            return weightedChoice([
                { value: { action: 'call', size: currentBet }, weight: 70 },
                { value: { action: 'raise', size: reraiseSize }, weight: 30 },
            ]);
        case 'MEDIUM':
            return weightedChoice([
                { value: { action: 'fold', size: 0 }, weight: 70 },
                { value: { action: 'call', size: currentBet }, weight: 30 },
            ]);
        case 'WEAK':
        default:
            return { action: 'fold', size: 0 };
    }
}

// ---- GAME STATE ----

function getActionIndex(positionName) {
    return POSITION_ACTION_ORDER.indexOf(positionName.toUpperCase());
}

function buildActionOrder(heroPos, villainPos) {
    // Returns ordered list of actors: [ { position, isHero }]
    const actors = [
        { position: heroPos, isHero: true },
        { position: villainPos, isHero: false },
    ];

    actors.sort((a, b) => getActionIndex(a.position) - getActionIndex(b.position));
    return actors;
}

/**
 * Create a new preflop hand.
 *
 * @param {string} heroPosition   - e.g. "CO"
 * @param {string} villainPosition - e.g. "BTN"
 * @returns {{ gameState, submitHeroAction }}
 */
export function createHand(heroPosition, villainPosition) {
    // 1. Build & shuffle deck
    let deck = shuffleDeck(createDeck());

    // 2. Deal
    const heroHand = dealCards(deck, 2);
    const villainHand = dealCards(deck, 2);

    // 3. Classify villain hand
    const villainTier = classifyHand(villainHand);

    // 4. Initial state (blinds already posted)
    const heroIdx = getActionIndex(heroPosition);
    const villainIdx = getActionIndex(villainPosition);
    const isSB = (pos) => pos.toUpperCase() === 'SB';
    const isBB = (pos) => pos.toUpperCase() === 'BB';

    let pot = 1.5; // SB(0.5) + BB(1)
    let currentBet = 1; // The BB is the current bet to match
    let actionHistory = [];
    let heroToAct = false;
    let handOver = false;
    let result = null;

    // 5. Determine action order
    const actionOrder = buildActionOrder(heroPosition, villainPosition);

    // 6. Determine if Villain acts first (has earlier position)
    const heroActIdx = getActionIndex(heroPosition);
    const villainActIdx = getActionIndex(villainPosition);
    const villainActsFirst = villainActIdx < heroActIdx;

    if (villainActsFirst) {
        // Villain decides: raise or check (pass to Hero)
        const decision = villainOpenDecide(villainTier);

        if (decision.action === 'raise') {
            pot += decision.size;
            currentBet = decision.size;
            actionHistory.push({
                position: villainPosition,
                action: 'raise',
                size: decision.size,
            });
        }
        // If 'check', Villain doesn't act — Hero gets to decide
    }

    // Hero always gets to act
    heroToAct = true;

    // 7. Build game state
    const gameState = {
        heroPosition,
        villainPosition,
        heroHand,
        villainHand, // hidden from UI, but kept for future eval
        villainTier,  // kept for future eval
        pot: Math.round(pot * 100) / 100,
        currentBet,
        toCall: currentBet,
        actionHistory,
        heroToAct,
        handOver,
        result,
    };

    // 8. Hero action handler
    function submitHeroAction(action) {
        if (!gameState.heroToAct || gameState.handOver) return gameState;

        gameState.heroToAct = false;

        if (action === 'fold') {
            gameState.actionHistory.push({
                position: heroPosition,
                action: 'fold',
                size: 0,
            });
            gameState.handOver = true;
            gameState.result = 'hero_fold';
        } else if (action === 'call') {
            gameState.pot += gameState.toCall;
            gameState.pot = Math.round(gameState.pot * 100) / 100;
            gameState.actionHistory.push({
                position: heroPosition,
                action: 'call',
                size: gameState.toCall,
            });
            gameState.handOver = true;
            gameState.result = 'hero_call';
        } else if (action === 'raise') {
            const raiseSize = gameState.currentBet * RERAISE_MULTIPLIER;
            gameState.pot += raiseSize;
            gameState.pot = Math.round(gameState.pot * 100) / 100;
            gameState.currentBet = raiseSize;
            gameState.actionHistory.push({
                position: heroPosition,
                action: 'raise',
                size: raiseSize,
            });

            // Villain responds to Hero's raise
            const villainResponse = villainFacingRaise(villainTier, raiseSize);
            if (villainResponse.action === 'fold') {
                gameState.actionHistory.push({
                    position: villainPosition,
                    action: 'fold',
                    size: 0,
                });
                gameState.handOver = true;
                gameState.result = 'villain_fold';
            } else if (villainResponse.action === 'call') {
                gameState.pot += villainResponse.size;
                gameState.pot = Math.round(gameState.pot * 100) / 100;
                gameState.actionHistory.push({
                    position: villainPosition,
                    action: 'call',
                    size: villainResponse.size,
                });
                gameState.handOver = true;
                gameState.result = 'villain_call';
            } else if (villainResponse.action === 'raise') {
                gameState.pot += villainResponse.size;
                gameState.pot = Math.round(gameState.pot * 100) / 100;
                gameState.currentBet = villainResponse.size;
                gameState.toCall = villainResponse.size;
                gameState.actionHistory.push({
                    position: villainPosition,
                    action: 'raise',
                    size: villainResponse.size,
                });
                // Hero must act again
                gameState.heroToAct = true;
            }
        }

        return { ...gameState };
    }

    return { gameState, submitHeroAction };
}

export { classifyHand, POSITION_ACTION_ORDER };
