// -------- Scripts for RSS Feed 
// ------------------------------------
/*
let websiteUrl = 'http://www.hongkiat.com/blog/feed/';
let feedUrl = 'http://www.hongkiat.com/blog/feed/';

// ---- Fetching the feed
fetch( websiteUrl ).then(( res ) => {
    res.text().then(( htmlTxt ) =>{
        var domParser = new DOMParser();
        let doc = domParser.parseFromString( htmlTxt, 'text/html' );
        var feedUrl = doc.querySelector( 'link[type="application/rss+xml"]' );
    })
}).catch(() => console.error( 'There was an error fetching the website.' ) );

fetch( feedUrl ).then(( res ) =>{
    res.text().then(( xmlTxt) => {
        var domParser = new DOMParser();
        let doc = domParser.parseFromString( xmlTxt, 'text/xml' );
        doc.querySelectorAll( 'item' ).forEach(( item ) => {
            let h1 = document.createElement( 'h1' );
            h1.textContent = item.querySelector( 'title' ).appendChild( h1 );
        })
    })
})*/
const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())
/* Fetch URLs from JSON */
fetch('urls.json').then((res) => {
	res.text().then((data) => {
		var frag = document.createDocumentFragment()
		var hasBegun = true
		JSON.parse(data).urls.forEach((u) => {
			try {
				var url = new URL(u)
			}
			catch (e) {
				console.error('URL invalid');
				return
			}
			fetch(url).then((res) => {
				res.text().then((htmlTxt) => {
					/* Extract the RSS Feed URL from the website */
					try {
						let doc = DOMPARSER(htmlTxt, 'text/html')
						var feedUrl = doc.querySelector('link[type="application/rss+xml"]').href
					} catch (e) {
						console.error('Error in parsing the website');
						return
					}
					/* Fetch the RSS Feed */
					fetch(feedUrl).then((res) => {
						res.text().then((xmlTxt) => {
							/* Parse the RSS Feed and display the content */
							try {
								let doc = DOMPARSER(xmlTxt, "text/xml")
								let heading = document.createElement('h1')
								heading.textContent = url.hostname
								frag.appendChild(heading)
								doc.querySelectorAll('item').forEach((item) => {
									let temp = document.importNode(document.querySelector('template').content, true);
									let i = item.querySelector.bind(item)
									let t = temp.querySelector.bind(temp)
									t('h2').textContent = !!i('title') ? i('title').textContent : '-'
									t('a').textContent = t('a').href = !!i('link') ? i('link').textContent : '#'
									t('p').innerHTML = !!i('description') ? i('description').textContent : '-'
									t('h3').textContent = url.hostname
									frag.appendChild(temp)
								})
							} catch (e) {
								console.error('Error in parsing the feed')
							}
							if(hasBegun) {
								document.querySelector('output').textContent = ''; 
								hasBegun = false;
							}
							document.querySelector('output').appendChild(frag)
						})
					}).catch(() => console.error('Error in fetching the RSS feed'))
				})
			}).catch(() => console.error('Error in fetching the website'))
		})
	})
}).catch(() => console.error('Error in fetching the URLs json'))