const { createApp, ref } = Vue

let id = 0;
    
createApp({
  data() {
      return {
          time: new Date(),
          absenMasuk: [],
          akunProfil: [],
          form: {
              fullname: '',
              notelp: '',
              username: '',
              password: ''
          },
          login: {
            username: '',
            password: ''
          }
      }
  },
  computed: {
      times() {
          const detik = this.time.getSeconds();
          const menit = this.time.getMinutes();
          const jam = this.time.getHours();

          return `${jam} : ${menit} : ${detik}`;
      },

      date() {
          const tanggal = this.time.getDate();
          const bulan = this.time.getMonth();
          const tahun = this.time.getFullYear();

          return `${tanggal}/${bulan}/${tahun}`;
      }
  },
  methods: {
    submitFormRegister() {
        const {fullname, notelp, username, password} = this.form;

        const getData = {id: id++, fullname: fullname, notelp: notelp, username: username, password: password};

        this.akunProfil.push(getData);

        alert('register success');

        // reset form
        this.form.fullname = '';
        this.form.notelp = '';
        this.form.username = '';
        this.form.password = '';

    },
    submitFormLogin() {
        const {username, password} = this.login;
        const loginSystem = document.getElementById('login-system');
        const absensi = document.getElementById('absensi');

        this.akunProfil.forEach(profil => {
            if(username == profil.username) {
                if(password == profil.password) {
                    loginSystem.style.display = 'none';
                    absensi.style.display = 'block';

                    this.login.password = '';
                } else {
                    alert('password anda salah!');
                }
            } else {
                alert('username anda tidak cocok!');
            }
        });
    },
    getAbsenMasuk() {
        const username = this.login.username;

        const data = {id: id++, nama: username, tgl: this.date, waktu: this.times, absen: 'masuk', ket: '-', status: '-'};

        this.absenMasuk.push(data);

        console.log(this.absenMasuk);

    },
    getAbsenTidakMasuk(keterangan) {
        const username = this.login.username;

        const data = {id: id++, nama: username, tgl: this.date, waktu: '-', absen: 'tidak masuk', ket: keterangan, status: 'pending'};

        this.absenMasuk.push(data);
    },
    registerLink() {
        const loginSystem = document.getElementById('login-system');
        const registerSystem = document.getElementById('register-system');

        loginSystem.style.display = 'none';
        registerSystem.style.display = 'block';
    },
    back() {
        const loginSystem = document.getElementById('login-system');
        const registerSystem = document.getElementById('register-system');

        loginSystem.style.display = 'block';
        registerSystem.style.display = 'none';
    },
    logout() {
        const loginSystem = document.getElementById('login-system');
        const absensi = document.getElementById('absensi');

        loginSystem.style.display = 'block';
        absensi.style.display = 'none';
    }
  },
  // method yang akan pertama kali dijalankan saat halaman dimount
  mounted() {
      setInterval(() => {
          this.time = new Date();
      }, 1000)
  }
}).mount('#app')