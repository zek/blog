---
layout: post
title:  "Veri Türleri - Kendi Dilini Tasarla"
date:   2014-02-12
category: Kendi-Dilini-Tasarla
redirect_from: "/veri-turleri-kendi-dilini-tasarla"
---
Şimdiye kadar Lexer ve Parser'ımızı tamamladık ve sıra veri türlerini tanımlamaya geldi. Parserımız int, string ve boolean türlerini algılayabilecek hale geldi ve şimdi bunları nesne haline getireceğiz.

Önce nesnelerimizi türetmek için işlevlerimizi içeren bir sınıf oluşturuyoruz.

{% highlight D %}
/*
 * Nesnelerin işlevlerini içeren arayüz.
*/
class RObject{
  RObject opCall(RObject[] parameters){
    throw new Exception("Bu türü çağıramazsınız.");
  }
  RObject opAdd(RObject){
    throw new Exception("Bu türde toplama yapamazsınız.");
  }
  RObject opMul(RObject){
    throw new Exception("Bu türde çarpma yapamazsınız.");
  }
  RObject opDiv(RObject){
    throw new Exception("Bu türde bölme yapamazsınız.");
  }
  RObject opSub(RObject){
    throw new Exception("Bu türde çıkartma yapamazsınız.");
  }
  override @property string toString(){
    throw new Exception("Bu türü string yapamazsınız.");
  }
}
{% endhighlight %}

Burada toplama, çıkartma, çarpma, bölme ve çağırma ve toString işlevlerini hata mesajlarını içerecek şekilde tanımladık. Daha sonra ise veri türlerimizi bu sınıftan türetip üzerinde override ile tekrardan yazacağız. İşlemlerimizi RObject üzerinden yapacağımız için **override** edilen fonksiyona erişim sağlanacak ve hepsi aynı türden türetildiği için farklı sınıf türlerini daha rahat bir şekilde saklayabileceğiz.

Şimdi ilk türümüz olan **boolean**'ı tanımlayalım. Boolean sadece bir bool bilgisinden oluştuğu için ve üzerinde hiçbir işlem yapılmadığı için sadece **toString** üzerine override yapıyoruz ve this fonksiyonu ile bool veriyi alıyoruz.

{% highlight D %}
class RBoolean : RObject{
  bool value;
  this(bool value){
    this.value = value;
  }
  override:
  @property string toString(){
    return to!string(value);
  }
}
{% endhighlight %}

Şimdi sıra string nesnesinde. Bu sınıf için farklı olarak opAdd tanımladık bu sayede 2 stringi toplayıp yeni bir sınıf oluşturacağız.

{% highlight D %}
class RString : RObject{
  string value;
  this(string value){
    this.value = value;
  }
  override:
  @property string toString(){
    return to!string(value);
  }
  RObject opAdd(RObject t){
    return new RString(this.value ~ (cast(RString) t).value);
  }
}
{% endhighlight %}

Sayı nesnemiz içinde ise 4 matematiksel işlemi tanımladık

{% highlight D %}
class RNumber : RObject{
  int value;
  this(int value){
    this.value = value;
  }
  override:
  @property string toString(){
    return to!string(value);
  }
  RObject opAdd(RObject t){
    return new RNumber(this.value + (cast(RNumber) t).value);
  }
  RObject opMul(RObject t){
    return new RNumber(this.value * (cast(RNumber) t).value);
  }
  RObject opDiv(RObject t){
    return new RNumber(this.value / (cast(RNumber) t).value);
  }
  RObject opSub(RObject t){
    return new RNumber(this.value - (cast(RNumber) t).value);
  }
}
{% endhighlight %}

Ve son olarak print gibi çağırabileceğimiz fonksiyonları içeren fonksiyon sınıfımız. Buradada farklı olarak opCall tanımladık opCall içerisindede bir dizi içerisinde parametreleri alıp ilgili işleve gönderiyoruz.

{% highlight D %}
class RFunction : RObject{
  string name;
  RObject function(RObject[]) func;
  this(string name, RObject function(RObject[]) func){
    this.name = name;
    this.func = func;
  }
  override:
  @property string toString(){
    return "[Fonksiyon: %s, Adres: %s]".format(name, &func);
  }
  RObject opCall(RObject[] parameters){
    return func(parameters);
  }
}
{% endhighlight %}

Artık temel türlerimiz hazır. Şimdi temel türlerle ilgili birkaç test yapabiliriz.

{% highlight D %}
writeln(new RString("Talha ") + new RString("Zekeriya ") + new RString("Durmuş"));
writeln(new RNumber(4) * new RNumber(2) + new RNumber(10));
writeln(new RBoolean(true) );
{% endhighlight %}

Bu kodları D üzerinde çalıştırdığınızda aşağıdaki çıktıyı verecektir.

~~~
Talha Zekeriya Durmuş
18
true
~~~

Şimdi sıra **Intermediate Language** tasarımını yapmaya geldi. Bir sonraki yazıda bunun üzerinde duracağız.

**Not:** Burada oluşturulan sınıf nesneleri D dilinin çöp toplayıcısı tarafından otomatik olarak algılanıp süpürülmektedir. Bu yüzden hafıza şişme sorunları ile karşılaşmazsınız.