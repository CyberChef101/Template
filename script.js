const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded=0;
let totalImages=0;
let photoArray = [];


//unspalsh API
const count = 5;
const apiKey = '9hPct16bxVZwhKKeWm_8uBgXWpSOcb4JCYKPf2SVyD8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
        if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
      }
}


// crete elements for link & photos ,add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
       //run function for each object in photoArray
    photoArray.forEach((photo) => {

        //create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href' , photo.links.html);
        item.setAttribute('target' , '_blank');

        //create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src' , photo.urls.regular);
        img.setAttribute('alt' , photo.alt_description);
        img.setAttribute('title' , photo.alt_description);
        
          //event listner,click when each is finished loading
        img.addEventListener('load',imageLoaded);

        //put <img> inside <a> and then put both inside the imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// get photos from api
async function getPhotos() {
    try{
        const response = await fetch (apiUrl);
        photoArray = await response.json();
        displayPhotos();
        
       

    } catch(error) {
        //catch error here
    }
}

//check to see if scrolling nbear bottom of page ,load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        
    }
});

// on load
getPhotos();