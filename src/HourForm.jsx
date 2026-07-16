import styles from './HourForm.module.css';

function HourForm({ inputHours, setInputHours, handleAddHours }) {
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
    </div>
  );
}

export default HourForm;
