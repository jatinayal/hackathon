import urllib.request
import os

images_dir = r"c:\Thunder\hackathon\src\assets\images"
os.makedirs(images_dir, exist_ok=True)

urls = {
    "thunder_banner.png": "https://dolia18uq98lp.cloudfront.net/course/531a395f-8950-49e0-906a-49273b3ea867.png",
    "course_badge.png": "https://dolia18uq98lp.cloudfront.net/course/b73233cf-f7cd-4515-a1e1-0a60c6804dc0.png",
    "rohit_negi.jpg": "https://dolia18uq98lp.cloudfront.net/course/bf84ce20-9e40-40ef-91e0-e1c1170f4c59.jpg",
    "aditya_tandon.jpg": "https://dolia18uq98lp.cloudfront.net/course/82819fa0-24a9-4ee0-aae1-74e6923f3f9d.jpg",
    "sale_icon.jpg": "https://dolia18uq98lp.cloudfront.net/sale-icons/7ebc7314-dcfe-4e82-a2cb-677df6f9c57e.jpg",
}

for filename, url in urls.items():
    dest = os.path.join(images_dir, filename)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded {filename} successfully ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
