---
layout: post
title:  "C dilini D ile birlikte derlemek"
date:   2014-02-09
category: Ddili
redirect_from: "/c-dilini-d-ile-birlikte-derlemek"
---

Uzun bir süredir bunu merak ediyordum dün [ddili.org forumunda](http://ddili.org/forum/post/10549;nocount) Ali Çehreli hocama bu soruyu yönelttim ve sağolsun nasıl yapılacağını gösterdi.

Öncelikle bir tane main.c adında dosya oluşturalım. İçerisine aşağıdaki c kodunu yazalım.

{% highlight C %}
#include <stdio.h> 

void C_fonksiyonu(){
    printf("C_fonksiyonu çağırıldı\n");
}

int main(){
    int ll = D_fonksiyonu(1000);
    printf("%i\n", ll);
    return 0;
}
{% endhighlight %}
Bir tane de main.d adında dosya oluşturalım ve içerisine aşağıdaki kodları yazalım.

{% highlight D %}
import std.c.stdio;;

extern(C) void C_fonksiyonu();

extern(C) int D_fonksiyonu(int val){
  C_fonksiyonu();
  printf("D_fonksiyonu çağırıldı\n");
  return val;
}
{% endhighlight %}
D dilindeki fonksiyonların çağırılış yöntemi C dilinden farklı olduğu için C fonksiyonunu import etmek için D kodunda **extern(C)** yapılması gerekiyor. Bu konuda daha detaylı bilgi için **calling conventions** şeklinde arama yapabilirsiniz veya c nin çağırma yöntemi olan **__cdecl'ı** araştırabilirsiniz.

Şimdi programı derleyeceğiz. Bunun için önce d kodunu object dosyasına

~~~
dmd main.d -c -ofmain_d.o
~~~

komutu ile çeviriyoruz ve daha sonra gcc'ye oluşturulan main_d.o dosyasını da gönderip c dosyası ile birlikte derliyoruz. Ayrıca druntime nimetlerinden yararlanabilmek için de phobos2 yi link ediyoruz.

~~~
gcc main_d.o main.c -omain -lphobos2
~~~
oluşturulan **main** dosyasını çalıştırınca aşağıdaki çıktıyı verecektir.

~~~
zack@drzack:~/Desktop/dc/d in c$ make
C_fonksiyonu çağırıldı
D_fonksiyonu çağırıldı
1000
~~~
Gördüğünüz gibi D dili ve C dili arasında istediğimiz gibi fonksiyonlara erişebiliyoruz.

Bu yazı için Ali Çehreli hocama tekrardan teşekkür ediyorum.

Kaynak kodu indirmek için: [d in c.tar](/assets/files/d-in-c.tar.gz)

C dilini D dili içerisinde kullanmak için ise: [c in d.tar](/assets/files/c-in-d.tar.gz)