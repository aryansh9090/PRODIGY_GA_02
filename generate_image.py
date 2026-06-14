import argparse
import torch
from diffusers import StableDiffusionPipeline

def generate_image(prompt, output_file, model_id="runwayml/stable-diffusion-v1-5"):
    # Determine the device to use (GPU if available, otherwise CPU)
    cuda_available = torch.cuda.is_available()
    print(f"CUDA automatically detected: {cuda_available}")
    device = "cuda" if cuda_available else "cpu"
    print(f"Using device: {device}")

    print(f"Loading model '{model_id}'...")
    # Load the pipeline. 
    # Use float16 for GPU to save memory and speed up inference, float32 for CPU.
    dtype = torch.float16 if device == "cuda" else torch.float32
    
    try:
        pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=dtype)
        pipe = pipe.to(device)
    except Exception as e:
        print(f"Error loading model: {e}")
        print("Make sure you have an active internet connection and have installed the required libraries.")
        return False, str(e)

    print(f"Generating image for prompt: '{prompt}'")
    
    # Generate the image
    # Note: For CPU generation, this might take a few minutes
    try:
        image = pipe(prompt).images[0]
    except Exception as e:
        print(f"Error generating image: {e}")
        return False, str(e)

    # Save the image
    print(f"Saving image to '{output_file}'...")
    try:
        image.save(output_file)
        print("Done!")
        return True, "Success"
    except Exception as e:
        print(f"Error saving image: {e}")
        return False, str(e)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate an image using Stable Diffusion.")
    parser.add_argument("--prompt", type=str, required=True, help="Text prompt for image generation")
    parser.add_argument("--output", type=str, default="output.png", help="Output file name (e.g., output.png)")
    parser.add_argument("--model", type=str, default="runwayml/stable-diffusion-v1-5", help="Hugging Face model ID to use")
    
    args = parser.parse_args()
    
    generate_image(args.prompt, args.output, args.model)
