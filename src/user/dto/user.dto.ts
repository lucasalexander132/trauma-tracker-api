import { IsNotEmpty } from "class-validator";
import { Tag } from "generated/prisma/browser";

export type TIntensityMethod = 'color_slider' | undefined;

export interface IIntensity {
    intensityMethod: TIntensityMethod;
    intensityValue: number;
    intensityRating: number;
}

export class AddEntryDTO {
    @IsNotEmpty()
    eventTags: Tag[];

    @IsNotEmpty()
    intensity: IIntensity;
}