import styles from './CountDownMeter.module.css';

interface CountDownMeterProps {
  remainingDays: number;
  remainingHours: number;
  dailyRequiredAverage: number;
}

function CountDownMeter({ remainingDays, remainingHours, dailyRequiredAverage }: CountDownMeterProps) {
  return (
    <div className={styles.container}>
      <div>▶ 2027年2月1日 までの 残り日数: {remainingDays} 日</div>
      <div>▶ 1000時間 達成までの 残り時間: {remainingHours} 時間</div>
      <div className={styles.average}>
        今日から 毎日 【 {dailyRequiredAverage.toFixed(2)} 時間 】勉強せよ！
      </div>
    </div>
  );
}

export default CountDownMeter;