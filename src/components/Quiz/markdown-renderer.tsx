import React from 'react'; 


//schema for markdown renderer 
interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }:MarkdownRendererProps){
  if (!content) return null;

  let processedContent = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\n/g, '<br />');

  return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;
}; 