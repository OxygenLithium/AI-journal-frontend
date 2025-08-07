function AIResponseTab({ response, query }) {
    return (
        <div className="space-y-4">
            {query && (
                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Query:</h3>
                    <p className="text-gray-900">{query}</p>
                </div>
            )}
            <div className="bg-white rounded-lg border p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Response:</h3>
                <pre className="whitespace-pre-wrap break-words text-gray-900">
                    {response || 'No response yet...'}
                </pre>
            </div>
        </div>
    )
}

export default AIResponseTab;