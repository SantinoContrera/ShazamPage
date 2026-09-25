import os
from PIL import Image

# 1. Open nucleo1_pantalla2.png
img_path = r'references/nucleo_1/pantallas/nucleo1_pantalla2.png'
if os.path.exists(img_path):
    img = Image.open(img_path)
    width, height = img.size
    print(f"Original image size: {width}x{height}")
    
    # In nucleo1_pantalla2.png (1920x1080 or similar):
    # Dr. Avery Wang photo is in the center-left area inside the cyan rounded rectangle.
    # Let's crop relative to dimensions or exact coordinates:
    # Bounding box of photo: [xmin, ymin, xmax, ymax]
    # Let's inspect pixel values or crop region:
    # Left box X is around 29.5% to 43.5%, Y is around 30% to 54%
    crop_box = (int(width * 0.295), int(height * 0.318), int(width * 0.432), int(height * 0.575))
    cropped = img.crop(crop_box)
    
    os.makedirs('public/assets', exist_ok=True)
    cropped.save('public/assets/avery_wang.png')
    print("Saved public/assets/avery_wang.png")

# 2. Extract frames from GIF to inspect transition sequence
gif_path = r'references/nucleo_1/assets_mockups/equipo_shazam_pantalla1_nucleo1.gif'
if os.path.exists(gif_path):
    gif = Image.open(gif_path)
    frame_num = 0
    os.makedirs('scratch/gif_frames', exist_ok=True)
    try:
        while True:
            gif.seek(frame_num)
            frame = gif.convert('RGBA')
            frame.save(f'scratch/gif_frames/frame_{frame_num:02d}.png')
            frame_num += 1
    except EOFError:
        pass
    print(f"Extracted {frame_num} frames from GIF to scratch/gif_frames/")
