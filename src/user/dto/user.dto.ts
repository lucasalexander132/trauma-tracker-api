import { IsNotEmpty, IsNumber } from "class-validator";
import { Tag } from "generated/prisma/browser";

export type TIntensityMethod = 'color_slider' | undefined;

export interface IIntensity {
    intensityMethod: TIntensityMethod;
    intensityValue: number;
    intensityRating: number;
}

export class AddEntryDTO {
    @IsNotEmpty()
    eventTags: { id: string }[];

    @IsNotEmpty()
    intensity: IIntensity;
}

export class AddTagDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    icon: string;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    sectionId: string;
}

export class GetEntriesDTO {
    cursor?: string;
    limit?: number;
}