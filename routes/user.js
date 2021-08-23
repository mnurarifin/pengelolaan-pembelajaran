const { serializeUser } = require("passport");

exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var username = post.username;
      var password = post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mobile= post.mobile;
	  if(username !='' && password!='') {
		  var sql = "INSERT INTO `users`(`firs_name`,`last_name`,`mobile`,`username`, `password`) VALUES ('" + fname + "','" + lname + "','" + mobile + "','" + username + "','" + password + "')";

		  var query = db.query(sql, function(err, result) {
			 message = "Your account has been created succesfully.";
			 res.render('signup.ejs',{message: message});
		  });
	  } else {
		  message = "Username and password is mandatory field.";
		  res.render('signup.ejs',{message: message});
	  }

   } else {
      res.render('signup');
   }
};
 
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var username = post.username;
      var password= post.password;
     
      var sql="SELECT * FROM `m_peserta` WHERE `username`='"+username+"' and password = '"+password+"'";                           
      db.query(sql, function(err, results){ 
         if (username === '' || password === '') {
            message = 'the username or password field cannot be empty.';
            res.render('form_login.ejs',{message: message});
         } 
         else if(results.length){
            req.session.userId = results[0].username;
            req.session.user = results[0];
            console.log(results[0].username);
            res.redirect('/home/form_dashboard_user');
         }
         else{
           var sql="SELECT * FROM `m_mentor` WHERE `username`='"+username+"' and password = '"+password+"'";                           
            db.query(sql, function(err, results){ 
               if (username === '' || password === '') {
                  message = 'the username or password field cannot be empty.';
                  res.render('form_login.ejs',{message: message});
               } 
               else if(results.length){
                  req.session.userId = results[0].username;
                  req.session.user = results[0];
                  console.log(results[0].username);
                  res.redirect('/home/form_dashboard_mentor');
               }
               else{
                  message = 'You have entered invalid username or password.';
                  res.render('form_login.ejs',{message: message});
               }
            });
         }
      });
   } else {
      res.render('form_login.ejs',{message: message});
   }
           
};

           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `m_peserta` WHERE `username`='"+userId+"'";

   db.query(sql, function(err, results1){
      var sql="SELECT * FROM `m_kelas` ";
      db.query(sql, function(err, results2){
         res.render('form_dashboard_user.ejs', {data:results1, kelas:results2});    
      });
   });       
};

exports.pelajaran= function(req, res){
   if(req.method == "POST"){
      var post  = req.body;
      var namakelas = post.btn_namaKelas;
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }
   
      var sql="SELECT * FROM `m_peserta` WHERE `username`='"+userId+"'";
            
      db.query(sql, function(err, result1){  
         var sql2 = "SELECT * FROM `m_pelajaran` WHERE id_kelas = '"+ namakelas +"'";
            db.query(sql2, function(err, results2){  
            res.render('pilih_pelajaran_user.ejs',{data:result1, pelajaran:results2});
         });
         
      });

      
   };
};

exports.materi_siswa = function(req, res){

   if(req.method == "POST"){
      var post  = req.body;
      var namamateri = post.btn_nama_materi;
      console.log(namamateri);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      };

      

      var sql="SELECT * FROM `m_peserta` WHERE `username`='"+userId+"'";
            
      db.query(sql, function(err, result1){  
         var sql2 = "SELECT * FROM `tr_materi` WHERE id_pelajaran = '"+ namamateri +"'";
            db.query(sql2, function(err, results2){  
            res.render('materi_siswa_user.ejs',{data:result1, materi:results2});
         });
         
      });
   };

   
};

exports.kelola_materi = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `m_peserta` WHERE `username`='"+userId+"'";
        
   db.query(sql, function(err, result){  
      res.render('kelola_pelajaran_user.ejs',{data:result});
   });
};

exports.profile = function(req, res){
   var message = '';
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `m_peserta` WHERE `username`='"+userId+"'";

   db.query(sql, function(err, result){  
      res.render('form_profile_user.ejs',{data:result, message:message});
   });
};

exports.update_foto = function(req,res){

   if(req.method == "POST"){
      var post  = req.body;
      var gambar_ = post.ubah_gambar;
      var nama_depan_ = post.nama_depan;
      var nama_belakang_ = post.nama_belakang;
      var alamat_ = post.alamat;
      var telepon_ = post.telepon;
      var alamat_email_ = post.alamat_email;
      var username_ = post.username;
      var password_ = post.password;
      var konfirm_pas_ = post.konfirm_pas;
      let samplefile;
      let uploadfile;

      console.log(gambar_ + nama_depan_ + nama_belakang_ + alamat_ +
         telepon_ + alamat_email_ +username_ + password_ + konfirm_pas_);
   
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }

      var sql = "SELECT * FROM `m_peserta` WHERE username = '"+ username_ +"'";
      db.query(sql, function(err, result){
         
      if (gambar_ == result[0].foto && nama_depan_ == result[0].nama_depan && nama_belakang_ == result[0].nama_belakang && alamat_ == result[0].alamat && telepon_ == result[0].telepon && alamat_email_ == result[0].email && username_ == result[0].username && password_ ==  result[0].password && konfirm_pas_ == result[0].confim_password)
      {
      res.send('tidak ada data yang di ubah');
      }
      else if (gambar_ != result[0].foto)
      {
         samplefile = req.files.samplefile;
         uploadfile = __dirname + '/upload/' + samplefile.name;
         console.log('FILE FOTO DIUBAH' + uploadfile);

         if (samplefile.mimetype == "image/png" || samplefile.mimetype == "image/jpg" || samplefile.mimetype == "image/jpeg") 
         {
            samplefile.mv(uploadfile, function(err){
            if (err) return res.status(500).send(err);
            });
            
            var path = 'http://localhost/latihan1/routes/upload/';
            var sql_ubah_data = "UPDATE `m_peserta` SET `foto`='"+ path + samplefile.name +"' WHERE username = '"+ username_ +"'";    
            db.query(sql_ubah_data, function(err, result){  
               if (!err) {
                  res.redirect('/home/form_profile_user');
               }
               else
               {
                  console.log(err);
               }
            });
         }
         else{
            res.send('salah');
         } 
      }
      else{
         var path = 'http://localhost/latihan1/routes/upload/';
            var sql_ubah_data = "UPDATE `m_peserta` SET `nama_depan`='"+ nama_depan_ +"',`nama_belakang`='"+ nama_belakang_ +"',`alamat`='"+ alamat_ +"',`telepon`='"+ telepon_ +"',`email`='"+ alamat_email_ +"',`username`='"+ username_ +"',`password`='"+ password_ +"',`confim_password`='"+ konfirm_pas_ +"' WHERE username = '"+ username_ +"'";    
            db.query(sql_ubah_data, function(err, result){  
               if (!err) {
                  res.redirect('/home/form_profile_user');
               }
               else
               {
                  console.log(err);
               }
            });
      }
   });
   }
};

exports.download_file_materi=function(req, res) {
   if(req.method == "POST"){
      var post  = req.body;
      var id_mapel = post.btn_id_mapel;

      console.log('Nilai ID Maple ' + id_mapel)

      var message = '';
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }

      var sql = "SELECT SUBSTRING(isi_materi, 27, 1000) AS isi_materi FROM tr_materi WHERE id_materi = '"+ id_mapel +"'";
      db.query(sql,function(err, result){
         console.log(result[0].isi_materi);
         res.download(result[0].isi_materi);
      });
   }
}

exports.download_file_quiz=function(req, res) {
   if(req.method == "POST"){
      var post  = req.body;
      var id_mapel = post.btn_id_mapel;

      console.log('Nilai ID Maple ' + id_mapel)

      var message = '';
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }

      var sql = "SELECT SUBSTRING(quiz, 27, 1000) AS quiz FROM tr_materi WHERE id_materi = '"+ id_mapel +"'";
      db.query(sql,function(err, result){
         console.log(result[0].quiz);
         res.download(result[0].quiz);
      });
   }
}

exports.tampil_form_upload_tugas=function(req, res) {
   if(req.method == "POST"){
      var post  = req.body;
      var namamateri = post.btn_jawab_quiz;
      console.log(namamateri);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      };

      

      var sql="SELECT * FROM `m_peserta` WHERE `username`='"+userId+"'";
            
      db.query(sql, function(err, result1){  
         var sql2 = "SELECT * FROM `tr_materi` WHERE id_materi = '"+ namamateri +"'";
            db.query(sql2, function(err, results2){  
               var sql3 = "INSERT INTO `tr_tugas`(`id_tugas`, `username`, `nama_tugas`, `deskripsi_tugas`, `isi_tugas`, `id_materi`, `ketuntasan`) VALUES ('', '"+ userId +"',(SELECT tr_materi.nama_materi FROM tr_materi WHERE id_materi = '"+ namamateri +"'), (SELECT tr_materi.deskripsi_materi FROM tr_materi WHERE id_materi = '"+ namamateri +"'), '', '"+ namamateri +"', 'belum tuntas')";
               db.query(sql3, function(err, results3){  
                  res.render('form_upload_tugas_user.ejs',{data:result1, materi:results2, tugas:results3});
               });
         });
         
      });
   };
};

exports.ketuntasan_tugas=function(req, res) {
   if(req.method == "POST"){
      var post = req.body;
      var id_mapel = post.id_pelajaran;
      var namamateri = post.btn_upload_tugas;
      console.log(namamateri);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }

      let samplefile;
      let uploadfile;

      if (!req.files) {
         return res.status(400).send('No File Uploader');
      }

      samplefile = req.files.samplefile2;
      uploadfile = __dirname + '/download/' + samplefile.name;
      console.log(uploadfile);

      if (samplefile.mimetype == "image/jpg" || samplefile.mimetype == "image/jpeg" || samplefile.mimetype == "image/png" ) {
        res.send('salah');
      }
      else{
         var sql="SELECT * FROM `m_peserta` WHERE `username`='"+userId+"'";
            
         db.query(sql, function(err, result1){  
            var sql2 = "SELECT * FROM `tr_materi` WHERE id_pelajaran = '"+ id_mapel +"'";
               db.query(sql2, function(err, results2){ 

                  samplefile.mv(uploadfile, function(err){
                     if (err) return res.status(500).send(err);
   
                  var path = 'http://localhost/latihan1/routes/download/';
                  var sql3 = "UPDATE `tr_tugas` SET `isi_tugas`= '"+ path + samplefile.name +"',`ketuntasan`='tuntas' WHERE username = '"+  userId +"'";
                  db.query(sql3, function(err, results3){  
                     res.render('materi_siswa_user.ejs',{data:result1, materi:results2, tugas:results3});
                  });
               });
            });
            
         });
      }

   }
};

exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};

