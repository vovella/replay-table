import { transformers } from '../transformers/transform';
import isString from '../auxiliary/isString';
import parseObject from '../auxiliary/parseObject';
import validateObject from '../auxiliary/validateObject';


//https://github.com/TargetProcess/replayTable#parameters
export const parameters = {
    //Terms

    seasonName: {
        default: 'Season',
        validate: value => isString(value)
    },

    roundName: {
        default: 'Round',
        validate: value => isString(value)
    },

    matchName: {
        default: 'Match',
        validate: value => isString(value)
    },

    startRoundName: {
        default: '0',
        parse: input => input === "undefined" ? undefined : input,
        validate: value => !value || isString(value),
        goesToTransform: true
    },

    positionName: {
        default: '#',
        validate: value => isString(value)
    },

    itemName: {
        default: 'Team',
        parse: input => input === "undefined" ? undefined : input,
        validate: value => !value || isString(value)
    },

    totalName: {
        default: 'Points',
        validate: value => isString(value)
    },


    //Data

    inputType: {
        default: 'pointsTable',
        validate: value => transformers.hasOwnProperty(value)
    },

    itemsToShow: {
        default: undefined,
        parse: input => input === "undefined" ? undefined : input.split(','),
        validate: value => !value || (Array.isArray(value) && value.every(item => isString(item))),
        goesToTransform: true
    },

    totalValue: {
        default: 'cumulative',
        validate: value => ['cumulative', 'win %'].includes(value),
        goesToTransform: true
    },

    resultMapping: {
        default: {
            3: 'win',
            1: 'draw',
            0: 'loss'
        },
        parse: input => parseObject(input),
        validate: obj => validateObject(obj, key => !Number.isNaN(key), value => ['win', 'draw', 'loss'].includes(value)),
        goesToTransform: true
    },

    extraColumnsNumber: {
        default: 0,
        parse: input => Number.parseInt(input, 10),
        validate: value => !Number.isNaN(value),
        goesToTransform: true
    },

    calculatedColumns: {
        default: {},
        parse: input => parseObject(input),
        validate: obj => validateObject(obj, key => ['rounds', 'wins', 'losses', 'draws',
                'goalsFor', 'goalsAgainst', 'goalsDifference'].includes(key), value => isString(value))
    },

    useRoundsNumbers: {
        default: false,
        parse: input => input === 'true',
        validate: value => typeof value === 'boolean',
        goesToTransform: true
    },

    roundsTotalNumber: {
        default: undefined,
        parse: input => Number.parseInt(input, 10),
        validate: value => value === undefined || !Number.isNaN(value),
    },

    //tieBreaking!

    positionWhenTied: {
        default: 'previous round',
        validate: value => ['previous round', 'highest', 'range'].includes(value),
        goesToTransform: true
    },

    tableName: {
        default: undefined,
        parse: input => input === "undefined" ? undefined : input,
        validate: value => isString(value)
    },


    //Playback

    modes: {
        default: undefined,
        parse: input => input.split(','),
        validate: value => Array.isArray(value) && value.length > 0 && value.every(item => ['season', 'round', 'match', 'item'].includes(item))
    },

    startFromRound: {
        default: undefined,
        parse: input => input === "undefined" ? undefined : Number.parseInt(input, 10),
        validate: value => !value || !Number.isNaN(value)
    },

    animationDuration: {
        default: 1800,
        parse: input => Number.parseInt(input, 10),
        validate: value => !Number.isNaN(value)
    },

    showChangeDuringAnimation: {
        default: false,
        parse: input => input === "true",
        validate: value => typeof value === 'boolean'
    },


    //Appearance

    showProgressBar: {
        default: true,
        parse: input => input === "true",
        validate: value => typeof value === 'boolean'
    },

    focusedItems: {
        default: [],
        parse: input => input.split(','),
        validate: value => Array.isArray(value) && value.every(item => isString(item))
    }
};