---
layout: post
title:  "D Dilinde Merhaba Dünya"
date:   2014-02-08
category: DDili
---

Malum yazılarımda sürekli olarak D dilinden bahsediyorum ve bunun için de D dilinde bir "merhaba dünya" programı yazmak iyi olacaktır.

Öncelikle D'nin derleyicisini yani dmd'yi indirip yüklememiz gerekecek. Ben şu an Ubuntu 13.10 64 bit kullanıyorum. O yüzden [dlang.org'dan](http://dlang.org/download.html) ubuntu için olan sürümü indiriyorum siz de aynı şekilde kendi işletim sisteminize göre siteden indirebilirsiniz.

Eğer Windows kullanıyorsanız DMD'nin windows installeri kurulumda size VisualD kurulsun mu diye soruyor ve kabul ederseniz bilgisayarınızdaki Visual Studio sürümlerine eklentiyi kuracaktır. Eklenti kod D dili için renklendirme, debugging, dissassembly gibi bir çok özellik sunuyor. Windows ortamında iseniz olmazsa olmaz bir eklenti diyebilirim. Eklentinin orjinal web sayfasına [buradan](http://www.dsource.org/projects/visuald) erişebilirsiniz.

Buraya kadar programı kurduğunuzu varsayıyorum. Bir tane main.d adında dosya açıyoruz ve içerisine aşağıdaki kodu yazıyoruz.

{% highlight D %}
import std.stdio;

void main(){
    writeln("Merhaba Dünya");
}
{% endhighlight %}

Kodda "import std.stdio;" bizim writeln fonksiyonumuzun bulunduğu kütüphaneyi çağırmak için yazıyoruz ve writeln fonksiyonu ile ekrana yazımızı yazdırıyoruz. Şimdi ise programı çalıştırmak için  derleyeceğiz. DMD ile programı derleyebilmek için sadece "dmd main.d ikincidosyam.d ucuncudosyam.d " şeklinde dmd den sonra d dosyalarını yazmamız yeterli.

Eğer main.d diye kayıt ettiyseniz Windows ortamında cmd veya Linux ortamında terminal'i açıp "dmd main.d" yazmanız yeterli. Programı doğru yazdıysanız eğer "main" adında bir dosya oluşacak onu açtığımızda program çalışacaktır. Programı açtığınızda hemen kapanacağı için yine konsol ekranından çalıştırmanızı tavsiye ederim bu sayede çıktıyı rahatlıkla görebilirsiniz.

Eğer D dilini öğrenmeye hevesli iseniz. [Ali Çehreli](http://acehreli.org) hocamın yazmış olduğu ve şu an Amerika'da bazı üniversitelerde okutulmakta olan kitabından D dilini öğrenebilirsiniz. Kitaba erişmek için http://ddili.org/ders/d/index.html. Ayrıca [ddili.org forumuna](http://ddili.org/forum/) da sizleri bekleriz :)

Bu yazı fikri için Berker Kılıç hocama teşekkürler :)