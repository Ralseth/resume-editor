import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-oklch';
import { rusLabel } from '../../utils/rusLabel';
import { useResume } from '../../hooks/useResume';

export default function Preview() {
    const { sections } = useResume();

    const downloadPdf = async () => {
        const el = document.getElementById('resume');
        if (!el) return;

        // сделаем рендер в canvas
        const canvas = await html2canvas(el, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#fff',
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            unit: 'pt',
            format: 'a4',
            orientation: 'portrait',
        });

        // вычисляем размеры, чтобы поместить картинку на страницу
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume.pdf');
    };

    return (
        <div className="bg-neutral-100 overflow-visible px-6 py-4">
            <div className="flex justify-start mb-4">
                <button
                    onClick={downloadPdf}
                    className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white transition"
                >
                    Скачать PDF
                </button>
            </div>
            <div
                id="resume"
                className="a4 bg-white text-black w-[90%] max-w-[600px]
             overflow-y-auto overflow-x-hidden max-h-[calc(100vh-4rem)]"
                style={{ color: '#000' }}
            >
                {sections.map((s) => (
                    <section key={s.id} className="mb-6">
                        <h3 className="section-title">{rusLabel[s.kind]}</h3>

                        {s.kind === 'experience' && (
                            <p className="section-text break-words">
                                <strong>{s.position}</strong> — {s.company} ({s.period})
                                <br />
                                <em>{s.description}</em>
                            </p>
                        )}

                        {s.kind === 'education' && (
                            <p className="section-text break-words">
                                {s.school}, {s.degree} ({s.period})
                            </p>
                        )}

                        {s.kind === 'skills' && <p className="section-text">{s.skills}</p>}

                        {s.kind === 'certificate' && (
                            <p className="section-text break-words">
                                {s.title} — {s.issuer}, {s.year}
                            </p>
                        )}

                        {s.kind === 'summary' && <p className="section-text">{s.text}</p>}
                    </section>
                ))}
            </div>
        </div>
    );
}
