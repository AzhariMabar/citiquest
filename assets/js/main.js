/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      authToggle = document.getElementById('auth-toggle'),
      authClose = document.getElementById('auth-close'),
      authMenu = document.getElementById('auth-menu')

var formRegister = document.querySelector(".form-auth-register");



/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* Auth menu show */
if (authToggle) {
    authToggle.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent default behavior of event propagation
        showauth();
    });
}

function showauth() {
    authMenu.classList.add('show-menu-auth');
    authMenu.classList.remove('auth_toggle'); // Remove 'auth_toggle' class
}

function hideauth() {
    authMenu.classList.remove('show-menu-auth');
    authMenu.classList.add('auth_toggle'); // Remove 'auth_toggle' class
}

/* Hide auth menu when clicking outside */
document.addEventListener('click', function(event) {
    if (event.target !== authToggle) {
        authMenu.classList.remove('show-menu-auth');
        authMenu.classList.add('auth_toggle'); // Add 'auth_toggle' class
    }
});

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
//navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 0 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2500,
    delay: 300,
    // reset: true, // Animations repeat
})

sr.reveal(`.home__img, .new__data, .care__img, .contact__content, .footer`)
sr.reveal(`.home__data, .care__list, .contact__img`, {delay: 500})
sr.reveal(`.new__card`, {delay: 500, interval: 100})
sr.reveal(`.shop__card`, {interval: 100})


document.querySelector('video').playbackRate = 0.6;


// form auth

   function togglePassword(icon) {
        var parentElement = icon.parentElement;
        var passwordInput = parentElement.querySelector(".form-password");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.classList.remove("showIcon");
            icon.classList.add("hideIcon");
        } else {
            passwordInput.type = "password";
            icon.classList.remove("hideIcon");
            icon.classList.add("showIcon");
        }
    }

    function toggleForm() {
        
        if (formAuth.classList.contains("show")) {
            formAuth.classList.remove("show");
            formAuth.classList.add("hide");
        } else {
            formAuth.classList.remove("hide");
            formAuth.classList.add("show");
            formRegister.classList.remove("show");
            formRegister.classList.add("hide");
        }

        if(emailtxt != ''){
          loginEmail.value = emailtxt;
        }
        if(passwordtxt != ''){
          loginPassword.value = passwordtxt;
        }
    }


    function openRegister() {
        if (formAuth.classList.contains("show")) {
            formAuth.classList.remove("show");
            formAuth.classList.add("hide");
            formRegister.classList.add("show");
        } else {
            formAuth.classList.remove("hide");
            formAuth.classList.add("show");
            formRegister.classList.remove("show");
            formRegister.classList.add("hide");
        }

        if(usernametxt != ''){
          registerUsername.value = usernametxt;
        }
        if(emailtxt != ''){
          registerEmail.value = emailtxt;
        }
        if(passwordtxt != ''){
          registerPassword.value = passwordtxt;
        }
    }

    function openForgotPassword() {
        var formAuth = document.querySelector(".form-auth");
        var formRegister = document.querySelector(".form-auth-forgot-password");
        if (formAuth.classList.contains("show")) {
            formAuth.classList.remove("show");
            formAuth.classList.add("hide");
            formRegister.classList.add("show");
        } else {
            formAuth.classList.remove("hide");
            formAuth.classList.add("show");
            formRegister.classList.remove("show");
            formRegister.classList.add("hide");
        }
    }

    function closeFormRegister() {
        openRegister();
    }

    function closeForgotPassword() {
        openForgotPassword();
    }

    function closeForm() {
        toggleForm();
    }
    
function openInNewTab() {
    window.open('https://medium.com/@questciti', '_blank');
}