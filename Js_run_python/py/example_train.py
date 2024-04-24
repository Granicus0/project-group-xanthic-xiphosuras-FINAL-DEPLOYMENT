import sys
import time
from js_sender import JsSender # import JSSender Package


args = sys.argv[1:]  # get the args passed from json, The first arg is the path of file, which can be ignored

target_epoch = int(args[0])

# All print results will be received by the js backend and displayed in the terminal, you can set the backend to ignore these prints
# "<params_start>" and "<params_end>" should not appear in your print, because they're used to locate parameters in the JSSender
print(f"Start Train Model, Target epoch = {target_epoch}")

for current_epoch in range(1, target_epoch+1):
    time.sleep(1) #  Simulate the time required for training 1 epoch

    # JsSender.set_value(key, value) will be used to send data to the back end.
    # If the key is repeated, the previous parameter is overwritten.
    JsSender.set_value("epoch", current_epoch) 

# Gets the parameters that have been sent
JsSender.get_value("epoch", 0)

print("Train End")

# JsSender.set_auto_send(bool) This parameter is used to set whether to send the parameter to the back-end immediately after setting the parameter
# If is false, You need to send it to the back end through JsSender.send()
JsSender.set_auto_send(False)
# get current is auto or not, default value is True
JsSender.get_auto_send()
JsSender.set_value("accuracy", 0.9)
JsSender.set_value("recall", 0.7)

# Check whether a key exists
# you will get false there, because we set auto sent to false
JsSender.contains_value("recall")

# send Send all cached parameters
JsSender.send()







