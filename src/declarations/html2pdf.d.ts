declare module 'html2pdf.js' {

    export interface Html2PdfOptions {
        margin?: number | [number, number, number, number];
        filename?: string;
        html2canvas?: {
            scale?: number;
            useCORS?: boolean;
        };
        jsPDF?: {
            unit?: string;
            format?: string | [number, number];
            orientation?: 'portrait' | 'landscape';
        };
    }

    export interface Html2PdfInstance {
        /** Устанавливает глобальные опции и возвращает тот же инстанс (chainable) */
        set(options: Partial<Html2PdfOptions>): Html2PdfInstance;

        /** Указывает DOM-элемент, из которого делать PDF */
        from(element: HTMLElement): Html2PdfInstance;

        /** Сохраняет PDF-файл; filename берётся из .set() или из параметра */
        save(fileName?: string): void;
    }

    export default function html2pdf(
        options?: Partial<Html2PdfOptions>,
    ): Html2PdfInstance;
}
