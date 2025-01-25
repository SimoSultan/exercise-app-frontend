import {
  BasicAlert,
  FixedBottomNavigation,
  Header,
} from './library/components/exports';
import ExerciseRouter from './library/routes/ExerciseRouter';

import './App.css';
import { useExerciseContext } from './library/store/context';

function App() {
  const { state } = useExerciseContext();
  const { alert } = state;

  return (
    <div className='App'>
      <Header />
      <ExerciseRouter />
      <FixedBottomNavigation />
      <BasicAlert
        type={alert.type}
        message={alert.message}
      />
    </div>
  );
}

export default App;
