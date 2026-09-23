import urllib.request

urls = [
    ("strike_jpg", "https://coderamry-strike-courses-assets.s3.ap-south-1.amazonaws.com/strike/Strike.jpg"),
    ("b732", "https://dolia18uq98lp.cloudfront.net/course/b73233cf-f7cd-4515-a1e1-0a60c6804dc0.png"),
    ("bf84", "https://dolia18uq98lp.cloudfront.net/course/bf84ce20-9e40-40ef-91e0-e1c1170f4c59.jpg"),
    ("8281", "https://dolia18uq98lp.cloudfront.net/course/82819fa0-24a9-4ee0-aae1-74e6923f3f9d.jpg"),
    ("sale_icon", "https://dolia18uq98lp.cloudfront.net/sale-icons/7ebc7314-dcfe-4e82-a2cb-677df6f9c57e.jpg"),
    ("thunder_api", "https://dolia18uq98lp.cloudfront.net/course/531a395f-8950-49e0-906a-49273b3ea867.png")
]

for name, url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            print(f"{name}: SUCCESS (status {resp.status}, size {len(resp.read())})")
    except Exception as e:
        print(f"{name}: FAILED ({e})")
