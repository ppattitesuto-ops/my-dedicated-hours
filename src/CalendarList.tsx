import styles from './CalendarList.module.css';

interface CalendarListProps {
  recentDateArr: string[];
  logs: Record< string, number>;
}

function CalendarList({ recentDateArr, logs }: CalendarListProps) {
  return (
      <div className={styles.container}>
        {recentDateArr.map((datekey) => {
          const hours = logs[datekey] || 0;

          return (
            <div key={datekey} className={styles.calendarList}
            >
              <div className={styles.calendarItem}>
                {datekey.split('/')[1]}/{datekey.split('/')[2]}
              </div>
              <div className={`${styles.hoursBase} ${hours > 0 ? styles.goodHours : styles.badHours }`}>
                {hours}h
              </div>
            </div>
          );
        })}
      </div>
  );
}

export default CalendarList;