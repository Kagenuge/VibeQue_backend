import P3picam
import requests
import json

motionState = False

while True:
    motionState = P3picam.motion()
    print(motionState)
    res = requests.post('http://localhost:3000/api/motiondetected', json={"motion": motionState})
    if res:
        print('Response ok')
    else:
        print('Response failed')