import { codeToHtml } from 'shiki';

const THEME = 'rose-pine';

export async function highlightCode(code: string, language: string): Promise<string> {
  const html = await codeToHtml(code, {
    lang: language,
    theme: THEME,
    defaultColor: false, 
  });
  return html;
}
