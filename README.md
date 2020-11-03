# image-tag
image-tag is an image management service.

Upload images and tag images so that they can be served up through url's.

Tags can be updated so that they point to new images, making it easy to 
update images without having to rebuild or redeploy frontends.

In addition to pointing to local server files, tags can also point to external links to images.

## How to run image-tag
1. docker-compose build
2. docker-compose up

### Image store
Images are stored within the image-tag container at '/media/image-tag/images'. 

They can also be accessed on the host machine at the 'images' folder under root folder.

If you want to store the images at a different folder on your host machine, you will need to modify the docker-compose.yaml file.

Under the image-tag server, you will find './images:/media/image-tag/images'. To change the directory to store images, change the relative path to the **left** of the colon, **do not** change anything to the **right** of the colon.

## Making requests
The image-tag API has one main endpoint:

* /image
   * POST: 
      * Body: The POST body accepts 'Content-Type': 'multipart/form-data' and expects the following fields to be defined:
         1. "type": Either "file" (mapping tag to file) or "link" (mapping tag to external link)
         2. "image": If type was
            * "file": This should be an image file
            * "link": This should be a link (string)
         3. "tag": Name of the tag you are mapping
   * GET:
      * URL tag param needs to be defined: /image/`<tag>`