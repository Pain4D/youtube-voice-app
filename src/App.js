import React, { useState } from 'react';

function App() {
    const [url, setUrl] = useState('');
    const [voice, setVoice] = useState('');
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!url || !voice) {
            alert("Пожалуйста, заполните все поля!");
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/process_video/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ youtube_url: url, voice })
            });
            const data = await response.json();
            setOutput(data.output);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Озвучка видео</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Ссылка на YouTube" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Голос (например, ru_male)" 
                    value={voice} 
                    onChange={(e) => setVoice(e.target.value)} 
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Обработка..." : "Начать"}
                </button>
            </form>
            {output && <a href={output}>Скачать результат</a>}
        </div>
    );
}

export default App;
