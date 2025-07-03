import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { SectionKind } from '../../types/resume';   // ← type-only
import SectionForm from './SectionForm';
import { useResume } from '../../hooks/useResume';
import type { DndListeners } from '../../types/dnd';


type DndHandle = {
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners: DndListeners;
};

function SortableCard({
                          id,
                          children,
                      }: {
    id: string;
    children: (h: DndHandle) => JSX.Element;
}) {
    const { setNodeRef, transform, transition, attributes, listeners } =
        useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div ref={setNodeRef} style={style}>
            {children({
                attributes,
                listeners: (listeners as unknown as DndListeners) ?? {},
            })}
        </div>
    );
}

export default function Editor() {
    const { sections, addSection, updateSection, removeSection, reorderSections } = useResume();

    const sensors = useSensors(useSensor(PointerSensor));

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;
        const oldIndex = sections.findIndex((s) => s.id === active.id);
        const newIndex = sections.findIndex((s) => s.id === over.id);
        reorderSections(arrayMove(sections, oldIndex, newIndex));
    };

    return (
        <>
            {/* Добавление секции */}
            <div className="mb-6">
                <label className="mr-3 font-medium">Добавить секцию:</label>
                <select
                    className="select"
                    onChange={(e) => {
                        addSection(e.target.value as SectionKind);
                        e.target.selectedIndex = 0;
                    }}
                >
                    <option hidden>Выберите…</option>
                    <option value="experience">Опыт</option>
                    <option value="education">Образование</option>
                    <option value="skills">Навыки</option>
                    <option value="certificate">Сертификаты</option>
                    <option value="summary">О&nbsp;себе</option>
                </select>
            </div>

            {/* Секции */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                    {sections.map((s) => (
                        <SortableCard key={s.id} id={s.id}>
                            {(h) => (
                                <SectionForm
                                    section={s}
                                    dragAttributes={h.attributes}
                                    dragListeners={h.listeners}
                                    onChange={(patch) => updateSection(s.id, patch)}
                                    onRemove={() => removeSection(s.id)}
                                />
                            )}
                        </SortableCard>
                    ))}
                </SortableContext>
            </DndContext>
        </>
    );
}
