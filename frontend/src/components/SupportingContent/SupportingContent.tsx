import { parseSupportingContentItem } from "./SupportingContentParser";

import styles from "./SupportingContent.module.css";
import { ChatMessage,   GPT4VUserMessage } from "../../api";

interface Props {
    supportingContent: ChatMessage;
}

type ContentItem = {
    content : string, 
    id : number | null,
    title : string,
    filepath : string,
    url : string,
    metadata : any,
    chunk_id : string
}

const getCitationContent = (message_content : string | [GPT4VUserMessage]) => {
    if (typeof message_content == "string"){
            return message_content;
    } else {
        const msg = message_content.map((u_msg) => {u_msg.text;}).join("\n");
        return msg;
    }
}

export const SupportingContent = ({ supportingContent }: Props) => {  
     const out = JSON.parse(getCitationContent(supportingContent.content));
     const contents : ContentItem[] = out["citations"];

    return (
        <ul className={styles.supportingContentNavList}>
            {
 
            contents.map((x, i) => {
                const parsed = parseSupportingContentItem(x);


                return (
                    <li className={styles.supportingContentItem}>
                        <h4 className={styles.supportingContentItemHeader}>{parsed.title}</h4>
                        <p className={styles.supportingContentItemText}>{parsed.content}</p>
                    </li>
                );
               
            })}
        </ul>
    );
};
