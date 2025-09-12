interface ChangeLogsProps {
    changelogs: [string, string[]][];
}

export default function ChangeLogs({ changelogs }: ChangeLogsProps) {
    return (
        <div className="px-8 py-4 lg:py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4">Changelogs:</h1>
                {changelogs.map(([version, logs], index) => (
                    <div key={index} className="mb-6 border-l-4 border-blue-500 pl-4">
                        <h2 className="text-xl font-medium mb-2">{version}</h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {logs.map((log, idx) => (
                                <li key={idx}>{log}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
