import type { ChangeEvent } from 'react';
import { GripVertical, Sparkles } from 'lucide-react';
import type { Section } from '../../types/resume';
import { mockFor } from '../../utils/mockData';
import type { DndListeners } from '../../types/dnd';

interface Props {
    section: Section;
    onChange: (patch: Partial<Section>) => void;
    onRemove: () => void;
    dragAttributes?: React.HTMLAttributes<HTMLElement>;
    dragListeners?: DndListeners;
}

export default function SectionForm({ section, onChange, onRemove, dragAttributes, dragListeners }: Props) {
    const handle =
        (field: string) =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onChange({ [field]: e.target.value } as Partial<Section>);

    const handleSuggest = () => onChange(mockFor(section.kind));

    return (
        <div className="card border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
            <header className="flex items-center justify-between mb-2">
                <h3 className="font-medium capitalize">{section.kind}</h3>
                <div className="flex items-center space-x-2">
                    <button
                        {...dragListeners}
                        {...dragAttributes}
                        className="text-gray-400 hover:text-gray-600 cursor-grab"
                        title="Перетащить"
                    >
                        <GripVertical size={18} />
                    </button>
                    <button onClick={handleSuggest} title="AI-подсказка" className="text-amber-500 hover:text-amber-600">
                        <Sparkles size={18} />
                    </button>
                    <button onClick={onRemove} className="text-red-500 text-sm hover:underline">
                        Удалить
                    </button>
                </div>
            </header>

            {section.kind === 'experience' && (
                <>
                    <input className="input" placeholder="Должность" value={section.position} onChange={handle('position')} />
                    <input className="input" placeholder="Компания" value={section.company} onChange={handle('company')} />
                    <input className="input" placeholder="Период" value={section.period} onChange={handle('period')} />
                    <textarea className="textarea h-24" placeholder="Описание" value={section.description} onChange={handle('description')} />
                </>
            )}

            {section.kind === 'education' && (
                <>
                    <input className="input" placeholder="Учебное заведение" value={section.school} onChange={handle('school')} />
                    <input className="input" placeholder="Специальность" value={section.degree} onChange={handle('degree')} />
                    <input className="input" placeholder="Период" value={section.period} onChange={handle('period')} />
                </>
            )}

            {section.kind === 'skills' && (
                <textarea className="textarea h-20" placeholder="React, TypeScript…" value={section.skills} onChange={handle('skills')} />
            )}

            {section.kind === 'certificate' && (
                <>
                    <input className="input" placeholder="Название" value={section.title} onChange={handle('title')} />
                    <input className="input" placeholder="Организация" value={section.issuer} onChange={handle('issuer')} />
                    <input className="input" placeholder="Год" value={section.year} onChange={handle('year')} />
                </>
            )}

            {section.kind === 'summary' && (
                <textarea className="textarea h-24" placeholder="Кратко о себе" value={section.text} onChange={handle('text')} />
            )}
        </div>
    )
}
