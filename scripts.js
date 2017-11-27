// -------- Project Feature Scripts

const links = document.querySelectorAll( '.project a.project-link' );

links.forEach( link => {
    let dest = link.href;
    
    link.addEventListener('click', function( e ) {
        e.preventDefault();
        window.open( dest, 'newwindow', 'width=1500, height=1000' );
        return false;
    })
});