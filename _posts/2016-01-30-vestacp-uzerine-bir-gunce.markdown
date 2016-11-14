---
layout: post
title:  "VestaCP Üzerine Bir Günce"
date:   2016-01-30
categories:
  - Sunucu
redirect_from: "/vestacp-uzerine-bir-gunce"
---

Sunucuyu php-7 ye yükseltme denemem başarısız olduktan sonra sunucuyu baştan kurmaya karar verdim. Fakat bir türlü NS ayarlamasını yapamadım. Defalarca denemeden sonra hatanın sadece Ubuntu da olduğunu fark ettim. CentOS denedim fakat VestaCP CentOS üzerinde oldukça verimsiz çalışıyor.
Bunun üzerine Debian'a geçiş yaptım ve şu anda sorunsuz bir şekilde çalışıyor.

### Güle güle Apache Hoşgeldin Nginx

Eski kurulumda apache ve nginx arasında reverse-proxy vardı. 

Şimdi ise apache artık tamamen ortadan kalktı. Php5-fpm ve nginx ile tek başlarına çalışıyor. Bu sayede daha fazla performans alıyorum ve **setTrustedProxies** gibi işlemlerle uğraşmaya gerek kalmadı.

### SFTP Chroot ile güvenli FTP Bağlantısı

Ek olarak *SFTP Chroot* paralı eklentisini (18$ ömür boyu kullanım lisansı) satın aldım.
21 portu üzerinden yapılan ftp bağlantıları güvenli değildir. MITM, ARP Poisining gibi tekniklerle şifreyi görebilmek mümkün bunun yerine 22 portu üzerinden açılan sftp bağlantısı ile şifreler bir başkası tarafından yakalanamaz ve eklenti sayesinde kullanıcı sadece kendisine izin verilen dosya ve klasörlere göz atabilme yetkisine sahip oluyor. Kısaca güvenli ftp bağlantısı için oldukça kullanışlı bir eklenti.

### Timezone Seçeneği

Ayrıca yeni sürümünde gözüme çarpan detay ayarlar kısmında zaman dilimi seçmemize olanak sağlaması.

### Ücretsiz SSL

İnternet sitelerime ve sunucuma letsencrypt ile ücretsiz SSL kurdum.

Bu işlem için takip ettiğim adımlar

~~~
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
sudo apt-get install build-essential libssl-dev libffi-dev python-dev python-pip
pip install -U cffi
pip install cryptography --upgrade
./letsencrypt-auto --help
./letsencrypt-auto certonly --standalone -d rhodeus.org -d www.rhodeus.org
~~~