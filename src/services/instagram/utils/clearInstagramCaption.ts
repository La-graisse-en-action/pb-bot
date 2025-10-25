export function clearInstagramCaption(text: string): string {
  if (!text) return '';

  // 1. Reemplazar múltiples saltos de línea consecutivos por uno solo
  let cleaned = text.replace(/\n{2,}/g, '\n');

  // 2. Eliminar líneas que solo contienen puntos o espacios
  cleaned = cleaned.replace(/^\s*\.+\s*$/gm, '');

  // 3. Eliminar saltos de línea al inicio y final
  cleaned = cleaned.trim();

  // 4. Reemplazar múltiples saltos de línea que quedaron por uno solo
  cleaned = cleaned.replace(/\n+/g, '\n');

  // 5. Eliminar espacios múltiples
  cleaned = cleaned.replace(/\s{2,}/g, ' ');

  return cleaned;
}
