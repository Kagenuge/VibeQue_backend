import io
import subprocess
import os
import time
from datetime import datetime
from PIL import Image

# Motion detection settings:
threshold = 110 #Count of changed pixels (to be registered as "changed")
sensitivity = 110
forceCapture = False
cameraSettings = ""

testWidth = 100
testHeight = 75
testAreaCount = 1
testBorders = [ [[1,testWidth],[1,testHeight]] ]

debugMode = False


def captureTestImage(settings, width, height):
    command = "raspistill %s -w %s -h %s -t 200 -e bmp -n -o -" % (settings, width, height)
    imageData = io.BytesIO()
    imageData.write(subprocess.check_output(command, shell=True))
    imageData.seek(0)
    im = Image.open(imageData)
    buffer = im.load()
    imageData.close()
    return im, buffer

def motion():

    # shoot
    image1, buffer1 = captureTestImage(cameraSettings, testWidth, testHeight)

    while (True):

        # Get comparison image
        image2, buffer2 = captureTestImage(cameraSettings, testWidth, testHeight)

        # Count changed pixels
        changedPixels = 0
        takePicture = False

        for z in range(0, testAreaCount):
            for x in range(testBorders[z][0][0]-1, testBorders[z][0][1]):
                for y in range(testBorders[z][1][0]-1, testBorders[z][1][1]):
                    pixdiff = abs(buffer1[x,y][1] - buffer2[x,y][1])
                    if pixdiff > threshold:
                        changedPixels += 1
                        if (debugMode):
                            debugim[x,y] = (0, 255, 0)
                    # Shoot, if pixels changed enough
                    if (changedPixels > sensitivity):
                        takePicture = True
        if takePicture:
            lastCapture = time.time()
            return True
        else:
            return False
        image1 = image2
        buffer1 = buffer2
