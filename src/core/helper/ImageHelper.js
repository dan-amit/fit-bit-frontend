import React, { useState, useEffect } from "react";
import { API } from "../../backend";

var key = "DesXuxUSQNtAQEMZFlTzmNSTFaWyf3oI5uH1YXpdHn4";
var def = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTg2MTN8MHwxfHNlYXJjaHwxfHxwaXp6YXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=200"
const ImageHelper = ({ foodname }) => {

  console.log('Image ',foodname)

  var left = `https://api.unsplash.com/search/photos?query=${foodname} `
  var right = ` &client_id=${key}`;
  var urlLink = left + "+" + right;

  const [url, setUrl] = useState('');

  useEffect(() => {
    loadImageUrl();
  }, [url])

  // const loadImageUrl = () => {
  //  fetch(`http://glyffix.com/api/Image?word=${foodname}`)
  //     .then(data => {
  //       console.log(data)
  //       if(data.imageurl) setUrl(data.imageurl);
  //     })
  //     .catch(err => console.log("Error !! ", err));

  // }

  const loadImageUrl = () => {
   fetch(urlLink)
      .then(x => x.json())
      .then(x => {
        if(x.results.length == 0) { console.log("hello world", foodname); setUrl(def);}

        else setUrl(x.results[0].urls.thumb)
      })
      .catch(err => console.log("Err!!", err));
  }
  
  return (
    <div className="rounded border border-success p-2">
      <img
        src={url}
        alt="photo"
        style={{ width: "200px", height: "200px" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;







/*
  const access_key = "DesXuxUSQNtAQEMZFlTzmNSTFaWyf3oI5uH1YXpdHn4";
  const numberOfPhotos = 1;

  var foodname = "pizza";
  const url = "https://api.unsplash.com/search/photos?query=" +  +"" + &client_id=" + access_key;

  console.log('Image ',foodname)

  const [url, setUrl] = useState('');

  useEffect(() => {
    loadImageUrl();
  }, [url])

  const loadImageUrl = () => {
   fetch(url)
      .then(data => {

        if(data.imageurl) setUrl(data.imageurl);
      })
      .catch(err => console.log("Error !! ", err));

    fetch(url)
      .then(res => res.json())
      .then(res => {
        url = res.results[0].urls.full;
      })
      .catch(err => console.log(err))
  }

*/


  /*

  const clientID =
    "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d";

  const { useState, useEffect, useRef } = React;

  const simpleGet = options => {
    superagent.get(options.url).then(function(res) {
      if (options.onSuccess) options.onSuccess(res);
    });
  };

  const App = () => {
    let [photos, setPhotos] = useState([]);
    let [query, setQuery] = useState("");
    const queryInput = useRef(null);

    const numberOfPhotos = 10;
    const url =
      "https://api.unsplash.com/photos/random/?count=" +
      numberOfPhotos +
      "&client_id=" +
      clientID;

    useEffect(() => {
      const photosUrl = query ? `${url}&query=${query}` : url;

      simpleGet({
        url: photosUrl,
        onSuccess: res => {
          setPhotos(res.body);
        }
      });
    }, [query, url]);

    const searchPhotos = e => {
      e.preventDefault();
      setQuery(queryInput.current.value);
    };

    return (
      <div className="box">
        <form
          id="unsplash-search"
          className="unsplash-search form"
          onSubmit={searchPhotos}
        >
          <label>
            Search Photos on Unsplash
            <input
              ref={queryInput}
              placeholder="Try 'dogs' or 'coffee'!"
              type="search"
              className="input"
              defaultValue=""
              style={{ marginBottom: 20 }}
            />
          </label>
        </form>

        <ul className="photo-grid">
          {photos.map(photo => {
            return (
              <li key={photo.id}>
                <img
                  src={photo.urls.regular}
                  onSuccessfulClipboardCopy={() => {
                    // showUserMessage();
                    // pingUnsplash(photo.links.download_location);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  ReactDOM.render(<App />, document.getElementById("root"));



  const access_key = "DesXuxUSQNtAQEMZFlTzmNSTFaWyf3oI5uH1YXpdHn4";
  const numberOfPhotos = 1;

  const url = "https://api.unsplash.com/photos/random/?count=" +numberOfPhotos + "&client_id=" + access_key;
  const url = "https://api.unsplash.com/photos/random/?count=" +numberOfPhotos + "&client_id=" + access_key;


    "https://api.unsplash.com/search/photos?query=fish&count=1&client_id=" + access_key

  fetch(url).then(res => res.json()).then(res => console.log(res))


  curl https://api.unsplash.com/search/photos?query=canada


  "https://api.unsplash.com/search/photos?query=fish + &client_id=" + access_key;

  const url = `https://api.unsplash.com/search/photos?query=${foodname} + &client_id=${access_key}`

  */