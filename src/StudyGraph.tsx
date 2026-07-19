import styles from './StudyGraph.module.css';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface StudyGraphDataItem {
  name: string;
  hours: number;
}
interface StudyGraphProps {
  graphData: StudyGraphDataItem[];
}

function StudyGraph({ graphData }: StudyGraphProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={graphData}>
        <XAxis dataKey="name" stroke="#ffffff" className={styles.graphXY} />
        <YAxis stroke="#ffffff" className={styles.graphXY} />
        <Line type="monotone" dataKey="hours" stroke="#39ff14" strokeWidth={3} dot={{ fill: '#39ff14' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default StudyGraph;
