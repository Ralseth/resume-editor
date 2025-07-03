/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Section, SectionKind } from '../types/resume'
import { createBlankSection } from './sectionsFactory'

interface ResumeContextValue {
    sections: Section[]
    addSection: (kind: SectionKind) => void
    updateSection: (id: string, patch: Partial<Section>) => void
    removeSection: (id: string) => void
    reorderSections: (next: Section[]) => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sections, setSections] = useLocalStorage<Section[]>('resume', [])

    const addSection = useCallback((kind: SectionKind) => {
        setSections(prev => {
            const next = [...prev, createBlankSection(kind)]
            return next as Section[]
        })
    }, [setSections])

    const updateSection = useCallback((id: string, patch: Partial<Section>) => {
        setSections(prev => {
            const next = prev.map(s => (s.id === id ? { ...s, ...patch } : s))
            return next as Section[]
        })
    }, [setSections])

    const removeSection = useCallback((id: string) => {
        setSections(prev => prev.filter(s => s.id !== id) as Section[])
    }, [setSections])

    const reorderSections = useCallback((next: Section[]) => {
        setSections(next)
    }, [setSections])

    return (
        <ResumeContext.Provider value={{ sections, addSection, updateSection, removeSection, reorderSections }}>
            {children}
        </ResumeContext.Provider>
    )
}

export function useResume(): ResumeContextValue {
    const ctx = useContext(ResumeContext)
    if (!ctx) throw new Error('useResume must be used внутри ResumeProvider')
    return ctx
}
