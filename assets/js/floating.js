$(function(){
    $('#floating_notation').val(encFloat("0.15625"));
})
$('#number_notation').on('input', function(){
    $('#floating_notation').val(encFloat($(this).val()));
});
$('#floating_notation').on('input', function(){
	var str = $(this).val().replace(' ', '');
	var byteArray = packBytes(str);
	var num = decodeFloat(byteArray);
    $('#number_notation').val(num);
});

function packBytes(str) {
	var BYTE_WID = 8;
	while(str.length<BYTE_WID*4)				// must be length of a float, 32 bit
		str += "0";
		
	var byteArray = [0,0,0,0];
	var i;
	for(i=0; i<4; i++) {
		var mask = 0x80;
		for(var j=0; j<BYTE_WID; j++) {
			var index = i*BYTE_WID+j;
			var char = str.substring(index, index+1);
			if('1' == char)
				byteArray[i] += mask;			
			mask >>= 1;
		}
	}
	return byteArray;
}

function decodeFloat(byteArray) {
	var sign = parseSign(byteArray);
	var exponent = parseExponent(byteArray);
	var mantissa = parseSignificand(byteArray);
	var num = sign * exponent * mantissa;
	return num;
};

function parseSign(byteArray) {
	if(byteArray[0]&0x80)
		return -1;
	return 1;
}

function parseExponent(byteArray) {
	var ex = (byteArray[0] & 0x7F);
	ex = ex << 1;
	
	if(0!=(byteArray[1] & 0x80))
		ex += 0x01;
	
	ex = Math.pow(2, ex-127);
	return ex;
}

function parseSignificand(byteArray) {
	var num=0;
	var bit;
	var mask = 0x40;
	for(var i=1; i<8; i++) {
		if(0!=(byteArray[1]&mask)) 
			num += 1 / Math.pow(2, i);
		mask = mask >> 1;
	}
	mask = 0x80;
	for(var j=0; j<8; j++) {
		if(0!=(byteArray[2]&mask))
			num += 1 / Math.pow(2, j+8);
		mask = mask >> 1;
	}
	mask = 0x80;
	for(var k=0; k<8; k++) {
		if(0!=(byteArray[2]&mask))
			num += 1 / Math.pow(2, k+16);
		mask = mask >> 1;
	}
	return (num+1);
}


function dec2bin(dec){
    return (dec >>> 0).toString(2);
}
function encodeFloat(number) {
    var n = +number,
        status = (n !== n) || n == -Infinity || n == +Infinity ? n : 0,
        exp = 0,
        len = 281, // 2 * 127 + 1 + 23 + 3,
        bin = new Array(len),
        signal = (n = status !== 0 ? 0 : n) < 0,
        n = Math.abs(n),
        intPart = Math.floor(n),
        floatPart = n - intPart,
        i, lastBit, rounded, j, exponent;

    if (status !== 0) {
        if (n !== n) {
            return 0x7fc00000;
        }
        if (n === Infinity) {
            return 0x7f800000;
        }
        if (n === -Infinity) {
            return 0xff800000
        }
    }

    i = len;
    while (i) {
        bin[--i] = 0;
    }

    i = 129;
    while (intPart && i) {
        bin[--i] = intPart % 2;
        intPart = Math.floor(intPart / 2);
    }

    i = 128;
    while (floatPart > 0 && i) {
        (bin[++i] = ((floatPart *= 2) >= 1) - 0) && --floatPart;
    }

    i = -1;
    while (++i < len && !bin[i]);

    if (bin[(lastBit = 22 + (i = (exp = 128 - i) >= -126 && exp <= 127 ? i + 1 : 128 - (exp = -127))) + 1]) {
        if (!(rounded = bin[lastBit])) {
            j = lastBit + 2;
            while (!rounded && j < len) {
                rounded = bin[j++];
            }
        }

        j = lastBit + 1;
        while (rounded && --j >= 0) {
            (bin[j] = !bin[j] - 0) && (rounded = 0);
        }
    }
    i = i - 2 < 0 ? -1 : i - 3;
    while(++i < len && !bin[i]);
    (exp = 128 - i) >= -126 && exp <= 127 ? ++i : exp < -126 && (i = 255, exp = -127);
    (intPart || status !== 0) && (exp = 128, i = 129, status == -Infinity ? signal = 1 : (status !== status) && (bin[i] = 1));

    n = Math.abs(exp + 127);
    exponent = 0;
    j = 0;
    while (j < 8) {
        exponent += (n % 2) << j;
        n >>= 1;
        j++;
    }

    var mantissa = 0;
    n = i + 23;
    for (; i < n; i++) {
        mantissa = (mantissa << 1) + bin[i];
    }
    return ((signal ? 0x80000000 : 0) + (exponent << 23) + mantissa) | 0;
}
function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

function encFloat(f){
   f = zeroFill(dec2bin(encodeFloat(f)), 32);
   return f.slice(0, 1) + ' '  + f.slice(1, 9) + ' ' + f.slice(9)
}