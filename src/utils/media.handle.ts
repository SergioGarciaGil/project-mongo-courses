import { diskStorage } from "multer"

export const storage = diskStorage({
    destination: `./tmp`,//le decimos que en archivo que estoy ubicado va a ir ve hacia atars una carpeta
    //mi-cv, pdf,mi-foto.png, mi video.mp4
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop()//pop solo agarra el ultimo valor
        const filename = `file-${Date.now()}.${ext}`//para generar nobres aleatorios 
        cb(null, filename)
    }
})