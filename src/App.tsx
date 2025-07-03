import ThemeToggle from './components/ui/ThemeToggle'
import Editor from './components/Editor/Editor'
import Preview from './components/Preview/Preview'

export default function App() {
    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 border-r border-gray-200 p-3">
                <ThemeToggle />
                <Editor />
            </div>
            <div className="w-1/2 p-3">
                <Preview />
            </div>
        </div>
    )
}
