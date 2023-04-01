import logo from './logo.svg';
import './App.css';
import {Authenticator} from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';


Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator>
      {({signOut, user}) => {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
            <button onClick={signOut}>Sign out</button>
            <ProfileModal></ProfileModal>
          </div>
          )
      }}
    </Authenticator>
  );
}

export default App;
