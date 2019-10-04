document.addEventListener('scroll', () => {

    let navbar = document.getElementsByClassName("navigationBar");

    // Get the offset position of the navbar
    let sticky = navbar[0].offsetTop +5;
    if (window.pageYOffset >= sticky) {
        navbar[0].classList.add("sticky")
      } else {
        navbar[0].classList.remove("sticky");
      }
  
  }, false);


  let el = document.getElementsByClassName("btn-post");


  Array.from(el).forEach((element)=> {
    element.addEventListener('click', () => {
        //let buttonType = event.target.innerHTML; thumb_up thumb_down
        let currentClass = event.target.parentNode.classList[0];
        let ortherClass = event.target.parentNode.parentNode.childNodes;
        if (currentClass === "btn-post") {
            ortherClass[1].classList.remove("btn-post-clicked");
            ortherClass[1].classList.add("btn-post");
            ortherClass[3].classList.remove("btn-post-clicked");
            ortherClass[3].classList.add("btn-post");
            event.target.parentNode.classList.remove("btn-post");
            event.target.parentNode.classList.add("btn-post-clicked");
        } else {
            event.target.parentNode.classList.remove("btn-post-clicked");
            event.target.parentNode.classList.add("btn-post");
        }


      })

  })
  const button = document.getElementsByClassName('btn-post');
  Array.from(button).forEach(element => {
    element.addEventListener('click',(evnt) => {  
      console.log(evnt.target.parentNode.getAttribute('url'))
      axios.post(evnt.target.parentNode.getAttribute('url')).then(reponseFromBackend => {
        console.log(reponseFromBackend);
      })
    })
  })


  
let allLikes = document.getElementsByClassName("btn-post");
let logout = document.getElementsByClassName("btn-logout");

document.addEventListener('DOMContentLoaded', () => {
if (logout.length != 0 && allLikes.length != 0){
  Array.from(allLikes).forEach(element => {

    let url =  element.getAttribute('url');
    url = "/check" + url;
   
    axios.post(url).then(reponseFromBackend => {
     console.log("body?: ",reponseFromBackend.data.clicked);
     if (reponseFromBackend.data.clicked === true){    
       element.classList.remove("btn-post");
       element.classList.add("btn-post-clicked");
      }
   })
   .catch(error => {
     console.log(error);
   }
     )})

}


  
  }, false);