// Menggantikan dengan konfigurasi firebase proyek Anda
const firebaseConfig = {
  apiKey: "AIzaSyASxwUmab4zRBU8Dxg_KPHVaY19ciqIx38",
  authDomain: "citiquest-id.firebaseapp.com",
  projectId: "citiquest-id",
  storageBucket: "citiquest-id.appspot.com",
  messagingSenderId: "858119984754",
  appId: "1:858119984754:web:5eb7bed8dd5c931c4b54eb",
  measurementId: "G-6D9PKRN5XV"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Referensi Firestore
const db = firebase.firestore();

// Mendapatkan nilai dari formulir (contoh menggunakan DOM)
const nameInput = document.getElementById("username").value;
const emailInput = document.getElementById("email").value;

// Memanggil fungsi untuk menambahkan subscriber ke Firestore
// Menangani formulir saat disubmit
document.getElementById("subscribeForm").addEventListener("click", function(event) {
	
  event.preventDefault(); // Mencegah formulir untuk submit secara langsung

  // Mendapatkan nilai dari formulir
  var name = document.getElementById("username").value;
  var email = document.getElementById("email").value;

  if (!isValidEmail(email)) {
        alert("Invalid email format. Please enter a valid email address.");
        return;
    }


   // Memeriksa apakah email sudah berlangganan sebelumnya
  	checkIfSubscribed(email)
        .then((isSubscribed) => {
            if (isSubscribed) {
                alert("You are already subscribed!");
            } else {
                // Jika belum berlangganan, memanggil fungsi untuk menambahkan subscriber ke Firestore
                addSubscriber(name, email);
            }
        })
        .catch((error) => {
            console.error("Error checking subscription status: ", error);
        });


  // Memanggil fungsi untuk menambahkan subscriber ke Firestore
 // addSubscriber(name, email);

});

// Fungsi untuk menambahkan subscriber ke Firestore
function addSubscriber(name, email) {
  // Menambahkan data ke koleksi "subscribers"
  db.collection("subscribers").add({
    name: name,
    email: email
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    alert("Subscription successful!");
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    alert("Subscription failed. Please try again.");
  });
}

function checkIfSubscribed(email) {
    return new Promise((resolve, reject) => {
        // Membuat kueri untuk memeriksa apakah email sudah ada dalam koleksi "subscribers"
        db.collection("subscribers")
            .where("email", "==", email)
            .get()
            .then((querySnapshot) => {
                // Jika querySnapshot tidak kosong, berarti email sudah ada
                resolve(!querySnapshot.empty);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

var jumlahSubscribers = 0;
document.getElementById("jumlahSubscribers").innerText = "Subscribers: 0";

db.collection("subscribers").get().then((querySnapshot) => {
  // Hitung jumlah dokumen (pengguna yang berlangganan)
  jumlahSubscribers = querySnapshot.size;
  console.log(jumlahSubscribers);

  // Memulai animasi counting setelah mendapatkan data
  startCountAnimation();
});

var currentCount = 0;
function updateCount() {
  currentCount++;
  document.getElementById("jumlahSubscribers").innerText = "Subscribers: " + currentCount;

  // Hentikan animasi ketika mencapai nilai tertentu (misalnya, jumlahSubscribers)
  if (currentCount === jumlahSubscribers) {
    clearInterval(countingInterval);
  }
}

function startCountAnimation() {
  countingInterval = setInterval(updateCount, 100);
}
    



