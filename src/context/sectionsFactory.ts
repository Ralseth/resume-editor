import { nanoid } from 'nanoid';
import type { SectionKind, Section } from '../types/resume';

/** создаёт «пустую» секцию нужного типа */
export function createBlankSection(kind: SectionKind): Section {
    const id = nanoid();
    switch (kind) {
        case 'experience':
            return { id, kind, position: '', company: '', period: '', description: '' };
        case 'education':
            return { id, kind, school: '', degree: '', period: '' };
        case 'skills':
            return { id, kind, skills: '' };
        case 'certificate':
            return { id, kind, title: '', issuer: '', year: '' };
        case 'summary':
            return { id, kind, text: '' };
    }
}
