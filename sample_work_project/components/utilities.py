import os
import re
def clear():
    # For Windows
    if os.name == 'nt':
        _ = os.system('cls')
    # For Linux and macOS (Unix-like systems)
    else:
        _ = os.system('clear')

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def camel_to_snake_case(string):
    res_list = [s.lower().replace("_", "") for s in re.split("([A-Z][^A-Z]*)", string) if s]
    return "_".join(res_list)