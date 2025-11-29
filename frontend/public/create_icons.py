#!/usr/bin/env python3
"""
Skrypt do tworzenia prostych ikon PWA dla ST KRAKOS
Wymaga: pip install Pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    
    # Kolory
    BG_COLOR = (10, 14, 39)  # #0a0e27
    TEXT_COLOR = (255, 215, 0)  # #FFD700
    
    def create_icon(size, filename):
        """Tworzy ikonę o podanym rozmiarze"""
        img = Image.new('RGB', (size, size), BG_COLOR)
        draw = ImageDraw.Draw(img)
        
        # Próba użycia fontu systemowego
        try:
            font_large = ImageFont.truetype("arial.ttf", size // 4)
            font_small = ImageFont.truetype("arial.ttf", size // 8)
        except:
            try:
                font_large = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", size // 4)
                font_small = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", size // 8)
            except:
                font_large = ImageFont.load_default()
                font_small = ImageFont.load_default()
        
        # Tekst "ST"
        text_st = "ST"
        bbox_st = draw.textbbox((0, 0), text_st, font=font_large)
        text_width_st = bbox_st[2] - bbox_st[0]
        text_height_st = bbox_st[3] - bbox_st[1]
        x_st = (size - text_width_st) // 2
        y_st = size // 3 - text_height_st // 2
        draw.text((x_st, y_st), text_st, fill=TEXT_COLOR, font=font_large)
        
        # Tekst "KRAKOS"
        text_krakos = "KRAKOS"
        bbox_krakos = draw.textbbox((0, 0), text_krakos, font=font_small)
        text_width_krakos = bbox_krakos[2] - bbox_krakos[0]
        text_height_krakos = bbox_krakos[3] - bbox_krakos[1]
        x_krakos = (size - text_width_krakos) // 2
        y_krakos = size * 2 // 3 - text_height_krakos // 2
        draw.text((x_krakos, y_krakos), text_krakos, fill=TEXT_COLOR, font=font_small)
        
        # Zapis
        img.save(filename, 'PNG')
        print(f"Utworzono: {filename} ({size}x{size}px)")
    
    # Utworzenie ikon
    create_icon(192, 'icon-192x192.png')
    create_icon(512, 'icon-512x512.png')
    
    print("\n✅ Ikony PWA zostały utworzone pomyślnie!")
    print("Pliki:")
    print("  - icon-192x192.png")
    print("  - icon-512x512.png")
    
except ImportError:
    print("❌ Błąd: Brak biblioteki Pillow")
    print("Zainstaluj: pip install Pillow")
    print("\nAlternatywnie, użyj generatora online:")
    print("  https://realfavicongenerator.net/")
    print("  lub")
    print("  https://cloudconvert.com/svg-to-png")
    print("\nWgraj plik icon.svg i wygeneruj ikony w rozmiarach 192x192 i 512x512")
except Exception as e:
    print(f"❌ Błąd: {e}")
    print("\nAlternatywnie, użyj generatora online:")
    print("  https://realfavicongenerator.net/")

