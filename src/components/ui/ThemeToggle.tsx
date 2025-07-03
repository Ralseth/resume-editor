import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [dark, setDark] = useState(() => localStorage.theme === 'dark')

    useEffect(() => {
        const root = document.documentElement
        if (dark) {
            root.classList.add('dark')
            localStorage.theme = 'dark'
        } else {
            root.classList.remove('dark')
            localStorage.theme = 'light'
        }
    }, [dark])

    return (
        <button
            onClick={() => setDark(d => !d)}
            className="mb-4 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm"
        >
            {dark ? 'Светлая тема' : 'Тёмная тема'}
        </button>
    )
}
