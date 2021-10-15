import {HeatLevels} from "../complex/biomeGeneration/enums/HeatLevels";
import {MoistureLevels} from "../complex/biomeGeneration/enums/MoistureLevels";
import {GroundHardnessLevels} from "../complex/biomeGeneration/enums/GroundHardnessLevels";
import {HeightLevels} from "../complex/biomeGeneration/enums/HeightLevels";
import BiomeValueRange from "./BiomeValueRange";

export default interface BiomeValueRangeSet {
    heatRange: BiomeValueRange<HeatLevels>,
    moistureRange: BiomeValueRange<MoistureLevels>,
    groundHardnessRange: BiomeValueRange<GroundHardnessLevels>,
    heightRange: BiomeValueRange<HeightLevels>,
}