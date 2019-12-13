import P3picam
import requests
import json
from subprocess import Popen, check_call
import webbrowser
import time
import sys
import os

motionState = False

while True:
    motionState = P3picam.motion()
    print(motionState)
    res = requests.post('http://localhost:3000/api/motiondetected', json={"motion": motionState})
    if res:
        print('Response ok')
        print(res)
    else:
        print('Response failed')
    
    if res.status_code != 200:
#        print(json.loads(res))
        resjson = json.loads(res.content)
        link = resjson['link']
        print(link)
        tab = webbrowser.open(link)
        time.sleep(30)
        os.system("pkill chromium")