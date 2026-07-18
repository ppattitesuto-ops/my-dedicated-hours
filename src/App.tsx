import { useState, useEffect } from "react";
import HourForm from "./HourForm";
import CalendarList from "./CalendarList";
import CountDownMeter from "./CountdownMeter";


function App() {
  const [totalHours, setTotalHours] = useState(() => Number(localStorage.getItem('totalHours')) || 0);
  const [inputHours, setInputHours] = useState('');
  const [logs, setLogs] = useState(() => {
    const local = localStorage.getItem('studyLogs');
    return local ? JSON.parse(local) : {};
  });

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
    localStorage.setItem('totalHours', String(totalHours));
    localStorage.setItem('studyLogs', JSON.stringify(logs));
  }, [totalHours, logs])
  // ※キーや変数にはそのデータの中身に何が入っているかわかるようにする。何を表すか、文字なのか、(Str)数字なのか(NUM)

  // 今日の勉強時間を入力する処理
  const handleAddHours = () => {
    if (!inputHours || Number(inputHours) <= 0) return;
    const d = new Date();
    const todayStr = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    const nextLogs = { ...logs, [todayStr]: Number(inputHours) };
    setLogs(nextLogs);
    const nextTotalHours = totalHours + Number(inputHours);
    setTotalHours(nextTotalHours);
    setInputHours('');
  }
  // ※コードの可読性をよくするためにも、計算するものなどは一度変数に入れて管理する。情報を細かく管理することでコードが分かりやすくなる。

  const recentDateArr = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const dateStr = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;

    recentDateArr.push(dateStr);
  }

  recentDateArr.reverse();

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
      <CountDownMeter remainingDays={remainingDays} remainingHours={remainingHours} dailyRequiredAverage={dailyRequiredAverage}/>

      {/* 🛠️ 今日の勉強時間をレコーディングするエリア */}
      <HourForm inputHours={inputHours} setInputHours={setInputHours} handleAddHours={handleAddHours} totalHours={totalHours}/>
    

      {/* // 日々の学習ログカレンダーエリア */}
      <h2 style={{ fontSize: '18px',marginTop: '30px'}}>▶ 勉強の記録（直近7日間）</h2>
      <CalendarList recentDateArr={recentDateArr} logs={logs} />
    </div>
  );
}

export default App;