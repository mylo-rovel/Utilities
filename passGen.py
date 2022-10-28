from string import hexdigits, ascii_letters
from random import sample

def getRandPassword(length):
	numbers = hexdigits[:10]*3
	symbols = "!#$%&-_<>()="*3
	charOptions = list(ascii_letters+numbers+symbols)
	return "".join(sample(charOptions, length))


for i in range(10):
	print(getRandPassword(14))
