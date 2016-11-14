---
layout: post
title:  "Sanal Makine - Kendi Dilini Tasarla"
date:   2014-02-16
category: Kendi-Dilini-Tasarla
redirect_from: "/sanal-makine-kendi-dilini-tasarla"
---

Sanal makine oluşturduğumuz ara dil çıktısını çalıştıracak olan modülümüzdür. Yapacağınız dile göre daha kompleks sanal makine yazmanız gerekebilir. Burada oluşturacağımız sanal makine stack adında nesnelerimizi tutacağımız bir dizi, o an işlediğimiz yani aktif olan nesneyi belirten current ve o anki komutumuzun adresini tutan **IP (Instruction Pointer)** değişkenlerinden oluşacaktır.

{% highlight D %}
class VirtualMachine{
	void execute(IL ilcode){
		string tmp;//Geçici olarak kullanmak üzere bir string
		RObject[] stack;//Nesne dizimiz
		RObject current;//Aktif nesne
		RObject[string] variables;//Değişkenlerimiz
		auto IP = ilcode.codes.ptr;//instruction pointer. O anki il kodunun adresini tutar.
		start:
{% endhighlight %}

Yapacağınız dile göre sanal makineyi daha da geliştirebilirisiniz fakat şuanki hali bizim işimizi görecektir.

{% highlight D %}
	static RObject[string] global;
	static this(){
		global = [
			"print": new RFunction("print", &builtin._print),
			"int": new RFunction("int", &builtin._int),
		];
	}
{% endhighlight %}

Builtin fonksiyonlarımız için de yukarıdaki kodları tanımlayalım.

{% highlight D %}
//
		switch(*cast(il*) IP){/// Çalıştırılacak olan il komutuna git.
			/** Üzerinde işlem yapılacak olan aktif nesneyi değiştirir.  */
			case il.load: IP++;
				current = *cast(RObject*) IP;
				IP += (void*).sizeof;
				goto start;
			/** Aktif "variables" hashmap i üzerine değişken adına göre tanımla.  */
			case il.definevar: IP++;
				tmp = (cast(char*) IP).cstr2dstr();
				variables[tmp] = current;
				IP += tmp.length + 1;
				goto start;
			/** Değişkeni önce kullanıcı tarafından tanımlananlar arasında ara eğer yoksa
			 *  Global değişkenler arasında ara.
			 */
			case il.loadvar: IP++;
				tmp = (cast(char*) IP).cstr2dstr();
				if(auto var = tmp in variables)
					current = *var;
				else if(auto var = tmp in global){
					current = *var;
				}else throw new Exception("'%s' değişkeni tanımlanmadı!".format(tmp));
				IP += tmp.length + 1;
				goto start;
			/** Aktif nesneyi stack'a yaz */
			case il.push:
				stack ~= current;
				IP++;
				goto start;
			/** Aktif nesneyi fonksiyon parametresi olarak stack'a yaz
			 *  Şimdilik yaptığımız işlemler aynı olduğu için kodumuz stack push ile aynı
			 *  ama sistemi daha farklı bir şekilde kullanmak isteyebilirsiniz diye parser'dan
			 *  fonksiyon parametrelerini bu şekilde çıkarttık.
			 */
			case il.pushparam:
				stack ~= current;
				IP++;
				goto start;
			/** - operatörü
			 *  Stack e yüklenen nesneden aktif nesneyi çıkart ve stackdan nesneyi sil.
			 */
			case il.sub:
				current = stack[$-1] - current;
				stack = stack[0..$-1];
				IP++;
				goto start;
			/** + operatörü
			 *  Stack e yüklenen nesneyle aktif nesneyi topla ve stackdan nesneyi sil.
			 */
			case il.add:
				current = stack[$-1] + current;
				stack = stack[0..$-1];
				IP++;
				goto start;
			/** / operatörü
			 *  Stack e yüklenen nesneyi aktif nesneye böl ve stackdan nesneyi sil.
			 */
			case il.div:
				current = stack[$-1] / current;
				stack = stack[0..$-1];
				IP++;
				goto start;
			/** * operatörü
			 *  Stack e yüklenen nesneyle aktif nesneyi çarp ve stackdan nesneyi sil.
			 */
			case il.mul:
				current = stack[$-1] * current;
				stack = stack[0..$-1];
				IP++;
				goto start;
			/** call işlevi
			 *  Çağırılacak olan fonksiyonun parametrelerini stackdan çek onları bir diziye at ve stacki boşalt.
			 *  Not : Çağırılacak olan fonksiyonun parametre sayısı il çıktısı içerisinde geliyor.
			 */
			case il.call: IP++;
				current = current(stack[$-*cast(size_t*) IP..$]);
				stack = stack[0..$-*cast(size_t*) IP];
				IP += size_t.sizeof;
				goto start;
			/** Makineyi sonlandır. */
			case il.hlt: break;
			default:
				throw new Exception("Bilinmeyen operand code %s".format(*cast(il*) IP));
		}
	}
}
{% endhighlight %}

Evet sanal makinemiz tamamlandı geriye sadece birkaç tane build-in fonksiyonu tanımlamak kaldı. Projenin bitmiş halinin kaynak kodunu bir sonraki yazıda bulabilirsiniz.