from string import hexdigits, ascii_letters
from random import sample

def getRandPassword(length, useNumbers=True, useSpecialChars=True):
	# * 3 para balancear la cantidad de caracteres y que estos sean equiprobables
	numbers = hexdigits[:10] * (3 if useNumbers else 0)
	symbols = "!#$%&-_<>()=" * (3 if useSpecialChars else 0)
	charOptions = list(ascii_letters + numbers + symbols)
	return "".join(sample(charOptions, length))

def displayPasswords(passwordLength, amountOfPasswords, useNumbers, useSpecialChars):
	for _ in range(amountOfPasswords):
		print(getRandPassword(passwordLength, useNumbers, useSpecialChars))


passwordLength = 14 	#caracteres
amountOfPasswords = 10 	# cantidad de iteraciones
useNumbers = True 		# False si no querés usar números
useSpecialChars = True 	# False si no querés usar carácteres especiales

# finalmente generar las contraseñas
displayPasswords(passwordLength, amountOfPasswords, useNumbers, useSpecialChars)