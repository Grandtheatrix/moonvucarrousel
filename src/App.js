import React, {useEffect, useState} from 'react';
import './App.css';
import Amplify,{ Auth, Storage } from 'aws-amplify';
import { withAuthenticator} from 'aws-amplify-react';
import ImageGallery from 'react-image-gallery';
import "../node_modules/react-image-gallery/styles/css/image-gallery.css";

Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:a5ff231d-b948-4073-8e5e-6b079663e8b1',
        region: 'us-east-1', 
        userPoolId: 'us-east-1_SNVaKJ7vD', 
        userPoolWebClientId: '2lof3mvtb8faunb0bk47dovfkj', 
    },
    Storage: {
        AWSS3: {
            bucket: 'moon-vu-carrousel-test-bucket1',
            region: 'us-east-1',
        }
    }
});

Auth.configure({
  identityPoolId: 'us-east-1:a5ff231d-b948-4073-8e5e-6b079663e8b1',
  region: 'us-east-1'
});

Storage.configure({
  AWSS3: {
      bucket: 'moon-vu-carrousel-test-bucket1',
      region: 'us-east-1'
  }
});




function App() {
  const [slides, setSlides] = useState([]);
  
  useEffect(() => {
    const getSlides = async results => {
      let newSlides = [];
      for (let i of results){
        if (i.key !== ""){
          await Storage.get(i.key).then(result => {
            newSlides.push({original:result, thumbnail:result})
          } 
          )
        }
      }
      console.log("newSlides", newSlides);
      setSlides(newSlides);
    }
    const test = () =>{
      Storage.list('')
      .then(
        results => {
          console.log("StorageList Results",results);
          getSlides(results)
        })
      .catch(err => console.log(err));
    }
    test();
  }, [])
  return (
    <div className="App">
      <div className="carousel">
      {slides.length > 0 &&
        <ImageGallery 
        items={slides}
        autoPlay={true}
        showPlayButton={true}
        showBullets={true}
        infinite={true}
        />
      }
      </div>
    </div>
  );
}

export default withAuthenticator(App);
