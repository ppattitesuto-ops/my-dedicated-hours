import { useState, useEffect } from "react";
import HourForm from "./HourForm";
import CalendarList from "./CalendarList";
import CountDownMeter from "./CountDownMeter";
import styles from './App.module.css';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

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

  // 毎日22時30分に通知
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission();
    }
    const timer = setInterval(() => {
      const nowTime = new Date();
      const currentHour = nowTime.getHours();
      const currentMinute = nowTime.getMinutes();

      if (currentHour === 22 && currentMinute === 30) {
        if (Notification.permission === "granted") {
          new Notification("さあ、明日のためにもう寝なさい。今日も地道に積み上げられたかな？", {
            body: "もう25歳、今までの敗北の歴史を変えるんじゃないのか？",
            icon: "/favicon.ico"
          });
        }
      }
    }, (1 * 1000 * 60));
    return () => clearInterval(timer);
  }, []);

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

  // 直近7日間の日付データ↓TypeScriptらしく型宣言
  const recentDateArr: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    recentDateArr.push(dateStr);
  }
  recentDateArr.reverse();

  interface StudyGraphDataItem {
    name: string;
    hours: number;
  }

  const graphData: StudyGraphDataItem[] = recentDateArr.map((datekey) => {
    const hours = logs[datekey] || 0;
    const shortDateStr = `${datekey.split('/')[1]}/${datekey.split('/')[2]}`;
    return {
      name: shortDateStr,
      hours
    };
  });

  // 直近７日間のデータを合計して判定
  let weeklyTotalHours = 0;
  for (let i = 0; i < recentDateArr.length; i++) {
    const datekey = recentDateArr[i];
    const dayHours = logs[datekey] || 0;
    weeklyTotalHours += dayHours;
  }
  const weeklytargetHours = 25;
  const isSaboriActive = weeklyTotalHours < weeklytargetHours;


  return (
    <div className={`${styles.container} ${isSaboriActive ? styles.curseActive : ''}`}>
      <h1>My Dedicated Hours</h1>

      {/* 📊 運命のカウントダウンメーター */}
      <CountDownMeter remainingDays={remainingDays} remainingHours={remainingHours} dailyRequiredAverage={dailyRequiredAverage} />

      {/* 🛠️ 今日の勉強時間をレコーディングするエリア */}
      <HourForm inputHours={inputHours} setInputHours={setInputHours} handleAddHours={handleAddHours} totalHours={totalHours} />

      {/* // 日々の学習ログカレンダーエリア */}
      <h2 className={styles.calendarTitle}>▶ 勉強の記録（直近7日間）</h2>
      <CalendarList recentDateArr={recentDateArr} logs={logs} />

      {/* 直近1週間の勉強時間推移グラフエリア  */}
      <h3 className={styles.graphTitle}>▶ 勉強時間の推移（グラフ）</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={graphData}>
          <XAxis dataKey="name" stroke="#ffffff" className={styles.graphXY} />
          <YAxis stroke="#ffffff" className={styles.graphXY} />
          <Line type="monotone" dataKey="hours" stroke="#39ff14" strokeWidth={3} dot={{ fill: '#39ff14' }} />
        </LineChart>
      </ResponsiveContainer>
      
    </div>
  );
}

export default App;