import { Pivot, PivotItem } from "@fluentui/react";
import DOMPurify from "dompurify";

import styles from "./AnalysisPanel.module.css";

import { SupportingContent } from "../SupportingContent";
import { AskResponse, ChatMessage, Citation } from "../../api";
import { AnalysisPanelTabs } from "./AnalysisPanelTabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Props {
    className: string;
    activeTab?: AnalysisPanelTabs;
    onActiveTabChanged: (tab: AnalysisPanelTabs) => void;
    activeCitation: Citation | null;
    citationHeight: string;
   // answer: AskResponse; 
    thoughts : string | null;
    data_points : ChatMessage;
}

const pivotItemDisabledStyle = { disabled: true, style: { color: "grey" } };

export const AnalysisPanel = ({ thoughts, data_points, activeTab, activeCitation, citationHeight, className, onActiveTabChanged }: Props) => {
    const isDisabledThoughtProcessTab: boolean = !thoughts;
    const isDisabledSupportingContentTab: boolean = !data_points.content.length;
    const isDisabledCitationTab: boolean = !activeCitation;

    const sanitizedThoughts = DOMPurify.sanitize(thoughts!);
    //(activeCitation != null) ? console.log(activeCitation[4]) : console.log(null);
    return (
        <Pivot
            className={className}
            selectedKey={activeTab}
            onLinkClick={pivotItem => pivotItem && onActiveTabChanged(pivotItem.props.itemKey! as AnalysisPanelTabs)}
        >
            <PivotItem
                itemKey={AnalysisPanelTabs.ThoughtProcessTab}
                headerText="Thought process"
                headerButtonProps={isDisabledThoughtProcessTab ? pivotItemDisabledStyle : undefined}
            >
                <div className={styles.thoughtProcess} dangerouslySetInnerHTML={{ __html: sanitizedThoughts }}></div>
            </PivotItem>
            <PivotItem
                itemKey={AnalysisPanelTabs.SupportingContentTab}
                headerText="RetrievedDocuments"
                headerButtonProps={isDisabledSupportingContentTab ? pivotItemDisabledStyle : undefined}
            >
                <SupportingContent supportingContent={data_points} />
            </PivotItem>
            <PivotItem
                itemKey={AnalysisPanelTabs.CitationTab}
                headerText="Citation"
                headerButtonProps={isDisabledCitationTab ? pivotItemDisabledStyle : undefined}
            >
            
                {activeCitation != undefined ?  (
                <div className={styles.citationPanelContent}>
                { activeCitation.title != null && activeCitation.title.includes(".pdf") ?
                    <div>
                    <iframe title="Citation" 
                        src={"/content/"+activeCitation.url} 
                        width="100%" 
                        height={citationHeight}/> 
                        </div>:
                    <div>
                    <text className={styles.disclaimerCitation}>(Unable to load pdf viewer. Displaying raw text instead.)</text>
                    <ReactMarkdown 
                        linkTarget="_blank"
                        className={styles.citationPanelContent}
                        children={activeCitation.content} 
                        remarkPlugins={[remarkGfm]} 
                        rehypePlugins={[rehypeRaw]}
                        />
                        </div>
                    }
                </div>)
                   : 
                   <text className={styles.disclaimerCitation}>Citation unavailable.</text> }       
                
            </PivotItem>
        </Pivot>
    );
};
