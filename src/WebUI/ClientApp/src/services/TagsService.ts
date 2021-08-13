import { TagDto } from "../model/TagDto";

export const getTags = async (): Promise<TagDto[]> => {
    const result = await fetch('api/GetTags');
    const data = await result.json();
    return data as TagDto[];
};