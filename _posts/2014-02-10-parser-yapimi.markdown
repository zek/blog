---
layout: post
title:  "Parser Yapımı - Kendi Dilini Tasarla"
date:   2014-02-10
category: Kendi-Dilini-Tasarla
redirect_from: "/parser-yapimi-kendi-dilini-tasarla"
---
Programlama dilimizi yazmaya devam ediyoruz. Bir önceki yazıdaki lexer'a **lparen**, **rparen**, **comma** türlerini ekledim. Siz de bu türleri lexerınıza ekleyin ki *print(1, 2)* gibi fonksiyonları çağırabilelim.

Parser'ın çalışması için **Intermediate Language** yazmamız gerektiği için **IL** çıktısı verilen yerde *writeln* ile konsol çıktısı vereceğiz. Daha sonradan IL'i tanımladıktan sonra bu *writeln* fonksiyonlarını dönüştüreceğiz.

Öncelikle *parser.d* adında bir dosya açalım ve içerisine aşağıdaki yapıyı tanımlayalım.

{% highlight D %}
/// Fonksiyonlar arası iletişimi sağlayan dönüş değerini belirten yapı.
enum RetType{
      none, expression
}
{% endhighlight %}

Bu yapı parser içindeki fonksiyonlar arasındaki iletişimi sağlayabilmek için dönüş değerlerini içeriyor. Fonksiyonlardan parse edilen veriyi döndürmek yerine IL çıktısı vereceğimiz için bir şekilde döndürülen verinin türünü, formatını belirtmemiz gerekecek.

Parser için bir class açtım ve bunu Lexer sınıfından türettim. Bakıldığında Lexer için sınıf açmaya gerek yok gibi duruyor ama ileride Lexer'ınızı geliştirmek isterseniz (Örneğin Token dizisini kaldırıp *yield* ile Token vermek) sınıf olması daha çok işinize gelecektir.

{% highlight D %}
/**
 Belirlediğimiz gramer kurallarına göre kodu işleyecek olan sınıfımız.
 */
class Parser : Lexer{
    private:
        Token[] tokens;
        size_t i;// Şu anki token
    public:
        //Kodlarımızı lexera gönderecek ve sonra sözdizimsel analizi başlatacak olan ana fonksiyonumuz.
        void parse(string code){
            tokens = lexit(code);//Lexerdan gelen tokenleri tokens dizisine yükle.
{% endhighlight %}

Şimdi buraya kadar ön hazırlığımızı yaptık. Şimdi tokenleri tek tek işleyeceğiz. Benim burada yapacağım dlin ; kullanımını zorunlu tutmak, ana main içerisinde gereksiz değişken varlığını engellemek gibi bazı katı kuralları olacak. Siz isterseniz bu katı kuralları sisteme dahil etmeyebilir daha farklı kurallara sahip bir dil yapabilirsiniz.

{% highlight D %}
while(i < tokens.length){/// Token olduğu sürece
    switch(tokens[i].type){
        case Type.identifier:/// Bir tanımlayıcı yani değişken gelirse
            auto name = tokens[i].value;/// Sonraki token'e geçileceği için ismini değişkenin adını saklıyoruz.
            i++;/// index değerini arttırarak sonraki tokene geçiyoruz.
{% endhighlight %}

Burada a = 1 şeklindeki bir ifadenin = kısmına kadarını aldık ve şimdi sonraki işlemi kontrol ettireceğiz. Yani = mi gelmiş yoksa bir parantezler () gelip fonksiyon mu çağırılmş.

{% highlight D %}
if(tokens[i].type == Type.equals){ ///Bir tanımlama ise
    i++; /// = karakterini geçiyoruz.
{% endhighlight %}

Burada = den sonra bir değişken, integer, string veya bir matematiksel işlem gelebilir. O yüzden bu tarz genel şeyleri getIt fonksiyonu içerisinde tanımlayacağız. Bu fonksiyon bir değer işliyor mu işlemiyor mu ve eğer işliyorsa da işlediği verinin türünün bilgisini RetType sayesinde öğreneceğiz ve eğer bir ifade dönmüyorsa hata verdireceğiz.

{% highlight D %}
          if(getIt() == RetType.expression){
                writefln("define '%s'", name);
            }else throw new Exception("= den sonra bir ifade bekleniyordu. %s geldi".format(tokens[i].type));
        }else if(getFunction()){ /// Bir fonksiyon çağırma ise
        }else{
            throw new Exception("%s değişkeni üzerinde hiçbir işlem yapılmadı".format(name));
        }
        break;
    default:/// Switch içerisindeki hiçbir yerle eşleşemezse hata fırlatıyoruz.
        throw new Exception("Beklenmeyen tür: %s".format(tokens[i].type));
}
{% endhighlight %}

= işaretini algıladığımız gibi fonksiyon çağırma işlemini de algılayacağız ve yine bu işlemi birden fazla yerde yapacağımız için getFunction adında bir fonksiyon içerisinde kodlarını tanımlayacağız.

{% highlight D %}
      if(tokens[i].type==Type.semicolon){/// Noktalı virgül kullanımını zorunlu hale getir
            i++;
            continue;
        }else throw new Exception("; bekleniyordu %s geldi".format(tokens[i].type));
    }
}
{% endhighlight %}

Daha öncede belirttiğim gibi dili biraz katı kurallı yapıyorum ve noktalı virgülü yukarıdaki kodlar ile zorunlu hale getiriyorum.

Şimdi ise getIt fonksiyonunu tanımlayalım. Temel türlerimizin ayrıştırılmasını sağlayacağız.

{% highlight D %}
private:
RetType getIt(){
    switch(tokens[i].type){
        case Type.number:
            writefln("load %s", tokens[i].value);
            i++;
            return RetType.expression;
        case Type.string:
            writefln("load "%s"", tokens[i].value);
            i++;
            return RetType.expression;
        case Type._true:
            writefln("load true");
            i++;
            return RetType.expression;
        case Type._false:
            writefln("load false");
            i++;
            return RetType.expression;
        case Type.identifier:
            writefln("load_var %s", tokens[i].value);
            i++;
            getFunction();
            return RetType.expression;
        default:
            return RetType.none;
    }
}
{% endhighlight %}

Ve son olarak da getFunction fonksiyonumuzu tanımlıyoruz.

{% highlight D %}
      /**
            Fonksiyon çağırma işlemlerini yakalar.
        */
        bool getFunction(){
            if(tokens[i].type==Type.lparen) i++;/// Eğer ( tokeni var ise sonraki tokene geçer yoksa fonksiyondan çıkar.
            else return false;
            size_t parametercount; /// Parametre sayısını tutar.
            if(tokens[i].type==Type.rparen) goto end; /// Parantez kapatıldı ise döngüye girmeden direk sona atlar.
            while(i < tokens.length){
                if(getIt() == RetType.none){
                    throw new Exception("Bir ifade beklenirken %s geldi".format(tokens[i].type));
                }else{
                    parametercount++;
                    writeln("push_param");
                }
                if(tokens[i].type == Type.comma){ /// Sonraki parametre için 'virgül' kontrolü.
                    i++;
                    continue;
                }else break;
            }
            if(i >= tokens.length) throw new Exception("Parantezin kapatılması bekleniyordu.");
            else if(tokens[i].type!=Type.rparen) throw new Exception("Parantezin kapatılması bekleniyordu. %s geldi".format(tokens[i].type));
        end:
            i++;
            writefln("call %s", parametercount);
            return true;
        }
{% endhighlight %}

Parser içerisinde *1 + 2 \* 4* gibi matematiksel ifadeleri işlem önceliğine göre ayrıştırma işleminin nasıl yapılacağını bir sonraki yazımda anlatacağım.

Projeyi indirmek için: [langdev_2.tar](/assets/files/langdev_2.tar.gz)