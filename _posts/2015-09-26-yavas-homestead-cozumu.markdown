---
layout: post
title:  "Laravel Yavaş Homestead Çözümü"
date:   2015-09-26
categories: 
  - PHP
  - Laravel
redirect_from: "/yavas-homestead-cozumu"
---

Laravel Homestead kullananların en büyük sıkıntısı sitenin oldukça yavaş çalışması. Bunun sebebi ise dosyaların paylaşımlı olması ve sunucunun bu dosyalara erişmeye çalışırken oldukça zaman kaybetmesi. 

NFS özelliğini aşağıdaki gibi Homestead.yaml dosyası üzerinde type:"nfs" özelliğini tanımlayarak aktif edebilirsiniz.

~~~
folders:
    - map: ~/Desktop/sites
      to: /home/vagrant/sites
      type: "nfs"
~~~

### Windows üzerinde NFS

Windows işletim sisteminin sadece PRO sürümünde NFS özelliği var. Bu yüzden NFS özelliği vagrant'da Windows kullanıcıları için devre dışı. (bkz https://docs.vagrantup.com/v2/synced-folders/nfs.html)

> Windows users: NFS folders do not work on Windows hosts. Vagrant will ignore your request for NFS synced folders on Windows.

Fakat Vagrant plugin'i olan [WinNFS](https://github.com/winnfsd/vagrant-winnfsd)'yi kullanarak bilgisayara bir NFS sunucusu kurabiliyoruz.

Bunun için;

~~~
$ vagrant plugin install vagrant-winnfsd
~~~

GIT Bash üzerinde veya CMD üzerinde yukarıdaki komutu çalıştırarak eklentiyi yükleyin.

Sonrasında Homestead/scripts/homestead.rb içerisinde

~~~
mount_opts = folder["mount_opts"] ? folder["mount_opts"] : ['actimeo=1']
~~~

satırını bulun ve **actimeo=1** ifadesini aşağıdaki gibi **nolock,vers=3,udp** şeklinde değiştirin.

~~~
mount_opts = folder["mount_opts"] ? folder["mount_opts"] : ['nolock,vers=3,udp']
~~~

Windows 8 üzeri işletim sistemine sahipseniz winnfds.exe üzerinde uyumluluk ayarını yapmanız gerekecektir.

~~~
C:\Users\KULLANICI\.vagrant.d\gems\gems\vagrant-winnfsd-1.1.0\bin
~~~

winnfds.exe dosyasının uyumluluk ayarını Windows 8 olacak şekilde ayarlayın.

### İşlem Sonucu

Yukarıdaki işlemleri yaptıktan sonra sitenin hızında aşağıdaki gibi gözle görülür bir artış yakalayacaksınız. NFS'yi aktif etmeden önce boş bir laravel projesi için bile sayfa yüklenme süresi 100ms sürerken artık aşağıdaki gibi 20ms'e kadar düşmüştür.

![Sonuç](/assets/article_images/2015-09-26-yavas-homestead-cozumu/sonuc.png)

----
**Not:** GIT Bash'i yönetici olarak başlatmanız gerekebilir.