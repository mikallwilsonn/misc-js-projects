// -------- Scripts for RSS Feed 
// ------------------------------------

const theFeed = document.querySelector("#feed-url");
const urlSubmitButton = document.querySelector("#submit-url");
let websiteURL;
let feedURL;


// ---- Fetching the Feed
urlSubmitButton.addEventListener('click', function() {
    websiteURL = theFeed.value;
    fetch( websiteURL ).then( (res) => {
        res.text().then(( htmlText ) => {
            let domParser = new DOMParser();
            let doc = domParser.parseFromString( htmlText, 'text/html' );
            feedURL = doc.querySelector( 'link[type="application/rss+xml"]' );
        })
    }).catch(() => console.error( 'Error in fetching the website' ) );

    fetch( feedURL ).then(( res ) => {
        res.text().then(( xmlText ) => {
            let domParser = new DOMParser();
            let doc = domParser.parseFromString( xmlText, 'text/xml' );
            doc.querySelectorAll( 'item' ).forEach(( item ) => {
                let h1 = document.createElement( 'h1' );
                h1.textContent = item.querySelector( 'title' ).textContent;
                document.querySelector( 'output' ).appendChild( h1 );
            })
        })
    })

})
