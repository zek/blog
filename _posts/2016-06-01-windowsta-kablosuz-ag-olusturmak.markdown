---
layout: post
title:  "Windows'ta Kablosuz Ağ Oluşturmak"
date:   2016-06-01
categories:
  - Windows
redirect_from: "/windowsta-kablosuz-ag-olusturmak"
---

Program kurmadan aşağıdaki kodu yönetici iznine sahip cmd üzerinden çalıştırarak wifi ağı açmak mümkün.

~~~
netsh wlan start hostednetwork
~~~

Bu kodu çalıştırmadan önce açacağınız wifi ağına parola vermek isterseniz herhalde :)

~~~
netsh wlan set hostednetwork mode=allow ssid=WIRELESSADI key=PAROLA
~~~

Sonrasında isterseniz kablolu ağınızdaki interneti bu kablosuz ağınıza bağlamanız mümkün. Hatta bilgisayarınızı kablosuz ağınızı genişletmek için de kullanabilirsiniz. Bir kablosuz ağa bağlıyken bir kablosuz ağ yayını yapabilirsiniz.