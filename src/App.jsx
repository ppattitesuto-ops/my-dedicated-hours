import { useState, useEffect } from "react";

function App() {
  const [totalHours, setTotalHours] = useState(() => Number(localStorage.getItem('totalHours')) || 0);
  const [inputHours, setInputHours] = useState('');

  // 🎯 1000時間という絶対の目標値
  const targetHours = 1000;
  // 📅 目標期限（2027年2月1日 0時0分0秒）のタイムスタンプを作る
  const deadline = new Date('2027-02-01T00:00:00').getTime();
  // 🕒 「今この瞬間」の最新のタイムスタンプを取得  →new Date().getTime()と同じ意味
  const now = Date.now();
  // 残り時間のミリ秒を計算（未来の期限 - 今）
  const diffMs = deadline - now;
  const remainingDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const remainingHours = targetHours - totalHours;
  const dailyRequiredAverage = remainingDays > 0 ? (remainingHours / remainingDays) : 0;

  // 変数の値が変わるたびに自動保存
  useEffect(() => {
    localStorage.setItem('totalHours', totalHours);
  },[totalHours])

  // 今日の勉強時間を入力する処理
  const handleAddHours = () => {
    if (!inputHours || Number(inputHours) <= 0) return;
    const nextTotalHours = totalHours + Number(inputHours);
    setTotalHours(nextTotalHours);
    setInputHours('');
  }

  return (
    <div style={{
      padding: '20px',
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: '"DotGothic16", sans-serif',
      margin: '16px auto',
    }}>
      <h1>My Dedicated Hours</h1>

      {/* 📊 運命のカウントダウンメーター */}
      <div style={{
        border: '3px double #ffffff',
        padding: '20px',
        maxWidth: '400px',
        marginBottom: '20px',
      }}>
        <div>▶ 2027年2月1日 までの 残り日数: {remainingDays} 日</div>
        <div>▶ 1000時間 達成までの 残り時間: {remainingHours} 時間</div>
        <div style={{
          color: '#ff5555',
          marginTop: '10px'
        }}>
          今日から 毎日 【 {dailyRequiredAverage.toFixed(2)} 時間 】勉強せよ！
        </div>
      </div>

      {/* 🛠️ 今日の勉強時間をレコーディングするエリア */}
      <div style={{ marginTop: '20px' }}>
        <span>▶ 今日の勉強時間を入れる: </span>
        <input
          type="number"
          value={inputHours}
          onChange={(e) => setInputHours(e.target.value)}
          style={{ backgroundColor: '#000000', color: '#ffffff', border: '1px solid #ffffff', padding: '5px', width: '60px', fontFamily: '"DotGothic16", sans-serif' }}
        />
        <span> 時間</span>
        <button
          onClick={() => handleAddHours()}
          style={{ marginLeft: '10px', backgroundColor: '#000000', color: '#ffffff', border: '1px solid #ffffff', padding: '5px', cursor: 'pointer', fontFamily: '"DotGothic16", sans-serif' }}
        >
          ⚔加算する
        </button>
      </div>
      <div>今日までの勉強時間: {totalHours}時間</div>
    </div>
  );
}

export default App;