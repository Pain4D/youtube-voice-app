import React, { useState } from 'react';
import "./style.css";
function App() {
    const [url, setUrl] = useState(''); // Поле для ввода URL видео
    const [voice, setVoice] = useState(''); // Выбранный голос
    const [loading, setLoading] = useState(false); // Индикатор загрузки
    const [output, setOutput] = useState(null); // Ссылка на результат

    // Отправка формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Включаем индикатор загрузки

        if (!url || !voice) {
            alert("Пожалуйста, заполните все поля!");
            setLoading(false); // Отключаем индикатор загрузки
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/process_video/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ youtube_url: url, voice }),
            });
            const data = await response.json();
            setOutput(data.output); // Сохраняем ссылку на результат
        } catch (error) {
            console.error("Ошибка при обработке видео:", error);
        } finally {
            setLoading(false); // Отключаем индикатор загрузки
        }
    };

    return (
        <div class = "body">
            <div class = "body1">
            <h1>Озвучка видео</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    class="input"
                    type="text" 
                    placeholder="Ссылка на YouTube" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                />
                <div class = "id">
                ID голоса 
                    <input 
                        class="input"
                        id = "input_id"
                        type="text" 
                        placeholder="1"
                        value={voice} 
                        onChange={(e) => setVoice(e.target.value)} 
                    />
                </div>
                <button class = "button" type="submit" disabled={loading}>
                    {loading ? "Обработка..." : "Начать"}
                </button>
            </form>

            {/* Показываем видео плеер, если результат доступен */}
            {output && (
                <>
                    <h2>Результат обработки</h2>
                    <video controls>
                        <source src={`http://localhost:8000${output}`} type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                    </video>
                    <a class = "button" href={`http://localhost:8000${output}`} download>Скачать</a>
                </>
            )}
        </div>
        </div>
    );
}

export default App;
