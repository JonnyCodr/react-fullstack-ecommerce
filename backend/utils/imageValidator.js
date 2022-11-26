const imageValidate = (images) => {
  let imagesTable = []
  if(Array.isArray(images)) {
    imagesTable = images
  } else {
    imagesTable.push(images)
  }

  if(imagesTable.length > 3) {
    return { error: "Send only 3 images at once" }
  }
  for(let image of imagesTable) {
    console.log('checking file size...')
    if(image.size > 1048576) return { error: "Size too large (above 1 MB)" }

    console.log('checking mime type...')
    if (image.mimetype !== 'image/png' && image.mimetype !== 'image/jpeg') return { error: "Not a valid image format" }
  }

  return { error: false }
}

module.exports = imageValidate
