var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , mentor = require('./routes/mentor')
  , http = require('http');

//   , path = require('path');
var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser=require("body-parser");
var fileupload = require("express-fileupload");
const path = require('path');

var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'db_elearning'
            });
 
connection.connect();
 
global.db = connection;
 
//fungsi memanggil folder public
app.use(express.static('public'));


app.set('port', process.env.PORT || 8080);
app.set('views', [path.join(__dirname, '/views'), path.join(__dirname, '/views/mentor'), path.join(__dirname, '/views/user')]);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileupload());
app.use(bodyParser.json());

app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 600*10000 }
            }))

// app.get('/signup', user.signup);
// app.post('/signup', user.signup);

// app.get('/coba', user.coba);
// app.post('/btn_send', user.coba2);

app.get('/', routes.index);
app.get('/form_login', routes.form_login);
app.get('/about', routes.about);

app.get('/login', routes.login);
app.post('/login', user.login);
app.get('/home/logout', user.logout);

// routes peserta
app.get('/home/form_dashboard_user', user.dashboard);
app.get('/home/form_profile_user',user.profile);
app.post('/update_foto_user',user.update_foto);
app.post('/home/materi_siswa_user',user.materi_siswa);
app.post('/pilih_pelajaran_user',user.pelajaran);
app.post('/home/download_file_materi', user.download_file_materi);
app.post('/home/download_file_quiz', user.download_file_quiz);

app.post('/home/form_upload_tugas', user.tampil_form_upload_tugas);
app.post('/ketuntasan_tugas', user.ketuntasan_tugas);

// routes mentor
app.get('/home/form_dashboard_mentor', mentor.dashboard);
app.get('/home/form_profile_mentor',mentor.profile);
app.post('/update_foto_mentor',mentor.update_foto);
app.post('/home/kelola_materi_mentor',mentor.kelola_materi);
app.post('/pilih_pelajaran_mentor',mentor.pilih_pelajaran);
app.post('/home/pilih_materi_mentor',mentor.pilih_materi);
app.get('/home/pilih_materi_mentor',mentor.pilih_materi);
app.post('/home/edit_materi_mentor', mentor.edit_materi);
app.post('/home/tambah_materi_mentor', mentor.tambah_materi);

app.get('/home/penilaian_mentor', mentor.penilaian);

app.post('/beri_nilai_tugas', mentor.beri_nilai);

app.post('/upload_materi_baru', mentor.upload_materi);
app.post('/ubah_materi', mentor.ubah_materi);
app.post('/hapus_materi', mentor.hapus_materi);
app.post('/update_nilai', mentor.update_nilai);
app.post('/download_tugas_siswa', mentor.download_tugas_siswa);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
// app.listen(8080);
