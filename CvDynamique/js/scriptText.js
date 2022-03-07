var app = document.getElementById('txt');


var typewriter = new Typewriter(app, {});

function mouselog(event){
  
    typewriter.stop();
    typewriter.changeDelay(80)
    typewriter.typeString("Bonjour, c'est Michael Mas") //ecrire du texte
    typewriter.pauseFor(300) //pause tout les 300ms
    typewriter.typeString("<strong>, Dev Full-Stack</strong>")
    typewriter.pause(1000)
    typewriter.deleteChars(11) //supprime les caractere
    typewriter.typeString(' en <span style="color: #ad6614"> HTML</span> !')
    typewriter.pauseFor(1000)
    typewriter.deleteChars(6)
    typewriter.typeString('<span style="color: #27ae60"> CSS</span> !')
    typewriter.pauseFor(1000)
    typewriter.deleteChars(5)
    typewriter.typeString('<span style="color: #ff6910"> JavaScript</span> !')
    typewriter.pauseFor(1000)
    typewriter.deleteChars(12)
    typewriter.typeString('<span style="color: #ea39ff"> PHP</span> !')
    typewriter.pauseFor(1000)
    typewriter.deleteChars(5)
    typewriter.typeString('<span style="color: #ad1493"> Python</span> !')
    typewriter.deleteChars(49)
    typewriter.start();
};


