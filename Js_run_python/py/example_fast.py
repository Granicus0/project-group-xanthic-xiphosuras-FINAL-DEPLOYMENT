import sys
import time
from js_sender import JsSender # import JSSender Package


args = JsSender.get_input_args()
A = args[0]
B = args[1]
JsSender.set_value("result", A+B)




