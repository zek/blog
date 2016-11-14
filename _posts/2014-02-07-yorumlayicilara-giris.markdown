---
layout: post
title:  "Yorumlayıcılara Giriş - Kendi Dilini Tasarla"
date:   2014-02-07
category: Kendi-Dilini-Tasarla
redirect_from: "/yorumlayicilara-giris"
---

Bir önceki yazımda programlama dillerine giriş yaptık ve farklarından bahsettik. Şimdi ise bir yorumlayıcı nasıl çalışır, nasıl yapılır bunların üzerinde duracağız. Yorumlayıcı kaynak kodun yorumlanıp çalıştırılmasını temel alır. Elimizde belirli komutları içeren bir kod dizisi var ve yorumlayıcı bu kodu doğru bir şekilde analiz edecek ve kodları işletecek. Bir yorumlayıcının 3 temel aşaması vardır.

* **Kelimesel Analiz** (Lexical Analysis)
* **Sözdizimsel Analiz** (Parsing)
* **Yorumlama** (Interpreting)

#Kelimesel Analiz

Bu aşamada bütün kod Token adı verilen parçalara ayrılır. Bir token temel olarak tür, değer, satır, sütun bilgisi içerir. "değişken = 10 + 30" şeklindeki bir ifadeyi tokenlerine ayırırsak eğer aşağıdaki gibi bir çıktı elde edeceğiz.
{% highlight D %}
Token(identifier, "değişken", 1, 0) // "değişken" kelimesi
Token(EQ, "", 1, 9) // = işareti
Token(number, "10", 1, 11) // 10 sayısı
Token(plus, "", 1, 14) // + işareti
Token(number, "30", 1, 16) // 30 sayısı
{% endhighlight %}
Oluşturulan bu tokenler sözdizimsel analiz için için parser'a gönderilir.

#Sözdizimsel Analiz

Elde edilen tokenlerin hedef koda dönüştürülmesi aşamasıdır. Bütün elde edilen tokenler parser içerisinde yeniden işlenir. "uzunluk = 2 + 5 * 4" şeklinde bir kod lexer ve parser'da işlendikten sonra aşağıdaki gibi bir yapı oluşturulur. Aşağıdaki gösterime Soyut Sözdizim Ağacı(Abstract Syntax Tree) denilir.

![Parse Ağacı](/assets/article_images/2014-04-07-yorumlayicilara-giris/parse-agaci.png)

Parserdan doğrudan böyle bir çıktı alınması hafızayı fazla şişireceğinden dolayı Ara Dil (Intermediate Language) yani kısaca IL koduna çevirilir. Yorumlayıcı kısmında kendi komut setimizi tanımlayacağız. "uzunluk = 2 + 5 * 4" kodunun IL çıktısı ise aşağıdaki gibi olacaktır.
{% highlight asm %}
load 2
push
load 5
push
load 4
multiply
add
define uzunluk
{% endhighlight %}
Tabiki de yukarıdaki IL gösterimi Assembly dili gibi sadece bir gösterim aslında her komut için ayrı bir hex kodu vardır. 

Örnek vermek gerekirse

{% highlight D %}
0x00 = load
0x01 = push
0x02 = multiply
0x03 = add
0x04 = define
{% endhighlight %}
şeklinde devam eder. Üretilen bu IL çıktısı ise çalıştırılmak üzere Sanal Makinemize (Virtual Machine) gönderilir.

#Yorumlama

Yorumlayıcımızın son aşamasıdır. Bu aşamada artık ayrıştırılan kodların IL veya AST çıktısı çalıştırılması hedef alınır. IL kodunun çalıştırılması için bir sanal makine yazılır. Bütün komutlar tek tek tanımlanır. Gerekli ortamlar hazırlanır. Örneğin eğer stack based bir sanal makine ise bir stack oluşturulur yada register based ise register ortamı hazırlanır. Bir nevi işlemci taklit edilir esasında. Sanal makinenin detaylarına şimdi burada girmek yerine ileride daha detaylı bir şekilde kendi sanal makinemizi yaparken gireceğiz. Bir sonraki yazıda D dilini kullanarak basit bir lexer yazacağız.