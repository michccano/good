import React from 'react';
import Toolbar from 'polotno/toolbar/toolbar';
import ZoomButtons from 'polotno/toolbar/zoom-buttons';
import SidePanel from 'polotno/side-panel/side-panel';
import Workspace from 'polotno/canvas/workspace';

import { observer } from 'mobx-react-lite';
import { TextSection, UploadSection, PhotosSection,  ElementsSection, BackgroundSection } from "polotno/side-panel/side-panel";
import { SectionTab } from "polotno/side-panel/tab-button";
import templates from './assets/templatessvg@2x.svg'
import styles from './assets/stylessvg@2x.svg'
import qoutes from './assets/quotessvg@2x.svg'
import elements from './assets/elementssvg@2x.svg'
import removeBG from './assets/removebgsvg@2x.svg'
import folders from './assets/folderssvg@2x.svg'

import Topbar from './topbar';
import { getSuggestedQuery } from '@testing-library/dom';
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";

import { ImagesGrid } from "polotno/side-panel/images-grid";
import { Text, Button, InputGroup } from "@blueprintjs/core";
import { getImageSize } from "polotno/utils/image";



const PhotosPanel = observer(({ store }) => {

const [images, setImages] = React.useState([]);
const [search_bar,setsb] = React.useState("")


function handleChange(event) {
  setsb(event.target.value);

}


function kup(event){
  if(event.keyCode==13){
 
    loadImages(); 
  
  }
}


async function loadImages() {

    setImages([]);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    fetch("https://pixabay.com/api/?key=19999898-164f9544ec15ad00582274e8e&q="+search_bar+"&image_type=photo")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result.hits);
        var allImages = [];

        for(var i=0; i<result.hits.length; i++){
       allImages.push({url:result.hits[i].webformatURL});
      }

      setImages(allImages);

      },




      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        
      }
    )


    // for demo images are hard coded
    // in real app here will be something like JSON structure
 
  }


  React.useEffect(() => {
    loadImages();
  }, []);


  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
     
  
     
      <InputGroup
        leftIcon="search"
        placeholder="Search..."
        onChange={handleChange}
        onKeyUp={kup}
        style={{
          marginBottom: "20px"
        }}
      />

      {/* you can create yur own custom component here */}
      {/* but we will use built-in grid component */}
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image) => {
          var x = 32; var y= 32;
          const { width, height } = await getImageSize(image.url);
          store.activePage.addElement({
            type: "image",
            src: image.url,
            width,
            height,x,y
          });
        }}
        rowsNumber={2}
        isLoading={!images.length}
        loadMore={false}
      />
    </div>
  );
});




const QuotesPanel = observer(({ store }) => {
  const [quote_search,setquote] = React.useState("")
  const [quotes,setquotes] = React.useState([])

  function handleChange(event) {
    
   
    setquote(event.target.value);

  }

  function kup(event){
    if(event.keyCode==13){
   
      searchNow(); 
    
    }
  }

  function go(txt) {

   
      const element = store.activePage.addElement({
        type: 'text',
        width:200,
        height:200,
        x: 50,
        y: 50,
        fill: 'black',
        text: quotes[txt.target.getAttribute('id')].quote,
      });
    
      const element1 = store.activePage.addElement({
        type: 'text',
        width:200,
        height:200,
        x: 50,
        y: 80,
        fill: 'black',
        text: quotes[txt.target.getAttribute('id')].author,
      });
    

      }


      React.useEffect(() => {
        setquotes([]);
      }, []);
    

      async function searchNow(){

   
     
      fetch("http://localhost:5000/search_quotes/"+quote_search)
      .then(res => res.json())
      .then(
        (result) => {
         
          if(result.data.length>0){

          var allQuotes = [];
  
          for(var i=0; i<result.data.length; i++){
         allQuotes.push({quote:result.data[i].quote,author:result.data[i].author});
        }
  
        setquotes(allQuotes);
      }
        },
  
  

        (error) => {
          
        }
      )

      }
  

  return (
    <div style={{ height: "100%", overflowY:'scroll', display: "flex", flexDirection: "column" }}>
        <InputGroup
        leftIcon="search"
        placeholder="Search..."
        onKeyUp={kup}
       onChange={handleChange}
        style={{
          marginBottom: "20px"
        }}
      />

<div class="container">
    {quotes.map((person, index) => (
   
<div style={{'margin-top':'35px'}}>
    <figure style={{
        margin: '0',
  background: '#eee',
  padding: '1em',
  'border-radius': '1em'
      }} class="quote" id={index} onClick={go}  >
      <blockquote style={{  margin: '1em'}}>
       <p style={{color: 'black'}}>{person.quote}</p>
      </blockquote>
      <figcaption style={{color: 'black'}}>
        &mdash; {person.author} <cite></cite>  </figcaption>
    </figure>
    </div>
       
    ))}
    </div>

    
     </div>
  );
});



const ElementorPanel = observer(({ store }) => {

  const [images, setImages] = React.useState([]);
  const [search_bar,setsb] = React.useState("")
  
  
  function handleChange(event) {
    setsb(event.target.value);
  
  }

  
function kup(event){
  if(event.keyCode==13){
 
    loadImages(); 
  
  }
}
  
  async function loadImages() {
      // here we should implement your own API requests
      setImages([]);
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      fetch("https://pixabay.com/api/?key=19999898-164f9544ec15ad00582274e8e&q="+search_bar+"&image_type=vector")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.hits);
          var allImages = [];
  
          for(var i=0; i<result.hits.length; i++){
         allImages.push({url:result.hits[i].webformatURL});
        }
  
        setImages(allImages);
  
        },
  
  
  
  
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
        }
      )
  
  
      // for demo images are hard coded
      // in real app here will be something like JSON structure
   
    }
  
  
    React.useEffect(() => {
      loadImages();
    }, []);
  
  

    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <InputGroup
          leftIcon="search"
          placeholder="Search..."
          onKeyUp={kup}
          onChange={handleChange}
          style={{
            marginBottom: "20px"
          }}
        />
  
        {/* you can create yur own custom component here */}
        {/* but we will use built-in grid component */}
        <ImagesGrid
          images={images}
          getPreview={(image) => image.url}
          onSelect={async (image) => {
            var x = 32; var y= 32;
            const { width, height } = await getImageSize(image.url);
            store.activePage.addElement({
              type: "image",
              src: image.url,
              width,
              height,x,y
            });
          }}
          rowsNumber={2}
          isLoading={!images.length}
          loadMore={false}
        />
      </div>
    );
  });
  




const App = ({ store }) => {
  const Templates = {
    name: "Templates",
    Tab: (props) => (
      <SectionTab name="Templates" {...props}>
        <img src={templates} />
      </SectionTab>
    ),
    Panel: observer(() => {
      return (
        <div>
          <h1>Templates</h1>
        </div>
      );
    })
  };




  
  // define the new custom section
  const СustomPhotos = {
    name: "photos1",
    Tab: (props) => (
      <SectionTab name="Photos" {...props}>
        <MdPhotoLibrary />
      </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: PhotosPanel
  };
  






  const Styles = {
    name: "Styles",
    Tab: (props) => (
      <SectionTab name="Styles" {...props}>
         <img src={styles} />
      </SectionTab>
    ),
    Panel: observer(() => {
      return (
        <div>
          <h1>Styles</h1>
        </div>
      );
    })
  };



  const Quotes = {
    name: "Quotes",
    Tab: (props) => (
      <SectionTab name="Quotes" {...props}>
         <img src={qoutes} />
      </SectionTab>
    ),
    Panel: QuotesPanel
    
  };


  const Elements = {
    name: "Elements",
    Tab: (props) => (
      <SectionTab name="Elements" {...props}>
         <img src={elements} />
      </SectionTab>
    ),
    Panel: ElementorPanel
    
  };


  const RemoveBG = {
    name: "RemoveBG",
    Tab: (props) => (
      <SectionTab onClick={() => {
        alert('asdasd');
         }} name="RemoveBG" {...props}>
         <img src={removeBG} />
      </SectionTab>
    ),
    Panel: observer(() => {
      return (
        <div>
          <h1>RemoveBG</h1>
          <button  onClick={() => {
     
        window.h();

      }}>Browse</button>
        </div>
      );
    })
  };
  const Folders = {
    name: "Folders",
    Tab: (props) => (
      <SectionTab name="Custom" {...props}>
         <img src={folders} />
      </SectionTab>
    ),
    Panel: observer(() => {
      return (
        <div>
          <h1>Folders</h1>
        </div>
      );
    })
  };
  //PhotosSection,
  const sections = [Templates, TextSection,  СustomPhotos, Elements,  BackgroundSection, Styles, Quotes, RemoveBG, UploadSection, Folders];
  return (
    <React.Fragment>
      <Topbar store={store} />
      <div
        style={{
          display: 'flex',
          height: 'calc(100% - 50px)',
          width: '100%',
          backgroundColor: '#30404d',
        }}
      >
        <div style={{ width: '400px', height: '100%', display: 'flex' }}>
          <SidePanel store={store} sections={sections} defaultSection="Templates"/>
        </div>
        <div
          style={{
            display: 'flex',
            height: '100%',
            margin: 'auto',
            flex: 1,
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Toolbar store={store} />
          <Workspace store={store} />
          <ZoomButtons store={store} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
