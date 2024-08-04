export default function formatStoryContent(content: string): string {
    if (!content) return content;
    const formattedContent = content
      .replace(/[-/\\[\]]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\n/g, '<br/>');
    return `<span class="first-letter">${formattedContent.charAt(0)}</span>${formattedContent.slice(1)}`;
  }