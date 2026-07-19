import styles from './HourForm.module.css';

interface HourFormProps {
  inputHours: string;
  setInputHours: React.Dispatch<React.SetStateAction<string>>;
  handleAddHours: () => void;
  // voidは何も存在しないという意味で、中身はカラだけどデータ自体は存在している(返り値がある)という点で違う。
  // voidを関数の方に当てはめることで、その関数で返り値はなく処理を実行するだけの使い切り関数であることを示せる。
  totalHours: number;
}

function HourForm({ inputHours, setInputHours, handleAddHours, totalHours }: HourFormProps) {
  return (
    <div className={styles.container}>
      <span>▶ 今日の勉強時間を入れる: </span>
      <input
        type="number"
        value={inputHours}
        onChange={(e) => setInputHours(e.target.value)}
        className={styles.studyHours}
      />
      <span> 時間</span>
      <button
        onClick={() => handleAddHours()}
        className={styles.addBtn}
      >
        ⚔加算する
      </button>
      <div>▶ 今日までの勉強時間: {totalHours}時間</div>
    </div>
  );
}

export default HourForm;
