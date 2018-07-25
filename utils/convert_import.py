import re
import ast
import io
import os.path
import os
from pathlib import Path
import json
import sys

NODE_MODULE_PATH = r'C:\Users\Xuming\git\material-ui-molecule\jslib'

all_files = set()

def literal_eval(str):
    for i in range(len(str), 0, -1):
        try:
            return (ast.literal_eval(str[0:i]), str[i:])
        except:
            pass
    raise ValueError('%s cannot be recognized as string' % str)


def parse_package(dir: Path):
    package_file = Path(dir, 'package.json')
    if package_file.exists():
        s = package_file.read_text('utf-8')
        package = json.loads(s)
        main = package.get('main')
        if main:
            if Path(dir, main).exists():
                return main
            else:
                pass
        else:
            pass
    else:
        if Path(dir, 'index.js').exists():
            return 'index.js'

def filename_repl(base_dir, matchobj, related_files):
    filename : str = matchobj.group(3)
    filename = filename.strip()
    filename, res = literal_eval(filename)
    is_relative = False    
    if filename.startswith('./') or filename.startswith('../'):    # relative
       is_relative = True    
        
    if filename.endswith('.js'):
        return matchobj.string

    if is_relative:    
        file = Path(base_dir, filename + '.js')
        if file.exists() and file.is_file():
            related_files.append(str(file.resolve()))
            return matchobj.group(1) + json.dumps(filename + '.js') + res
        else:
            file = Path(base_dir, filename)
            if file.exists() and file.is_dir():
                main = parse_package(file)
                if main:
                    if not filename.endswith('/'):
                        filename = filename + '/'
                    related_files.append(str(Path(file, main).resolve()))
                    return matchobj.group(1) + json.dumps(filename + main) + res
                else:
                    raise FileNotFoundError('ERROR: ' + filename + ' is unknown')
            else:
                raise FileNotFoundError('ERROR: ' + filename + ' is unknown')
    else:
        file = Path(NODE_MODULE_PATH, filename + '.js')
        if file.exists() and file.is_file():
            related_files.append(str(file.resolve()))
            return matchobj.group(1) + "NODE_MODULE_PATH + " + json.dumps(filename + '.js') + res
        else:            
            file = Path(NODE_MODULE_PATH, filename)
            if file.exists() and file.is_dir():
                main = parse_package(file)
                if main:
                    if not filename.endswith('/'):
                        filename = filename + '/'
                    related_files.append(str(Path(file, main).resolve()))
                    return matchobj.group(1) + "NODE_MODULE_PATH + " + json.dumps(filename + main) + res
                else:
                    raise FileNotFoundError('ERROR: ' + filename + ' is unknown')
            else:
                raise FileNotFoundError('ERROR: ' + filename + ' is unknown')
                return matchobj.string.strip()

# s = re.sub(r'(import.+from\s+)(.*)',
#         dashrepl,
#         "import * as colors from './colors'")
# print(s)

def _process_file(input_file):
    print('PROCESS ' + input_file)

    re_import = re.compile(r'((import|export).+from\s+)(.*)')

    file = io.FileIO(input_file, 'r+')
    lines = []
    related_files = []
    base_dir = os.path.dirname(input_file)
    for line in file.readlines():
        line = line.decode('utf-8')
        lines.append(re_import.sub(lambda match: filename_repl(base_dir, match, related_files), line))

    # file.write(''.join(lines).encode('utf-8'))
    # file.flush()
    # file.close()

    if related_files:
        for file in related_files:
            if not file in all_files:
                all_files.add(file)
                _process_file(file)

# input_file = r'C:\Users\Xuming\git\material-ui-molecule\jslib\@material-ui\index.js'
# input_file = r'C:\Users\Xuming\git\material-ui-molecule\jslib\@material-ui\ButtonBase\ButtonBase.js'
input_file = r'C:\Users\Xuming\git\material-ui-molecule\jslib\@material-ui\\'
#input_file = r'C:\Users\Xuming\git\material-ui-molecule\jslib\\'
#process_file = sys.argv[1]
input_file = os.path.realpath(os.path.join(os.curdir, input_file))

if os.path.isdir(input_file):
    base_dir = input_file
    for root, dirs, files in os.walk(base_dir):
        for filename in files:
            fn : str = filename
            if fn.lower().endswith('.js'):
                _process_file(os.path.join(root, filename))
else:
    _process_file(input_file)
