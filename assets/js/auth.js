  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const loading = document.querySelector('.loading');
  const formAuth = document.querySelector(".form-auth");


var usernametxt = '';
var emailtxt = '';
var passwordtxt = '';

  // Mendapatkan referensi database Firebase
  const db = firebase.database();

  // Menangani pendaftaran
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = registerUsername.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    loading.style.display = 'flex';

    usernametxt = username;
    emailtxt = email;
    passwordtxt = password;


    // Mendaftarkan pengguna menggunakan Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        messageInfo('account successfully');

        // Menyimpan data pengguna ke Realtime Database
        db.ref('users/' + userCredential.user.uid).set({
          username: username,
          email: email
        });
        console.log('User registered successfully');

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
        
        // Menangani error berdasarkan kode error
        switch (errorCode) {
          case 'auth/email-already-in-use':
            messageInfo('Email arlready in use');
            toggleForm();
            break;
          case 'auth/wrong-password':
            messageInfo('Incorrect password');
            break;
          case 'auth/invalid-email':
            messageInfo('Invalid email format');
            break;
          case 'auth/user-disabled':
            messageInfo('User account is disabled');
            break;
          default:
            messageInfo('Error: ');
        }

      });
  });

  // Menangani login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;
    loading.style.display = 'flex';

    emailtxt = email;
    passwordtxt = password;

    console.log(emailtxt +','+passwordtxt);

    // Melakukan login menggunakan Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User logged in successfully');
        messageInfo('account successfully');

      })
      .catch( (error) => {
          
                  var errorCode = error.code;
                  var errorMessage = error.message;

                  console.log(errorCode);
                  console.log(errorMessage);
                  // Menangani error berdasarkan kode error
                  switch (errorCode) {
                      case 'auth/user-not-found':
                      case 'auth/internal-error':
                          messageInfo('Email or Password are Incorrect');
                          break;
                      case 'auth/wrong-password':
                          messageInfo('Incorrect password');
                          break;
                      case 'auth/invalid-email':
                          messageInfo('Invalid email format');
                          break;
                      case 'auth/user-disabled':
                          messageInfo('User account is disabled');
                          break;
                      default:
                          messageInfo(`Error: ${errorMessage}`);
                  }
      });
  });

  // Menangani login google
  function googleAuth() {
    var provider = new firebase.auth.GoogleAuthProvider();

    loading.style.display = 'flex';

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        console.log('User logged in with Google:', user);

        messageInfo('account successfully');


        // Link akun jika diperlukan
        var email = user.email;
        firebase.auth().fetchSignInMethodsForEmail(email).then((methods) => {
          if (methods.includes('password')) {
            // Link akun
            var user = firebase.auth().currentUser;
            user.linkWithCredential(credential).then((usercred) => {
              console.log("Accounts linked:", usercred.user);
            }).catch((error) => {
              console.error("Error linking accounts:", error);

              messageInfo('Incorrect email or password');

            });
          }
        });
      })
      .catch((error) => {
        console.error('Error logging in with Google:', error);

        messageInfo('Incorrect email or password');

      });

  };


  // Mengecek status autentikasi saat halaman dimuat
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is logged in:', user);

        document.querySelector('.auth_toggle').style.display = 'none';
        document.querySelector('#auth-toggle').style.display = 'flex';

        document.querySelector('.profiledata').innerHTML = truncateText(user.email, 8);

        // Tambahkan logika di sini untuk menangani pengguna yang sudah login
      } else {
        console.log('No user is logged in');
        // Tambahkan logika di sini untuk menangani pengguna yang tidak login
      }
    });

    function truncateText(text, maxLength) {
          if (text.length > maxLength) {
            return text.substring(0, maxLength) + '..@';
          }
          return text;
        }

    function logoutAuth() {
      firebase.auth().signOut().then(() => {
        console.log('User signed out.');
        document.querySelector('.profiledata').innerHTML = '';
        window.location.reload();


      }).catch((error) => {
        console.error('Error during sign-out:', error);
      });
    };

  async function connect() {
  if (window.ethereum) {
    try {
      // Meminta izin untuk mengakses akun Ethereum pengguna
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      
      // Menginisialisasi Web3 dengan Ethereum provider
      window.web3 = new Web3(window.ethereum);
      
      // Menampilkan alamat dompet pengguna
      console.log("Wallet address:", accounts[0]);

      
      // Mengembalikan alamat dompet
      return accounts[0];
    } catch (error) {
      // Handle error jika izin ditolak atau terjadi kesalahan lainnya
      console.error("Error connecting to wallet:", error);
      return null;
    }
  } else {
    console.log("No wallet found");
    return null;
  }
}


function  messageInfo(argument) {
  // body...

  var notification = document.querySelector(".notificationmessage");
  notification.innerHTML = argument;

          // Mengatur animasi fade in
          notification.style.display = 'flex';
          notification.style.animation = 'notifFadeIn 0.5s ease-in-out forwards';

          // Menunggu 2 detik sebelum menyembunyikan notifikasi kembali
          setTimeout(function() {
            notification.style.animation = 'notifFadeOut 0.5s ease-in-out forwards';
            setTimeout(function() {
              notification.style.display = 'none';
            }, 500); // Durasi fade out
          }, 1500); // 1500 milidetik = 1.5 detik delay

        loading.style.display = 'none';

        if(argument == 'account successfully'){
            formRegister.classList.remove("show");
            formRegister.classList.add("hide");

            formAuth.classList.remove("show");
            formAuth.classList.add("hide");
          }
}

