import Color from "../util/Color";

export default interface BiomeColorSet {
    optimalConditions: Color;
    tooCold: Color;
    tooHot: Color;
    tooDry: Color;
    tooMoist: Color;
}