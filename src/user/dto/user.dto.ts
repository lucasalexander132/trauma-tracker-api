import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { Tag } from "generated/prisma/browser";

export type TIntensityMethod = 'color_slider' | undefined;

export interface IIntensity {
    intensityMethod: TIntensityMethod;
    intensityValue: number;
    intensityRating?: string;
}

export class AddEntryDTO {
    @ValidateIf((eventName) => eventName === undefined)
    @IsString()
    eventName: string;

    @ValidateIf((entry) => entry === undefined)
    @IsString()
    entryDescription: string;

    @IsNotEmpty()
    eventTags: { id: string }[];

    @IsNotEmpty()
    intensity: IIntensity;
}

export class AddModuleDTO {
    @IsString()
    moduleType: string;

    @IsString()
    questionAnswers: string;

    @IsString()
    exerciseData: string;
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