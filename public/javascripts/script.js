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
  