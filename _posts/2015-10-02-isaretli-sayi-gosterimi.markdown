---
layout: post
title:  "İşaretli Sayı Gösterimi"
date:   2015-10-02
categories: 
  - Bilgisayar-Bilimi
redirect_from: "/isaretli-sayi-gosterimi"
---

Bilgisayar biliminde 6 gibi bir sayıyı **0000 0110** şeklinde binary olarak kodlarken negatif hali olan -6 sayısını binary olarak gösterebilmek için çeşitli teknikler oluşturulmuştur. Bu tekniklerin bazıları aşağıdaki gibidir.

### Sign-Magnitude

Pozitif sayılar için MSB'nin değeri 0,
Negatif sayılar için ise MSB'nin değeri 1 olur.

~~~
0000 0110 => +6
1000 0110 => -6
~~~

yani negatif sayıyı ifade edilmek için yukarıdaki gibi en soldaki bit 1 yapılmıştır.

1 bayt için unsigned gösterimdeki sayı aralığımız [0, 2^8-1 yani 255] iken sign-magnitude için [-127, 127] olmuştur.

Fakat bu gösterimle alakalı 2 problem mevcuttur.

#### 2 farklı 0 gösterimi
-0 ve +0 olmak üzere 2 tane 0 gösterimi vardır.

~~~
0000 0000 => +0
1000 0000 => -0
~~~

Bu da mantıksal işlemlerde -0 ifadesinin true değerine denk gelmesine sebep olur.

#### Toplama veya çıkartma işlemlerinde karışıklık

~~~
   0000 0110 =>  +6
+  1000 0110 =>  -6
-------------------
   1000 1100 => -12
~~~

Derleyicinin aritmetiksel işlemleri yapabilmesi için sayının signed veya unsigned olup olmadığını bilmesi gerekir. Doğrudan toplama veya çıkartma yapıldığında yukarıdaki gibi yanlış sonuç çıkar.

### One's Complement (Birin Tümleyeni)

Bütün bitlerin negatifi alınır yani 1'ler 0, 0'lar ise 1 olur. Bu şekilde MSB değeri 1'e eşit olur ve MSB değeri 1 iken sayının negatif olduğu bilinir.

~~~
0000 0110 =>  +6
1111 1001 =>  -6
~~~

[-127, +127] aralığındaki sayılar gösterilebilir.

Bu gösterimde de Sign-Magnitude da bulunan +0 ve -0 gösterimi sorunu mevcuttur.

~~~
  0000 0110 =>  +6
+ 1111 1001 =>  -6
-------------------
  1111 1111 =>  -0
~~~

Ayrıca **end-around borrow** denilen bir durum ortaya çıkar. 

~~~
  0000 0110 =>  +6
− 0000 1010 => +10
-------------------
1 1111 1100 =>  -3
~~~
  
öyle ki artan 1'in sonuçtan çıkartılması gerekir.

~~~
− 0000 0001 =>  +1
-------------------
  1111 1011 =>  -4
~~~

-4 doğru sonuçtur.

### Two's Complement (İkinin Tümleyeni)

Bilgisayar biliminde kullanılan en yaygın tekniktir. One's Complement ile aynı teknik uygulanır yani bütün bitlerin negatifi alınır. Farklı olarak sonuca 1 eklenir.

~~~
0000 0110 =>  +6
1111 1001 =>  -6 (One's Complement)
1111 1010 =>  -6 (Two's Complement)
~~~

Bu metod toplama, çıkartma işlemlerinde oldukça kolaylık sağlar.

2 farklı 0 gösterimi yoktur ve **end-around borrow** durumu ortaya çıkmaz. Negatif ve pozitif sayılar rahatlıkla toplanıp çıkartılabilir.

~~~
  0000 0110 =>  +6
+ 1111 1010 =>  -6
------------------
1 0000 0000 =>  0
~~~

en soldaki taşan 1 değeri yok sayılır.

Bu yöntemle aralık [-128, +127] olur.

### Excess-8

Sayılar sayı doğrusunun en sol köşesinden başlar. Yani **0000 0000** -128 değerini verirken. **1000 0000** 0 değerini verir. 

~~~
0000 0000 => -128
0000 0001 => -127
0111 1111 => -1
1000 0000 => 0
1000 0001 => 1
1111 1111 => 127
~~~

-----

*[MSB]: Most Significant Bit (En Önemli Bit)
*[unsigned]: İşaretsiz
*[binary]: iki tabanı
*[end-around borrow]: sondan elde alma