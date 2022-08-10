import MainMenu from '../MainMenu';
import MainScreen from '../MainScreen';
import './style.scss';

function Main() {
  return (
    <main className="main">
      <MainMenu />
      <MainScreen />
    </main>
  );
}

Main.propTypes = {
  
};

export default Main;
