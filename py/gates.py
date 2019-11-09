"""
NAND Truth Table | Result |
  A = 0, B = 0 | 1   
  A = 1, B = 0  | 1  
  A = 0, B = 1  | 1   
  A = 1, B = 1   | 0   
"""


def Nand(a, b):
    if a == 1 and b == 1:
        return 0
    else:
        return 1


# print(Nand(0, 0))
# print(Nand(0, 1))
# print(Nand(1, 0))
# print(Nand(1, 1))


"""
NOT Truth Table | Result |
  A = 0 | 1
  A = 1 | 0
"""


def Not(a):
    if a == 0:
        return 1
    else:
        return 0


# print(Not(0))
# print(Not(1))


"""
AND Truth Table | Result |
  a = 0, b = 0 | 0
  a = 1, b = 0 | 0
  a = 0, b = 1 | 0
  a = 1, b = 1 | 1 
"""


def And(a, b):
    if a == 1 and b == 1:
        return 1
    else:
        return 0


# print(And(0, 0))
# print(And(1, 0))
# print(And(0, 1))
# print(And(1, 1))

