import './App.css';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Upload your hand history txt files (Usually found in C:\ACR Poker\handHistory\username):</p>
        <FileUpload></FileUpload>
      </header>
    </div>
  );
}

export default App;
