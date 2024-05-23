import base64

def encode_img(img_path):
    with open(img_path, "rb") as file:
        return base64.b64encode(file.read()).decode('utf-8')