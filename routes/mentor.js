const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// app.use(bodyParser.urlencoded({ extended: true}));

// app.post('/example', (req, res) => {
//    res.send(`Full name is:${req.body.fname}.`);
// });

exports.dashboard = function(req, res){
           
   var user =  req.session.user;
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";

   db.query(sql, function(err, results1){
      var sql="SELECT * FROM `m_kelas` ";
      db.query(sql, function(err, results2){
         var sql_tugas = "SELECT m_kelas.nama_kelas, m_pelajaran.nama_pelajaran, tr_materi.nama_materi AS nama_tugas, m_mentor.nama_depan AS nama_mentor FROM tr_materi INNER JOIN m_pelajaran ON tr_materi.id_pelajaran = m_pelajaran.id_pelajaran INNER JOIN m_mentor ON m_pelajaran.username_mentor = m_mentor.username INNER JOIN m_kelas ON m_pelajaran.id_kelas = m_kelas.id_kelas"
         db.query(sql_tugas, function(err, results3){
            res.render('form_dashboard_mentor.ejs', {data:results1, kelas:results2, tugas:results3});    
         });
      });
   });
   
   // var elmnt = document.getElementsByName("item");


};

exports.penilaian = function(req, res){
           
   var user =  req.session.user;
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";

   db.query(sql, function(err, results1){
      var sql="SELECT * FROM `m_kelas` ";
      db.query(sql, function(err, results2){
         console.log(results2);
         res.render('penilaian_mentor.ejs', {data:results1, kelas:results2});    
      });
   });
   
   // var elmnt = document.getElementsByName("item");


};

exports.pilih_pelajaran = function(req, res){
   if(req.method == "POST"){
      var post  = req.body;
      var namakelas = post.btn_namaKelas;
      console.log(namakelas);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }
   
      var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";
            
      db.query(sql, function(err, result1){  
         var sql2 = "SELECT * FROM `m_pelajaran` WHERE id_kelas = '"+ namakelas +"'";
            db.query(sql2, function(err, results2){  
            res.render('pilih_pelajaran_mentor.ejs',{data:result1, pelajaran:results2});
         });
         
      });

      
   }
   else{
      res.send('asdasdsad');
   };
};

exports.pilih_materi = function(req, res){

   if(req.method == "POST"){
      var post  = req.body;
      var namamateri = post.btn_nama_materi;
      var id_kelas = post.id_kelas;
      console.log(namamateri);
      console.log(id_kelas);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      };

      var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";
            
         db.query(sql, function(err, result1){  

            var sql2 = "SELECT * FROM `tr_materi` WHERE id_pelajaran = '"+ namamateri +"'";
            db.query(sql2, function(err, results2){  
               var sql_idKelas = "SELECT * FROM `m_kelas` WHERE id_kelas = '"+ id_kelas +"'" ;
               db.query(sql_idKelas, function(err, results3){
                  res.render('pilih_materi_mentor.ejs',{data:result1, materi:results2, kelas:results3});
               });
            
         });
      });
   };
};

exports.kelola_materi = function(req, res){
   if(req.method == "POST"){
      var post  = req.body;
      var namamateri = post.btn_edit_materi;
      var id_kelas = post.id_kelas;
      console.log('id_kelas'+id_kelas);
      console.log(namamateri);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      };

      var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";
            
      db.query(sql, function(err, result1){  
         var sql2 = "SELECT * FROM `tr_materi` WHERE id_materi = '"+ namamateri +"'";
            db.query(sql2, function(err, results2){  
               var sel_kelas = "SELECT * FROM m_kelas WHERE id_kelas = '"+ id_kelas +"'";
               db.query(sel_kelas, function(err, results3){
                  res.render('kelola_materi_mentor.ejs',{data:result1, materi:results2, kelas:results3});
                }); 
            
         });
         
      });
   };
};

exports.tambah_materi = function(req, res) {
   if(req.method == "POST"){
      var post = req.body;
      var namamateri = post.btn_nama_materi;
      var id_kelas = post.id_kelas;
      console.log('id Kelas = ' + id_kelas)
      console.log(namamateri);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      };

      var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";
            
      db.query(sql, function(err, result1){
         var sql2 = "SELECT * FROM tr_materi WHERE id_pelajaran = '"+ namamateri +"'";
         db.query(sql2, function(err, results2){
            var sql_kelas = "SELECT * FROM m_kelas WHERE id_kelas = '"+ id_kelas +"'"
            db.query(sql_kelas, function(err, results3){
               res.render('tambah_materi.ejs', {data:result1, tambah_materi:results2, kelas:results3});
            });
         });
      }); 
   };
};

exports.edit_materi = function(req, res){
   if(req.method == "POST"){
      var post  = req.body;
      var namamateri = post.btn_edit_materi;
      console.log(namamateri);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      };

      var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";
            
      db.query(sql, function(err, result1){  
         var sql2 = "UPDATE `tr_materi` SET `id_materi`=[value-1],`nama_materi`=[value-2],`deskripsi_materi`=[value-3],`isi_materi`=[value-4],`id_pelajaran`=[value-5] WHERE 1 id_materi = '"+ namamateri +"'";
            db.query(sql2, function(err, results2){  
               var sql2 = "";
               db.query(sql2, function(err, results2){  
               res.render('pilih_materi_mentor.ejs',{data:result1, materi:results2});
            });
         });
         
      });
   };
};

exports.upload_materi = function(req, res){
   if(req.method == "POST"){
      var post = req.body;
      var namamateri = post.id_mapel;
      var judul_materi = post.judul_materi;
      var deskripsi_materi = post.deskripsi_materi;
      var id_kelas = post.id_kelas;

      console.log('aksi melihat id pelajaran');
      console.log('id_pelajaran = ' + namamateri);
      console.log('judul = ' + judul_materi);
      console.log('deskripsi = ' + deskripsi_materi);
      console.log('id_kelas = ' + id_kelas);

      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }

      let samplefile;
      let uploadfile;
      let samplefile2;
      let uploadfile2;

      if (!req.files) {
         return res.status(400).send('No File Uploader');
      }
      else if (Object.keys(req.files).length === 0 || Object.keys(req.files).length === 1) {
         return res.status(400).send('lengkapi Data');
      }

      samplefile = req.files.samplefile;
      samplefile2 = req.files.samplefile2;
      uploadfile = __dirname + '/download/' + samplefile.name;
      uploadfile2 = __dirname + '/download/' + samplefile2.name;
      console.log(uploadfile);
      console.log(uploadfile2);

      if (samplefile.mimetype == "image/jpg" || samplefile.mimetype == "image/jpeg" || samplefile.mimetype == "image/png" ) {
        res.send('salah');
      }
      else{
         samplefile.mv(uploadfile, function(err){
            if (err) return res.status(500).send(err);
               console.log('file materi berhasil di upload');
               if (samplefile2.mimetype == "image/jpg" || samplefile2.mimetype == "image/jpeg" || samplefile2.mimetype == "image/png" ) {
                  res.send('salah');
               }
               else
               {
                  samplefile2.mv(uploadfile2, function(err){
                     if (err) return res.status(500).send(err);
                     console.log('file quiz berhasil di upload');
   
                     var path = 'http://localhost/latihan1/routes/download/';
   
                     var quer = "SELECT * FROM tr_materi WHERE id_pelajaran = '" + namamateri + "'";
                     db.query(quer, function(err, resultt){  
                        for (let i = 0; i <= resultt.length; i++) {
                           i = resultt[i].id_pelajaran;
                           var quer2 = "SELECT * FROM `tr_materi` WHERE id_pelajaran = '"+ i +"' ORDER BY id_materi DESC LIMIT 1";
                           db.query(quer2, function(err, resulttt){  
                              for (let j = 0; j <= resulttt.length; j++) {
                                 j = resulttt[j].id_materi;
                                 console.log('Nilai : ' + j);
   
                                 var sql="INSERT INTO `tr_materi`(`id_materi`, `nama_materi`, `deskripsi_materi`, `isi_materi`, `quiz`, `id_pelajaran`) VALUES ('"+ j +"' + 1,'"+ judul_materi +"','"+ deskripsi_materi +"','"+ path + samplefile.name +"','"+ path + samplefile2.name +"','"+ namamateri +"')";         
                                    db.query(sql, function(err, result){  
                                       if (!err) {
                                          var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";
                              
                                          db.query(sql, function(err, result1){  
                                             var sql2 = "SELECT * FROM tr_materi WHERE id_pelajaran = '"+ namamateri +"'";
                                                db.query(sql2, function(err, results2){  
                                                   var sql_kelas = "SELECT * FROM m_kelas WHERE id_kelas = '"+ id_kelas +"'"
                                                      db.query(sql_kelas, function(err, results3){  
                                                      res.render('pilih_materi_mentor.ejs',{data:result1, materi:results2, kelas:results3});
                                                   });
                                                });
                                             
                                          });
                                       }
                                       else
                                       {
                                          console.log(err);
                                       }
                                    });
                              }
                           });
                        }
                     });
                  });
               }
            });
      } 
   }

};

exports.ubah_materi = function(req, res){
   if(req.method == "POST"){
      var post = req.body;
      var namamateri = post.id_materi;
      var namaPel = post.id_mapel;
      var judul_materi = post.judul_materi;
      var deskripsi_materi = post.deskripsi_materi;
      var id_kelas = post.id_kelas;
      
      console.log('id Kelas='+ id_kelas);
      console.log('aksi menghapus id pelajaran');
      console.log(namamateri);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }
      let samplefile1;
      let uploadfile;
      let samplefile2;
      let uploadfile2;

      if (!req.files) {
         return res.status(400).send('No File Uploader');
      }
      else if (Object.keys(req.files).length === 0 || Object.keys(req.files).length === 1) {
         return res.status(400).send('lengkapi Data');
      }

      samplefile1 = req.files.samplefile1;
      samplefile2 = req.files.samplefile2;
      uploadfile = __dirname + '/download/' + samplefile1.name;
      uploadfile2 = __dirname + '/download/' + samplefile2.name;
      console.log(uploadfile);
      console.log(uploadfile2);

      if (samplefile1.mimetype == "image/jpg" || samplefile1.mimetype == "image/jpeg" || samplefile1.mimetype == "image/png" ) {
         res.send('salah');
      }
      else{
         samplefile1.mv(uploadfile, function(err){
            if (err) return res.status(500).send(err);
               console.log('file materi berhasil di upload');
               if (samplefile2.mimetype == "image/jpg" || samplefile2.mimetype == "image/jpeg" || samplefile2.mimetype == "image/png" ) {
                  res.send('salah');
               }
               else
               {
                  samplefile2.mv(uploadfile2, function(err){
                     if (err) return res.status(500).send(err);
                     console.log('file quiz berhasil di upload');
   
                     var path = 'http://localhost/latihan1/routes/download/';
                     var sql="UPDATE `tr_materi` SET `nama_materi`='"+ judul_materi +"',`deskripsi_materi`='"+ deskripsi_materi +"',`isi_materi`='"+ path + samplefile1.name +"',`quiz`= '"+ path + samplefile2.name +"' WHERE tr_materi.id_materi = '"+ namamateri +"'";         
                     db.query(sql, function(err, result){  
                        if (!err) {
                           var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";
               
                           db.query(sql, function(err, result1){  
                              var sql2 = "SELECT * FROM tr_materi WHERE id_pelajaran = '"+ namaPel +"'";
                                 db.query(sql2, function(err, results2){  
                                    var sql_id_kelas = "SELECT * FROM m_kelas WHERE id_kelas = '"+ id_kelas +"'";
                                    db.query(sql_id_kelas, function(err, results3){        
                                    res.render('pilih_materi_mentor.ejs',{data:result1, materi:results2, kelas:results3});
                                    });  
                                 });
                           });
                        }
                        else
                        {
                           console.log(err);
                        }
                     });
   
                  });
               }
   
            });
      } 
   }

};

exports.hapus_materi = function(req, res){
   if(req.method == "POST"){
      var post = req.body;
      var namamateri = post.btn_hapus_materi;
      var namaPel = post.btn_hapus_id;
      var id_kelas = post.id_kelas;

      console.log('id Kelas = ' + id_kelas);
      console.log('aksi menghapus id pelajaran');
      console.log(namamateri);
      console.log(namaPel);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }

      var sql="DELETE FROM `tr_materi` WHERE id_materi = '"+ namamateri +"'";         
      db.query(sql, function(err, result){  
         if (!err) {
            var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";

            db.query(sql, function(err, result1){  
               var sql2 = "SELECT * FROM tr_materi WHERE id_pelajaran = '"+ namaPel +"'";
                  db.query(sql2, function(err, results2){  
                     var sql_id_kelas = "SELECT * FROM m_kelas WHERE id_kelas = '"+ id_kelas +"'";
                        db.query(sql_id_kelas, function(err, results3){  
                        res.render('pilih_materi_mentor.ejs',{data:result1, materi:results2, kelas:results3});
                     });
               });
               
            });
         }
         else
         {
            console.log(err);
         }
      });

   };
};

exports.beri_nilai = function(req, res){
   if(req.method == "POST"){
      var post = req.body;
      var id_mapel = post.btn_id_materi;
      var id_pelajaran = post.id_pelajaran;
      var id_kelas = post.id_kelas;
      console.log(id_kelas);
      console.log(id_pelajaran+id_mapel);
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }

      var sql1 ="SELECT tr_tugas.id_tugas, tr_tugas.username ,m_peserta.nama_depan, tr_tugas.nama_tugas, tr_tugas.deskripsi_tugas, tr_tugas.isi_tugas, tr_tugas.id_materi ,tr_materi.nama_materi, tr_tugas.ketuntasan FROM tr_tugas INNER JOIN m_peserta ON tr_tugas.username = m_peserta.username INNER JOIN tr_materi ON tr_tugas.id_materi = tr_materi.id_materi WHERE tr_tugas.id_materi = '"+ id_mapel +"' GROUP BY tr_tugas.username ";
      db.query(sql1, function(err, result1){
         var sql2="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";
         db.query(sql2, function(err, result2){
            var qery_pelajaran = "SELECT * FROM m_pelajaran WHERE id_pelajaran = '"+ id_pelajaran +"'";
            db.query(qery_pelajaran, function(err, results3){
               var sql_idKelas = "SELECT * FROM `m_kelas` WHERE id_kelas = '"+ id_kelas +"'"
               db.query(sql_idKelas, function(err, resultt){
                  res.render('penilaian_mentor.ejs',{data:result2, nilai:result1, peljaran:results3, kelas:resultt});
               });
               
            });
         });
      });
      
   }
};

exports.download_tugas_siswa = function(req,res){
   if(req.method == "POST"){
      var post = req.body;
      var id_mapel = post.id_materi;
      var username = post.username;
      console.log(id_mapel+ '_'+username);

      var sql = "SELECT SUBSTRING(tr_tugas.isi_tugas, 27,100) AS isi_tugas FROM tr_tugas INNER JOIN m_peserta ON tr_tugas.username = m_peserta.username WHERE tr_tugas.id_materi = '"+ id_mapel +"' AND m_peserta.username = '"+ username +"' GROUP BY tr_tugas.username";
      db.query(sql, function(err, result){
         console.log(result[0].isi_tugas);
         res.download(result[0].isi_tugas);
      });
   };
};

exports.update_nilai = function(req,res){
   if(req.method == "POST"){
      var post = req.body;
      var id_mapel = post.id_materi;
      var id_kelas = post.id_kelas;
      var username = post.upload_kelas;
      var id_pelajaran = post.id_pelajaran;
      var id_tugas = post.upload_id;
      var nilai = post.upload_nilai;

      console.log(id_kelas + id_mapel + username + id_pelajaran + id_tugas + nilai);

      var sql_update_nilai = "INSERT INTO `tr_nilai` (`id_nilai`, `username`, `id_kelas`, `id_pelajaran`, `id_materi`, `id_tugas`, `nilai`) VALUES (NULL, '"+ username +"', '"+ id_kelas +"', '"+ id_pelajaran +"', '"+id_mapel+"', '"+ id_tugas +"', '"+ nilai +"');";
      db.query(sql_update_nilai, function(err, result){
         console.log(result);
         res.send('');
      });
      
   };
};

exports.profile = function(req, res){
   var message = '';
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `m_mentor` WHERE `username`='"+userId+"'";

   db.query(sql, function(err, result){  
      res.render('form_profile_mentor.ejs',{data:result, message:message});
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

      var sql = "SELECT * FROM `m_mentor` WHERE username = '"+ username_ +"'";
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
            var sql_ubah_data = "UPDATE `m_mentor` SET `foto`='"+ path + samplefile.name +"' WHERE username = '"+ username_ +"'";    
            db.query(sql_ubah_data, function(err, result){  
               if (!err) {
                  res.redirect('/home/form_profile_mentor');
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
            var sql_ubah_data = "UPDATE `m_mentor` SET `nama_depan`='"+ nama_depan_ +"',`nama_belakang`='"+ nama_belakang_ +"',`alamat`='"+ alamat_ +"',`telepon`='"+ telepon_ +"',`email`='"+ alamat_email_ +"',`username`='"+ username_ +"',`password`='"+ password_ +"',`confim_password`='"+ konfirm_pas_ +"' WHERE username = '"+ username_ +"'";    
            db.query(sql_ubah_data, function(err, result){  
               if (!err) {
                  res.redirect('/home/form_profile_mentor');
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


exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};