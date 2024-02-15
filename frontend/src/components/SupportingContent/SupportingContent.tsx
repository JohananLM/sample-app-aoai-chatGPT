import { parseSupportingContentItem } from "./SupportingContentParser";

import styles from "./SupportingContent.module.css";
import { ChatMessage } from "../../api";

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

export const SupportingContent = ({ supportingContent }: Props) => {  
     const out = JSON.parse(supportingContent.content);
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
