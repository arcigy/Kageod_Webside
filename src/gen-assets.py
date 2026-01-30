import os
import sys
import argparse
from datetime import datetime
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv("C:/Dev/ClientDeck/.env")

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("❌ CHYBA: Nenašiel som GEMINI_API_KEY")
    sys.exit(1)

parser = argparse.ArgumentParser()
parser.add_argument('prompt', type=str)
parser.add_argument('output', type=str)
args = parser.parse_args()

print(f"🎨 Generujem: {args.output}")

try:
    client = genai.Client(api_key=API_KEY)
    response = client.models.generate_images(
        model='imagen-4.0-generate-001',
        prompt=args.prompt,
        config=types.GenerateImagesConfig(
            number_of_images=1,
            aspect_ratio="1:1" if "logo" in args.output else "16:9",
            safety_filter_level="BLOCK_LOW_AND_ABOVE",
        )
    )

    if response.generated_images:
        image = response.generated_images[0]
        os.makedirs(os.path.dirname(args.output), exist_ok=True)
        image.image.save(args.output)
        print(f"✅ OK: {args.output}")
    else:
        print("⚠️ Žiadny obrázok.")

except Exception as e:
    print(f"❌ Chyba: {e}") 
