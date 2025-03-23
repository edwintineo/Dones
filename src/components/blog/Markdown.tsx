import { useMemo } from 'react';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  // Usamos useMemo para evitar reprocesar el markdown en cada renderizado
  const processedContent = useMemo(() => {
    if (!content) return '';
    
    return content
      // Procesar encabezados
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-5 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
      // Procesar listas
      .replace(/^\- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/^\d\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>')
      // Agrupar elementos de lista
      .replace(/<\/li>\\n<li/g, '</li><li')
      .replace(/<li class="ml-4">/g, '<ul class="my-4 list-disc"><li class="ml-4">')
      .replace(/<li class="ml-4 list-decimal">/g, '<ol class="my-4 list-decimal"><li class="ml-4">')
      .replace(/<\/li>\\n([^<])/g, '</li></ul>\\n$1')
      .replace(/<\/li>\\n([^<])/g, '</li></ol>\\n$1')
      // Procesar citas
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary/30 pl-4 italic my-4">$1</blockquote>')
      // Procesar negritas e itálicas
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Procesar párrafos (evitando envolver elementos HTML)
      .replace(/^(?!<[h|u|o|l|b])(.*$)/gm, function(match) {
        if (match.trim() === '') return '';
        return `<p class="mb-4">${match}</p>`;
      });
  }, [content]);
  
  return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;
}