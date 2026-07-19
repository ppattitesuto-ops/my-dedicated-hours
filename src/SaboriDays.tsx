import styles from './SaboriDays.module.css';

interface SaboriDaysProps {
  continuousSaboriDays: number;
}

function SaboriDays({ continuousSaboriDays }: SaboriDaysProps) {
  return (
    <>
      {continuousSaboriDays > 0 && (
        <div className={styles.SaboriInspect}>
          <div>【⚠️警告：サボり魔 検知】</div>
          <div className={styles.SaboriCoutinuous}>
            あなたは今【 {continuousSaboriDays} 日連続】でサボっています！
          </div>
          <div className={styles.SaboriAlertTitle}>
            {continuousSaboriDays > 3 ? (
              <span className={styles.SaboriAlert}>
                💀 【ゲームオーバー寸前】体がしびれて動けない！早く勉強せい！
              </span>
            ) : (
              <span>
                ⚔ もう迷わない！心を入れ替えて地道な一歩を続けるのだ！
              </span>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default SaboriDays;