---
layout: post
title:  "Programlama Dilleri - Kendi Dilini Tasarla"
date:   2014-02-05
category: Kendi-Dilini-Tasarla
redirect_from: "/programlama-dilleri-karsilastirmasi"
---

Bilgisayarınızda çalışan her bir yazılım oyun veya cep telefonunuzda çalışan her bir uygulama aslında bir programlama dili ile yazılmış ortaya konmuştur. Bilgisayarın işlemcisi tarafından çalıştırılmak üzere bir takım kod parçaları yazılır. İşlemci yazılan bu kodları anlar ve çalıştırır. Bu kodları yazabilmek için ise binlerce hatta daha da fazla programlama dili yapılmış ve halen daha yapılmaya devam ediliyor.

Bu kadar çok programlama dilinin olmasının ise birden fazla sebebi var. Kimisinin yapılış amacı farklı yazdığım Rhodeus Script gibi sadece web'i hedef alırken kimi programlama dilleri yapay zekayı kimileri ise masaüstü programlamayı, sistem programlamayı hedef alıyor.

Aynı amaç için yapılmış olsa dahi bir çok farklı programlama dili var. Bunların yapılma amacı ise programı yazacak kişiye kolaylık sunmak, daha geniş imkanlar sunmak veya daha kısa sürede istenilene ulaşmayı sağlamak amacıyla yapılmışlardır.

Aslında bilgisayar işlemcisi sadece tek 1 dilden anlar. Makine kodu. Tabi bir insanın makine kodunu anlaması ve makine kodu yazması oldukça zor ve o makine kodunda istediğini bulması zor olduğu için Assembly adında bir çevirici dil yada diğer tabiriyle ara gösterim dili ortaya çıkmıştır. Makine kodu ve Assembly'e biraz daha yakından bakalım. Aşağıda evlerimizde kullandığımız intel işlemcilerin anladığı komut dizileri(instructions) yani makine komutları bulunmaktadır.

55 31 D2 89 E5 8B 45 08 56 8B 75 0C 53 8D 58 FF 0F B6 0C 16 88 4C 13 01 83 C2 01 84 C9 75 F1 5B 5E 5D C3

Bu anlamsız gelen komut dizisini biraz daha anlamlı hale getiren Assembly gösterimi

{% highlight objdump %}
.data:0x00000000	55          push ebp	 
.data:0x00000001	31d2	    xor edx,edx	 
.data:0x00000003	89e5        mov ebp,esp	 
.data:0x00000005	8b4508      mov eax,DWORD PTR [ebp+0x8]	 
.data:0x00000008	56          push esi	 
.data:0x00000009	8b750c      mov  esi,DWORD PTR [ebp+0xc]	
.data:0x0000000c	53          push ebx	 
.data:0x0000000d	8d58ff      lea ebx,[eax-0x1]	
.data:0x00000010	 	 	 
.data:0x00000010	loc_00000010:	 
.data:0x00000010	0fb60c16	movzx ecx,BYTE PTR [esi+edx*1]	
.data:0x00000014	884c1301	mov BYTE PTR [ebx+edx*1+0x1],cl	
.data:0x00000018	83c201	    add edx,0x1	
.data:0x0000001b	84c9	    test cl,cl	
.data:0x0000001d	75f1	    jne loc_00000010	 
.data:0x0000001f	5b	        pop ebx	 
.data:0x00000020	5e	        pop esi	 
.data:0x00000021	5d	        pop ebp	 
.data:0x00000022	c3	        ret
{% endhighlight %}

Yukarıda da gördüğünüz üzere Assembly dili sadece makine kodunun biraz daha anlamlı hali. Ama baktığınızda halen daha kodlar karışık veya bir işi yapmak için çok fazla kod yazımı yapmak gerekiyor işte bu noktada C, C++, D, python gibi yüksek seviye programlama dilleri yapılmış ve programlama "az kod çok iş" diyebileceğimiz bir kıvama gelmiş.

Bir sonraki yazımda programlama dillerini biraz daha yakından inceleyeceğiz.