---
layout: post
title:  "Matematiksel İfadelerin Ayrıştırılması - Kendi Dilini Tasarla"
date:   2014-02-11
category: Kendi-Dilini-Tasarla
---
Bir önceki yazıda dilimizi *a = 1* , *print()* gibi ifadeleri ayrıştırabilecek şekile getirmiştik. Şimdi matematiksel ifadeleri işlem önceliğini dikkate alarak ayrıştıracağız. Aşağıda *2 + 5 \* 4* şeklindeki bir ifadenin olası 2 farklı sonucunu göreceksiniz.

![ambiguous](/assets/article_images/2014-02-11-matematiksel-ifadelerin-ayristirilmasi/ambiguous.png)

Bu ifadede önce 2 ve 5 i toplaması yanlış sonuçlar doğuracaktır. Çünkü çarpma işleminin toplamaya göre önceliği vardır. Bu yüzden işlem yukarıdaki 2.şekildeki gibi yapılmalıdır. Yani önce 5 ve 4 çarpılıp 2 ile toplanacak.

Bunu önlemek için ise biz bu dilde **shunting-yard** algoritmasını kullanacağız. Algoritma ile ilgili daha detaylı bilgiyi [wikipedia](http://en.wikipedia.org/wiki/Shunting-yard_algorithm) sayfasından bulabilirsiniz.

Shunting-yard algoritması infix gösterimdeki bir ifadeyi postfix gösterime dönüştürmemizi sağlar. Örnek gösterirsek;

~~~
infix notasyon : 1 + 2 * 4
postfix notasyon : 1 2 4 * +

~~~
Burada postfix notasyonda işlecin sayılardan sonra geldiğini görüyorsunuz. Her işleç kendisinden bir önceki ve iki önceki operand yani sayı ile işleme giriyor ve sonucu bu sayı ve operandların yerine yazılıyor ve sonuç bulunuyor. Örnek verirsek;

1. adım 1 2 4 * +
2. adım 1 8 +
3. adım 9

Algoritmanın en basit hali şu şekilde işliyor;

1. Token oku
2. Token sayı ise çıktı ver.
3. Token operatör ise
4. Eğer operatör stack içerisinde operatör var ise ve bu operatör okunan operatörden daha az işlem önceliğine sahip ise operatör stacktaki operatörü oradan alıp çıktı ver.
5. Operatörü stacke ekle.
6. Eğer okunacak operatör yok ise stackteki bütün operatörleri son eklenenden başlayarak çıktı ver.

Burada karmaşa olmasın daha basit bir anlatım olsun diye parantezleri dahil etmedim. İlerleyen zamanlarda bunları da dile dahil edeceğiz.

Şimdi kodumuzu yazalım. Öncelikle stack içerisinde tutacağımız operatör bilgilerini içeren yapımızı oluşturalım.

{% highlight D %}
/// İşlem önceliği tablosuna yeniden erişmemek için öncelik değerini tuttuğumuz yapı.
struct Operator{
    Type type; /// Operatör
    size_t precedence; ///İşlem önceliği
}
{% endhighlight %}

Daha sonra aşağıda işaretli olan satırları Parser'ımıza ekliyoruz. Burada işlem önceliğimizi tutacağımız tabloyu oluşturuyoruz.

{% highlight D %}
class Parser : Lexer{
    private:
        Token[] tokens;
        size_t i;// Şu anki token
        static size_t[Type] op_precedences;/// İşlem Önceliği tablosu
        static this(){
            /**
                İşlem önceliği yüksek olan daha büyük sayı ile gösteriliyor.
            */
            op_precedences = [Type.plus: 2 , Type.minus: 2, Type.times: 3, Type.divide: 3];
        }
{% endhighlight %}

Çarpma ve bölmenin daha yüksek işlem önceliği olduğu için onlara daha büyük rakamlar verdik. Ve şimdi matematiksel ifadeleri yakalayacak olan fonksiyonumuzu tanımlıyoruz. Ben fonksiyona calcIt adını verdim.

{% highlight D %}
/**
    Shunting-Yard algoritmasını kullanarak matematiksel ifadeleri işlem önceliğine
    göre ayrıştıran fonksiyon.
*/
RetType calcIt(){
    Operator[] operators; /// Operatörlerin geçici olarak saklandığı operatör stack
    bool waitexp = true; /// İşleçden sonra matematiksel ifade gelip gelmediğini kontrol etmek için
    while(i < tokens.length){
        if(getIt() == RetType.expression) waitexp = false; /// İlk ifademizi okuyoruz.
        else if(waitexp) break; /// ilk if koşulumuzda ifade gelmedi ise ve bir ifade bekleniyorsa döngüyü kır.
        else if(auto p = tokens[i].type in op_precedences){/// İşlem önceliğimizi öncelik tablosundan al
            while(operators.length > 0 && *p < operators[$-1].precedence ){/// Eğer operatör stackda eleman var ise ve işlem önceliğimiz daha küçük ise
                writeln(operators[$-1].type);
                operators = operators[0..$-1];/// Operatörü stackdan sil.
            }
            writeln("push");
            operators ~= Operator(tokens[i].type, *p);///Stack'e operatörü ekle
            i++;
            waitexp = true;/// Artık bir işleç geldiği için bir ifade gelmesi gerekecek.
        }else break;
    }
    if(waitexp) throw new Exception("Bir ifade bekleniyordu! %s geldi".format(tokens[i].type));
    foreach(operator; operators){/// Operatör stackda kalan bütün operatörleri işle.
        writeln(operator.type);
    }
    return RetType.expression;
}
{% endhighlight %}

IL yapısı kullanacağımız için sadece operatör stack tanımladım. Wikipedia sayfasında veya başka kaynaklarda algoritma için birde output stack görebilirsiniz. Şimdi geriye sadece sistemizdeki birkaç getIt fonksiyonunu calcIt ile değiştirmek kaldı. Bir önceki yazımdaki eksik kodu tamamlamak adına  Parse fonksiyonu içerisinde aşağıdaki işaretli satırları ve

{% highlight D %}
case Type.identifier:/// Bir tanımlayıcı yani değişken gelirse
    auto name = tokens[i].value;/// Sonraki token'e geçileceği için ismini değişkenin adını saklıyoruz.
    size_t pcount;
    i++;/// index değerini arttırarak sonraki tokene geçiyoruz.
    if(tokens[i].type==Type.equals){///Bir tanımlama ise
        i++;/// = karakterini geçiyoruz.
        if(calcIt() == RetType.expression){
            writefln("define '%s'", name);
        }else throw new Exception("= den sonra bir ifade bekleniyordu. %s geldi".format(tokens[i].type));
    }else if(getFunction(pcount)){ /// Bir fonksiyon çağırma ise
        writefln("load '%s'", name);
        writeln("call", pcount);
    }else{
        throw new Exception("%s değişkeni üzerinde hiçbir işlem yapılmadı".format(name));
    }
    break;
{% endhighlight %}

Ayrıca getIt fonksiyonu içerisindeki kodları da aşağıdaki şekilde değiştirmeliyiz. Aksi halde bir önceki yazımdaki hatamdan dolayı getFunction'dan düzgün bir şekilde IL çıktısı verilmeyecektir.

{% highlight D %}
case Type.identifier:
    string name = tokens[i].value;
    i++;
    size_t pcount;
    if(getFunction(pcount)){
        writefln("load_var %s", name);
        writefln("call %s", pcount);
    }else writefln("load_var %s", name);
    return RetType.expression;
{% endhighlight %}

ve getFunction içerisinde aşağıdaki satırı calcIt olarak değiştirmek yetecektir.

{% highlight D %}
bool getFunction(){
    if(tokens[i].type==Type.lparen) i++;/// Eğer ( tokeni var ise sonraki tokene geçer yoksa fonksiyondan çıkar.
    else return false;
    size_t parametercount; /// Parametre sayısını tutar.
    if(tokens[i].type==Type.rparen) goto end; /// Parantez kapatıldı ise döngüye girmeden direk sona atlar.
    while(i < tokens.length){
        if(calcIt() == RetType.none){
            throw new Exception("Bir ifade beklenirken %s geldi".format(tokens[i].type));
        }else{
{% endhighlight %}

Ben test için

~~~
a = 1 * 2 + 2 * 3 * 4 * 5 + 6;
~~~

kodunu yazdım ve aşağıdaki çıktıyı verdi.

~~~
Program has started
load 1
push
load 2
times
push
load 2
push
load 3
push
load 4
push
load 5
times
times
times
push
load 6
plus
plus
define 'a'
~~~
Artık matematiksel ifadelerimizi de rahatlıkla ayrıştırabiliyoruz tek yapmamız gereken writeln şeklinde çıktı vermek yerine IL çıktısı vermek olacaktır. Bir sonraki yazıda IL çıktısı verebilmek için nesnelerimizi oluşturacağız ve sonrasına ise IL sınıfımızı yazacağız.

Projeyi indirmek için: [Make Your Own Language – 3](/assets/files/langdev_3.tar.gz)