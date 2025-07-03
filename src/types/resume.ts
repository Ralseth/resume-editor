export type SectionKind =
    | 'experience'
    | 'education'
    | 'skills'
    | 'certificate'
    | 'summary';

interface Base {
    id: string;
    kind: SectionKind;
}

export interface ExperienceSection extends Base {
    kind: 'experience';
    position: string;
    company: string;
    period: string;
    description: string;
}

export interface EducationSection extends Base {
    kind: 'education';
    school: string;
    degree: string;
    period: string;
}

export interface SkillsSection extends Base {
    kind: 'skills';
    skills: string;
}

export interface CertificateSection extends Base {
    kind: 'certificate';
    title: string;
    issuer: string;
    year: string;
}

export interface SummarySection extends Base {
    kind: 'summary';
    text: string;
}

export type Section =
    | ExperienceSection
    | EducationSection
    | SkillsSection
    | CertificateSection
    | SummarySection;

/** Фабрика пустых секций, без `as`-хаков */
export const createBlankSection = (kind: SectionKind, id: string): Section => {
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
};
