---
layout: post
title:  "Sonlanma Problemi"
date:   2016-11-15
category: Bilgisayar-Bilimi
---

[Proof That Computers Can't Do Everything][1] adlı videoda Turing prensibiyle çalışan makinelerin neden her şeyi yapamayacağını güzel bir animasyon eşliğinde anlatıyor. Doğrusu video ilk başta kafa karıştırıcı ancak biraz araştırma yapınca olayın o kadar da karışık gelmediği anlaşılıyor.

Konuya giriş yapmadan önce bir ispat yöntemi olan [proof by contradiction][2] anlatmayı gerek görüyorum.

### Proof by contradiction 1

Bir şeyi ispat etmek için, tersinin yanlış olduğunu ispatlayabiliriz. 

Önerme P: 0'dan daha büyük, en küçük değere sahip bir sayı yoktur.

Bu önermenin tersinin doğru olduğunu varsayıyoruz ve **r**'nin 0'dan büyük en küçük değere sahip rasyonel sayı olduğunu varsayıyoruz.  

Varsayım Q: O halde r/2, 0'dan büyük ve r'den daha küçük bir rasyonel sayı olur. 

Fakat Önerme P için en küçük sayının r olabileceğini söylemiştik ancak r/2 nin aslında daha küçük olduğunu gördük. Bu ifade çelişiyor. Demekki Önerme P'nin tersi yanlış. Bu da bize Önerme P'nin doğru olduğunu gösteriyor.

### Proof by contradiction 2

Bir diğer örnek ise $$ \sqrt{2} $$ nin irrasyonel olduğunun ispatı.

Eğer rasyonel sayı olduğunu varsayarsak $$ \sqrt{2} $$ , $$ \frac{a}{b} $$ şeklinde ifade edebiliriz. Bu durumda $$ a $$ ve $$ b $$ bir tam sayıdır. Ayrıca $$ \frac{a}{b} $$ kesirinde a ve b'nin en düşük terimler olduğunu varsayarsak a tek sayı olmak zorundadır.

Eğer $$ \sqrt{2} = \frac{a}{b} $$ ise $$ a^2 = 2b^2 $$ olur.

$$ a $$ eğer tek sayıysa $$ a^2 $$ de tek sayı olur. Ancak $$ a^2 $$ nin $$ b^2 $$ nin iki katı olduğu gözüküyor. Bu durumda $$ a^2 $$ bir çift sayı olmak zorundadır. İşte burada bir çelişki var ve $$ \sqrt{2} $$ rasyonel olmadığını görüyoruz. Buradan yola çıkarak $$ \sqrt{2} $$ irrasyonel bir sayı olduğunu ispatlamış oluyoruz.

### Durma Problemi

Videodan yola çıkarsak;

- A(x) = toplama işlemi yapan bir makine
- C(x) = bir sonraki satranç hamlesini veren bir makine

A ve C farklı girdi (input) değerleri alan birbirinden farklı iki blueprint (teknik devre çizimi).

Eğer biz A makinesinden bir sonraki satranç hamlesini istersek ya da C makinesinden toplama işlemninin sonucunu istersek program cevabı bulamayacaktır ve makine sıkışacaktır.

Bunu kontrol edebilmek için H(x, y) adında, makine türü (x) ve input (y) şeklinde bir cihaz olduğunu varsayarsak ve bu makine verilen makine türü ve input için işlemin çalışıp çalışmayacağını döndürdüğünü varsayarsak. Bu makineye:

- H(A, matematiksel işlem) verdiğimizde "not stuck" yani çalışır mesajı döndürür.
- H(A, satranç tahtası) verdiğimizde ise "stuck" yani makine sıkışır mesajı döndürür.
- H(C, matematiksel işlem) verdiğimizde "stuck" yani makine sıkışır mesajı döndürür.
- H(C, satranç tahtası) verdiğimizde "not stuck" yani çalışır mesajı döndürür.

Burada teorem: Turing prensibiyle çalışan bir H makinesinin olamaz.

Bu teoremin tersinin yanlış olduğunu ispatlarsak teoremin doğru olduğunu ispatlamış oluruz. 

Öyleyse böyle bir H makinesinin olduğunu varsayalım.

N adında tersini veren(negator) bir makine tanımlayalım:

- N(not stuck) verdiğimizde makine sıkışır.
- N(stuck) verdiğimizde ise çıktı olarak **:)** verir.

Kısaca N için, H makinesinin bize verdiği yanıta güvenerek işlemimizi gerçekleştirdiğini varsayalım.

H makinesine Girdi(Input) olarak kendisini verirsek ne olur?

- H(H, H) "stuck" döndürür ve N makinesi çıktı olarak **:)** döndürür.

H makinesi bize işlemin cevabının "stuck" olduğunu söyledi ancak çıktı olarak **:)** almamız bize H'nin yanıldığını gösteriyor.

Diğer bir ihtimal ise

- H(H, H) "not stuck" döndürür ve bu yanıtı işleyen N makinesi ise sıkışır.

H makinesi bu durumda işlemin cevabının "not stuck" olduğunu söylemişti ancak N makinesi işlem sonucunda sıkıştı.

Bu sonuca göre "Turing prensibiyle çalışan bir H makinesinin olamaz" teoreminin doğru olduğunu çıkarıyoruz.

Yani bir makinenin verilen girdilerle geçerli bir şekilde çalışıp çalışmayacağını bulan bir makine yapılacak olsa, bu makine kendisini sınayamayacaktır. Bu da Turing prensibiyle çalışan böyle bir makine yapılamayacağı anlamına gelmektedir.

[1]:    https://www.youtube.com/watch?v=92WHN-pAFCs
[2]:    http://www.bilgisayarkavramlari.com/2008/08/02/burhan-i-mutenakis-proof-by-contradiction-olmayana-ergi/