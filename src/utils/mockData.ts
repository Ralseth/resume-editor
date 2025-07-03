import {type SectionKind} from '../types/resume';

export const mockFor = (kind: SectionKind) => {
    switch (kind) {
        case 'experience':
            return {
                position: 'Frontend-разработчик',
                company: 'TechCorp',
                period: '2021 — наст. время',
                description:
                    'Разрабатываю SPA на React, внедрил систему дизайн-токенов, ускорил сборку на 30 %.',
            };
        case 'education':
            return {
                school: 'Национальный университет',
                degree: 'Бакалавр информатики',
                period: '2017 — 2021',
            };
        case 'skills':
            return {
                skills: 'React, TypeScript, Tailwind, Node.js, Docker',
            };
        case 'certificate':
            return {
                title: 'React Developer',
                issuer: 'Udemy',
                year: '2023',
            };
        case 'summary':
            return {
                text: 'Frontend-разработчик с 3-летним опытом, фокус на UI-инженерию и производительность.',
            };
    }
};
