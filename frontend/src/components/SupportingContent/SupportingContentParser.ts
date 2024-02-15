import { ChatMessage } from "../../api";

type ParsedSupportingContentItem = {
    title: string;
    content: string;
};

type ContentItem = {
    content : string, 
    id : number | null,
    title : string,
    filepath : string,
    url : string,
    metadata : any,
    chunk_id : string
}


export function parseSupportingContentItem(item: ContentItem): ParsedSupportingContentItem {
    const parts = item["chunk_id"];
    const title = `${item["url"]} - Part  ${parseInt(item["chunk_id"])  + 1}`;
    const content = item["content"];

    return {
        title,
        content
    };
}
