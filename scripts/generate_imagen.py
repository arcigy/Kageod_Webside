import sys
import os
import argparse
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def generate_image(prompt, output_path, aspect_ratio="16:9"):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not found in .env file.")
        sys.exit(1)

    genai.configure(api_key=api_key)

    # Use the special preview model found in the user's account
    model_name = 'models/nano-banana-pro-preview'
    
    print(f"Using model: {model_name}")
    print(f"Generating image with prompt: {prompt}")
    print(f"Requested Aspect Ratio: {aspect_ratio}")

    # For multimodal models that generate images, we often just put the ratio in the prompt
    full_prompt = f"{prompt}. Aspect ratio {aspect_ratio}. 4K high resolution, cinematic quality."

    try:
        model = genai.GenerativeModel(model_name)
        
        # Some models might support specific generation configs for images
        # but based on our test, generate_content returns the image in parts
        response = model.generate_content(full_prompt)

        image_data = None
        for part in response.candidates[0].content.parts:
            if part.inline_data:
                image_data = part.inline_data.data
                break
        
        if image_data:
            with open(output_path, "wb") as f:
                f.write(image_data)
            print(f"Image successfully saved to: {output_path}")
        else:
            print("Error: No image data (inline_data) found in response.")
            # If it returned text instead of an image
            if response.text:
                print(f"Model returned text instead: {response.text}")
            sys.exit(1)

    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate 4K images using the Nano Banana Pro API.")
    parser.add_argument("prompt", help="The text prompt for image generation.")
    parser.add_argument("output", help="The output file path.")
    parser.add_argument("--ratio", default="16:9", help="The aspect ratio (default 16:9).")

    args = parser.parse_args()

    # Ensure the output directory exists
    os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)

    generate_image(args.prompt, args.output, args.ratio)
