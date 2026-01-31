import os
import requests
import json
import base64
from dotenv import load_dotenv

load_dotenv()

def test_imagen_api():
    api_key = os.getenv("GEMINI_API_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key={api_key}"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    payload = {
        "instances": [
            {
                "prompt": "A sunset in the mountains, 16:9 aspect ratio"
            }
        ],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": "16:9"
        }
    }
    
    print(f"Calling endpoint: {url}")
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    
    if response.status_code == 200:
        print("Success!")
        data = response.json()
        if 'predictions' in data:
            for i, pred in enumerate(data['predictions']):
                image_data = base64.b64decode(pred['bytesBase64Encoded'])
                filename = f"test_image_{i}.png"
                with open(filename, "wb") as f:
                    f.write(image_data)
                print(f"Saved {filename}")
        else:
            print("No predictions in response.")
            print(data)
    else:
        print(f"Error {response.status_code}: {response.text}")

if __name__ == "__main__":
    test_imagen_api()
