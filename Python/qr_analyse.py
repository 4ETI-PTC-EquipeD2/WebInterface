import cv2
from pyzbar.pyzbar import decode

# Initialiser la caméra
cap = cv2.VideoCapture(0)
cap.set(3, 640) # set width
cap.set(4, 480) # set height

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Nos opérations sur le cadre viennent ici
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    codes = decode(gray)

    for code in codes:
        x, y, w, h = code.rect
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        code_data = code.data.decode('utf-8')
        cv2.putText(frame, code_data, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0,255,0), 2)

        print(f"QR Code Detected: {code_data}")

    # Affichage du cadre résultant
    cv2.imshow('frame', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Lorsque tout est fait, libérez la capture
cap.release()
cv2.destroyAllWindows()