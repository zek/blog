---
layout: post
title:  "Big Endian Little Endian"
date:   2014-05-01
category: Bilgisayar-Bilimi
redirect_from: "/big-endian-little-endian-karmasasi"
---

Bittorrent kütüphanesini yazarken gönderdiğim verilerin karşı tarafa hatalı bir şekilde ulaştığını fark ettim. Öyle ki ben eş(peer) portunu 1600 olarak gönderirken o 16390 olarak algılıyordu bu işte bir terslik olmalıydı. Sonradan aklıma nasıl ki bizde sağdan sola veya soldan sağa okuma stili varsa işlemcilerde de aynısının olduğu geldi.

Yani bu şu demek oluyor: 1234 sayısını 2 farklı şekilde okuyabiliriz.

1234 => bin iki yüz otuz dört diye soldan sağa okuyabiliriz
1234 => dört bin üç yüz yirmi bir diye sağdan sola da okuyabiliriz.

Bunu Arapçanın, Latincenin aksine sağdan sola yazılması olarak da görebiliriz.

Kullandığımız bu Intel işlemciler little endian düzenini kullanıyor fakat soket işlemlerinde standart olarak Big Endian seçilmiş. Tabi bu little endian kullanamayacağınız anlamına gelmiyor bu konuda özgürsünüz. Neden big endian standart olmuş sorusunun cevabını bilmiyorum fakat 127.0.0.1 ip adresini 4 baytlık integer a çevirdiğimiz zaman 7F 00 00 01 elde ediyoruz ve ip blokları ile baytlar aynı sırada oluyor belki de bunun gibi şeylerin bir etkisi vardır. Ayrıca zaman zaman birbirlerine göre avantajlı oldukları durumlar da olabiliyormuş ama genel yargı aralarında hız anlamında bir fark olmadığı.

Big Endian

Büyük bayt başta şeklinde tanımlayabiliriz yani 0x12345678 şeklinde bir adreste en büyük bayt (matematikte onlar yüzler binler basamağı olarak düşünün) **12** olacaktır ve bu baytlar 12 34 56 78 şekline saklanır. Yani en büyük olan bayt en başta olur bu yüzden buna **Big Endian** denmiştir. Zaten fark ettiğiniz okuduğumuz sıralamada yazılıyor.

![Big Endian](/assets/article_images/2014-05-01-big-endian-little-endian/big-endian.png)

Little Endian

Şu an kullandığımız bu intel işlemcili bilgisayarlarda kullanılan little endian da işler değişiyor bütün baytları tersten yazıyoruz bu sefer ve 78 56 34 12 şeklinde bir bayt dizisi elde ediyoruz. Dikkat ederseniz en düşük bayt bu sefer dizinin başına geldi.

![Little Endian](/assets/article_images/2014-05-01-big-endian-little-endian/little-endian.png)

Bu kadar basit görünen bir konu bilinmediği takdirde projenizde bir faciaya yol açabilir ve eğer sistemi debug etme şansınız yoksa bunu hiç anlamayabilirsiniz de. O yüzden kendini "programcı" olarak gören herkesin mutlaka öğrenmesini en azından haberdar olması gereken bir konu olduğunu düşünüyorum.