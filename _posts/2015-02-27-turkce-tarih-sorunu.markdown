---
layout: post
title:  "PHP'de Türkçe Tarih Sorunu"
date:   2015-02-27
category: PHP
redirect_from: "/turkce-tarih-sorunu"
---
DigitalOcean gibi yabancı firmalardan alınan cloud/vps gibi hizmetlerde işletim sisteminde Türkçe locale bulunmayabiliyor.

Bu da PHP'de **Friday 27 February 2015** gibi İngilizce tarih almamıza neden olur.

PHP'de setLocale yapsak bile sonuç değişmeyecektir.

~~~
setlocale(LC_ALL,'tr_TR.utf8');
~~~

Sunucuzda aşağıdaki komutu çalıştırarak mevcut dilleri görebilirsiniz.

~~~
locale -a
~~~

Aşağıdakine benzer bir çıktı verecektir ve içerisinde tr_TR locale i bulunmamaktadır.

~~~
root@rhodeus:~# locale -a
C
C.UTF-8
en_AG
en_AG.utf8
en_AU.utf8
en_BW.utf8
en_CA.utf8
en_DK.utf8
en_GB.utf8
en_HK.utf8
en_IE.utf8
en_IN
en_IN.utf8
en_NG
en_NG.utf8
en_NZ.utf8
en_PH.utf8
en_SG.utf8
en_US.utf8
en_ZA.utf8
en_ZM
en_ZM.utf8
en_ZW.utf8
POSIX
~~~

Sisteme tr_TR'yi **locale-gen tr_TR.UTF-8** komutu ile yüklediğimizde aşağıdaki gibi bir mesaj alacağız. [^1]

~~~
root@rhodeus:~# sudo locale-gen tr_TR.UTF-8
Generating locales...
  tr_TR.UTF-8... done
Generation complete.
~~~

PHP içerisinde aşağıdaki kodu çalıştırdığınızda *Cuma 27 Şubat 2015* şeklinde tarihi Türkçe olarak alacağız.[^2]

{% highlight php %}
setlocale(LC_ALL, 'tr_TR.utf8');
strftime("%A %d %B %Y", mktime(0));
{% endhighlight %}

Bu işlemlerden sonra hâlâ sonuç alamıyorsanız sunucuyu yeniden başlatın.

[^1]: İşletim sisteminize göre yükleyeceğiniz locale değişebilir. tr_TR yerine tr-TR veya daha farklı varyasyonlarda bulunabilir.
[^2]:   tr_TR.UTF-8 olarak yüklememize rağmen tr_TR.utf8 şeklinde sisteme tanımlandı. Yüklemeden sonra *locale -a* komutunu tekrar çalıştırıp kontrol ediniz.