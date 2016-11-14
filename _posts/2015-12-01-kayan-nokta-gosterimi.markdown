---
layout: post
title:  "Kayan Nokta Gösterimi (Floating Point)"
date:   2015-12-01
categories: 
  - PHP
  - Laravel
customjs:
  - /assets/js/floating.js
redirect_from: "/floating-point-notation"
---

Bilgisayar biliminde **0.15625** gibi ondalıklı sayılar IEEE 754 standardına göre ikili(binary) olarak kodlanır. Bu gösterimde 32 bitlik bir alan 3 parçadan oluşur ve her parçanın bit alanı aşağıdaki gibidir.

![Kayan Nokta Gösterimi](/assets/article_images/2015-12-01-kayan-nokta-gosterimi/floating-point-notation.png)

#### İşaret (Sign)

Artı sayılar için 0. Eksi sayılar için 1 değerini alır.

#### Üst (Exponent)

Excess-Notation ile sayının üstel kısmı kodlanır. Sapma payı (bias) olarak **2^8 - 1** kabul edilir. Üstel sayıya 127 eklenir ve ikili olarak kodlanır.


| Üstel Kısım  	| Sapmayla Birlikte 	|     İkili(Binary) 	|
|-------------	|:------:	|---------:	|
| +1          	|   128  	| 10000000 	|
| +10         	|   137  	| 10001001 	|
| 0           	|   127  	| 01111111 	|
| -3           	|   124  	| 01111100 	|


<br />

### Kesir ya da Büyüklük (Fraction, Mantissa)

Kesirli ifadenin büyüklüğü kodlanır.

0.15625 ondalıklı sayısını binary olarak kodlarsak eğer;

1. 0.15625 = 0 \* 0.5 + 0 \* 0.25 + 1 \* 0.125 + 0 \* 0.0625 + 1 \* 0.03125
2. binary olarak kodladığımızda 0.00101
3. sayıyı kaydırdığımızda ise 1.01 x 2^-3 elde ederiz.
4. fraction 01 olur
5. exponent alanını 127 sapma (bias) eklenir. (-3 + 127 = 124)
6. exponent 01111100 olur
7. sayı artı sayı olduğu için sign 0 olur
8. birleşiminde: 1 01111100 01000000000000000000000

<div id="tools" class="row">
    <label>Sayı</label>
    <input value="0.15625" name="number" type="number" id="number_notation" class="form-control" ><br />
    <label>İkili Gösterimi (Binary Notation)</label>
    <input name="binary" type="text" id="floating_notation" class="form-control" ><br />
</div>