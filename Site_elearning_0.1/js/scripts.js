
// Scrollspy

    window.addEventListener('DOMContentLoaded', event => {
     const sideNav = document.body.querySelector('#sideNav');
      if (sideNav) {
         new bootstrap.ScrollSpy(document.body, {
             target: '#sideNav',
             offset: 74,
         });
     };

// Responsive scrollspy

     const navbarToggler = document.body.querySelector('.navbar-toggler');
     const responsiveNavItems = [].slice.call(
         document.querySelectorAll('#navbarResponsive .nav-link')
      );
      
     responsiveNavItems.map(function (responsiveNavItem) {
         responsiveNavItem.addEventListener('click', () => {
              if (window.getComputedStyle(navbarToggler).display !== 'none') {
                  navbarToggler.click();
               }
             });
         });
    });

// Click control

    window.addEventListener('click', (e) => {
     console.log(e);

      const rond = document.createElement('div');
     rond.className = 'clickAnim';
     rond.style.top = `${e.pageY - 25}px`;
     rond.style.left = `${e.pageX - 25}px`;
     document.body.appendChild(rond);

     setTimeout(() => {
          rond.remove();
     }, 1500)
    })


//slide effect

    let slidingNewsletter = document.querySelector('.slide-in');

    window.addEventListener('scroll', () => {

    var {scrollTop, clientHeight} = document.documentElement;

    // console.log(scrollTop, clientHeight);

    var topElementToTopViewport = slidingNewsletter.getBoundingClientRect().top;

    console.log(topElementToTopViewport);

    if(scrollTop > (scrollTop + topElementToTopViewport).toFixed() - clientHeight * 0.8){
        slidingNewsletter.classList.add('active')
    }
    })

   
    

//Video control

    let video = document.querySelector('.video');
    let btn = document.getElementById('play-pause');
    let muteBtn = document.getElementById('mute');
    let volumeslider = document.getElementById('volumeSlider');

// Play/pause

    function togglePlayPause() {
    if(video.paused){
        btn.className="pause";
        video.play();
    }
    else {
        btn.className = "play";
        video.pause();
    }
    }

    btn.onclick = function(){
    togglePlayPause();
    }

// Barre defillement retiré (mais bug sans sa présence)

    video.addEventListener('timeupdate', function(){
    let juicePos = video.currentTime / video.duration;
    juice.style.width = juicePos * 100 + '%';
    if(video.ended) {
        btn.className ="play";
    }
    })

// mute la video


    muteBtn.addEventListener('click', function(){

    if(video.muted){
        video.muted = false;
        muteBtn.innerHTML = "Mute";
    } else {
        video.muted = true;
        muteBtn.innerHTML = "Unmute";
    }
    })

// Volume


    volumeslider.addEventListener('change', function(){
    video.volume = volumeslider.value / 100;

    })

// text effect Joevan modal

    const txtAnim = document.querySelector('h4');

    console.log(new Typewriter(txtAnim,{
            loop: true,
            deleteSpeed:  10

         })
         .typeString(' Moi c\'est Joe ')
         .pauseFor(300)
         .typeString('<strong>, Dev Junior<strong> en:')
         .pause(1000)
         .deleteChars(3)
         .typeString('<span style="color: #27ae60"> CSS</span> !')
         .pauseFor(1000)
         .deleteChars(5)
         .typeString('<span style="color: midnightblue;"> React</span> !')
         .pauseFor(1000)
         .deleteChars(7)
         .typeString('<span style="color: #ea39ff;"> PHP</span> !')
         .pauseFor(1000)
         .deleteChars(5)
         .typeString('<span style="color: #ff6910;"> JavaScript</span> !')
        .pauseFor(1000)
        .deleteChars(14)
        .typeString('. Jai aussi dautre talents caches: <br> ')
        .pauseFor(1000)
        .typeString('<br> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque qui veritatis non porro maxime reiciendis  odio impedit vitae pariatur deserunt fuga unde dolorem eveniet, odit sed, numquam, minus earum ipsam.odio impedit vitae pariatur deserunt fuga unde dolorem eveniet, odit sed, numquam, minus earum ipsam. odio impedit vitae pariatur deserunt fuga unde dolorem eveniet, odit sed, numquam, minus earum ipsam. Lorem ipsum dolor sit amet consectetur, adipisicing elit.  ')
         .start()
        )


 
        
