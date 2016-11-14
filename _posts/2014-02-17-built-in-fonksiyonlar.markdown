---
layout: post
title:  "Built-in Fonksiyonlar - Kendi Dilini Tasarla"
date:   2014-02-17
category: Kendi-Dilini-Tasarla
---

Sanırım artık sonuncu "Kendi Dilini Tasarla" yazısına ulaştık. Buraya kadar temel olarak neyin nasıl yapıldığını az çok anlamış olmalısınız ve bundan sonra üzerine birşeyler katıp bir dil geliştirmek sizin elinizde bunun için mevcut dillerin kaynak kodlarına bakıp inceleyebilirsiniz, internette araştırma yapabilirsiniz bu yazılarda sadece bir dil tasarımı için gerekli olan şeyleri yüzeysel olarak gördünüz. Dil yapımı için daha doğrusu kaliteli iyi bir dil yapımı için bu sitede okuduklarınızdan çok daha fazlasına ihtiyacınız olacaktır hatta muhtemelen sizi en çok zorlayacak olan şey veri yönetimi olacaktır her ne kadar D dili bu işlemi bizim yerimize de yapıyor olsa performans için sizin de kendi nesnelerinizi ve onların çöp toplayıcılarını oluşturmanız gerekecek. Ara ara bu dille alakalı tekrar yazılar yazabilirim ama şimdilik bu kadarı yeterli olacaktır. Lafı fazla uzatmadan built-in kısmını da oluşturalım ve yazımızı bitirelim.

Built-in kısmında programlama dilimiz ile beraber gelen sistem fonksiyonlarını oluşturacağız.

{% highlight D %}
module builtin;
import std.stdio;
import robject;
import std.conv;

/** Bütün parametreleri konsola yazan print fonksiyonumuz. */
RObject _print(RObject[] parameters){
	foreach(param; parameters){
		write(param);
	}
	writeln();
	return new RBoolean(true);
}

/** String'i, integer'a çeviren int fonksiyonumuz. */
RObject _int(RObject[] parameters){
	return new RNumber(to!int(parameters[0].toString()));
}
{% endhighlight %}

Yukarıda gördüğünüz şekilde normal D fonksiyonu şekilde tanımlayıp onlara parametreler üzerinden nesnelerimizi göndereceğiz ve geri dönüş değeri olarak da yine bir nesne oluşturacağız. Burada sadece 2 tane fonksiyon tanımladım artık siz istediğiniz gibi fonksiyon tanımlayıp geliştirebilirsiniz hatta bir hobi eğlence projesi olarak bu dili tamamen Türkçe dahi yapabilirsiniz tamamen size kalmış.

Projenin buraya kadarki kaynak kodunu indirmek için: [Make Your Own Language - Final](/assets/files/langdev-final.tar.gz)