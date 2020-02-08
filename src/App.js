import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify,{ Auth, Storage } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:a5ff231d-b948-4073-8e5e-6b079663e8b1', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'us-east-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'us-east-1_SNVaKJ7vD', //REQUIRED - Amazon Cognito User Pool ID
        userPoolWebClientId: '2lof3mvtb8faunb0bk47dovfkj', //REQUIRED - Amazon Cognito Web Client ID
    },
    Storage: {
        AWSS3: {
            bucket: 'moon-vu-carrousel-test-bucket1', //REQUIRED -  Amazon S3 bucket
            region: 'us-east-1', //REQUIRED -  Amazon service region
        }
    }
});

Auth.configure({
  // To get the aws credentials, you need to configure 
  // the Auth module with your Cognito Federated Identity Pool
  identityPoolId: 'us-east-1:a5ff231d-b948-4073-8e5e-6b079663e8b1',
  region: 'us-east-1'
});

Storage.configure({
  AWSS3: {
      bucket: 'moon-vu-carrousel-test-bucket1',//Your bucket name;
      region: 'us-east-1'//Specify the region your bucket was created in;
  }
});



function App() {
  useEffect(() => {
    const test = () =>{
      Storage.list('')
      .then(result => console.log("StorageList Results",result))
      .catch(err => console.log(err));
    }
    test();
  }, [])
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
    </div>
  );
}

export default withAuthenticator(App);
