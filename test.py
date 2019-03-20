def ex5():
    filename = "valores.txt"
    file = open(filename, "r")
    print("ficheiro {filename}")
    minimos = []

    line = file.readline()
    while line:
        print(line)
        numeros = line.split(";")

        minimo = min(numeros)
        minimos.append(minimo)

        line = file.readline()
    f.close()

    valor_min = min(minimos)
    print("O menor numero no ficheiro {filename} e {valor_min}")



def palavras(txt):

    isoladas = txt.split(" ")
    palavras = []
    for i in isoladas:
        palavra = []
        for j in i:
            if j.isalpha():
                palavra.append(j)
        palavras.append(''.join(palavra))

    print(palavras)
        
import math

def log(x):
    print("x    log(x)")
    print("-------------")
    for i in range(1, x):
        print("{i}  %.6f" % round(math.log(i),6))


import math

def log(x):
    file = open("tabela_logs.txt", "w")
    file.write("x    log(x)")
    file.write("-------------")
    for i in range(1, x):
        file.write("{i}  %.6f" % round(math.log(i),6))
    file.close()